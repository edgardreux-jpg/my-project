import type { Vis } from '../../../lib/reperes'

/** Représentations des exercices Repères : ligne graduée, cubes, opération posée, fractions. */
export function RVisual({ v, small = false }: { v: Vis; small?: boolean }) {
  if (v.t === 'line') {
    const W = 340, pad = v.text ? 36 : 20, step = (W - pad * 2) / v.ticks
    const major = (i: number) => (v.text ? v.labels.includes(i) : i % 5 === 0)
    return (
      <svg viewBox={`0 0 ${W} 86`} className="rv-line" role="img" aria-label="Ligne graduée avec une flèche">
        <line x1={pad - 8} y1={50} x2={W - pad + 12} y2={50} className="rv-axis" />
        <polygon points={`${W - pad + 12},44 ${W - pad + 20},50 ${W - pad + 12},56`} className="rv-axis-head" />
        {Array.from({ length: v.ticks + 1 }, (_, i) => (
          <g key={i}>
            <line x1={pad + i * step} y1={major(i) ? 40 : 44} x2={pad + i * step} y2={major(i) ? 60 : 56} className="rv-tick" />
            {v.labels.includes(i) && <text x={pad + i * step} y={78} textAnchor="middle" className="rv-lab">{v.text?.[i] ?? String(Number((v.from + i * v.step).toFixed(3))).replace('.', ',')}</text>}
          </g>
        ))}
        <g transform={`translate(${pad + v.at * step} 0)`}>
          <line x1={0} y1={8} x2={0} y2={36} className="rv-arrow" />
          <polygon points="-7,28 7,28 0,38" className="rv-arrow-head" />
        </g>
      </svg>
    )
  }
  if (v.t === 'blocks') {
    const plates = Array.from({ length: v.h }), rods = Array.from({ length: v.d }), cubes = Array.from({ length: v.u })
    return (
      <div className="rv-blocks" role="img" aria-label="Cubes : plaques de cent, barres de dix et cubes seuls">
        {plates.map((_, i) => <span key={`p${i}`} className="rv-plate" />)}
        {rods.map((_, i) => <span key={`r${i}`} className="rv-rod" />)}
        <span className="rv-cubes">{cubes.map((_, i) => <i key={i} />)}</span>
      </div>
    )
  }
  if (v.t === 'column') {
    const a = String(v.a), b = String(v.b), w = Math.max(a.length, b.length) + 1
    return (
      <div className="rv-col" role="img" aria-label={`${v.a} ${v.op === '+' ? 'plus' : v.op === '×' ? 'multiplié par' : 'moins'} ${v.b}, opération posée`}>
        <span>{a.padStart(w, ' ').split('').map((c, i) => <i key={i}>{c.trim()}</i>)}</span>
        <span>{(v.op + b.padStart(w - 1, ' ')).split('').map((c, i) => <i key={i} className={i === 0 ? 'op' : ''}>{c.trim()}</i>)}</span>
        <span className="rv-bar" />
      </div>
    )
  }
  // fraction : barre, disque ou grille, parts grisées
  const s = small ? 92 : 120
  if (v.shape === 'disc') {
    const r = s / 2 - 4, c = s / 2
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s} className="rv-frac">
        {Array.from({ length: v.d }, (_, i) => {
          const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / v.d, a1 = a0 + (2 * Math.PI) / v.d
          const p = `M${c},${c} L${c + r * Math.cos(a0)},${c + r * Math.sin(a0)} A${r},${r} 0 0 1 ${c + r * Math.cos(a1)},${c + r * Math.sin(a1)} Z`
          return <path key={i} d={v.d === 1 ? '' : p} className={i < v.n ? 'on' : ''} />
        })}
      </svg>
    )
  }
  if (v.shape === 'grid' && v.d % 2 === 0) {
    const cols = v.d / 2, cw = (s - 8) / cols, ch = (s * 0.66 - 8) / 2
    return (
      <svg viewBox={`0 0 ${s} ${s * 0.66}`} width={s} height={s * 0.66} className="rv-frac">
        {Array.from({ length: v.d }, (_, i) => <rect key={i} x={4 + (i % cols) * cw} y={4 + Math.floor(i / cols) * ch} width={cw} height={ch} className={i < v.n ? 'on' : ''} />)}
      </svg>
    )
  }
  const cw = (s - 8) / v.d
  return (
    <svg viewBox={`0 0 ${s} 44`} width={s} height={44} className="rv-frac">
      {Array.from({ length: v.d }, (_, i) => <rect key={i} x={4 + i * cw} y={4} width={cw} height={36} className={i < v.n ? 'on' : ''} />)}
    </svg>
  )
}
