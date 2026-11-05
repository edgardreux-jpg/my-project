import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../state/store'

export function Logo({ to }: { to?: string }) {
  const { mode } = useStore()
  const dest = to ?? (mode === 'parent' ? '/parent' : mode === 'child' ? '/enfant' : mode === 'locked' ? '/profils' : '/')
  return (
    <Link to={dest} className="logo" aria-label="EduFun, accueil">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2 28 10 24 28H8L4 10Z" fill="#F5C65D" stroke="#D9A23A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 2 12 12 16 28 20 12Z" fill="#FFE59A" />
        <path d="M4 10h24" stroke="#D9A23A" strokeWidth="2" />
      </svg>
      EduFun
    </Link>
  )
}

export function Avatar({ emoji, frame = 'none', size = 56 }: { emoji: string; frame?: string; size?: number }) {
  return (
    <span className={`avatar f-${frame}`} style={{ width: size, height: size, fontSize: size * 0.55 }} aria-hidden="true">
      {emoji}
    </span>
  )
}

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className={`sw ${on ? 'on' : ''}`} onClick={() => onChange(!on)} />
}

export function Modal({ children, onClose, label }: { children: ReactNode; onClose?: () => void; label: string }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="modal-bg" onMouseDown={e => { if (e.target === e.currentTarget) onClose?.() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={label}>{children}</div>
    </div>
  )
}

export function PinPad({ onDone, error }: { onDone: (pin: string) => void; error?: string }) {
  const [v, setV] = useState('')
  useEffect(() => { if (v.length === 4) { const t = setTimeout(() => { onDone(v); setV('') }, 120); return () => clearTimeout(t) } }, [v, onDone])
  const press = (d: string) => setV(x => (x.length < 4 ? x + d : x))
  return (
    <div className="col" style={{ alignItems: 'center' }}>
      <div className="pin" aria-label={`${v.length} chiffres saisis sur 4`}>{[0, 1, 2, 3].map(i => <i key={i} className={i < v.length ? 'on' : ''} />)}</div>
      {error && <div className="err">{error}</div>}
      <div className="keypad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => <button key={d} onClick={() => press(d)}>{d}</button>)}
        <span />
        <button onClick={() => press('0')}>0</button>
        <button aria-label="Effacer" onClick={() => setV(x => x.slice(0, -1))}>⌫</button>
      </div>
    </div>
  )
}

export function Confetti() {
  const colors = ['#F5C65D', '#17766E', '#F28D62', '#7751A8', '#3A76CE', '#D6455D']
  const pieces = Array.from({ length: 46 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 0.8, color: colors[i % colors.length], dur: 1.8 + Math.random() * 1.4,
  }))
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => <i key={i} style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />)}
    </div>
  )
}

export function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t) }, [onDone])
  return <div className="toast" role="status">{text}</div>
}

export function Delta({ now, before, unit = '', invert = false }: { now: number | null; before: number | null; unit?: string; invert?: boolean }) {
  if (now == null || before == null) return <span className="delta flat">nouveau</span>
  const d = now - before
  if (Math.abs(d) < 0.005) return <span className="delta flat">stable</span>
  const good = invert ? d < 0 : d > 0
  const val = Math.abs(Math.round(unit === '%' ? d * 100 : d))
  if (val === 0) return <span className="delta flat">stable</span>
  const txt = unit === '%' ? `${val} pt${val > 1 ? 's' : ''}` : `${val}${unit}`
  return <span className={`delta ${good ? 'up' : 'down'}`}>{d > 0 ? '▲' : '▼'} {txt} vs période précédente</span>
}

/* ---------- graphiques SVG légers ---------- */
export function Spark({ values, color = '#17766E', w = 120, h = 36 }: { values: (number | null)[]; color?: string; w?: number; h?: number }) {
  const v = values.map(x => x ?? 0)
  const max = Math.max(...v, 1)
  const step = v.length > 1 ? w / (v.length - 1) : w
  const pts = v.map((x, i) => `${(i * step).toFixed(1)},${(h - 4 - (x / max) * (h - 8)).toFixed(1)}`)
  const last = pts[pts.length - 1].split(',')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Tendance des 8 dernières semaines">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="4" fill={color} />
    </svg>
  )
}

export interface Serie { name: string; color: string; values: (number | null)[] }

/** Barres groupées : minutes par semaine (ou par jour). */
export function BarChart({ labels, values, color = '#17766E', unit = 'min', h = 180, highlightLast = true }: { labels: string[]; values: number[]; color?: string; unit?: string; h?: number; highlightLast?: boolean }) {
  const W = 560, pad = { l: 34, r: 8, t: 12, b: 26 }
  const max = Math.max(...values, 1)
  const nice = max <= 10 ? Math.ceil(max / 2) * 2 : Math.ceil(max / 10) * 10
  const bw = (W - pad.l - pad.r) / values.length
  const y = (v: number) => pad.t + (1 - v / nice) * (h - pad.t - pad.b)
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${h}`} width="100%" role="img" aria-label={`Graphique en barres, ${unit}`}>
      {[0, 0.5, 1].map(t => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(nice * t)} y2={y(nice * t)} stroke="#EFE8D8" />
          <text x={pad.l - 6} y={y(nice * t) + 4} textAnchor="end">{Math.round(nice * t)}</text>
        </g>
      ))}
      {values.map((v, i) => {
        const x = pad.l + i * bw + bw * 0.18
        const last = highlightLast && i === values.length - 1
        return (
          <g key={i}>
            <rect x={x} y={y(v)} width={bw * 0.64} height={Math.max(0, h - pad.b - y(v))} rx="6" fill={color} opacity={last ? 1 : 0.55}>
              <title>{`${labels[i]} : ${Math.round(v)} ${unit}`}</title>
            </rect>
            <text x={x + bw * 0.32} y={h - 8} textAnchor="middle">{labels[i]}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Courbe en pourcentage (0 à 1). Les semaines sans donnée interrompent la ligne. */
export function LineChart({ labels, series, h = 180 }: { labels: string[]; series: Serie[]; h?: number }) {
  const W = 560, pad = { l: 38, r: 12, t: 12, b: 26 }
  const x = (i: number) => pad.l + (labels.length > 1 ? (i * (W - pad.l - pad.r)) / (labels.length - 1) : 0)
  const y = (v: number) => pad.t + (1 - v) * (h - pad.t - pad.b)
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${h}`} width="100%" role="img" aria-label="Évolution de la réussite au premier essai">
      {[0, 0.5, 1].map(t => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#EFE8D8" />
          <text x={pad.l - 6} y={y(t) + 4} textAnchor="end">{Math.round(t * 100)}%</text>
        </g>
      ))}
      {labels.map((l, i) => <text key={i} x={x(i)} y={h - 8} textAnchor="middle">{l}</text>)}
      {series.map(s => {
        let d = ''
        s.values.forEach((v, i) => { if (v != null) d += `${d && s.values[i - 1] != null ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)} ` })
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={s.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {s.values.map((v, i) => v != null && (
              <circle key={i} cx={x(i)} cy={y(v)} r="4.5" fill="#fff" stroke={s.color} strokeWidth="3"><title>{`${s.name}, ${labels[i]} : ${Math.round(v * 100)} %`}</title></circle>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export function Empty({ emoji = '🌱', title, children }: { emoji?: string; title: string; children?: ReactNode }) {
  return (
    <div className="center" style={{ padding: '28px 12px' }}>
      <div style={{ fontSize: '2.4rem' }}>{emoji}</div>
      <h3 style={{ margin: '8px 0 4px' }}>{title}</h3>
      <div className="muted small">{children}</div>
    </div>
  )
}
