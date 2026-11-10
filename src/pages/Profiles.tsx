import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Lock } from 'lucide-react'
import { isAdmin } from '../lib/admin'
import { useStore } from '../state/store'
import { Avatar, Logo, Modal } from '../components/common'
import { AddChildModal } from './parent/Dashboard'
import type { Child } from '../types'

export default function Profiles() {
  const { account, mode, enterChild, leaveChild, logout, loading } = useStore()
  const nav = useNavigate()
  const [ask, setAsk] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [add, setAdd] = useState(false)
  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (!account) return <Navigate to="/connexion" replace />
  if (account.role === 'teacher') return <Navigate to="/enseignant" replace />

  // L'enfant entre d'un seul toucher sur son avatar : seul l'espace parent est protégé par un code.
  const pick = async (c: Child) => { const r = await enterChild(c.id); if (r.ok) nav('/enfant') }
  const tryParent = async () => {
    if (mode === 'parent') { nav('/parent'); return }
    const r = await leaveChild(pw)
    if (r.ok) nav('/parent'); else setPwErr(r.error)
  }
  return (
    <div className="auth" style={{ alignItems: 'start' }}>
      <div className="col gap20" style={{ width: '100%', maxWidth: 820, paddingTop: 24 }}>
        <div className="center"><Logo /></div>
        <h1 className="h-lg center">Qui apprend aujourd’hui ?</h1>
        <div className="picker">
          {account.children.map(c => (
            <button key={c.id} className="pick" onClick={() => pick(c)}>
              <Avatar emoji={c.avatar} frame={c.frame} size={84} />{c.nickname}<span className="pill teal">{c.grade.toUpperCase()}</span>
            </button>
          ))}
          {mode === 'parent' && <button className="pick" onClick={() => setAdd(true)} style={{ borderStyle: 'dashed' }}><span style={{ fontSize: '2.4rem' }}>＋</span>Ajouter</button>}
        </div>
        {account.children.length === 0 && <p className="center muted">Aucun profil enfant pour l’instant. Connectez-vous à l’espace parent pour en créer un.</p>}
        <div className="center row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn ghost" onClick={() => (mode === 'parent' ? nav('/parent') : setAsk(true))}><Lock size={16} /> Espace parent</button>
          {mode === 'parent' && isAdmin(account) && <Link className="btn ghost adm-link" to="/admin"><LayoutDashboard size={16} aria-hidden="true" /> Tableau de bord</Link>}
          <button className="btn quiet" onClick={() => { logout(); nav('/') }}>Déconnexion</button>
        </div>
        <p className="center tiny"><Link to="/confidentialite">Confidentialité</Link></p>
      </div>
      {ask && (
        <Modal label="Espace parent" onClose={() => setAsk(false)}>
          <h2>Espace parent</h2>
          <form className="col mt16" onSubmit={e => { e.preventDefault(); tryParent() }}>
            <input className="input" type="password" autoFocus placeholder={account.codeHash ? 'Code parent' : 'Mot de passe'} inputMode={account.codeHash ? 'numeric' : undefined} value={pw} onChange={e => { setPw(e.target.value); setPwErr('') }} aria-label="Mot de passe parent" />
            {pwErr && <div className="err">{pwErr}</div>}
            <button className="btn block" type="submit">Entrer</button>
          </form>
        </Modal>
      )}
      {add && <AddChildModal onClose={() => setAdd(false)} />}
    </div>
  )
}
