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
    let intent: string | null = null
    try { intent = localStorage.getItem('edufun.role'); localStorage.removeItem('edufun.role') } catch { /* ignore */ }
    const role = meta.role === 'teacher' || intent === 'teacher' ? 'teacher' : 'parent'
    const row = { user_id: user.id, name, role, code_salt: meta.code_salt ?? null, code_hash: meta.code_hash ?? null }
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
    createdAt: user.created_at, children, cloud: true, role: prof.role === 'teacher' ? 'teacher' : 'parent', codeSalt: prof.code_salt ?? undefined, codeHash: prof.code_hash ?? undefined,
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

/* ---------- Espace enseignant ---------- */
export interface ClassRow { id: string; name: string; grade: string; code: string; created_at: string }
export interface Membership { child_id: string; class_id: string; class_name: string; teacher_name: string; joined_at: string }
export interface ClassStudent { child_id: string; joined_at: string; data: any; sessions: any[] }

const errMsg = (e: { message: string } | null) => !e ? null
  : /bad_code/.test(e.message) ? 'Ce code de classe n’existe pas. Vérifiez-le avec l’enseignant.'
  : /not_your/.test(e.message) ? 'Action non autorisée.'
  : 'Connexion impossible pour le moment. Réessayez.'

export async function listClasses(): Promise<ClassRow[]> {
  const { data } = await sb.from('pp_classes').select('*').order('created_at')
  return (data ?? []) as ClassRow[]
}
export async function createClass(name: string, grade: string): Promise<{ row?: ClassRow; error?: string }> {
  const { data, error } = await sb.rpc('pp_new_class', { p_name: name, p_grade: grade })
  return error ? { error: errMsg(error)! } : { row: data as ClassRow }
}
export async function renameClass(id: string, name: string) { return sb.from('pp_classes').update({ name }).eq('id', id) }
export async function deleteClass(id: string) { return sb.from('pp_classes').delete().eq('id', id) }
export async function classOverview(id: string): Promise<ClassStudent[]> {
  const { data, error } = await sb.rpc('pp_class_overview', { p_class: id })
  if (error) throw new Error(errMsg(error)!)
  return (data ?? []) as ClassStudent[]
}
export async function removeMember(classId: string, childId: string) {
  return sb.from('pp_class_members').delete().eq('class_id', classId).eq('child_id', childId)
}
export async function joinClass(code: string, childId: string): Promise<{ name?: string; teacher?: string; error?: string }> {
  const { data, error } = await sb.rpc('pp_join_class', { p_code: code, p_child: childId })
  if (error) return { error: errMsg(error)! }
  const r = (data as any[])[0]
  return { name: r?.class_name, teacher: r?.teacher_name }
}
export async function myMemberships(): Promise<Membership[]> {
  const { data } = await sb.rpc('pp_my_memberships')
  return (data ?? []) as Membership[]
}

/* ---------- Révisions proposées par l'enseignant ---------- */
export interface TaskRow { id: string; class_id: string; lesson_id: string; message: string | null; target: string[] | null; created_at: string; due_date?: string | null }
export interface MyTask { task_id: string; child_id: string; class_name: string; teacher_name: string; lesson_id: string; message: string | null; created_at: string; due_date: string | null }
export async function listTasks(classId: string): Promise<TaskRow[]> {
  const { data } = await sb.from('pp_class_tasks').select('*').eq('class_id', classId).order('created_at', { ascending: false })
  return (data ?? []) as TaskRow[]
}
export async function addTask(classId: string, lessonId: string, message: string | null, target: string[] | null, due: string | null = null): Promise<string | null> {
  const { error } = await sb.from('pp_class_tasks').insert({ class_id: classId, lesson_id: lessonId, message, target, due_date: due })
  return error ? 'La révision n’a pas pu être envoyée. Réessayez.' : null
}
export async function deleteTask(id: string) { await sb.from('pp_class_tasks').delete().eq('id', id) }
export async function myTasks(): Promise<MyTask[]> {
  const { data } = await sb.rpc('pp_my_tasks')
  return (data ?? []) as MyTask[]
}
