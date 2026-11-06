import { useEffect, useState } from 'react'
import type { Child } from '../types'
import { myTasks } from './cloud'
import { lessonById } from './curriculum'
import { weakSpots } from './progress'
import { nextWeekday } from './dates'
import { useStore } from '../state/store'

/** Une révision proposée par l'enseignant à un enfant. */
export interface TeacherTask { id: string; childId: string; className: string; teacher: string; lessonId: string; message: string | null; at: string; due: string | null }

/** Faite si l'enfant a terminé la leçon après la date d'envoi. */
export const taskDone = (c: Child, t: TeacherTask) => c.sessions.some(s => s.lessonId === t.lessonId && s.at >= t.at)

/** Démonstration : Mme Martin propose à Mila de revoir sa notion la plus fragile. */
function demoTasks(kids: Child[]): TeacherTask[] {
  const mila = kids.find(k => k.nickname === 'Mila')
  const w = mila && weakSpots(mila)[0]
  if (!mila || !w) return []
  const at = new Date(Date.now() - 26 * 3600e3).toISOString()
  return [{ id: 'demo-task-1', childId: mila.id, className: 'CE1 A, école des Tilleuls', teacher: 'Mme Martin', lessonId: w.lessonId, message: 'On en reparle en classe lundi. Courage !', at, due: nextWeekday(0) }]
}

let cache: { key: string; list: TeacherTask[] } | null = null

/** Révisions reçues pour les enfants du compte (rafraîchies à l'ouverture). */
export function useTeacherTasks(): TeacherTask[] {
  const { account } = useStore()
  const key = account ? `${account.id}:${account.cloud ? 1 : 0}` : ''
  const [list, setList] = useState<TeacherTask[]>(cache?.key === key ? cache.list : [])
  useEffect(() => {
    if (!account) return
    if (!account.cloud) { const l = demoTasks(account.children); cache = { key, list: l }; setList(l); return }
    let off = false
    myTasks().then(rows => {
      const l = rows.filter(r => lessonById.get(r.lesson_id)).map(r => ({ id: r.task_id, childId: r.child_id, className: r.class_name, teacher: r.teacher_name || 'Votre enseignant', lessonId: r.lesson_id, message: r.message, at: r.created_at, due: r.due_date }))
      cache = { key, list: l }; if (!off) setList(l)
    }).catch(() => {})
    return () => { off = true }
  }, [key])
  return list
}
