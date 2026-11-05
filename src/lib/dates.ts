const pad = (n: number) => String(n).padStart(2, '0')

export function dayKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function parseDay(k: string): Date {
  const [y, m, d] = k.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0)
}

export function addDays(k: string, n: number): string {
  const d = parseDay(k)
  d.setDate(d.getDate() + n)
  return dayKey(d)
}

export function diffDays(a: string, b: string): number {
  return Math.round((parseDay(a).getTime() - parseDay(b).getTime()) / 86400000)
}

/** Lundi de la semaine contenant le jour donné. */
export function weekStart(k: string): string {
  const d = parseDay(k)
  const wd = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - wd)
  return dayKey(d)
}

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
const DAYS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
export const WEEKDAY_INITIALS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export function fmtShort(k: string): string {
  const d = parseDay(k)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function fmtDayLong(k: string): string {
  const d = parseDay(k)
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function relDay(k: string, today = dayKey()): string {
  const n = diffDays(today, k)
  if (n === 0) return "aujourd'hui"
  if (n === 1) return 'hier'
  if (n < 7) return `il y a ${n} jours`
  return fmtShort(k)
}

export function fmtMin(ms: number): string {
  const m = Math.round(ms / 60000)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${pad(r)}` : `${h} h`
}
