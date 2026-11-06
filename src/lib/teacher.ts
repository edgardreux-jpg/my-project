import type { Child, LevelId } from '../types'
import * as cloud from './cloud'
import type { ClassRow, ClassStudent, TaskRow } from './cloud'
import { newChild, play } from './seed'
import { addDays, dayKey, diffDays } from './dates'
import { mastersTotals, periodTotals, weakSpots } from './progress'

/* ---------- Démonstration locale (aucune donnée réelle) ---------- */
const AV = ['princesse', 'prince', 'chevaliere', 'scientifique-garcon', 'footballeuse', 'judoka', 'danseur', 'chanteuse', 'astronaute', 'skater']
const NAMES = ['Inès', 'Lucas', 'Jade', 'Nathan', 'Lina', 'Hugo', 'Chloé', 'Adam', 'Zoé', 'Malo', 'Léa', 'Sacha']
let demo: { classes: ClassRow[]; students: Map<string, ClassStudent[]>; tasks: TaskRow[] } | null = null
function demoState() {
  if (demo) return demo
  const mk = (id: string, name: string, grade: LevelId, code: string, n: number, seed: number): [ClassRow, ClassStudent[]] => {
    const row: ClassRow = { id, name, grade, code, created_at: new Date().toISOString() }
    const st = Array.from({ length: n }, (_, i) => {
      const c = newChild(NAMES[(i + seed) % NAMES.length], grade, AV[i % AV.length], '0000')
      const lazy = i % 5 === 3
      if (!(i % 7 === 6)) play(c, i % 2 ? ['ma', 'fr'] : ['fr', 'ma', 'qlm'], lazy ? 12 : 28, 1, 0.45 + (i % 4) * 0.08, 0.7 + (i % 3) * 0.1, seed * 31 + i)
      if (lazy) { c.sessions = c.sessions.filter(s => s.day < addDays(dayKey(), -9)) }
      return { child_id: c.id, joined_at: row.created_at, data: { ...c, sessions: undefined }, sessions: c.sessions }
    })
    return [row, st]
  }
  const a = mk('demo-c1', 'CE1 A, école des Tilleuls', 'ce1', 'TIL3CE', 10, 1)
  const b = mk('demo-c2', 'Soutien CE2', 'ce2', 'SOU7K2', 5, 4)
  demo = { classes: [a[0], b[0]], students: new Map([[a[0].id, a[1]], [b[0].id, b[1]]]), tasks: [] }
  return demo
}

export const teacherApi = (isDemo: boolean) => isDemo ? {
  list: async () => [...demoState().classes],
  create: async (name: string, grade: string) => {
    const row: ClassRow = { id: 'demo-' + Date.now(), name, grade, code: Math.random().toString(36).slice(2, 8).toUpperCase(), created_at: new Date().toISOString() }
    demoState().classes.push(row); demoState().students.set(row.id, []); return { row }
  },
  rename: async (id: string, name: string) => { const c = demoState().classes.find(x => x.id === id); if (c) c.name = name },
  remove: async (id: string) => { const s = demoState(); s.classes = s.classes.filter(c => c.id !== id) },
  overview: async (id: string) => demoState().students.get(id) ?? [],
  removeMember: async (cid: string, kid: string) => { const s = demoState(); s.students.set(cid, (s.students.get(cid) ?? []).filter(x => x.child_id !== kid)) },
  tasks: async (cid: string) => demoState().tasks.filter(t => t.class_id === cid),
  addTask: async (cid: string, lessonId: string, message: string | null, target: string[] | null, due: string | null = null) => { demoState().tasks.unshift({ id: 'demo-t-' + Date.now(), class_id: cid, lesson_id: lessonId, message, target, created_at: new Date().toISOString(), due_date: due }); return null as string | null },
  delTask: async (id: string) => { const s = demoState(); s.tasks = s.tasks.filter(t => t.id !== id) },
} : {
  list: cloud.listClasses,
  create: cloud.createClass,
  rename: async (id: string, name: string) => { await cloud.renameClass(id, name) },
  remove: async (id: string) => { await cloud.deleteClass(id) },
  overview: cloud.classOverview,
  removeMember: async (cid: string, kid: string) => { await cloud.removeMember(cid, kid) },
  tasks: cloud.listTasks,
  addTask: cloud.addTask,
  delTask: cloud.deleteTask,
}

/* ---------- Statistiques d'un élève ---------- */
export interface StudentStat {
  id: string; child: Child; nickname: string; avatar: string; grade: string
  weekMs: number; weekLessons: number; acc: number | null; prevAcc: number | null
  acquired: number; started: number; last: string | null; idleDays: number | null
  weak: { title: string; subject: string }[]
}

export function studentStats(rows: ClassStudent[], today = dayKey()): StudentStat[] {
  return rows.map(r => {
    const c = { ...r.data, sessions: (r.sessions ?? []).slice().sort((a: any, b: any) => String(a.at).localeCompare(String(b.at))) } as Child
    c.lessons ??= {}
    const cur = periodTotals(c, addDays(today, -6), today), prev = periodTotals(c, addDays(today, -13), addDays(today, -7))
    const t = mastersTotals(c)
    const last = c.sessions.length ? c.sessions[c.sessions.length - 1].day : null
    return {
      id: r.child_id, child: c, nickname: c.nickname ?? 'Élève', avatar: c.avatar ?? 'princesse', grade: c.grade ?? '',
      weekMs: cur.ms, weekLessons: cur.lessons, acc: cur.acc, prevAcc: prev.acc,
      acquired: t.acquired, started: t.started, last, idleDays: last ? diffDays(today, last) : null,
      weak: weakSpots(c).slice(0, 2).map(w => ({ title: w.title, subject: w.subject })),
    }
  }).sort((a, b) => a.nickname.localeCompare(b.nickname, 'fr'))
}

/** Notions qui posent problème au plus grand nombre d'élèves. */
export function classWeakSpots(stats: StudentStat[]) {
  const m = new Map<string, { title: string; subject: string; lessonId: string; names: string[]; ids: string[] }>()
  for (const s of stats) for (const w of weakSpots(s.child)) {
    const k = w.themeId
    if (!m.has(k)) m.set(k, { title: w.title, subject: w.subject, lessonId: w.lessonId, names: [], ids: [] })
    m.get(k)!.names.push(s.nickname); m.get(k)!.ids.push(s.id)
  }
  return [...m.values()].sort((a, b) => b.names.length - a.names.length).slice(0, 5)
}
