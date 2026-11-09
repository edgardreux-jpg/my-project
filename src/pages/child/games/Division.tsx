import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import { pick, shuffle } from '../../../lib/games'
import { fr, ri } from './kit'
import type { GameProps } from './types'
import type { LevelId } from '../../../types'

type Card = { id: number; pair: number; text: string; kind: 'calc' | 'res' }

/** Une division (ou un partage) et son résultat, selon la classe ; résultats tous différents dans une partie. */
export function make(lv: LevelId, d: number): [string, number] {
  switch (`${lv}${d}`) {
    case 'ce10': { const q = ri(1, 10); return [`moitié de ${q * 2}`, q] }
    case 'ce11': { const q = ri(5, 20); return [`moitié de ${q * 2}`, q] }
    case 'ce12': { const p = ri(2, 5), q = ri(2, 9); return [`${q * p} partagé en ${p}`, q] }
    case 'ce20': { const p = pick([2, 5, 10]), q = ri(1, 10); return [`${q * p} ÷ ${p}`, q] }
    case 'ce21': { const p = ri(2, 5), q = ri(2, 10); return [`${q * p} ÷ ${p}`, q] }
    case 'ce22': case 'cm10': { const p = ri(lv === 'cm1' ? 3 : 2, 9), q = ri(2, 10); return [`${q * p} ÷ ${p}`, q] }
    case 'cm11': { const q = ri(2, 99), p = pick([10, 100]); return [`${fr(q * p)} ÷ ${p}`, q] }
    case 'cm12': case 'cm20': { const p = ri(2, 6), q = ri(11, 30); return [`${q * p} ÷ ${p}`, q] }
    case 'cm21': { const p = ri(3, 9), q = ri(12, 99); return [`${fr(q * p)} ÷ ${p}`, q] }
    default: { if (Math.random() < 0.5) { const q = ri(11, 99) / 10; return [`${Math.round(q * 10)} ÷ 10`, q] } const q = ri(101, 999) / 100; return [`${Math.round(q * 100)} ÷ 100`, q] }
  }
}
export function deck(lv: LevelId, d: number): Card[] {
  const n = lv === 'cm1' || lv === 'cm2' ? 8 : 6
  const used = new Set<number>(), out: Card[] = []
  let guard = 0
  while (used.size < n && guard++ < 500) {
    const [calc, q] = make(lv, d)
    if (used.has(q)) continue
    used.add(q)
    out.push({ id: out.length, pair: q, text: calc, kind: 'calc' }, { id: out.length + 1, pair: q, text: fr(q), kind: 'res' })
  }
  return shuffle(out)
}

/** Memory du partage : retrouve chaque division et son résultat. */
export default function Division({ level, diff, sound, onWin }: GameProps) {
  const [cards] = useState(() => deck(level, diff))
  const [open, setOpen] = useState<number[]>([])
  const [found, setFound] = useState<Set<number>>(new Set())
  const [tries, setTries] = useState(0)
  const [miss, setMiss] = useState(false)

  const flip = (k: number) => {
    if (open.length === 2 || open.includes(k) || found.has(cards[k].pair)) return
    const o = [...open, k]; setOpen(o)
    if (o.length < 2) return
    const t = tries + 1; setTries(t)
    const [a, b] = o.map(x => cards[x])
    if (a.pair === b.pair && a.kind !== b.kind) {
      sfx('good', sound)
      const f = new Set(found); f.add(a.pair); setFound(f)
      setTimeout(() => setOpen([]), 300)
      if (f.size === cards.length / 2) setTimeout(() => onWin(t, `Bravo ! Toutes les paires trouvées en ${t} coups.`), 600)
    } else { sfx('oops', sound); setMiss(true); setTimeout(() => { setOpen([]); setMiss(false) }, 1000) }
  }

  return (
    <div className="lg">
      <div className="g-stats"><span>Paires : <b>{found.size}</b> / {cards.length / 2}</span><span>Coups : {tries}</span></div>
      <p className="lg-goal">Retourne une division, puis son résultat.</p>
      <div className={`lg-cards ${cards.length > 12 ? 'c16' : ''}`}>
        {cards.map((c, k) => {
          const up = open.includes(k) || found.has(c.pair)
          return (
            <button key={c.id} type="button" className={`lg-card ${up ? 'up' : ''} ${found.has(c.pair) ? 'ok' : ''} ${miss && open.includes(k) ? 'bad' : ''} ${c.kind}`}
              aria-label={up ? c.text : 'Carte cachée'} onClick={() => flip(k)}>
              <span>{up ? c.text : '?'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
