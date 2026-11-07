import { useEffect, useState } from 'react'
import { sfx } from '../../../lib/audio'
import { rnd } from '../../../lib/games'
import type { GameProps } from './types'

const CFG: Record<string, { n: number; mix: number }> = { ce1: { n: 3, mix: 24 }, ce2: { n: 3, mix: 70 }, cm1: { n: 4, mix: 60 }, cm2: { n: 4, mix: 160 } }

function scramble(n: number, mix: number): number[] {
  const t = [...Array(n * n).keys()].map(i => (i + 1) % (n * n))   // 0 = case vide, en bas à droite
  let e = n * n - 1, prev = -1
  for (let k = 0; k < mix; k++) {
    const r = Math.floor(e / n), c = e % n
    const nb = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < n && b < n).map(([a, b]) => a * n + b).filter(x => x !== prev)
    const m = nb[rnd(nb.length)]
    ;[t[e], t[m]] = [t[m], t[e]]; prev = e; e = m
  }
  return t
}

export default function Taquin({ level, sound, onWin }: GameProps) {
  const { n, mix } = CFG[level]
  const [t, setT] = useState(() => { let s = scramble(n, mix); while (s.every((v, i) => v === (i + 1) % (n * n))) s = scramble(n, mix); return s })
  const [moves, setMoves] = useState(0)
  const [done, setDone] = useState(false)
  const solvedAt = (i: number) => t[i] === (i + 1) % (n * n) && t[i] !== 0

  const tap = (i: number) => {
    if (done) return
    const e = t.indexOf(0)
    const r = Math.floor(i / n), c = i % n, er = Math.floor(e / n), ec = e % n
    if (i === e || (r !== er && c !== ec)) return
    // Glisse toute la rangée jusqu'à la case vide
    const nt = t.slice(); let cur = e
    const step = r === er ? (c > ec ? 1 : -1) : (r > er ? n : -n)
    while (cur !== i) { nt[cur] = nt[cur + step]; cur += step }
    nt[i] = 0
    setT(nt); const m = moves + 1; setMoves(m); sfx('tap', sound)
    if (nt.every((v, k) => v === (k + 1) % (n * n))) { setDone(true); sfx('done', sound); setTimeout(() => onWin(m, `Remis en ordre en ${m} coups !`), 800) }
  }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const z = t.indexOf(0), r = Math.floor(z / n), c = z % n
      const m: Record<string, [number, number]> = { ArrowUp: [r + 1, c], ArrowDown: [r - 1, c], ArrowLeft: [r, c + 1], ArrowRight: [r, c - 1] }
      const d = m[e.key]; if (!d) return
      e.preventDefault(); if (d[0] >= 0 && d[1] >= 0 && d[0] < n && d[1] < n) tap(d[0] * n + d[1])
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  })

  return (
    <div className="g-taquin">
      <div className="g-stats"><span>{moves} coup{moves > 1 ? 's' : ''}</span><span className="muted">Touche une tuile à côté de la case vide</span></div>
      <div className={`tq n${n}`} style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
        {t.map((v, i) => v === 0
          ? <span key="empty" className="tq-e" />
          : <button key={v} className={`tq-t ${solvedAt(i) ? 'ok' : ''}`} onClick={() => tap(i)} aria-label={`Tuile ${v}`}>{v}</button>)}
      </div>
      <p className="tiny muted center mt8">But : de 1 à {n * n - 1}, ligne par ligne, la case vide en bas à droite.</p>
    </div>
  )
}
