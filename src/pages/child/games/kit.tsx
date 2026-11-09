import { useEffect, useRef, useState } from 'react'
import { Delete } from 'lucide-react'

/** Écriture française : virgule décimale, espace entre les milliers. */
export function fr(n: number): string {
  const neg = n < 0, x = Math.abs(n)
  const [e, d] = String(Number(x.toFixed(2))).split('.')
  return (neg ? '−' : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (d ? ',' + d : '')
}
export const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1))

/** Compte à rebours en secondes ; appelle onEnd une seule fois. */
export function useCountdown(seconds: number, running: boolean, onEnd: () => void) {
  const [left, setLeft] = useState(seconds)
  const end = useRef(onEnd); end.current = onEnd
  useEffect(() => {
    if (!running) return
    const t0 = Date.now(), start = seconds
    setLeft(seconds)
    const id = setInterval(() => {
      const l = Math.max(0, start - (Date.now() - t0) / 1000)
      setLeft(l)
      if (l <= 0) { clearInterval(id); end.current() }
    }, 100)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])
  return left
}

export function TimeBar({ left, total }: { left: number; total: number }) {
  const p = Math.max(0, Math.min(1, left / total))
  return (
    <div className={`lg-time ${p < 0.25 ? 'low' : ''}`} role="timer" aria-label={`${Math.ceil(left)} secondes restantes`}>
      <span style={{ width: `${p * 100}%` }} />
      <b>{Math.ceil(left)} s</b>
    </div>
  )
}

/** Pavé numérique tactile (et clavier physique). */
export function Keypad({ value, onChange, onOk, decimal = false, disabled = false }: { value: string; onChange: (v: string) => void; onOk: () => void; decimal?: boolean; disabled?: boolean }) {
  const add = (k: string) => { if (disabled) return; if (k === ',' && (value.includes(',') || !value)) return; if (value.length < 7) onChange(value + k) }
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (disabled) return
      if (/^[0-9]$/.test(e.key)) add(e.key)
      else if ((e.key === ',' || e.key === '.') && decimal) add(',')
      else if (e.key === 'Backspace') onChange(value.slice(0, -1))
      else if (e.key === 'Enter') onOk()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', decimal ? ',' : '', '0', 'del']
  return (
    <div className="lg-pad" role="group" aria-label="Pavé numérique">
      {keys.map((k, i) => k === '' ? <span key={i} /> : k === 'del'
        ? <button key={i} type="button" className="lg-key del" aria-label="Effacer" disabled={disabled} onClick={() => onChange(value.slice(0, -1))}><Delete size={22} /></button>
        : <button key={i} type="button" className="lg-key" disabled={disabled} onClick={() => add(k)}>{k}</button>)}
      <button type="button" className="lg-key ok" disabled={disabled || !value} onClick={onOk}>Valider</button>
    </div>
  )
}
