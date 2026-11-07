import { useEffect, useRef, useState } from 'react'
import { sfx } from '../../../lib/audio'
import { fmtTime, pick, rnd, shuffle } from '../../../lib/games'
import { THEMES } from './words'
import type { GameProps } from './types'

const CFG: Record<string, { n: number; count: number; dirs: [number, number][] }> = {
  ce1: { n: 7, count: 5, dirs: [[1, 0], [0, 1]] },
  ce2: { n: 9, count: 7, dirs: [[1, 0], [0, 1], [1, 1]] },
  cm1: { n: 10, count: 8, dirs: [[1, 0], [0, 1], [1, 1], [-1, 0], [1, -1]] },
  cm2: { n: 11, count: 9, dirs: [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]] },
}
const LETTERS = 'AAABCDEEEEFGHIIIJLLMNNOOPQRRSSSTTTUUVZ'

export function build(level: string) {
  const { n, count, dirs } = CFG[level]
  for (let attempt = 0; attempt < 50; attempt++) {
    const theme = pick(THEMES)
    const words = shuffle(theme.words.filter(w => w.length <= n)).slice(0, count + 3)
    const g: string[][] = Array.from({ length: n }, () => Array(n).fill(''))
    const placed: { w: string; cells: number[] }[] = []
    for (const w of words) {
      if (placed.length >= count) break
      for (let t = 0; t < 200; t++) {
        const [dx, dy] = pick(dirs), x = rnd(n), y = rnd(n)
        const ex = x + dx * (w.length - 1), ey = y + dy * (w.length - 1)
        if (ex < 0 || ey < 0 || ex >= n || ey >= n) continue
        let ok = true
        for (let i = 0; i < w.length; i++) { const c = g[y + dy * i][x + dx * i]; if (c && c !== w[i]) { ok = false; break } }
        if (!ok) continue
        const cells: number[] = []
        for (let i = 0; i < w.length; i++) { g[y + dy * i][x + dx * i] = w[i]; cells.push((y + dy * i) * n + x + dx * i) }
        placed.push({ w, cells }); break
      }
    }
    if (placed.length < count) continue
    for (const row of g) for (let i = 0; i < n; i++) if (!row[i]) row[i] = LETTERS[rnd(LETTERS.length)]
    return { theme: theme.name, grid: g.flat(), placed }
  }
  throw new Error('grille')
}

export default function MotsMeles({ level, sound, onWin }: GameProps) {
  const n = CFG[level].n
  const [{ theme, grid, placed }] = useState(() => build(level))
  const [found, setFound] = useState<string[]>([])
  const [start, setStart] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [sec, setSec] = useState(0)
  const done = found.length === placed.length
  const down = useRef<number | null>(null)
  useEffect(() => { if (done) return; const t = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(t) }, [done])

  const line = (a: number, b: number): number[] | null => {
    const ax = a % n, ay = Math.floor(a / n), bx = b % n, by = Math.floor(b / n)
    const dx = Math.sign(bx - ax), dy = Math.sign(by - ay), len = Math.max(Math.abs(bx - ax), Math.abs(by - ay))
    if (!(ax === bx || ay === by || Math.abs(bx - ax) === Math.abs(by - ay))) return null
    return Array.from({ length: len + 1 }, (_, i) => (ay + dy * i) * n + ax + dx * i)
  }
  const tryWord = (a: number, b: number) => {
    const cells = line(a, b); if (!cells) return false
    const hit = placed.find(p => !found.includes(p.w) && p.cells.length === cells.length && (p.cells.every((c, i) => c === cells[i]) || p.cells.every((c, i) => c === cells[cells.length - 1 - i])))
    if (!hit) return false
    const f = [...found, hit.w]; setFound(f); sfx('good', sound)
    if (f.length === placed.length) setTimeout(() => onWin(sec, `Tous les mots trouvés en ${fmtTime(sec)} !`), 700)
    return true
  }
  const cellAt = (e: React.PointerEvent) => { const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null; const v = el?.dataset?.i; return v != null ? Number(v) : null }
  const onDown = (e: React.PointerEvent) => { const c = cellAt(e); if (c == null || done) return; down.current = c; setHover(c); if (start == null) setStart(c) }
  const onMove = (e: React.PointerEvent) => { if (down.current == null) return; const c = cellAt(e); if (c != null) setHover(c) }
  const onUp = (e: React.PointerEvent) => {
    const a = down.current; down.current = null; const c = cellAt(e)
    if (a == null || c == null) return
    if (c !== a) { if (!tryWord(a, c) && line(a, c)) sfx('oops', sound); setStart(null); setHover(null); return }
    // touche-touche : première puis dernière lettre
    if (start != null && start !== c) { if (!tryWord(start, c)) sfx('oops', sound); setStart(null); setHover(null) }
    else setStart(c)
  }
  const foundCells = new Set(placed.filter(p => found.includes(p.w)).flatMap(p => p.cells))
  const pending = new Set(start != null && hover != null ? line(start, hover) ?? [start] : start != null ? [start] : [])

  return (
    <div className="g-mm">
      <div className="g-stats"><span>Thème : <b>{theme}</b></span><span>⏱ {fmtTime(sec)}</span></div>
      <div className="ws" style={{ gridTemplateColumns: `repeat(${n},1fr)` }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
        {grid.map((l, i) => <span key={i} data-i={i} className={`ws-c ${foundCells.has(i) ? 'f' : ''} ${pending.has(i) ? 'p' : ''}`}>{l}</span>)}
      </div>
      <p className="tiny muted center mt8">Glisse le doigt sur un mot, ou touche sa première puis sa dernière lettre.</p>
      <div className="ws-list">{placed.map(p => <span key={p.w} className={found.includes(p.w) ? 'f' : ''}>{p.w}</span>)}</div>
    </div>
  )
}
