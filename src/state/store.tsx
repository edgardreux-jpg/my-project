import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Account, Child, Db, LevelId } from '../types'
import { emptyDb, loadDb, saveDb } from '../lib/storage'
import { hashSecret, newSalt, validEmail, validPassword, validPin } from '../lib/auth'
import { buildDemoAccount, DEMO_EMAIL, newChild } from '../lib/seed'
import { childJson, dropChild, loadAccount, pushChild, pushSessions, saveCode, sb, wipeCloud } from '../lib/cloud'

type Result = { ok: true; pending?: boolean } | { ok: false; error: string }

interface Store {
  db: Db
  account: Account | null
  mode: 'locked' | 'parent' | 'child' | 'out'
  child: Child | null
  loading: boolean
  syncing: boolean
  signup(name: string, email: string, password: string, code: string, role?: 'parent' | 'teacher'): Promise<Result>
  login(email: string, password: string): Promise<Result>
  loginGoogle(role?: 'parent' | 'teacher'): Promise<Result>
  loginDemo(): Promise<void>
  loginDemoTeacher(): void
  logout(): void
  /** Mot de passe oublié : envoi du lien, puis choix d'un nouveau mot de passe. */
  recovery: boolean
  sendReset(email: string): Promise<Result>
  setNewPassword(password: string): Promise<Result>
  enterChild(id: string, pin?: string): Promise<Result>
  /** Retour enfant vers parent : code parent (ou mot de passe pour un compte local). */
  leaveChild(secret: string): Promise<Result>
  lock(): void
  switchProfile(): void
  setParentCode(code: string): Promise<Result>
  addChild(nickname: string, grade: LevelId, avatar: string, pin: string): Result & { id?: string }
  mutateChild(id: string, fn: (c: Child) => void): void
  removeChild(id: string): void
  deleteAccount(): void
  checkSecret(secret: string): Promise<boolean>
}

const Ctx = createContext<Store | null>(null)
const NOT_CONFIGURED = 'Connexion impossible pour le moment. Vérifiez votre réseau et réessayez.'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<Db>(() => loadDb())
  const [loading, setLoading] = useState(true)
  const [recovery, setRecovery] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const ref = useRef(db)
  ref.current = db
  const lastPushed = useRef(new Map<string, string>())
  const syncedSessions = useRef(new Set<string>())
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const wantParent = useRef(false)

  const commit = useCallback((next: Db) => { ref.current = next; setDb(next); saveDb(next) }, [])
  const edit = useCallback((fn: (d: Db) => void) => {
    const next: Db = structuredClone(ref.current)
    fn(next)
    commit(next)
  }, [commit])

  /** Insère ou remplace le compte cloud chargé et enregistre l'état « déjà synchronisé ». */
  const adopt = useCallback((acc: Account) => {
    lastPushed.current = new Map(acc.children.map(c => [c.id, childJson(c)]))
    syncedSessions.current = new Set(acc.children.flatMap(c => c.sessions.map(s => s.id)))
    edit(d => {
      d.accounts = d.accounts.filter(a => a.id !== acc.id)
      d.accounts.push(acc)
      if (!d.session || d.session.accountId !== acc.id || wantParent.current) d.session = { accountId: acc.id, mode: 'parent' }
    })
    wantParent.current = false
  }, [edit])

  useEffect(() => {
    let alive = true
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') { setLoading(false); return }
      if (event === 'PASSWORD_RECOVERY') setRecovery(true)
      if (session?.user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED')) {
        setTimeout(async () => {
          try { const acc = await loadAccount(session.user); if (alive) adopt(acc) } catch { /* hors ligne */ }
          if (alive) setLoading(false)
        }, 0)
      } else if (event === 'INITIAL_SESSION') setLoading(false)
    })
    const safety = setTimeout(() => alive && setLoading(false), 4000)
    return () => { alive = false; sub.subscription.unsubscribe(); clearTimeout(safety) }
  }, [adopt])

  const account = db.session ? db.accounts.find(a => a.id === db.session!.accountId) ?? null : null
  const mode: Store['mode'] = account && db.session ? db.session.mode : 'out'
  const child = account && db.session?.childId ? account.children.find(c => c.id === db.session!.childId) ?? null : null

  /* synchronisation vers Supabase (légèrement différée) */
  useEffect(() => {
    if (!account?.cloud) return
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      setSyncing(true)
      try {
        for (const c of account.children) {
          const j = childJson(c)
          if (lastPushed.current.get(c.id) !== j) {
            if (!(await pushChild(account.id, c))) lastPushed.current.set(c.id, j)
          }
          const fresh = new Set(c.sessions.filter(s => !syncedSessions.current.has(s.id)).map(s => s.id))
          if (fresh.size && !(await pushSessions(account.id, c, fresh))) fresh.forEach(id => syncedSessions.current.add(id))
        }
        const ids = new Set(account.children.map(c => c.id))
        for (const id of [...lastPushed.current.keys()]) if (!ids.has(id)) { lastPushed.current.delete(id); await dropChild(id) }
      } finally { setSyncing(false) }
    }, 700)
    return () => clearTimeout(timer.current)
  }, [db, account])

  const secretOk = useCallback(async (acc: Account, secret: string) => {
    if (acc.codeHash && acc.codeSalt) return (await hashSecret(secret, acc.codeSalt)) === acc.codeHash
    return (await hashSecret(secret, acc.salt)) === acc.hash
  }, [])

  const api = useMemo<Store>(() => ({
    db, account, mode, child, loading, syncing, recovery,

    async sendReset(email) {
      if (!validEmail(email)) return { ok: false, error: 'Indiquez d’abord votre adresse e-mail ci-dessus.' }
      const { error } = await sb.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: window.location.href.split('#')[0] })
      if (error) return { ok: false, error: /not authorized/i.test(error.message) ? 'L’envoi d’e-mails n’est pas encore activé sur EDUFUN. Réessayez plus tard.' : /rate|seconds/i.test(error.message) ? 'Trop de demandes. Patientez quelques minutes avant de réessayer.' : 'Envoi impossible pour le moment. Réessayez.' }
      return { ok: true }
    },

    async setNewPassword(password) {
      if (!validPassword(password)) return { ok: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' }
      const { error } = await sb.auth.updateUser({ password })
      if (error) return { ok: false, error: /different|same/i.test(error.message) ? 'Choisissez un mot de passe différent de l’ancien.' : 'Modification impossible. Redemandez un lien.' }
      setRecovery(false)
      return { ok: true }
    },

    async signup(name, email, password, code, role = 'parent') {
      email = email.trim().toLowerCase()
      if (!name.trim()) return { ok: false, error: 'Indiquez votre prénom.' }
      if (!validEmail(email)) return { ok: false, error: 'Adresse e-mail invalide.' }
      if (!validPassword(password)) return { ok: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' }
      if (role === 'parent' && !validPin(code)) return { ok: false, error: 'Le code parent doit contenir 4 chiffres.' }
      const salt = newSalt()
      const hash = role === 'parent' ? await hashSecret(code, salt) : null
      wantParent.current = true
      const { data, error } = await sb.auth.signUp({
        email, password,
        options: { data: role === 'parent' ? { name: name.trim(), code_salt: salt, code_hash: hash } : { name: name.trim(), role: 'teacher' }, emailRedirectTo: window.location.href.split('#')[0] },
      })
      if (error) { wantParent.current = false; return { ok: false, error: /fetch|network/i.test(error.message) ? NOT_CONFIGURED : /registered|exists/i.test(error.message) ? 'Un compte existe déjà avec cet e-mail.' : /not authorized/i.test(error.message) ? 'L’envoi d’e-mails n’est pas encore activé sur EDUFUN. Essayez « Continuer avec Google ».' : /rate|seconds/i.test(error.message) ? 'Trop de tentatives. Patientez quelques minutes.' : /password/i.test(error.message) ? 'Mot de passe trop faible : 8 caractères minimum.' : 'Inscription impossible pour le moment. Réessayez.' } }
      if (!data.session) { wantParent.current = false; return { ok: true, pending: true } }
      return { ok: true }
    },

    async login(email, password) {
      wantParent.current = true
      const { error } = await sb.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
      if (error) { wantParent.current = false; return { ok: false, error: /fetch|network/i.test(error.message) ? NOT_CONFIGURED : /confirm/i.test(error.message) ? 'Confirmez d’abord votre e-mail grâce au lien reçu.' : 'E-mail ou mot de passe incorrect.' } }
      return { ok: true }
    },

    async loginGoogle(role = 'parent') {
      try { if (role === 'teacher') localStorage.setItem('edufun.role', 'teacher'); else localStorage.removeItem('edufun.role') } catch { /* ignore */ }
      const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href.split('#')[0] } })
      return error ? { ok: false, error: /provider is not enabled|unsupported/i.test(error.message) ? 'La connexion Google n’est pas encore activée sur ce projet.' : NOT_CONFIGURED } : { ok: true }
    },

    async loginDemo() {
      let acc = ref.current.accounts.find(a => a.email === DEMO_EMAIL)
      if (!acc) { acc = await buildDemoAccount(); const a = acc; edit(d => { d.accounts.push(a) }) }
      const id = acc.id
      edit(d => { d.session = { accountId: id, mode: 'parent' } })
    },

    loginDemoTeacher() {
      const id = 'demo-teacher'
      edit(d => {
        if (!d.accounts.some(a => a.id === id)) d.accounts.push({ id, email: 'enseignant@demo.edufun', name: 'Mme Martin', salt: '', hash: '', createdAt: new Date().toISOString(), children: [], role: 'teacher' })
        d.session = { accountId: id, mode: 'parent' }
      })
    },

    logout() {
      const cloud = ref.current.accounts.find(a => a.id === ref.current.session?.accountId)?.cloud
      edit(d => { d.session = null; d.accounts = d.accounts.filter(a => !a.cloud) })
      if (cloud) sb.auth.signOut()
    },

    async enterChild(id, pin) {
      const acc = ref.current.session && ref.current.accounts.find(a => a.id === ref.current.session!.accountId)
      const ch = acc?.children.find(c => c.id === id)
      if (!acc || !ch) return { ok: false, error: 'Profil introuvable.' }
      const direct = ref.current.session!.mode === 'parent'
      if (!direct && ch.pin && ch.pin !== pin) return { ok: false, error: 'Code incorrect.' }
      edit(d => { d.session = { accountId: acc.id, mode: 'child', childId: id } })
      return { ok: true }
    },

    async leaveChild(secret) {
      const acc = ref.current.session && ref.current.accounts.find(a => a.id === ref.current.session!.accountId)
      if (!acc || !(await secretOk(acc, secret))) return { ok: false, error: acc?.codeHash ? 'Code parent incorrect.' : 'Mot de passe incorrect.' }
      edit(d => { d.session = { accountId: acc.id, mode: 'parent' } })
      return { ok: true }
    },

    lock() { edit(d => { if (d.session) d.session = { accountId: d.session.accountId, mode: 'locked' } }) },
    switchProfile() { edit(d => { if (d.session) d.session = { accountId: d.session.accountId, mode: 'locked' } }) },

    async setParentCode(code) {
      if (!validPin(code)) return { ok: false, error: 'Le code doit contenir 4 chiffres.' }
      const acc = ref.current.accounts.find(a => a.id === ref.current.session?.accountId)
      if (!acc) return { ok: false, error: 'Session expirée.' }
      const salt = newSalt(), hash = await hashSecret(code, salt)
      if (acc.cloud) { const r = await saveCode(acc.id, salt, hash); if (r.error) return { ok: false, error: NOT_CONFIGURED } }
      edit(d => { const a = d.accounts.find(x => x.id === acc.id); if (a) { a.codeSalt = salt; a.codeHash = hash } })
      return { ok: true }
    },

    addChild(nickname, grade, avatar, pin) {
      if (!nickname.trim()) return { ok: false, error: 'Indiquez un prénom ou un pseudo.' }
      if (pin && !validPin(pin)) return { ok: false, error: 'Le code doit contenir 4 chiffres.' }
      const c = newChild(nickname.trim(), grade, avatar, pin)
      edit(d => { d.accounts.find(a => a.id === d.session?.accountId)?.children.push(c) })
      return { ok: true, id: c.id }
    },

    mutateChild(id, fn) {
      edit(d => { const c = d.accounts.find(a => a.id === d.session?.accountId)?.children.find(x => x.id === id); if (c) fn(c) })
    },

    removeChild(id) {
      edit(d => { const a = d.accounts.find(x => x.id === d.session?.accountId); if (a) a.children = a.children.filter(c => c.id !== id) })
    },

    deleteAccount() {
      const acc = ref.current.accounts.find(a => a.id === ref.current.session?.accountId)
      if (acc?.cloud) { wipeCloud(acc.id).finally(() => sb.auth.signOut()) }
      commit({ ...emptyDb(), accounts: ref.current.accounts.filter(a => a.id !== acc?.id && !a.cloud) })
    },

    async checkSecret(secret) {
      const acc = ref.current.session && ref.current.accounts.find(a => a.id === ref.current.session!.accountId)
      return !!acc && secretOk(acc, secret)
    },
  }), [db, account, mode, child, loading, syncing, recovery, edit, commit, secretOk])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const s = useContext(Ctx)
  if (!s) throw new Error('StoreProvider manquant')
  return s
}
