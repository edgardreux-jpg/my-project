import { useEffect, useMemo, useRef, useState } from 'react'
import { FlipHorizontal2, RotateCw } from 'lucide-react'
import { sfx } from '../../../lib/audio'
import { rnd } from '../../../lib/games'
import { SHAPES } from './tangramShapes'
import type { GameProps } from './types'

type Pt = [number, number]
const BASE: Record<string, Pt[]> = {
  BT: [[0, 0], [4, 0], [2, 2]], MT: [[0, 0], [2, 0], [0, 2]], ST: [[0, 0], [2, 0], [1, 1]],
  SQ: [[1, 0], [2, 1], [1, 2], [0, 1]], PA: [[1, 0], [3, 0], [2, 1], [0, 1]],
}
const COLOR: Record<string, string> = { BT: '#E5484D', BT2: '#3A76CE', MT: '#30A46C', ST: '#F5A524', ST2: '#8E4EC6', SQ: '#D6409F', PA: '#12A594' }
const W = 11

function shapeOf(type: string, rot: number, flip: boolean): Pt[] {
  let p = BASE[type].map(([x, y]) => [flip ? -x : x, y] as Pt)
  for (let k = 0; k < rot; k++) p = p.map(([x, y]) => [-y, x] as Pt)
  const mx = Math.min(...p.map(a => a[0])), my = Math.min(...p.map(a => a[1]))
  return p.map(([x, y]) => [x - mx, y - my])
}
const inside = ([x, y]: Pt, poly: Pt[]) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [x1, y1] = poly[i], [x2, y2] = poly[j]; if ((y1 > y) !== (y2 > y) && x < x1 + ((y - y1) * (x2 - x1)) / (y2 - y1)) c = !c } return c }
const Q: Pt[] = [[0.5, 0.2], [0.8, 0.5], [0.5, 0.8], [0.2, 0.5]]
/** Découpe en quarts de carré : sert à vérifier que la silhouette est exactement couverte. */
function raster(poly: Pt[]): string[] {
  const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]), out: string[] = []
  for (let x = Math.floor(Math.min(...xs)); x < Math.max(...xs); x++) for (let y = Math.floor(Math.min(...ys)); y < Math.max(...ys); y++)
    Q.forEach(([dx, dy], q) => { if (inside([x + dx, y + dy], poly)) out.push(`${x},${y},${q}`) })
  return out
}

interface Piece { id: string; type: string; rot: number; flip: boolean; x: number; y: number }
const START: [string, string, number, number][] = [['BT', 'BT', 0, 0], ['BT2', 'BT', 4.5, 0], ['MT', 'MT', 9, 0], ['SQ', 'SQ', 0, 2.6], ['PA', 'PA', 2.6, 2.6], ['ST', 'ST', 6.1, 2.6], ['ST2', 'ST', 8.6, 2.6]]

export default function Tangram({ tier, sound, onWin }: GameProps) {
  const [shape] = useState(() => SHAPES[tier <= 1 ? rnd(6) : rnd(SHAPES.length)])
  const geo = useMemo(() => {
    const all = shape.pieces.flatMap(p => p[1])
    const w = Math.max(...all.map(p => p[0])), h = Math.max(...all.map(p => p[1]))
    const ox = Math.floor((W - w) / 2), oy = 1
    const target = new Set(shape.pieces.flatMap(([, p]) => raster(p.map(([x, y]) => [x + ox, y + oy] as Pt))))
    return { w, h, ox, oy, target, tray: oy + h + 1.5 }
  }, [shape])
  const H = geo.tray + 5
  const [pieces, setPieces] = useState<Piece[]>(() => START.map(([id, type, x, y]) => ({ id, type, rot: 0, flip: false, x, y: y + geo.tray })))
  const [sel, setSel] = useState<string | null>(null)
  const [won, setWon] = useState(false)
  const svg = useRef<SVGSVGElement>(null)
  const drag = useRef<{ id: string; dx: number; dy: number; sx: number; sy: number; moved: boolean } | null>(null)

  const toUnits = (e: React.PointerEvent) => { const r = svg.current!.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H] as Pt }
  const check = (ps: Piece[]) => {
    const cov = ps.flatMap(p => raster(shapeOf(p.type, p.rot, p.flip).map(([x, y]) => [x + p.x, y + p.y] as Pt)))
    const set = new Set(cov)
    if (set.size === cov.length && set.size === geo.target.size && [...set].every(k => geo.target.has(k))) {
      setWon(true); setSel(null); sfx('done', sound); setTimeout(() => onWin(undefined, `Bravo, tu as construit : ${shape.name} !`), 900)
    }
  }
  const update = (id: string, f: (p: Piece) => Piece, snap = true) => setPieces(ps =>
    ps.map(p => (p.id === id ? f(p) : p)).map(p => (p.id === id && snap ? { ...p, x: Math.round(p.x), y: Math.round(p.y) } : p)))
  useEffect(() => { if (!drag.current && !won) check(pieces) }, [pieces])   // eslint-disable-line react-hooks/exhaustive-deps
  const rotate = (id: string) => update(id, p => {
    const a = shapeOf(p.type, p.rot, p.flip), b = shapeOf(p.type, (p.rot + 1) % 4, p.flip)
    const cx = p.x + Math.max(...a.map(q => q[0])) / 2, cy = p.y + Math.max(...a.map(q => q[1])) / 2
    return { ...p, rot: (p.rot + 1) % 4, x: cx - Math.max(...b.map(q => q[0])) / 2, y: cy - Math.max(...b.map(q => q[1])) / 2 }
  })

  const onDown = (e: React.PointerEvent, p: Piece) => {
    if (won) return
    e.preventDefault(); (e.target as Element).setPointerCapture?.(e.pointerId)
    const [ux, uy] = toUnits(e)
    drag.current = { id: p.id, dx: ux - p.x, dy: uy - p.y, sx: ux, sy: uy, moved: false }
    setSel(p.id)
    setPieces(ps => [...ps.filter(x => x.id !== p.id), ps.find(x => x.id === p.id)!])   // passe au premier plan
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return
    const [ux, uy] = toUnits(e)
    if (Math.hypot(ux - d.sx, uy - d.sy) > 0.25) d.moved = true
    if (d.moved) update(d.id, p => ({ ...p, x: Math.max(-1, Math.min(W - 1, ux - d.dx)), y: Math.max(-1, Math.min(H - 1, uy - d.dy)) }), false)
  }
  const onUp = () => {
    const d = drag.current; drag.current = null; if (!d) return
    if (!d.moved) { rotate(d.id); sfx('tap', sound) } else { update(d.id, p => p); sfx('tap', sound) }
  }
  const guides = tier <= 1 ? shape.pieces : tier <= 3 ? shape.pieces.filter(p => p[0] === 'BT') : []
  const selP = pieces.find(p => p.id === sel)

  return (
    <div className="g-tangram">
      <div className="g-stats"><span>Figure : <b>{shape.name}</b></span><span className="muted">Glisse les pièces · touche une pièce pour la tourner</span></div>
      <svg ref={svg} className="tg" viewBox={`0 0 ${W} ${H}`} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} role="img" aria-label={`Tangram : reproduis la figure ${shape.name}`}>
        <rect x={0} y={geo.tray - 0.5} width={W} height={H - geo.tray + 0.5} rx={0.4} className="tg-tray" />
        <g transform={`translate(${geo.ox} ${geo.oy})`}>
          {shape.pieces.map(([, p], i) => <polygon key={i} points={p.map(q => q.join(',')).join(' ')} className={`tg-sil ${won ? 'won' : ''}`} />)}
          {guides.map(([, p], i) => <polygon key={`g${i}`} points={p.map(q => q.join(',')).join(' ')} className="tg-guide" />)}
        </g>
        {pieces.map(p => (
          <polygon key={p.id} points={shapeOf(p.type, p.rot, p.flip).map(([x, y]) => `${x + p.x},${y + p.y}`).join(' ')} fill={COLOR[p.id]}
            className={`tg-p ${sel === p.id ? 'sel' : ''}`} onPointerDown={e => onDown(e, p)} />
        ))}
      </svg>
      <div className="row gap8 mt8" style={{ justifyContent: 'center' }}>
        <button className="btn quiet sm" disabled={!selP || won} onClick={() => selP && rotate(selP.id)}><RotateCw size={16} /> Tourner</button>
        {selP?.type === 'PA' && <button className="btn quiet sm" disabled={won} onClick={() => update('PA', p => ({ ...p, flip: !p.flip }))}><FlipHorizontal2 size={16} /> Retourner</button>}
      </div>
    </div>
  )
}
