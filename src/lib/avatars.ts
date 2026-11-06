/** Avatars illustrés (images dans public/avatars). Les anciens identifiants emoji sont convertis. */
export const AVATARS: Record<string, string> = {
  princesse: 'Princesse', prince: 'Prince', chevalier: 'Chevalier', chevaliere: 'Chevalière',
  scientifique: 'Scientifique', 'scientifique-garcon': 'Scientifique', footballeur: 'Footballeur', footballeuse: 'Footballeuse',
  professeur: 'Professeur', professeure: 'Professeure', chanteur: 'Chanteur', chanteuse: 'Chanteuse',
  danseur: 'Danseur', danseuse: 'Danseuse',
  dragon: 'Dragon', fantome: 'Fantôme', judoka: 'Judoka', astronaute: 'Astronaute', pompier: 'Pompier', youtubeuse: 'Youtubeuse', skater: 'Skater',
}
const LEGACY: Record<string, string> = {
  '🐰': 'princesse', '🐱': 'chevalier', '🐶': 'footballeur', '🐦': 'scientifique',
  '🦊': 'fantome', '🐼': 'professeur', '🦁': 'chanteur', '🦄': 'danseur',
}
export const avatarId = (v?: string) => (v && AVATARS[v] ? v : (v && LEGACY[v]) || 'princesse')
export const avatarSrc = (v?: string) => `${import.meta.env.BASE_URL}avatars/${avatarId(v)}.webp`
export const avatarLabel = (v?: string) => AVATARS[avatarId(v)]
export const isAvatar = (v: string) => !!AVATARS[v] || !!LEGACY[v]
