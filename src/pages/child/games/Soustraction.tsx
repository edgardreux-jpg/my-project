import { useState } from 'react'
import { Heart, Rocket } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { shuffle } from '../../../lib/games'
import { fr, ri, TimeBar, useCountdown } from './kit'
import type { GameProps } from './types'

const N = 12, LIVES = 3
const SEC = [15, 14, 13, 13, 14, 16]

function make(tier: number): [number, number] {
  switch (tier) {
    case 0: { const a = ri(6, 20); return [a, ri(1, Math.min(9, a - 1))] }
    case 1: { const a = ri(21, 99); return [a, ri(3, 9)] }
    case 2: { const a = ri(30, 99); return [a, ri(11, a - 5)] }
    case 3: { const a = ri(120, 999); return [a, ri(15, 99)] }
    case 4: { const a = ri(1200, 9999); return [a, ri(150, 999)] }
    default: { const a = ri(50, 400) / 10; return [a, ri(11, Math.floor(a * 10) - 5) / 10] }
  }
}
function options(a: number, b: number, tier: number): number[] {
  const r = Number((a - b).toFixed(1)), u = tier >= 5 ? 0.1 : 1
  const cand = [r + u, r - u, r + 10 * u, r - 10 * u, Number((a + b).toFixed(1)), r + 2 * u].map(x => Number(x.toFixed(1))).filter(x => x >= 0 && x !== r)
  return shuffle([r, ...shuffle([...new Set(cand)]).slice(0, 3)])
}

/** Fusée des soustractions : 12 calculs, 3 vies, un peu de temps pour chacun. */
export default function Soustraction({ tier, sound, onWin, onLose }: GameProps) {
  const sec = SEC[tier] ?? 14
  const [i, setI] = useState(0)
  const [q, setQ] = useState(() => make(tier))
  const [opts, setOpts] = useState(() => options(q[0], q[1], tier))
  const [lives, setLives] = useState(LIVES)
  const [ok, setOk] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const r = Number((q[0] - q[1]).toFixed(1))

  const advance = (l: number, good: number) => {
    setTimeout(() => {
      setChosen(null)
      if (l <= 0) { onLose?.(`Plus de vies ! Tu as réussi ${good} soustraction${good > 1 ? 's' : ''} sur ${N}. Rejoue, la fusée t’attend.`); return }
      if (i + 1 >= N) { onWin(good, `Décollage réussi ! ${good} bonne${good > 1 ? 's' : ''} réponse${good > 1 ? 's' : ''} sur ${N}.`); return }
      const n = make(tier); setQ(n); setOpts(options(n[0], n[1], tier)); setI(i + 1); setRound(x => x + 1)
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
