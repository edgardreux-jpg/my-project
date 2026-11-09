import { useState } from 'react'
import { Heart, Rocket } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { shuffle } from '../../../lib/games'
import { fr, ri, TimeBar, useCountdown } from './kit'
import type { GameProps } from './types'
import type { LevelId } from '../../../types'

const N = 12, LIVES = 3
const SEC: Record<LevelId, number> = { ce1: 16, ce2: 15, cm1: 15, cm2: 16 }

export function make(lv: LevelId, d: number): [number, number] {
  switch (`${lv}${d}`) {
    case 'ce10': { const a = ri(6, 20); return [a, ri(1, Math.min(9, a - 1))] }
    case 'ce11': { const a = ri(21, 99); return [a, ri(2, 9)] }
    case 'ce12': case 'ce20': { const a = ri(30, 99); return [a, ri(11, a - 5)] }
    case 'ce21': { const a = ri(120, 999); return [a, ri(15, 99)] }
    case 'ce22': case 'cm10': { const a = ri(300, 999); return [a, ri(101, a - 50)] }
    case 'cm11': case 'cm20': { const a = ri(1200, 9999); return [a, ri(150, 999)] }
    case 'cm12': { const a = ri(12000, 99999); return [a, ri(1200, 9999)] }
    case 'cm21': { const a = ri(50, 400) / 10; return [a, ri(11, Math.floor(a * 10) - 5) / 10] }
    default: { const a = ri(500, 9999) / 100; return [a, ri(101, Math.floor(a * 100) - 50) / 100] }
  }
}
export function options(a: number, b: number, u: number): number[] {
  const r = Number((a - b).toFixed(2))
  const cand = [r + u, r - u, r + 10 * u, r - 10 * u, a + b, r + 2 * u].map(x => Number(x.toFixed(2))).filter(x => x >= 0 && x !== r)
  return shuffle([r, ...shuffle([...new Set(cand)]).slice(0, 3)])
}

/** Fusée des soustractions : 12 calculs, 3 vies, un peu de temps pour chacun. */
export default function Soustraction({ level, diff, sound, onWin, onLose }: GameProps) {
  const sec = SEC[level]
  const u = level === 'cm2' && diff === 2 ? 0.01 : level === 'cm2' && diff === 1 ? 0.1 : 1
  const [i, setI] = useState(0)
  const [q, setQ] = useState(() => make(level, diff))
  const [opts, setOpts] = useState(() => options(q[0], q[1], u))
  const [lives, setLives] = useState(LIVES)
  const [ok, setOk] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const r = Number((q[0] - q[1]).toFixed(2))

  const advance = (l: number, good: number) => {
    setTimeout(() => {
      setChosen(null)
      if (l <= 0) { onLose?.(`Plus de vies ! Tu as réussi ${good} soustraction${good > 1 ? 's' : ''} sur ${N}. Rejoue, la fusée t’attend.`); return }
      if (i + 1 >= N) { onWin(good, `Décollage réussi ! ${good} bonne${good > 1 ? 's' : ''} réponse${good > 1 ? 's' : ''} sur ${N}.`); return }
      const n = make(level, diff); setQ(n); setOpts(options(n[0], n[1], u)); setI(i + 1); setRound(x => x + 1)
    }, l < lives ? 1400 : 800)
  }
  const choose = (v: number | null) => {
    if (chosen !== null) return
    setChosen(v ?? NaN)
    if (v === r) { sfx('good', sound); const g = ok + 1; setOk(g); advance(lives, g) }
    else { sfx('oops', sound); const l = lives - 1; setLives(l); advance(l, ok) }
  }
  const left = useCountdown(sec, chosen === null, () => choose(null))

  return (
    <div className="lg">
      <div className="g-stats">
        <span>Calcul {i + 1}/{N}</span>
        <span className="lg-lives" aria-label={`${lives} vie${lives > 1 ? 's' : ''}`}>{Array.from({ length: LIVES }, (_, k) => <Heart key={k} size={20} className={k < lives ? 'on' : ''} />)}</span>
      </div>
      <div className="lg-track" aria-hidden="true"><span style={{ left: `calc(${(i / N) * 100}% - 4px)` }}><Rocket size={26} /></span></div>
      <TimeBar key={round} left={chosen === null ? left : 0} total={sec} />
      <div className="lg-q" aria-live="polite"><span className="lg-calc">{fr(q[0])} − {fr(q[1])} = ?</span></div>
      <div className="lg-opts">
        {opts.map(o => {
          const cls = chosen === null ? '' : o === r ? 'good' : o === chosen ? 'bad' : 'dim'
          return <button key={o} type="button" className={`lg-opt ${cls}`} disabled={chosen !== null} onClick={() => choose(o)}>{fr(o)}</button>
        })}
      </div>
      {chosen !== null && Number.isNaN(chosen) && <p className="lg-help">Temps écoulé : la réponse était {fr(r)}.</p>}
    </div>
  )
}
