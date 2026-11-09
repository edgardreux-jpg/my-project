/**
 * Textes de Foxy, le renard qui guide les visiteurs.
 * Chaque page a ses bulles : la première s'affiche toute seule à la première visite,
 * les suivantes avec « Et ensuite ? ».
 * Côté enfant : tutoiement et phrases courtes. Côté adultes : vouvoiement.
 */
export interface Tip { title: string; text: string }

const P = (title: string, text: string): Tip => ({ title, text })

export function tipsFor(path: string, hasKids: boolean): Tip[] {
  if (path === '/') return [
    P('Bonjour, je suis Foxy !', 'Bienvenue sur EDUFUN, le site où les enfants du CE1 au CM2 apprennent en jouant. Je vous accompagne sur chaque page : cliquez sur moi quand vous avez une question.'),
    P('Pour les parents', 'Créez un compte parent gratuit, puis un profil pour chaque enfant. Vous suivrez ensuite ses progrès semaine après semaine.'),
    P('Pour essayer sans compte', 'Le bouton « Voir une démonstration » ouvre une famille fictive : vous pouvez tout explorer, rien n’est enregistré.'),
    P('Pour les enseignants', 'Dans la rubrique « Enseignants », créez une classe et donnez son code aux familles pour suivre vos élèves.'),
    P('Les petites cartes', 'Passez la souris ou touchez les cartes à droite : elles se retournent et montrent ce que voient l’enfant, le parent et l’enseignant.'),
  ]
  if (path === '/connexion') return [
    P('Connexion parent', 'Entrez votre adresse e-mail et votre mot de passe, ou utilisez « Continuer avec Google ».'),
    P('Mot de passe oublié ?', 'Écrivez votre adresse e-mail, puis cliquez sur « Mot de passe oublié ? » : vous recevrez un lien pour en choisir un nouveau.'),
  ]
  if (path === '/inscription') return [
    P('Créer votre compte parent', 'Il faut juste votre prénom, une adresse e-mail et un mot de passe de 8 caractères minimum.'),
    P('Le code parent', 'Ces 4 chiffres protègent votre espace quand votre enfant utilise l’appareil : il ne pourra pas voir vos réglages sans ce code.'),
    P('Et après ?', 'Vous recevrez un e-mail pour confirmer votre adresse. Pensez à regarder dans les spams.'),
  ]
  if (path.startsWith('/enseignant/inscription') || path.startsWith('/enseignant/connexion')) return [
    P('Espace enseignant', 'Avec un compte enseignant, vous créez vos classes et suivez la progression de vos élèves.'),
    P('Pour découvrir', 'Le bouton « Explorer avec une classe de démonstration » ouvre deux classes fictives, sans créer de compte.'),
  ]
  if (path === '/enseignant') return [
    P('Vos classes', 'Ici, vous créez vos classes. Chaque classe reçoit un code à 6 caractères à donner aux familles.'),
    P('Comment les élèves arrivent', 'Le parent entre le code dans la fiche de son enfant, rubrique « Classe ». L’élève apparaît aussitôt dans votre tableau.'),
  ]
  if (path.startsWith('/enseignant/classe/')) return [
    P('Le tableau de la classe', 'En haut, quatre chiffres clés : élèves actifs, temps moyen, réussite moyenne et élèves inactifs depuis une semaine.'),
    P('Notions à retravailler', 'Je repère les notions où plusieurs élèves bloquent : une bonne piste pour une séance en classe.'),
    P('La liste des élèves', 'Triez par prénom, réussite, temps ou inactivité. Le bouton à droite retire un élève de la classe.'),
    P('Le code de la classe', 'Cliquez sur le code pour le copier et le coller dans un message aux familles.'),
  ]
  if (path === '/profils') return [
    P('Qui apprend aujourd’hui ?', 'Touche ton avatar pour entrer dans ton espace.'),
    P('Pour les parents', 'Le bouton « Espace parent » ouvre votre tableau de bord, protégé par votre code parent.'),
  ]
  if (path === '/parent') return hasKids ? [
    P('Votre tableau de bord', 'Ici, vous pourrez créer le profil de vos enfants puis suivre leur évolution.'),
    P('La carte de chaque enfant', 'Trois chiffres : le temps passé cette semaine, la réussite au premier essai et les leçons acquises. Les petits graphiques montrent les 8 dernières semaines.'),
    P('Le message coloré', 'En vert, tout va bien. En jaune, une notion mérite un coup de pouce : vous la retrouvez dans « Détails ».'),
    P('Son espace', 'Le bouton « Son espace » ouvre directement les leçons de l’enfant sur cet appareil.'),
    P('Ajouter un enfant', 'Le bouton en haut à droite crée un nouveau profil : prénom, classe et avatar.'),
  ] : [
    P('Bienvenue !', 'Ici, vous pourrez créer le profil de vos enfants puis suivre leur évolution. Commencez par « Ajouter un enfant ».'),
    P('Un profil, c’est quoi ?', 'Un prénom ou pseudo, une classe et un avatar. L’enfant entre simplement en touchant son avatar.'),
  ]
  if (path.startsWith('/parent/enfant/')) return [
    P('La fiche de l’enfant', 'Quatre onglets : Aperçu, Progression, Activité et Réglages.'),
    P('Progression', 'La maîtrise de chaque matière, les notions à consolider et les réussites récentes.'),
    P('Activité', 'Les dernières séances, et la possibilité de proposer une leçon à votre enfant.'),
    P('Réglages', 'Les habitudes (objectif, pauses), les matières visibles, et la rubrique « Classe » pour entrer le code donné par l’enseignant.'),
  ]
  if (path === '/enfant') return [
    P('Salut, c’est Foxy !', 'Ici, c’est ton espace. Appuie sur le gros bouton « Jouer » pour continuer ton aventure.'),
    P('En haut', 'La flamme compte tes jours de suite, l’étoile tes étoiles gagnées. Le cadeau qui bouge ? Un coffre t’attend !'),
    P('Ta série', 'Les flammes comptent les jours où tu as appris. Un joker te protège si tu oublies un jour.'),
    P('Tes mondes', 'Plus bas, choisis un monde pour voir ton chemin de leçons.'),
  ]
  if (path === '/enfant/matieres') return [
    P('Choisis un monde', 'Chaque matière est un monde. Touche-le pour ouvrir ta carte d’aventure.'),
  ]
  if (path.startsWith('/enfant/matiere/')) return [
    P('Ta carte d’aventure', 'Suis le chemin en pointillés ! Ton avatar t’attend sur la prochaine leçon.'),
    P('Les ronds', 'Une coche : leçon faite. Une couronne : leçon maîtrisée. Un cadenas : bientôt disponible.'),
    P('Les étoiles', 'Tu peux gagner jusqu’à 3 étoiles par leçon. Rejoue une leçon pour en gagner plus !'),
    P('Les mondes', 'Le chemin est découpé en mondes. Au bout, une coupe t’attend.'),
  ]
  if (path === '/enfant/recompenses') return [
    P('Tes trésors', 'Chaque leçon te donne des points. Avec assez de points, tu montes de niveau et tu ouvres des coffres !'),
    P('Les coffres', 'Ils cachent de nouveaux avatars et des cadres. Quand un coffre brille, appuie sur « Ouvrir ».'),
    P('Les badges', 'Les badges récompensent tes efforts : première leçon, série de jours, leçon sans faute…'),
  ]
  if (path === '/enfant/reperes') return [
    P('Ton bilan', 'Ce sont les mêmes genres d’exercices que les évaluations nationales. Ce n’est pas une note !'),
    P('Les séquences', 'Fais une séquence à la fois, au calme. Tu ne sais pas tout de suite si c’est juste, comme en classe.'),
    P('Ta toile', 'Plus la toile est grande, plus la compétence est acquise. Les bilans suivants s’ouvrent quand tu avances dans tes leçons.'),
  ]
  if (path === '/enfant/jeux') return [
    P('La ludothèque', 'Des jeux pour t’entraîner au calcul et découvrir le monde : tables, additions, pays, capitales, mers et océans. Choisis-en un !'),
    P('Les parties', 'Tu as quelques parties chaque jour, et chaque leçon terminée t’en fait gagner une de plus.'),
    P('Les records', 'Quand tu gagnes, ton meilleur score s’affiche sur la carte du jeu. Essaie de le battre !'),
  ]
  if (path === '/enfant/moi') return [
    P('C’est toi !', 'Ici, tu choisis ton avatar. Ceux avec un cadenas se gagnent dans les coffres.'),
    P('Mes réglages', 'Ouvre « Mes réglages » pour choisir la voix, couper les sons ou agrandir le texte.'),
  ]
  if (path === '/confidentialite') return [
    P('Vos données', 'Cette page explique quelles données EDUFUN garde, qui peut les voir et comment les supprimer.'),
  ]
  return [P('Besoin d’aide ?', 'Je suis Foxy. Cliquez sur moi sur chaque page pour savoir à quoi elle sert.')]
}

/** Pages où Foxy se fait discret (pendant une leçon, il ne doit pas distraire). */
export const hiddenOn = (path: string) => path.startsWith('/enfant/lecon') || path.startsWith('/enfant/diagnostic') || path.startsWith('/enfant/jeux/') || path.startsWith('/enfant/reperes/')
