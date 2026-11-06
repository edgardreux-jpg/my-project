/** Avatars illustrés (images dans public/avatars). Les anciens identifiants emoji sont convertis. */
export const AVATARS: Record<string, string> = {
  princesse: 'Princesse', chevalier: 'Chevalier', dragon: 'Dragon', scientifique: 'Scientifique', footballeur: 'Footballeur',
  fantome: 'Fantôme', professeur: 'Professeur', chanteur: 'Chanteur', danseur: 'Danseur',
}
const LEGACY: Record<string, string> = {
  '🐰': 'princesse', '🐱': 'chevalier', '🐶': 'footballeur', '🐦': 'scientifique',
  '🦊': 'fantome', '🐼': 'professeur', '🦁': 'chanteur', '🦄': 'danseur',
}
export const avatarId = (v?: string) => (v && AVATARS[v] ? v : (v && LEGACY[v]) || 'princesse')
export const avatarSrc = (v?: string) => `${import.meta.env.BASE_URL}avatars/${avatarId(v)}.webp`
export const avatarLabel = (v?: string) => AVATARS[avatarId(v)]
export const isAvatar = (v: string) => !!AVATARS[v] || !!LEGACY[v]
