import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Volume2, X, ChevronRight, Ear, BookOpen } from 'lucide-react'
import { useStore } from '../../../state/store'
import { canSpeak, sfx, speak, stopSpeaking } from '../../../lib/audio'
import { buildBilan, hasReperes, PHASES, phaseState, saveSeq, scoreItem, type CompScore, type Phase, type RQ } from '../../../lib/reperes'
import { Modal } from '../../../components/common'
import { RVisual } from './Visual'

/** Passation d'une séquence de bilan : pas de correction en direct, comme le jour des évaluations. */
export default function ReperesPlayer() {
  const { phase: ph, seq: sid } = useParams()
  const nav = useNavigate()
  const { child, mutateChild } = useStore()
  const phase = Number(ph) as Phase
  const seq = useMemo(() => (child ? buildBilan(child, phase).find(s => s.id === sid) : undefined), [child?.id, child?.grade, phase, sid])   // eslint-disable-line react-hooks/exhaustive-deps
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState<any[]>([])
  const [quit, setQuit] = useState(false)
  const t0 = useRef(Date.now())
  useEffect(() => () => stopSpeaking(), [])

  if (!child || !hasReperes(child.grade)) return <Navigate to="/enfant" replace />
  if (!seq || phaseState(child, phase) === 'locked') return <Navigate to="/enfant/reperes" replace />
  const total = seq.items.length
  const q = seq.items[step]

  const answer = (v: any) => {
    const a = [...answers]; a[step] = v; setAnswers(a)
    stopSpeaking(); sfx('tap', child.sound)
    if (step + 1 < total) setStep(step + 1)
    else {
      const s: CompScore = {}
      seq.items.forEach((it, i) => { const k = it.comp; const sc = scoreItem(it, a[i]); s[k] = [(s[k]?.[0] ?? 0) + sc, (s[k]?.[1] ?? 0) + 1] })
      mutateChild(child.id, c => saveSeq(c, phase, seq.id, { s, at: new Date().toISOString(), ms: Date.now() - t0.current }))
      sfx('done', child.sound)
      setStep(total)
    }
  }

  return (
    <div className={`rp lv-${child.grade} ${seq.subject}`}>
      <div className="rp-bar">
        <button className="iconbtn" aria-label="Quitter" onClick={() => (step >= 0 && step < total ? setQuit(true) : nav('/enfant/reperes'))}><X /></button>
        <div className="rp-prog" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.max(0, step)}><i style={{ width: `${(Math.max(0, step) / total) * 100}%` }} /></div>
        <span className="tiny muted">{Math.min(Math.max(step + 1, 1), total)}/{total}</span>
      </div>
      <main className="rp-body">
        {step < 0 && (
          <section className="rp-intro">
            <span className="rp-badge">{PHASES[phase].name}</span>
            <h1>{seq.title}</h1>
            <p>{total} questions · environ {seq.minutes} minutes</p>
            <ul className="rp-rules">
              <li>Ce n’est pas une note : ce bilan sert à voir ce que tu sais déjà bien faire.</li>
              <li>Comme le jour des évaluations, tu ne sauras pas tout de suite si c’est juste. Fais de ton mieux !</li>
              {canSpeak() ? <li>Certaines questions se lisent à voix haute : monte un peu le son.</li> : <li>Ton appareil ne lit pas à voix haute : demande à un adulte de lire les questions « à écouter ».</li>}
            </ul>
            <button className="btn lg block" autoFocus onClick={() => { t0.current = Date.now(); setStep(0) }}>Commencer</button>
          </section>
        )}
        {q && <Question key={`${step}`} q={q} onAnswer={answer} sound={child.sound} first={step === 0 || seq.items[step - 1]?.passage?.title !== q.passage?.title} />}
        {step >= total && (
          <section className="rp-intro">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="rp-fox" />
            <h1>Séquence terminée !</h1>
            <p>Bravo pour ta concentration. Tes résultats vont colorer ta toile de compétences.</p>
            <button className="btn lg block" autoFocus onClick={() => nav('/enfant/reperes')}>Voir mon bilan</button>
          </section>
        )}
      </main>
      {quit && (
        <Modal label="Quitter la séquence" onClose={() => setQuit(false)}>
          <h2>Quitter la séquence ?</h2>
          <p className="muted mt8">Tes réponses de cette séquence ne seront pas gardées. Tu pourras la recommencer.</p>
          <div className="col mt16">
            <button className="btn block" onClick={() => setQuit(false)}>Continuer</button>
            <button className="btn quiet block" onClick={() => nav('/enfant/reperes')}>Quitter</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Question({ q, onAnswer, sound, first }: { q: RQ; onAnswer: (v: any) => void; sound: boolean; first: boolean }) {
  const [val, setVal] = useState('')
  const [showText, setShowText] = useState(false)
  const tts = canSpeak()
  const oral = q.passage?.oral
  // Lecture automatique : le texte entendu (2 fois) puis la question, ou le mot / la phrase à écouter
  useEffect(() => {
    let t: number | undefined
    if (oral && first && tts) { speak(`${q.passage!.text} ... Je relis. ... ${q.passage!.text}`) }
    else if (q.say && tts && q.kind !== 'speed') t = window.setTimeout(() => speak(q.say!), 250)
    return () => { if (t) clearTimeout(t) }
  }, [])   // eslint-disable-line react-hooks/exhaustive-deps
  if (q.kind === 'speed') return <Speed q={q} onDone={onAnswer} sound={sound} />
  const showSay = q.say && q.hideSay && !tts
  return (
    <section className="rp-q">
      {q.passage && !oral && (
        <article className="rp-text"><h2><BookOpen size={18} /> {q.passage.title}</h2><p>{q.passage.text}</p></article>
      )}
      {oral && (
        <div className="rp-oral">
          <Ear size={22} /><div className="grow"><b>Texte à écouter : {q.passage!.title}</b><small>Écoute bien, tu ne peux pas le lire.</small></div>
          {tts ? <button className="btn sm" onClick={() => speak(q.passage!.text)}><Volume2 size={16} /> Réécouter</button>
            : <button className="btn sm ghost" onClick={() => setShowText(s => !s)}>{showText ? 'Cacher' : 'Afficher (adulte)'}</button>}
        </div>
      )}
      {oral && showText && <article className="rp-text"><p>{q.passage!.text}</p></article>}
      <div className="rp-prompt">
        <h1>{q.prompt}</h1>
        {q.say && tts && <button className="saybtn" aria-label="Écouter" onClick={() => speak(q.say!)}><Volume2 size={24} /></button>}
      </div>
      {q.sentence && <p className="rp-sentence">{q.sentence}</p>}
      {showSay && <p className="rp-adult">À lire par un adulte : <b>« {q.say} »</b></p>}
      {q.vis && <div className="rp-vis"><RVisual v={q.vis} /></div>}
      {q.kind === 'choice' && (
        <div className={`rp-opts ${q.emoji ? 'emoji' : ''} ${q.optVis ? 'vis' : ''} n${q.options!.length}`}>
          {q.options!.map((o, i) => (
            <button key={i} className="rp-opt" onClick={() => onAnswer(i)} aria-label={q.optVis ? `Figure ${i + 1}` : o}>
              {q.optVis ? <RVisual v={q.optVis[i]} small /> : <span>{o}</span>}
            </button>
          ))}
        </div>
      )}
      {q.kind === 'input' && (
        <form className="rp-input" onSubmit={e => { e.preventDefault(); if (val.trim()) onAnswer(val) }}>
          <input className="input" autoFocus value={val} onChange={e => setVal(q.input === 'num' ? e.target.value.replace(/[^0-9 ]/g, '') : e.target.value)}
            inputMode={q.input === 'num' ? 'numeric' : 'text'} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Ta réponse" placeholder={q.input === 'num' ? 'Écris le nombre' : 'Écris ici'} />
          <button className="btn" type="submit" disabled={!val.trim()}>Valider <ChevronRight size={18} /></button>
        </form>
      )}
      {q.kind !== 'input' && <button className="btn quiet sm rp-skip" onClick={() => onAnswer(null)}>Je ne sais pas, question suivante</button>}
      {q.kind === 'input' && <button className="btn quiet sm rp-skip" onClick={() => onAnswer('')}>Je ne sais pas</button>}
    </section>
  )
}

/** Calcul mental chronométré : le plus de calculs possible en une minute, on peut passer. */
function Speed({ q, onDone, sound }: { q: RQ; onDone: (n: number) => void; sound: boolean }) {
  const sp = q.speed!
  const [started, setStarted] = useState(false)
  const [left, setLeft] = useState(sp.seconds)
  const [i, setI] = useState(0)
  const [val, setVal] = useState('')
  const okRef = useRef(0)
  useEffect(() => {
    if (!started) return
    const t = setInterval(() => setLeft(l => { if (l <= 1) { clearInterval(t); setTimeout(() => onDone(okRef.current), 50); return 0 } return l - 1 }), 1000)
    return () => clearInterval(t)
  }, [started])   // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!started) return
    const k = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) setVal(v => (v + e.key).slice(0, 4))
      else if (e.key === 'Backspace') setVal(v => v.slice(0, -1))
      else if (e.key === 'Enter') { const v = (document.querySelector('.rp-calc span') as HTMLElement | null)?.textContent; if (v && v !== '?') next(v) }
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  })
  const next = (given: string | null) => {
    if (given != null && Number(given) === sp.items[i].a) { okRef.current += 1 }
    sfx('tap', sound); setVal('')
    if (i + 1 >= sp.items.length) onDone(okRef.current); else setI(i + 1)
  }
  if (!started) return (
    <section className="rp-intro">
      <span className="rp-badge">Calcul mental · 1 minute</span>
      <h1>{q.prompt}</h1>
      <p>Écris le résultat puis appuie sur « OK ». Le chronomètre démarre quand tu es prêt.</p>
      <button className="btn lg block" autoFocus onClick={() => setStarted(true)}>Je suis prêt !</button>
    </section>
  )
  return (
    <section className="rp-speed">
      <div className={`rp-clock ${left <= 10 ? 'hurry' : ''}`}><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" /><circle cx="20" cy="20" r="17" className="run" style={{ strokeDashoffset: 107 * (1 - left / sp.seconds) }} /></svg><b>{left}</b></div>
      <p className="rp-calc">{sp.items[i].q} = <span>{val || '?'}</span></p>
      <div className="rp-pad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(k => <button key={k} onClick={() => setVal(v => (v + k).slice(0, 4))}>{k}</button>)}
        <button className="alt" onClick={() => setVal(v => v.slice(0, -1))} aria-label="Effacer">⌫</button>
        <button onClick={() => setVal(v => (v + '0').slice(0, 4))}>0</button>
        <button className="ok" disabled={!val} onClick={() => next(val)}>OK</button>
      </div>
      <button className="btn quiet sm" onClick={() => next(null)}>Passer ce calcul</button>
      <p className="tiny muted center">Calcul n° {i + 1}</p>
    </section>
  )
}
