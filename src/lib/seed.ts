import type { Account, Child, LevelId, SessionLog } from '../types'
import { LESSONS } from './curriculum'
import { addDays, dayKey } from './dates'
import { applySession, uuid } from './progress'
import { hashSecret } from './auth'

export const DEMO_EMAIL = 'demo@pepite.fr'
export const DEMO_PASSWORD = 'demo1234'
export const DEMO_PIN = '1234'

export function newChild(nickname: string, grade: LevelId, avatar: string, pin: string): Child {
  return {
    id: uuid(), nickname, grade, avatar, frame: 'none', pin, createdAt: new Date().toISOString(),
    goal: 1, breakMin: 20, sound: true, font: 'default', scale: 1, hiddenSubjects: [],
    xp: 0, streak: { current: 0, best: 0, last: null, freezes: 1, learnDays: 0 },
    lessons: {}, sessions: [], badges: [], chestsOpened: [], unlocked: [], diagnosticDone: false, assignments: [],
  }
}

/** Générateur pseudo aléatoire déterministe pour une démo stable. */
function rng(seed: number) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
}

export function play(child: Child, subjects: string[], days: number, perDayBase: number, accStart: number, accEnd: number, seed: number) {
  const r = rng(seed)
  const today = dayKey()
  const queue = subjects.flatMap(sid => LESSONS.filter(l => l.level === child.grade && l.subject === sid))
  let qi = 0
  for (let d = days; d >= 1; d--) {
    if (d > 3 && r() < 0.25) continue
    const day = addDays(today, -d)
    const n = r() < 0.4 ? perDayBase + 1 : perDayBase
    for (let k = 0; k < n && qi < queue.length; k++) {
      const l = queue[qi++]
      const progress = 1 - d / days
      const acc = Math.max(0.3, Math.min(1, accStart + (accEnd - accStart) * progress + (r() - 0.5) * 0.25))
      const total = l.ex.length
      const firstOk = Math.round(acc * total)
      const missed = l.ex.slice(0, total - firstOk).map(e => e.id)
      const at = new Date(`${day}T${String(17 + k).padStart(2, '0')}:${String(Math.floor(r() * 50)).padStart(2, '0')}:00`)
      applySession(child, { lesson: l, kind: 'lesson', ms: (4 + r() * 5) * 60000, total, firstOk, missed }, at)
    }
  }
  // quelques révisions pour montrer la maîtrise
  const done = Object.keys(child.lessons).slice(0, 3)
  const keep = structuredClone(child.streak)
  done.forEach((id, i) => {
    const l = LESSONS.find(x => x.id === id)!
    const at = new Date(`${addDays(today, -2 - i)}T18:10:00`)
    applySession(child, { lesson: l, kind: 'lesson', ms: 240000, total: l.ex.length, firstOk: l.ex.length, missed: [] }, at)
  })
  child.streak = keep
  child.sessions.sort((a, b) => a.at.localeCompare(b.at))
}

export async function buildDemoAccount(): Promise<Account> {
  const salt = 'demo'
  const mila = newChild('Mila', 'ce1', 'princesse', DEMO_PIN)
  mila.goal = 2
  play(mila, ['ma', 'fr', 'qlm'], 34, 1, 0.58, 0.9, 7)
  const sami = newChild('Sami', 'ce2', '🐶', '4321')
  const ce2 = LESSONS.filter(l => l.level === 'ce2').slice(0, 3)
  ce2.forEach((l, i) => {
    const at = new Date(`${addDays(dayKey(), -9 + i * 3)}T17:30:00`)
    applySession(sami, { lesson: l, kind: 'lesson', ms: 300000, total: l.ex.length, firstOk: Math.round(l.ex.length * (0.6 + i * 0.15)), missed: [] }, at)
  })
  const logs: SessionLog[] = mila.sessions
  void logs
  return {
    id: 'demo', email: DEMO_EMAIL, name: 'Parent démo', salt,
    hash: await hashSecret(DEMO_PASSWORD, salt), createdAt: new Date().toISOString(), children: [mila, sami],
  }
}
