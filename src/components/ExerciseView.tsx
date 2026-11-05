import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import type { Exercise } from '../types'
import { canSpeak, speak } from '../lib/audio'

interface Props {
  ex: Exercise
  answer: any
  setAnswer: (a: any) => void
  locked: boolean
  /** true, false ou null avant vérification */
  status: boolean | null
  /** affiche la bonne réponse (après la seconde erreur) */
  reveal: boolean
  onEnter: () => void
  eliminated?: string[]
}

/** Texte lu à voix haute : la consigne, et pour un QCM les réponses proposées. */
export function sayText(ex: Exercise): string {
  let t = ex.prompt
  if (ex.type === 'qcm' && ex.choices?.length) {
    const labels = ex.choices.map(c => c.label)
    t += ' ' + (labels.length > 1 ? labels.slice(0, -1).join(', ') + ', ou ' + labels[labels.length - 1] : labels[0]) + ' ?'
  }
  return t
}

export default function ExerciseView({ ex, answer, setAnswer, locked, status, reveal, onEnter, eliminated }: Props) {
  return (
    <div>
      {ex.passage && <div className="passage">{ex.passage}</div>}
      <div className="q-head">
        <h2 className="q-title">{ex.prompt}</h2>
        {canSpeak() && ex.type !== 'dictation' && <button type="button" className="saybtn" aria-label="Écouter la consigne" onClick={() => speak(sayText(ex))}><Volume2 size={24} /></button>}
      </div>
      {ex.visual && <Visual v={ex.visual} />}
      <Body ex={ex} answer={answer} setAnswer={setAnswer} locked={locked} status={status} reveal={reveal} onEnter={onEnter} eliminated={eliminated} />
    </div>
  )
}

function Body({ ex, answer, setAnswer, locked, status, reveal, onEnter, eliminated }: Props) {
  switch (ex.type) {
    case 'qcm':
      return (
        <div className="opts" role="radiogroup" aria-label="Réponses">
          {ex.choices!.map((c, i) => {
            const sel = answer === c.id
            let cls = sel ? 'sel' : ''
            const gone = !!eliminated?.includes(c.id)
            if (gone) cls = 'ko'
            if (locked && sel) cls = status ? 'ok' : 'ko'
            if (locked && reveal && c.id === ex.expected) cls = 'ok'
            return (
              <button key={c.id} role="radio" aria-checked={sel} disabled={locked || gone} className={`opt ${cls}`} onClick={() => setAnswer(c.id)}>
                <span className="k">{i + 1}</span>{c.label}
              </button>
            )
          })}
        </div>
      )
    case 'number_input':
    case 'short_text':
    case 'dictation':
      return <TextAnswer ex={ex} answer={answer} setAnswer={setAnswer} locked={locked} status={status} onEnter={onEnter} />
    case 'ordering':
      return <Ordering ex={ex} answer={answer ?? []} setAnswer={setAnswer} locked={locked} />
    case 'matching':
    case 'drag_drop':
      return <Matching ex={ex} answer={answer ?? {}} setAnswer={setAnswer} locked={locked} status={status} />
    case 'fill_blank':
      return <FillBlank ex={ex} answer={answer ?? {}} setAnswer={setAnswer} locked={locked} onEnter={onEnter} />
    case 'visual_fraction':
      return <Fraction ex={ex} answer={answer ?? []} setAnswer={setAnswer} locked={locked} />
    default:
      return <p className="muted">Exercice non pris en charge.</p>
  }
}

function TextAnswer({ ex, answer, setAnswer, locked, status, onEnter }: Pick<Props, 'ex' | 'answer' | 'setAnswer' | 'locked' | 'status' | 'onEnter'>) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { if (!locked) { ref.current?.focus(); ref.current?.select() } }, [locked, ex.id])
  const num = ex.type === 'number_input'
  return (
    <div className="col" style={{ alignItems: 'stretch' }}>
      {ex.type === 'dictation' && ex.audioText && (
        <div className="center">
          <button className="btn gold" onClick={() => speak(ex.audioText!, ex.audioLang || 'fr-FR')} disabled={!canSpeak()}>
            <Volume2 size={20} /> Écouter la phrase
          </button>
          {!canSpeak() && <p className="small muted mt8">Le son n’est pas disponible sur cet appareil. Demande à un adulte de lire : « {ex.audioText} »</p>}
        </div>
      )}
      <input
        ref={ref}
        className={`input ${num ? 'numin' : ''} ${locked ? (status ? 'ok' : 'ko') : ''}`}
        style={locked ? { borderColor: status ? 'var(--green)' : 'var(--red)' } : undefined}
        inputMode={num ? 'decimal' : 'text'}
        autoComplete="off" autoCapitalize="off" spellCheck={false}
        aria-label="Ta réponse"
        placeholder={num ? '?' : 'Écris ta réponse'}
        value={answer ?? ''} disabled={locked}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onEnter() }}
      />
    </div>
  )
}

function Ordering({ ex, answer, setAnswer, locked }: { ex: Exercise; answer: string[]; setAnswer: (a: any) => void; locked: boolean }) {
  const items = ex.items!
  const left = items.filter(i => !answer.includes(i.id))
  const label = (id: string) => items.find(i => i.id === id)?.label
  return (
    <div className="col">
      <div className="small muted">Touche les cartes dans le bon ordre.</div>
      <div className="slot" aria-label="Ta réponse">
        {answer.length === 0 && <span className="muted small">Ta réponse apparaît ici</span>}
        {answer.map((id, n) => (
          <button key={id} className="tile placed" disabled={locked} onClick={() => setAnswer(answer.filter(x => x !== id))} aria-label={`${n + 1}, ${label(id)}, retirer`}>
            {n + 1}. {label(id)}
          </button>
        ))}
      </div>
      <div className="chipset">
        {left.map(i => <button key={i.id} className="tile" disabled={locked} onClick={() => setAnswer([...answer, i.id])}>{i.label}</button>)}
      </div>
    </div>
  )
}

function Matching({ ex, answer, setAnswer, locked, status }: { ex: Exercise; answer: Record<string, string>; setAnswer: (a: any) => void; locked: boolean; status: boolean | null }) {
  const [sel, setSel] = useState<string | null>(null)
  const items = ex.items!, targets = ex.targets!
  const unplaced = items.filter(i => !answer[i.id])
  const pickItem = (id: string) => setSel(id)
  const drop = (t: string) => {
    if (!sel || locked) return
    setAnswer({ ...answer, [sel]: t })
    setSel(null)
  }
  const remove = (id: string) => { if (locked) return; const n = { ...answer }; delete n[id]; setAnswer(n) }
  return (
    <div className="col">
      <div className="small muted">Touche une carte, puis touche sa case.</div>
      <div className="chipset" aria-label="Cartes à placer">
        {unplaced.map(i => (
          <button key={i.id} className={`tile ${sel === i.id ? 'sel' : ''}`} disabled={locked} onClick={() => pickItem(i.id)}>{i.label}</button>
        ))}
        {unplaced.length === 0 && <span className="muted small">Toutes les cartes sont placées.</span>}
      </div>
      <div className="opts">
        {targets.map(t => (
          <div key={t.id}>
            <button type="button" className={`slot ${sel ? 'act' : ''}`} style={{ width: '100%', textAlign: 'left' }} onClick={() => drop(t.id)} disabled={locked} aria-label={`Case ${t.label}`}>
              <b style={{ minWidth: 90 }}>{t.label}</b>
              {items.filter(i => answer[i.id] === t.id).map(i => {
                const good = locked && ex.expected[i.id] === t.id
                const bad = locked && ex.expected[i.id] !== t.id
                return (
                  <span key={i.id} role="button" tabIndex={0} className="tile placed"
                    style={good ? { borderColor: 'var(--green)', background: 'var(--green-s)' } : bad && status === false ? { borderColor: 'var(--red)', background: 'var(--red-s)' } : undefined}
                    onClick={e => { e.stopPropagation(); remove(i.id) }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); remove(i.id) } }}>
                    {i.label}
                  </span>
                )
              })}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function FillBlank({ ex, answer, setAnswer, locked, onEnter }: { onEnter: () => void; ex: Exercise; answer: Record<string, string>; setAnswer: (a: any) => void; locked: boolean }) {
  const parts = (ex.template ?? '').split(/(\{\{\w+\}\})/g)
  return (
    <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 2.4 }}>
      {parts.map((p, i) => {
        const m = p.match(/^\{\{(\w+)\}\}$/)
        if (!m) return <span key={i}>{p}</span>
        const k = m[1]
        return (
          <input key={i} className="input blank" aria-label={`Case ${k}`} disabled={locked} autoFocus={i === parts.findIndex(q => /^\{\{\w+\}\}$/.test(q))}
            onKeyDown={e => { if (e.key === 'Enter') onEnter() }}
            inputMode={ex.normalization === 'decimal' ? 'decimal' : 'text'} autoComplete="off"
            value={answer[k] ?? ''} onChange={e => setAnswer({ ...answer, [k]: e.target.value })} />
        )
      })}
    </div>
  )
}

function Fraction({ ex, answer, setAnswer, locked }: { ex: Exercise; answer: number[]; setAnswer: (a: any) => void; locked: boolean }) {
  const parts = ex.parts ?? 4
  const toggle = (i: number) => {
    if (locked) return
    setAnswer(answer.includes(i) ? answer.filter(x => x !== i) : [...answer, i])
  }
  return (
    <div className="col center">
      <div className="small muted">Touche les parts à colorier ({answer.length} sur {ex.numerator}).</div>
      <div className="frac" role="group" aria-label="Parts">
        {Array.from({ length: parts }, (_, i) => (
          <button key={i} className={answer.includes(i) ? 'on' : ''} aria-pressed={answer.includes(i)} aria-label={`Part ${i + 1}`} onClick={() => toggle(i)} />
        ))}
      </div>
    </div>
  )
}

/* ---------- visuels ---------- */
function Visual({ v }: { v: any }) {
  return <div className="visual" aria-hidden={v.kind === 'clock' ? undefined : undefined}>{renderVisual(v)}</div>
}

function renderVisual(v: any) {
  switch (v.kind) {
    case 'numberline': return <NumberLine v={v} />
    case 'operation': return <Operation v={v} />
    case 'clock': return <Clock v={v} />
    case 'shape': return <Shape name={v.shape} />
    case 'grid': return <Grid v={v} />
    case 'table':
      return (
        <table>
          <thead><tr>{v.headers.map((h: string) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{v.rows.map((r: any[], i: number) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      )
    case 'bars': return <Bars v={v} />
    default: return null
  }
}

function NumberLine({ v }: { v: any }) {
  const n = Math.round((v.end - v.start) / v.step)
  const W = 560, x0 = 30, x1 = W - 30
  const px = (i: number) => x0 + (i * (x1 - x0)) / n
  const markI = v.mark != null ? (v.mark - v.start) / v.step : null
  return (
    <svg viewBox={`0 0 ${W} 90`} width="100%" style={{ maxWidth: 560 }} role="img" aria-label="Droite graduée">
      <line x1={x0} x2={x1} y1="40" y2="40" stroke="#24354C" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: n + 1 }, (_, i) => (
        <g key={i}>
          <line x1={px(i)} x2={px(i)} y1="30" y2="50" stroke="#24354C" strokeWidth="3" />
          {(i === 0 || i === n || n <= 10 || i % 2 === 0) && <text x={px(i)} y="72" textAnchor="middle" fontWeight="800" fontSize="14" fill="#4A5B72">{v.start + i * v.step}</text>}
        </g>
      ))}
      {markI != null && (
        <g>
          <circle cx={px(markI)} cy="40" r="11" fill="#F28D62" stroke="#fff" strokeWidth="3" />
          <text x={px(markI)} y="14" textAnchor="middle" fontWeight="900" fontSize="16" fill="#C9633A">?</text>
        </g>
      )}
    </svg>
  )
}

function Operation({ v }: { v: any }) {
  const a = String(v.a), b = String(v.b)
  const w = Math.max(a.length, b.length) + 1
  const pad = (s: string) => s.padStart(w, ' ')
  return (
    <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '2rem', fontWeight: 800, lineHeight: 1.3, textAlign: 'right', border: '2px solid var(--line)', borderRadius: 14, padding: '10px 22px', background: '#fff' }}>
      <div>{pad(a)}</div>
      <div>{v.operator}{pad(b).slice(1)}</div>
      <div style={{ borderTop: '4px solid var(--ink)', marginTop: 4 }}>{' '.repeat(w)}</div>
    </div>
  )
}

function Clock({ v }: { v: any }) {
  const hAng = ((v.hour % 12) + v.minute / 60) * 30
  const mAng = v.minute * 6
  const hand = (ang: number, len: number, w: number, c: string) => {
    const r = ((ang - 90) * Math.PI) / 180
    return <line x1="100" y1="100" x2={100 + len * Math.cos(r)} y2={100 + len * Math.sin(r)} stroke={c} strokeWidth={w} strokeLinecap="round" />
  }
  return (
    <svg viewBox="0 0 200 200" width="190" role="img" aria-label="Horloge">
      <circle cx="100" cy="100" r="92" fill="#fff" stroke="#24354C" strokeWidth="6" />
      {Array.from({ length: 12 }, (_, i) => {
        const r = ((i * 30 - 90) * Math.PI) / 180
        return <text key={i} x={100 + 72 * Math.cos(r)} y={100 + 72 * Math.sin(r) + 6} textAnchor="middle" fontWeight="900" fontSize="17" fill="#24354C">{i === 0 ? 12 : i}</text>
      })}
      {hand(hAng, 48, 8, '#24354C')}
      {hand(mAng, 72, 5, '#D2582F')}
      <circle cx="100" cy="100" r="6" fill="#24354C" />
    </svg>
  )
}

function Shape({ name }: { name: string }) {
  const stroke = '#17766E', fill = '#E3F4EE'
  const common = { stroke, strokeWidth: 4, strokeLinejoin: 'round' as const }
  let body
  switch (name) {
    case 'cube':
      body = <g><rect x="30" y="50" width="90" height="90" fill={fill} {...common} /><polygon points="30,50 60,22 150,22 120,50" fill="#C7E9DE" {...common} /><polygon points="120,50 150,22 150,112 120,140" fill="#A9DCCD" {...common} /></g>; break
    case 'cuboid':
      body = <g><rect x="20" y="62" width="120" height="70" fill={fill} {...common} /><polygon points="20,62 50,34 170,34 140,62" fill="#C7E9DE" {...common} /><polygon points="140,62 170,34 170,104 140,132" fill="#A9DCCD" {...common} /></g>; break
    case 'sphere':
      body = <g><circle cx="90" cy="80" r="58" fill={fill} {...common} /><ellipse cx="90" cy="80" rx="58" ry="16" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="5 5" /></g>; break
    case 'cylinder':
      body = <g><path d="M40 40v90a50 18 0 0 0 100 0V40" fill={fill} {...common} /><ellipse cx="90" cy="40" rx="50" ry="18" fill="#C7E9DE" {...common} /></g>; break
    case 'triangle':
      body = <polygon points="90,20 160,130 20,130" fill={fill} {...common} />; break
    case 'square':
      body = <rect x="35" y="30" width="110" height="110" fill={fill} {...common} />; break
    case 'rectangle':
      body = <rect x="20" y="45" width="140" height="80" fill={fill} {...common} />; break
    case 'circle':
      body = <circle cx="90" cy="80" r="58" fill={fill} {...common} />; break
    default:
      body = <rect x="35" y="30" width="110" height="110" fill={fill} {...common} />
  }
  return <svg viewBox="0 0 180 160" width="180" role="img" aria-label="Figure géométrique">{body}</svg>
}

function Grid({ v }: { v: any }) {
  const c = 38, W = v.cols * c + 40, H = v.rows * c + 40
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={Math.min(W, 340)} role="img" aria-label="Quadrillage">
      {Array.from({ length: v.rows + 1 }, (_, i) => <line key={`h${i}`} x1="20" x2={20 + v.cols * c} y1={20 + i * c} y2={20 + i * c} stroke="#C9C2AE" strokeWidth="2" />)}
      {Array.from({ length: v.cols + 1 }, (_, i) => <line key={`v${i}`} y1="20" y2={20 + v.rows * c} x1={20 + i * c} x2={20 + i * c} stroke="#C9C2AE" strokeWidth="2" />)}
      <circle cx={20 + v.x * c + c / 2} cy={20 + v.y * c + c / 2} r="12" fill="#F28D62" stroke="#fff" strokeWidth="3" />
    </svg>
  )
}

function Bars({ v }: { v: any }) {
  const max = Math.max(...v.values)
  const W = 440, H = 200, bw = W / v.values.length
  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} width="100%" style={{ maxWidth: 440 }} role="img" aria-label="Diagramme en barres">
      {v.values.map((val: number, i: number) => {
        const h = (val / max) * (H - 30)
        return (
          <g key={i}>
            <rect x={i * bw + 18} y={H - h} width={bw - 36} height={h} rx="8" fill="#17766E" />
            <text x={i * bw + bw / 2} y={H - h - 6} textAnchor="middle" fontWeight="900" fill="#24354C">{val}</text>
            <text x={i * bw + bw / 2} y={H + 20} textAnchor="middle" fontWeight="800" fontSize="13" fill="#4A5B72">{v.labels[i]}</text>
          </g>
        )
      })}
      <line x1="0" x2={W} y1={H} y2={H} stroke="#24354C" strokeWidth="3" />
    </svg>
  )
}
