import type { Child } from '../../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../state/store'
import { getRate, getVoiceName, listVoices, setRate, setVoiceName, speak, canSpeak, voiceScore } from '../../lib/audio'
import { BASE_AVATARS, FRAMES } from '../../lib/progress'
import { Avatar, Switch } from '../../components/common'

export default function Me() {
  const { child, mutateChild, switchProfile } = useStore()
  const nav = useNavigate()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voice, setVoice] = useState(getVoiceName())
  const [rate, setRateS] = useState(getRate())
  useEffect(() => {
    const load = () => setVoices(listVoices('fr'))
    load()
    if (canSpeak()) { window.speechSynthesis.onvoiceschanged = load }
    return () => { if (canSpeak()) window.speechSynthesis.onvoiceschanged = null }
  }, [])
  if (!child) return null
  const avatars = [...BASE_AVATARS, ...child.unlocked.filter(u => !FRAMES.includes(u))]
  const frames = ['none', ...child.unlocked.filter(u => FRAMES.includes(u))]
  const set = (fn: (c: Child) => void) => mutateChild(child.id, fn)
  return (
    <div className="col gap20">
      <h1 className="h-lg">Moi</h1>
      <section className="card">
        <div className="row"><Avatar emoji={child.avatar} frame={child.frame} size={80} /><div><h2>{child.nickname}</h2><div className="muted small">{child.grade.toUpperCase()}</div></div></div>
        <h3 className="mt24">Mon avatar</h3>
        <div className="wrap">{avatars.map(a => <button key={a} className="iconbtn" style={{ width: 56, height: 56, fontSize: '1.9rem', border: a === child.avatar ? '3px solid var(--teal)' : '3px solid transparent' }} aria-label={`Avatar ${a}`} onClick={() => set(c => { c.avatar = a })}>{a}</button>)}</div>
        {frames.length > 1 && <>
          <h3 className="mt16">Mon cadre</h3>
          <div className="wrap">{frames.map(f => <button key={f} className="iconbtn" style={{ width: 56, height: 56, border: f === child.frame ? '3px solid var(--teal)' : '3px solid transparent' }} aria-label={`Cadre ${f}`} onClick={() => set(c => { c.frame = f })}><Avatar emoji={child.avatar} frame={f} size={40} /></button>)}</div>
        </>}
      </section>
      <section className="card">
        <h3>Voix de lecture</h3>
        {voices.length === 0 ? <p className="small muted">Aucune voix française trouvée sur cet appareil. Essaie un autre navigateur (Chrome ou Edge proposent des voix plus naturelles).</p> : (
          <div className="col">
            <select className="input" aria-label="Voix" value={voice || voices[0].name} onChange={e => { setVoice(e.target.value); setVoiceName(e.target.value); speak('Bonjour, je suis ta nouvelle voix.') }}>
              {voices.map(v => <option key={v.name} value={v.name}>{v.name}{voiceScore(v) >= 60 ? ' (naturelle)' : ''}</option>)}
            </select>
            <div className="row"><span className="small">Vitesse</span>
              <input type="range" min="0.7" max="1.1" step="0.05" value={rate} aria-label="Vitesse de lecture" style={{ flex: 1 }} onChange={e => { const r = Number(e.target.value); setRateS(r); setRate(r) }} /></div>
            <button className="btn ghost sm" onClick={() => speak('Bravo ! Tu as trouvé la bonne réponse. On continue ?')}>Écouter un exemple</button>
          </div>
        )}
      </section>
      <section className="card">
        <h3>Confort</h3>
        <div className="toggle"><div><b>Sons</b><div className="tiny muted">Petits bruitages pendant les leçons</div></div><Switch label="Sons" on={child.sound} onChange={v => set(c => { c.sound = v })} /></div>
        <div className="toggle"><div><b>Police facile à lire</b><div className="tiny muted">Lettres plus distinctes, utile en cas de dyslexie</div></div><Switch label="Police facile à lire" on={child.font === 'dys'} onChange={v => set(c => { c.font = v ? 'dys' : 'default' })} /></div>
        <div className="toggle"><div><b>Taille du texte</b></div>
          <div className="row gap8">{[1, 1.15, 1.3].map((s, i) => <button key={s} className={`btn sm ${child.scale === s ? '' : 'ghost'}`} onClick={() => set(c => { c.scale = s })} aria-label={`Taille ${i + 1}`}>{'A'.repeat(i + 1)}</button>)}</div>
        </div>
      </section>
      <button className="btn quiet block" onClick={() => { switchProfile(); nav('/profils') }}>Changer de profil</button>
    </div>
  )
}
