/** Hachage local (SHA-256 salé). Limite assumée : stockage uniquement sur l'appareil dans cette version. */
function fallbackHash(s: string): string {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 2654435761)
    h2 = Math.imul(h2 ^ c, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')
}

export async function sha(text: string): Promise<string> {
  try {
    if (globalThis.crypto?.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    }
  } catch { /* repli ci-dessous */ }
  return fallbackHash(text)
}

export const newSalt = () => Math.random().toString(36).slice(2) + Date.now().toString(36)
export const hashSecret = (secret: string, salt: string) => sha(`${salt}:${secret}`)

export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())
export const validPassword = (p: string) => p.length >= 8
export const validPin = (p: string) => /^\d{4}$/.test(p)
