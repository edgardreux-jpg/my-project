import { useState } from 'react'
import { Star, Lock, Sparkles, Check } from 'lucide-react'
import { useStore } from '../../state/store'
import { BADGES, CHESTS, levelOf, LEVEL_STEPS, openChest, readyChests, totalStars, type Chest } from '../../lib/progress'
import { Avatar, Confetti, Modal } from '../../components/common'
import { sfx } from '../../lib/audio'
import { Ico } from '../../components/Icon'
import { avatarSrc } from '../../lib/avatars'
import { ChestArt, LEVEL_ICONS } from './kidui'

const MEDAL = ['#E07A4B', '#17766E', '#3A76CE', '#C77F1F', '#4A8F3A', '#B2428A', '#2C8FA6', '#D9A23A', '#5568D0', '#D2582F']

export default function Rewards() {
  const { child, mutateChild } = useStore()
  const [won, setWon] = useState<Chest | null>(null)
  if (!child) return null
  const lv = levelOf(child.xp)
  const ready = readyChests(child)
  const open = (id: string) => {
    sfx('chest', child.sound)
    const ch = CHESTS.find(c => c.id === id)!
    mutateChild(child.id, c => { openChest(c, id) })
    setWon(ch)
  }
  const wear = (ch: Chest) => {
    mutateChild(child.id, c => { if (ch.kind === 'avatar') c.avatar = ch.value; else c.frame = ch.value })
    setWon(null)
  }
  const LI = LEVEL_ICONS[lv.index]
  return (
    <div className="col gap20 k-page">
      {won && <Confetti />}
      <h1 className="k-hi">Mes trésors</h1>

      <section className="k-level">
        <div className="row" style={{ gap: 16 }}>
          <span className="k-medal-big"><LI size={40} strokeWidth={2.2} /></span>
          <div className="grow">
            <div className="tiny k-up">Niveau {lv.index + 1}</div>
            <h2>{lv.name}</h2>
          </div>
          <span className="k-chip star big"><Star size={18} strokeWidth={2.6} /> {totalStars(child)}</span>
        </div>
        <div className="k-xpbar big mt16"><i style={{ width: `${Math.max(4, lv.pct)}%` }} /></div>
        <p className="small mt8">{lv.next ? <><b>{lv.next - child.xp} points</b> avant « {lv.nextName} »</> : 'Niveau maximum atteint, bravo !'}</p>
        <div className="k-track">
          {LEVEL_STEPS.map((s, i) => { const I = LEVEL_ICONS[i]; return (
            <span key={s.name} className={`${i < lv.index ? 'done' : ''} ${i === lv.index ? 'cur' : ''}`}><i><I size={18} strokeWidth={2.4} /></i><small>{s.name}</small></span>
          ) })}
        </div>
      </section>

      <section>
        <h3 className="k-h3">Coffres {ready.length > 0 && <span className="k-count">{ready.length} à ouvrir</span>}</h3>
        <div className="k-chests">
          {CHESTS.map(c => {
            const isOpen = child.chestsOpened.includes(c.id)
            const can = ready.some(r => r.id === c.id)
            const prev = Math.max(0, ...CHESTS.filter(x => x.xp < c.xp).map(x => x.xp))
            return (
              <div key={c.id} className={`k-chest ${can ? 'ready' : isOpen ? 'open' : 'locked'}`}>
                <span className={can ? 'k-wiggle' : ''}>
                  {isOpen && c.kind === 'avatar' ? <img className="k-chest-av" src={avatarSrc(c.value)} alt="" /> : isOpen ? <Avatar emoji={child.avatar} frame={c.value} size={70} /> : <ChestArt state={can ? 'ready' : 'locked'} size={88} />}
                </span>
                <b>{isOpen ? c.label.replace('Avatar ', '').replace(/^./, x => x.toUpperCase()) : c.title}</b>
                {can && <button className="k-btn3d sm gold" onClick={() => open(c.id)}>Ouvrir !</button>}
                {isOpen && <span className="k-got"><Check size={14} strokeWidth={3} /> Gagné</span>}
                {!can && !isOpen && <><span className="k-xpbar sm"><i style={{ width: `${Math.max(3, Math.min(100, ((child.xp - prev) / (c.xp - prev)) * 100))}%` }} /></span><span className="tiny">{c.xp} points</span></>}
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h3 className="k-h3">Badges <span className="k-count soft">{child.badges.length} / {BADGES.length}</span></h3>
        <div className="k-badges">
          {BADGES.map((b, i) => {
            const on = child.badges.includes(b.id)
            return (
              <div key={b.id} className={`k-badge ${on ? 'on' : ''}`} style={{ ['--c' as string]: MEDAL[i % MEDAL.length] }}>
                <span className="k-medal"><Ico e={b.emoji} color={on ? '#fff' : '#A7AEB8'} size={30} />{!on && <span className="k-lock"><Lock size={12} strokeWidth={3} /></span>}</span>
                <b>{b.title}</b><span className="tiny">{b.desc}</span>
              </div>
            )
          })}
        </div>
      </section>

      {won && (
        <Modal label="Coffre ouvert" onClose={() => setWon(null)}>
          <div className="k-won">
            <div className="k-won-rays" aria-hidden="true" />
            {won.kind === 'avatar' ? <img src={avatarSrc(won.value)} alt="" className="k-won-av" /> : <span className="k-won-av"><Avatar emoji={child.avatar} frame={won.value} size={130} /></span>}
            <div className="tiny k-up"><Sparkles size={14} /> Tu as gagné</div>
            <h2>{won.label}</h2>
            <button className="k-btn3d" onClick={() => wear(won)}>{won.kind === 'avatar' ? 'Je le prends !' : 'Je le mets !'}</button>
            <button className="btn quiet sm" onClick={() => setWon(null)}>Plus tard</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
