/** Avatars illustrés (images dans public/avatars). Les anciens identifiants emoji sont convertis. */
export const AVATARS: Record<string, string> = {
  princesse: 'Princesse', prince: 'Prince', chevalier: 'Chevalier', chevaliere: 'Chevalière',
  scientifique: 'Scientifique', 'scientifique-garcon': 'Scientifique', footballeur: 'Footballeur', footballeuse: 'Footballeuse',
  professeur: 'Professeur', professeure: 'Professeure', chanteur: 'Chanteur', chanteuse: 'Chanteuse',
  danseur: 'Danseur', danseuse: 'Danseuse',
  dragon: 'Dragon', fantome: 'Fantôme', judoka: 'Judoka', astronaute: 'Astronaute', pompier: 'Pompier', youtubeuse: 'Youtubeuse', skater: 'Skater',
  pirate: 'Pirate', 'pirate-f': 'Pirate', veterinaire: 'Vétérinaire', 'veterinaire-f': 'Vétérinaire', explorateur: 'Explorateur', exploratrice: 'Exploratrice',
  magicien: 'Magicien', magicienne: 'Magicienne', 'super-heros': 'Super-héros', 'super-heroine': 'Super-héroïne',
  sirene: 'Sirène', robot: 'Robot', licorne: 'Licorne',
}
/** Rareté : les avatars des coffres sont rares, ceux des grands défis sont légendaires. */
export const RARITY: Record<string, 'rare' | 'legend'> = {
  fantome: 'rare', astronaute: 'rare', dragon: 'rare', judoka: 'rare', pompier: 'rare', skater: 'rare', youtubeuse: 'rare',
  magicien: 'rare', magicienne: 'rare', 'super-heros': 'rare', 'super-heroine': 'rare',
  sirene: 'legend', robot: 'legend', licorne: 'legend',
}
const LEGACY: Record<string, string> = {
  '🐰': 'princesse', '🐱': 'chevalier', '🐶': 'footballeur', '🐦': 'scientifique',
  '🦊': 'fantome', '🐼': 'professeur', '🦁': 'chanteur', '🦄': 'danseur',
}
export const avatarId = (v?: string) => (v && AVATARS[v] ? v : (v && LEGACY[v]) || 'princesse')
export const avatarSrc = (v?: string) => `${import.meta.env.BASE_URL}avatars/${avatarId(v)}.webp`
export const avatarLabel = (v?: string) => AVATARS[avatarId(v)]
export const isAvatar = (v: string) => !!AVATARS[v] || !!LEGACY[v]
