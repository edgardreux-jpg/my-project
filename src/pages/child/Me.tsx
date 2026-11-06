import type { Child } from '../../types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../state/store'
import { applyVoicePrefs, effectiveVoice, listVoices, speak, canSpeak, voiceScore } from '../../lib/audio'
import { BASE_AVATARS, FRAMES } from '../../lib/progress'
import { Avatar, Switch } from '../../components/common'
import { avatarId, avatarLabel, avatarSrc, isAvatar } from '../../lib/avatars'

export default function Me() {
  const { child, mutateChild, switchProfile } = useStore()
  const nav = useNavigate()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const voice = child?.voice || ''
  const rate = child?.rate ?? 0.95
  useEffect(() => {
    const load = () => setVoices(listVoices('fr'))
    load()
    if (canSpeak()) { window.speechSynthesis.onvoiceschanged = load }
    return () => { if (canSpeak()) window.speechSynthesis.onvoiceschanged = null }
  }, [])
  if (!child) return null
  const avatars = [...new Set([...BASE_AVATARS, ...child.unlocked.filter(u => !FRAMES.includes(u) && isAvatar(u)).map(avatarId)])]
  const frames = ['none', ...child.unlocked.filter(u => FRAMES.includes(u))]
  const set = (fn: (c: Child) => void) => mutateChild(child.id, fn)
  return (
    <div className="col gap20">
      <h1 className="h-lg">Moi</h1>
      <section className="card">
        <div className="row"><Avatar emoji={child.avatar} frame={child.frame} size={80} /><div><h2>{child.nickname}</h2><div className="muted small">{child.grade.toUpperCase()}</div></div></div>
        <h3 className="mt24">Mon avatar</h3>
        <div className="wrap">{avatars.map(a => <button key={a} className={`avpick ${a === avatarId(child.avatar) ? 'on' : ''}`} aria-label={`Avatar ${avatarLabel(a)}`} aria-pressed={a === avatarId(child.avatar)} onClick={() => set(c => { c.avatar = a })}><img src={avatarSrc(a)} alt="" /><span>{avatarLabel(a)}</span></button>)}</div>
        {frames.length > 1 && <>
          <h3 className="mt16">Mon cadre</h3>
          <div className="wrap">{frames.map(f => <button key={f} className="iconbtn" style={{ width: 56, height: 56, border: f === child.frame ? '3px solid var(--teal)' : '3px solid transparent' }} aria-label={`Cadre ${f}`} onClick={() => set(c => { c.frame = f })}><Avatar emoji={child.avatar} frame={f} size={40} /></button>)}</div>
        </>}
      </section>
      <section className="card">
        <h3>Voix de lecture</h3>
        {voices.length === 0 ? <p className="small muted">Aucune voix française trouvée sur cet appareil. Essaie un autre navigateur (Chrome ou Edge proposent des voix plus naturelles).</p> : (
          <div className="col">
            <select className="input" aria-label="Voix" value={voice && voices.some(v => v.name === voice) ? voice : (effectiveVoice('fr')?.name || voices[0].name)} onChange={e => { const n = e.target.value; applyVoicePrefs(n); set(c => { c.voice = n }); speak('Bonjour, je suis ta nouvelle voix.') }}>
              {voices.map(v => <option key={v.name} value={v.name}>{v.name}{voiceScore(v) >= 60 ? ' (naturelle)' : ''}</option>)}
            </select>
            <div className="row"><span className="small">Vitesse</span>
              <input type="range" min="0.7" max="1.1" step="0.05" value={rate} aria-label="Vitesse de lecture" style={{ flex: 1 }} onChange={e => { const r = Number(e.target.value); applyVoicePrefs(undefined, r); set(c => { c.rate = r }) }} /></div>
            <button className="btn ghost sm" onClick={() => speak('Bravo ! Tu as trouvé la bonne réponse. On continue ?')}>Écouter un exemple</button>
          </div>
        )}
      </section>
      <section className="card">
        <h3>Confort</h3>
        <div className="toggle"><div><b>Sons</b><div className="tiny muted">Petits bruitages pendant les leçons</div></div><Switch label="Sons" on={child.sound} onChange={v => set(c => { c.sound = v })} /></div>
        <div className="toggle"><div><b>Lire les consignes</b><div className="tiny muted">La consigne est lue à voix haute à chaque question</div></div><Switch label="Lire les consignes" on={child.readAloud ?? child.grade === 'ce1'} onChange={v => set(c => { c.readAloud = v })} /></div>
        <div className="toggle"><div><b>Passage automatique</b><div className="tiny muted">Aller tout de suite à la question suivante après une bonne réponse</div></div><Switch label="Passage automatique" on={child.autoNext !== false} onChange={v => set(c => { c.autoNext = v })} /></div>
        <div className="toggle"><div><b>Police facile à lire</b><div className="tiny muted">Lettres plus distinctes, utile en cas de dyslexie</div></div><Switch label="Police facile à lire" on={child.font === 'dys'} onChange={v => set(c => { c.font = v ? 'dys' : 'default' })} /></div>
        <div className="toggle"><div><b>Taille du texte</b></div>
          <div className="row gap8">{[1, 1.15, 1.3].map((s, i) => <button key={s} className={`btn sm sizebtn ${child.scale === s ? '' : 'ghost'}`} onClick={() => set(c => { c.scale = s })} aria-label={`Taille ${i + 1}`}>{'A'.repeat(i + 1)}</button>)}</div>
        </div>
      </section>
      <button className="btn quiet block" onClick={() => { switchProfile(); nav('/profils') }}>Changer de profil</button>
    </div>
  )
}
