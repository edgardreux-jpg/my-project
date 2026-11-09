import { useEffect, useRef, useState } from 'react'
import { sfx } from '../../../lib/audio'
import { pick, shuffle } from '../../../lib/games'
import { fr, ri } from './kit'
import type { GameProps } from './types'

const ROUNDS = 3, PAIRS = 6

/** Une cible et 6 paires de nombres dont la somme vaut la cible. */
function round(tier: number): { target: number; nums: number[] } {
  let target = 10, mk = () => ri(1, 9)
  switch (tier) {
    case 0: target = 10; mk = () => ri(1, 9); break
    case 1: target = ri(12, 20); mk = () => ri(2, target - 2); break
    case 2: target = pick([50, 100]); mk = () => target === 100 ? ri(1, 9) * 10 : ri(11, 39); break
    case 3: target = 100; mk = () => ri(11, 89); break
    case 4: target = pick([500, 1000]); mk = () => ri(11, target / 10 - 1) * 10 - pick([0, 0, 5]); break
    default: target = pick([1, 10]); mk = () => target === 1 ? ri(1, 9) / 10 : ri(11, 89) / 10
  }
  const nums: number[] = []
  for (let i = 0; i < PAIRS; i++) { const a = Number(mk().toFixed(2)); nums.push(a, Number((target - a).toFixed(2))) }
  return { target, nums: shuffle(nums) }
}

/** Bulles d'addition : relie deux bulles dont la somme fait la cible, le plus vite possible. */
export default function Addition({ tier, sound, onWin }: GameProps) {
  const [r, setR] = useState(0)
  const [cur, setCur] = useState(() => round(tier))
  const [gone, setGone] = useState<Set<number>>(new Set())
  const [sel, setSel] = useState<number | null>(null)
  const [bad, setBad] = useState<number[]>([])
  const [miss, setMiss] = useState(0)
  const t0 = useRef(Date.now())
  const [sec, setSec] = useState(0)
  useEffect(() => { const id = setInterval(() => setSec(Math.floor((Date.now() - t0.current) / 1000)), 500); return () => clearInterval(id) }, [])

  const tap = (i: number) => {
    if (gone.has(i) || bad.length) return
    if (sel === null) { setSel(i); return }
    if (sel === i) { setSel(null); return }
    const sum = Number((cur.nums[sel] + cur.nums[i]).toFixed(2))
    if (sum === cur.target) {
      sfx('good', sound)
      const g = new Set(gone); g.add(sel); g.add(i); setGone(g); setSel(null)
      if (g.size === cur.nums.length) {
        if (r + 1 >= ROUNDS) {
          const s = Math.round((Date.now() - t0.current) / 1000)
          setTimeout(() => onWin(s, `Bravo ! ${ROUNDS * PAIRS} additions trouvées en ${s} secondes${miss ? `, avec ${miss} erreur${miss > 1 ? 's' : ''}` : ' sans aucune erreur'}.`), 400)
        } else setTimeout(() => { setR(r + 1); setCur(round(tier)); setGone(new Set()) }, 500)
      }
    } else {
      sfx('oops', sound); setMiss(miss + 1); setBad([sel, i])
      setTimeout(() => { setBad([]); setSel(null) }, 650)
    }
  }

  return (
    <div className="lg">
      <div className="g-stats"><span>Manche {r + 1}/{ROUNDS}</span><span>{sec} s</span><span>Erreurs : {miss}</span></div>
      <p className="lg-goal">Relie deux bulles qui font <b className="lg-target">{fr(cur.target)}</b></p>
      <div className="lg-bubbles" key={r}>
        {cur.nums.map((n, i) => (
          <button key={i} type="button" className={`lg-bub ${gone.has(i) ? 'pop' : ''} ${sel === i ? 'sel' : ''} ${bad.includes(i) ? 'bad' : ''}`}
            disabled={gone.has(i)} aria-pressed={sel === i} aria-label={gone.has(i) ? 'Bulle trouvée' : fr(n)} onClick={() => tap(i)}>
            {gone.has(i) ? '' : fr(n)}
          </button>
        ))}
      </div>
      {sel !== null && <p className="lg-help">{fr(cur.nums[sel])} + … = {fr(cur.target)}</p>}
    </div>
  )
}
