// Mots du jeu « Mot mystère » : sans accents, avec un indice adapté au niveau.
export const MYSTERY: Record<string, [string, string][]> = {
  ce1: [
    ['CHAT', 'Il miaule et ronronne.'], ['LOUP', 'Il hurle à la lune dans la forêt.'], ['OURS', 'Gros animal qui adore le miel.'], ['LAIT', 'Boisson blanche donnée par la vache.'],
    ['PAIN', 'On l’achète chez le boulanger.'], ['LUNE', 'Elle brille dans le ciel la nuit.'], ['ROSE', 'Une fleur qui pique.'], ['MAIN', 'Elle a cinq doigts.'],
    ['NUIT', 'Le contraire du jour.'], ['VERT', 'La couleur de l’herbe.'], ['BLEU', 'La couleur du ciel.'], ['LIRE', 'Ce que tu fais avec un livre.'],
    ['VELO', 'Il a deux roues et des pédales.'], ['BRAS', 'Entre l’épaule et la main.'], ['DENT', 'On la brosse matin et soir.'], ['LION', 'Le roi des animaux.'],
    ['NOEL', 'La fête de décembre avec un sapin.'], ['MIEL', 'Les abeilles le fabriquent.'], ['MOTO', 'Deux roues et un moteur.'], ['PIED', 'Il est au bout de la jambe.'],
    ['CHOU', 'Légume rond aux grandes feuilles.'], ['NAGE', 'Ce que fait le poisson dans l’eau.'], ['FOUR', 'Il sert à cuire les gâteaux.'], ['LOTO', 'Jeu où l’on tire des numéros.'],
  ],
  ce2: [
    ['POMME', 'Fruit rouge ou vert du pommier.'], ['LAPIN', 'Il a de longues oreilles.'], ['TIGRE', 'Grand félin à rayures.'], ['ZEBRE', 'Cheval rayé noir et blanc.'],
    ['ECOLE', 'On y apprend à lire et à compter.'], ['PLUIE', 'Elle tombe des nuages.'], ['NEIGE', 'Flocons blancs de l’hiver.'], ['ARBRE', 'Il a un tronc et des branches.'],
    ['FLEUR', 'Elle pousse au jardin et sent bon.'], ['SUCRE', 'Il rend les gâteaux doux.'], ['TABLE', 'On mange dessus.'], ['LIVRE', 'Il a des pages et une couverture.'],
    ['CHIEN', 'Il aboie.'], ['POULE', 'Elle pond des œufs.'], ['VACHE', 'Elle donne du lait.'], ['SINGE', 'Il grimpe aux arbres.'],
    ['PLAGE', 'Bord de mer avec du sable.'], ['CRAIE', 'On écrit au tableau avec.'], ['HIVER', 'La saison la plus froide.'], ['GLACE', 'Eau gelée, ou dessert froid.'],
    ['PIANO', 'Instrument à touches noires et blanches.'], ['ROBOT', 'Machine qui bouge toute seule.'], ['CARTE', 'Elle montre les pays et les villes.'], ['NUAGE', 'Il flotte dans le ciel.'],
  ],
  cm1: [
    ['VERBE', 'Mot qui dit l’action.'], ['ANGLE', 'Deux droites qui se rencontrent en forment un.'], ['SOMME', 'Résultat d’une addition.'], ['CARRE', 'Quatre côtés égaux et quatre angles droits.'],
    ['METRE', 'Unité de longueur.'], ['LITRE', 'Unité pour mesurer les liquides.'], ['DROIT', 'Un angle de 90 degrés est un angle…'], ['SUJET', 'Celui qui fait l’action dans la phrase.'],
    ['TEMPS', 'Passé, présent ou futur.'], ['ROMAN', 'Long récit inventé.'], ['POEME', 'Texte écrit en vers.'], ['FABLE', 'Histoire courte avec une morale.'],
    ['GAULE', 'Ancien nom du territoire de la France.'], ['DELTA', 'Embouchure d’un fleuve en plusieurs bras.'], ['COEUR', 'Il pompe le sang.'], ['ORAGE', 'Pluie avec tonnerre et éclairs.'],
    ['ATLAS', 'Livre rempli de cartes.'], ['ROUTE', 'Voie pour les voitures.'], ['MOYEN', 'Le … Âge, entre l’Antiquité et les Temps modernes.'], ['PILES', 'Elles donnent de l’électricité aux jouets.'],
  ],
  cm2: [
    ['NOMBRE', 'Il s’écrit avec des chiffres.'], ['CALCUL', 'Opération sur les nombres.'], ['VOLCAN', 'Montagne qui peut cracher de la lave.'], ['FLEUVE', 'Cours d’eau qui se jette dans la mer.'],
    ['PRISME', 'Solide dont les faces latérales sont des rectangles.'], ['CERCLE', 'Tous ses points sont à égale distance du centre.'], ['ORBITE', 'Trajet d’une planète autour du Soleil.'], ['SOLEIL', 'L’étoile la plus proche de la Terre.'],
    ['EUROPE', 'Le continent de la France.'], ['ROMAIN', 'Habitant de l’Empire de Rome.'], ['PRONOM', 'Il remplace le nom.'], ['ACCORD', 'Le verbe le fait avec son sujet.'],
    ['MAIRIE', 'Bâtiment où travaille le maire.'], ['CLIMAT', 'Le temps qu’il fait en moyenne dans une région.'], ['SAVANE', 'Grande plaine d’herbes hautes en Afrique.'], ['DESERT', 'Endroit très sec où il pleut très peu.'],
    ['MUSCLE', 'Il permet de bouger.'], ['POUMON', 'Il sert à respirer.'], ['VOLUME', 'Place occupée par un objet.'], ['DIVISE', 'Partager en parts égales, c’est… (verbe au présent).'],
  ],
}

// Mots mêlés : thèmes en lien avec les matières
export const THEMES: { name: string; words: string[] }[] = [
  { name: 'Les animaux', words: ['CHAT', 'CHIEN', 'LAPIN', 'LION', 'TIGRE', 'ZEBRE', 'OURS', 'LOUP', 'SINGE', 'POULE', 'CHEVAL', 'VACHE', 'RENARD', 'GIRAFE', 'HIBOU'] },
  { name: 'Fruits et légumes', words: ['POMME', 'POIRE', 'FRAISE', 'CERISE', 'BANANE', 'CAROTTE', 'CHOU', 'RADIS', 'TOMATE', 'PRUNE', 'KIWI', 'MELON', 'POIREAU'] },
  { name: 'Le corps', words: ['TETE', 'BRAS', 'MAIN', 'PIED', 'NEZ', 'BOUCHE', 'OREILLE', 'GENOU', 'DOS', 'COEUR', 'DENT', 'JAMBE', 'COU'] },
  { name: 'L’école', words: ['CRAYON', 'CAHIER', 'LIVRE', 'GOMME', 'REGLE', 'STYLO', 'TABLEAU', 'CLASSE', 'ECOLE', 'COLLE', 'TROUSSE', 'CISEAUX'] },
  { name: 'En anglais', words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK', 'WHITE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SEVEN', 'PINK', 'CAT', 'DOG'] },
  { name: 'Géographie', words: ['FLEUVE', 'MER', 'OCEAN', 'ILE', 'MONTAGNE', 'PLAINE', 'VOLCAN', 'DESERT', 'FORET', 'PAYS', 'VILLE', 'LAC', 'CARTE'] },
  { name: 'La météo', words: ['PLUIE', 'NEIGE', 'SOLEIL', 'VENT', 'NUAGE', 'ORAGE', 'GRELE', 'BRUME', 'ECLAIR', 'FROID', 'CHAUD'] },
  { name: 'Les nombres', words: ['UN', 'DEUX', 'TROIS', 'QUATRE', 'CINQ', 'SIX', 'SEPT', 'HUIT', 'NEUF', 'DIX', 'CENT', 'MILLE', 'ZERO'] },
]
