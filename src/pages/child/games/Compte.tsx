import { useState } from 'react'
import { RotateCcw, Undo2 } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { pick, rnd, shuffle } from '../../../lib/games'
import type { GameProps } from './types'

type Op = '+' | '−' | '×' | '÷'
const CFG: { count: number; pool: number[]; ops: Op[]; steps: number; max: number }[] = [
  { count: 3, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9], ops: ['+'], steps: 2, max: 20 },
  { count: 3, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ops: ['+', '−'], steps: 2, max: 30 },
  { count: 4, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 20], ops: ['+', '−', '×'], steps: 2, max: 100 },
  { count: 5, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50], ops: ['+', '−', '×', '÷'], steps: 3, max: 300 },
  { count: 6, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 75, 100], ops: ['+', '−', '×', '÷'], steps: 4, max: 999 },
  { count: 6, pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 75, 100], ops: ['+', '−', '×', '÷'], steps: 5, max: 999 },
]
const apply = (a: number, op: Op, b: number): number | null => {
  if (op === '+') return a + b
  if (op === '−') return a - b > 0 ? a - b : null
  if (op === '×') return a * b
  return b !== 0 && a % b === 0 ? a / b : null
}

interface Tile { id: number; v: number; used: boolean }
export function generate(tier: number) {
  const c = CFG[tier]
  for (let tries = 0; tries < 500; tries++) {
    const nums = shuffle(c.pool).slice(0, c.count)
    let work = nums.slice(); const sol: string[] = []
    for (let guard = 0; sol.length < c.steps && work.length > 1 && guard < 40; guard++) {
      // chaque étape réutilise le résultat précédent : la solution affichée est une vraie chaîne de calcul
      const i = sol.length ? work.length - 1 : rnd(work.length); let j = rnd(work.length - 1); if (j >= i) j++
      let a = work[i], b = work[j]; if (b > a) [a, b] = [b, a]
      const op = pick(c.ops); const r = apply(a, op, b)
      if (r == null || r > c.max || ((op === '×' || op === '÷') && (a === 1 || b === 1))) continue
      sol.push(`${a} ${op} ${b} = ${r}`)
      work = work.filter((_, k) => k !== i && k !== j); work.push(r)
    }
    const target = work[work.length - 1]
    if (target >= [3, 5, 10, 20, 50, 100][tier] && target <= c.max && !nums.includes(target) && sol.length === c.steps) return { nums, target, sol }
  }
  return { nums: [2, 3, 4], target: 10, sol: ['2 × 3 = 6', '6 + 4 = 10'] }
}

export default function Compte({ tier, sound, onWin }: GameProps) {
  const ops = CFG[tier].ops
  const [game] = useState(() => generate(tier))
  const [tiles, setTiles] = useState<Tile[]>(() => game.nums.map((v, i) => ({ id: i, v, used: false })))
  const [hist, setHist] = useState<{ tiles: Tile[]; line: string }[]>([])
  const [a, setA] = useState<number | null>(null)
  const [op, setOp] = useState<Op | null>(null)
  const [msg, setMsg] = useState('')
  const [showSol, setShowSol] = useState(false)
  const [done, setDone] = useState(false)

  const tapTile = (t: Tile) => {
    if (t.used || done) return
    if (a === null || op === null) { setA(t.id); setMsg(''); sfx('tap', sound); return }
    if (t.id === a) { setA(null); setOp(null); return }
    const ta = tiles.find(x => x.id === a)!
    const r = apply(ta.v, op, t.v)
    if (r == null) { setMsg(op === '−' ? 'Le résultat doit rester positif.' : 'La division doit tomber juste.'); sfx('oops', sound); return }
    const id = Math.max(...tiles.map(x => x.id)) + 1
    const nt = [...tiles.map(x => (x.id === a || x.id === t.id ? { ...x, used: true } : x)), { id, v: r, used: false }]
    setHist(h => [...h, { tiles, line: `${ta.v} ${op} ${t.v} = ${r}` }])
    setTiles(nt); setA(null); setOp(null); sfx('tap', sound)
    if (r === game.target) { setDone(true); sfx('done', sound); setTimeout(() => onWin(undefined, `Le compte est bon : ${game.target} !`), 900) }
  }
  const undo = () => { const h = hist[hist.length - 1]; if (!h || done) return; setTiles(h.tiles); setHist(hist.slice(0, -1)); setA(null); setOp(null) }
  const reset = () => { if (done) return; setTiles(game.nums.map((v, i) => ({ id: i, v, used: false }))); setHist([]); setA(null); setOp(null) }

  return (
    <div className="g-compte">
      <div className="ce-target"><small>Cible</small><b>{game.target}</b></div>
      <div className="ce-tiles">
        {tiles.filter(t => !t.used).map(t => <button key={t.id} className={`ce-t ${a === t.id ? 'sel' : ''} ${t.v === game.target ? 'hit' : ''}`} onClick={() => tapTile(t)}>{t.v}</button>)}
      </div>
      <div className="ce-ops">
        {ops.map(o => <button key={o} className={`ce-o ${op === o ? 'sel' : ''}`} disabled={a === null || done} onClick={() => { setOp(o); sfx('tap', sound) }} aria-label={{ '+': 'plus', '−': 'moins', '×': 'fois', '÷': 'divisé par' }[o]}>{o}</button>)}
      </div>
      <p className="small center muted" style={{ minHeight: 22 }}>{msg || (a === null ? 'Choisis un nombre.' : op === null ? 'Choisis une opération.' : 'Choisis le deuxième nombre.')}</p>
      {hist.length > 0 && <div className="ce-hist">{hist.map((h, i) => <span key={i}>{h.line}</span>)}</div>}
      <div className="row gap8 mt8" style={{ justifyContent: 'center' }}>
        <button className="btn quiet sm" onClick={undo} disabled={!hist.length}><Undo2 size={16} /> Annuler</button>
        <button className="btn quiet sm" onClick={reset}><RotateCcw size={16} /> Recommencer</button>
        <button className="btn quiet sm" onClick={() => setShowSol(s => !s)}>{showSol ? 'Cacher' : 'Une solution'}</button>
      </div>
      {showSol && <div className="ce-hist sol mt8">{game.sol.map((l, i) => <span key={i}>{l}</span>)}</div>}
    </div>
  )
}
