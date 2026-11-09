import type { LevelId } from '../../../types'

/** Ce que chaque difficulté fait travailler, classe par classe (programmes officiels). */
export const ABOUT: Record<string, Record<LevelId, [string, string, string]>> = {
  multiplication: {
    ce1: ['Tables de 2, 5 et 10', 'Tables de 2, 3, 4, 5 et 10', 'Tables de 2 à 5 et 10, objectif plus haut'],
    ce2: ['Tables de 2 à 5 et 10', 'Tables de 6, 7, 8 et 9', 'Toutes les tables de 2 à 9'],
    cm1: ['Toutes les tables', 'Multiplier par 10, 100 et par des dizaines', 'Un nombre à 2 chiffres × un chiffre'],
    cm2: ['Tables et × 10, × 100', 'Un nombre à 2 chiffres × un chiffre', 'Décimaux × 10, × 100, × 1 000'],
  },
  addition: {
    ce1: ['Les compléments à 10', 'Additions jusqu’à 20', 'Compléments à 100 avec les dizaines'],
    ce2: ['Additions jusqu’à 20', 'Compléments à 50 et à 100', 'Compléments à 100'],
    cm1: ['Compléments à 100', 'Compléments à 1 000 (centaines)', 'Compléments à 1 000'],
    cm2: ['Compléments à 1 000', 'Décimaux : compléments à 1', 'Décimaux : compléments à 10'],
  },
  soustraction: {
    ce1: ['Nombres jusqu’à 20', 'Deux chiffres moins un chiffre', 'Deux chiffres moins deux chiffres'],
    ce2: ['Deux chiffres moins deux chiffres', 'Trois chiffres moins deux chiffres', 'Trois chiffres moins trois chiffres'],
    cm1: ['Trois chiffres moins trois chiffres', 'Nombres à 4 chiffres', 'Nombres à 5 chiffres'],
    cm2: ['Nombres à 4 chiffres', 'Décimaux (dixièmes)', 'Décimaux (centièmes)'],
  },
  division: {
    ce1: ['La moitié des nombres jusqu’à 20', 'La moitié des nombres jusqu’à 40', 'Partager en parts égales'],
    ce2: ['Diviser par 2, 5 et 10', 'Diviser avec les tables de 2 à 5', 'Diviser avec les tables de 2 à 9'],
    cm1: ['Diviser avec les tables', 'Diviser par 10 et par 100', 'Un nombre à 2 chiffres ÷ un chiffre'],
    cm2: ['Un nombre à 2 chiffres ÷ un chiffre', 'Un nombre à 3 chiffres ÷ un chiffre', 'Décimaux : ÷ 10 et ÷ 100'],
  },
  geographie: {
    ce1: ['Les continents', 'Les continents et la France', 'Les continents et les grands pays'],
    ce2: ['Les continents et la France', 'Les continents et les grands pays', 'Les pays voisins de la France'],
    cm1: ['Les pays voisins de la France', 'Les pays d’Europe', 'Les grands pays du monde'],
    cm2: ['Les pays d’Europe', 'Les grands pays du monde', 'Tous les pays du monde'],
  },
  capitales: {
    ce1: ['La France et 5 voisins', 'Les grands pays d’Europe', 'Grands pays d’Europe, dans les deux sens'],
    ce2: ['Les grands pays d’Europe', 'Toute l’Europe', 'Toute l’Europe, dans les deux sens'],
    cm1: ['Toute l’Europe', 'L’Europe et le monde', 'L’Europe et le monde, dans les deux sens'],
    cm2: ['Toute l’Europe, dans les deux sens', 'Les pays du monde', 'Le monde entier, dans les deux sens'],
  },
  mers: {
    ce1: ['Les 3 grands océans', 'Les 5 océans', 'Les océans et la Méditerranée'],
    ce2: ['Les 5 océans', 'Les océans et les mers de France', 'Océans et mers autour de la France'],
    cm1: ['Les mers autour de la France', 'Les mers d’Europe', 'Océans et mers d’Europe'],
    cm2: ['Les mers d’Europe', 'Les mers du monde', 'Tous les océans et toutes les mers'],
  },
}
