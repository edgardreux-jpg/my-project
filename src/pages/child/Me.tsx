import type { Child } from '../../types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, Flame, BookOpenCheck, Medal, Check, Lock, Settings2 } from 'lucide-react'
import { levelOf, totalStars } from '../../lib/progress'
import { LEVEL_ICONS } from './kidui'
import { useStore } from '../../state/store'
import { applyVoicePrefs, effectiveVoice, listVoices, speak, canSpeak, voiceScore } from '../../lib/audio'
import { BASE_AVATARS, CHESTS, FRAMES, LEGENDARY } from '../../lib/progress'
import { Avatar, Switch } from '../../components/common'
import { avatarId, avatarLabel, avatarSrc, isAvatar, RARITY } from '../../lib/avatars'

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
  const avatars = [...new Set([avatarId(child.avatar), ...BASE_AVATARS, ...child.unlocked.filter(u => !FRAMES.includes(u) && isAvatar(u)).map(avatarId)])]
  const locked = CHESTS.filter(c => c.kind === 'avatar' && !avatars.includes(c.value))
  const legends = LEGENDARY.filter(l => !avatars.includes(l.id))
  const tag = (a: string) => RARITY[a] ? <em className={`k-rar ${RARITY[a]}`}>{RARITY[a] === 'legend' ? 'Légende' : 'Rare'}</em> : null
  const frames = ['none', ...child.unlocked.filter(u => FRAMES.includes(u))]
  const set = (fn: (c: Child) => void) => mutateChild(child.id, fn)
  const lv = levelOf(child.xp), LI = LEVEL_ICONS[lv.index]
  const doneN = Object.values(child.lessons).filter(p => p.done > 0).length
  return (
    <div className="col gap20">
      <section className="k-me">
        <div className="k-me-bg" aria-hidden="true"><i /><i /></div>
        <span className="k-me-av"><Avatar emoji={child.avatar} frame={child.frame} size={112} /></span>
        <h1>{child.nickname}</h1>
        <span className="k-me-lvl"><LI size={16} strokeWidth={2.6} /> {lv.name} · {child.grade.toUpperCase()}</span>
        <div className="k-me-stats">
          <span><Star size={20} strokeWidth={2.6} /><b>{totalStars(child)}</b><small>étoiles</small></span>
          <span><Flame size={20} strokeWidth={2.6} /><b>{child.streak.best}</b><small>record de série</small></span>
          <span><BookOpenCheck size={20} strokeWidth={2.4} /><b>{doneN}</b><small>leçons finies</small></span>
          <span><Medal size={20} strokeWidth={2.4} /><b>{child.badges.length}</b><small>badges</small></span>
        </div>
      </section>
      <section className="card">
        <h3>Choisis ton avatar</h3>
        <div className="k-avs">{avatars.map(a => <button key={a} className={`k-av ${a === avatarId(child.avatar) ? 'on' : ''} ${RARITY[a] ?? ''}`} aria-label={`Avatar ${avatarLabel(a)}${RARITY[a] ? (RARITY[a] === 'legend' ? ', légendaire' : ', rare') : ''}`} aria-pressed={a === avatarId(child.avatar)} onClick={() => set(c => { c.avatar = a })}><img src={avatarSrc(a)} alt="" />{tag(a)}{a === avatarId(child.avatar) && <i className="k-av-ok"><Check size={14} strokeWidth={3.4} /></i>}<span>{avatarLabel(a)}</span></button>)}
          {locked.map(c => <Link to="/enfant/recompenses" key={c.id} className="k-av locked rare" title={`Dans le « ${c.title} » (${c.xp} points)`}><img src={avatarSrc(c.value)} alt="" />{tag(c.value)}<i className="k-av-lock"><Lock size={13} strokeWidth={3} /></i><span>{c.xp} pts</span></Link>)}
          {legends.map(l => { const v = Math.min(l.goal, l.value(child)); return (
            <div key={l.id} className="k-av locked legend" title={l.how} aria-label={`Avatar ${avatarLabel(l.id)}, légendaire, verrouillé : ${l.how}`}><img src={avatarSrc(l.id)} alt="" />{tag(l.id)}<i className="k-av-lock"><Lock size={13} strokeWidth={3} /></i><span>{v}/{l.goal}</span><small className="k-av-how">{l.how}</small></div>
          ) })}</div>
        {(locked.length > 0 || legends.length > 0) && <p className="tiny muted mt8">Les avatars <b>rares</b> se gagnent dans les coffres. Les <b>légendaires</b> récompensent un grand exploit.</p>}
        {frames.length > 1 && <>
          <h3 className="mt16">Mon cadre</h3>
          <div className="wrap">{frames.map(f => <button key={f} className="iconbtn" style={{ width: 56, height: 56, border: f === child.frame ? '3px solid var(--teal)' : '3px solid transparent' }} aria-label={`Cadre ${f}`} onClick={() => set(c => { c.frame = f })}><Avatar emoji={child.avatar} frame={f} size={40} /></button>)}</div>
        </>}
      </section>
      <details className="card k-set"><summary><Settings2 size={20} /> Mes réglages <span className="tiny muted">voix, sons, taille du texte</span></summary>
      <section className="mt16">
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
      <section className="mt16">
        <h3>Confort</h3>
        <div className="toggle"><div><b>Sons</b><div className="tiny muted">Petits bruitages pendant les leçons</div></div><Switch label="Sons" on={child.sound} onChange={v => set(c => { c.sound = v })} /></div>
        <div className="toggle"><div><b>Lire les consignes</b><div className="tiny muted">La consigne est lue à voix haute à chaque question</div></div><Switch label="Lire les consignes" on={child.readAloud ?? child.grade === 'ce1'} onChange={v => set(c => { c.readAloud = v })} /></div>
        <div className="toggle"><div><b>Passage automatique</b><div className="tiny muted">Aller tout de suite à la question suivante après une bonne réponse</div></div><Switch label="Passage automatique" on={child.autoNext !== false} onChange={v => set(c => { c.autoNext = v })} /></div>
        <div className="toggle"><div><b>Police facile à lire</b><div className="tiny muted">Lettres plus distinctes, utile en cas de dyslexie</div></div><Switch label="Police facile à lire" on={child.font === 'dys'} onChange={v => set(c => { c.font = v ? 'dys' : 'default' })} /></div>
        <div className="toggle"><div><b>Taille du texte</b></div>
          <div className="row gap8">{[1, 1.15, 1.3].map((s, i) => <button key={s} className={`btn sm sizebtn ${child.scale === s ? '' : 'ghost'}`} onClick={() => set(c => { c.scale = s })} aria-label={`Taille ${i + 1}`}>{'A'.repeat(i + 1)}</button>)}</div>
        </div>
      </section>
      </details>
      <button className="btn quiet block" onClick={() => { switchProfile(); nav('/profils') }}>Changer de profil</button>
    </div>
  )
}
