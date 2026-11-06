import { useState } from 'react'
import { useStore } from '../state/store'
import { Modal } from './common'

/** Après un clic sur le lien « mot de passe oublié » reçu par e-mail : choix du nouveau mot de passe. */
export default function RecoveryModal() {
  const { recovery, setNewPassword } = useStore()
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  if (!recovery && !done) return null
  return (
    <Modal label="Nouveau mot de passe" onClose={() => setDone(false)}>
      {done ? (
        <div className="col gap12"><h2>Mot de passe modifié</h2><p className="muted">Vous êtes connecté. Utilisez ce nouveau mot de passe la prochaine fois.</p>
          <button className="btn block" onClick={() => setDone(false)}>Continuer</button></div>
      ) : (
        <form className="col gap12" onSubmit={async e => { e.preventDefault(); setBusy(true); const r = await setNewPassword(pw); setBusy(false); if (r.ok) { setDone(true); setPw('') } else setErr(r.error) }}>
          <h2>Choisissez un nouveau mot de passe</h2>
          <div className="field"><label htmlFor="npw">Nouveau mot de passe</label>
            <input id="npw" className="input" type="password" autoFocus autoComplete="new-password" value={pw} onChange={e => setPw(e.target.value)} />
            <span className="tiny muted">8 caractères minimum.</span></div>
          {err && <div className="err" role="alert">{err}</div>}
          <button className="btn block" disabled={busy}>Enregistrer</button>
        </form>
      )}
    </Modal>
  )
}
