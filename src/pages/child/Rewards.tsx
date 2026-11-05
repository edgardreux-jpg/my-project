import { useState } from 'react'
import { useStore } from '../../state/store'
import { BADGES, CHESTS, levelOf, LEVEL_STEPS, openChest, readyChests, totalStars } from '../../lib/progress'
import { Confetti } from '../../components/common'
import { sfx } from '../../lib/audio'
import { Ico, Stars, avatarColor } from '../../components/Icon'

export default function Rewards() {
  const { child, mutateChild } = useStore()
  const [opened, setOpened] = useState<string | null>(null)
  if (!child) return null
  const lv = levelOf(child.xp)
  const ready = readyChests(child)
  const open = (id: string) => {
    sfx('chest', child.sound)
    const ch = CHESTS.find(c => c.id === id)!
    mutateChild(child.id, c => { openChest(c, id) })
    setOpened(`${ch.title} : ${ch.label}`)
  }
  return (
    <div className="col gap20">
      {opened && <Confetti />}
      <h1 className="h-lg">Mes récompenses</h1>
      <section className="card">
        <div className="row"><div className="grow"><div className="tiny muted">NIVEAU</div><h2>{lv.name}</h2></div><div className="chip"><Ico e="⭐" /> {totalStars(child)} étoiles</div></div>
        <div className="bar gold mt16"><i style={{ width: `${lv.pct}%` }} /></div>
        <p className="small muted mt8">{lv.next ? `${lv.next - child.xp} points avant « ${lv.nextName} »` : 'Niveau maximum atteint !'}</p>
        <div className="row small muted mt8" style={{ flexWrap: 'wrap' }}>{LEVEL_STEPS.map((s, i) => <span key={s.name} className={`pill ${i <= lv.index ? 'gold' : ''}`}>{s.name}</span>)}</div>
      </section>

      <section className="card">
        <h3>Coffres</h3>
        {opened && <div className="note mb16 row gap8"><Ico e="🎉" size={22} /> Tu as obtenu : <b>{opened}</b></div>}
        <div className="badge-grid">
          {CHESTS.map(c => {
            const isOpen = child.chestsOpened.includes(c.id)
            const can = ready.some(r => r.id === c.id)
            return (
              <div key={c.id} className={`badge ${can || isOpen ? '' : 'off'}`}>
                <div className={`e ${can ? 'chest' : ''}`}><Ico e={isOpen ? c.kind === 'avatar' ? c.value : '🖼️' : '🎁'} color={isOpen && c.kind === 'avatar' ? avatarColor(c.value) : undefined} /></div>
                <b className="small">{isOpen ? c.label : c.title}</b>
                {can ? <button className="btn sm mt8" onClick={() => open(c.id)}>Ouvrir</button> : <div className="tiny muted mt8">{isOpen ? 'Ouvert' : `${c.xp} points`}</div>}
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h3>Badges ({child.badges.length} / {BADGES.length})</h3>
        <div className="badge-grid">
          {BADGES.map(b => {
            const on = child.badges.includes(b.id)
            return <div key={b.id} className={`badge ${on ? '' : 'off'}`}><div className="e"><Ico e={b.emoji} /></div><b className="small">{b.title}</b><div className="tiny muted">{b.desc}</div></div>
          })}
        </div>
      </section>
    </div>
  )
}
