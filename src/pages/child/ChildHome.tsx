import { Link } from 'react-router-dom'
import { Flame, Play } from 'lucide-react'
import { useStore } from '../../state/store'
import { SUBJECT_META, lessonsOf, meta, subjectsOf } from '../../lib/curriculum'
import { dayKey, WEEKDAY_INITIALS, addDays, weekStart, parseDay } from '../../lib/dates'
import { dueForReview, levelOf, liveStreak, readyChests, recommend, todayCount, visibleSubjects, masteryOf } from '../../lib/progress'
import { Avatar } from '../../components/common'

export default function ChildHome() {
  const { child } = useStore()
  if (!child) return null
  const today = dayKey()
  const lv = levelOf(child.xp)
  const reco = recommend(child)
  const n = todayCount(child)
  const goal = child.goal
  const wk = weekStart(today)
  const learned = new Set(child.sessions.map(s => s.day))
  const week = Array.from({ length: 7 }, (_, i) => addDays(wk, i))
  const subs = visibleSubjects(child, subjectsOf(child.grade)).filter(s => lessonsOf(child.grade, s).length > 0)
  const due = dueForReview(child)
  const chests = readyChests(child)
  const why = { assigned: 'Proposée par ton parent', continue: 'On continue', start: 'À découvrir', review: 'Pour réviser' }

  return (
    <div className="col gap20">
      <div className="hello">
        <Avatar emoji={child.avatar} frame={child.frame} size={64} />
        <div className="grow">
          <h1 className="h-lg">Salut {child.nickname} !</h1>
          <div className="stats mt8">
            <span className="chip"><Flame size={18} color="#F28D62" /> {liveStreak(child)} jour{liveStreak(child) > 1 ? 's' : ''}</span>
            <span className="chip">✨ {child.xp} XP</span>
            <span className="chip">{lv.name}</span>
          </div>
        </div>
      </div>

      {!child.diagnosticDone && (
        <Link to="/enfant/diagnostic" className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontSize: '2rem' }}>🧭</span>
          <div className="grow"><b>Faisons le point ensemble</b><div className="small muted">Un court parcours pour voir où tu en es. Sans note.</div></div>
          <span className="pill teal">Commencer</span>
        </Link>
      )}

      <section className="today">
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div className="grow">
            <div className="tiny" style={{ opacity: .85, fontWeight: 900, letterSpacing: '.06em' }}>{reco ? why[reco.reason].toUpperCase() : 'BRAVO'}</div>
            <h2 style={{ margin: '4px 0 6px' }}>{reco ? reco.lesson.title : 'Tu as tout terminé !'}</h2>
            <div className="small" style={{ opacity: .9 }}>{reco ? `${meta(reco.lesson.subject).name} · ${reco.lesson.ex.length} exercices` : 'De nouvelles leçons arrivent bientôt.'}</div>
          </div>
          {reco && <Link className="btn lg" to={`/enfant/lecon/${reco.lesson.id}`}><Play size={20} /> Jouer</Link>}
        </div>
        <div className="row mt16" style={{ justifyContent: 'space-between' }}>
          <div className="small" style={{ fontWeight: 800 }}>Objectif du jour : {Math.min(n, goal)} / {goal}</div>
          <div className="dots" aria-hidden="true">{Array.from({ length: goal }, (_, i) => <i key={i} className={i < n ? 'on' : ''}>{i < n ? '✓' : ''}</i>)}</div>
        </div>
      </section>

      <section className="card">
        <h3>Ma semaine</h3>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          {week.map((d, i) => {
            const on = learned.has(d)
            return (
              <div key={d} className="center">
                <div style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: on ? 'var(--gold)' : parseDay(d) > new Date() ? '#fff' : 'var(--bg2)', border: d === today ? '3px solid var(--teal)' : '3px solid transparent' }}>{on ? '🔥' : ''}</div>
                <div className="tiny muted mt8">{WEEKDAY_INITIALS[i]}</div>
              </div>
            )
          })}
        </div>
        <p className="tiny muted mt8">Gels de série disponibles : {child.streak.freezes}. Un jour manqué ne casse pas ta série quand tu en as un.</p>
      </section>

      {chests.length > 0 && <Link to="/enfant/recompenses" className="note" style={{ textDecoration: 'none', color: 'inherit' }}>🎁 {chests.length} coffre{chests.length > 1 ? 's' : ''} à ouvrir !</Link>}
      {due.length > 0 && <Link to={`/enfant/lecon/${due[0].id}`} className="note" style={{ textDecoration: 'none', color: 'inherit' }}>🧠 Un petit rappel ? Réviser « {due[0].title} »</Link>}

      <section>
        <h3 className="mb8">Mes matières</h3>
        <div className="subjects">
          {subs.map(sid => {
            const m = SUBJECT_META[sid]
            const ls = lessonsOf(child.grade, sid)
            const done = ls.filter(l => masteryOf(child.lessons[l.id]) !== 'none').length
            return (
              <Link key={sid} to={`/enfant/matiere/${sid}`} className="subj">
                <span className="em" style={{ background: m.soft }}>{m.emoji}</span>
                <b>{m.name}</b>
                <span className="tiny muted">{m.blurb}</span>
                <div className="bar"><i style={{ width: `${ls.length ? (done / ls.length) * 100 : 0}%`, background: m.color }} /></div>
                <span className="tiny muted">{done} / {ls.length} leçons</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
