import type { Exercise } from '../types'

/** Normalise un nombre saisi : espaces ignorés, virgule ou point acceptés. */
export function normNumber(s: string): string {
  return String(s ?? '').replace(/\s+/g, '').replace(',', '.').replace(/\.0+$/, '').replace(/^0+(?=\d)/, '')
}

/** Normalise un texte : majuscules, ponctuation finale et espaces superflus ne font pas échouer. */
export function normText(s: string): string {
  return String(s ?? '')
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?…]+$/g, '')
    .trim()
    .toLowerCase()
}

const sameNumber = (a: string, b: string) => {
  const x = normNumber(a), y = normNumber(b)
  if (x === y) return true
  const nx = Number(x), ny = Number(y)
  return x !== '' && y !== '' && !Number.isNaN(nx) && !Number.isNaN(ny) && nx === ny
}

export type Answer = any

export function isCorrect(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case 'qcm':
      return a === ex.expected
    case 'number_input':
      return sameNumber(String(a ?? ''), String(ex.expected))
    case 'short_text':
    case 'dictation':
      return normText(String(a ?? '')) === normText(String(ex.expected))
    case 'ordering':
      return Array.isArray(a) && a.length === ex.expected.length && a.every((v: string, i: number) => v === ex.expected[i])
    case 'matching':
    case 'drag_drop': {
      if (!a) return false
      return Object.keys(ex.expected).every(k => a[k] === ex.expected[k])
    }
    case 'fill_blank': {
      if (!a) return false
      return Object.keys(ex.expected).every(k =>
        ex.normalization === 'decimal' ? sameNumber(String(a[k] ?? ''), String(ex.expected[k]))
          : normText(String(a[k] ?? '')) === normText(String(ex.expected[k])))
    }
    case 'visual_fraction': {
      if (!Array.isArray(a)) return false
      const e = [...ex.expected].sort((x: number, y: number) => x - y)
      const g = [...a].sort((x: number, y: number) => x - y)
      return e.length === g.length && e.every((v: number, i: number) => v === g[i])
    }
    default:
      return false
  }
}

/** Texte lisible de la bonne réponse, utilisé dans l'explication. */
export function expectedLabel(ex: Exercise): string {
  switch (ex.type) {
    case 'qcm': return ex.choices?.find(c => c.id === ex.expected)?.label ?? ''
    case 'ordering': return ex.expected.map((id: string) => ex.items?.find(i => i.id === id)?.label).join(' , ')
    default: return ''
  }
}

export function canCheck(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case 'qcm': return a != null
    case 'number_input':
    case 'short_text':
    case 'dictation': return String(a ?? '').trim().length > 0
    case 'ordering': return Array.isArray(a) && a.length === (ex.items?.length ?? 0)
    case 'matching':
    case 'drag_drop': return !!a && Object.keys(a).length === (ex.items?.length ?? 0)
    case 'fill_blank': return !!a && (ex.blanks ?? []).every(b => String(a[b] ?? '').trim().length > 0)
    case 'visual_fraction': return Array.isArray(a) && a.length === (ex.numerator ?? -1)
    default: return false
  }
}
