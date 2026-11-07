import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, HelpCircle, History, Play, RotateCcw, Ticket, Trophy } from 'lucide-react'
import type { Child } from '../../../types'
import { dayKey, fmtMin, relDay } from '../../../lib/dates'
import { useStore } from '../../../state/store'
import { addPlayTime, logGame, bestKey, DIFFS, FAMILIES, fmtScore, GAMES, gameAccess, gameFor, recordWin, setDiff, spendTicket, tierOf, type Diff } from '../../../lib/games'
import { sfx } from '../../../lib/audio'
import { Confetti, Modal } from '../../../components/common'
import { GameIcon } from './GameIcon'
import type { GameProps } from './types'

const LOAD: Record<string, () => Promise<{ default: ComponentType<GameProps> }>> = {
  sudoku: () => import('./Sudoku'), puissance4: () => import('./Puissance4'), taquin: () => import('./Taquin'), hanoi: () => import('./Hanoi'),
  compte: () => import('./Compte'), memory: () => import('./Memory'), labyrinthe: () => import('./Labyrinthe'),
  motmystere: () => import('./MotMystere'), motsmeles: () => import('./MotsMeles'),
  bataille: () => import('./Bataille'), tangram: () => import('./Tangram'), carte: () => import('./Carte'),
}
const LAZY: Record<string, ComponentType<GameProps>> = Object.fromEntries(Object.entries(LOAD).map(([k, f]) => [k, lazy(f)]))

const HOW: Record<string, string> = {
  sudoku: 'Remplis la grille : chaque symbole doit apparaître une seule fois dans chaque ligne, chaque colonne et chaque bloc. Touche une case, puis un symbole.',
  puissance4: 'Chacun son tour, fais tomber un jeton dans une colonne. Le premier qui aligne 4 jetons (en ligne, en colonne ou en diagonale) gagne.',
  taquin: 'Fais glisser les tuiles dans la case vide pour les remettre dans l’ordre, de 1 jusqu’au dernier nombre.',
  hanoi: 'Déplace toute la tour vers l’arrivée. Un seul disque à la fois, et jamais un grand disque sur un plus petit.',
  compte: 'Choisis un nombre, une opération, puis un deuxième nombre : le résultat remplace les deux. Atteins la cible exactement !',
  memory: 'Retourne deux cartes : si le calcul et son résultat vont ensemble, elles restent visibles. Retiens bien leur place.',
  labyrinthe: 'Pars du départ et avance case par case, seulement sur les calculs justes, jusqu’à la sortie.',
  motmystere: 'Propose un mot. Vert : la lettre est bien placée. Jaune : elle est dans le mot mais ailleurs. Gris : elle n’y est pas.',
  motsmeles: 'Retrouve tous les mots de la liste cachés dans la grille. Glisse le doigt dessus ou touche la première puis la dernière lettre.',
  bataille: 'Des bateaux sont cachés. Vise une case avec sa lettre et son chiffre : touché, coulé ou dans l’eau ?',
  tangram: 'Place les 7 pièces pour remplir exactement la silhouette. Touche une pièce pour la faire tourner.',
  carte: 'Lis la question puis touche le bon endroit sur la carte.',
}
const TIPS: Record<string, string[]> = {
  sudoku: ['Commence par les lignes presque pleines.', 'Regarde chaque bloc : quel symbole manque ?', 'Une case rouge ? Ce symbole est déjà dans la ligne, la colonne ou le bloc.'],
  puissance4: ['Le milieu du plateau est la meilleure place.', 'Avant de jouer, regarde si Foxy peut aligner 4 jetons.', 'Prépare deux menaces à la fois !'],
  taquin: ['Range d’abord la première ligne, puis la suivante.', 'Fais tourner les tuiles en cercle pour les amener à leur place.'],
  hanoi: ['Avec un nombre impair de disques, le petit disque part d’abord vers l’arrivée.', 'Le petit disque bouge un coup sur deux.'],
  compte: ['Cherche un nombre proche de la cible.', 'Une multiplication fait vite grandir les nombres.', 'Tu peux annuler un calcul à tout moment.'],
  memory: ['Retiens bien les cartes déjà vues.', 'Retourne d’abord une carte inconnue.'],
  labyrinthe: ['Vérifie chaque calcul avant d’avancer.', 'Les cases qui brillent sont celles où tu peux aller.'],
  motmystere: ['Commence par un mot avec beaucoup de voyelles.', 'Une lettre grise ne sert plus : évite-la.'],
  motsmeles: ['Cherche d’abord les lettres rares : K, Z, X, W.', 'Les mots peuvent être à l’envers en mode difficile !'],
  bataille: ['Les bateaux ne se touchent jamais.', 'Après un « touché », vise les cases juste à côté.'],
  tangram: ['Place d’abord les deux grands triangles.', 'Touche une pièce pour la faire tourner d’un quart de tour.'],
  carte: ['L’Europe est au-dessus de l’Afrique.', 'Le plus grand océan est le Pacifique.'],
}

function when(iso: string) {
  const d = new Date(iso), k = dayKey(d), r = relDay(k)
  return `${r.charAt(0).toUpperCase()}${r.slice(1)} à ${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}`
}
const dur = (ms: number) => { const s = Math.max(1, Math.round(ms / 1000)); return s < 60 ? `${s} s` : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')}` }

/** Historique du jeu pour ce profil : chiffres clés et dernières parties. */
function GameHistory({ child, gameId, unit }: { child: Child; gameId: string; unit?: string }) {
  const [all, setAll] = useState(false)
  const log = (child.games?.log ?? []).filter(e => e.g === gameId)
  if (!log.length) return <p className="gh-empty">Ta toute première partie ? Ton historique apparaîtra ici.</p>
  const wins = log.filter(e => e.win).length
  const time = log.reduce((a, e) => a + e.ms, 0)
  const shown = all ? log : log.slice(0, 5)
  return (
    <section className="gh">
      <h3 className="gi-h"><History size={18} /> Ton historique</h3>
      <div className="gh-stats">
        <span><b>{log.length}</b><small>partie{log.length > 1 ? 's' : ''}</small></span>
        <span><b>{wins}</b><small>victoire{wins > 1 ? 's' : ''}</small></span>
        <span><b>{Math.round((wins / log.length) * 100)} %</b><small>de réussite</small></span>
        <span><b>{time < 60000 ? dur(time) : fmtMin(time)}</b><small>de jeu</small></span>
      </div>
      <ul className="gh-list">
        {shown.map((e, i) => (
          <li key={e.at + i} className={e.win ? 'w' : 'l'}>
            <i className="gh-dot" aria-hidden="true" />
            <div className="grow"><b>{e.win ? 'Gagné' : 'Perdu'}</b>{e.s != null && unit ? <span> · {fmtScore(unit, e.s)}</span> : null}<small>{when(e.at)} · {dur(e.ms)}</small></div>
            <span className={`gdiff d${e.d}`}>{DIFFS[e.d as Diff].name}</span>
          </li>
        ))}
      </ul>
      {log.length > 5 && <button className="btn quiet sm block mt8" onClick={() => setAll(a => !a)}>{all ? 'Voir moins' : `Voir les ${log.length} parties`}</button>}
    </section>
  )
}

export default function GamePage() {
  const { gid } = useParams()
  return <GameScreen key={gid} />
}

function GameScreen() {
  const { gid } = useParams()
  const nav = useNavigate()
  const { child, mutateChild } = useStore()
  const def = GAMES.find(g => g.id === gid)
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'play'>('intro')
  const [diff, setD] = useState<Diff>(() => ((child?.games?.diff?.[gid ?? ''] ?? 1) as Diff))
  const [end, setEnd] = useState<null | { win: boolean; msg: string; record: boolean; score?: number }>(null)
  const [how, setHow] = useState(false)
  const [tip, setTip] = useState(0)
  const t0 = useRef(Date.now())
  const roundAt = useRef(Date.now())

  useEffect(() => { window.scrollTo(0, 0) }, [phase])
  useEffect(() => { if (phase !== 'play') return; const t = setInterval(() => setTip(x => x + 1), 12000); return () => clearInterval(t) }, [phase])

  // Temps de jeu : enregistré régulièrement pour la limite quotidienne fixée par le parent
  const flush = useCallback(() => {
    if (!child || phase !== 'play') return
    const ms = Date.now() - t0.current; t0.current = Date.now()
    if (ms > 1000) mutateChild(child.id, c => addPlayTime(c, Math.min(ms, 120000)))
  }, [child, mutateChild, phase])
  useEffect(() => { const t = setInterval(flush, 60000); return () => { clearInterval(t); flush() } }, [flush])

  const start = useCallback((d: Diff) => {
    if (!child || !def) return
    if (gameAccess(child).blocked) return
    mutateChild(child.id, c => { spendTicket(c); setDiff(c, def.id, d) })
    setEnd(null); setPhase('play'); setRound(r => r + 1); t0.current = Date.now(); roundAt.current = Date.now()
  }, [child, def, mutateChild])

  const onWin = useCallback((score?: number, msg?: string) => {
    if (!child || !def) return
    let rec = false
    mutateChild(child.id, c => { rec = recordWin(c, def.id, score, diff); logGame(c, { g: def.id, d: diff, win: true, s: score, at: new Date().toISOString(), ms: Date.now() - roundAt.current }) })
    setEnd({ win: true, msg: msg ?? 'Bravo, partie gagnée !', record: rec, score })
  }, [child, def, mutateChild, diff])
  const onLose = useCallback((msg: string) => {
    if (child && def) mutateChild(child.id, c => logGame(c, { g: def.id, d: diff, win: false, at: new Date().toISOString(), ms: Date.now() - roundAt.current }))
    setEnd({ win: false, msg, record: false })
  }, [child, def, mutateChild, diff])

  if (!child) return <Navigate to="/profils" replace />
  if (!def || !gameFor(def, child.grade)) return <Navigate to="/enfant/jeux" replace />
  const acc = gameAccess(child)
  const G = LAZY[def.id]
  const F = FAMILIES[def.family]
  const best = (d: Diff) => child.games?.best?.[bestKey(def.id, d)]
  const tips = TIPS[def.id] ?? []
  const tipsList = [HOW[def.id].split('. ')[0] + '.', ...tips]

  return (
    <div className={`gpage fam-${def.family} lv-${child.grade} ph-${phase}`} style={{ ['--gc' as string]: def.color, ['--fc' as string]: F.color, ['--fs' as string]: F.soft }}>
      {end?.win && <Confetti />}
      <div className="gdeco" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="gbar">
        <button className="iconbtn" aria-label={phase === 'play' ? 'Quitter la partie' : 'Retour à la ludothèque'} onClick={() => (phase === 'play' && !end ? setPhase('intro') : nav('/enfant/jeux'))}><ArrowLeft /></button>
        <span className="gbar-ic"><GameIcon id={def.id} size={22} /></span>
        <div className="gbar-t"><h1>{def.title}</h1>{phase === 'play' && <small className={`gdiff d${diff}`}>{DIFFS[diff].name}</small>}</div>
        <button className="iconbtn" aria-label="Règles du jeu" onClick={() => setHow(true)}><HelpCircle /></button>
      </header>

      {phase === 'intro' ? (
        <main className="gintro">
          <section className="gi-hero">
            <span className="gi-ic"><GameIcon id={def.id} size={54} /></span>
            <div>
              <span className="gi-fam">{F.name}</span>
              <h2>{def.title}</h2>
              <p>{HOW[def.id]}</p>
            </div>
          </section>
          {acc.blocked ? (
            <div className="g-blocked">
              <p><b>{acc.blocked === 'off' ? 'La ludothèque est fermée pour le moment.' : acc.blocked === 'time' ? 'Le temps de jeu du jour est écoulé.' : 'Plus de partie disponible.'}</b></p>
              <p className="small muted">{acc.blocked === 'tickets' ? 'Termine une leçon pour gagner une nouvelle partie.' : 'Reviens demain !'}</p>
              <Link className="btn mt16" to={acc.blocked === 'tickets' ? '/enfant' : '/enfant/jeux'}>{acc.blocked === 'tickets' ? 'Faire une leçon' : 'Retour'}</Link>
            </div>
          ) : (
            <>
              <h3 className="gi-h">Choisis ta difficulté</h3>
              <div className="gi-diffs" role="radiogroup" aria-label="Difficulté">
                {DIFFS.map((d, i) => {
                  const b = best(i as Diff)
                  return (
                    <button key={d.name} role="radio" aria-checked={diff === i} className={`gi-d d${i} ${diff === i ? 'on' : ''}`} onClick={() => { setD(i as Diff); sfx('tap', child.sound) }}>
                      <span className="gi-stars" aria-hidden="true">{[0, 1, 2].map(k => <i key={k} className={k <= i ? 'f' : ''} />)}</span>
                      <b>{d.name}</b>
                      <small>{d.hint}</small>
                      {b != null && def.unit && <em><Trophy size={12} /> {fmtScore(def.unit, b)}</em>}
                    </button>
                  )
                })}
              </div>
              <button className="btn lg block gi-go" autoFocus onClick={() => { sfx('tap', child.sound); start(diff) }}>
                <Play size={20} /> Jouer {acc.mode === 'free' ? '' : <span className="gi-tk"><Ticket size={16} /> {acc.tickets}</span>}
              </button>
              {acc.mode !== 'free' && <p className="tiny muted center mt8">Lancer une partie utilise 1 ticket.</p>}
            </>
          )}
          <GameHistory child={child} gameId={def.id} unit={def.unit} />
        </main>
      ) : (
        <main className="gplay">
          <div className="gstage">
            <Suspense fallback={<p className="muted center">Chargement…</p>}>
              <G key={round} level={child.grade} tier={tierOf(child.grade, diff)} diff={diff} sound={child.sound} name={child.nickname} onWin={onWin} onLose={onLose} />
            </Suspense>
          </div>
          <div className="gtip" aria-live="polite">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
            <p key={tip}><b>Astuce de Foxy :</b> {tipsList[tip % tipsList.length]}</p>
          </div>
        </main>
      )}

      {end && (
        <div className="gend" role="dialog" aria-modal="true" aria-label="Fin de partie">
          <div className={`gend-card ${end.win ? 'win' : ''}`}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="gend-fox" />
            <h2>{end.win ? 'Gagné !' : 'Partie terminée'}</h2>
            <p>{end.msg}</p>
            <span className={`gdiff d${diff}`}>{DIFFS[diff].name}</span>
            {end.record && <p className="gend-rec">Nouveau record !</p>}
            <div className="col mt16">
              {acc.blocked
                ? <p className="small muted">{acc.blocked === 'tickets' ? 'Plus de partie pour l’instant : une leçon t’en fera gagner une.' : 'Le temps de jeu du jour est écoulé.'}</p>
                : <button className="btn block" autoFocus onClick={() => { sfx('tap', child.sound); start(diff) }}><RotateCcw size={18} /> Rejouer{acc.mode === 'free' ? '' : ` (${acc.tickets} ticket${acc.tickets > 1 ? 's' : ''})`}</button>}
              {!acc.blocked && <button className="btn ghost block" onClick={() => { setEnd(null); setPhase('intro') }}>Changer de difficulté</button>}
              <button className="btn quiet block" onClick={() => nav('/enfant/jeux')}>Autres jeux</button>
              {acc.blocked === 'tickets' && <button className="btn quiet block" onClick={() => nav('/enfant')}>Faire une leçon</button>}
            </div>
          </div>
        </div>
      )}
      {how && <Modal label="Règles du jeu" onClose={() => setHow(false)}><h2>{def.title}</h2><p className="mt8">{HOW[def.id]}</p>
        {tips.length > 0 && <ul className="mt8 small">{tips.map(t => <li key={t}>{t}</li>)}</ul>}
        <button className="btn block mt16" autoFocus onClick={() => setHow(false)}>Compris</button></Modal>}
    </div>
  )
}
