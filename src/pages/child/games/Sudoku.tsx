import { useEffect, useMemo, useState } from 'react'
import { Eraser, Lightbulb } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { rnd, shuffle, fmtTime } from '../../../lib/games'
import type { GameProps } from './types'

type Cfg = { n: number; br: number; bc: number; holes: number; sym?: string[] }
export const CFG: Record<string, Cfg> = {
  ce1: { n: 4, br: 2, bc: 2, holes: 9, sym: ['🍎', '🍌', '🍇', '🍊'] },
  ce2: { n: 6, br: 2, bc: 3, holes: 17 },
  cm1: { n: 6, br: 2, bc: 3, holes: 21 },
  cm2: { n: 9, br: 3, bc: 3, holes: 44 },
}

/** Grille résolue : motif de base puis mélanges qui conservent les règles. */
function solved({ n, br, bc }: Cfg): number[][] {
  const base = (r: number, c: number) => (bc * (r % br) + Math.floor(r / br) + c) % n
  const bandsR = shuffle([...Array(n / br).keys()]), stacksC = shuffle([...Array(n / bc).keys()])
  const rows = bandsR.flatMap(b => shuffle([...Array(br).keys()]).map(r => b * br + r))
  const cols = stacksC.flatMap(s => shuffle([...Array(bc).keys()]).map(c => s * bc + c))
  const nums = shuffle([...Array(n).keys()].map(i => i + 1))
  return rows.map(r => cols.map(c => nums[base(r, c)]))
}

export function countSolutions(g: number[][], cfg: Cfg, limit = 2): number {
  const { n, br, bc } = cfg
  let count = 0
  const ok = (r: number, c: number, v: number) => {
    for (let i = 0; i < n; i++) if (g[r][i] === v || g[i][c] === v) return false
    const r0 = r - (r % br), c0 = c - (c % bc)
    for (let i = 0; i < br; i++) for (let j = 0; j < bc; j++) if (g[r0 + i][c0 + j] === v) return false
    return true
  }
  const rec = (): void => {
    if (count >= limit) return
    let best: [number, number] | null = null, bestN = 99
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!g[r][c]) {
      let k = 0; for (let v = 1; v <= n; v++) if (ok(r, c, v)) k++
      if (k < bestN) { bestN = k; best = [r, c] }
    }
    if (!best) { count++; return }
    const [r, c] = best
    for (let v = 1; v <= n; v++) if (ok(r, c, v)) { g[r][c] = v; rec(); g[r][c] = 0; if (count >= limit) return }
  }
  rec()
  return count
}

export function makePuzzle(cfg: Cfg) {
  const sol = solved(cfg)
  const g = sol.map(r => r.slice())
  const cells = shuffle([...Array(cfg.n * cfg.n).keys()])
  let removed = 0
  for (const k of cells) {
    if (removed >= cfg.holes) break
    const r = Math.floor(k / cfg.n), c = k % cfg.n, v = g[r][c]
    g[r][c] = 0
    if (countSolutions(g.map(x => x.slice()), cfg) !== 1) g[r][c] = v
    else removed++
  }
  return { sol, start: g }
}

export default function Sudoku({ level, sound, onWin }: GameProps) {
  const cfg = CFG[level]
  const [{ sol, start }] = useState(() => makePuzzle(cfg))
  const [grid, setGrid] = useState(() => start.map(r => r.slice()))
  const [sel, setSel] = useState<[number, number] | null>(null)
  const [hints, setHints] = useState(level === 'ce1' ? 2 : 3)
  const [sec, setSec] = useState(0)
  const [won, setWon] = useState(false)
  const n = cfg.n
  const show = (v: number) => (v ? (cfg.sym ? cfg.sym[v - 1] : String(v)) : '')

  useEffect(() => { if (won) return; const t = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(t) }, [won])

  const conflicts = useMemo(() => {
    const bad = new Set<string>()
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      const v = grid[r][c]; if (!v) continue
      for (let r2 = 0; r2 < n; r2++) for (let c2 = 0; c2 < n; c2++) {
        if ((r2 === r && c2 === c) || grid[r2][c2] !== v) continue
        const same = r2 === r || c2 === c || (Math.floor(r2 / cfg.br) === Math.floor(r / cfg.br) && Math.floor(c2 / cfg.bc) === Math.floor(c / cfg.bc))
        if (same) bad.add(`${r},${c}`)
      }
    }
    return bad
  }, [grid, n, cfg])

  const put = (v: number) => {
    if (!sel || won) return
    const [r, c] = sel
    if (start[r][c]) return
    const g = grid.map(x => x.slice()); g[r][c] = v; setGrid(g)
    sfx('tap', sound)
    if (g.every((row, i) => row.every((x, j) => x === sol[i][j]))) { setWon(true); sfx('done', sound); setTimeout(() => onWin(sec, `Grille terminée en ${fmtTime(sec)} !`), 700) }
  }
  const hint = () => {
    if (!hints || won) return
    const empty: [number, number][] = []
    grid.forEach((row, r) => row.forEach((v, c) => { if (v !== sol[r][c]) empty.push([r, c]) }))
    const target = sel && grid[sel[0]][sel[1]] !== sol[sel[0]][sel[1]] ? sel : empty[rnd(empty.length)]
    if (!target) return
    setSel(target); setHints(h => h - 1)
    const [r, c] = target; const g = grid.map(x => x.slice()); g[r][c] = sol[r][c]; setGrid(g)
    if (g.every((row, i) => row.every((x, j) => x === sol[i][j]))) { setWon(true); setTimeout(() => onWin(sec), 700) }
  }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key) && Number(e.key) <= n) put(Number(e.key))
      else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') put(0)
      else if (sel && e.key.startsWith('Arrow')) {
        e.preventDefault()
        const [r, c] = sel; const d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key]!
        setSel([(r + d[0] + n) % n, (c + d[1] + n) % n])
      }
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  })

  const [sr, sc] = sel ?? [-1, -1]
  const selV = sel ? grid[sr][sc] : 0
  return (
    <div className="g-sudoku">
      <div className="g-stats"><span>⏱ {fmtTime(sec)}</span><span>{cfg.sym ? 'Fruits' : `${n}×${n}`}</span></div>
      <div className={`sdk n${n}`} style={{ gridTemplateColumns: `repeat(${n},1fr)` }} role="grid" aria-label="Grille de sudoku">
        {grid.map((row, r) => row.map((v, c) => {
          const given = !!start[r][c]
          const peer = sel && (r === sr || c === sc || (Math.floor(r / cfg.br) === Math.floor(sr / cfg.br) && Math.floor(c / cfg.bc) === Math.floor(sc / cfg.bc)))
          const cls = ['sdk-c', given ? 'given' : 'free', r === sr && c === sc ? 'sel' : peer ? 'peer' : '', selV && v === selV ? 'same' : '', conflicts.has(`${r},${c}`) && !given ? 'bad' : '',
            (c + 1) % cfg.bc === 0 && c < n - 1 ? 'br' : '', (r + 1) % cfg.br === 0 && r < n - 1 ? 'bb' : ''].join(' ')
          return <button key={`${r}-${c}`} className={cls} role="gridcell" aria-label={`Ligne ${r + 1}, colonne ${c + 1}${v ? ', ' + (cfg.sym ? ['pomme', 'banane', 'raisin', 'orange'][v - 1] : v) : ', vide'}`} onClick={() => setSel([r, c])}>{show(v)}</button>
        }))}
      </div>
      <div className="sdk-pad">
        {[...Array(n).keys()].map(i => <button key={i} className="sdk-k" onClick={() => put(i + 1)} aria-label={`Placer ${cfg.sym ? ['pomme', 'banane', 'raisin', 'orange'][i] : i + 1}`}>{show(i + 1)}</button>)}
      </div>
      <div className="row gap8 mt8" style={{ justifyContent: 'center' }}>
        <button className="btn quiet sm" onClick={() => put(0)}><Eraser size={16} /> Effacer</button>
        <button className="btn quiet sm" disabled={!hints} onClick={hint}><Lightbulb size={16} /> Indice ({hints})</button>
      </div>
    </div>
  )
}
