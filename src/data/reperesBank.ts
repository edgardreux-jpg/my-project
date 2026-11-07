// Contenus originaux EDUFUN écrits sur le modèle des évaluations nationales « Repères » (DEPP) :
// mêmes compétences et mêmes formats d'exercices, mais aucune question recopiée des livrets officiels.

export interface TextQ { q: string; options: string[]; answer: number }
export interface Text { title: string; text: string; qs: TextQ[] }
export interface PicItem { say: string; options: string[]; answer: number }
export interface MCQ { q: string; options: string[]; answer: number }

/* ============================== CE1 ============================== */

/** Textes à lire seul (documentaire / consigne puis récit), 4 questions chacun. */
export const CE1_DOC: Text[] = [
  {
    title: 'La salade de fruits',
    text: 'Pour faire une salade de fruits, il faut une pomme, une banane et des fraises. Lave les fraises. Épluche la banane et coupe-la en rondelles. Coupe la pomme en petits morceaux. Mets tous les fruits dans un saladier et ajoute un jus d’orange. Mélange doucement, puis garde le saladier au frais avant de servir.',
    qs: [
      { q: 'Ce texte sert à…', options: ['raconter une histoire', 'expliquer comment faire une recette', 'décrire un animal', 'inviter à une fête'], answer: 1 },
      { q: 'Que faut-il faire avec la banane ?', options: ['La laver', 'La mettre au four', 'L’éplucher et la couper', 'La garder entière'], answer: 2 },
      { q: 'Dans « coupe-la en rondelles », « la » veut dire…', options: ['la pomme', 'la banane', 'la fraise', 'la salade'], answer: 1 },
      { q: 'Pourquoi garder le saladier au frais ?', options: ['Pour que la salade soit fraîche', 'Pour la cacher', 'Pour la faire cuire', 'Parce qu’il est cassé'], answer: 0 },
    ],
  },
  {
    title: 'Planter un haricot',
    text: 'Prends un pot de yaourt vide. Remplis-le de coton mouillé. Pose le haricot sur le coton. Place le pot près d’une fenêtre, à la lumière. Chaque jour, verse un peu d’eau. Après quelques jours, une petite racine sort de la graine. Ensuite, une tige verte pousse vers le haut.',
    qs: [
      { q: 'Où faut-il placer le pot ?', options: ['Dans le noir', 'Dans le frigo', 'Près d’une fenêtre', 'Sous le lit'], answer: 2 },
      { q: 'Que faut-il faire chaque jour ?', options: ['Changer de pot', 'Verser un peu d’eau', 'Couper la tige', 'Enlever le coton'], answer: 1 },
      { q: 'Dans « Remplis-le », « le » remplace…', options: ['le haricot', 'le pot de yaourt', 'le coton', 'le jour'], answer: 1 },
      { q: 'Qu’est-ce qui sort en premier de la graine ?', options: ['Une fleur', 'Une tige', 'Une racine', 'Une feuille'], answer: 2 },
    ],
  },
  {
    title: 'Le jeu du loup',
    text: 'Pour jouer au loup, il faut être au moins quatre. Un enfant est le loup. Il compte jusqu’à dix pendant que les autres courent. Ensuite, il essaie de toucher un joueur. Le joueur touché devient le nouveau loup. Attention : on ne joue pas dans les escaliers !',
    qs: [
      { q: 'Combien faut-il être au moins pour jouer ?', options: ['Deux', 'Trois', 'Quatre', 'Dix'], answer: 2 },
      { q: 'Que fait le loup au début ?', options: ['Il se cache', 'Il compte jusqu’à dix', 'Il court', 'Il chante'], answer: 1 },
      { q: 'Qui devient le nouveau loup ?', options: ['Le plus grand', 'Le joueur touché', 'Le premier arrivé', 'Personne'], answer: 1 },
      { q: 'Pourquoi ne joue-t-on pas dans les escaliers ?', options: ['Parce qu’ils sont sales', 'Parce qu’on peut tomber', 'Parce qu’ils sont trop grands', 'Parce que le loup y dort'], answer: 1 },
    ],
  },
]

export const CE1_RECIT: Text[] = [
  {
    title: 'Le parapluie de Lila',
    text: 'Ce matin, Lila part à l’école avec son parapluie rouge. Dans la rue, le vent souffle très fort. Soudain, le parapluie s’envole ! Il passe au-dessus d’une voiture et tombe dans le jardin de monsieur Paul. Le vieux monsieur le ramasse en riant et le rend à Lila. « Tiens-le bien, maintenant ! » dit-il.',
    qs: [
      { q: 'De quelle couleur est le parapluie ?', options: ['Bleu', 'Jaune', 'Rouge', 'Vert'], answer: 2 },
      { q: 'Pourquoi le parapluie s’envole-t-il ?', options: ['Il pleut', 'Le vent souffle fort', 'Lila le lance', 'Un chien le tire'], answer: 1 },
      { q: 'Qui rend le parapluie à Lila ?', options: ['Sa maman', 'La maîtresse', 'Monsieur Paul', 'Un policier'], answer: 2 },
      { q: 'Dans « Tiens-le bien », « le » veut dire…', options: ['le vent', 'le jardin', 'le parapluie', 'le monsieur'], answer: 2 },
    ],
  },
  {
    title: 'Le petit chat perdu',
    text: 'Tom entend un miaulement derrière la poubelle. Il s’approche doucement : c’est un petit chat tout gris qui tremble. Tom lui donne un peu de lait. Le chat boit, puis il se frotte contre ses jambes. Le soir, Tom demande à ses parents : « Est-ce qu’il peut rester avec nous ? » Papa sourit et répond oui.',
    qs: [
      { q: 'Où est le petit chat ?', options: ['Sur le toit', 'Derrière la poubelle', 'Dans la voiture', 'Sous le lit'], answer: 1 },
      { q: 'Pourquoi le chat tremble-t-il ?', options: ['Il a peur et froid', 'Il joue', 'Il est content', 'Il danse'], answer: 0 },
      { q: 'Que fait le chat après avoir bu ?', options: ['Il s’enfuit', 'Il dort', 'Il se frotte contre Tom', 'Il griffe Tom'], answer: 2 },
      { q: 'À la fin, le chat…', options: ['repart dans la rue', 'reste chez Tom', 'va chez le voisin', 'retourne à l’école'], answer: 1 },
    ],
  },
  {
    title: 'La cabane',
    text: 'Pendant les vacances, Inès et son frère Malo construisent une cabane au fond du jardin. Malo apporte des branches, Inès trouve une vieille couverture. Ils travaillent tout l’après-midi. Quand la pluie arrive, ils se glissent à l’intérieur. Ils sont un peu mouillés, mais très fiers : leur cabane ne laisse presque pas passer l’eau !',
    qs: [
      { q: 'Qui construit la cabane ?', options: ['Inès seule', 'Malo et son papa', 'Inès et Malo', 'Des voisins'], answer: 2 },
      { q: 'Qu’apporte Inès ?', options: ['Des branches', 'Une couverture', 'Des clous', 'Une table'], answer: 1 },
      { q: 'Que font-ils quand la pluie arrive ?', options: ['Ils rentrent à la maison', 'Ils vont dans la cabane', 'Ils courent sous la pluie', 'Ils cassent la cabane'], answer: 1 },
      { q: 'Pourquoi sont-ils fiers ?', options: ['Ils ont gagné un prix', 'Leur cabane protège bien de la pluie', 'Ils sont tout secs', 'Ils ont fini avant le soir'], answer: 1 },
    ],
  },
]

/** Mots entendus : l’enfant écoute un mot et choisit l’image (mots proches à l’oreille). */
export const CE1_MOTS: PicItem[] = [
  { say: 'gâteau', options: ['🎂', '⛵', '🏰', '🎩'], answer: 0 },
  { say: 'bateau', options: ['🎂', '⛵', '🏰', '🎩'], answer: 1 },
  { say: 'château', options: ['🎩', '🎂', '🏰', '⛵'], answer: 2 },
  { say: 'chapeau', options: ['🏰', '🎩', '⛵', '🎂'], answer: 1 },
  { say: 'poisson', options: ['🐟', '🐤', '🧪', '🐻'], answer: 0 },
  { say: 'poussin', options: ['🐟', '🐻', '🐤', '🧸'], answer: 2 },
  { say: 'poule', options: ['🐔', '🎱', '🦉', '🐟'], answer: 0 },
  { say: 'boule', options: ['🐔', '🎱', '🍰', '🦉'], answer: 1 },
  { say: 'pain', options: ['🍞', '🌲', '🐇', '🦶'], answer: 0 },
  { say: 'lapin', options: ['🍞', '🌲', '🐇', '🦶'], answer: 2 },
  { say: 'sapin', options: ['🐇', '🌲', '🍞', '🦶'], answer: 1 },
  { say: 'mouton', options: ['🐑', '🐭', '🧤', '🎈'], answer: 0 },
  { say: 'souris', options: ['🐑', '🐭', '🧀', '🎈'], answer: 1 },
  { say: 'ballon', options: ['🐑', '🦁', '🎈', '⚽'], answer: 3 },
  { say: 'lion', options: ['🦁', '🎈', '⚽', '🐑'], answer: 0 },
  { say: 'tortue', options: ['🐢', '🦉', '🍰', '🚗'], answer: 0 },
  { say: 'hibou', options: ['🐢', '🦉', '🍰', '🚗'], answer: 1 },
  { say: 'voiture', options: ['🐢', '🦉', '🍰', '🚗'], answer: 3 },
]

/** Phrases lues ou entendues : choisir l’image qui correspond (un seul détail change). */
export const CE1_PHRASES: PicItem[] = [
  { say: 'La fille lit un livre.', options: ['👧📖', '👦📖', '👧✏️', '👵📖'], answer: 0 },
  { say: 'Le garçon mange une pomme.', options: ['👧🍎', '👦🍌', '👦🍎', '👦⚽'], answer: 2 },
  { say: 'Il y a trois chats.', options: ['🐱🐱', '🐶🐶🐶', '🐱🐱🐱🐱', '🐱🐱🐱'], answer: 3 },
  { say: 'Le chien joue avec un ballon.', options: ['🐶⚽', '🐱⚽', '🐶🦴', '🐶🎈'], answer: 0 },
  { say: 'Papa conduit une voiture rouge.', options: ['👨🚙', '👨🚗', '👩🚗', '👨🚲'], answer: 1 },
  { say: 'La maman porte un parapluie.', options: ['👩☂️', '👩🎒', '👨☂️', '👧☂️'], answer: 0 },
  { say: 'Il neige sur la maison.', options: ['🌧️🏠', '❄️🏠', '☀️🏠', '❄️🌳'], answer: 1 },
  { say: 'Le bébé dort.', options: ['👶🍼', '👶😴', '👧😴', '👶🧸'], answer: 1 },
  { say: 'Deux oiseaux volent.', options: ['🐦', '🐦🐦', '🐦🐦🐦', '🦋🦋'], answer: 1 },
  { say: 'La grand-mère boit un café.', options: ['👵☕', '👴☕', '👵🍰', '👩☕'], answer: 0 },
  { say: 'Le poisson est dans l’eau.', options: ['🐟🌊', '🐟🍽️', '🐬🌊', '🐠🏖️'], answer: 0 },
  { say: 'Les enfants font du vélo.', options: ['🧒🚲', '🧒🧒🚲🚲', '🧒🧒🛴🛴', '👨👨🚲🚲'], answer: 1 },
]

/** Syllabes et mots dictés (mots fréquents et réguliers). */
export const CE1_SYLL = ['pa', 'mi', 'lo', 'ru', 'fé', 'ton', 'bar', 'pli', 'cra', 'vou', 'gré', 'sol', 'tri', 'chou', 'flo', 'bri', 'vin', 'gar']
export const CE1_MOTS_DICTES = ['lune', 'moto', 'école', 'jardin', 'maman', 'vélo', 'table', 'petit', 'samedi', 'tomate', 'domino', 'cartable', 'farine', 'pirate', 'marche', 'robot', 'livre', 'rue']

/* ============================== CE2 ============================== */

export const CE2_LUS: Text[] = [
  {
    title: 'Le hérisson',
    text: 'Le hérisson est un petit animal couvert de piquants. Le jour, il dort caché sous un tas de feuilles. La nuit, il sort pour chercher sa nourriture : des vers, des limaces et des insectes. Quand il a peur, il se roule en boule et ses piquants le protègent. En hiver, il fait une longue sieste qu’on appelle l’hibernation. Les jardiniers l’aiment bien, car il mange les limaces qui abîment les salades.',
    qs: [
      { q: 'Quand le hérisson cherche-t-il à manger ?', options: ['Le matin', 'À midi', 'La nuit', 'Seulement en hiver'], answer: 2 },
      { q: 'Que fait-il quand il a peur ?', options: ['Il court très vite', 'Il se roule en boule', 'Il crie', 'Il grimpe à un arbre'], answer: 1 },
      { q: 'Qu’est-ce que l’hibernation ?', options: ['Un repas', 'Une longue sieste en hiver', 'Une maison', 'Un piquant'], answer: 1 },
      { q: 'Pourquoi les jardiniers aiment-ils le hérisson ?', options: ['Il est mignon', 'Il arrose les plantes', 'Il mange les limaces', 'Il garde la maison'], answer: 2 },
    ],
  },
  {
    title: 'La course de Noé',
    text: 'Noé s’entraîne depuis des semaines pour la course de l’école. Le grand jour, il part trop vite et, à la moitié du parcours, il est déjà essoufflé. Plusieurs élèves le dépassent. Noé se rappelle alors le conseil de sa maîtresse : « Respire calmement et garde ton rythme. » Il ralentit un peu, reprend son souffle, puis accélère dans la dernière ligne droite. Il termine troisième, avec un grand sourire.',
    qs: [
      { q: 'Pourquoi Noé est-il essoufflé à la moitié de la course ?', options: ['Il est malade', 'Il est parti trop vite', 'Il a mal au pied', 'Il a trop mangé'], answer: 1 },
      { q: 'Qui lui avait donné un conseil ?', options: ['Son père', 'Un copain', 'Sa maîtresse', 'Le directeur'], answer: 2 },
      { q: 'À quelle place termine-t-il ?', options: ['Premier', 'Deuxième', 'Troisième', 'Dernier'], answer: 2 },
      { q: 'À la fin, comment se sent Noé ?', options: ['Triste', 'Content', 'En colère', 'Fatigué et déçu'], answer: 1 },
    ],
  },
  {
    title: 'Le marché du samedi',
    text: 'Chaque samedi, Léna accompagne son grand-père au marché. Ils achètent d’abord du pain, puis des légumes chez madame Rosa. Aujourd’hui, Léna choisit elle-même les tomates : elle les prend bien rouges et pas trop molles. Madame Rosa la félicite et lui offre une pêche. Sur le chemin du retour, Léna la partage avec son grand-père.',
    qs: [
      { q: 'Que font-ils en premier au marché ?', options: ['Acheter des légumes', 'Acheter du pain', 'Acheter des fleurs', 'Boire un jus'], answer: 1 },
      { q: 'Comment Léna choisit-elle les tomates ?', options: ['Vertes et dures', 'Les plus grosses', 'Rouges et pas trop molles', 'Au hasard'], answer: 2 },
      { q: 'Pourquoi madame Rosa offre-t-elle une pêche ?', options: ['Pour féliciter Léna', 'Parce qu’elle est abîmée', 'Parce que c’est son anniversaire', 'Pour s’excuser'], answer: 0 },
      { q: 'Dans « Léna la partage », « la » remplace…', options: ['la tomate', 'la pêche', 'madame Rosa', 'la route'], answer: 1 },
    ],
  },
]

/** Textes entendus (lus deux fois par la voix de l’appli). */
export const CE2_ORAUX: Text[] = [
  {
    title: 'Le manchot empereur',
    text: 'Le manchot empereur vit en Antarctique, l’endroit le plus froid de la Terre. C’est un oiseau, mais il ne vole pas : il nage très bien et plonge pour attraper des poissons. Pour avoir chaud, les manchots se serrent les uns contre les autres. La maman pond un seul œuf. C’est le papa qui le garde au chaud sur ses pattes pendant deux mois, sans manger.',
    qs: [
      { q: 'Où vit le manchot empereur ?', options: ['En Afrique', 'En Antarctique', 'Dans la forêt', 'Dans le désert'], answer: 1 },
      { q: 'Le manchot est un oiseau qui…', options: ['vole très haut', 'ne vole pas mais nage', 'vit dans les arbres', 'mange des fruits'], answer: 1 },
      { q: 'Comment les manchots se réchauffent-ils ?', options: ['Ils font du feu', 'Ils se serrent les uns contre les autres', 'Ils dorment dans l’eau', 'Ils courent'], answer: 1 },
      { q: 'Qui garde l’œuf au chaud ?', options: ['La maman', 'Le papa', 'Les grands-parents', 'Personne'], answer: 1 },
    ],
  },
  {
    title: 'La lettre de Sacha',
    text: 'Sacha a déménagé dans une nouvelle ville. Il écrit une lettre à son ami Yanis. Il raconte que sa nouvelle chambre est plus grande et qu’il voit la mer depuis sa fenêtre. Mais il explique aussi que ses copains lui manquent. À la fin, il invite Yanis à venir pendant les vacances pour faire du bateau.',
    qs: [
      { q: 'À qui Sacha écrit-il ?', options: ['À sa maîtresse', 'À son ami Yanis', 'À sa grand-mère', 'À son frère'], answer: 1 },
      { q: 'Que voit Sacha depuis sa fenêtre ?', options: ['La montagne', 'Un parc', 'La mer', 'Son école'], answer: 2 },
      { q: 'Qu’est-ce qui rend Sacha un peu triste ?', options: ['Sa chambre est petite', 'Ses copains lui manquent', 'Il pleut', 'Il n’aime pas la mer'], answer: 1 },
      { q: 'Que propose Sacha à la fin ?', options: ['De s’écrire tous les jours', 'De venir pour les vacances', 'D’aller au cinéma', 'De changer d’école'], answer: 1 },
    ],
  },
  {
    title: 'L’abeille',
    text: 'Les abeilles vivent ensemble dans une ruche. La reine pond des œufs, et les ouvrières font tout le reste : elles nettoient la ruche, nourrissent les bébés et vont chercher le nectar des fleurs. Avec ce nectar, elles fabriquent le miel. En allant de fleur en fleur, elles transportent aussi du pollen, ce qui aide les plantes à donner des fruits.',
    qs: [
      { q: 'Où vivent les abeilles ?', options: ['Dans un nid', 'Dans une ruche', 'Dans la terre', 'Sous l’eau'], answer: 1 },
      { q: 'Que fait la reine ?', options: ['Elle fabrique le miel', 'Elle pond des œufs', 'Elle nettoie', 'Elle garde l’entrée'], answer: 1 },
      { q: 'Avec quoi les abeilles fabriquent-elles le miel ?', options: ['Avec du pollen', 'Avec du nectar', 'Avec de l’eau', 'Avec du sucre'], answer: 1 },
      { q: 'Pourquoi les abeilles sont-elles utiles aux plantes ?', options: ['Elles les arrosent', 'Elles transportent le pollen', 'Elles mangent les feuilles', 'Elles les protègent du froid'], answer: 1 },
    ],
  },
]

/** Mots fréquents dictés (réguliers ou invariables). */
export const CE2_MOTS_DICTES = ['aussi', 'toujours', 'maison', 'jardin', 'bateau', 'matin', 'souvent', 'garçon', 'histoire', 'beaucoup', 'ville', 'neige', 'dehors', 'pendant', 'semaine', 'jamais', 'poisson', 'maintenant', 'chemin', 'feuille', 'mercredi', 'ensemble', 'gâteau', 'bonjour']

/** Identifier le sujet / le verbe conjugué : la phrase, puis la bonne réponse parmi 4 morceaux. */
export const CE2_SUJET: MCQ[] = [
  { q: 'Le chat de Julie dort sur le canapé.', options: ['Le chat de Julie', 'dort', 'sur le canapé', 'Julie'], answer: 0 },
  { q: 'Chaque matin, mes parents boivent un café.', options: ['Chaque matin', 'mes parents', 'boivent', 'un café'], answer: 1 },
  { q: 'Dans la cour, les enfants jouent au ballon.', options: ['Dans la cour', 'jouent', 'les enfants', 'au ballon'], answer: 2 },
  { q: 'Le vent souffle fort ce soir.', options: ['Le vent', 'souffle', 'fort', 'ce soir'], answer: 0 },
  { q: 'Mon petit frère et moi construisons une tour.', options: ['une tour', 'construisons', 'moi', 'Mon petit frère et moi'], answer: 3 },
  { q: 'Hier, la maîtresse a lu une histoire.', options: ['Hier', 'la maîtresse', 'a lu', 'une histoire'], answer: 1 },
  { q: 'Sous le pont coule une rivière.', options: ['Sous le pont', 'coule', 'une rivière', 'le pont'], answer: 2 },
  { q: 'Les oiseaux du jardin chantent.', options: ['Les oiseaux du jardin', 'du jardin', 'chantent', 'le jardin'], answer: 0 },
]
export const CE2_VERBE: MCQ[] = [
  { q: 'Les élèves rangent leurs cahiers.', options: ['élèves', 'rangent', 'leurs', 'cahiers'], answer: 1 },
  { q: 'Ce soir, nous mangerons des crêpes.', options: ['soir', 'nous', 'mangerons', 'crêpes'], answer: 2 },
  { q: 'Le petit chien aboie très fort.', options: ['petit', 'chien', 'aboie', 'fort'], answer: 2 },
  { q: 'Tu choisis un livre à la bibliothèque.', options: ['Tu', 'choisis', 'livre', 'bibliothèque'], answer: 1 },
  { q: 'Mes cousins arrivaient toujours en retard.', options: ['cousins', 'arrivaient', 'toujours', 'retard'], answer: 1 },
  { q: 'La neige tombe sur les toits.', options: ['neige', 'tombe', 'sur', 'toits'], answer: 1 },
  { q: 'Hier, j’ai visité un musée.', options: ['Hier', 'j’', 'ai visité', 'musée'], answer: 2 },
  { q: 'Demain, vous partirez en classe verte.', options: ['Demain', 'vous', 'partirez', 'classe'], answer: 2 },
]

/** Quel est le temps du verbe ? */
export const CE2_TEMPS: MCQ[] = [
  { q: 'Nous jouons dans le jardin.', options: ['passé composé', 'présent', 'futur', 'imparfait'], answer: 1 },
  { q: 'Demain, il fera beau.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 2 },
  { q: 'Autrefois, les enfants allaient à l’école à pied.', options: ['imparfait', 'futur', 'présent', 'passé composé'], answer: 0 },
  { q: 'Hier, j’ai perdu mon bonnet.', options: ['futur', 'imparfait', 'présent', 'passé composé'], answer: 3 },
  { q: 'Tu chantais très bien.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 1 },
  { q: 'Elles finiront leur dessin.', options: ['futur', 'passé composé', 'imparfait', 'présent'], answer: 0 },
  { q: 'Le train est parti à l’heure.', options: ['imparfait', 'présent', 'passé composé', 'futur'], answer: 2 },
  { q: 'Vous regardez les étoiles.', options: ['futur', 'présent', 'imparfait', 'passé composé'], answer: 1 },
  { q: 'Nous avions un chat noir.', options: ['passé composé', 'présent', 'futur', 'imparfait'], answer: 3 },
  { q: 'Je prendrai le bus.', options: ['présent', 'futur', 'imparfait', 'passé composé'], answer: 1 },
]
/** Trouver la phrase au temps demandé. */
export const CE2_TEMPS_DEMANDE: { q: string; options: string[]; answer: number }[] = [
  { q: 'Quelle phrase est au futur ?', options: ['Je mange une pomme.', 'Je mangerai une pomme.', 'Je mangeais une pomme.', 'J’ai mangé une pomme.'], answer: 1 },
  { q: 'Quelle phrase est à l’imparfait ?', options: ['Il joue au foot.', 'Il a joué au foot.', 'Il jouait au foot.', 'Il jouera au foot.'], answer: 2 },
  { q: 'Quelle phrase est au passé composé ?', options: ['Nous avons fini.', 'Nous finissons.', 'Nous finirons.', 'Nous finissions.'], answer: 0 },
  { q: 'Quelle phrase est au présent ?', options: ['Tu étais là.', 'Tu seras là.', 'Tu as été là.', 'Tu es là.'], answer: 3 },
  { q: 'Quelle phrase est au futur ?', options: ['Elles chantaient.', 'Elles chanteront.', 'Elles chantent.', 'Elles ont chanté.'], answer: 1 },
  { q: 'Quelle phrase est à l’imparfait ?', options: ['Vous aviez froid.', 'Vous avez froid.', 'Vous aurez froid.', 'Vous avez eu froid.'], answer: 0 },
]

/** Choisir l’adjectif bien accordé dans le groupe nominal. */
export const CE2_ACCORD: MCQ[] = [
  { q: 'des fleurs …', options: ['jaune', 'jaunes', 'jaunent', 'jaunet'], answer: 1 },
  { q: 'une maison …', options: ['grand', 'grands', 'grande', 'grandes'], answer: 2 },
  { q: 'les petites …', options: ['chat', 'chats', 'chatte', 'chattes'], answer: 3 },
  { q: 'un ciel …', options: ['bleu', 'bleue', 'bleus', 'bleues'], answer: 0 },
  { q: 'de … chaussures', options: ['nouveau', 'nouvelle', 'nouveaux', 'nouvelles'], answer: 3 },
  { q: 'des chevaux …', options: ['noir', 'noire', 'noirs', 'noires'], answer: 2 },
  { q: 'une … idée', options: ['bon', 'bonne', 'bons', 'bonnes'], answer: 1 },
  { q: 'les arbres …', options: ['vert', 'verte', 'verts', 'vertes'], answer: 2 },
  { q: 'une soupe …', options: ['chaud', 'chaude', 'chauds', 'chaudes'], answer: 1 },
  { q: 'des … garçons', options: ['gentil', 'gentille', 'gentils', 'gentilles'], answer: 2 },
]

/** Classe du mot en majuscules. */
export const CE2_CLASSES: MCQ[] = [
  { q: 'Le CHIEN court dans le parc.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 1 },
  { q: 'Une PETITE souris passe.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 2 },
  { q: 'LES enfants rient.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 0 },
  { q: 'Ma cousine habite à LYON.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 3 },
  { q: 'J’ai un pull ROUGE.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 2 },
  { q: 'PAUL joue du piano.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 3 },
  { q: 'Il mange UNE poire.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 0 },
  { q: 'La TABLE est en bois.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 1 },
  { q: 'Ce GRAND arbre est vieux.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 2 },
  { q: 'Nous partons à MARSEILLE.', options: ['déterminant', 'nom commun', 'adjectif', 'nom propre'], answer: 3 },
]

/** Synonyme du mot en majuscules, deviné grâce à la phrase. */
export const CE2_SYNO: MCQ[] = [
  { q: 'Le chien est très CONTENT de voir son maître.', options: ['triste', 'heureux', 'fatigué', 'méchant'], answer: 1 },
  { q: 'Ce sac est trop LOURD pour moi.', options: ['pesant', 'léger', 'joli', 'petit'], answer: 0 },
  { q: 'Il a fait une CHUTE dans l’escalier.', options: ['course', 'danse', 'tombée', 'montée'], answer: 2 },
  { q: 'La maîtresse nous DEMANDE de nous taire.', options: ['interdit', 'oublie', 'dit', 'raconte'], answer: 2 },
  { q: 'Le lion est un animal FÉROCE.', options: ['gentil', 'sauvage et dangereux', 'minuscule', 'endormi'], answer: 1 },
  { q: 'Après la course, Léo est ÉPUISÉ.', options: ['très fatigué', 'en forme', 'pressé', 'affamé'], answer: 0 },
  { q: 'Ce film est vraiment AMUSANT.', options: ['ennuyeux', 'drôle', 'long', 'effrayant'], answer: 1 },
  { q: 'Il faut BÂTIR un mur solide.', options: ['casser', 'peindre', 'construire', 'sauter'], answer: 2 },
  { q: 'La rue est DÉSERTE la nuit.', options: ['vide', 'bruyante', 'éclairée', 'pleine'], answer: 0 },
  { q: 'Elle a DÉNICHÉ un trésor au grenier.', options: ['perdu', 'trouvé', 'caché', 'vendu'], answer: 1 },
]

/** Trouver l’intrus (le mot qui n’est pas de la même famille). */
export const CE2_FAMILLES: MCQ[] = [
  { q: 'Trouve l’intrus.', options: ['jardin', 'jardiner', 'jardinier', 'jambe'], answer: 3 },
  { q: 'Trouve l’intrus.', options: ['dent', 'dentiste', 'ardent', 'dentifrice'], answer: 2 },
  { q: 'Trouve l’intrus.', options: ['lait', 'laitier', 'laid', 'laitage'], answer: 2 },
  { q: 'Trouve l’intrus.', options: ['chanter', 'chanteur', 'chanson', 'chandelle'], answer: 3 },
  { q: 'Trouve l’intrus.', options: ['terre', 'terrain', 'terrible', 'enterrer'], answer: 2 },
  { q: 'Trouve l’intrus.', options: ['froid', 'refroidir', 'frotter', 'froideur'], answer: 2 },
  { q: 'Trouve l’intrus.', options: ['dessin', 'dessiner', 'dessinateur', 'dessert'], answer: 3 },
  { q: 'Trouve l’intrus.', options: ['nager', 'nageur', 'natation', 'neige'], answer: 3 },
  { q: 'Trouve l’intrus.', options: ['porte', 'portail', 'porc', 'portier'], answer: 2 },
  { q: 'Trouve l’intrus.', options: ['long', 'longueur', 'allonger', 'loup'], answer: 3 },
]

/** Phrases à trou : choisir le mot qui donne un sens correct. */
export const CE2_TROUS: MCQ[] = [
  { q: 'Pour couper le pain, j’utilise un …', options: ['couteau', 'cahier', 'nuage', 'savon'], answer: 0 },
  { q: 'Le soleil se couche le …', options: ['matin', 'soir', 'midi', 'lundi'], answer: 1 },
  { q: 'Quand il pleut, je prends mon …', options: ['vélo', 'maillot', 'parapluie', 'goûter'], answer: 2 },
  { q: 'Le facteur apporte une … à mon père.', options: ['lettre', 'baleine', 'montagne', 'chanson'], answer: 0 },
  { q: 'Pour voir les étoiles, il faut attendre la …', options: ['récréation', 'nuit', 'pluie', 'cantine'], answer: 1 },
  { q: 'Le pompier éteint le …', options: ['feu', 'livre', 'jardin', 'repas'], answer: 0 },
  { q: 'Mon grand-père lit le journal avec ses …', options: ['bottes', 'gants', 'lunettes', 'chaussettes'], answer: 2 },
  { q: 'L’hiver, les arbres perdent leurs …', options: ['racines', 'feuilles', 'troncs', 'oiseaux'], answer: 1 },
]

/** Phrases entendues (CE2) : choisir l’image. */
export const CE2_PHRASES: PicItem[] = [
  { say: 'Le garçon ne porte pas de chapeau.', options: ['👦🎩', '👦', '👧🎩', '👴🎩'], answer: 1 },
  { say: 'Il y a plus de pommes que de poires.', options: ['🍎🍐🍐', '🍎🍎🍐', '🍐🍐', '🍎🍐'], answer: 1 },
  { say: 'La fille donne une fleur à sa maman.', options: ['👧🌷👩', '👦🌷👩', '👧🎁👩', '👧🌷👴'], answer: 0 },
  { say: 'Le chat est poursuivi par le chien.', options: ['🐱➡️🐶', '🐶➡️🐱', '🐭➡️🐱', '🐶➡️🦴'], answer: 1 },
  { say: 'Ni le soleil ni la lune ne sont visibles.', options: ['☀️🌙', '☀️', '☁️', '🌙'], answer: 2 },
  { say: 'Le bébé pleure parce qu’il a faim.', options: ['👶😴', '👶😭🍼', '👶😀🧸', '🧒😭⚽'], answer: 1 },
  { say: 'Deux voitures et un camion attendent au feu.', options: ['🚗🚗🚚🚦', '🚗🚚🚚🚦', '🚗🚗🚦', '🚗🚗🚚'], answer: 0 },
  { say: 'La grand-mère tricote près du feu.', options: ['👵🧶🔥', '👵🍳🔥', '👴🧶🔥', '👵🧶❄️'], answer: 0 },
]

/** Fractions écrites en lettres → écriture en chiffres. */
export const CE2_FRAC_MOTS: [string, string][] = [['un demi', '1/2'], ['un tiers', '1/3'], ['un quart', '1/4'], ['trois quarts', '3/4'], ['deux tiers', '2/3'], ['cinq sixièmes', '5/6'], ['trois huitièmes', '3/8'], ['deux cinquièmes', '2/5'], ['sept dixièmes', '7/10']]

/* ============================== CM1 ============================== */

/** Textes lus seul, 4 questions (informations explicites, implicite, reprises, vocabulaire). */
export const CM1_LUS: Text[] = [
  {
    title: 'Le phare de l’île aux Mouettes',
    text: 'Depuis plus de cent ans, un phare veille sur l’île aux Mouettes. Autrefois, un gardien y vivait toute l’année : chaque soir, il montait les deux cents marches pour allumer la lampe. Aujourd’hui, la lumière s’allume toute seule grâce à un capteur, et le gardien est parti. Pourtant, les marins continuent de l’appeler « la maison de Jules », en souvenir du dernier gardien, qui avait sauvé un équipage pendant une terrible tempête.',
    qs: [
      { q: 'Pourquoi n’y a-t-il plus de gardien dans le phare ?', options: ['Le phare est fermé', 'La lumière s’allume seule', 'Il y a trop de marches', 'Les marins n’en veulent plus'], answer: 1 },
      { q: 'Qui était Jules ?', options: ['Un marin', 'Le dernier gardien du phare', 'Le capitaine du bateau', 'Un pêcheur de l’île'], answer: 1 },
      { q: 'Pourquoi les marins se souviennent-ils de lui ?', options: ['Il était très grand', 'Il avait sauvé un équipage', 'Il avait construit le phare', 'Il vendait du poisson'], answer: 1 },
      { q: 'Dans ce texte, « veille sur » veut dire…', options: ['dort sur', 'surveille et protège', 'se trouve sous', 'éclaire seulement le jour'], answer: 1 },
    ],
  },
  {
    title: 'Le concours de cerfs-volants',
    text: 'Le jour du concours, le vent était si faible que les cerfs-volants retombaient les uns après les autres. Maëlle, elle, n’avait pas l’air inquiète. Elle avait fabriqué le sien avec son oncle, en papier de soie et en baguettes de bambou : il était si léger qu’une simple brise suffisait à le soulever. Quand le jury annonça les résultats, personne ne fut surpris.',
    qs: [
      { q: 'Quel problème y avait-il le jour du concours ?', options: ['Il pleuvait', 'Le vent était trop faible', 'Le jury était absent', 'Il faisait nuit'], answer: 1 },
      { q: 'Pourquoi le cerf-volant de Maëlle volait-il ?', options: ['Il avait un moteur', 'Il était très léger', 'Il était très grand', 'Son oncle le tenait'], answer: 1 },
      { q: 'Que comprend-on à la fin ?', options: ['Maëlle a perdu', 'Maëlle a gagné', 'Le concours est annulé', 'Le jury s’est trompé'], answer: 1 },
      { q: 'Dans « le sien », « sien » désigne…', options: ['le vent', 'le cerf-volant de Maëlle', 'son oncle', 'le jury'], answer: 1 },
    ],
  },
  {
    title: 'Les castors bâtisseurs',
    text: 'Le castor est le plus grand rongeur d’Europe. Avec ses dents très solides, il abat de petits arbres pour construire des barrages sur les rivières. L’eau qui monte derrière le barrage forme un étang calme, où il installe sa hutte. L’entrée de la hutte se trouve sous l’eau : ainsi, les renards et les loups ne peuvent pas y entrer. Ces barrages sont aussi utiles à d’autres animaux, comme les grenouilles et les libellules, qui profitent de l’étang.',
    qs: [
      { q: 'À quoi servent les dents du castor ?', options: ['À attraper des poissons', 'À abattre de petits arbres', 'À creuser la terre', 'À se défendre des loups'], answer: 1 },
      { q: 'Pourquoi l’entrée de la hutte est-elle sous l’eau ?', options: ['Pour avoir frais', 'Pour que les prédateurs ne puissent pas entrer', 'Pour pêcher plus facilement', 'Pour boire'], answer: 1 },
      { q: 'Qui profite aussi des barrages ?', options: ['Les renards', 'Les grenouilles et les libellules', 'Les loups', 'Les oiseaux de mer'], answer: 1 },
      { q: 'Ce texte est…', options: ['un conte', 'un documentaire', 'une recette', 'une lettre'], answer: 1 },
    ],
  },
]

/** Textes entendus (lus deux fois). */
export const CM1_ORAUX: Text[] = [
  {
    title: 'Le message du capitaine',
    text: 'Attention, mesdames et messieurs, ici le capitaine. En raison du brouillard, notre arrivée au port de Saint-Malo est retardée d’environ quarante minutes. Pour votre sécurité, merci de rester à l’intérieur du bateau et de ne pas monter sur le pont supérieur. Le bar restera ouvert jusqu’à l’arrivée. Nous vous remercions de votre patience.',
    qs: [
      { q: 'Pourquoi le bateau est-il en retard ?', options: ['À cause d’une panne', 'À cause du brouillard', 'À cause d’une tempête', 'À cause d’un passager'], answer: 1 },
      { q: 'De combien de temps environ est le retard ?', options: ['Dix minutes', 'Quarante minutes', 'Deux heures', 'Une journée'], answer: 1 },
      { q: 'Que demande le capitaine aux passagers ?', options: ['De monter sur le pont', 'De rester à l’intérieur', 'De descendre du bateau', 'D’aller au bar'], answer: 1 },
      { q: 'Où va le bateau ?', options: ['À Brest', 'À Saint-Malo', 'À Marseille', 'À Nice'], answer: 1 },
    ],
  },
  {
    title: 'La grande migration',
    text: 'Chaque automne, des milliers de cigognes quittent l’Europe pour passer l’hiver en Afrique. Elles parcourent plus de quatre mille kilomètres. Pour économiser leurs forces, elles utilisent les courants d’air chaud qui les portent très haut dans le ciel, puis elles planent sans battre des ailes. Au printemps, elles reviennent souvent dans le même nid que l’année précédente.',
    qs: [
      { q: 'Quand les cigognes partent-elles ?', options: ['Au printemps', 'En automne', 'En été', 'Pendant l’hiver'], answer: 1 },
      { q: 'Où passent-elles l’hiver ?', options: ['En Asie', 'En Afrique', 'Au pôle Nord', 'En Amérique'], answer: 1 },
      { q: 'Comment économisent-elles leurs forces ?', options: ['Elles volent la nuit', 'Elles planent grâce à l’air chaud', 'Elles s’arrêtent chaque jour', 'Elles volent très bas'], answer: 1 },
      { q: 'Que font-elles souvent au printemps ?', options: ['Elles construisent un nouveau nid en Afrique', 'Elles retrouvent le même nid', 'Elles restent en Afrique', 'Elles changent de pays'], answer: 1 },
    ],
  },
  {
    title: 'Le trésor de la classe',
    text: 'Le jour de la rentrée, la maîtresse posa une vieille boîte en fer sur son bureau. « Cette boîte contient un trésor, dit-elle, mais elle ne s’ouvrira qu’en juin, quand vous aurez tous réussi un défi. » Pendant toute l’année, les élèves s’entraidèrent pour relever leurs défis. En juin, ils ouvrirent enfin la boîte : à l’intérieur, il y avait une photo de la classe prise le premier jour, et un mot : « Le trésor, c’est ce que vous avez construit ensemble. »',
    qs: [
      { q: 'Quand la boîte devait-elle être ouverte ?', options: ['À Noël', 'En juin', 'Le premier jour', 'Jamais'], answer: 1 },
      { q: 'Que fallait-il faire pour l’ouvrir ?', options: ['Trouver une clé', 'Que chacun réussisse un défi', 'Payer', 'Répondre à une devinette'], answer: 1 },
      { q: 'Que contenait la boîte ?', options: ['Des pièces d’or', 'Une photo de la classe et un mot', 'Des bonbons', 'Rien du tout'], answer: 1 },
      { q: 'Selon la maîtresse, quel est le vrai trésor ?', options: ['La boîte', 'Ce que la classe a construit ensemble', 'La photo', 'Les bonnes notes'], answer: 1 },
    ],
  },
]

/** Mots dictés (fréquents, invariables, lettres muettes). */
export const CM1_MOTS_DICTES = ['blanc', 'hier', 'famille', 'chocolat', 'jamais', 'main', 'regard', 'toujours', 'vague', 'lourd', 'alors', 'longtemps', 'souvent', 'pendant', 'parfois', 'beaucoup', 'aujourd’hui', 'quelquefois', 'printemps', 'dimanche', 'bientôt', 'ensemble', 'sourire', 'combien']

export const CM1_SUJET: MCQ[] = [
  { q: 'Au fond du jardin poussent de grands tournesols.', options: ['Au fond du jardin', 'poussent', 'de grands tournesols', 'du jardin'], answer: 2 },
  { q: 'Les élèves de la classe verte partiront lundi.', options: ['Les élèves de la classe verte', 'partiront', 'lundi', 'la classe verte'], answer: 0 },
  { q: 'Ma voisine et son chien se promènent chaque soir.', options: ['son chien', 'Ma voisine et son chien', 'se promènent', 'chaque soir'], answer: 1 },
  { q: 'Dans le ciel brillaient mille étoiles.', options: ['Dans le ciel', 'brillaient', 'mille étoiles', 'le ciel'], answer: 2 },
  { q: 'Elle nous a raconté une histoire drôle.', options: ['Elle', 'nous', 'une histoire drôle', 'a raconté'], answer: 0 },
  { q: 'Le train qui part de Lyon arrive à midi.', options: ['Lyon', 'Le train qui part de Lyon', 'arrive', 'à midi'], answer: 1 },
]
export const CM1_VERBE: MCQ[] = [
  { q: 'Les oiseaux construisent leur nid au printemps.', options: ['oiseaux', 'construisent', 'nid', 'printemps'], answer: 1 },
  { q: 'Ce matin, nous avons visité un musée.', options: ['matin', 'avons visité', 'un musée', 'nous'], answer: 1 },
  { q: 'Demain, tu prendras le bus avec ta sœur.', options: ['Demain', 'prendras', 'bus', 'sœur'], answer: 1 },
  { q: 'Le petit chat noir dormait près du feu.', options: ['petit', 'noir', 'dormait', 'feu'], answer: 2 },
  { q: 'Vous finissez toujours vos devoirs avant le dîner.', options: ['finissez', 'toujours', 'devoirs', 'dîner'], answer: 0 },
  { q: 'Le marchand vend des fruits très frais.', options: ['marchand', 'vend', 'fruits', 'frais'], answer: 1 },
]
export const CM1_ACCORD: MCQ[] = [
  { q: 'des chemises …', options: ['blanc', 'blanche', 'blancs', 'blanches'], answer: 3 },
  { q: 'de … voitures', options: ['beau', 'belle', 'belles', 'beaux'], answer: 2 },
  { q: 'des chevaux …', options: ['noir', 'noirs', 'noire', 'noires'], answer: 1 },
  { q: 'une … nouvelle', options: ['bon', 'bons', 'bonne', 'bonnes'], answer: 2 },
  { q: 'les … feuilles', options: ['dernier', 'derniers', 'dernière', 'dernières'], answer: 3 },
  { q: 'un vent …', options: ['froid', 'froide', 'froids', 'froides'], answer: 0 },
  { q: 'des … journaux', options: ['vieux', 'vieil', 'vieille', 'vieilles'], answer: 0 },
]
export const CM1_TEMPS: MCQ[] = [
  { q: 'Autrefois, les enfants allaient à l’école à pied.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 1 },
  { q: 'Nous partirons en vacances en juillet.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 2 },
  { q: 'Hier, j’ai rangé ma chambre.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 3 },
  { q: 'Le soleil se lève à l’est.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 0 },
  { q: 'Tu feras tes devoirs après le goûter.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 2 },
  { q: 'Ils sont venus nous voir dimanche.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 3 },
  { q: 'Elle chantait chaque soir sous la douche.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 1 },
]
export const CM1_TEMPS_PROD: MCQ[] = [
  { q: 'Demain, nous (aller) au cinéma.', options: ['allons', 'irons', 'allions', 'sommes allés'], answer: 1 },
  { q: 'Hier, tu (finir) ton puzzle.', options: ['finis', 'finiras', 'as fini', 'finissais'], answer: 2 },
  { q: 'Quand j’étais petit, je (avoir) peur du noir.', options: ['ai', 'aurai', 'avais', 'ai eu'], answer: 2 },
  { q: 'Maintenant, vous (être) prêts.', options: ['êtes', 'serez', 'étiez', 'avez été'], answer: 0 },
  { q: 'L’an prochain, elles (faire) du judo.', options: ['font', 'feront', 'faisaient', 'ont fait'], answer: 1 },
  { q: 'Ce matin, il (prendre) le train.', options: ['prend', 'prendra', 'prenait', 'a pris'], answer: 3 },
]
export const CM1_CLASSES: MCQ[] = [
  { q: 'Le chien RAPIDE attrape la balle.', options: ['nom', 'verbe', 'adjectif', 'déterminant'], answer: 2 },
  { q: 'Mon frère MANGE une pomme.', options: ['nom', 'verbe', 'adjectif', 'déterminant'], answer: 1 },
  { q: 'Ces enfants jouent dans la COUR.', options: ['nom', 'verbe', 'adjectif', 'pronom'], answer: 0 },
  { q: 'ILS regardent le ciel.', options: ['nom', 'déterminant', 'pronom', 'adjectif'], answer: 2 },
  { q: 'J’ai lu TROIS livres.', options: ['déterminant', 'adjectif', 'verbe', 'pronom'], answer: 0 },
  { q: 'Elle marche LENTEMENT.', options: ['adjectif', 'adverbe', 'nom', 'verbe'], answer: 1 },
]
export const CM1_SYNO: MCQ[] = [
  { q: 'Le randonneur était ÉPUISÉ après la montée.', options: ['très fatigué', 'très content', 'perdu', 'mouillé'], answer: 0 },
  { q: 'Il a DISSIMULÉ la clé sous le tapis.', options: ['cassé', 'caché', 'trouvé', 'perdu'], answer: 1 },
  { q: 'Le vieux château était IMMENSE.', options: ['minuscule', 'très grand', 'très vieux', 'abandonné'], answer: 1 },
  { q: 'Elle a RÉPLIQUÉ aussitôt.', options: ['répondu', 'recommencé', 'pleuré', 'oublié'], answer: 0 },
  { q: 'Le chiot était CRAINTIF.', options: ['joyeux', 'peureux', 'affamé', 'endormi'], answer: 1 },
  { q: 'Il faut PRÉSERVER la nature.', options: ['abîmer', 'dessiner', 'protéger', 'visiter'], answer: 2 },
]
export const CM1_FAMILLES: MCQ[] = [
  { q: '', options: ['terre', 'terrain', 'terrible', 'enterrer'], answer: 2 },
  { q: '', options: ['dent', 'dentiste', 'ardent', 'dentifrice'], answer: 2 },
  { q: '', options: ['fleur', 'fleuriste', 'fleuve', 'fleurir'], answer: 2 },
  { q: '', options: ['chant', 'chanteur', 'chanter', 'champ'], answer: 3 },
  { q: '', options: ['lait', 'laitier', 'laid', 'allaiter'], answer: 2 },
  { q: '', options: ['pied', 'piéton', 'pieuvre', 'piétiner'], answer: 2 },
]

/* ============================== CM2 ============================== */

export const CM2_LUS: Text[] = [
  {
    title: 'L’invention qui venait du froid',
    text: 'En 1912, Clarence Birdseye travaillait comme naturaliste au Canada. Il remarqua que les poissons pêchés par les Inuits gelaient presque instantanément dans l’air glacé et que, plusieurs mois plus tard, une fois cuits, ils avaient gardé tout leur goût. De retour aux États-Unis, il chercha à reproduire ce froid extrême à l’aide de machines. Quelques années plus tard, les premiers aliments surgelés apparaissaient dans les magasins.',
    qs: [
      { q: 'Où Clarence Birdseye a-t-il fait sa découverte ?', options: ['Aux États-Unis', 'Au Canada', 'En France', 'En Afrique'], answer: 1 },
      { q: 'Qu’a-t-il remarqué ?', options: ['Les poissons pourrissaient vite', 'Les poissons gelés rapidement gardaient leur goût', 'Les Inuits ne mangeaient pas de poisson', 'Il ne faisait pas froid'], answer: 1 },
      { q: 'Quelle invention ce texte raconte-t-il ?', options: ['Le réfrigérateur', 'Les aliments surgelés', 'La canne à pêche', 'Le four'], answer: 1 },
      { q: 'Dans ce texte, « instantanément » signifie…', options: ['très lentement', 'presque aussitôt', 'pendant des mois', 'jamais'], answer: 1 },
    ],
  },
  {
    title: 'Le dernier jour',
    text: 'Théo rangea une dernière fois ses crayons dans sa trousse. Autour de lui, ses camarades riaient et se promettaient de s’écrire pendant l’été. Lui ne disait rien. Il regardait la classe vide, les murs où l’on avait décroché les dessins, le tableau effacé. En septembre, il entrerait au collège, dans une autre ville. Quand la maîtresse lui serra la main, il sentit sa gorge se nouer et baissa vite les yeux.',
    qs: [
      { q: 'Quel jour se passe la scène ?', options: ['Le jour de la rentrée', 'Le dernier jour de l’école', 'Un jour de vacances', 'Un dimanche'], answer: 1 },
      { q: 'Comment se sent Théo ?', options: ['Très joyeux', 'Ému et un peu triste', 'En colère', 'Indifférent'], answer: 1 },
      { q: 'Pourquoi peut-on penser qu’il est triste ?', options: ['Il a perdu sa trousse', 'Il va quitter ses camarades et sa ville', 'Il a eu une mauvaise note', 'Il est malade'], answer: 1 },
      { q: '« Sa gorge se noue » montre qu’il…', options: ['a mal à la gorge', 'retient ses larmes', 'a soif', 'va chanter'], answer: 1 },
    ],
  },
  {
    title: 'Fiche : le parc national des Écrins',
    text: 'Situation : Alpes, entre Grenoble et Briançon. Création : 1973. Superficie du cœur du parc : environ 920 km². Point culminant : la barre des Écrins, 4 102 m. Animaux emblématiques : bouquetin, chamois, aigle royal, gypaète barbu. Règles dans le cœur du parc : chiens interdits, même tenus en laisse ; cueillette interdite ; camping interdit (bivouac toléré pour une nuit).',
    qs: [
      { q: 'Dans quelle montagne se trouve ce parc ?', options: ['Les Pyrénées', 'Les Alpes', 'Le Massif central', 'Les Vosges'], answer: 1 },
      { q: 'Quelle est l’altitude du point le plus haut ?', options: ['920 m', '1 973 m', '4 102 m', '4 810 m'], answer: 2 },
      { q: 'Peut-on promener son chien en laisse dans le cœur du parc ?', options: ['Oui', 'Non', 'Seulement l’été', 'Seulement la nuit'], answer: 1 },
      { q: 'Quel animal n’est pas cité comme emblématique ?', options: ['le chamois', 'le bouquetin', 'l’ours brun', 'l’aigle royal'], answer: 2 },
    ],
  },
]

export const CM2_ORAUX: Text[] = [
  {
    title: 'Flash info météo',
    text: 'Bonjour à tous. Ce mardi, un épisode de fortes pluies touche le sud-est du pays. Les départements du Gard et de l’Hérault sont placés en vigilance orange. Il est conseillé de limiter ses déplacements et de ne jamais traverser une route inondée, même en voiture. Le retour du soleil est prévu jeudi, avec des températures en hausse.',
    qs: [
      { q: 'Quelle région est touchée par les fortes pluies ?', options: ['Le nord-ouest', 'Le sud-est', 'Le centre', 'L’est'], answer: 1 },
      { q: 'Quelle est la couleur de la vigilance ?', options: ['Verte', 'Jaune', 'Orange', 'Rouge'], answer: 2 },
      { q: 'Quel conseil est donné ?', options: ['Aller voir les rivières', 'Ne jamais traverser une route inondée', 'Partir en vacances', 'Rester sur la plage'], answer: 1 },
      { q: 'Quand le soleil doit-il revenir ?', options: ['Mercredi', 'Jeudi', 'Samedi', 'Ce soir'], answer: 1 },
    ],
  },
  {
    title: 'Marie Curie',
    text: 'Marie Curie est née en Pologne en 1867. À cette époque, les femmes ne pouvaient pas étudier à l’université dans son pays. Elle partit donc à Paris, où elle étudia la physique et les mathématiques. Avec son mari Pierre, elle découvrit deux nouveaux éléments, le polonium et le radium. Elle fut la première femme à recevoir un prix Nobel, et la seule personne à en avoir reçu deux dans deux sciences différentes.',
    qs: [
      { q: 'Dans quel pays Marie Curie est-elle née ?', options: ['En France', 'En Pologne', 'En Allemagne', 'En Suède'], answer: 1 },
      { q: 'Pourquoi est-elle partie à Paris ?', options: ['Pour se marier', 'Pour pouvoir étudier à l’université', 'Pour voyager', 'Pour travailler dans une usine'], answer: 1 },
      { q: 'Quels éléments a-t-elle découverts ?', options: ['L’or et l’argent', 'Le polonium et le radium', 'L’oxygène et l’hydrogène', 'Le fer et le cuivre'], answer: 1 },
      { q: 'Qu’a-t-elle de remarquable ?', options: ['Elle a reçu deux prix Nobel dans deux sciences', 'Elle a inventé l’électricité', 'Elle a été reine de Pologne', 'Elle n’est jamais allée à l’école'], answer: 0 },
    ],
  },
  {
    title: 'Le pari d’Anouk',
    text: 'Anouk avait parié avec son grand frère qu’elle lirait un livre de trois cents pages avant la fin des vacances. Les premiers jours, elle lisait à peine dix pages par soir et commençait à regretter son pari. Puis l’histoire devint passionnante : une enquête dans un vieux musée, des indices cachés partout. Elle finit le livre une semaine avant la rentrée. Son frère lui offrit la glace promise, et Anouk lui tendit aussitôt le deuxième tome.',
    qs: [
      { q: 'Quel était le pari d’Anouk ?', options: ['Écrire un livre', 'Lire un livre de 300 pages', 'Visiter un musée', 'Manger une glace'], answer: 1 },
      { q: 'Pourquoi lit-elle plus vite ensuite ?', options: ['Son frère l’aide', 'L’histoire devient passionnante', 'Le livre est plus court', 'Elle est obligée'], answer: 1 },
      { q: 'Qu’a-t-elle gagné ?', options: ['Un livre', 'Une glace', 'Un voyage', 'Rien'], answer: 1 },
      { q: 'Pourquoi tend-elle le deuxième tome à son frère ?', options: ['Pour qu’il le range', 'Pour lui donner envie de le lire', 'Pour le lui rendre', 'Parce qu’elle ne l’aime pas'], answer: 1 },
    ],
  },
]

export const CM2_MOTS_DICTES = ['malgré', 'pourtant', 'autrefois', 'cependant', 'désormais', 'certainement', 'immédiatement', 'auparavant', 'quelqu’un', 'plusieurs', 'longtemps', 'environ', 'aujourd’hui', 'néanmoins', 'soudain', 'tellement', 'parmi', 'derrière', 'davantage', 'accueil', 'automne', 'silence', 'oiseau', 'hiver']

export const CM2_ACCORD_SV: MCQ[] = [
  { q: 'Les enfants de mon voisin … au football.', options: ['joue', 'joues', 'jouent', 'jouons'], answer: 2 },
  { q: 'Toi et moi … partir demain.', options: ['devons', 'doivent', 'devez', 'doit'], answer: 0 },
  { q: 'Dans la forêt … des cerfs.', options: ['vit', 'vivent', 'vis', 'vivons'], answer: 1 },
  { q: 'Le chat et le chien … dans le salon.', options: ['dort', 'dorment', 'dors', 'dormons'], answer: 1 },
  { q: 'Les fleurs que tu as cueillies … bon.', options: ['sent', 'sens', 'sentent', 'sentons'], answer: 2 },
  { q: 'Mes cousines … arrivées hier.', options: ['est', 'sont', 'ont', 'sommes'], answer: 1 },
]
export const CM2_COMPLEMENT: MCQ[] = [
  { q: 'Léo lit un roman passionnant. Quel est le complément d’objet ?', options: ['Léo', 'lit', 'un roman passionnant', 'passionnant'], answer: 2 },
  { q: 'Nous parlons de nos vacances. Quel est le complément d’objet ?', options: ['Nous', 'parlons', 'de nos vacances', 'nos'], answer: 2 },
  { q: 'Le soir, Inès téléphone à sa grand-mère. Quel est le complément d’objet ?', options: ['Le soir', 'Inès', 'téléphone', 'à sa grand-mère'], answer: 3 },
  { q: 'Dans la cour, les élèves attendent le bus. Quel est le complément d’objet ?', options: ['Dans la cour', 'les élèves', 'attendent', 'le bus'], answer: 3 },
  { q: 'Il pense souvent à son ami. Quel mot est un complément circonstanciel ?', options: ['Il', 'pense', 'souvent', 'à son ami'], answer: 2 },
  { q: 'Hier, Paul a réparé son vélo. Quel groupe indique le temps ?', options: ['Hier', 'Paul', 'a réparé', 'son vélo'], answer: 0 },
]
export const CM2_TEMPS: MCQ[] = [
  { q: 'Le chevalier entra dans la grotte.', options: ['imparfait', 'passé simple', 'passé composé', 'futur'], answer: 1 },
  { q: 'Quand il arriva, tout le monde dormait.', options: ['présent', 'imparfait', 'futur', 'passé composé'], answer: 1 },
  { q: 'Il faisait beau ce jour-là.', options: ['passé simple', 'imparfait', 'présent', 'futur'], answer: 1 },
  { q: 'Elle avait oublié ses clés.', options: ['passé composé', 'imparfait', 'plus-que-parfait', 'passé simple'], answer: 2 },
  { q: 'Vous viendrez avec nous.', options: ['présent', 'futur', 'imparfait', 'conditionnel'], answer: 1 },
  { q: 'Ils ont gagné le match.', options: ['passé simple', 'passé composé', 'imparfait', 'plus-que-parfait'], answer: 1 },
]
export const CM2_TEMPS_PROD: MCQ[] = [
  { q: 'Soudain, le loup (surgir) du bois. (passé simple)', options: ['surgit', 'surgissait', 'a surgi', 'surgira'], answer: 0 },
  { q: 'Autrefois, les gens (s’éclairer) à la bougie.', options: ['s’éclairent', 's’éclairaient', 's’éclaireront', 'se sont éclairés'], answer: 1 },
  { q: 'Ils (partir) quand nous sommes arrivés. (plus-que-parfait)', options: ['partaient', 'étaient partis', 'sont partis', 'partirent'], answer: 1 },
  { q: 'L’été prochain, je (voir) la mer.', options: ['vois', 'verrai', 'voyais', 'vis'], answer: 1 },
  { q: 'Hier soir, nous (dîner) chez Mamie.', options: ['dînons', 'avons dîné', 'dînerons', 'dînions'], answer: 1 },
  { q: 'Les soldats (avancer) lentement. (passé simple)', options: ['avancèrent', 'avançaient', 'ont avancé', 'avanceront'], answer: 0 },
]
export const CM2_CLASSES: MCQ[] = [
  { q: 'Le vent souffle TRÈS fort.', options: ['adjectif', 'adverbe', 'préposition', 'nom'], answer: 1 },
  { q: 'Il est parti SANS son manteau.', options: ['préposition', 'conjonction', 'adverbe', 'déterminant'], answer: 0 },
  { q: 'Je voudrais du thé OU du café.', options: ['préposition', 'conjonction de coordination', 'adverbe', 'pronom'], answer: 1 },
  { q: 'LEUR maison est au bord de l’eau.', options: ['pronom', 'déterminant', 'adjectif', 'nom'], answer: 1 },
  { q: 'Je LEUR ai prêté mon livre.', options: ['pronom', 'déterminant', 'adjectif', 'adverbe'], answer: 0 },
  { q: 'La PATIENCE est une qualité.', options: ['verbe', 'adjectif', 'nom', 'adverbe'], answer: 2 },
]
export const CM2_SYNO: MCQ[] = [
  { q: 'Le spectacle était SAISISSANT.', options: ['ennuyeux', 'très impressionnant', 'trop long', 'gratuit'], answer: 1 },
  { q: 'Il a ABANDONNÉ son projet.', options: ['terminé', 'renoncé à', 'commencé', 'présenté'], answer: 1 },
  { q: 'Cette région est très ARIDE.', options: ['sèche', 'peuplée', 'froide', 'riche'], answer: 0 },
  { q: 'Elle a FRANCHI la rivière.', options: ['longé', 'traversé', 'regardé', 'remonté'], answer: 1 },
  { q: 'Le témoin a été FORMEL.', options: ['hésitant', 'très sûr de lui', 'poli', 'absent'], answer: 1 },
  { q: 'Le roi était REDOUTÉ par ses ennemis.', options: ['aimé', 'craint', 'oublié', 'aidé'], answer: 1 },
]
export const CM2_FAMILLES: MCQ[] = [
  { q: '', options: ['mer', 'marin', 'maritime', 'mercredi'], answer: 3 },
  { q: '', options: ['jour', 'journal', 'journée', 'jouer'], answer: 3 },
  { q: '', options: ['porte', 'portail', 'portière', 'portrait'], answer: 3 },
  { q: '', options: ['ami', 'amitié', 'amical', 'amidon'], answer: 3 },
  { q: '', options: ['nuit', 'nuitée', 'nuisible', 'minuit'], answer: 2 },
  { q: '', options: ['vol', 'voler', 'volcan', 'envol'], answer: 2 },
]
export const CM2_DECIMAUX_DITS: [string, string][] = [['quinze centièmes', '0,15'], ['trois unités et sept dixièmes', '3,7'], ['deux unités et huit centièmes', '2,08'], ['quarante-deux centièmes', '0,42'], ['douze unités et cinq dixièmes', '12,5'], ['six centièmes', '0,06'], ['un et vingt-cinq centièmes', '1,25'], ['neuf dixièmes', '0,9']]
