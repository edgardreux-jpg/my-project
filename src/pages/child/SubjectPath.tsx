import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Lock, Check } from 'lucide-react'
import { useStore } from '../../state/store'
import { meta, pathFor, SUBJECT_META, subjectsOf, lessonsOf } from '../../lib/curriculum'
import { masteryOf, visibleSubjects } from '../../lib/progress'
import { Ico, Stars, avatarColor } from '../../components/Icon'

export function SubjectList() {
  const { child } = useStore()
  if (!child) return null
  const subs = visibleSubjects(child, subjectsOf(child.grade))
  return (
    <div className="col gap20">
      <h1 className="h-lg">Mes matières</h1>
      <div className="subjects">
        {subs.map(sid => {
          const m = SUBJECT_META[sid]
          const n = lessonsOf(child.grade, sid).length
          return (
            <Link key={sid} to={`/enfant/matiere/${sid}`} className="subj" style={{ opacity: n ? 1 : .6 }}>
              <span className="em" style={{ background: m.soft, color: m.color }}><Ico e={m.emoji} color="currentColor" /></span>
              <b>{m.name}</b>
              <span className="tiny muted">{n ? `${n} leçons` : 'Bientôt'}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function SubjectPath() {
  const { sid = '' } = useParams()
  const { child } = useStore()
  if (!child) return null
  const m = meta(sid)
  const groups = pathFor(child.grade, sid)
  let k = 0
  let firstOpen = true
  return (
    <div>
      <Link to="/enfant/matieres" className="row small" style={{ marginBottom: 10 }}><ChevronLeft size={18} /> Matières</Link>
      <div className="card flat" style={{ background: m.soft, border: 0 }}>
        <div className="row"><span style={{ fontSize: '2.2rem', color: m.color }}><Ico e={m.emoji} color="currentColor" /></span><div><h1 style={{ fontSize: '1.5rem', color: m.dark }}>{m.name}</h1><div className="small" style={{ color: m.dark }}>{child.grade.toUpperCase()} · {m.blurb}</div></div></div>
      </div>
      <div className="path">
        {groups.map(g => (
          <div key={g.id}>
            <div className="grp"><span style={{ background: m.soft, color: m.dark }}>{g.title}</span></div>
            {g.items.map(it => {
              const l = it.lesson
              const prog = l ? child.lessons[l.id] : undefined
              const mastery = masteryOf(prog)
              const side = k++ % 2 === 0 ? 'rowL' : 'rowR'
              const isNext = !!l && !prog?.done && firstOpen
              if (isNext) firstOpen = false
              const style = l ? { background: m.color, boxShadow: `0 6px 0 ${m.dark}` } : undefined
              const body = (
                <>
                  <span className={`node ${l ? '' : 'locked'}`} style={style}>
                    {!l ? <Lock size={26} /> : mastery === 'none' ? (isNext ? <Ico e="▶" size={26} color="#fff" /> : <Ico e="★" size={24} color="#fff" />) : <Check size={32} strokeWidth={4} />}
                    {prog && prog.best > 0 && <span className="st"><Stars n={prog.best} size={13} /></span>}
                  </span>
                  <span className="node-label"><b>{l ? l.title : it.themeTitle}</b><span className="tiny muted">{l ? (mastery === 'mastered' ? 'Maîtrisé' : mastery === 'none' ? `${l.ex.length} exercices` : (prog && prog.best >= 3 ? 'À revoir plus tard pour la maîtriser' : 'Rejoue pour gagner des étoiles')) : 'Bientôt disponible'}</span></span>
                </>
              )
              return l
                ? <Link key={it.key} to={`/enfant/lecon/${l.id}`} className={`node-row ${side}`} style={{ textDecoration: 'none', color: 'inherit' }}>{body}</Link>
                : <div key={it.key} className={`node-row ${side}`} aria-disabled="true" style={{ opacity: .7 }}>{body}</div>
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
