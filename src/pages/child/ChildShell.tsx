import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Home, Gift, UserRound, Map as MapIcon, Lock, Users } from 'lucide-react'
import { useStore } from '../../state/store'
import { Avatar, Logo, Modal, Toast } from '../../components/common'

export default function ChildShell() {
  const { child, mode, leaveChild, account, switchProfile, loading } = useStore()
  const nav = useNavigate()
  const [ask, setAsk] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!child) return
    document.body.classList.toggle('dys', child.font === 'dys')
    document.documentElement.style.setProperty('--scale', String(child.scale))
    return () => { document.body.classList.remove('dys'); document.documentElement.style.setProperty('--scale', '1') }
  }, [child?.font, child?.scale, child])

  useEffect(() => {
    if (!child || !child.breakMin) return
    const t = setTimeout(() => setToast('Tu apprends depuis un moment. Une petite pause pour t’étirer et boire de l’eau ?'), child.breakMin * 60000)
    return () => clearTimeout(t)
  }, [child?.id, child?.breakMin, child])

  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (mode !== 'child' || !child) return <Navigate to={account ? '/profils' : '/'} replace />

  const tryLeave = async () => {
    const r = await leaveChild(pw)
    if (r.ok) { setAsk(false); setPw(''); nav('/parent') } else setErr(r.error)
  }

  const items = [
    { to: '/enfant', end: true, icon: <Home size={22} />, label: 'Accueil' },
    { to: '/enfant/matieres', icon: <MapIcon size={22} />, label: 'Matières' },
    { to: '/enfant/recompenses', icon: <Gift size={22} />, label: 'Récompenses' },
    { to: '/enfant/moi', icon: <UserRound size={22} />, label: 'Moi' },
  ]

  return (
    <div className="cshell">
      <aside className="side">
        <div style={{ padding: '4px 8px 12px' }}><Logo /></div>
        <div className="row" style={{ padding: '4px 8px 14px' }}>
          <Avatar emoji={child.avatar} frame={child.frame} size={46} />
          <div><b>{child.nickname}</b><div className="tiny muted">{child.grade.toUpperCase()}</div></div>
        </div>
        {items.map(i => <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => `nav ${isActive ? 'on' : ''}`}>{i.icon}{i.label}</NavLink>)}
        <div className="grow" />
        <button className="btn ghost sm" onClick={() => { switchProfile(); nav('/profils') }}><Users size={16} /> Changer de profil</button>
        <button className="btn quiet sm" onClick={() => setAsk(true)}><Lock size={16} /> Espace parent</button>
      </aside>
      <main className="cmain"><Outlet /></main>
      <nav className="tabbar" aria-label="Navigation">
        {items.map(i => <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => (isActive ? 'on' : '')}>{i.icon}{i.label}</NavLink>)}
      </nav>
      {ask && (
        <Modal label="Retour à l’espace parent" onClose={() => setAsk(false)}>
          <h2>Espace parent</h2>
          <p className="muted small mt8">{account?.codeHash ? 'Saisis le code parent.' : 'Saisis le mot de passe du compte parent.'}</p>
          <form className="col mt16" onSubmit={e => { e.preventDefault(); tryLeave() }}>
            <input className="input" type="password" inputMode={account?.codeHash ? 'numeric' : undefined} autoFocus value={pw} onChange={e => { setPw(e.target.value); setErr('') }} aria-label="Code parent" />
            {err && <div className="err">{err}</div>}
            <button className="btn block" type="submit">Entrer</button>
          </form>
        </Modal>
      )}
      {toast && <Toast text={toast} onDone={() => setToast('')} />}
    </div>
  )
}
