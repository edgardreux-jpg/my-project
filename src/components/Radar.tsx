/** Toile de compétences (radar) : un axe par compétence, une ou plusieurs séries superposées. */
export interface RadarSerie { label: string; color: string; values: (number | null)[] }

export function Radar({ axes, series, size = 320 }: { axes: string[]; series: RadarSerie[]; size?: number }) {
  const n = axes.length, c = size / 2, R = size / 2 - 58
  const pt = (i: number, v: number) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [c + Math.cos(a) * R * v, c + Math.sin(a) * R * v] }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar" role="img" aria-label={`Toile de compétences : ${axes.map((a, i) => `${a} ${series[series.length - 1]?.values[i] ?? '–'} %`).join(', ')}`}>
      {[0.25, 0.5, 0.75, 1].map(k => <polygon key={k} points={axes.map((_, i) => pt(i, k).join(',')).join(' ')} className={`radar-ring ${k === 0.75 ? 'mid' : ''}`} />)}
      {axes.map((_, i) => { const [x, y] = pt(i, 1); return <line key={i} x1={c} y1={c} x2={x} y2={y} className="radar-axis" /> })}
      {series.map((s, si) => (
        <g key={si}>
          <polygon points={s.values.map((v, i) => pt(i, Math.max(0.04, (v ?? 0) / 100)).join(',')).join(' ')} fill={s.color} fillOpacity={si === series.length - 1 ? 0.28 : 0.1} stroke={s.color} strokeWidth={si === series.length - 1 ? 2.5 : 1.5} strokeDasharray={si === series.length - 1 ? undefined : '5 4'} strokeLinejoin="round" />
          {si === series.length - 1 && s.values.map((v, i) => { if (v == null) return null; const [x, y] = pt(i, Math.max(0.04, v / 100)); return <circle key={i} cx={x} cy={y} r={4} fill="#fff" stroke={s.color} strokeWidth={2.5} /> })}
        </g>
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1.2)
        const anchor = Math.abs(x - c) < 8 ? 'middle' : x < c ? 'end' : 'start'
        const v = series[series.length - 1]?.values[i]
        return (
          <text key={a} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" className="radar-lbl">
            <tspan>{a}</tspan>
            <tspan x={x} dy="1.15em" className="radar-val">{v == null ? '–' : `${v} %`}</tspan>
          </text>
        )
      })}
    </svg>
  )
}
