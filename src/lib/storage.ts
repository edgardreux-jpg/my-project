import type { Db } from '../types'

const KEY = 'pepite.db.v1'
let memory: string | null = null
let persistent = true

export const isPersistent = () => persistent

export const emptyDb = (): Db => ({ version: 1, accounts: [], session: null })

export function loadDb(): Db {
  let raw: string | null = null
  try { raw = localStorage.getItem(KEY) } catch { persistent = false; raw = memory }
  if (!raw) return emptyDb()
  try {
    const d = JSON.parse(raw) as Db
    if (d && d.version === 1 && Array.isArray(d.accounts)) return d
  } catch { /* données illisibles */ }
  return emptyDb()
}

export function saveDb(db: Db) {
  // Les comptes synchronisés vivent dans Supabase : on ne les copie pas dans le navigateur.
  const raw = JSON.stringify({ ...db, accounts: db.accounts.filter(a => !a.cloud) })
  memory = raw
  try { localStorage.setItem(KEY, raw); persistent = true } catch { persistent = false }
}

export function wipeDb() {
  memory = null
  try { localStorage.removeItem(KEY) } catch { /* ignoré */ }
}
