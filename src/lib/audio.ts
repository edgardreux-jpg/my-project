let ctx: AudioContext | null = null

function ac(): AudioContext | null {
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    if (!ctx) ctx = new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(freq: number, start: number, dur: number, vol = 0.05, type: OscillatorType = 'sine') {
  const c = ac()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  const t = c.currentTime + start
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0005, t + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start(t)
  o.stop(t + dur + 0.03)
}

export type Sfx = 'tap' | 'good' | 'oops' | 'done' | 'chest' | 'star'

export function sfx(kind: Sfx, enabled: boolean) {
  if (!enabled) return
  switch (kind) {
    case 'tap': tone(660, 0, 0.06, 0.03); break
    case 'good': tone(523, 0, 0.14); tone(784, 0.1, 0.22); break
    case 'oops': tone(330, 0, 0.18, 0.04, 'triangle'); tone(277, 0.12, 0.22, 0.035, 'triangle'); break
    case 'done': [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 0.05)); break
    case 'chest': [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.28, 0.05)); break
    case 'star': tone(880, 0, 0.12, 0.045); tone(1320, 0.07, 0.2, 0.035); break
  }
  buzz(kind)
}

/** Petite vibration sur téléphone (ignorée si l'appareil ne sait pas vibrer). */
export function buzz(kind: Sfx) {
  try {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return
    const p: Record<string, number | number[]> = { good: 25, oops: [35, 60, 35], star: 15, done: [20, 40, 20, 40, 60], chest: [30, 50, 80] }
    if (p[kind]) navigator.vibrate(p[kind])
  } catch { /* ignoré */ }
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

const VKEY = 'pepite.voice'
const RKEY = 'pepite.rate'
const lsGet = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const lsSet = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* ignoré */ } }

/** Note de naturel d'une voix : les voix neuronales (Edge « Online », Apple « Premium », Google) sonnent moins robotiques. */
export function voiceScore(v: SpeechSynthesisVoice): number {
  const n = v.name.toLowerCase()
  let s = 0
  if (/natural|neural|online/.test(n)) s += 100
  if (/premium|enhanced|améliorée/.test(n)) s += 80
  if (/google/.test(n)) s += 60
  if (/amélie|amelie|thomas|audrey|denise|henri|eloise|vivienne|remy|paul/.test(n)) s += 30
  if (/compact|espeak|robot/.test(n)) s -= 100
  if (v.localService === false) s += 5
  return s
}

export function listVoices(lang = 'fr'): SpeechSynthesisVoice[] {
  if (!canSpeak()) return []
  return window.speechSynthesis.getVoices()
    .filter(v => v.lang.toLowerCase().startsWith(lang))
    .sort((a, b) => voiceScore(b) - voiceScore(a))
}

let prefVoice = lsGet(VKEY) || ''
let prefRate = Number(lsGet(RKEY) || 0.95)

/** Applique les réglages de voix du profil enfant (synchronisés avec le compte). */
export function applyVoicePrefs(voice?: string, rate?: number) {
  if (voice !== undefined) { prefVoice = voice; lsSet(VKEY, voice) }
  if (rate !== undefined) { prefRate = rate; lsSet(RKEY, String(rate)) }
}

export const getVoiceName = () => prefVoice
export const getRate = () => prefRate

/** Voix effectivement utilisée en français : celle choisie, sinon la plus naturelle (comme dans la liste). */
export function effectiveVoice(lang = 'fr'): SpeechSynthesisVoice | undefined {
  const all = listVoices(lang)
  if (lang === 'fr' && prefVoice) {
    const c = all.find(v => v.name === prefVoice)
    if (c) return c
  }
  return all[0]
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  return effectiveVoice(lang.slice(0, 2))
}

function whenVoices(fn: () => void) {
  const synth = window.speechSynthesis
  if (synth.getVoices().length > 0) return fn()
  let done = false
  const go = () => { if (done) return; done = true; synth.removeEventListener('voiceschanged', go); fn() }
  synth.addEventListener('voiceschanged', go)
  setTimeout(go, 600)
}

export function speak(text: string, lang = 'fr-FR') {
  if (!canSpeak()) return
  try {
    const synth = window.speechSynthesis
    synth.cancel()
    whenVoices(() => {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang
      u.rate = lang.startsWith('en') ? Math.min(prefRate, 0.9) : prefRate
      u.pitch = 1.02
      const v = pickVoice(lang)
      if (v) u.voice = v
      synth.speak(u)
    })
  } catch {
    /* la lecture audio est un confort, jamais bloquante */
  }
}

export function stopSpeaking() {
  if (canSpeak()) try { window.speechSynthesis.cancel() } catch { /* rien */ }
}
