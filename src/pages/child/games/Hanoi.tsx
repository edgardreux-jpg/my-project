import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import type { GameProps } from './types'

const DISKS: Record<string, number> = { ce1: 3, ce2: 3, cm1: 4, cm2: 5 }
const COLORS = ['#E5484D', '#F5A524', '#30A46C', '#3A76CE', '#8E4EC6', '#D6409F']

export default function Hanoi({ level, sound, onWin }: GameProps) {
  const n = DISKS[level]
  const [towers, setTowers] = useState<number[][]>(() => [[...Array(n).keys()].map(i => n - i), [], []])
  const [held, setHeld] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [nope, setNope] = useState<number | null>(null)
  const min = 2 ** n - 1

  const tap = (i: number) => {
    if (held === null) { if (towers[i].length) { setHeld(i); sfx('tap', sound) } return }
    if (held === i) { setHeld(null); return }
    const disk = towers[held][towers[held].length - 1]
    const top = towers[i][towers[i].length - 1]
    if (top && top < disk) { setNope(i); sfx('oops', sound); setTimeout(() => setNope(null), 400); return }
    const nt = towers.map(t => t.slice()); nt[held].pop(); nt[i].push(disk)
    setTowers(nt); setHeld(null); const m = moves + 1; setMoves(m); sfx('tap', sound)
    if (nt[2].length === n) { sfx('done', sound); setTimeout(() => onWin(m, m === min ? `Parfait : le minimum de ${min} coups !` : `Réussi en ${m} coups. Le minimum est ${min}.`), 700) }
  }

  return (
    <div className="g-hanoi">
      <div className="g-stats"><span>{moves} coup{moves > 1 ? 's' : ''}</span><span className="muted">Minimum : {min}</span></div>
      <div className="hn">
        {towers.map((t, i) => (
          <button key={i} className={`hn-t ${held === i ? 'held' : ''} ${nope === i ? 'nope' : ''} ${i === 2 ? 'hn-goal' : ''}`} onClick={() => tap(i)} aria-label={`Tour ${i + 1}${i === 2 ? ' (arrivée)' : ''}, ${t.length} disque${t.length > 1 ? 's' : ''}`}>
            <i className="hn-rod" />
            <span className="hn-stack">
              {t.map((d, k) => <span key={d} className={`hn-d ${held === i && k === t.length - 1 ? 'up' : ''}`} style={{ width: `${30 + (d / n) * 64}%`, background: COLORS[d - 1] }} />)}
            </span>
            <small>{i === 0 ? 'Départ' : i === 2 ? 'Arrivée' : ''}</small>
          </button>
        ))}
      </div>
      <p className="tiny muted center mt8">Touche une tour pour prendre son disque du haut, puis une autre pour le poser. Jamais un grand disque sur un plus petit.</p>
    </div>
  )
}
