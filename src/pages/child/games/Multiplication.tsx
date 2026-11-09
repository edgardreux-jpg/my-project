import { useRef, useState } from 'react'
import { sfx } from '../../../lib/audio'
import { pick } from '../../../lib/games'
import { fr, Keypad, ri, TimeBar, useCountdown } from './kit'
import type { GameProps } from './types'
import type { LevelId } from '../../../types'

const SECONDS = 60
const TARGET: Record<LevelId, [number, number, number]> = { ce1: [6, 8, 10], ce2: [8, 8, 10], cm1: [10, 9, 7], cm2: [10, 7, 8] }

/** Questions selon la classe et la difficulté ; renvoie [a, b] (b peut être décimal en CM2). */
export function make(lv: LevelId, d: number): [number, number] {
  const k = `${lv}${d}`
  switch (k) {
    case 'ce10': return [pick([2, 5, 10]), ri(1, 10)]
    case 'ce11': case 'ce12': case 'ce20': return [pick([2, 3, 4, 5, 10]), ri(1, 10)]
    case 'ce21': return [pick([6, 7, 8, 9]), ri(2, 10)]
    case 'ce22': case 'cm10': return [ri(2, 9), ri(2, 10)]
    case 'cm11': return Math.random() < 0.5 ? [ri(2, 99), pick([10, 100])] : [ri(2, 9) * 10, ri(2, 9)]
    case 'cm12': return [ri(11, 25), ri(2, 9)]
    case 'cm20': return Math.random() < 0.6 ? [ri(3, 9), ri(3, 9)] : [ri(2, 99), pick([10, 100])]
    case 'cm21': return [ri(12, 49), ri(3, 9)]
    default: return [ri(11, 99) / 10, pick([10, 100, 1000])]
  }
}

/** Course aux tables : le plus de bonnes réponses possible en 1 minute. */
export default function Multiplication({ level, diff, sound, onWin, onLose }: GameProps) {
  const target = TARGET[level][diff]
  const dec = level === 'cm2' && diff === 2
  const [q, setQ] = useState(() => make(level, diff))
  const [val, setVal] = useState('')
  const [ok, setOk] = useState(0)
  const [ko, setKo] = useState(0)
  const [fb, setFb] = useState<null | { good: boolean; text: string }>(null)
  const [done, setDone] = useState(false)
  const ans = Number((q[0] * q[1]).toFixed(2))
  const okRef = useRef(0); okRef.current = ok

  const left = useCountdown(SECONDS, !done, () => {
    setDone(true)
    const n = okRef.current
    const m = `${n} bonne${n > 1 ? 's' : ''} réponse${n > 1 ? 's' : ''} en 1 minute`
    if (n >= target) onWin(n, `Bravo ! ${m}.`)
    else onLose?.(`${m}. L’objectif était ${target} : rejoue pour battre ton record !`)
  })

  const next = () => { let n = make(level, diff); while (n[0] === q[0] && n[1] === q[1]) n = make(level, diff); setQ(n); setVal('') }
  const submit = (v = val) => {
    if (!v || done || fb) return
    if (Number(v.replace(',', '.')) === ans) { sfx('good', sound); setOk(ok + 1); setFb({ good: true, text: 'Juste !' }); setTimeout(() => { setFb(null); next() }, 350) }
    else { sfx('oops', sound); setKo(ko + 1); setFb({ good: false, text: `${fr(q[0])} × ${fr(q[1])} = ${fr(ans)}` }); setTimeout(() => { setFb(null); next() }, 1300) }
  }
  const change = (v: string) => { setVal(v); if (v === fr(ans).replace(/\s/g, '')) submit(v) }

  return (
    <div className="lg">
      <div className="g-stats"><span>Justes : <b>{ok}</b> / {target}</span><span>Erreurs : {ko}</span></div>
      <TimeBar left={left} total={SECONDS} />
      <div className={`lg-q ${fb ? (fb.good ? 'good' : 'bad') : ''}`} aria-live="polite">
        <span className="lg-calc">{fr(q[0])} × {fr(q[1])} =</span>
        <span className="lg-ans">{fb && !fb.good ? '' : val || '?'}</span>
        {fb && !fb.good && <span className="lg-fix">{fb.text}</span>}
      </div>
      <Keypad value={val} onChange={change} onOk={() => submit()} decimal={dec} disabled={done || !!fb} />
    </div>
  )
}
