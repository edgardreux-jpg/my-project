import { GAMES } from '../../lib/games'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Download, Flame, History, LayoutDashboard, MessageSquareText, Play, Settings2, Sparkles, Star, Trash2, TrendingUp, Trophy } from 'lucide-react'
import { useStore } from '../../state/store'
import { SchoolNotes } from './Dashboard'
import { Avatar, BarChart, Delta, Empty, LineChart, Modal, Switch } from '../../components/common'
import { addDays, dayKey, diffDays, fmtDayLong, fmtMin, fmtShort, relDay } from '../../lib/dates'
import {
  BADGES, MASTERY_LABEL, daysSeries, levelOf, liveStreak, masteryOf, periodTotals, recentWins, subjectBreakdown,
  topMissed, totalStars, uid, weakSpots, weeksSeries, mastersTotals,
} from '../../lib/progress'
import { LESSONS, SUBJECT_META, lessonById, meta, subjectsOf, themeInfo } from '../../lib/curriculum'
import type { Child } from '../../types'
import { Ico, Stars, avatarColor } from '../../components/Icon'
import { School } from 'lucide-react'
import { joinClass, myMemberships, removeMember, type Membership } from '../../lib/cloud'

/** Rattacher l'enfant à la classe de son enseignant grâce au code de classe. */
function ClassJoin({ child }: { child: Child }) {
  const { account } = useStore()
  const [list, setList] = useState<Membership[]>([])
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const load = () => { if (account?.cloud) myMemberships().then(l => setList(l.filter(m => m.child_id === child.id))) }
  useEffect(load, [child.id, account?.cloud])
  return (
    <section className="card" style={{ gridColumn: '1 / -1' }}>
      <h3 className="row gap8"><School size={20} /> Classe</h3>
      {list.map(m => (
        <div key={m.class_id} className="toggle">
          <div><b>{m.class_name}</b><div className="tiny muted">{m.teacher_name ? `Avec ${m.teacher_name} · ` : ''}rejointe {relDay(m.joined_at.slice(0, 10))}</div></div>
          <button className="btn ghost sm" onClick={async () => { await removeMember(m.class_id, child.id); load() }}>Quitter la classe</button>
        </div>
      ))}
      {!account?.cloud ? <p className="small muted">Disponible avec un vrai compte parent : la démonstration n’est pas reliée aux classes.</p> : (
        <form className="col gap8 mt8" onSubmit={async e => {
          e.preventDefault(); setBusy(true); setMsg(null)
          const r = await joinClass(code, child.id); setBusy(false)
          if (r.error) setMsg({ ok: false, t: r.error })
          else { setMsg({ ok: true, t: `${child.nickname} a rejoint « ${r.name} ».` }); setCode(''); load() }
        }}>
          <label htmlFor="ccode" className="small"><b>Code de classe donné par l’enseignant</b></label>
          <div className="row gap8">
            <input id="ccode" className="input" style={{ maxWidth: 200, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 800 }} maxLength={8} placeholder="ABC123"
              value={code} onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} autoComplete="off" />
            <button className="btn" disabled={busy || code.length < 6}>Rejoindre</button>
          </div>
          <p className="tiny muted" style={{ margin: 0 }}>L’enseignant verra le pseudo de {child.nickname}, son niveau et sa progression (temps, réussite, leçons). Vous pouvez quitter la classe à tout moment.</p>
          {msg && <div className={msg.ok ? 'note' : 'err'} role="status">{msg.t}</div>}
        </form>
      )}
    </section>
  )
}

const TABS = [['apercu', 'Aperçu', LayoutDashboard], ['progression', 'Progression', TrendingUp], ['activite', 'Activité', History], ['reglages', 'Réglages', Settings2]] as const

export default function ChildDetail() {
  const { id = '' } = useParams()
  const [sp, setSp] = useSearchParams()
  const { account, mutateChild, removeChild, enterChild } = useStore()
  const nav = useNavigate()
  const child = account?.children.find(c => c.id === id)
  const tab = sp.get('tab') ?? 'apercu'
  const [del, setDel] = useState(false)
  if (!child) return <Navigate to="/parent" replace />
  const today = dayKey()
  const lv = levelOf(child.xp)
  const set = (fn: (c: Child) => void) => mutateChild(child.id, fn)

  return (
    <div className="col gap20">
      <Link to="/parent" className="row small"><ChevronLeft size={18} /> Tableau de bord</Link>
      <section className="card p-id">
        <Avatar emoji={child.avatar} frame={child.frame} size={76} />
        <div className="grow" style={{ minWidth: 0 }}>
          <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}><h1>{child.nickname}</h1><span className="pill teal">{child.grade.toUpperCase()}</span></div>
          <div className="p-id-lvl"><span className="small"><b>{lv.name}</b>{lv.nextName ? <span className="muted"> · {lv.next! - child.xp} points avant « {lv.nextName} »</span> : null}</span><div className="p-lvl big"><i style={{ width: `${lv.pct}%` }} /></div></div>
          <div className="p-id-chips">
            <span><Flame size={15} /> Série de {liveStreak(child)} jour{liveStreak(child) > 1 ? 's' : ''}</span>
            <span><Star size={15} /> {totalStars(child)} étoiles</span>
            <span><Trophy size={15} /> {child.badges.length} badges</span>
            <span><Sparkles size={15} /> {child.xp} points</span>
          </div>
        </div>
        <button className="btn" onClick={async () => { await enterChild(child.id); nav('/enfant') }}><Play size={18} /> Ouvrir son espace</button>
      </section>
      <div className="p-tabs" role="tablist">
        {TABS.map(([k, l, I]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setSp({ tab: k })}><I size={17} /> {l}</button>)}
      </div>
      {tab === 'apercu' && <Overview child={child} today={today} />}
      {tab === 'progression' && <Progression child={child} />}
      {tab === 'activite' && <Activity child={child} set={set} today={today} />}
      {tab === 'reglages' && <Settings child={child} set={set} onDelete={() => setDel(true)} />}
      {del && (
        <Modal label="Supprimer le profil" onClose={() => setDel(false)}>
          <h2>Supprimer le profil de {child.nickname} ?</h2>
          <p className="muted mt8">Toute sa progression sera effacée de cet appareil. Cette action est définitive.</p>
          <div className="col mt16">
            <button className="btn red block" onClick={() => { removeChild(child.id); nav('/parent') }}>Supprimer définitivement</button>
            <button className="btn quiet block" onClick={() => setDel(false)}>Annuler</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Overview({ child, today }: { child: Child; today: string }) {
  const cur = periodTotals(child, addDays(today, -6), today)
  const prev = periodTotals(child, addDays(today, -13), addDays(today, -7))
  const weeks = useMemo(() => weeksSeries(child, 8, today), [child, today])
  const days = daysSeries(child, 7, today)
  const labels = weeks.map(w => fmtShort(w.start))
  const t = mastersTotals(child)
  const ws = weakSpots(child)
  const summary = !child.sessions.length
    ? `${child.nickname} n’a pas encore terminé de leçon.`
    : `Sur les 7 derniers jours, ${child.nickname} a passé ${fmtMin(cur.ms)} à apprendre sur ${cur.days} jour${cur.days > 1 ? 's' : ''}, avec ${cur.acc == null ? 'aucune réponse enregistrée' : `${Math.round(cur.acc * 100)} % de réussite au premier essai`}.`
  return (
    <div className="col gap20">
      <SchoolNotes kids={[child]} only={child.id} />
      <div className="p-summary"><span className="p-ic teal"><MessageSquareText size={18} /></span><p>{summary}</p></div>
      <div className="kpis">
        <div className="card kpi"><div className="l">Temps cette semaine</div><div className="v">{fmtMin(cur.ms)}</div><Delta now={cur.ms / 60000} before={prev.ms ? prev.ms / 60000 : null} unit=" min" /></div>
        <div className="card kpi"><div className="l">Leçons terminées</div><div className="v">{cur.lessons}</div><Delta now={cur.lessons} before={prev.lessons || null} /></div>
        <div className="card kpi"><div className="l">Réussite 1er essai</div><div className="v">{cur.acc == null ? '–' : `${Math.round(cur.acc * 100)} %`}</div><Delta now={cur.acc} before={prev.acc} unit="%" /></div>
        <div className="card kpi"><div className="l">Jours actifs</div><div className="v">{cur.days} / 7</div><Delta now={cur.days} before={prev.days || null} /></div>
      </div>
      <div className="grid2">
        <section className="card"><h3>Temps par semaine</h3><BarChart labels={labels} values={weeks.map(w => w.ms / 60000)} /></section>
        <section className="card"><h3>Réussite au premier essai</h3><LineChart labels={labels} series={[{ name: child.nickname, color: '#17766E', values: weeks.map(w => w.acc) }]} />
          <p className="tiny muted mt8">Une hausse montre que les notions se consolident. Les semaines sans séance sont laissées vides.</p></section>
      </div>
      <div className="grid2">
        <section className="card"><h3>Cette semaine, jour par jour</h3><BarChart labels={days.map(d => fmtDayLong(d.day).slice(0, 3))} values={days.map(d => d.ms / 60000)} color="#F28D62" h={150} /></section>
        <section className="card"><h3>En chiffres</h3>
          <div className="toggle"><span>Leçons commencées</span><b>{t.started}</b></div>
          <div className="toggle"><span>Notions acquises (2 étoiles ou plus)</span><b>{t.acquired}</b></div>
          <div className="toggle"><span>Notions maîtrisées (réussies à nouveau plus tard)</span><b>{t.mastered}</b></div>
          <div className="toggle"><span>Meilleure série</span><b>{child.streak.best} jours</b></div>
          <div className="toggle"><span>Notions à consolider</span><b>{ws.length}</b></div>
        </section>
      </div>
    </div>
  )
}

function Progression({ child }: { child: Child }) {
  const subs = subjectBreakdown(child, subjectsOf(child.grade)).filter(s => s.total > 0)
  const ws = weakSpots(child)
  const wins = recentWins(child)
  const missed = topMissed(child)
  const col = { mastered: '#2E8B57', acquired: '#7CC79A', learning: '#F5C65D', none: '#EDE6D6' }
  return (
    <div className="col gap20">
      <section className="card">
        <h3>Maîtrise par matière</h3>
        <div className="legend mb8">{(['mastered', 'acquired', 'learning', 'none'] as const).map(k => <span key={k}><i style={{ background: col[k] }} />{MASTERY_LABEL[k]}</span>)}</div>
        {subs.length === 0 && <Empty title="Pas encore de données">Le détail apparaît dès les premières leçons.</Empty>}
        {subs.map(s => {
          const m = SUBJECT_META[s.id]
          return (
            <div key={s.id} className="mastery-row">
              <b className="row gap8"><span style={{ color: m.color }}><Ico e={m.emoji} color="currentColor" /></span> {m.name}</b>
              <div className="stack-bar" role="img" aria-label={`${s.mastered} maîtrisées, ${s.acquired} acquises, ${s.learning} en cours sur ${s.total}`}>
                {(['mastered', 'acquired', 'learning', 'none'] as const).map(k => <i key={k} style={{ width: `${(s[k] / s.total) * 100}%`, background: col[k] }} />)}
              </div>
              <span className="small muted">{s.total - s.none} / {s.total}</span>
            </div>
          )
        })}
        <p className="tiny muted mt8">Une leçon est « maîtrisée » quand elle est réussie avec 3 étoiles au moins 3 jours après la première fois.</p>
      </section>
      <div className="grid2">
        <section className="card"><h3>Notions à consolider</h3>
          {ws.length === 0 ? <Empty emoji="👍" title="Rien d’inquiétant">Aucune notion n’est repérée en difficulté.</Empty> : ws.map(w => (
            <div key={w.themeId} className="weak"><span style={{ fontSize: '1.5rem', color: meta(w.subject).color }}><Ico e={meta(w.subject).emoji} color="currentColor" /></span>
              <div className="grow"><b>{w.title}</b><div className="small muted">{meta(w.subject).name} · {Math.round(w.acc * 100)} % de réussite récente</div></div></div>
          ))}
          {missed.length > 0 && <><h3 className="mt16">Questions souvent ratées</h3>{missed.map((m, i) => <div key={i} className="weak"><div className="grow small"><b>{m.prompt}</b><div className="tiny muted">{m.lesson} · {m.count} fois</div></div></div>)}</>}
        </section>
        <section className="card"><h3>Réussites récentes</h3>
          {wins.length === 0 ? <Empty title="Bientôt">Les leçons réussies avec 3 étoiles s’afficheront ici.</Empty> : wins.map(w => (
            <div key={w.lesson.id} className="weak"><span style={{ fontSize: '1.5rem', color: meta(w.lesson.subject).color }}><Ico e={meta(w.lesson.subject).emoji} color="currentColor" /></span>
              <div className="grow"><b>{w.lesson.title}</b><div className="small muted">{relDay(w.p.last)}</div></div>
              <span className={`pill ${w.p.mastered ? 'green' : 'gold'}`}>{w.p.mastered ? 'Maîtrisée' : '3 étoiles'}</span></div>
          ))}
          <h3 className="mt16">Badges ({child.badges.length}/{BADGES.length})</h3>
          <div className="wrap gap8">{child.badges.length ? child.badges.map(b => { const d = BADGES.find(x => x.id === b)!; return <span key={b} className="pill gold" title={d.desc}><Ico e={d.emoji} /> {d.title}</span> }) : <span className="small muted">Aucun pour l’instant.</span>}</div>
        </section>
      </div>
    </div>
  )
}

/** Ludothèque vue par le parent : temps de jeu de la semaine et jeux préférés. */
function GamesCard({ child, today }: { child: Child; today: string }) {
  const log = child.games?.log ?? []
  if (!log.length) return null
  const week = log.filter(e => diffDays(today, dayKey(new Date(e.at))) < 7)
  const ms = week.reduce((a, e) => a + e.ms, 0)
  const count: Record<string, number> = {}
  week.forEach(e => { count[e.g] = (count[e.g] ?? 0) + 1 })
  const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 3)
  const mode = child.games?.mode ?? 'tickets'
  return (
    <section className="card"><h3>Ludothèque</h3>
      <p className="small muted mb8">{mode === 'off' ? 'Désactivée' : mode === 'free' ? 'Accès libre' : 'Accès après les leçons'}{child.games?.maxMin ? ` · ${child.games.maxMin} min par jour au maximum` : ''} (modifiable dans Réglages).</p>
      <div className="gh-stats p">
        <span><b>{week.length}</b><small>parties sur 7 jours</small></span>
        <span><b>{week.filter(e => e.win).length}</b><small>victoires</small></span>
        <span><b>{fmtMin(ms)}</b><small>de jeu</small></span>
      </div>
      {top.length > 0 && <p className="small mt8">Jeux préférés : {top.map(([g, n]) => `${GAMES.find(x => x.id === g)?.title ?? g} (${n})`).join(', ')}.</p>}
    </section>
  )
}

function Activity({ child, set, today }: { child: Child; set: (fn: (c: Child) => void) => void; today: string }) {
  const [lessonId, setLessonId] = useState('')
  const available = LESSONS.filter(l => l.level === child.grade)
  const sessions = [...child.sessions].reverse().slice(0, 15)
  const adults = Object.entries(child.lessons).filter(([id]) => lessonById.get(id)?.adult)
  return (
    <div className="col gap20">
      <GamesCard child={child} today={today} />
      <section className="card"><h3>Dernières séances</h3>
        {sessions.length === 0 ? <Empty title="Aucune séance">Les séances terminées apparaissent ici.</Empty> : (
          <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Dernières séances"><table className="table"><thead><tr><th>Date</th><th>Leçon</th><th>Durée</th><th>1er essai</th><th>Étoiles</th></tr></thead><tbody>
            {sessions.map(s => {
              const l = lessonById.get(s.lessonId)
              return <tr key={s.id}><td>{relDay(s.day, today)}</td><td><b>{l?.title ?? 'Parcours de départ'}</b><div className="tiny muted">{meta(s.subject).name}</div></td><td>{fmtMin(s.ms)}</td><td>{s.firstOk}/{s.total}</td><td>{s.kind === 'lesson' ? '⭐'.repeat(s.stars) : '–'}</td></tr>
            })}</tbody></table></div>
        )}
      </section>
      <div className="grid2">
        <section className="card"><h3>Proposer une leçon</h3>
          <p className="small muted mb8">La leçon apparaît en premier sur l’accueil de {child.nickname}.</p>
          <div className="row"><select className="input" value={lessonId} onChange={e => setLessonId(e.target.value)} aria-label="Leçon à proposer">
            <option value="">Choisir une leçon</option>
            {available.map(l => <option key={l.id} value={l.id}>{meta(l.subject).name} · {l.title}</option>)}
          </select>
            <button className="btn" disabled={!lessonId} onClick={() => { set(c => { c.assignments.push({ id: uid(), lessonId, at: new Date().toISOString() }) }); setLessonId('') }}>Proposer</button></div>
          <div className="mt16">{child.assignments.slice().reverse().slice(0, 6).map(a => (
            <div key={a.id} className="weak"><div className="grow small"><b>{lessonById.get(a.lessonId)?.title}</b><div className="tiny muted">Proposée {relDay(a.at.slice(0, 10), today)}</div></div>
              <span className={`pill ${a.doneAt ? 'green' : 'gold'}`}>{a.doneAt ? 'Faite' : 'À faire'}</span></div>
          ))}</div>
        </section>
        <section className="card"><h3>À faire avec vous</h3>
          <p className="small muted mb8">Certaines leçons se terminent par une activité à pratiquer avec un adulte. Elle n’est pas notée.</p>
          {adults.length === 0 ? <p className="small muted">Aucune activité pour l’instant.</p> : adults.slice(0, 8).map(([id, p]) => (
            <div key={id} className="toggle"><div className="small"><b>{lessonById.get(id)?.title}</b><div className="tiny muted">{lessonById.get(id)?.adult}</div></div>
              <Switch label="Fait" on={!!p.adultDone} onChange={v => set(c => { c.lessons[id].adultDone = v })} /></div>
          ))}
        </section>
      </div>
    </div>
  )
}

function Settings({ child, set, onDelete }: { child: Child; set: (fn: (c: Child) => void) => void; onDelete: () => void }) {
  const subs = subjectsOf(child.grade)
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(child, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `edufun-${child.nickname}.json`; a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <div className="grid2">
      <ClassJoin child={child} />
      <section className="card"><h3>Habitudes</h3>
        <div className="toggle"><div><b>{child.nickname} est</b><div className="tiny muted">Facultatif : personnalise les messages (« votre fille »)</div></div>
          <div className="row gap8">{([['f', 'Fille'], ['m', 'Garçon'], ['', '–']] as const).map(([g, l]) => <button key={g} className={`btn sm ${(child.gender ?? '') === g ? '' : 'ghost'}`} aria-pressed={(child.gender ?? '') === g} aria-label={g ? l : 'Non précisé'} onClick={() => set(c => { if (g) c.gender = g; else delete c.gender })}>{l}</button>)}</div></div>
        <div className="toggle"><div><b>Objectif quotidien</b><div className="tiny muted">Nombre de leçons par jour</div></div>
          <div className="row gap8">{([1, 2, 3] as const).map(g => <button key={g} className={`btn sm ${child.goal === g ? '' : 'ghost'}`} onClick={() => set(c => { c.goal = g })}>{g}</button>)}</div></div>
        <div className="toggle"><div><b>Rappel de pause</b><div className="tiny muted">Après combien de minutes d’écran</div></div>
          <select className="input" style={{ width: 120 }} value={child.breakMin} aria-label="Rappel de pause" onChange={e => set(c => { c.breakMin = Number(e.target.value) })}>
            <option value={0}>Aucun</option><option value={15}>15 min</option><option value={20}>20 min</option><option value={30}>30 min</option></select></div>
        <div className="toggle"><div><b>Ludothèque</b><div className="tiny muted">{(child.games?.mode ?? 'tickets') === 'tickets' ? '3 parties par jour, plus une par leçon terminée' : child.games?.mode === 'free' ? 'Parties illimitées' : 'Jeux désactivés'}</div></div>
          <select className="input" style={{ width: 170 }} value={child.games?.mode ?? 'tickets'} aria-label="Accès à la ludothèque" onChange={e => set(c => { c.games = { ...(c.games ?? {}), mode: e.target.value as 'tickets' | 'free' | 'off' } })}>
            <option value="tickets">Après les leçons</option><option value="free">Libre</option><option value="off">Désactivée</option></select></div>
        {(child.games?.mode ?? 'tickets') !== 'off' && <div className="toggle"><div><b>Temps de jeu par jour</b><div className="tiny muted">Au-delà, la ludothèque se ferme jusqu’au lendemain</div></div>
          <select className="input" style={{ width: 150 }} value={child.games?.maxMin ?? 0} aria-label="Temps de jeu par jour" onChange={e => set(c => { c.games = { ...(c.games ?? {}), maxMin: Number(e.target.value) } })}>
            <option value={0}>Sans limite</option><option value={10}>10 min</option><option value={20}>20 min</option><option value={30}>30 min</option><option value={45}>45 min</option></select></div>}
        <div className="toggle"><div><b>Sons</b></div><Switch label="Sons" on={child.sound} onChange={v => set(c => { c.sound = v })} /></div>
        <div className="toggle"><div><b>Police facile à lire</b></div><Switch label="Police facile à lire" on={child.font === 'dys'} onChange={v => set(c => { c.font = v ? 'dys' : 'default' })} /></div>
      </section>
      <section className="card"><h3>Matières visibles</h3>
        <p className="small muted mb8">Masquez une matière pour la retirer de l’espace de {child.nickname}.</p>
        {subs.map(s => <div key={s} className="toggle"><span className="row gap8"><span style={{ color: SUBJECT_META[s].color }}><Ico e={SUBJECT_META[s].emoji} color="currentColor" /></span>{SUBJECT_META[s].name}</span>
          <Switch label={SUBJECT_META[s].name} on={!child.hiddenSubjects.includes(s)} onChange={v => set(c => { c.hiddenSubjects = v ? c.hiddenSubjects.filter(x => x !== s) : [...c.hiddenSubjects, s] })} /></div>)}
        <h3 className="mt24">Données</h3>
        <p className="small muted mb8">Vous pouvez exporter ou supprimer les données de cet enfant à tout moment.</p>
        <div className="wrap"><button className="btn ghost sm" onClick={exportJson}><Download size={16} /> Exporter (JSON)</button>
          <button className="btn red sm" onClick={onDelete}><Trash2 size={16} /> Supprimer le profil</button></div>
      </section>
    </div>
  )
}
