import { createClient, type User } from '@supabase/supabase-js'
import type { Account, Child } from '../types'
import { SUPABASE_KEY, SUPABASE_URL } from './config'

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})

type Row<T> = { data: T }

export const childJson = (c: Child) => JSON.stringify({ ...c, sessions: [] })

/** Charge le compte parent, ses enfants et leurs séances depuis Supabase. */
export async function loadAccount(user: User): Promise<Account> {
  const meta = (user.user_metadata ?? {}) as Record<string, string>
  let { data: prof } = await sb.from('pp_profiles').select('*').eq('user_id', user.id).maybeSingle()
  if (!prof) {
    const name = meta.name || meta.full_name || (user.email ?? '').split('@')[0]
    const row = { user_id: user.id, name, code_salt: meta.code_salt ?? null, code_hash: meta.code_hash ?? null }
    const ins = await sb.from('pp_profiles').upsert(row).select().maybeSingle()
    prof = ins.data ?? row
  }
  const [kids, sess] = await Promise.all([
    sb.from('pp_children').select('id,data'),
    sb.from('pp_sessions').select('id,child_id,data'),
  ])
  const byChild = new Map<string, any[]>()
  for (const s of (sess.data ?? []) as any[]) {
    if (!byChild.has(s.child_id)) byChild.set(s.child_id, [])
    byChild.get(s.child_id)!.push(s.data)
  }
  const children = ((kids.data ?? []) as Row<Child>[] & { id: string }[]).map((k: any) => {
    const c = k.data as Child
    c.id = k.id
    c.sessions = (byChild.get(k.id) ?? []).sort((a, b) => a.at.localeCompare(b.at))
    return c
  }).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  return {
    id: user.id, email: user.email ?? '', name: prof.name || 'Parent', salt: '', hash: '',
    createdAt: user.created_at, children, cloud: true, codeSalt: prof.code_salt ?? undefined, codeHash: prof.code_hash ?? undefined,
  }
}

export async function pushChild(parentId: string, c: Child) {
  const { error } = await sb.from('pp_children').upsert({ id: c.id, parent_id: parentId, data: { ...c, sessions: [] }, updated_at: new Date().toISOString() })
  return error
}

export async function pushSessions(parentId: string, c: Child, ids: Set<string>) {
  const rows = c.sessions.filter(s => ids.has(s.id)).map(s => ({ id: s.id, child_id: c.id, parent_id: parentId, day: s.day, data: s }))
  if (!rows.length) return null
  const { error } = await sb.from('pp_sessions').upsert(rows, { onConflict: 'id' })
  return error
}

export async function dropChild(id: string) { await sb.from('pp_children').delete().eq('id', id) }

export async function saveCode(userId: string, salt: string, hash: string) {
  return sb.from('pp_profiles').update({ code_salt: salt, code_hash: hash }).eq('user_id', userId)
}

export async function wipeCloud(userId: string) {
  await sb.from('pp_children').delete().eq('parent_id', userId)
  await sb.from('pp_profiles').delete().eq('user_id', userId)
}
