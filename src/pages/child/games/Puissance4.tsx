import { useEffect, useState } from 'react'
import { sfx } from '../../../lib/audio'
import type { GameProps } from './types'

const W = 7, H = 6
type Cell = 0 | 1 | 2   // 1 = enfant, 2 = Foxy
type Board = Cell[][]   // [colonne][ligne depuis le bas]
const DEPTH: Record<string, number> = { ce1: 1, ce2: 2, cm1: 4, cm2: 6 }

const empty = (): Board => Array.from({ length: W }, () => [])
const get = (b: Board, c: number, r: number): Cell => (c < 0 || c >= W || r < 0 || r >= H ? 0 : b[c][r] ?? 0)
const play = (b: Board, c: number, p: Cell): Board => b.map((col, i) => (i === c ? [...col, p] : col))

function winLine(b: Board): [number, number][] | null {
  const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]]
  for (let c = 0; c < W; c++) for (let r = 0; r < H; r++) {
    const p = get(b, c, r); if (!p) continue
    for (const [dc, dr] of dirs) {
      const line: [number, number][] = [[c, r]]
      for (let k = 1; k < 4 && get(b, c + dc * k, r + dr * k) === p; k++) line.push([c + dc * k, r + dr * k])
      if (line.length === 4) return line
    }
  }
  return null
}

function score(b: Board): number {
  let s = 0
  for (let r = 0; r < H; r++) { if (get(b, 3, r) === 2) s += 3; else if (get(b, 3, r) === 1) s -= 3 }
  const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]]
  for (let c = 0; c < W; c++) for (let r = 0; r < H; r++) for (const [dc, dr] of dirs) {
    if (c + dc * 3 < 0 || c + dc * 3 >= W || r + dr * 3 < 0 || r + dr * 3 >= H) continue
    let a = 0, h = 0
    for (let k = 0; k < 4; k++) { const v = get(b, c + dc * k, r + dr * k); if (v === 2) a++; else if (v === 1) h++ }
    if (a && h) continue
    s += a === 3 ? 6 : a === 2 ? 2 : 0
    s -= h === 3 ? 8 : h === 2 ? 2 : 0
  }
  return s
}

function minimax(b: Board, d: number, alpha: number, beta: number, max: boolean): number {
  const w = winLine(b)
  if (w) return get(b, w[0][0], w[0][1]) === 2 ? 10000 + d : -10000 - d
  const moves = [3, 2, 4, 1, 5, 0, 6].filter(c => b[c].length < H)
  if (!d || !moves.length) return score(b)
  if (max) { let v = -Infinity; for (const c of moves) { v = Math.max(v, minimax(play(b, c, 2), d - 1, alpha, beta, false)); alpha = Math.max(alpha, v); if (alpha >= beta) break } return v }
  let v = Infinity; for (const c of moves) { v = Math.min(v, minimax(play(b, c, 1), d - 1, alpha, beta, true)); beta = Math.min(beta, v); if (alpha >= beta) break } return v
}

function foxMove(b: Board, level: string): number {
  const moves = [3, 2, 4, 1, 5, 0, 6].filter(c => b[c].length < H)
  // CE1 : Foxy gagne si elle peut, bloque une fois sur deux, sinon joue au hasard
  if (level === 'ce1') {
    for (const c of moves) if (winLine(play(b, c, 2))) return c
    if (Math.random() < 0.5) for (const c of moves) if (winLine(play(b, c, 1))) return c
    return moves[Math.floor(Math.random() * moves.length)]
  }
  let best = moves[0], bv = -Infinity
  for (const c of moves) {
    const v = minimax(play(b, c, 2), DEPTH[level] - 1, -Infinity, Infinity, false) + Math.random() * (level === 'ce2' ? 4 : 0.5)
    if (v > bv) { bv = v; best = c }
  }
  return best
}

export default function Puissance4({ level, sound, onWin, onLose }: GameProps) {
  const [b, setB] = useState<Board>(empty)
  const [turn, setTurn] = useState<1 | 2>(1)
  const [line, setLine] = useState<[number, number][] | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const over = !!line || b.every(c => c.length === H)

  useEffect(() => {
    if (turn !== 2 || over) return
    const t = setTimeout(() => {
      const c = foxMove(b, level)
      const nb = play(b, c, 2); setB(nb); sfx('tap', sound)
      const w = winLine(nb)
      if (w) { setLine(w); setTimeout(() => onLose?.('Foxy a gagné cette fois. Revanche ?'), 1200) }
      else if (nb.every(x => x.length === H)) setTimeout(() => onLose?.('Match nul ! Belle défense.'), 900)
      else setTurn(1)
    }, 550)
    return () => clearTimeout(t)
  }, [turn, b, over, level, sound, onLose])

  const drop = (c: number) => {
    if (turn !== 1 || over || b[c].length >= H) return
    const nb = play(b, c, 1); setB(nb); sfx('tap', sound)
    const w = winLine(nb)
    if (w) { setLine(w); sfx('good', sound); setTimeout(() => onWin(undefined, 'Tu as battu Foxy !'), 1200) }
    else if (nb.every(x => x.length === H)) setTimeout(() => onLose?.('Match nul ! Belle partie.'), 900)
    else setTurn(2)
  }
  const isWin = (c: number, r: number) => !!line?.some(([x, y]) => x === c && y === r)

  return (
    <div className="g-p4">
      <div className="g-stats"><span className={`p4-turn ${turn === 1 ? 'me' : 'fox'}`}>{over ? 'Partie finie' : turn === 1 ? 'À toi : touche une colonne' : 'Foxy réfléchit…'}</span></div>
      <div className="p4" role="grid" aria-label="Plateau de Puissance 4" onMouseLeave={() => setHover(null)}>
        {Array.from({ length: W }, (_, c) => (
          <button key={c} className={`p4-col ${hover === c && turn === 1 && !over ? 'hov' : ''}`} aria-label={`Colonne ${c + 1}`} disabled={turn !== 1 || over || b[c].length >= H}
            onMouseEnter={() => setHover(c)} onClick={() => drop(c)}>
            {Array.from({ length: H }, (_, k) => { const r = H - 1 - k; const v = get(b, c, r); return (
              <span key={r} className={`p4-h ${v === 1 ? 'me' : v === 2 ? 'fox' : ''} ${isWin(c, r) ? 'win' : ''}`} style={v ? { animationDuration: `${0.12 + (H - r) * 0.05}s` } : undefined} />
            ) })}
          </button>
        ))}
      </div>
      <div className="row gap16 mt8 small" style={{ justifyContent: 'center' }}><span className="row gap8"><i className="p4-dot me" /> Toi</span><span className="row gap8"><i className="p4-dot fox" /> Foxy</span></div>
    </div>
  )
}
