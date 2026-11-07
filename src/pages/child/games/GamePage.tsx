import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { HelpCircle, Ticket, X } from 'lucide-react'
import { useStore } from '../../../state/store'
import { addPlayTime, FAMILIES, GAMES, gameAccess, gameFor, recordWin, spendTicket } from '../../../lib/games'
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

export default function GamePage() {
  const { gid } = useParams()
  const nav = useNavigate()
  const { child, mutateChild } = useStore()
  const def = GAMES.find(g => g.id === gid)
  const [round, setRound] = useState(0)
  const [started, setStarted] = useState(false)
  const [end, setEnd] = useState<null | { win: boolean; msg: string; record: boolean }>(null)
  const [how, setHow] = useState(false)
  const t0 = useRef(Date.now())

  // Temps de jeu : enregistré régulièrement pour la limite quotidienne fixée par le parent
  const flush = useCallback(() => {
    if (!child) return
    const ms = Date.now() - t0.current; t0.current = Date.now()
    if (ms > 1000) mutateChild(child.id, c => addPlayTime(c, Math.min(ms, 120000)))
  }, [child, mutateChild])
  useEffect(() => { const t = setInterval(flush, 60000); return () => { clearInterval(t); flush() } }, [flush])

  const start = useCallback(() => {
    if (!child) return
    const acc = gameAccess(child)
    if (acc.blocked) return
    mutateChild(child.id, c => spendTicket(c))
    setEnd(null); setStarted(true); setRound(r => r + 1); t0.current = Date.now()
  }, [child, mutateChild])

  const once = useRef(false)
  useEffect(() => { if (once.current) return; once.current = true; if (child && def && gameFor(def, child.grade) && !gameAccess(child).blocked) start() }, [])   // eslint-disable-line react-hooks/exhaustive-deps

  const onWin = useCallback((score?: number, msg?: string) => {
    if (!child || !def) return
    let rec = false
    mutateChild(child.id, c => { rec = recordWin(c, def.id, score) })
    setEnd({ win: true, msg: msg ?? 'Bravo, partie gagnée !', record: rec })
  }, [child, def, mutateChild])
  const onLose = useCallback((msg: string) => setEnd({ win: false, msg, record: false }), [])

  if (!child) return <Navigate to="/profils" replace />
  if (!def || !gameFor(def, child.grade)) return <Navigate to="/enfant/jeux" replace />
  const acc = gameAccess(child)
  const G = LAZY[def.id]
  const F = FAMILIES[def.family]

  return (
    <div className={`gpage lv-${child.grade}`} style={{ ['--gc' as string]: def.color, ['--fs' as string]: F.soft }}>
      {end?.win && <Confetti />}
      <div className="gbar">
        <button className="iconbtn" aria-label="Quitter le jeu" onClick={() => nav('/enfant/jeux')}><X /></button>
        <span className="gbar-ic"><GameIcon id={def.id} size={22} /></span>
        <h1 className="gbar-t">{def.title}</h1>
        <button className="iconbtn" aria-label="Règles du jeu" onClick={() => setHow(true)}><HelpCircle /></button>
      </div>
      <div className="gbody">
        {started
          ? <Suspense fallback={<p className="muted center">Chargement…</p>}><G key={round} level={child.grade} sound={child.sound} name={child.nickname} onWin={onWin} onLose={onLose} /></Suspense>
          : <div className="g-blocked">
              <p><b>{acc.blocked === 'off' ? 'La ludothèque est fermée pour le moment.' : acc.blocked === 'time' ? 'Le temps de jeu du jour est écoulé.' : 'Plus de partie disponible.'}</b></p>
              <p className="small muted">{acc.blocked === 'tickets' ? 'Termine une leçon pour gagner une nouvelle partie.' : 'Reviens demain !'}</p>
              <Link className="btn mt16" to={acc.blocked === 'tickets' ? '/enfant' : '/enfant/jeux'}>{acc.blocked === 'tickets' ? 'Faire une leçon' : 'Retour'}</Link>
            </div>}
      </div>
      {end && (
        <div className="gend" role="dialog" aria-modal="true" aria-label="Fin de partie">
          <div className="gend-card">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="gend-fox" />
            <h2>{end.win ? 'Gagné !' : 'Partie terminée'}</h2>
            <p>{end.msg}</p>
            {end.record && <p className="gend-rec">Nouveau record !</p>}
            <div className="col mt16">
              {acc.blocked
                ? <p className="small muted">{acc.blocked === 'tickets' ? 'Plus de partie pour l’instant : une leçon t’en fera gagner une.' : 'Le temps de jeu du jour est écoulé.'}</p>
                : <button className="btn block" autoFocus onClick={() => { sfx('tap', child.sound); start() }}><Ticket size={18} /> Rejouer{acc.mode === 'free' ? '' : ` (${acc.tickets} partie${acc.tickets > 1 ? 's' : ''})`}</button>}
              <button className="btn quiet block" onClick={() => nav('/enfant/jeux')}>Autres jeux</button>
              {acc.blocked === 'tickets' && <button className="btn quiet block" onClick={() => nav('/enfant')}>Faire une leçon</button>}
            </div>
          </div>
        </div>
      )}
      {how && <Modal label="Règles du jeu" onClose={() => setHow(false)}><h2>{def.title}</h2><p className="mt8">{HOW[def.id]}</p><button className="btn block mt16" autoFocus onClick={() => setHow(false)}>Compris</button></Modal>}
    </div>
  )
}
