import { sb } from './cloud'

// Affichage uniquement : la vraie protection est côté base (fonction pp_admin_stats).
export const ADMIN_EMAIL = 'edgard.reux@gmail.com'
export const isAdmin = (a: { email?: string; cloud?: boolean } | null | undefined) =>
  !!a && !!a.cloud && (a.email ?? '').trim().toLowerCase() === ADMIN_EMAIL

export interface AdminStats {
  accounts: number; accounts7: number; accounts30: number; confirmed: number; login7: number
  parents: number; teachers: number; children: number; byGrade: Record<string, number>
  classes: number; classMembers: number; tasks: number
  sessions: number; sessions7: number; sessions30: number; active7: number; active30: number
  totalMs: number; success: number | null; bySubject: Record<string, number>
  mailWeekly: number; mailTasks: number; mailsSent: number
  signupsWeekly: { w: string; n: number }[]
  sessionsDaily: { d: string; n: number }[]
  recent: { at: string; role: string; kids: number; domain: string }[]
}

export async function loadAdminStats(): Promise<{ data?: AdminStats; error?: string }> {
  const { data, error } = await sb.rpc('pp_admin_stats')
  if (error) return { error: error.code === '42501' ? 'Accès refusé.' : 'Impossible de charger les statistiques.' }
  return { data: data as AdminStats }
}
