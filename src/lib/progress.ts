import type { Child, LessonProgress, Reward, SessionLog, Lesson } from '../types'
import { addDays, dayKey, diffDays, weekStart } from './dates'
import { LESSONS, lessonById, lessonsOf, pathFor, themeInfo } from './curriculum'

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
export const uuid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16) }))

/* ---------- niveaux d'XP ---------- */
export const LEVEL_STEPS = [
  { name: 'Graine', xp: 0 },
  { name: 'Pousse', xp: 80 },
  { name: 'Explorateur', xp: 200 },
  { name: 'Aventurier', xp: 400 },
  { name: 'Chercheur d’or', xp: 700 },
  { name: 'Maître EDUFUN', xp: 1100 },
]

export function levelOf(xp: number) {
  let i = 0
  LEVEL_STEPS.forEach((s, k) => { if (xp >= s.xp) i = k })
  const cur = LEVEL_STEPS[i]
  const next = LEVEL_STEPS[i + 1] ?? null
  const pct = next ? Math.min(100, ((xp - cur.xp) / (next.xp - cur.xp)) * 100) : 100
  return { index: i, name: cur.name, from: cur.xp, next: next?.xp ?? null, nextName: next?.name ?? null, pct }
}

/* ---------- avatars, cadres, coffres ---------- */
export const BASE_AVATARS = ['🐰', '🐱', '🐶', '🐦']
export const FRAMES = ['none', 'gold', 'mint', 'violet', 'sunset', 'rainbow']

export interface Chest { id: string; xp: number; title: string; kind: 'avatar' | 'frame'; value: string; label: string }
export const CHESTS: Chest[] = [
  { id: 'c1', xp: 60, title: 'Coffre de la forêt', kind: 'avatar', value: '🦊', label: 'Avatar écureuil' },
  { id: 'c2', xp: 150, title: 'Coffre doré', kind: 'frame', value: 'gold', label: 'Cadre doré' },
  { id: 'c3', xp: 300, title: 'Coffre des neiges', kind: 'avatar', value: '🐼', label: 'Avatar panda' },
  { id: 'c4', xp: 500, title: 'Coffre de la savane', kind: 'avatar', value: '🦁', label: 'Avatar tortue' },
  { id: 'c5', xp: 800, title: 'Coffre violet', kind: 'frame', value: 'violet', label: 'Cadre violet' },
  { id: 'c6', xp: 1200, title: 'Coffre magique', kind: 'avatar', value: '🦄', label: 'Avatar oiseau de papier' },
]

export const readyChests = (c: Child) => CHESTS.filter(x => c.xp >= x.xp && !c.chestsOpened.includes(x.id))

export function openChest(c: Child, id: string): Chest | null {
  const ch = CHESTS.find(x => x.id === id)
  if (!ch || c.xp < ch.xp || c.chestsOpened.includes(id)) return null
  c.chestsOpened.push(id)
  if (!c.unlocked.includes(ch.value)) c.unlocked.push(ch.value)
  return ch
}

/* ---------- badges ---------- */
export interface BadgeDef { id: string; title: string; desc: string; emoji: string; test: (c: Child) => boolean }
const doneIds = (c: Child) => Object.entries(c.lessons).filter(([, p]) => p.done > 0).map(([id]) => id)
const subjectsDone = (c: Child) => new Set(doneIds(c).map(id => lessonById.get(id)?.subject).filter(Boolean))
const countIn = (c: Child, sid: string) => doneIds(c).filter(id => lessonById.get(id)?.subject === sid).length
export const totalStars = (c: Child) => Object.values(c.lessons).reduce((n, p) => n + p.best, 0)

export const BADGES: BadgeDef[] = [
  { id: 'premier-pas', title: 'Premier pas', desc: 'Terminer une première leçon', emoji: '🌱', test: c => doneIds(c).length >= 1 },
  { id: 'sans-faute', title: 'Sans faute', desc: 'Réussir une leçon du premier coup', emoji: '🎯', test: c => c.sessions.some(s => s.kind === 'lesson' && s.total > 0 && s.firstOk === s.total) },
  { id: 'trois-matieres', title: 'Trois univers', desc: 'Découvrir trois matières', emoji: '🧭', test: c => subjectsDone(c).size >= 3 },
  { id: 'serie-3', title: 'Trois jours d’aventure', desc: 'Apprendre trois jours de suite', emoji: '🔥', test: c => c.streak.best >= 3 },
  { id: 'serie-7', title: 'Une semaine d’aventure', desc: 'Apprendre sept jours de suite', emoji: '☀️', test: c => c.streak.best >= 7 },
  { id: 'dix-lecons', title: 'Dix leçons', desc: 'Terminer dix leçons différentes', emoji: '🏅', test: c => doneIds(c).length >= 10 },
  { id: 'etoiles', title: 'Chasseur d’étoiles', desc: 'Gagner 30 étoiles', emoji: '⭐', test: c => totalStars(c) >= 30 },
  { id: 'revision', title: 'Je me souviens', desc: 'Réussir une leçon à nouveau après quelques jours', emoji: '🧠', test: c => Object.values(c.lessons).some(p => p.mastered) },
  { id: 'nombres', title: 'Ami des nombres', desc: 'Terminer cinq leçons de mathématiques', emoji: '🔢', test: c => countIn(c, 'ma') >= 5 },
  { id: 'lecteur', title: 'Grand lecteur', desc: 'Terminer cinq leçons de français', emoji: '📚', test: c => countIn(c, 'fr') >= 5 },
]

/* ---------- étoiles et maîtrise ---------- */
export const starsFor = (acc: number) => (acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1)

export type Mastery = 'none' | 'learning' | 'acquired' | 'mastered'
export const MASTERY_LABEL: Record<Mastery, string> = {
  none: 'À découvrir', learning: 'En cours', acquired: 'Acquis', mastered: 'Maîtrisé',
}

export function masteryOf(p?: LessonProgress): Mastery {
  if (!p || p.done === 0) return 'none'
  if (p.mastered) return 'mastered'
  if (p.best >= 2) return 'acquired'
  return 'learning'
}

/* ---------- série (avec gel de série) ---------- */
function touchStreak(c: Child, day: string) {
  const s = c.streak
  if (s.last === day) return { up: false, freezeUsed: false }
  let freezeUsed = false
  if (!s.last) s.current = 1
  else {
    const gap = diffDays(day, s.last)
    if (gap <= 1) s.current += 1
    else {
      const missing = gap - 1
      if (missing <= s.freezes) { s.freezes -= missing; s.current += 1; freezeUsed = true }
      else s.current = 1
    }
  }
  s.last = day
  s.learnDays += 1
  if (s.learnDays % 7 === 0) s.freezes = Math.min(2, s.freezes + 1)
  s.best = Math.max(s.best, s.current)
  return { up: true, freezeUsed }
}

/** Série affichée : elle retombe à 0 si la dernière activité est trop ancienne et sans gel disponible. */
export function liveStreak(c: Child, today = dayKey()): number {
  const s = c.streak
  if (!s.last) return 0
  const gap = diffDays(today, s.last)
  if (gap <= 1) return s.current
  return gap - 1 <= s.freezes ? s.current : 0
}

export const REWARDED_PER_DAY = 3

export interface SessionInput {
  lesson: Lesson | null
  kind: 'lesson' | 'diagnostic'
  ms: number
  total: number
  firstOk: number
  missed: string[]
  subject?: string
  theme?: string
}

/** Applique une séance terminée : étoiles, XP, série, maîtrise, badges, coffres. */
export function applySession(c: Child, inp: SessionInput, at: Date = new Date()): Reward {
  const day = dayKey(at)
  const acc = inp.total ? inp.firstOk / inp.total : 1
  const isLesson = inp.kind === 'lesson'
  const stars = isLesson ? starsFor(acc) : 0
  let xp = isLesson ? 10 + 5 * stars : 10
  const lessonId = inp.lesson?.id ?? 'diagnostic'
  const rewardedToday = c.sessions.filter(s => s.day === day && s.kind === 'lesson' && s.xp > 0)
  const capped = isLesson && (rewardedToday.length >= REWARDED_PER_DAY || rewardedToday.some(s => s.lessonId === lessonId))
  if (capped) xp = 0
  const oldXp = c.xp
  const oldLevel = levelOf(oldXp).index
  c.xp += xp

  const st = touchStreak(c, day)

  if (isLesson && inp.lesson) {
    const p: LessonProgress = c.lessons[lessonId] ?? { best: 0, done: 0, first: day, last: day, days: [], bestAcc: 0, lastAcc: 0, mastered: false }
    if (p.done >= 1 && diffDays(day, p.first) >= 3 && stars === 3) p.mastered = true
    p.done += 1
    p.best = Math.max(p.best, stars)
    p.bestAcc = Math.max(p.bestAcc, acc)
    p.lastAcc = acc
    p.last = day
    if (!p.days.includes(day)) p.days.push(day)
    c.lessons[lessonId] = p
    c.assignments.forEach(a => { if (a.lessonId === lessonId && !a.doneAt) a.doneAt = at.toISOString() })
  } else {
    c.diagnosticDone = true
  }

  const log: SessionLog = {
    id: uid(), lessonId, subject: inp.lesson?.subject ?? inp.subject ?? 'diag', theme: inp.lesson?.theme ?? inp.theme ?? 'diag',
    at: at.toISOString(), day, ms: inp.ms, total: inp.total, firstOk: inp.firstOk, stars, xp, missed: inp.missed, kind: inp.kind,
  }
  c.sessions.push(log)

  const newBadges: string[] = []
  for (const b of BADGES) if (!c.badges.includes(b.id) && b.test(c)) { c.badges.push(b.id); newBadges.push(b.id) }
  const newChests = CHESTS.filter(x => oldXp < x.xp && c.xp >= x.xp).map(x => x.id)

  return {
    xp, stars, newBadges, newChests, levelUp: levelOf(c.xp).index > oldLevel, capped,
    streakUp: st.up, streak: c.streak.current, freezeUsed: st.freezeUsed,
    accuracy: acc, firstOk: inp.firstOk, total: inp.total, ms: inp.ms,
  }
}

/* ---------- recommandations ---------- */
export function visibleSubjects(c: Child, all: string[]): string[] {
  return all.filter(s => !c.hiddenSubjects.includes(s))
}

export function nextLessonInSubject(c: Child, sid: string): Lesson | null {
  const items = pathFor(c.grade, sid).flatMap(g => g.items).filter(i => i.lesson)
  const first = items.find(i => !c.lessons[i.lesson!.id]?.done)
  return first?.lesson ?? null
}

export function dueForReview(c: Child, today = dayKey()): Lesson[] {
  return Object.entries(c.lessons)
    .filter(([id, p]) => p.done > 0 && !p.mastered && diffDays(today, p.last) >= 7 && lessonById.get(id)?.level === c.grade)
    .sort((a, b) => a[1].last.localeCompare(b[1].last))
    .map(([id]) => lessonById.get(id)!)
    .filter(Boolean)
}

export type Reco = { lesson: Lesson; reason: 'assigned' | 'continue' | 'start' | 'review' }

export function recommend(c: Child): Reco | null {
  const open = c.assignments.find(a => !a.doneAt && lessonById.get(a.lessonId))
  if (open) return { lesson: lessonById.get(open.lessonId)!, reason: 'assigned' }
  const last = [...c.sessions].reverse().find(s => s.kind === 'lesson')
  if (last) {
    const nxt = nextLessonInSubject(c, last.subject)
    if (nxt && !c.hiddenSubjects.includes(nxt.subject)) return { lesson: nxt, reason: 'continue' }
  }
  const subs = ['ma', 'fr', 'qlm', 'en', 'st', 'hi', 'ge', 'emc', 'ap', 'mu', 'eps', 'evar'].filter(s => !c.hiddenSubjects.includes(s))
  for (const sid of subs) {
    const l = nextLessonInSubject(c, sid)
    if (l) return { lesson: l, reason: 'start' }
  }
  const due = dueForReview(c)
  if (due[0]) return { lesson: due[0], reason: 'review' }
  return null
}

/* ---------- statistiques pour le tableau de bord parent ---------- */
export interface WeekStat { start: string; ms: number; lessons: number; acc: number | null; days: number }

export function weeksSeries(c: Child, n = 8, today = dayKey()): WeekStat[] {
  const cur = weekStart(today)
  const out: WeekStat[] = []
  for (let i = n - 1; i >= 0; i--) {
    const start = addDays(cur, -7 * i)
    const end = addDays(start, 6)
    const ss = c.sessions.filter(s => s.kind === 'lesson' && s.day >= start && s.day <= end)
    const total = ss.reduce((a, s) => a + s.total, 0)
    const ok = ss.reduce((a, s) => a + s.firstOk, 0)
    out.push({
      start, ms: ss.reduce((a, s) => a + s.ms, 0), lessons: ss.length,
      acc: total ? ok / total : null, days: new Set(ss.map(s => s.day)).size,
    })
  }
  return out
}

export function daysSeries(c: Child, n = 7, today = dayKey()) {
  return Array.from({ length: n }, (_, i) => {
    const day = addDays(today, -(n - 1 - i))
    const ss = c.sessions.filter(s => s.day === day && s.kind === 'lesson')
    return { day, ms: ss.reduce((a, s) => a + s.ms, 0), lessons: ss.length }
  })
}

export function periodTotals(c: Child, from: string, to: string) {
  const ss = c.sessions.filter(s => s.kind === 'lesson' && s.day >= from && s.day <= to)
  const total = ss.reduce((a, s) => a + s.total, 0)
  const ok = ss.reduce((a, s) => a + s.firstOk, 0)
  return {
    ms: ss.reduce((a, s) => a + s.ms, 0), lessons: ss.length,
    acc: total ? ok / total : null, days: new Set(ss.map(s => s.day)).size, answers: total,
  }
}

export interface SubjectStat {
  id: string; total: number; none: number; learning: number; acquired: number; mastered: number; planned: number
}

export function subjectBreakdown(c: Child, sids: string[]): SubjectStat[] {
  return sids.map(id => {
    const ls = lessonsOf(c.grade, id)
    const st: SubjectStat = { id, total: ls.length, none: 0, learning: 0, acquired: 0, mastered: 0, planned: 0 }
    for (const l of ls) st[masteryOf(c.lessons[l.id])] += 1
    return st
  })
}

export interface WeakSpot { themeId: string; title: string; subject: string; acc: number; sessions: number; lessonId: string }

/** Notions à renforcer : réussite au premier essai faible sur les dernières séances d'une thématique. */
export function weakSpots(c: Child): WeakSpot[] {
  const byTheme = new Map<string, SessionLog[]>()
  for (const s of c.sessions) {
    if (s.kind !== 'lesson' || s.total === 0) continue
    if (!byTheme.has(s.theme)) byTheme.set(s.theme, [])
    byTheme.get(s.theme)!.push(s)
  }
  const out: WeakSpot[] = []
  for (const [theme, ss] of byTheme) {
    const recent = ss.slice(-2)
    const acc = recent.reduce((a, s) => a + s.firstOk, 0) / recent.reduce((a, s) => a + s.total, 0)
    const lessonId = recent[recent.length - 1].lessonId
    const best = Math.max(...ss.map(s => s.stars))
    if (acc < 0.75 && best < 3) {
      const l = lessonById.get(lessonId)
      out.push({ themeId: theme, title: themeInfo(theme)?.title ?? l?.title ?? theme, subject: ss[0].subject, acc, sessions: ss.length, lessonId })
    }
  }
  return out.sort((a, b) => a.acc - b.acc).slice(0, 5)
}

export function topMissed(c: Child, limit = 5): { prompt: string; lesson: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const s of c.sessions) for (const id of s.missed) counts.set(id, (counts.get(id) ?? 0) + 1)
  const res: { prompt: string; lesson: string; count: number }[] = []
  for (const [id, count] of counts) {
    if (count < 2) continue
    const lid = id.includes('-e') ? id.slice(0, id.lastIndexOf('-e')) : ''
    const l = lessonById.get(lid) ?? LESSONS.find(x => x.ex.some(e => e.id === id))
    const ex = l?.ex.find(e => e.id === id)
    if (ex && l) res.push({ prompt: ex.prompt, lesson: l.title, count })
  }
  return res.sort((a, b) => b.count - a.count).slice(0, limit)
}

export function recentWins(c: Child, limit = 6): { lesson: Lesson; p: LessonProgress }[] {
  return Object.entries(c.lessons)
    .filter(([, p]) => p.best === 3 || p.mastered)
    .sort((a, b) => b[1].last.localeCompare(a[1].last))
    .map(([id, p]) => ({ lesson: lessonById.get(id)!, p }))
    .filter(x => x.lesson)
    .slice(0, limit)
}

export const todayCount = (c: Child, today = dayKey()) =>
  new Set(c.sessions.filter(s => s.day === today && s.kind === 'lesson').map(s => s.id)).size

export function mastersTotals(c: Child) {
  const all = Object.values(c.lessons)
  return {
    started: all.filter(p => p.done > 0).length,
    acquired: all.filter(p => p.best >= 2).length,
    mastered: all.filter(p => p.mastered).length,
  }
}
