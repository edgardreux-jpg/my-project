import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import { rnd, shuffle } from '../../../lib/games'
import type { GameProps } from './types'

const N = [3, 4, 5, 5, 5, 6]

/** Un calcul juste ou faux selon le niveau. */
export function calc(level: string, ok: boolean, close = false): string {
  let a: number, b: number, r: number, op: string
  if (level === 'ce1') { a = 1 + rnd(10); b = 1 + rnd(10); op = '+'; r = a + b }
  else if (level === 'ce2') { if (rnd(2)) { a = 10 + rnd(40); b = 1 + rnd(20); op = '+'; r = a + b } else { a = 2 + rnd(4); b = 2 + rnd(8); op = '×'; r = a * b } }
  else if (level === 'cm1') { if (rnd(2)) { a = 3 + rnd(7); b = 3 + rnd(7); op = '×'; r = a * b } else { a = 40 + rnd(60); b = 10 + rnd(30); op = '−'; r = a - b } }
  else { const k = rnd(3); if (k === 0) { b = 2 + rnd(8); r = 2 + rnd(9); a = b * r; op = '÷' } else if (k === 1) { a = 6 + rnd(6); b = 11 + rnd(8); op = '×'; r = a * b } else { a = rnd(9) + 1 + rnd(10) / 10; b = rnd(5) + rnd(10) / 10; op = '+'; r = Math.round((a + b) * 10) / 10 } }
  if (!ok) { const d = close ? [1, -1][rnd(2)] : [1, 2, 10, -1, -2, -10][rnd(6)]; r = Math.round((r + (Number.isInteger(r) ? d : d / 10)) * 10) / 10; if (r < 0) r = Math.abs(r) + 1 }
  const f = (x: number) => String(x).replace('.', ',')
  return `${f(a)} ${op} ${f(b)} = ${f(r)}`
}

/** Chemin aléatoire sans croisement du coin haut gauche au coin bas droit. */
export function path(n: number): number[] {
  const goal = n * n - 1
  const dfs = (p: number[]): number[] | null => {
    const cur = p[p.length - 1]; if (cur === goal) return p
    const r = Math.floor(cur / n), c = cur % n
    const nb = shuffle([[r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]]).filter(([a, b]) => a >= 0 && b >= 0 && a < n && b < n).map(([a, b]) => a * n + b)
    for (const x of nb) {
      if (p.includes(x)) continue
      // pas de raccourci : la nouvelle case ne touche aucune case du chemin sauf la précédente
      const xr = Math.floor(x / n), xc = x % n
      const touches = p.slice(0, -1).some(q => Math.abs(Math.floor(q / n) - xr) + Math.abs((q % n) - xc) === 1)
      if (touches) continue
      const res = dfs([...p, x]); if (res) return res
    }
    return null
  }
  return dfs([0]) ?? [...Array(n).keys()].concat([...Array(n - 1).keys()].map(k => (k + 2) * n - 1))
}

export default function Labyrinthe({ level, tier, sound, onWin }: GameProps) {
  const n = N[tier]
  const [{ good, cells }] = useState(() => { const p = path(n); const g = new Set(p); return { good: g, cells: [...Array(n * n).keys()].map(i => calc(level, g.has(i), tier % 2 === 1 && tier >= 3)) } })
  const [pos, setPos] = useState(0)
  const [trail, setTrail] = useState<number[]>([0])
  const [bad, setBad] = useState<number[]>([])
  const [flash, setFlash] = useState<number | null>(null)
  const goal = n * n - 1

  const tap = (i: number) => {
    if (pos === goal || trail.includes(i)) return
    const adj = Math.abs(Math.floor(i / n) - Math.floor(pos / n)) + Math.abs((i % n) - (pos % n)) === 1
    if (!adj) return
    if (good.has(i)) {
      setPos(i); setTrail(t => [...t, i]); sfx(i === goal ? 'done' : 'good', sound)
      if (i === goal) setTimeout(() => onWin(bad.length, bad.length ? `Sorti du labyrinthe avec ${bad.length} erreur${bad.length > 1 ? 's' : ''}.` : 'Sorti sans aucune erreur !'), 700)
    } else {
      if (!bad.includes(i)) setBad(b => [...b, i])
      setFlash(i); sfx('oops', sound); setTimeout(() => setFlash(null), 500)
    }
  }

  return (
    <div className="g-laby">
      <div className="g-stats"><span>Erreurs : {bad.length}</span><span className="muted">Avance sur une case voisine dont le calcul est juste</span></div>
      <div className="lb" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
        {cells.map((t, i) => {
          const adj = Math.abs(Math.floor(i / n) - Math.floor(pos / n)) + Math.abs((i % n) - (pos % n)) === 1
          return (
            <button key={i} className={`lb-c ${trail.includes(i) ? 'on' : ''} ${i === pos ? 'lb-me' : ''} ${bad.includes(i) ? 'ko' : ''} ${flash === i ? 'flash' : ''} ${adj && !trail.includes(i) && pos !== goal ? 'next' : ''} ${i === goal ? 'lb-goal' : ''}`}
              onClick={() => tap(i)} aria-label={`${t}${i === goal ? ', sortie' : ''}`}>
              {i === 0 ? <b>Départ</b> : null}{t}{i === goal ? <b>Sortie</b> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
