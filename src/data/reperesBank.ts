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
  { q: 'Trouve l’intrus.', options: ['dent', 'dentiste', 'dentelle', 'dentifrice'], answer: 2 },
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
