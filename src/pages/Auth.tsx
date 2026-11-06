import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStore } from '../state/store'
import { Logo } from '../components/common'

export default function Auth({ signup = false, teacher = false }: { signup?: boolean; teacher?: boolean }) {
  const { signup: doSignup, login, loginGoogle, loginDemo, loginDemoTeacher, mode, account, loading } = useStore()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [code, setCode] = useState('')
  const [info, setInfo] = useState('')
  if (loading) return <div className="auth"><p className="muted">Chargement…</p></div>
  if (account && account.role === 'teacher') return <Navigate to="/enseignant" replace />
  if (account && mode === 'parent') return <Navigate to="/parent" replace />
  if (account && mode !== 'out') return <Navigate to="/profils" replace />

  const submit = async () => {
    setBusy(true); setErr('')
    const r = signup ? await doSignup(name, email, pw, code, teacher ? 'teacher' : 'parent') : await login(email, pw)
    setBusy(false)
    if (!r.ok) setErr(r.error)
    else if (r.pending) setInfo('Un e-mail de confirmation vient de vous être envoyé. Cliquez sur le lien, puis connectez-vous.')
    else nav(teacher ? '/enseignant' : '/parent')
  }
  return (
    <div className="auth"><div className="box col gap20">
      <div className="center"><Logo /></div>
      <form className="card col" onSubmit={e => { e.preventDefault(); submit() }}>
        <h1 className="h-lg">{teacher ? (signup ? 'Créer un compte enseignant' : 'Connexion enseignant') : signup ? 'Créer un compte parent' : 'Connexion parent'}</h1>
        <p className="muted small">{teacher ? (signup ? 'Créez vos classes, donnez le code aux familles et suivez la progression de vos élèves.' : 'Retrouvez vos classes et vos élèves.') : signup ? 'Le compte parent permet de créer les profils enfants et de suivre leurs progrès.' : 'Retrouvez le suivi de vos enfants.'}</p>
        {signup && <div className="field"><label htmlFor="n">Votre prénom</label><input id="n" className="input" value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" /></div>}
        <div className="field"><label htmlFor="e">Adresse e-mail</label><input id="e" className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></div>
        <div className="field"><label htmlFor="p">Mot de passe</label><input id="p" className="input" type="password" value={pw} onChange={e => setPw(e.target.value)} autoComplete={signup ? 'new-password' : 'current-password'} />
          {signup && <span className="tiny muted">8 caractères minimum.</span>}</div>
        {signup && !teacher && <div className="field"><label htmlFor="c">Code parent (4 chiffres)</label><input id="c" className="input" inputMode="numeric" maxLength={4} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} />
          <span className="tiny muted">Il protège l’espace parent quand votre enfant utilise l’appareil.</span></div>}
        {err && <div className="err" role="alert">{err}</div>}
        {info && <div className="note" role="status">{info}</div>}
        <button className="btn lg block" type="submit" disabled={busy}>{signup ? 'Créer mon compte' : 'Se connecter'}</button>
        <div className="center tiny muted">ou</div>
        <button type="button" className="btn ghost block" onClick={async () => { const r = await loginGoogle(teacher ? 'teacher' : 'parent'); if (!r.ok) setErr(r.error) }}>
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12c-.2 1.9-1.5 4.7-4.4 6.6l6.8 5.2c4-3.7 6.6-9.2 6.6-15.3z"/><path fill="#34A853" d="M24 46c6 0 11-2 14.7-5.4l-7-5.4c-1.9 1.3-4.4 2.2-7.7 2.2-5.9 0-10.9-3.9-12.7-9.3l-7 5.4C7.9 41.2 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.3 28.1c-.5-1.4-.7-2.8-.7-4.1s.3-2.8.7-4.1l-7-5.4C2.8 17.4 2 20.6 2 24s.8 6.6 2.3 9.5l7-5.4z"/><path fill="#EA4335" d="M24 10.6c4.1 0 6.9 1.8 8.5 3.3l6.2-6C35 4.2 30 2 24 2 15.4 2 7.9 6.8 4.3 14.5l7 5.4c1.8-5.4 6.8-9.3 12.7-9.3z"/></svg>
          Continuer avec Google</button>
        <div className="center small">{signup ? <>Déjà inscrit ? <Link to={teacher ? '/enseignant/connexion' : '/connexion'}>Se connecter</Link></> : <>Pas encore de compte ? <Link to={teacher ? '/enseignant/inscription' : '/inscription'}>S’inscrire</Link></>}</div>
      </form>
      <div className="card flat center"><p className="small muted mb8">Envie de voir à quoi ça ressemble ?</p>
        {teacher
          ? <button className="btn ghost block" onClick={() => { loginDemoTeacher(); nav('/enseignant') }}>Explorer avec une classe de démonstration</button>
          : <button className="btn ghost block" onClick={async () => { await loginDemo(); nav('/parent') }}>Explorer avec une famille de démonstration</button>}</div>
      <p className="small center">{teacher ? <>Vous êtes parent ? <Link to="/connexion">Espace parent</Link></> : <>Vous êtes enseignant ? <Link to="/enseignant/connexion">Espace enseignant</Link></>}</p>
      <p className="tiny muted center">Les comptes et la progression sont enregistrés de façon sécurisée, uniquement accessibles au compte parent. La démonstration reste sur cet appareil.</p>
    </div></div>
  )
}
