import programmeRaw from '../data/programme.json'
import lessonsRaw from '../data/lessons.json'
import diagnosticsRaw from '../data/diagnostics.json'
import sourcesRaw from '../data/sources.json'
import type { Exercise, Lesson, Level, LevelId } from '../types'

export const PROGRAMME = programmeRaw as unknown as Level[]
export const LESSONS = lessonsRaw as unknown as Lesson[]
export const DIAGNOSTICS = diagnosticsRaw as unknown as Record<string, Exercise[]>
export const SOURCES = sourcesRaw as Record<string, { title: string; url: string }>

export const LEVELS: { id: LevelId; title: string; ages: string }[] = [
  { id: 'ce1', title: 'CE1', ages: '7 ans' },
  { id: 'ce2', title: 'CE2', ages: '8 ans' },
  { id: 'cm1', title: 'CM1', ages: '9 ans' },
  { id: 'cm2', title: 'CM2', ages: '10 ans' },
]

export interface SubjectMeta {
  name: string
  emoji: string
  color: string
  dark: string
  soft: string
  blurb: string
  group: 'core' | 'discover'
}

export const SUBJECT_META: Record<string, SubjectMeta> = {
  fr: { name: 'Français', emoji: '📚', color: '#D2582F', dark: '#9E3D1C', soft: '#FFEADF', blurb: 'Lire, comprendre, écrire', group: 'core' },
  ma: { name: 'Mathématiques', emoji: '🔢', color: '#17766E', dark: '#0D514C', soft: '#E3F4EE', blurb: 'Nombres, calculs, formes', group: 'core' },
  qlm: { name: 'Questionner le monde', emoji: '🌍', color: '#4A8F3A', dark: '#31682A', soft: '#E4F3DE', blurb: 'Vivant, lieux, temps', group: 'core' },
  st: { name: 'Sciences et technologie', emoji: '🔬', color: '#5B8A1F', dark: '#3F6114', soft: '#EAF3D6', blurb: 'Expérimenter et comprendre', group: 'core' },
  hi: { name: 'Histoire', emoji: '🏛️', color: '#9A6428', dark: '#6F4519', soft: '#F8EBDA', blurb: 'Les grandes périodes', group: 'core' },
  ge: { name: 'Géographie', emoji: '🧭', color: '#2B7C99', dark: '#1B5A70', soft: '#DEF0F6', blurb: 'Habiter et se repérer', group: 'core' },
  en: { name: 'Anglais', emoji: '🗣️', color: '#3A76CE', dark: '#264F91', soft: '#E3EDFB', blurb: 'Écouter et parler', group: 'core' },
  emc: { name: 'Vivre ensemble', emoji: '🤝', color: '#2C8FA6', dark: '#1D6577', soft: '#DFF2F6', blurb: 'Respect, règles, entraide', group: 'discover' },
  ap: { name: 'Arts plastiques', emoji: '🎨', color: '#B2428A', dark: '#82296A', soft: '#FBE5F3', blurb: 'Observer et créer', group: 'discover' },
  mu: { name: 'Musique', emoji: '🎵', color: '#5568D0', dark: '#3A4A9E', soft: '#E6E9FB', blurb: 'Écouter et chanter', group: 'discover' },
  eps: { name: 'Bouger et coopérer', emoji: '👟', color: '#2E9970', dark: '#1F7050', soft: '#DDF3EA', blurb: 'Le sport en sécurité', group: 'discover' },
  evar: { name: 'Grandir ensemble', emoji: '🌱', color: '#C77F1F', dark: '#955B10', soft: '#FDEFD9', blurb: 'Se connaître, respecter chacun', group: 'discover' },
}

export const meta = (sid: string): SubjectMeta =>
  SUBJECT_META[sid] ?? { name: sid, emoji: '⭐', color: '#17766E', dark: '#0D514C', soft: '#E3F4EE', blurb: '', group: 'discover' }

export const levelData = (lv: LevelId): Level => PROGRAMME.find(l => l.id === lv)!

export const lessonById = new Map(LESSONS.map(l => [l.id, l]))

const byLevelSubject = new Map<string, Lesson[]>()
for (const l of LESSONS) {
  const k = `${l.level}:${l.subject}`
  if (!byLevelSubject.has(k)) byLevelSubject.set(k, [])
  byLevelSubject.get(k)!.push(l)
}

export interface PathItem {
  key: string
  themeId: string
  themeTitle: string
  lesson: Lesson | null
}
export interface PathGroup { id: string; title: string; items: PathItem[] }

const themeIndex = new Map<string, { title: string; order: number; domain: string; domainId: string }>()
for (const lv of PROGRAMME) for (const s of lv.subjects) for (const d of s.domains) for (const t of d.themes)
  themeIndex.set(t.id, { title: t.title, order: t.order, domain: d.title, domainId: d.id })

export const themeInfo = (id: string) => themeIndex.get(id)

/** Parcours d'une matière pour un niveau : domaines, thématiques, leçons (ou « bientôt »). */
export function pathFor(level: LevelId, sid: string): PathGroup[] {
  const sub = levelData(level).subjects.find(s => s.id === sid)
  if (!sub) return []
  const lessons = byLevelSubject.get(`${level}:${sid}`) ?? []
  const groups: PathGroup[] = []
  const sample = lessons.filter(l => l.theme.endsWith('-decouverte'))
  if (sample.length) {
    groups.push({
      id: `${level}-${sid}-decouverte`, title: 'Découverte',
      items: sample.map(l => ({ key: l.id, themeId: l.theme, themeTitle: l.title, lesson: l })),
    })
  }
  for (const d of sub.domains) {
    const items: PathItem[] = []
    for (const t of d.themes) {
      const ls = lessons.filter(l => l.theme === t.id).sort((a, b) => a.idx - b.idx)
      if (ls.length) ls.forEach(l => items.push({ key: l.id, themeId: t.id, themeTitle: t.title, lesson: l }))
      else items.push({ key: t.id, themeId: t.id, themeTitle: t.title, lesson: null })
    }
    groups.push({ id: d.id, title: d.title, items })
  }
  return groups
}

export const lessonsOf = (level: LevelId, sid: string): Lesson[] => byLevelSubject.get(`${level}:${sid}`) ?? []

export const plannedCount = (level: LevelId, sid: string): number => {
  const sub = levelData(level).subjects.find(s => s.id === sid)
  if (!sub) return 0
  const have = new Set(lessonsOf(level, sid).map(l => l.theme))
  return sub.domains.flatMap(d => d.themes).filter(t => !have.has(t.id)).length
}

export const subjectsOf = (level: LevelId): string[] => levelData(level).subjects.map(s => s.id)

export const levelStats = (level: LevelId) => {
  const lv = levelData(level)
  const themes = lv.subjects.reduce((n, s) => n + s.domains.reduce((m, d) => m + d.themes.length, 0), 0)
  const lessons = LESSONS.filter(l => l.level === level)
  return {
    subjects: lv.subjects.length,
    themes,
    lessons: lessons.length,
    exercises: lessons.reduce((n, l) => n + l.ex.length, 0),
    ready: lessons.filter(l => !l.theme.endsWith('-decouverte')).length > 0,
  }
}

export const subjectSources = (level: LevelId, sid: string) => {
  const sub = levelData(level).subjects.find(s => s.id === sid)
  return (sub?.sources ?? []).map(id => SOURCES[id]).filter(Boolean)
}
