import { useState } from 'react'
import { sfx, speak, canSpeak } from '../../../lib/audio'
import { rnd } from '../../../lib/games'
import type { GameProps } from './types'

const CFG: { n: number; ships: number[]; tapGrid: boolean }[] = [
  { n: 5, ships: [3, 2], tapGrid: true },
  { n: 6, ships: [3, 2, 2], tapGrid: true },
  { n: 8, ships: [4, 3, 2, 2], tapGrid: false },
  { n: 8, ships: [4, 3, 3, 2], tapGrid: false },
  { n: 10, ships: [5, 4, 3, 3, 2], tapGrid: false },
  { n: 10, ships: [4, 3, 2, 2, 2], tapGrid: false },
]
const COLS = 'ABCDEFGHIJ'

export function place(n: number, ships: number[]): number[][] {
  for (let t = 0; t < 500; t++) {
    const used = new Set<number>(), out: number[][] = []
    let ok = true
    for (const len of ships) {
      let placed = false
      for (let k = 0; k < 200 && !placed; k++) {
        const h = rnd(2) === 0, x = rnd(h ? n - len + 1 : n), y = rnd(h ? n : n - len + 1)
        const cells = Array.from({ length: len }, (_, i) => (h ? y * n + x + i : (y + i) * n + x))
        // les bateaux ne se touchent pas
        const near = cells.some(c => { const cx = c % n, cy = Math.floor(c / n); for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = cx + dx, Y = cy + dy; if (X >= 0 && Y >= 0 && X < n && Y < n && used.has(Y * n + X)) return true } return false })
        if (near) continue
        cells.forEach(c => used.add(c)); out.push(cells); placed = true
      }
      if (!placed) { ok = false; break }
    }
    if (ok) return out
  }
  return []
}

export default function Bataille({ level, tier, sound, onWin }: GameProps) {
  const { n, ships, tapGrid } = CFG[tier]
  const [fleet] = useState(() => place(n, ships))
  const [shots, setShots] = useState<number[]>([])
  const [col, setCol] = useState<number | null>(null)
  const [row, setRow] = useState<number | null>(null)
  const [last, setLast] = useState<{ c: number; msg: string } | null>(null)
  const label = (c: number) => `${COLS[c % n]}${Math.floor(c / n) + 1}`
  const sunk = (s: number[]) => s.every(c => shots.includes(c))
  const done = fleet.length > 0 && fleet.every(s => s.every(c => shots.includes(c)))

  const fire = (c: number) => {
    if (done || shots.includes(c)) { if (shots.includes(c)) setLast({ c, msg: `Tu as déjà tiré en ${label(c)}.` }); return }
    const ns = [...shots, c]; setShots(ns)
    const ship = fleet.find(s => s.includes(c))
    let msg: string
    if (!ship) { msg = `${label(c)} : dans l’eau.`; sfx('tap', sound) }
    else if (ship.every(x => ns.includes(x))) { msg = `${label(c)} : coulé !`; sfx('done', sound) }
    else { msg = `${label(c)} : touché !`; sfx('good', sound) }
    setLast({ c, msg }); setCol(null); setRow(null)
    if (canSpeak() && level === 'ce1') speak(msg.replace(':', ','))
    if (fleet.every(s => s.every(x => ns.includes(x)))) setTimeout(() => onWin(ns.length, `Toute la flotte coulée en ${ns.length} tirs !`), 900)
  }

  return (
    <div className="g-bn">
      <div className="g-stats"><span>Tirs : {shots.length}</span><span>Bateaux : {fleet.filter(sunk).length}/{fleet.length} coulés</span></div>
      <div className="bn" style={{ gridTemplateColumns: `28px repeat(${n},1fr)` }}>
        <span />
        {Array.from({ length: n }, (_, x) => <b key={`h${x}`} className={`bn-h ${col === x ? 'on' : ''}`}>{COLS[x]}</b>)}
        {Array.from({ length: n }, (_, y) => [
          <b key={`r${y}`} className={`bn-h ${row === y ? 'on' : ''}`}>{y + 1}</b>,
          ...Array.from({ length: n }, (_, x) => {
            const c = y * n + x, hit = shots.includes(c), ship = fleet.find(s => s.includes(c))
            const cls = hit ? (ship ? (sunk(ship) ? 'sunk' : 'hit') : 'miss') : ''
            const aim = (col === x && row === null) || (row === y && col === null) || (col === x && row === y)
            return <button key={c} className={`bn-c ${cls} ${aim ? 'aim' : ''} ${last?.c === c ? 'last' : ''}`} disabled={!tapGrid || hit || done}
              aria-label={`${label(c)}${hit ? (ship ? ', touché' : ', dans l’eau') : ''}`} onClick={() => fire(c)}>{hit ? (ship ? '✹' : '•') : ''}</button>
          }),
        ])}
      </div>
      <p className="bn-msg" role="status">{last?.msg ?? (tapGrid ? 'Touche une case pour tirer. Lis bien sa lettre et son chiffre !' : 'Choisis une lettre et un chiffre, puis tire.')}</p>
      {!tapGrid && (
        <div className="bn-pick">
          <div className="bn-keys">{Array.from({ length: n }, (_, x) => <button key={x} className={`bn-k ${col === x ? 'on' : ''}`} onClick={() => setCol(x)}>{COLS[x]}</button>)}</div>
          <div className="bn-keys">{Array.from({ length: n }, (_, y) => <button key={y} className={`bn-k ${row === y ? 'on' : ''}`} onClick={() => setRow(y)}>{y + 1}</button>)}</div>
          <button className="btn block mt8" disabled={col === null || row === null || done} onClick={() => col !== null && row !== null && fire(row * n + col)}>
            {col !== null && row !== null ? `Feu en ${COLS[col]}${row + 1} !` : 'Choisis la case'}
          </button>
        </div>
      )}
    </div>
  )
}
