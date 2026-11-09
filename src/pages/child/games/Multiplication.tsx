import { useRef, useState } from 'react'
import { sfx } from '../../../lib/audio'
import { pick } from '../../../lib/games'
import { fr, Keypad, ri, TimeBar, useCountdown } from './kit'
import type { GameProps } from './types'

const SECONDS = 60
const TARGET = [8, 10, 12, 14, 14, 12]

function make(tier: number): [number, number] {
  switch (tier) {
    case 0: return [pick([2, 5, 10]), ri(1, 10)]
    case 1: return [pick([2, 3, 4, 5, 10]), ri(1, 10)]
    case 2: return [ri(2, 9), ri(2, 10)]
    case 3: return [pick([6, 7, 8, 9, ri(3, 9)]), ri(3, 9)]
    case 4: return Math.random() < 0.35 ? [ri(2, 9), pick([10, 20, 30, 40, 50, 100])] : [ri(3, 12), ri(3, 12)]
    default: return Math.random() < 0.3 ? [ri(11, 99), pick([10, 100])] : [ri(12, 39), ri(3, 9)]
  }
}

/** Course aux tables : le plus de bonnes réponses possible en 1 minute. */
export default function Multiplication({ tier, sound, onWin, onLose }: GameProps) {
  const target = TARGET[tier] ?? 12
  const [q, setQ] = useState(() => make(tier))
  const [val, setVal] = useState('')
  const [ok, setOk] = useState(0)
  const [ko, setKo] = useState(0)
  const [fb, setFb] = useState<null | { good: boolean; text: string }>(null)
  const [done, setDone] = useState(false)
  const ans = q[0] * q[1]
  const okRef = useRef(0); okRef.current = ok

  const left = useCountdown(SECONDS, !done, () => {
    setDone(true)
    const n = okRef.current
    const m = `${n} bonne${n > 1 ? 's' : ''} réponse${n > 1 ? 's' : ''} en 1 minute`
    if (n >= target) onWin(n, `Bravo ! ${m}.`)
    else onLose?.(`${m}. L’objectif était ${target} : rejoue pour battre ton record !`)
  })

  const next = () => { let n = make(tier); while (n[0] === q[0] && n[1] === q[1]) n = make(tier); setQ(n); setVal('') }
  const submit = (v = val) => {
    if (!v || done || fb) return
    if (Number(v) === ans) { sfx('good', sound); setOk(ok + 1); setFb({ good: true, text: 'Juste !' }); setTimeout(() => { setFb(null); next() }, 350) }
    else { sfx('oops', sound); setKo(ko + 1); setFb({ good: false, text: `${fr(q[0])} × ${fr(q[1])} = ${fr(ans)}` }); setTimeout(() => { setFb(null); next() }, 1300) }
  }
  const change = (v: string) => { setVal(v); if (v.length === String(ans).length && Number(v) === ans) submit(v) }

  return (
    <div className="lg">
      <div className="g-stats"><span>Justes : <b>{ok}</b> / {target}</span><span>Erreurs : {ko}</span></div>
      <TimeBar left={left} total={SECONDS} />
      <div className={`lg-q ${fb ? (fb.good ? 'good' : 'bad') : ''}`} aria-live="polite">
        <span className="lg-calc">{fr(q[0])} × {fr(q[1])} =</span>
        <span className="lg-ans">{fb && !fb.good ? '' : val || '?'}</span>
        {fb && !fb.good && <span className="lg-fix">{fb.text}</span>}
      </div>
      <Keypad value={val} onChange={change} onOk={() => submit()} disabled={done || !!fb} />
    </div>
  )
}
