import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import { rnd, shuffle } from '../../../lib/games'
import type { GameProps } from './types'

type Pair = [string, string]
function pairs(level: string, want: number): Pair[] {
  const out: Pair[] = [], seen = new Set<string>()
  const add = (q: string, a: string) => { if (seen.has(a) || seen.has(q)) return; seen.add(a); seen.add(q); out.push([q, a]) }
  for (let g = 0; out.length < want && g < 500; g++) {
    if (level === 'ce1') { const a = 1 + rnd(9), b = 1 + rnd(9); add(`${a} + ${b}`, String(a + b)) }
    else if (level === 'ce2') { const t = [2, 3, 4, 5, 10][rnd(5)], k = 2 + rnd(8); add(`${t} × ${k}`, String(t * k)) }
    else if (level === 'cm1') { const t = 3 + rnd(7), k = 3 + rnd(7); add(`${t} × ${k}`, String(t * k)) }
    else {
      const F: Pair[] = [['1/2', '0,5'], ['1/4', '0,25'], ['3/4', '0,75'], ['1/10', '0,1'], ['3/10', '0,3'], ['1/5', '0,2'], ['2/5', '0,4'], ['7/10', '0,7'], ['1/100', '0,01'], ['50 %', '1/2'], ['25 %', '1/4'], ['3/2', '1,5']]
      shuffle(F).forEach(([q, a]) => add(q, a)); break
    }
  }
  return out.slice(0, want)
}

interface Card { id: number; pair: number; text: string; kind: 'q' | 'a' }

export default function Memory({ level, tier, sound, onWin }: GameProps) {
  const want = [4, 6, 8, 8, 10, 12][tier]
  const [cards] = useState<Card[]>(() => shuffle(pairs(level, want).flatMap(([q, a], i) => [{ id: i * 2, pair: i, text: q, kind: 'q' as const }, { id: i * 2 + 1, pair: i, text: a, kind: 'a' as const }])))
  const [open, setOpen] = useState<number[]>([])
  const [found, setFound] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)
  const total = cards.length / 2

  const flip = (c: Card) => {
    if (lock || open.includes(c.id) || found.includes(c.pair)) return
    sfx('tap', sound)
    const o = [...open, c.id]; setOpen(o)
    if (o.length < 2) return
    const m = moves + 1; setMoves(m)
    const [x, y] = o.map(id => cards.find(k => k.id === id)!)
    if (x.pair === y.pair) {
      const f = [...found, x.pair]; setFound(f); setOpen([]); sfx('good', sound)
      if (f.length === total) setTimeout(() => onWin(m, `Toutes les paires en ${m} coups !`), 700)
    } else { setLock(true); setTimeout(() => { setOpen([]); setLock(false) }, 1000) }
  }

  return (
    <div className="g-memory">
      <div className="g-stats"><span>{found.length}/{total} paires</span><span>{moves} coup{moves > 1 ? 's' : ''}</span></div>
      <div className={`mm n${cards.length}`}>
        {cards.map(c => {
          const up = open.includes(c.id) || found.includes(c.pair)
          return (
            <button key={c.id} className={`mm-c ${up ? 'up' : ''} ${found.includes(c.pair) ? 'ok' : ''}`} onClick={() => flip(c)} aria-label={up ? c.text : 'Carte cachée'} aria-pressed={up}>
              <span className="mm-in"><span className="mm-back" aria-hidden="true">?</span><span className={`mm-front ${c.kind}`}>{c.text}</span></span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
