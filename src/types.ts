export type LevelId = 'ce1' | 'ce2' | 'cm1' | 'cm2'

export interface Theme { id: string; title: string; order: number; starter: boolean }
export interface Domain { id: string; title: string; themes: Theme[] }
export interface Subject { id: string; title: string; sources: string[]; domains: Domain[] }
export interface Level { id: LevelId; title: string; cycle: number; subjects: Subject[] }

export interface Choice { id: string; label: string }

export type ExType =
  | 'qcm' | 'number_input' | 'matching' | 'ordering' | 'fill_blank'
  | 'visual_fraction' | 'dictation' | 'short_text' | 'drag_drop'

export interface Exercise {
  id: string
  type: ExType
  prompt: string
  expected: any
  hint: string
  explanation: string
  choices?: Choice[]
  items?: Choice[]
  targets?: Choice[]
  normalization?: string
  passage?: string
  audioText?: string
  audioLang?: string
  visual?: any
  template?: string
  blanks?: string[]
  parts?: number
  numerator?: number
}

export interface Lesson {
  id: string
  level: LevelId
  subject: string
  theme: string
  title: string
  intro: string
  idx: number
  ex: Exercise[]
  adult?: string
}

export interface LessonProgress {
  best: number          // meilleures étoiles (0 à 3)
  done: number          // nombre de fois terminée
  first: string         // jour de la première réussite (AAAA-MM-JJ)
  last: string          // dernier jour
  days: string[]
  bestAcc: number
  lastAcc: number
  mastered: boolean
  adultDone?: boolean
}

export interface SessionLog {
  id: string
  lessonId: string
  subject: string
  theme: string
  at: string            // ISO
  day: string           // AAAA-MM-JJ
  ms: number
  total: number
  firstOk: number
  stars: number
  xp: number
  missed: string[]
  kind: 'lesson' | 'diagnostic'
}

export interface Assignment { id: string; lessonId: string; at: string; doneAt?: string }

export interface Child {
  id: string
  nickname: string
  grade: LevelId
  avatar: string
  frame: string
  pin: string
  gender?: 'f' | 'm'   // facultatif : personnalise les phrases (« votre fille »)
  createdAt: string
  goal: 1 | 2 | 3
  breakMin: number          // 0 = pas de rappel
  sound: boolean
  autoNext?: boolean
  readAloud?: boolean
  voice?: string
  rate?: number        // passage automatique après une bonne réponse (par défaut oui)
  font: 'default' | 'dys'
  scale: number
  hiddenSubjects: string[]
  xp: number
  streak: { current: number; best: number; last: string | null; freezes: number; learnDays: number }
  lessons: Record<string, LessonProgress>
  sessions: SessionLog[]
  badges: string[]
  chestsOpened: string[]
  unlocked: string[]        // avatars et cadres débloqués
  diagnosticDone: boolean
  assignments: Assignment[]
  /** Ludothèque : réglage parent, compteurs du jour, meilleurs scores. */
  games?: GamesState
}

export interface GamesState {
  mode?: 'tickets' | 'free' | 'off'
  maxMin?: number        // 0 = pas de limite quotidienne
  day?: string           // jour des compteurs ci-dessous
  used?: number          // parties lancées ce jour
  ms?: number            // temps de jeu ce jour
  best?: Record<string, number>
  wins?: Record<string, number>
}

export interface Account {
  id: string
  email: string
  name: string
  salt: string
  hash: string
  createdAt: string
  children: Child[]
  /** Compte synchronisé avec Supabase (sinon local, par exemple la démonstration). */
  cloud?: boolean
  /** Parent (par défaut) ou enseignant. */
  role?: 'parent' | 'teacher'
  /** Code parent (4 chiffres), utilisé pour quitter un profil enfant. */
  codeSalt?: string
  codeHash?: string
}

export interface Session {
  accountId: string
  mode: 'locked' | 'parent' | 'child'
  childId?: string
}

export interface Db {
  version: 1
  accounts: Account[]
  session: Session | null
}

export interface Reward {
  xp: number
  stars: number
  newBadges: string[]
  newChests: string[]
  levelUp: boolean
  capped: boolean
  streakUp: boolean
  streak: number
  freezeUsed: boolean
  accuracy: number
  firstOk: number
  total: number
  ms: number
}
