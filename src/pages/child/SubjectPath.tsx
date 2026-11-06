import { Link, useParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, Lock, Check, Crown, Flag, Trophy } from 'lucide-react'
import { Avatar } from '../../components/common'
import { useStore } from '../../state/store'
import { meta, pathFor, type PathItem, SUBJECT_META, subjectsOf, lessonsOf } from '../../lib/curriculum'
import { masteryOf, visibleSubjects } from '../../lib/progress'
import { Ico, Stars } from '../../components/Icon'

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

type Stop =
  | { kind: 'world'; key: string; n: number; title: string; done: number; total: number }
  | { kind: 'lesson'; key: string; it: PathItem }
  | { kind: 'goal'; key: string }

const ROW = 150, ROW_WORLD = 118, ROW_GOAL = 120
/** Positions horizontales en % : le chemin serpente comme une carte de jeu. */
const XS = [50, 24, 50, 76]

export default function SubjectPath() {
  const { sid = '' } = useParams()
  const { child } = useStore()
  const wrap = useRef<HTMLDivElement>(null)
  const here = useRef<HTMLAnchorElement>(null)
  const [w, setW] = useState(360)

  useLayoutEffect(() => {
    const el = wrap.current; if (!el) return
    const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); setW(el.clientWidth)
    return () => ro.disconnect()
  }, [])
  useEffect(() => { here.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }) }, [sid])

  if (!child) return null
  const m = meta(sid)
  const groups = pathFor(child.grade, sid)

  // Étapes du chemin : panneau de monde, leçons, puis l'arrivée
  const stops: Stop[] = []
  groups.forEach((g, gi) => {
    const ls = g.items.filter(i => i.lesson)
    stops.push({ kind: 'world', key: 'w-' + g.id, n: gi + 1, title: g.title, done: ls.filter(i => (child.lessons[i.lesson!.id]?.done ?? 0) > 0).length, total: ls.length })
    g.items.forEach(it => stops.push({ kind: 'lesson', key: it.key, it }))
  })
  stops.push({ kind: 'goal', key: 'goal' })

  // Position de chaque étape
  let y = 50, zig = 0
  const pos = stops.map(st => {
    const xPct = st.kind === 'lesson' ? XS[zig++ % XS.length] : 50
    // Un rond au centre porte son étiquette dessous : on lui laisse plus de place
    const h = st.kind === 'world' ? ROW_WORLD : st.kind === 'goal' ? ROW_GOAL : xPct === 50 ? ROW + 60 : ROW
    const p = { x: (xPct / 100) * w, y, xPct }
    y += h
    return p
  })
  const H = y + 10
  const lessonStops = stops.map((s, i) => ({ s, i })).filter(o => o.s.kind === 'lesson' && (o.s as any).it.lesson)
  const cur = lessonStops.find(o => !((child.lessons[(o.s as any).it.lesson.id]?.done ?? 0) > 0))
  const curIdx = cur ? cur.i : stops.length - 1

  const d = (a: number, b: number) => {
    let out = `M ${pos[a].x} ${pos[a].y}`
    for (let i = a + 1; i <= b; i++) {
      const p0 = pos[i - 1], p1 = pos[i], dy = (p1.y - p0.y) / 2
      out += ` C ${p0.x} ${p0.y + dy}, ${p1.x} ${p1.y - dy}, ${p1.x} ${p1.y}`
    }
    return out
  }
  const total = lessonStops.length, doneCount = lessonStops.filter(o => (child.lessons[(o.s as any).it.lesson.id]?.done ?? 0) > 0).length

  return (
    <div>
      <Link to="/enfant/matieres" className="row small" style={{ marginBottom: 10 }}><ChevronLeft size={18} /> Matières</Link>
      <div className="card flat map-head" style={{ background: m.soft, border: 0 }}>
        <span className="mh-ic" style={{ color: m.color }}><Ico e={m.emoji} color="currentColor" /></span>
        <div className="grow">
          <h1 style={{ fontSize: '1.5rem', color: m.dark }}>{m.name}</h1>
          <div className="small" style={{ color: m.dark }}>{child.grade.toUpperCase()} · {doneCount} / {total} étapes</div>
          <div className="meter" style={{ background: '#fff', marginBottom: 0, marginTop: 6 }}><i style={{ width: `${total ? (doneCount / total) * 100 : 0}%`, background: m.color }} /></div>
        </div>
      </div>

      <div className="map" ref={wrap} style={{ height: H, ['--c' as any]: m.color, ['--cd' as any]: m.dark, ['--cs' as any]: m.soft }}>
        <svg className="map-trail" width={w} height={H} aria-hidden="true">
          <path d={d(0, stops.length - 1)} className="trail-todo" />
          {curIdx > 0 && <path d={d(0, curIdx)} className="trail-done" />}
        </svg>

        {stops.map((st, i) => {
          const p = pos[i]
          const side = p.xPct < 40 ? 'L' : p.xPct > 60 ? 'R' : 'C'
          if (st.kind === 'world') return (
            <div key={st.key} className="world" style={{ top: p.y }}>
              <Flag size={16} /> <span>Monde {st.n}</span><b>{st.title}</b>{st.total > 0 && <em>{st.done}/{st.total}</em>}
            </div>
          )
          if (st.kind === 'goal') return (
            <div key={st.key} className={`goal ${doneCount === total && total ? 'won' : ''}`} style={{ top: p.y }}>
              <span className="goal-ic"><Trophy size={34} /></span>
              <b>{doneCount === total && total ? 'Bravo, chemin terminé !' : 'Arrivée'}</b>
            </div>
          )
          const l = st.it.lesson
          const prog = l ? child.lessons[l.id] : undefined
          const done = (prog?.done ?? 0) > 0
          const mastery = masteryOf(prog)
          const isHere = i === curIdx
          const state = !l ? 'soon' : done ? 'done' : isHere ? 'here' : 'todo'
          const sub = !l ? 'Bientôt' : mastery === 'mastered' ? 'Maîtrisé' : done ? (prog!.best >= 3 ? 'À revoir plus tard' : 'Rejoue pour 3 étoiles') : isHere ? 'C’est ici !' : `${l.ex.length} exercices`
          const inner = (
            <>
              {isHere && <span className="me"><Avatar emoji={child.avatar} frame={child.frame} size={40} /></span>}
              <span className="stop-node">
                {!l ? <Lock size={24} /> : mastery === 'mastered' ? <Crown size={30} /> : done ? <Check size={32} strokeWidth={4} /> : isHere ? <Ico e="▶" size={30} color="#fff" /> : <Ico e="★" size={24} color="currentColor" />}
                {prog && prog.best > 0 && <span className="st"><Stars n={prog.best} size={13} /></span>}
              </span>
              <span className="stop-label"><b>{l ? l.title : st.it.themeTitle}</b><span>{sub}</span></span>
            </>
          )
          const cls = `stop s-${state} side-${side}`
          return l
            ? <Link key={st.key} ref={isHere ? here : undefined} to={`/enfant/lecon/${l.id}`} className={cls} style={{ left: p.x, top: p.y }} aria-label={`${l.title}, ${sub}`}>{inner}</Link>
            : <div key={st.key} className={cls} style={{ left: p.x, top: p.y }} aria-disabled="true">{inner}</div>
        })}
      </div>
    </div>
  )
}
