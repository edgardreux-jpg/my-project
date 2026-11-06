import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Users } from 'lucide-react'
import { useStore } from '../../state/store'
import { Logo, Modal } from '../../components/common'
import { useState } from 'react'

function CodeGate({ onSave }: { onSave: (c: string) => Promise<{ ok: boolean; error?: string }> }) {
  const [c, setC] = useState('')
  const [err, setErr] = useState('')
  return (
    <Modal label="Choisir un code parent">
      <h2>Choisissez votre code parent</h2>
      <p className="muted small mt8">4 chiffres. Il vous sera demandé pour quitter le profil d’un enfant et revenir à cet espace.</p>
      <form className="col mt16" onSubmit={async e => { e.preventDefault(); const r: any = await onSave(c); if (!r.ok) setErr(r.error) }}>
        <input className="input" inputMode="numeric" maxLength={4} autoFocus value={c} onChange={e => setC(e.target.value.replace(/\D/g, ''))} aria-label="Code parent" />
        {err && <div className="err">{err}</div>}
        <button className="btn block" type="submit">Enregistrer</button>
      </form>
    </Modal>
  )
}

export default function ParentShell() {
  const { account, mode, logout, loading, syncing, setParentCode } = useStore()
  const nav = useNavigate()
  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (!account) return <Navigate to="/connexion" replace />
  if (account.role === 'teacher') return <Navigate to="/enseignant" replace />
  if (mode !== 'parent') return <Navigate to="/profils" replace />
  return (
    <div className="pshell">
      <header className="ptop"><div className="in">
        <Logo />
        <span className="pill teal">Espace parent</span>
        <div className="grow" />
        <span className="small muted" style={{ display: 'none' }}>{account.name}</span>
        <Link className="btn ghost sm" to="/profils"><Users size={16} /><span className="lbl"> Profils enfants</span></Link>
        <button className="btn quiet sm" aria-label="Déconnexion" onClick={() => { logout(); nav('/') }}><LogOut size={16} /><span className="lbl"> Déconnexion</span></button>
      </div></header>
      <main className="pmain"><Outlet /></main>
      {syncing && <div className="toast" style={{ top: 'auto', bottom: 16 }} role="status">Enregistrement…</div>}
      {!account.codeHash && !account.codeSalt && account.cloud && <CodeGate onSave={setParentCode} />}
    </div>
  )
}
