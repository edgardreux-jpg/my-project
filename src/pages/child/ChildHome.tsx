import { Link } from 'react-router-dom'
import { Flame, Play, Compass, Brain, Gift, Zap, Check, Snowflake, Hand, School } from 'lucide-react'
import { useStore } from '../../state/store'
import { lessonById, lessonsOf, meta, subjectsOf } from '../../lib/curriculum'
import { taskDone, useTeacherTasks } from '../../lib/tasks'
import { dayKey, WEEKDAY_INITIALS, addDays, weekStart, parseDay, diffDays, dueLabel } from '../../lib/dates'
import { CHESTS, dueForReview, liveStreak, readyChests, recommend, todayCount, visibleSubjects } from '../../lib/progress'
import { Ico } from '../../components/Icon'
import { avatarSrc } from '../../lib/avatars'
import { ChestArt, Ring, SubjectTile } from './kidui'

export default function ChildHome() {
  const { child } = useStore()
  if (!child) return null
  const today = dayKey()
  const reco = recommend(child)
  const n = todayCount(child)
  const goal = child.goal
  const wk = weekStart(today)
  const learned = new Set(child.sessions.map(s => s.day))
  const week = Array.from({ length: 7 }, (_, i) => addDays(wk, i))
  const subs = visibleSubjects(child, subjectsOf(child.grade)).filter(s => lessonsOf(child.grade, s).length > 0)
  const due = dueForReview(child)
  const chests = readyChests(child)
  const streak = liveStreak(child)
  const nextChest = CHESTS.find(c => !child.chestsOpened.includes(c.id) && c.xp > child.xp)
  const prevXp = nextChest ? Math.max(0, ...CHESTS.filter(c => c.xp < nextChest.xp).map(c => c.xp)) : 0
  const big = child.grade === 'ce1' || child.grade === 'ce2'
  const why = { assigned: 'Mission de ton parent', continue: 'On continue', start: 'Nouvelle aventure', review: 'Petite révision' }
  const m = reco ? meta(reco.lesson.subject) : meta('ma')
  const goalDone = n >= goal
  const tasks = useTeacherTasks().filter(t => t.childId === child.id && !taskDone(child, t))
  const today_ = learned.has(today)
  const foxSay = (() => {
    if (!child.sessions.length) return { t: 'Bienvenue ! Je suis Foxy. Appuie sur « Jouer » pour ta toute première leçon.', tone: '' }
    const urgent = tasks.find(t => t.due && diffDays(t.due, today) <= 1)
    if (urgent) return { t: `${urgent.teacher} attend ta mission pour ${dueLabel(urgent.due!, today)} ! Elle ne prend que quelques minutes.`, tone: 'warn' }
    if (streak > 0 && !today_) return { t: `Ta série de ${streak} jour${streak > 1 ? 's' : ''} est en danger ! Une leçon aujourd’hui et elle est sauvée.`, tone: 'warn' }
    if (goal - n === 1) return { t: 'Plus qu’une leçon pour ton objectif du jour !', tone: 'go' }
    if (tasks.length) return { t: `${tasks[0].teacher} t’a préparé une mission. Tu la relèves ?`, tone: 'go' }
    if (chests.length) return { t: `Psst… ${chests.length > 1 ? 'des coffres t’attendent' : 'un coffre t’attend'} dans tes trésors !`, tone: 'gold' }
    if (n >= goal) return { t: 'Objectif du jour réussi, bravo ! Tu peux continuer ou faire une pause.', tone: 'ok' }
    return { t: 'Prêt pour une nouvelle aventure ?', tone: '' }
  })()

  return (
    <div className="col gap20 k-page">
      <div className="k-greet">
        <h1 className="k-hi">{big ? `Salut ${child.nickname} !` : `Bonjour ${child.nickname}`} <span className="k-wave" aria-hidden="true"><Hand size={30} color="#E07A4B" strokeWidth={2.4} /></span></h1>
        <div className={`k-foxsay ${foxSay.tone}`} role="status"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Foxy" /><p>{foxSay.t}</p></div>
      </div>

      {!child.diagnosticDone && (
        <Link to="/enfant/diagnostic" className="k-quest">
          <span className="k-quest-ic"><Compass size={28} /></span>
          <span className="grow"><b>Ta première mission</b><span className="small">Un petit parcours pour voir où tu en es. Sans note !</span></span>
          <span className="k-btn3d sm">C’est parti</span>
        </Link>
      )}

      {tasks.map(t => { const l = lessonById.get(t.lessonId)!; const tm = meta(l.subject); return (
        <Link key={t.id} to={`/enfant/lecon/${t.lessonId}`} className={`k-banner teacher ${t.due && diffDays(t.due, today) <= 1 ? 'urgent' : ''}`}>
          <span className="k-banner-ic"><School size={28} /></span>
          <span className="grow"><span className="k-up tiny">Mission de {t.teacher}{t.due ? <span className="k-due">pour {dueLabel(t.due, today)}</span> : null}</span><b>Révise « {l.title} »</b><span className="small">{tm.name}{t.message ? ` · ${t.message}` : ''}</span></span>
          <span className="k-btn3d sm teal"><Play size={16} fill="currentColor" /> Jouer</span>
        </Link>) })}

      <section className="k-hero" style={{ ['--c' as string]: m.color, ['--cd' as string]: m.dark }}>
        <div className="k-hero-bg" aria-hidden="true"><i /><i /><i /></div>
        <img className="k-fox" src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
        <div className="k-hero-txt">
          <span className="k-tag">{reco ? why[reco.reason] : 'Bravo !'}</span>
          <h2>{reco ? reco.lesson.title : 'Tu as tout terminé !'}</h2>
          {reco && <div className="k-hero-meta"><span><Ico e={m.emoji} color="#fff" size={16} /> {m.name}</span><span><Zap size={15} /> {reco.lesson.ex.length} défis</span></div>}
          {reco && <Link className="k-btn3d" to={`/enfant/lecon/${reco.lesson.id}`}><Play size={24} fill="currentColor" /> Jouer</Link>}
        </div>
        <div className="k-goal">
          <Ring pct={n / goal} size={86} stroke={10} color={goalDone ? '#F5C65D' : '#fff'}>{goalDone ? <Check size={34} strokeWidth={3.4} color="#F5C65D" /> : <b>{Math.min(n, goal)}<small>/{goal}</small></b>}</Ring>
          <span>{goalDone ? 'Objectif réussi !' : 'Objectif du jour'}</span>
        </div>
      </section>

      {chests.length > 0 && (
        <Link to="/enfant/recompenses" className="k-banner gold">
          <span className="k-wiggle"><ChestArt state="ready" size={64} /></span>
          <span className="grow"><b>{chests.length} coffre{chests.length > 1 ? 's' : ''} à ouvrir !</b><span className="small">Qu’est-ce qui se cache dedans ?</span></span>
          <span className="k-btn3d sm gold"><Gift size={18} /> Ouvrir</span>
        </Link>
      )}

      <div className="k-duo">
        <section className={`k-card k-streak ${streak > 0 ? 'lit' : ''}`}>
          <div className="row" style={{ gap: 12 }}>
            <span className="k-flame"><Flame size={40} strokeWidth={2.4} /></span>
            <div><div className="k-num">{streak}</div><div className="small"><b>jour{streak > 1 ? 's' : ''} de suite</b></div></div>
          </div>
          <div className="k-week">
            {week.map((d, i) => {
              const on = learned.has(d), future = parseDay(d) > new Date()
              return <span key={d} className={`${on ? 'on' : ''} ${d === today ? 'now' : ''} ${future ? 'fut' : ''}`}><i>{on && <Flame size={16} strokeWidth={2.8} />}</i>{WEEKDAY_INITIALS[i]}</span>
            })}
          </div>
          {child.streak.freezes > 0 && <div className="tiny k-freeze"><Snowflake size={14} /> {child.streak.freezes} joker{child.streak.freezes > 1 ? 's' : ''} pour protéger ta série</div>}
        </section>

        {nextChest && (
          <Link to="/enfant/recompenses" className="k-card k-next">
            <div className="row" style={{ gap: 12 }}>
              <span className="k-next-art"><ChestArt state="locked" size={58} />{nextChest.kind === 'avatar' && <img src={avatarSrc(nextChest.value)} alt="" />}</span>
              <div className="grow"><div className="tiny k-up">Prochain trésor</div><b>{nextChest.title}</b></div>
            </div>
            <div className="k-xpbar mt16"><i style={{ width: `${Math.max(4, ((child.xp - prevXp) / (nextChest.xp - prevXp)) * 100)}%` }} /></div>
            <div className="small mt8"><b>Encore {nextChest.xp - child.xp} points</b> pour l’ouvrir</div>
          </Link>
        )}
      </div>

      {due.length > 0 && (
        <Link to={`/enfant/lecon/${due[0].id}`} className="k-banner violet">
          <span className="k-banner-ic"><Brain size={28} /></span>
          <span className="grow"><b>Défi mémoire</b><span className="small">Te souviens-tu de « {due[0].title} » ?</span></span>
          <span className="k-btn3d sm violet">Relever</span>
        </Link>
      )}

      <section>
        <h3 className="k-h3">Mes mondes</h3>
        <div className="k-subjects">{subs.map(sid => <SubjectTile key={sid} child={child} sid={sid} />)}</div>
      </section>
    </div>
  )
}
