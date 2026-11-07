from dsl import Q, N, M, O, F, lesson

def autres_cm2():
    S = lambda s, n: f'cm2-{s}-{n:02d}'
    # ================= SCIENCES ET TECHNOLOGIE =================
    lesson(S('st', 1), 'Identifier et séparer des mélanges', 'Un mélange homogène (eau salée) semble uniforme ; un mélange hétérogène (eau et sable) laisse voir ses constituants. On sépare par décantation, filtration, évaporation, tamisage ou aimantation. Un liquide saturé ne peut plus dissoudre de sel.', [
        Q('L’eau salée est un mélange…', 'homogène', 'hétérogène', 'pur', 'solide', ex='On ne distingue pas le sel.'),
        Q('L’eau boueuse est un mélange…', 'hétérogène', 'homogène', 'pur', 'gazeux', ex='On voit les particules.'),
        Q('Pour séparer des cailloux du sable, on utilise…', 'un tamis', 'un aimant', 'l’évaporation', 'un thermomètre', ex='Tamisage selon la taille.'),
        Q('Une eau filtrée est-elle forcément potable ?', 'Non, elle peut contenir des microbes ou des substances dissoutes', 'Oui toujours', 'Oui si elle est froide', 'Oui si elle est claire', ex='Le filtre ne retient pas tout.'),
        Q('Une solution saturée…', 'ne peut plus dissoudre de soluté', 'est vide', 'contient seulement de l’huile', 'est gelée', ex='Le sel se dépose au fond.'),
        O('Remets dans l’ordre pour obtenir du sel propre à partir de sable salé.', ['Mélanger avec de l’eau', 'Filtrer pour retirer le sable', 'Faire évaporer l’eau', 'Récupérer le sel'], ex='Plusieurs techniques enchaînées.'),
        Q('Dans une station d’épuration, on…', 'nettoie les eaux usées avant de les rejeter', 'fabrique de l’eau gazeuse', 'stocke le pétrole', 'produit du sel', ex='Traitement de l’eau.'),
        M('Associe chaque mélange à sa technique.', [('eau + huile', 'décantation'), ('eau + sel', 'évaporation'), ('fer + sable', 'aimantation')], ex='Techniques de séparation.'),
    ])
    lesson(S('st', 2), 'Décrire et comparer des mouvements', 'Un mouvement se décrit par sa trajectoire (rectiligne, circulaire, curviligne) et sa vitesse (constante, accélérée, ralentie). La vitesse = distance ÷ durée. Un objet peut être immobile par rapport à un repère et en mouvement par rapport à un autre.', [
        Q('Une voiture qui roule sur une route droite a une trajectoire…', 'rectiligne', 'circulaire', 'immobile', 'courbe forcément', ex='En ligne droite.'),
        Q('La pointe d’une aiguille de montre a une trajectoire…', 'circulaire', 'rectiligne', 'en zigzag', 'immobile', ex='Elle tourne en rond.'),
        N('Un cycliste parcourt 60 km en 3 h. Vitesse en km/h ?', 20, ex='60 ÷ 3 = 20.'),
        N('Un train roule à 300 km/h pendant 2 h. Distance (km) ?', 600, ex='300 × 2 = 600.'),
        Q('Dans un train, ton voisin assis est immobile par rapport…', 'au train', 'au sol', 'aux arbres', 'à la gare', ex='Le mouvement dépend du repère.'),
        Q('Une balle qui tombe va…', 'de plus en plus vite', 'de moins en moins vite', 'à vitesse constante', 'vers le haut', ex='Mouvement accéléré.'),
        Q('Un vélo qui freine a un mouvement…', 'ralenti', 'accéléré', 'circulaire', 'uniforme', ex='Sa vitesse diminue.'),
        N('Un escargot avance de 6 m en 2 heures. Combien de mètres par heure ?', 3, ex='6 ÷ 2 = 3.'),
    ])
    lesson(S('st', 3), 'Repérer des sources et conversions d’énergie', 'L’énergie permet de chauffer, éclairer, mettre en mouvement. Sources renouvelables : soleil, vent, eau, bois. Non renouvelables : pétrole, gaz, charbon, uranium. Une éolienne convertit l’énergie du vent en électricité.', [
        Q('Quelle source d’énergie est renouvelable ?', 'le vent', 'le pétrole', 'le charbon', 'le gaz naturel', ex='Elle ne s’épuise pas.'),
        Q('Quelle source est non renouvelable ?', 'le pétrole', 'le soleil', 'le vent', 'l’eau des rivières', ex='Stock limité, formé en millions d’années.'),
        Q('Un panneau photovoltaïque convertit…', 'la lumière en électricité', 'le vent en chaleur', 'l’eau en pétrole', 'le son en lumière', ex='Énergie solaire.'),
        Q('Un barrage hydroélectrique utilise…', 'l’eau qui coule', 'le charbon', 'le vent', 'le gaz', ex='Énergie hydraulique.'),
        Q('Dans une lampe, l’énergie électrique devient…', 'lumière et un peu de chaleur', 'du vent', 'de l’eau', 'du son seulement', ex='Conversion d’énergie.'),
        Q('Brûler du pétrole ou du charbon rejette…', 'du dioxyde de carbone qui réchauffe le climat', 'de l’oxygène pur', 'de l’eau potable', 'rien', ex='Gaz à effet de serre.'),
        M('Associe chaque installation à sa source.', [('Éolienne', 'vent'), ('Panneau solaire', 'soleil'), ('Barrage', 'eau')], ex='Énergies renouvelables.'),
        Q('Notre corps tire son énergie…', 'des aliments', 'de l’électricité', 'du soleil directement', 'du vent', ex='L’alimentation fournit l’énergie.'),
    ])
    lesson(S('st', 4), 'Comprendre les signaux et construire un circuit', 'Un circuit électrique fermé permet au courant de circuler : pile, fils, ampoule, interrupteur. Un circuit ouvert ne fonctionne pas. Un signal transmet une information : lumineux (feu), sonore (sonnerie), électrique.', [
        Q('Pour que l’ampoule s’allume, le circuit doit être…', 'fermé', 'ouvert', 'coupé', 'mouillé', ex='Le courant fait le tour.'),
        Q('L’interrupteur ouvert…', 'coupe le courant', 'allume la lampe', 'recharge la pile', 'n’a pas d’effet', ex='Circuit ouvert.'),
        Q('Quel matériau est conducteur ?', 'le cuivre', 'le plastique', 'le bois sec', 'le caoutchouc', ex='Métal.'),
        Q('Pourquoi ne jamais toucher une prise électrique avec un objet métallique ?', 'Risque d’électrocution', 'Pour ne pas la salir', 'Pour économiser', 'Aucune raison', ex='Le courant du secteur est dangereux.'),
        Q('Un feu tricolore transmet un signal…', 'lumineux', 'sonore', 'olfactif', 'tactile', ex='Rouge, orange, vert.'),
        Q('Une alarme incendie émet un signal…', 'sonore', 'lumineux uniquement', 'odorant', 'invisible', ex='Pour alerter.'),
        Q('Le code Morse transmet des messages avec…', 'des signaux courts et longs', 'des couleurs', 'des images', 'des odeurs', ex='Points et traits.'),
        Q('Dans un court-circuit, le courant…', 'passe sans traverser la lampe, la pile chauffe', 's’arrête', 'devient lumière', 'change de couleur', ex='Danger : échauffement.'),
    ])
    lesson(S('st', 5), 'Relier biodiversité et classification', 'On classe les êtres vivants par groupes emboîtés selon les attributs partagés : vertébrés (squelette interne), parmi eux ceux à poils (mammifères), à plumes (oiseaux)… Plus deux espèces partagent d’attributs, plus elles sont proches.', [
        Q('Les vertébrés ont tous…', 'un squelette interne et une colonne vertébrale', 'des plumes', 'des poils', 'six pattes', ex='Vertèbres.'),
        Q('Le requin et le dauphin vivent dans l’eau. Lequel est un mammifère ?', 'le dauphin', 'le requin', 'les deux', 'aucun', ex='Le dauphin a des poils à la naissance et allaite.'),
        Q('Le moustique est…', 'un insecte', 'un vertébré', 'un mammifère', 'un oiseau', ex='Six pattes, pas de squelette interne.'),
        Q('Qui est le plus proche du chat ?', 'le lion', 'le pigeon', 'la grenouille', 'la truite', ex='Ils partagent le plus d’attributs.'),
        Q('Le pingouin ne vole pas mais il est…', 'un oiseau (il a des plumes)', 'un poisson', 'un mammifère', 'un reptile', ex='On classe selon ce qu’ils ont.'),
        M('Associe chaque groupe à son attribut.', [('Oiseaux', 'plumes'), ('Mammifères', 'poils et mamelles'), ('Arachnides', 'huit pattes')], ex='Groupes.'),
        Q('La biodiversité d’une forêt diminue si…', 'on la coupe entièrement', 'on y plante des arbres locaux', 'on la protège', 'on y crée une réserve', ex='Destruction du milieu.'),
        Q('Un champignon est-il une plante ?', 'Non, c’est un groupe à part', 'Oui', 'C’est un animal', 'C’est un minéral', ex='Pas de chlorophylle.'),
    ])
    lesson(S('st', 6), 'Étudier croissance, cycles et reproduction', 'Les êtres vivants naissent, grandissent, se reproduisent et meurent : c’est le cycle de vie. Chez les plantes à fleurs, la fleur donne un fruit qui contient des graines. Chez l’humain, la reproduction nécessite une cellule de chaque parent.', [
        O('Remets le cycle d’une plante à fleurs dans l’ordre.', ['graine', 'germination', 'plante', 'fleur', 'fruit avec graines'], ex='Cycle de vie.'),
        Q('Le fruit se forme à partir…', 'de la fleur', 'de la racine', 'de la tige', 'de la feuille', ex='Après la pollinisation.'),
        Q('La pollinisation, c’est…', 'le transport du pollen d’une fleur à une autre', 'l’arrosage', 'la chute des feuilles', 'la germination', ex='Insectes, vent.'),
        Q('Un bébé humain se développe…', 'dans le ventre de sa mère pendant environ 9 mois', 'dans un œuf pondu', 'dans la terre', 'en 2 semaines', ex='Mammifère vivipare.'),
        Q('La croissance d’un enfant se voit…', 'à sa taille et à sa masse qui augmentent', 'à la couleur de ses yeux', 'à son prénom', 'à rien', ex='Courbe de croissance.'),
        Q('Le saumon remonte les rivières pour…', 'se reproduire', 'hiberner', 'chercher du sel', 'muer', ex='Il pond en eau douce.'),
        Q('La reproduction permet…', 'que l’espèce continue d’exister', 'de grandir plus vite', 'de changer d’espèce', 'de mourir', ex='Perpétuer l’espèce.'),
        Q('Le têtard qui devient grenouille subit…', 'une métamorphose', 'une germination', 'une pollinisation', 'une hibernation', ex='Transformation.'),
    ])
    lesson(S('st', 7), 'Relier alimentation, besoins et santé', 'Les aliments apportent énergie et matériaux au corps. On distingue des familles : féculents, fruits et légumes, produits laitiers, viandes-poissons-œufs, matières grasses, produits sucrés. Une alimentation équilibrée et variée, de l’eau et de l’activité physique gardent en bonne santé.', [
        Q('Quelle boisson est indispensable ?', 'l’eau', 'le soda', 'le jus sucré', 'le sirop', ex='Seule boisson indispensable.'),
        Q('Les pâtes, le riz, le pain sont…', 'des féculents', 'des produits laitiers', 'des fruits', 'des matières grasses', ex='Ils apportent de l’énergie.'),
        Q('Le yaourt et le fromage apportent surtout…', 'du calcium pour les os', 'des vitamines C', 'du sucre seulement', 'rien', ex='Produits laitiers.'),
        Q('Les fruits et légumes apportent…', 'des vitamines et des fibres', 'surtout des graisses', 'surtout du sel', 'rien d’utile', ex='À chaque repas.'),
        Q('Un repas équilibré contient…', 'des aliments de plusieurs familles', 'une seule famille', 'que des desserts', 'que de la viande', ex='Variété.'),
        Q('Le petit déjeuner est important car…', 'il donne de l’énergie pour la matinée', 'il fait grossir', 'il est inutile', 'il remplace le dîner', ex='Après la nuit.'),
        Q('Bouger chaque jour…', 'aide à rester en bonne santé', 'fatigue inutilement', 'est déconseillé', 'remplace le sommeil', ex='Au moins une heure par jour pour les enfants.'),
        M('Associe chaque aliment à sa famille.', [('Lentilles', 'féculents'), ('Pomme', 'fruits et légumes'), ('Œuf', 'viandes, poissons, œufs')], ex='Familles d’aliments.'),
    ])
    lesson(S('st', 8), 'Comprendre les transformations de la puberté', 'La puberté transforme progressivement le corps pour le rendre capable, plus tard, d’avoir des enfants. Elle commence entre 8 et 14 ans environ. Croissance, poils, voix, peau, émotions changent. Chacun a son rythme, et on peut poser ses questions à un adulte de confiance.', [
        Q('La puberté prépare le corps…', 'à devenir adulte', 'à rester enfant', 'à arrêter de grandir', 'à dormir moins', ex='Transformations naturelles.'),
        Q('Les émotions peuvent-elles changer à la puberté ?', 'Oui, c’est fréquent', 'Non jamais', 'Seulement chez les adultes', 'Seulement en été', ex='Les hormones jouent un rôle.'),
        Q('Les changements commencent-ils au même âge pour tous ?', 'Non, chacun a son rythme', 'Oui, à 10 ans pile', 'Oui, à 12 ans pile', 'Seulement pour les filles', ex='Grande diversité.'),
        Q('Une bonne hygiène à la puberté, c’est…', 'se laver chaque jour et changer de vêtements', 'se laver une fois par mois', 'mettre du parfum à la place', 'rien de particulier', ex='Transpiration accrue.'),
        Q('Si on a une question sur son corps, on peut…', 'demander à un parent, à l’infirmière ou au médecin', 'chercher seul sur des sites douteux', 'n’en parler à personne', 'avoir honte', ex='Adultes ressources.'),
        Q('Les poussées de croissance peuvent faire grandir de…', 'plusieurs centimètres par an', '1 mètre par mois', '0 cm', '50 cm par semaine', ex='Croissance rapide.'),
        Q('Comparer son corps à celui des autres…', 'n’a pas de sens : chaque corps est unique', 'est indispensable', 'montre qui est normal', 'est une règle', ex='Diversité.'),
        Q('Le sommeil à la puberté…', 'reste très important pour grandir', 'devient inutile', 'doit être supprimé', 'n’a aucun lien', ex='Hormone de croissance la nuit.'),
    ], adult='Ce thème peut ouvrir un échange : répondez simplement et rappelez à l’enfant qu’il peut toujours vous poser ses questions.')
    lesson(S('st', 9), 'Analyser besoin, fonction, matériaux et évolution', 'Analyser un objet : à quel besoin répond-il ? quelle est sa fonction ? de quels matériaux est-il fait et pourquoi ? comment a-t-il évolué ? On pense aussi à son impact : recyclage, durée de vie, énergie consommée.', [
        Q('Pourquoi les vélos modernes ont-ils souvent un cadre en aluminium ?', 'Il est léger et résistant', 'Il est transparent', 'Il est souple comme du tissu', 'Il est le moins cher de tout', ex='Choix du matériau.'),
        O('Range ces objets d’éclairage du plus ancien au plus récent.', ['bougie', 'lampe à pétrole', 'ampoule à filament', 'lampe LED'], ex='Évolution technique.'),
        Q('La LED consomme…', 'moins d’énergie qu’une ampoule à filament', 'plus d’énergie', 'de l’essence', 'du gaz', ex='Meilleur rendement.'),
        Q('Un objet réparable…', 'dure plus longtemps et produit moins de déchets', 'est toujours plus fragile', 'ne sert à rien', 'est interdit', ex='Durabilité.'),
        Q('Le cycle de vie d’un objet va…', 'de la fabrication au recyclage', 'du magasin à la poubelle seulement', 'de la poubelle au magasin', 'nulle part', ex='Extraction, fabrication, usage, fin de vie.'),
        Q('Le verre est intéressant car il est…', 'recyclable à l’infini', 'biodégradable en 1 jour', 'comestible', 'magnétique', ex='Recyclage du verre.'),
        M('Associe le matériau à une propriété.', [('Laine', 'isolant thermique'), ('Acier', 'résistant'), ('Caoutchouc', 'élastique')], ex='Propriétés des matériaux.'),
        Q('Le téléphone a évolué…', 'du téléphone fixe au smartphone', 'du smartphone au télégraphe', 'il n’a jamais changé', 'du stylo au téléphone', ex='Évolution.'),
    ])
    lesson(S('st', 10), 'Concevoir, fabriquer et tester une maquette', 'Fabriquer un objet : définir le besoin, imaginer des solutions (croquis), choisir les matériaux, fabriquer un prototype, le tester, l’améliorer. Une maquette est un modèle réduit qui permet de tester une idée.', [
        O('Remets la démarche dans l’ordre.', ['Définir le besoin', 'Imaginer et dessiner', 'Choisir les matériaux', 'Fabriquer', 'Tester et améliorer'], ex='Démarche de projet technologique.'),
        Q('Un prototype est…', 'un premier modèle pour tester', 'l’objet vendu en magasin', 'un dessin uniquement', 'un mode d’emploi', ex='On l’améliore ensuite.'),
        Q('Une maquette de pont sert à…', 'tester sa solidité avant de construire', 'jouer seulement', 'le décorer', 'rien', ex='Modèle réduit.'),
        Q('Si le test échoue, on…', 'cherche pourquoi et on améliore', 'abandonne tout', 'cache le résultat', 'recommence à l’identique', ex='Itération.'),
        Q('Pour couper du carton en sécurité, on utilise…', 'un cutter avec une règle métallique et un adulte', 'ses dents', 'un couteau de cuisine en courant', 'le feu', ex='Sécurité.'),
        N('Échelle 1/10 : la maquette mesure 15 cm. Taille réelle (cm) ?', 150, ex='15 × 10 = 150.'),
        Q('Un schéma technique utilise…', 'des mesures et des légendes', 'des couleurs au hasard', 'des émojis', 'rien', ex='Précision.'),
        Q('Travailler en équipe sur un projet permet…', 'de partager les tâches et les idées', 'de faire tout seul', 'de se disputer', 'd’aller moins vite toujours', ex='Coopération.'),
    ])
    lesson(S('st', 11), 'Programmer et corriger une suite d’instructions', 'Un algorithme est une suite d’instructions pour résoudre un problème. On le traduit en programme. Les variables mémorisent des valeurs (score, vies). On teste le programme et on corrige les bugs (débogage).', [
        Q('Une variable sert à…', 'mémoriser une valeur qui peut changer', 'dessiner', 'arrêter le programme', 'jouer un son', ex='Ex. : score.'),
        Q('Débugger, c’est…', 'trouver et corriger les erreurs', 'effacer le programme', 'ajouter des couleurs', 'éteindre l’ordinateur', ex='Débogage.'),
        Q('Le score vaut 3. On exécute « ajouter 2 au score » deux fois. Score ?', '7', '5', '3', '9', ex='3 + 2 + 2 = 7.'),
        Q('« Répéter jusqu’à ce que le chat touche le bord » est…', 'une boucle avec condition d’arrêt', 'une variable', 'un événement clavier', 'un son', ex='Boucle conditionnelle.'),
        Q('Le robot doit faire un triangle équilatéral. Il tourne de…', '120° à chaque coin', '90°', '60°', '45°', ex='Angle extérieur du triangle équilatéral.'),
        Q('Un algorithme de recette de cuisine…', 'donne des étapes dans l’ordre', 'est un ordinateur', 'n’a pas d’ordre', 'est un ingrédient', ex='Les algorithmes sont partout.'),
        Q('Si le programme ne fait pas ce qu’on veut, on…', 'l’exécute pas à pas pour trouver l’erreur', 'le jette', 'change d’ordinateur', 'attend', ex='Exécution pas à pas.'),
        O('Remets dans l’ordre.', ['Écrire l’algorithme', 'Le programmer', 'Tester', 'Corriger'], ex='Démarche de programmation.'),
    ])
    lesson(S('st', 12), 'Situer la Terre dans le système solaire', 'Le Soleil est une étoile. Huit planètes tournent autour : Mercure, Vénus, la Terre, Mars, Jupiter, Saturne, Uranus, Neptune. La Lune est le satellite naturel de la Terre. La Terre est la seule planète connue où l’on trouve la vie.', [
        Q('Le Soleil est…', 'une étoile', 'une planète', 'un satellite', 'une comète', ex='Il produit sa lumière.'),
        N('Combien de planètes dans le système solaire ?', 8, ex='Huit planètes.'),
        Q('Quelle est la planète la plus proche du Soleil ?', 'Mercure', 'Vénus', 'la Terre', 'Mars', ex='Mercure.'),
        Q('Quelle est la plus grande planète ?', 'Jupiter', 'Saturne', 'la Terre', 'Neptune', ex='Géante gazeuse.'),
        O('Range ces planètes de la plus proche à la plus éloignée du Soleil.', ['Mercure', 'Vénus', 'Terre', 'Mars'], ex='Planètes telluriques.'),
        Q('La Lune est…', 'le satellite naturel de la Terre', 'une étoile', 'une planète', 'le Soleil la nuit', ex='Elle tourne autour de la Terre.'),
        Q('Quelle planète est célèbre pour ses anneaux ?', 'Saturne', 'Mars', 'Mercure', 'Vénus', ex='Anneaux de glace et de roches.'),
        Q('La Terre est la seule planète connue…', 'où existe la vie', 'qui tourne', 'qui a une lune', 'qui est ronde', ex='Eau liquide, atmosphère.'),
    ])
    lesson(S('st', 13), 'Relier mouvements de la Terre, jour et saisons', 'La Terre tourne sur elle-même en 24 h : c’est l’alternance du jour et de la nuit. Elle tourne autour du Soleil en un an (environ 365 jours). Son axe incliné explique les saisons.', [
        N('En combien d’heures la Terre fait-elle un tour sur elle-même ?', 24, ex='Un jour.'),
        Q('La Terre fait le tour du Soleil en…', 'un an', 'un jour', 'un mois', 'une semaine', ex='Environ 365 jours.'),
        Q('Le jour et la nuit s’expliquent par…', 'la rotation de la Terre sur elle-même', 'le Soleil qui s’éteint', 'la Lune qui cache le Soleil', 'les nuages', ex='Rotation.'),
        Q('Les saisons s’expliquent par…', 'l’inclinaison de l’axe de la Terre', 'la distance Terre-Lune', 'les nuages', 'le vent', ex='Inclinaison.'),
        Q('Le Soleil semble se lever…', 'à l’est', 'à l’ouest', 'au nord', 'au sud', ex='Il se couche à l’ouest.'),
        Q('Quand c’est l’été en France, en Australie c’est…', 'l’hiver', 'l’été aussi', 'le printemps toujours', 'la nuit', ex='Hémisphères opposés.'),
        Q('En été en France, les jours sont…', 'plus longs que les nuits', 'plus courts', 'identiques toute l’année', 'absents', ex='Solstice d’été vers le 21 juin.'),
        N('Combien de jours dans une année bissextile ?', 366, ex='Tous les 4 ans environ.'),
    ])
    lesson(S('st', 14), 'Comprendre les relations dans un écosystème', 'Dans un écosystème, les êtres vivants sont reliés : réseaux alimentaires, abris, pollinisation. Si une espèce disparaît, d’autres sont touchées. Les humains modifient les écosystèmes et peuvent les protéger.', [
        Q('Un réseau alimentaire, c’est…', 'plusieurs chaînes alimentaires reliées', 'une seule chaîne', 'un filet de pêche', 'un magasin', ex='Interconnexions.'),
        Q('Si les abeilles disparaissent…', 'beaucoup de plantes seront moins pollinisées', 'rien ne change', 'il y aura plus de fruits', 'les fleurs pousseront mieux', ex='Rôle des pollinisateurs.'),
        Q('Le producteur d’un écosystème est…', 'la plante verte', 'le renard', 'le champignon', 'le loup', ex='Elle fabrique sa matière.'),
        Q('Le loup est un…', 'prédateur', 'producteur', 'décomposeur', 'végétal', ex='Il chasse.'),
        Q('Introduire une espèce étrangère dans un milieu peut…', 'déséquilibrer l’écosystème', 'toujours l’enrichir', 'n’avoir aucun effet', 'le refroidir', ex='Espèces invasives.'),
        Q('Une mare polluée…', 'perd une partie de ses espèces', 'en gagne beaucoup', 'reste identique', 'devient une forêt', ex='Pollution.'),
        Q('Le compost montre le rôle…', 'des décomposeurs', 'des prédateurs', 'des herbivores', 'des oiseaux', ex='Recyclage de la matière.'),
        Q('Une réserve naturelle sert à…', 'protéger un écosystème', 'construire des immeubles', 'chasser librement', 'stocker des déchets', ex='Protection.'),
    ])
    lesson(S('st', 15), 'Étudier ressources, risques naturels et impacts humains', 'Les ressources naturelles (eau, bois, minerais, sol) sont utilisées par l’humain ; certaines s’épuisent. Les risques naturels (inondation, séisme, tempête, éruption) peuvent toucher les populations. On les prévient par des règles d’urbanisme, des alertes et des comportements adaptés.', [
        Q('Une ressource qui s’épuise si on l’exploite trop est…', 'non renouvelable ou fragile', 'infinie', 'invisible', 'artificielle', ex='Ex. : pétrole, nappes d’eau.'),
        Q('En cas d’alerte inondation, on…', 'monte dans les étages et suit les consignes', 'va voir la rivière', 'prend sa voiture dans l’eau', 'descend à la cave', ex='Mise à l’abri.'),
        Q('En cas de séisme à l’intérieur, on…', 'se protège sous une table solide', 'court dans l’escalier', 'prend l’ascenseur', 'se met près des vitres', ex='Consignes de sécurité.'),
        Q('Construire en zone inondable…', 'augmente le risque', 'diminue le risque', 'n’a pas d’effet', 'est conseillé', ex='Urbanisme.'),
        Q('La déforestation entraîne…', 'la perte de biodiversité et l’érosion des sols', 'plus d’oxygène', 'plus d’animaux', 'rien', ex='Impact humain.'),
        Q('Le réchauffement climatique est surtout causé par…', 'les gaz à effet de serre émis par les activités humaines', 'la Lune', 'les volcans uniquement', 'les vaches seules', ex='Consensus scientifique.'),
        Q('Le PPMS à l’école sert à…', 'savoir quoi faire en cas de risque majeur', 'organiser la cantine', 'noter les élèves', 'choisir les sorties', ex='Plan particulier de mise en sûreté.'),
        Q('Économiser l’eau permet…', 'de préserver une ressource précieuse', 'de la gaspiller', 'rien', 'de polluer', ex='Ressource fragile.'),
    ])
    lesson(S('st', 16), 'Mener une démarche scientifique et présenter un compte rendu', 'Un compte rendu d’expérience présente : la question, l’hypothèse, le matériel, le protocole, les résultats (tableau, graphique) et la conclusion. On compare ses résultats avec ceux des autres groupes.', [
        O('Remets les parties d’un compte rendu dans l’ordre.', ['Question', 'Hypothèse', 'Protocole', 'Résultats', 'Conclusion'], ex='Structure.'),
        Q('Le protocole, c’est…', 'la description précise de l’expérience', 'la conclusion', 'le titre', 'une hypothèse', ex='Pour qu’un autre puisse la refaire.'),
        Q('Une expérience « témoin » sert à…', 'comparer avec l’expérience où l’on change un facteur', 'décorer', 'remplacer l’expérience', 'rien', ex='Référence.'),
        Q('Pour montrer l’évolution d’une température dans le temps, on utilise…', 'un graphique en courbe', 'un dessin libre', 'un poème', 'une carte', ex='Évolution.'),
        Q('Si les groupes obtiennent des résultats différents, on…', 'cherche les causes et on refait l’expérience', 'garde le résultat préféré', 'abandonne', 'triche', ex='Rigueur.'),
        Q('La conclusion répond…', 'à la question de départ', 'à une autre question', 'à rien', 'au titre', ex='Retour à la question.'),
        Q('Un scientifique honnête…', 'présente ses résultats même s’ils contredisent son idée', 'cache les résultats gênants', 'invente des mesures', 'copie les autres', ex='Éthique scientifique.'),
        Q('Une source fiable pour une recherche est…', 'un livre documentaire ou un site scientifique reconnu', 'une rumeur', 'un commentaire anonyme', 'un rêve', ex='Vérifier ses sources.'),
    ])
    # ================= HISTOIRE =================
    lesson(S('hi', 1), 'Utiliser une chronologie et confronter des documents', 'Pour comprendre une période, on situe les événements sur une frise et on confronte plusieurs documents : témoignage, photo, affiche, texte officiel. Deux documents peuvent donner des points de vue différents sur un même événement.', [
        Q('En quel siècle est 1914 ?', 'XXe siècle', 'XIXe siècle', 'XXIe siècle', 'XVIIIe siècle', ex='De 1901 à 2000.'),
        Q('En quel siècle est 1870 ?', 'XIXe siècle', 'XVIIIe siècle', 'XXe siècle', 'XVIIe siècle', ex='De 1801 à 1900.'),
        N('Combien d’années entre 1789 et 1914 ?', 125, ex='1914 − 1789 = 125.'),
        Q('Confronter deux documents, c’est…', 'comparer ce qu’ils disent et leurs points de vue', 'les découper', 'n’en lire qu’un', 'les recopier', ex='Esprit critique.'),
        Q('Une affiche de propagande…', 'cherche à convaincre, pas forcément à dire vrai', 'est toujours neutre', 'est une photo réelle', 'est un manuel', ex='Méfiance.'),
        Q('Un témoignage de soldat est…', 'une source précieuse mais personnelle', 'une vérité générale', 'un roman inventé', 'sans intérêt', ex='Point de vue individuel.'),
        O('Range ces événements dans l’ordre.', ['Révolution française', 'Première Guerre mondiale', 'Seconde Guerre mondiale'], ex='1789, 1914, 1939.'),
        Q('L’époque contemporaine commence…', 'en 1789', 'en 476', 'en 1492', 'en 2000', ex='Avec la Révolution.'),
    ])
    lesson(S('hi', 2), 'Comprendre l’installation de la République et de l’école', 'La IIIe République s’installe à partir de 1870. Elle établit des symboles (Marianne, 14 juillet, Marseillaise). Avec Jules Ferry (lois de 1881-1882), l’école devient gratuite, obligatoire de 6 à 13 ans et laïque.', [
        Q('Grâce aux lois Jules Ferry, l’école devient…', 'gratuite, obligatoire et laïque', 'payante et facultative', 'réservée aux garçons', 'religieuse', ex='1881-1882.'),
        Q('Quel ministre est associé à l’école obligatoire ?', 'Jules Ferry', 'Napoléon', 'Louis XIV', 'Victor Hugo', ex='Jules Ferry.'),
        Q('La IIIe République commence en…', '1870', '1789', '1914', '1958', ex='Après la défaite contre la Prusse.'),
        Q('Marianne est…', 'un symbole de la République', 'une reine', 'une sainte', 'une ville', ex='Allégorie.'),
        Q('L’hymne national est…', 'La Marseillaise', 'Frère Jacques', 'Au clair de la lune', 'L’Internationale', ex='Chant de 1792.'),
        Q('L’école laïque signifie…', 'qu’elle est neutre vis-à-vis des religions', 'qu’on y interdit de penser', 'qu’elle est payante', 'qu’on y prie', ex='Neutralité religieuse.'),
        Q('Le 14 juillet devient fête nationale en…', '1880', '1789', '1945', '2000', ex='Choisi par la IIIe République.'),
        Q('Pourquoi rendre l’école obligatoire ?', 'Pour que tous les enfants apprennent à lire, écrire, compter', 'Pour occuper les enfants', 'Pour remplacer les parents', 'Sans raison', ex='Former des citoyens.'),
    ])
    lesson(S('hi', 3), 'Relier libertés, égalité, laïcité et citoyenneté', 'La République garantit des libertés : de la presse (1881), d’association (1901), de conscience. La loi de 1905 sépare les Églises et l’État : c’est la laïcité. Les femmes obtiennent le droit de vote en 1944.', [
        N('En quelle année la loi sépare-t-elle les Églises et l’État ?', 1905, ex='Loi de 1905.'),
        Q('La laïcité garantit…', 'la liberté de croire ou de ne pas croire', 'l’interdiction des religions', 'une religion officielle', 'le vote obligatoire', ex='Neutralité de l’État.'),
        N('En quelle année les femmes obtiennent-elles le droit de vote en France ?', 1944, ex='Premier vote en 1945.'),
        Q('La loi de 1901 permet de…', 'créer librement des associations', 'voter à 18 ans', 'aller à l’école', 'abolir l’esclavage', ex='Liberté d’association.'),
        Q('La liberté de la presse permet…', 'de publier des journaux librement', 'd’interdire les journaux', 'de censurer', 'rien', ex='Loi de 1881.'),
        Q('Être citoyen, c’est notamment…', 'avoir des droits et des devoirs, voter à partir de 18 ans', 'ne rien faire', 'obéir au roi', 'payer pour aller à l’école', ex='Citoyenneté.'),
        Q('Le suffrage universel masculin date de…', '1848', '1944', '1789', '2000', ex='Hommes de plus de 21 ans.'),
        O('Range dans l’ordre chronologique.', ['Liberté de la presse', 'Liberté d’association', 'Séparation des Églises et de l’État', 'Droit de vote des femmes'], ex='1881, 1901, 1905, 1944.'),
    ])
    lesson(S('hi', 4), 'Comprendre les transformations de l’âge industriel', 'Au XIXe siècle, l’industrialisation transforme la France : machines à vapeur, usines, chemins de fer, charbon. Beaucoup de paysans partent travailler en ville : c’est l’exode rural. Les ouvriers ont des conditions de travail très dures.', [
        Q('Quelle invention est au cœur de la révolution industrielle ?', 'la machine à vapeur', 'l’ordinateur', 'l’avion', 'le téléphone portable', ex='Énergie du charbon.'),
        Q('Quelle source d’énergie alimente les usines au XIXe siècle ?', 'le charbon', 'le soleil', 'le nucléaire', 'le vent', ex='Charbon.'),
        Q('L’exode rural, c’est…', 'le départ des campagnes vers les villes', 'le départ des villes vers la mer', 'un voyage en train', 'une fête', ex='Recherche de travail.'),
        Q('Au XIXe siècle, les enfants ouvriers…', 'travaillaient parfois dans les usines et les mines', 'allaient tous à l’école', 'ne travaillaient jamais', 'étaient en vacances', ex='Travail des enfants.'),
        Q('Le chemin de fer permet…', 'de transporter rapidement marchandises et voyageurs', 'de voler', 'de naviguer', 'de rien', ex='Développement des transports.'),
        Q('Un ouvrier travaille…', 'dans une usine', 'dans un château', 'dans un monastère', 'à la cour du roi', ex='Classe ouvrière.'),
        Q('Les syndicats ont été créés pour…', 'défendre les droits des travailleurs', 'construire des usines', 'vendre du charbon', 'remplacer les patrons', ex='Autorisés en 1884.'),
        Q('Germinal, roman d’Émile Zola, décrit la vie…', 'des mineurs', 'des chevaliers', 'des rois', 'des astronautes', ex='Roman de 1885.'),
    ])
    lesson(S('hi', 5), 'Comparer travail, techniques, villes et campagnes au XIXe siècle', 'Au XIXe siècle, les villes grandissent (Paris est transformé par Haussmann), avec de grands boulevards, l’éclairage au gaz, puis l’électricité. Les campagnes restent nombreuses mais se modernisent lentement. De nouvelles inventions changent la vie : photographie, électricité, téléphone, automobile.', [
        Q('Qui a transformé Paris avec de grands boulevards ?', 'le baron Haussmann', 'Louis XIV', 'Jules Ferry', 'Napoléon Bonaparte', ex='Sous Napoléon III.'),
        Q('Quelle invention date du XIXe siècle ?', 'la photographie', 'Internet', 'l’imprimerie', 'la roue', ex='Années 1820-1830.'),
        Q('La tour Eiffel a été construite pour…', 'l’Exposition universelle de 1889', 'la Révolution', 'la guerre de 1914', 'les Jeux olympiques de 2024', ex='1889.'),
        Q('Au XIXe siècle, la majorité des Français vivaient encore…', 'à la campagne', 'en ville', 'à l’étranger', 'en mer', ex='Jusqu’au début du XXe siècle.'),
        Q('Louis Pasteur a mis au point…', 'le vaccin contre la rage', 'le téléphone', 'l’avion', 'l’imprimerie', ex='1885.'),
        Q('Les grands magasins apparaissent…', 'dans les villes au XIXe siècle', 'au Moyen Âge', 'dans l’Antiquité', 'en 2010', ex='Ex. : Le Bon Marché.'),
        M('Associe l’invention à son inventeur.', [('Vaccin contre la rage', 'Pasteur'), ('Cinématographe', 'frères Lumière'), ('Ampoule électrique', 'Edison')], ex='Inventions du XIXe siècle.'),
        Q('En ville, les ouvriers vivent souvent…', 'dans des logements petits et insalubres', 'dans des châteaux', 'dans de grandes villas', 'sous des tentes', ex='Conditions de vie difficiles.'),
    ])
    lesson(S('hi', 6), 'Situer et comprendre la Première Guerre mondiale', 'La Première Guerre mondiale (1914-1918) oppose notamment la France, le Royaume-Uni, la Russie (puis les États-Unis) à l’Allemagne et l’Autriche-Hongrie. Les soldats (« poilus ») vivent dans les tranchées. La bataille de Verdun (1916) est terrible. L’armistice est signé le 11 novembre 1918. Environ 10 millions de soldats meurent.', [
        Q('Quelles sont les dates de la Première Guerre mondiale ?', '1914-1918', '1939-1945', '1870-1871', '1789-1799', ex='1914-1918.'),
        Q('Comment surnommait-on les soldats français ?', 'les poilus', 'les grognards', 'les chevaliers', 'les sans-culottes', ex='Les poilus.'),
        Q('Où vivaient les soldats sur le front ?', 'dans les tranchées', 'dans des châteaux', 'dans des hôtels', 'dans des bateaux', ex='Fossés creusés dans la terre.'),
        Q('Quelle bataille de 1916 est restée célèbre en France ?', 'Verdun', 'Waterloo', 'Marignan', 'Alésia', ex='Plus de 300 000 morts.'),
        Q('Quel jour est signé l’armistice ?', 'le 11 novembre 1918', 'le 8 mai 1945', 'le 14 juillet 1789', 'le 1er janvier 1900', ex='Jour férié.'),
        Q('Les monuments aux morts dans les villages rappellent…', 'les soldats morts pendant la guerre', 'les rois', 'les fêtes', 'les écrivains', ex='Mémoire.'),
        Q('Pendant la guerre, à l’arrière, les femmes…', 'remplacent les hommes dans les usines et les champs', 'ne travaillent pas', 'partent toutes au front', 'votent', ex='Rôle des femmes.'),
        Q('Le 11 novembre est aujourd’hui…', 'un jour de commémoration', 'la fête nationale', 'la fête du travail', 'Noël', ex='Souvenir.'),
    ])
    lesson(S('hi', 7), 'Comprendre la Seconde Guerre mondiale, la Résistance et les génocides', 'La Seconde Guerre mondiale (1939-1945) est déclenchée par l’Allemagne nazie d’Hitler. La France est vaincue et occupée en 1940 ; le gouvernement de Vichy collabore. Le général de Gaulle appelle à résister (18 juin 1940). Les nazis organisent l’extermination des Juifs d’Europe (Shoah) et des Tsiganes. Environ 6 millions de Juifs sont assassinés. La guerre prend fin en Europe le 8 mai 1945.', [
        Q('Quelles sont les dates de la Seconde Guerre mondiale ?', '1939-1945', '1914-1918', '1870-1871', '1945-1950', ex='1939-1945.'),
        Q('Qui lance l’appel du 18 juin 1940 ?', 'le général de Gaulle', 'Jules Ferry', 'Napoléon', 'Clemenceau', ex='Depuis Londres.'),
        Q('La Résistance, c’est…', 'l’ensemble des personnes qui luttent contre l’occupant', 'une armée allemande', 'un parti nazi', 'une loi', ex='Ex. : Jean Moulin.'),
        Q('La Shoah désigne…', 'l’extermination des Juifs d’Europe par les nazis', 'une bataille', 'un traité de paix', 'une fête', ex='Génocide.'),
        Q('Un génocide est…', 'la volonté d’exterminer un peuple entier', 'une guerre ordinaire', 'une catastrophe naturelle', 'une révolution', ex='Crime contre l’humanité.'),
        Q('Que se passe-t-il le 8 mai 1945 ?', 'La fin de la guerre en Europe', 'Le début de la guerre', 'L’appel du 18 juin', 'La libération de Paris', ex='Capitulation allemande.'),
        Q('Le gouvernement de Vichy, dirigé par Pétain…', 'collabore avec l’Allemagne nazie', 'résiste aux nazis', 'est en Angleterre', 'n’existe pas', ex='Collaboration.'),
        Q('Pourquoi garder la mémoire de ces événements ?', 'Pour que de tels crimes ne se reproduisent pas', 'Pour s’en moquer', 'Ce n’est pas utile', 'Pour recommencer', ex='Devoir de mémoire.'),
    ])
    lesson(S('hi', 8), 'Découvrir la construction européenne et le monde actuel', 'Après 1945, des pays européens décident de coopérer pour garantir la paix. En 1957, six pays fondent la Communauté économique européenne. L’Union européenne compte aujourd’hui 27 pays. L’euro est la monnaie de nombreux pays de l’UE depuis 2002.', [
        Q('Pourquoi des pays européens ont-ils décidé de coopérer après 1945 ?', 'Pour garantir la paix', 'Pour faire la guerre', 'Pour supprimer les pays', 'Pour fermer les frontières', ex='Plus jamais la guerre.'),
        N('Combien de pays membres compte l’Union européenne aujourd’hui ?', 27, ex='Depuis la sortie du Royaume-Uni.'),
        Q('Quelle est la monnaie commune de nombreux pays européens ?', 'l’euro', 'le franc', 'le dollar', 'la livre', ex='Depuis 2002 en pièces et billets.'),
        Q('Le drapeau européen est…', 'bleu avec un cercle de 12 étoiles jaunes', 'bleu, blanc, rouge', 'vert avec une étoile', 'rouge avec un soleil', ex='12 étoiles.'),
        Q('Le traité de Rome (1957) a été signé par…', 'six pays dont la France et l’Allemagne', 'tous les pays du monde', 'la France seule', 'les États-Unis', ex='Fondateurs.'),
        Q('Le Parlement européen est élu…', 'par les citoyens européens', 'par le roi', 'par tirage au sort', 'par les enfants', ex='Élections européennes.'),
        Q('L’Hymne à la joie est…', 'l’hymne européen', 'l’hymne français', 'une chanson d’enfant', 'l’hymne olympique', ex='Musique de Beethoven.'),
        Q('Le 9 mai est…', 'la journée de l’Europe', 'Noël', 'le 14 juillet', 'la fête du travail', ex='Déclaration Schuman, 1950.'),
    ])
    # ================= GÉOGRAPHIE =================
    lesson(S('ge', 1), 'Lire cartes, réseaux, paysages et documents', 'Une carte peut représenter des réseaux (routes, voies ferrées, lignes de bus). Une photo de paysage se lit par plans : premier plan, second plan, arrière-plan. On croise carte, photo et texte pour comprendre un territoire.', [
        Q('Sur une photo de paysage, le premier plan est…', 'la partie la plus proche', 'le ciel', 'la partie la plus lointaine', 'le titre', ex='Lecture par plans.'),
        Q('Un réseau de transport, c’est…', 'un ensemble de lignes reliées entre elles', 'une seule route', 'une gare isolée', 'une carte postale', ex='Ex. : réseau ferré.'),
        Q('Sur une carte routière, une autoroute est souvent en…', 'rouge ou orange épais', 'bleu clair', 'vert pâle', 'invisible', ex='Légende.'),
        N('Échelle 1 cm = 50 km. Paris-Lyon mesure environ 8 cm. Distance (km) ?', 400, ex='8 × 50 = 400.'),
        Q('Une image satellite montre…', 'un territoire vu de très haut', 'un portrait', 'une ville de l’intérieur', 'un dessin inventé', ex='Vue verticale.'),
        Q('Un croquis géographique…', 'simplifie un paysage pour en garder l’essentiel', 'est une photo', 'est un tableau de nombres', 'est un roman', ex='Schéma.'),
        Q('Le centre-ville est souvent…', 'dense, avec des bâtiments anciens et des commerces', 'un champ', 'une forêt', 'un désert', ex='Organisation urbaine.'),
        Q('Une périphérie est…', 'la zone autour du centre d’une ville', 'le cœur de la ville', 'une rivière', 'une montagne', ex='Banlieue, zones commerciales.'),
    ])
    lesson(S('ge', 2), 'Comparer les déplacements quotidiens et lointains', 'On se déplace chaque jour (domicile-école, domicile-travail : mobilité quotidienne) ou plus loin (vacances, voyages : mobilité lointaine). Le choix du mode dépend de la distance, du coût, du temps et de l’offre de transport.', [
        Q('Le trajet maison-école est une mobilité…', 'quotidienne', 'lointaine', 'internationale', 'aérienne', ex='Chaque jour.'),
        Q('Un départ en vacances à l’étranger est une mobilité…', 'lointaine', 'quotidienne', 'nulle', 'piétonne', ex='Occasionnelle.'),
        Q('Un « navetteur » est une personne qui…', 'fait chaque jour l’aller-retour domicile-travail', 'vit sur un bateau', 'ne bouge jamais', 'vole en avion chaque jour', ex='Pendulaire.'),
        Q('Dans les campagnes, on dépend souvent…', 'de la voiture', 'du métro', 'du tramway', 'du téléphérique', ex='Moins de transports en commun.'),
        Q('L’heure de pointe, c’est…', 'le moment où il y a le plus de circulation', 'minuit', 'l’heure du goûter', 'le dimanche matin', ex='Matin et soir.'),
        Q('Un mode doux est…', 'la marche ou le vélo', 'l’avion', 'le camion', 'la moto', ex='Sans moteur.'),
        Q('Pour un trajet Paris-Marseille, le moyen le plus rapide en France sur rails est…', 'le TGV', 'le vélo', 'le bus urbain', 'la trottinette', ex='Environ 3 h.'),
        Q('Une piste cyclable sert à…', 'circuler à vélo en sécurité', 'garer les voitures', 'faire du ski', 'rien', ex='Aménagement.'),
    ])
    lesson(S('ge', 3), 'Relier villes, réseaux de transport et aménagements', 'Les villes sont reliées par des réseaux (routes, voies ferrées, aéroports, ports). Les grandes villes ont des transports en commun (métro, tramway, bus). On aménage pour faciliter les déplacements : gares, rocades, parkings relais.', [
        Q('Un tramway roule…', 'sur des rails en ville', 'dans l’eau', 'dans les airs', 'sous la mer', ex='Transport urbain.'),
        Q('Un aéroport est un aménagement pour…', 'les avions', 'les trains', 'les bateaux', 'les vélos', ex='Transport aérien.'),
        Q('Un port est un aménagement pour…', 'les bateaux', 'les avions', 'les trams', 'les marcheurs', ex='Ex. : Le Havre, Marseille.'),
        Q('Une rocade permet…', 'de contourner le centre-ville', 'de traverser la mer', 'de monter en montagne', 'de garer les vélos', ex='Voie autour de la ville.'),
        Q('Un parking relais sert à…', 'laisser sa voiture et prendre les transports en commun', 'réparer les voitures', 'acheter une voiture', 'dormir', ex='Intermodalité.'),
        Q('La capitale de la France est…', 'Paris', 'Lyon', 'Marseille', 'Bordeaux', ex='Paris.'),
        Q('Les lignes de TGV partent souvent…', 'de Paris en étoile', 'de Lille uniquement', 'au hasard', 'de Brest', ex='Réseau centré sur Paris.'),
        Q('Une ville bien desservie…', 'attire habitants et entreprises', 'se vide', 'n’a pas de gare', 'est isolée', ex='Attractivité.'),
    ])
    lesson(S('ge', 4), 'Comprendre les réseaux et les usages d’Internet', 'Internet transporte des données par câbles (fibre optique), ondes (4G, 5G, Wi-Fi) et satellites. Il sert à communiquer, s’informer, acheter, se former, travailler à distance. Les données sont stockées dans des centres de données.', [
        Q('La fibre optique transporte les données…', 'grâce à la lumière', 'grâce à l’eau', 'grâce au vent', 'grâce au son', ex='Très haut débit.'),
        Q('La 4G et la 5G sont…', 'des réseaux de téléphonie mobile', 'des jeux vidéo', 'des ordinateurs', 'des câbles sous-marins', ex='Ondes.'),
        Q('Le télétravail, c’est…', 'travailler à distance grâce à Internet', 'regarder la télé au travail', 'travailler la nuit', 'ne pas travailler', ex='Nouvel usage.'),
        Q('Un centre de données (data center) stocke…', 'des données sur des serveurs', 'de l’eau', 'des aliments', 'des livres papier', ex='Infrastructures.'),
        Q('Envoyer une vidéo consomme…', 'de l’énergie dans les réseaux et les serveurs', 'aucune énergie', 'de l’eau de pluie', 'du papier', ex='Sobriété numérique.'),
        Q('Le commerce en ligne permet…', 'd’acheter sans se déplacer', 'de voyager gratuitement', 'de ne jamais payer', 'rien', ex='E-commerce.'),
        Q('Un débit élevé signifie…', 'que les données circulent vite', 'que la connexion est coupée', 'que le Wi-Fi est éteint', 'que l’écran est grand', ex='Vitesse.'),
        Q('Les câbles sous-marins relient…', 'les continents entre eux', 'les maisons d’un village', 'les écrans aux claviers', 'les satellites', ex='Plus de 95 % du trafic international.'),
    ])
    lesson(S('ge', 5), 'Identifier les inégalités de connexion', 'Tout le monde n’a pas le même accès à Internet : les « zones blanches » n’ont pas de réseau. La fracture numérique concerne aussi ceux qui n’ont pas d’équipement ou ne savent pas l’utiliser. Elle existe entre pays, entre villes et campagnes.', [
        Q('Une zone blanche est…', 'un territoire sans couverture réseau', 'une zone enneigée', 'une plage', 'une zone commerciale', ex='Pas de réseau mobile.'),
        Q('La fracture numérique désigne…', 'les inégalités d’accès et d’usage du numérique', 'un écran cassé', 'une panne d’électricité', 'un virus', ex='Inégalités.'),
        Q('Les zones les moins connectées en France sont souvent…', 'des zones rurales ou de montagne', 'les centres de grandes villes', 'les aéroports', 'les gares', ex='Faible densité.'),
        Q('Une personne âgée qui ne sait pas utiliser Internet subit…', 'la fracture numérique d’usage', 'une maladie', 'une amende', 'rien', ex='Manque de formation.'),
        Q('Pour réduire la fracture numérique, on peut…', 'installer la fibre et former les gens', 'couper les réseaux', 'interdire les ordinateurs', 'rien faire', ex='Aménagement et formation.'),
        Q('Dans le monde, environ un tiers de la population…', 'n’utilise pas Internet', 'a trois téléphones', 'est sans électricité ni eau', 'vit sur la Lune', ex='Inégalités mondiales.'),
        Q('Un espace public numérique (médiathèque) permet…', 'd’accéder à Internet et d’être aidé', 'de vendre des ordinateurs', 'de jouer aux cartes uniquement', 'de dormir', ex='Inclusion.'),
        Q('Faire ses démarches administratives sans Internet devient…', 'plus difficile', 'plus facile', 'interdit', 'obligatoire', ex='Dématérialisation.'),
    ])
    lesson(S('ge', 6), 'Comprendre la place de la nature et des déchets en ville', 'En ville, la nature a sa place : parcs, arbres, jardins partagés, toits végétalisés. Ils rafraîchissent l’air et abritent la biodiversité. Une ville produit aussi beaucoup de déchets qu’il faut collecter, trier, recycler ou valoriser.', [
        Q('Les arbres en ville…', 'rafraîchissent l’air et abritent des animaux', 'réchauffent la ville', 'n’ont aucun intérêt', 'polluent', ex='Îlots de fraîcheur.'),
        Q('Un îlot de chaleur urbain est…', 'une zone de ville plus chaude que la campagne', 'une île tropicale', 'un radiateur', 'une piscine', ex='Béton et bitume.'),
        Q('Un jardin partagé est…', 'un jardin cultivé ensemble par des habitants', 'un parc privé interdit', 'une forêt', 'un supermarché', ex='Lien social et nature.'),
        Q('Le bac jaune sert souvent pour…', 'les emballages recyclables', 'les épluchures', 'le verre uniquement', 'les piles', ex='Consignes locales.'),
        Q('Une déchetterie accueille…', 'les encombrants et déchets spéciaux', 'les ordures de la cuisine seulement', 'les voitures', 'les animaux', ex='Collecte spécialisée.'),
        Q('Recycler une canette permet…', 'd’économiser du métal et de l’énergie', 'de polluer plus', 'rien', 'de fabriquer du pain', ex='Valorisation.'),
        Q('Le meilleur déchet est…', 'celui qu’on ne produit pas', 'celui qu’on brûle', 'celui qu’on enterre', 'celui qu’on jette dans la rivière', ex='Réduire à la source.'),
        Q('Un toit végétalisé…', 'isole le bâtiment et accueille la biodiversité', 'fait fuir la pluie', 'est interdit', 'chauffe la ville', ex='Aménagement durable.'),
    ])
    lesson(S('ge', 7), 'Décrire un quartier durable et proposer des aménagements', 'Un écoquartier cherche à réduire son impact : bâtiments bien isolés, énergies renouvelables, mobilités douces, espaces verts, récupération de l’eau de pluie, mixité des habitants et des activités, commerces de proximité.', [
        Q('Un écoquartier vise…', 'à réduire l’impact sur l’environnement', 'à construire le plus de parkings', 'à supprimer les arbres', 'à consommer plus d’énergie', ex='Développement durable.'),
        Q('Quel aménagement est durable ?', 'Des pistes cyclables et des arbres', 'Une autoroute au milieu du quartier', 'Des parkings partout', 'Des bâtiments mal isolés', ex='Mobilité douce et nature.'),
        Q('Récupérer l’eau de pluie sert à…', 'arroser et économiser l’eau potable', 'la boire directement', 'inonder les rues', 'rien', ex='Économie de ressource.'),
        Q('La mixité dans un quartier, c’est…', 'des habitants variés, des logements, commerces et services mêlés', 'un seul type d’habitants', 'que des bureaux', 'que des maisons vides', ex='Mixité sociale et fonctionnelle.'),
        Q('Bien isoler un bâtiment permet…', 'de consommer moins de chauffage', 'd’avoir plus froid', 'de payer plus', 'rien', ex='Économie d’énergie.'),
        Q('Des commerces de proximité permettent…', 'de faire ses courses à pied', 'de prendre plus la voiture', 'de fermer le quartier', 'rien', ex='Moins de trajets.'),
        Q('Pour proposer un aménagement, on part…', 'des besoins des habitants', 'de ses envies seules', 'du hasard', 'd’une publicité', ex='Démarche de projet.'),
        Q('Le développement durable concerne…', 'l’environnement, la société et l’économie', 'seulement l’argent', 'seulement les arbres', 'seulement les voitures', ex='Trois piliers.'),
    ])
    # ================= ANGLAIS =================
    E = lambda n: S('en', n)
    lesson(E(1), 'Présenter une personne et ses habitudes', 'To talk about daily habits, use the present simple : « I get up at seven. She goes to school by bike. He plays tennis on Saturdays. » Frequency : always, usually, sometimes, never.', [
        Q('« She usually walks to school » veut dire…', 'Elle va habituellement à l’école à pied', 'Elle ne va jamais à l’école', 'Elle court à l’école aujourd’hui', 'Elle aime l’école', ex='usually = habituellement.'),
        Q('Complète : « He ___ football every Monday. »', 'plays', 'play', 'playing', 'is play', ex='3e personne : -s.'),
        Q('« never » veut dire…', 'jamais', 'toujours', 'parfois', 'souvent', ex='never = jamais.'),
        Q('« I get up at seven o’clock » veut dire…', 'Je me lève à 7 heures', 'Je me couche à 7 heures', 'J’ai 7 ans', 'Je mange à 7 heures', ex='get up = se lever.'),
        M('Associe.', [('always', 'toujours'), ('sometimes', 'parfois'), ('usually', 'habituellement')], ex='Adverbes de fréquence.'),
        Q('Comment demander « À quelle heure tu te couches ? »', 'What time do you go to bed?', 'Where do you go to bed?', 'How old are you?', 'What is your bed?', ex='What time… ?'),
        Q('« My sister has breakfast at 8 » : que fait-elle à 8 h ?', 'Elle prend son petit déjeuner', 'Elle dort', 'Elle va à l’école', 'Elle dîne', ex='breakfast = petit déjeuner.'),
        Q('Quelle phrase est correcte ?', 'She doesn’t like Mondays.', 'She don’t like Mondays.', 'She not like Mondays.', 'She doesn’t likes Mondays.', ex='doesn’t + verbe sans -s.'),
    ])
    lesson(E(2), 'Demander et donner des indications simples', 'To ask the way : « Excuse me, where is the station, please? » To answer : « Go straight on. Turn left. Turn right. It’s next to the bank. It’s opposite the park. »', [
        Q('« Turn left » veut dire…', 'Tourne à gauche', 'Tourne à droite', 'Va tout droit', 'Arrête-toi', ex='left = gauche.'),
        Q('« Go straight on » veut dire…', 'Va tout droit', 'Fais demi-tour', 'Tourne à droite', 'Monte', ex='straight on = tout droit.'),
        Q('« It’s next to the bakery » veut dire…', 'C’est à côté de la boulangerie', 'C’est en face de la boulangerie', 'C’est dans la boulangerie', 'C’est loin de la boulangerie', ex='next to = à côté de.'),
        Q('« opposite » veut dire…', 'en face de', 'derrière', 'à côté de', 'sous', ex='Position.'),
        Q('Comment demander où est la gare ?', 'Where is the station, please?', 'What is the station?', 'Who is the station?', 'When is the station?', ex='Where = où.'),
        M('Associe.', [('Turn right', 'Tourne à droite'), ('Cross the street', 'Traverse la rue'), ('Stop', 'Arrête-toi')], ex='Indications.'),
        Q('« between the school and the park » veut dire…', 'entre l’école et le parc', 'derrière l’école', 'devant le parc', 'loin de l’école', ex='between = entre.'),
        Q('Pour commencer poliment une demande, on dit…', 'Excuse me…', 'Goodbye…', 'Hurry up…', 'Shut up…', ex='Politesse.'),
    ])
    lesson(E(3), 'Exprimer goûts, capacités et souhaits', 'Tastes : « I love / like / don’t like / hate… ». Abilities : « I can swim. I can’t play the piano. » Wishes : « I would like an ice cream. I want to be a vet. »', [
        Q('« I can swim » veut dire…', 'Je sais nager', 'Je nage maintenant', 'Je déteste nager', 'Je veux nager', ex='can = savoir/pouvoir.'),
        Q('« She can’t ride a horse » veut dire…', 'Elle ne sait pas monter à cheval', 'Elle monte à cheval', 'Elle aime les chevaux', 'Elle a un cheval', ex='can’t = ne peut pas.'),
        Q('« I would like a glass of water » veut dire…', 'Je voudrais un verre d’eau', 'J’ai un verre d’eau', 'Je bois de l’eau', 'Je déteste l’eau', ex='would like = voudrais.'),
        Q('« I want to be a doctor » exprime…', 'un souhait de métier', 'une capacité', 'un goût alimentaire', 'une heure', ex='want to be = vouloir devenir.'),
        Q('Comment dire « Je déteste les araignées » ?', 'I hate spiders.', 'I love spiders.', 'I can spiders.', 'I would spiders.', ex='hate = détester.'),
        Q('Comment demander « Sais-tu jouer de la guitare ? »', 'Can you play the guitar?', 'Do you can play the guitar?', 'You play can guitar?', 'Are you guitar?', ex='Can you… ?'),
        M('Associe.', [('I love', 'j’adore'), ('I hate', 'je déteste'), ('I can', 'je sais faire')], ex='Expressions.'),
        Q('Réponse courte à « Can you dance? »', 'Yes, I can.', 'Yes, I do.', 'Yes, I am.', 'Yes, I like.', ex='Réponse avec can.'),
    ])
    lesson(E(4), 'Comprendre des messages et récits courts', 'To understand a short message or story, identify : who? (characters), where? (place), when? (time), what happens? Use keywords, numbers and context.', [
        Q('« Hi Sam! The party is on Saturday at 3 pm at my house. Bring a cake! Mia » Quand est la fête ?', 'Samedi à 15 h', 'Dimanche à 15 h', 'Samedi à 3 h du matin', 'Vendredi', ex='Saturday at 3 pm.', passage='Hi Sam! The party is on Saturday at 3 pm at my house. Bring a cake! Mia'),
        Q('Qu’est-ce que Sam doit apporter ?', 'Un gâteau', 'Un cadeau', 'Une boisson', 'Rien', ex='Bring a cake.', passage='Hi Sam! The party is on Saturday at 3 pm at my house. Bring a cake! Mia'),
        Q('Où a lieu la fête ?', 'Chez Mia', 'Chez Sam', 'À l’école', 'Au parc', ex='at my house.', passage='Hi Sam! The party is on Saturday at 3 pm at my house. Bring a cake! Mia'),
        Q('« Yesterday, Tom lost his dog in the park. He was very sad. » Comment se sent Tom ?', 'Triste', 'Content', 'En colère', 'Fatigué', ex='sad = triste.', passage='Yesterday, Tom lost his dog in the park. He was very sad.'),
        Q('Où Tom a-t-il perdu son chien ?', 'Au parc', 'À la maison', 'À l’école', 'À la plage', ex='in the park.', passage='Yesterday, Tom lost his dog in the park. He was very sad.'),
        Q('« yesterday » veut dire…', 'hier', 'demain', 'aujourd’hui', 'la semaine prochaine', ex='yesterday = hier.'),
        Q('« pm » après une heure indique…', 'l’après-midi ou le soir', 'le matin', 'minuit', 'le week-end', ex='3 pm = 15 h.'),
        Q('Pour comprendre un récit, on cherche d’abord…', 'qui, où, quand, quoi', 'tous les mots difficiles', 'le nombre de lettres', 'la couleur du texte', ex='Questions clés.'),
    ])
    lesson(E(5), 'Lire des documents simples et suivre une recette', 'Recipes use imperatives : « Take two eggs. Mix the flour and the sugar. Add the milk. Bake for 20 minutes. » Ingredients : flour (farine), sugar (sucre), butter (beurre), eggs (œufs), milk (lait).', [
        Q('« flour » veut dire…', 'farine', 'fleur', 'four', 'fruit', ex='Faux ami.'),
        Q('« Mix the eggs and the sugar » veut dire…', 'Mélange les œufs et le sucre', 'Casse les œufs', 'Ajoute du sel', 'Cuis le sucre', ex='mix = mélanger.'),
        Q('« Bake for 20 minutes » veut dire…', 'Fais cuire au four 20 minutes', 'Attends 20 minutes', 'Mange en 20 minutes', 'Mélange 20 minutes', ex='bake = cuire au four.'),
        M('Associe.', [('butter', 'beurre'), ('milk', 'lait'), ('sugar', 'sucre')], ex='Ingrédients.'),
        O('Remets la recette dans l’ordre.', ['Take two eggs.', 'Mix with the flour.', 'Add the milk.', 'Bake for 20 minutes.'], ex='Étapes de la recette.'),
        Q('« Add a pinch of salt » : on ajoute…', 'une pincée de sel', 'beaucoup de sucre', 'du poivre', 'de l’eau', ex='pinch = pincée.'),
        Q('« 200 g of chocolate » : combien de chocolat ?', '200 grammes', '20 grammes', '2 kilos', '200 tablettes', ex='g = grammes.'),
        Q('Les verbes d’une recette en anglais sont souvent…', 'à l’impératif (mix, add, bake)', 'au passé', 'au futur', 'au conditionnel', ex='Consignes.'),
    ])
    lesson(E(6), 'Écrire une carte, une description ou un message', 'A postcard : « Dear Grandma, I’m in London. The weather is sunny. I visited Big Ben. See you soon! Love, Léa ». Start with Dear, end with Love / See you soon / Best wishes.', [
        Q('Comment commence une carte postale ?', 'Dear…', 'Goodbye…', 'The end…', 'Once upon a time…', ex='Dear = cher/chère.'),
        Q('Comment finir une carte à un proche ?', 'Love, Léa', 'Dear Léa', 'Hello Léa', 'Stop Léa', ex='Formule affectueuse.'),
        Q('« The weather is sunny » veut dire…', 'Il fait ensoleillé', 'Il pleut', 'Il neige', 'Il fait froid', ex='sunny = ensoleillé.'),
        Q('« I visited the museum » est au…', 'passé', 'présent', 'futur', 'conditionnel', ex='-ed = passé.'),
        Q('« See you soon! » veut dire…', 'À bientôt !', 'Bonne nuit !', 'Bon appétit !', 'Bienvenue !', ex='Formule de fin.'),
        M('Associe la météo.', [('rainy', 'pluvieux'), ('windy', 'venteux'), ('snowy', 'neigeux')], ex='Météo.'),
        Q('Pour décrire une ville, on peut écrire…', '« It’s big and beautiful. There are many parks. »', '« My name is Tom. »', '« I’m ten. »', '« Goodbye. »', ex='Description.'),
        Q('« Wish you were here » signifie…', 'J’aimerais que tu sois là', 'Tu es ici', 'Viens demain', 'Je suis là', ex='Formule de carte postale.'),
    ])
    lesson(E(7), 'Préparer et jouer un dialogue', 'In a shop : « Can I help you? » / « Yes, I’d like a sandwich, please. » / « Here you are. » / « How much is it? » / « It’s three pounds. » / « Thank you! » Politeness : please, thank you, you’re welcome.', [
        Q('« How much is it? » sert à demander…', 'le prix', 'l’heure', 'le nom', 'l’âge', ex='Combien ça coûte ?'),
        Q('« Here you are » se dit…', 'quand on donne quelque chose', 'pour dire bonjour', 'pour s’excuser', 'pour demander l’heure', ex='Voilà.'),
        Q('Réponse à « Thank you! »', 'You’re welcome.', 'Please.', 'Hello.', 'I’m sorry.', ex='De rien.'),
        Q('« Can I help you? » est dit par…', 'le vendeur', 'le client', 'le professeur toujours', 'personne', ex='Puis-je vous aider ?'),
        O('Remets le dialogue dans l’ordre.', ['Can I help you?', 'I’d like an apple, please.', 'Here you are.', 'Thank you!'], ex='Dialogue au magasin.'),
        Q('La monnaie du Royaume-Uni est…', 'la livre sterling (pound)', 'l’euro', 'le dollar', 'le yen', ex='£.'),
        Q('« I’m sorry » veut dire…', 'Je suis désolé', 'Je suis content', 'Je suis prêt', 'Je suis fatigué', ex='Excuse.'),
        Q('Pour jouer un dialogue, il faut…', 'parler clairement et écouter son partenaire', 'parler en même temps', 'lire sans regarder personne', 'chuchoter', ex='Interaction.'),
    ])
    lesson(E(8), 'Découvrir fêtes, lieux, histoires et musiques anglophones', 'English-speaking countries have their own celebrations and places : Saint Patrick’s Day (Ireland, 17 March), Independence Day (USA, 4 July), the Statue of Liberty, the Sydney Opera House, Robin Hood, the Beatles.', [
        Q('Saint Patrick’s Day est la fête de…', 'l’Irlande', 'l’Australie', 'la France', 'l’Inde', ex='17 mars, couleur verte.'),
        Q('Independence Day aux États-Unis est le…', '4 juillet', '14 juillet', '25 décembre', '31 octobre', ex='1776.'),
        Q('L’Opéra de Sydney se trouve en…', 'Australie', 'Angleterre', 'Canada', 'Irlande', ex='Sydney.'),
        Q('Robin des Bois est un héros de…', 'légende anglaise', 'conte japonais', 'film français', 'mythologie grecque', ex='Forêt de Sherwood.'),
        Q('Les Beatles étaient un groupe…', 'britannique (Liverpool)', 'américain', 'australien', 'français', ex='Années 1960.'),
        Q('La capitale des États-Unis est…', 'Washington', 'New York', 'Los Angeles', 'Chicago', ex='Washington D.C.'),
        Q('La capitale de l’Irlande est…', 'Dublin', 'Londres', 'Belfast', 'Glasgow', ex='Dublin.'),
        Q('Au Canada, on parle…', 'anglais et français', 'seulement anglais', 'espagnol', 'allemand', ex='Pays bilingue.'),
    ])
    lesson(E(9), 'Comparer des éléments culturels et expliquer en français', 'Compare : in the UK, people drive on the left ; in France, on the right. School starts at around 9 am and pupils often wear a uniform. To explain in French, give the main idea simply.', [
        Q('Au Royaume-Uni, on conduit…', 'à gauche', 'à droite', 'au milieu', 'on ne conduit pas', ex='Driving on the left.'),
        Q('Beaucoup d’élèves britanniques portent…', 'un uniforme', 'un pyjama', 'un costume de carnaval', 'un casque', ex='School uniform.'),
        Q('« Pupils have lunch at school » : explication ?', 'Les élèves déjeunent à l’école.', 'Les élèves dorment à l’école.', 'Les élèves rentrent chez eux.', 'Les élèves ne mangent pas.', ex='lunch = déjeuner.'),
        Q('Aux États-Unis, la température se mesure souvent en…', 'degrés Fahrenheit', 'degrés Celsius', 'kilomètres', 'litres', ex='°F.'),
        Q('« Bonfire Night » se fête au Royaume-Uni avec…', 'des feux de joie et des feux d’artifice', 'des œufs en chocolat', 'des sapins', 'des citrouilles', ex='5 novembre.'),
        Q('Au Royaume-Uni, les distances sur les routes sont en…', 'miles', 'kilomètres', 'mètres', 'pieds uniquement', ex='1 mile ≈ 1,6 km.'),
        Q('« The tea is served with milk » : explication ?', 'Le thé est servi avec du lait.', 'Le thé est servi froid.', 'Il n’y a pas de thé.', 'Le lait est servi seul.', ex='Tradition britannique.'),
        Q('Comparer deux cultures, c’est…', 'repérer ressemblances et différences avec respect', 'dire que la sienne est meilleure', 'se moquer', 'ignorer l’autre', ex='Ouverture.'),
    ])
    lesson(E(10), 'Améliorer prononciation, accentuation et intonation', 'In English, some letters are silent : knife (k), write (w), hour (h). Words have a stressed syllable : TEAcher, baNAna, phoTOgraphy. Questions with Yes/No go up ↗ ; Wh- questions usually go down ↘.', [
        Q('Dans « knife », quelle lettre est muette ?', 'le k', 'le n', 'le f', 'le i', ex='On dit « naïf ».'),
        Q('Dans « write », quelle lettre est muette ?', 'le w', 'le r', 'le t', 'le i', ex='On dit « raït ».'),
        Q('Dans « baNAna », la syllabe accentuée est…', 'NA (la 2e)', 'ba (la 1re)', 'na (la 3e)', 'aucune', ex='Accent tonique.'),
        Q('« Are you ready? » : l’intonation…', 'monte à la fin', 'descend à la fin', 'reste plate', 'est chuchotée', ex='Question fermée.'),
        Q('« Where do you live? » : l’intonation…', 'descend généralement à la fin', 'monte fortement', 'est criée', 'n’existe pas', ex='Question en Wh-.'),
        Q('Dans « hour », le h est…', 'muet', 'soufflé', 'roulé', 'prononcé comme k', ex='On dit « aoueur ».'),
        Q('« Thirteen » et « thirty » se distinguent par…', 'la syllabe accentuée et la fin', 'rien', 'le premier son', 'le nombre de lettres', ex='thirTEEN / THIRty.'),
        Q('Pour progresser à l’oral, on peut…', 'écouter des chansons et répéter', 'ne jamais parler', 'lire en silence uniquement', 'parler français', ex='Imitation.'),
    ])
    # ================= EMC =================
    C = lambda n: S('emc', n)
    lesson(C(1), 'Relier droits, devoirs, règles et libertés', 'Chacun a des droits (s’exprimer, être protégé, aller à l’école) et des devoirs (respecter les autres et les règles). Ma liberté s’arrête où commence celle des autres. La Convention internationale des droits de l’enfant (1989) protège les enfants.', [
        Q('La Convention internationale des droits de l’enfant date de…', '1989', '1789', '1905', '2020', ex='Adoptée par l’ONU.'),
        Q('Quel est un droit de l’enfant ?', 'Aller à l’école', 'Travailler à l’usine', 'Être puni sans raison', 'Ne pas être soigné', ex='Droit à l’éducation.'),
        Q('Quel est un devoir ?', 'Respecter les autres', 'Insulter', 'Tricher', 'Dégrader le matériel', ex='Vivre ensemble.'),
        Q('« Ma liberté s’arrête où commence celle des autres » signifie…', 'je ne peux pas tout faire si cela nuit aux autres', 'je peux tout faire', 'les autres n’ont pas de liberté', 'il n’y a pas de règles', ex='Limites de la liberté.'),
        Q('La liberté d’expression permet…', 'de donner son avis en respectant la loi', 'd’insulter tout le monde', 'de mentir sur les autres', 'rien', ex='Avec des limites (diffamation, insultes).'),
        Q('Un droit va souvent avec…', 'un devoir', 'une punition', 'un cadeau', 'rien', ex='Droit d’être respecté / devoir de respecter.'),
    ])
    lesson(C(2), 'Comprendre les institutions par des cas concrets', 'La commune est dirigée par le maire et le conseil municipal, élus par les habitants. Au niveau national, le président de la République est élu pour 5 ans ; le Parlement (Assemblée nationale et Sénat) vote les lois ; le gouvernement les applique.', [
        Q('Qui dirige la commune ?', 'le maire', 'le président', 'le préfet seul', 'le directeur d’école', ex='Avec le conseil municipal.'),
        N('Pour combien d’années le président de la République est-il élu ?', 5, ex='Quinquennat.'),
        Q('Qui vote les lois ?', 'le Parlement', 'le maire', 'les juges', 'la police', ex='Assemblée nationale et Sénat.'),
        Q('Qui gère l’école élémentaire (bâtiments, cantine) ?', 'la commune', 'le président', 'l’Union européenne', 'la région uniquement', ex='Compétence communale.'),
        Q('Le Premier ministre dirige…', 'le gouvernement', 'l’Assemblée nationale', 'la commune', 'l’armée seul', ex='Il est nommé par le président.'),
        N('À partir de quel âge peut-on voter en France ?', 18, ex='Majorité.'),
    ])
    lesson(C(3), 'Reconnaître les symboles, la laïcité et la mémoire', 'Les symboles de la République : drapeau tricolore, Marseillaise, devise, Marianne, 14 juillet. La laïcité permet à chacun de croire ou ne pas croire et garantit la neutralité de l’école publique. Les commémorations (11 novembre, 8 mai) entretiennent la mémoire.', [
        Q('Quel est un symbole de la République ?', 'Marianne', 'la couronne', 'le lion', 'le soleil', ex='Allégorie de la République.'),
        Q('La charte de la laïcité est affichée…', 'dans les écoles publiques', 'dans les cinémas', 'dans les supermarchés', 'nulle part', ex='Depuis 2013.'),
        Q('À l’école publique, la laïcité signifie que…', 'l’école est neutre et respecte les croyances de chacun', 'les religions sont interdites dans la vie', 'on doit avoir une religion', 'on étudie une seule religion', ex='Neutralité.'),
        Q('Le 8 mai commémore…', 'la fin de la Seconde Guerre mondiale en Europe', 'la prise de la Bastille', 'Noël', 'la fête du travail', ex='1945.'),
        Q('Les couleurs du drapeau français sont…', 'bleu, blanc, rouge', 'vert, blanc, rouge', 'noir, rouge, jaune', 'bleu et jaune', ex='Tricolore.'),
        Q('Une commémoration sert à…', 'se souvenir ensemble d’un événement', 'faire la fête uniquement', 'oublier', 'rien', ex='Mémoire collective.'),
    ])
    lesson(C(4), 'Repérer préjugés, stéréotypes et discriminations', 'Un préjugé est un jugement avant de connaître. Un stéréotype est une idée toute faite sur un groupe. Ils peuvent mener à la discrimination : traiter quelqu’un différemment et injustement. La loi interdit plus de 25 critères de discrimination.', [
        Q('« Il porte des lunettes, il est sûrement intello » est…', 'un préjugé', 'un fait', 'une loi', 'un compliment vérifié', ex='Jugement sans connaître.'),
        Q('Un stéréotype…', 'généralise une idée à tout un groupe', 'décrit précisément une personne', 'est toujours vrai', 'est une loi', ex='Idée toute faite.'),
        Q('Refuser un logement à quelqu’un à cause de son nom est…', 'une discrimination interdite', 'normal', 'autorisé', 'un choix libre', ex='Puni par la loi.'),
        Q('Pour lutter contre les préjugés, on peut…', 'apprendre à connaître les personnes', 'les répéter', 'éviter tous les autres', 'se moquer', ex='Rencontre et dialogue.'),
        Q('Quelle phrase est un stéréotype ?', '« Les garçons ne pleurent pas. »', '« Tom a 10 ans. »', '« Il pleut aujourd’hui. »', '« Paris est en France. »', ex='Généralisation fausse.'),
        Q('Le racisme est…', 'un délit puni par la loi', 'une opinion autorisée', 'un jeu', 'un sport', ex='Loi française.'),
    ])
    lesson(C(5), 'Défendre l’égalité des droits et prévenir le harcèlement', 'Le harcèlement, ce sont des violences répétées (moqueries, insultes, mise à l’écart, coups, messages) contre une même personne. C’est interdit. Victime ou témoin, il faut en parler à un adulte. Numéro : 3018.', [
        Q('Le harcèlement, c’est…', 'des violences répétées contre une même personne', 'une dispute isolée', 'un jeu entre amis', 'une blague unique', ex='Répétition.'),
        Q('Si tu es témoin de harcèlement, tu…', 'en parles à un adulte et soutiens la victime', 'ris avec les autres', 'filmes', 'ne fais rien', ex='Le témoin a un rôle clé.'),
        Q('Quel numéro gratuit contre le harcèlement ?', '3018', '18', '17', '15', ex='3018.'),
        Q('Mettre quelqu’un à l’écart volontairement et toujours est…', 'une forme de harcèlement', 'normal', 'un jeu', 'une règle', ex='Exclusion.'),
        Q('Une victime de harcèlement…', 'n’est jamais responsable de ce qu’elle subit', 'l’a mérité', 'doit se taire', 'doit changer', ex='Ce n’est jamais sa faute.'),
        Q('Le harcèlement scolaire est…', 'un délit puni par la loi', 'autorisé', 'sans conséquence', 'un jeu', ex='Loi de 2022.'),
    ])
    lesson(C(6), 'Participer à un débat et à un projet solidaire', 'Dans un débat réglé : on demande la parole, on écoute, on argumente avec des exemples, on respecte les avis différents. Un projet solidaire mobilise un groupe pour aider : collecte, parrainage, action pour l’environnement.', [
        Q('Dans un débat, pour parler, on…', 'demande la parole', 'coupe les autres', 'crie', 'parle tous ensemble', ex='Règles du débat.'),
        Q('Un argument est…', 'une raison qui justifie son avis', 'une insulte', 'un cri', 'une question', ex='« Je pense que… parce que… »'),
        Q('Reformuler, c’est…', 'redire avec ses mots ce que l’autre a dit', 'se moquer', 'refuser d’écouter', 'répéter mot à mot', ex='Montrer qu’on a compris.'),
        Q('Un projet solidaire peut être…', 'une collecte de jouets pour une association', 'une compétition pour gagner de l’argent', 'un concours de moqueries', 'rien', ex='Entraide.'),
        Q('Si quelqu’un n’est pas d’accord avec moi, je…', 'l’écoute et je réponds avec des arguments', 'l’insulte', 'quitte le débat', 'le fais taire', ex='Respect.'),
        Q('Le médiateur ou président de séance…', 'distribue la parole et veille au respect', 'gagne le débat', 'ne dit rien', 'vote seul', ex='Rôle d’animation.'),
    ])
    lesson(C(7), 'Exercer son esprit critique face aux médias', 'Les médias (presse, télé, radio, Internet) informent. Un journaliste vérifie ses sources. Il faut distinguer information, opinion et publicité. Sur les réseaux sociaux, tout le monde peut publier : il faut vérifier avant de croire ou partager.', [
        Q('Une publicité cherche à…', 'faire acheter un produit', 'informer de façon neutre', 'raconter une histoire vraie', 'rien', ex='But commercial.'),
        Q('Un éditorial exprime…', 'l’opinion d’un journaliste', 'un fait brut', 'la météo', 'une publicité', ex='Opinion.'),
        Q('Un journaliste doit…', 'vérifier ses sources', 'inventer', 'copier sans vérifier', 'publier des rumeurs', ex='Déontologie.'),
        Q('Un titre très choquant (« Incroyable ! ») cherche souvent…', 'à attirer les clics', 'à informer calmement', 'à rien', 'à faire réfléchir', ex='Piège à clics.'),
        Q('Pour vérifier une info, on peut…', 'chercher si d’autres médias sérieux la donnent', 'demander à un inconnu', 'la partager vite', 'la croire si elle a beaucoup de likes', ex='Croiser les sources.'),
        Q('Un fait est…', 'quelque chose de vérifiable', 'un avis personnel', 'une rumeur', 'un rêve', ex='Fait vs opinion.'),
    ])
    lesson(C(8), 'Protéger sa vie privée et respecter les autres en ligne', 'Les données personnelles (nom, adresse, photos, mots de passe) doivent être protégées. Les réseaux sociaux sont interdits avant 15 ans sans accord des parents en France. On ne publie rien sur quelqu’un sans son accord ; ce qui est publié peut rester longtemps.', [
        Q('Une donnée personnelle est…', 'une information qui permet de t’identifier', 'un jeu', 'une couleur', 'une règle', ex='Nom, adresse, photo…'),
        Q('Un bon mot de passe est…', 'long, varié et secret', 'ton prénom', '123456', 'partagé avec tes amis', ex='Sécurité.'),
        Q('Une photo publiée sur Internet…', 'peut rester en ligne très longtemps', 'disparaît forcément', 'n’est vue par personne', 'est toujours privée', ex='Trace numérique.'),
        Q('Un inconnu en ligne te propose un cadeau contre ta photo. Tu…', 'refuses et en parles à un adulte', 'acceptes', 'lui donnes ton adresse', 'gardes le secret', ex='Danger.'),
        Q('Paramétrer son compte en privé permet…', 'de limiter qui voit ses publications', 'd’être vu par tous', 'de supprimer Internet', 'rien', ex='Protection.'),
        Q('La CNIL est…', 'l’autorité qui protège les données personnelles', 'un réseau social', 'un jeu vidéo', 'une banque', ex='Commission nationale de l’informatique et des libertés.'),
    ])
    # ================= ARTS PLASTIQUES =================
    A = lambda n: S('ap', n)
    lesson(A(1), 'Transformer une image et interroger son statut', 'On peut transformer une image : la recadrer, la découper (collage), la retoucher, la détourner. Une image peut être une œuvre, une publicité, une photo de famille, un document : c’est son statut. Une image retouchée n’est pas forcément vraie.', [
        Q('Le collage consiste à…', 'assembler des morceaux d’images collés', 'peindre à l’huile', 'sculpter du bois', 'photographier', ex='Technique utilisée par Picasso, Matisse.'),
        Q('Détourner une image, c’est…', 'lui donner un autre sens', 'la jeter', 'la copier exactement', 'l’encadrer', ex='Détournement.'),
        Q('Une photo retouchée…', 'peut montrer quelque chose qui n’existe pas', 'est toujours vraie', 'est interdite', 'est un dessin', ex='Esprit critique.'),
        Q('Le statut d’une image, c’est…', 'sa fonction : œuvre, publicité, document…', 'sa taille', 'son prix', 'sa couleur', ex='Statut.'),
        Q('Henri Matisse a réalisé des œuvres avec…', 'des papiers découpés', 'des pierres', 'des écrans', 'du métal', ex='Gouaches découpées.'),
        Q('Recadrer une image peut…', 'changer ce qu’elle raconte', 'ne rien changer', 'la colorier', 'l’effacer', ex='Choix du cadre.'),
    ])
    lesson(A(2), 'Créer une production en volume et dans l’espace', 'Une installation est une œuvre qui occupe un lieu et que le spectateur peut parcourir. Une sculpture peut être modelée, taillée ou assemblée. On joue avec l’échelle, la lumière, le point de vue du spectateur.', [
        Q('Une installation est une œuvre…', 'qui occupe un espace qu’on peut parcourir', 'plate et petite', 'uniquement sonore', 'imprimée', ex='Art contemporain.'),
        Q('Tailler une sculpture, c’est…', 'retirer de la matière (pierre, bois)', 'ajouter de l’argile', 'coller des objets', 'peindre', ex='Taille directe.'),
        Q('Jouer avec l’échelle, c’est…', 'faire un objet beaucoup plus grand ou plus petit que la réalité', 'mesurer précisément', 'monter une échelle', 'rien', ex='Ex. : une cuillère géante.'),
        Q('La lumière peut transformer une sculpture en…', 'créant des ombres et des reliefs', 'la cassant', 'la rendant liquide', 'rien', ex='Éclairage.'),
        Q('Un mobile (comme ceux de Calder) est…', 'une sculpture suspendue qui bouge', 'un téléphone', 'une peinture', 'une photo', ex='Alexander Calder.'),
        Q('Le spectateur d’une installation…', 'fait souvent partie de l’expérience', 'ne doit pas regarder', 'doit rester dehors', 'n’existe pas', ex='Expérience immersive.'),
    ])
    lesson(A(3), 'Concevoir et mener un projet plastique', 'Mener un projet : partir d’une intention, chercher des références d’artistes, faire des essais, choisir, réaliser, puis prendre du recul et ajuster. Un carnet de recherche garde la trace des idées.', [
        Q('Un carnet de recherche sert à…', 'garder ses idées, croquis et essais', 'faire ses devoirs de maths', 'coller des stickers', 'rien', ex='Trace du projet.'),
        Q('Chercher des références, c’est…', 'regarder des œuvres d’artistes en lien avec son idée', 'copier exactement', 'ne rien regarder', 'lire un dictionnaire', ex='Inspiration.'),
        Q('Prendre du recul sur son travail, c’est…', 'le regarder de loin et réfléchir à ce qu’on peut améliorer', 'le jeter', 'arrêter', 'le cacher', ex='Regard critique.'),
        O('Remets dans l’ordre.', ['Intention', 'Recherches et essais', 'Choix', 'Réalisation', 'Prise de recul'], ex='Démarche.'),
        Q('Faire plusieurs essais permet…', 'de comparer et choisir la meilleure solution', 'de perdre du temps', 'de copier', 'rien', ex='Expérimentation.'),
        Q('Les couleurs complémentaires (rouge/vert, bleu/orange)…', 'se renforcent quand elles sont côte à côte', 'se ressemblent', 'sont toutes froides', 'sont interdites', ex='Contraste.'),
    ])
    lesson(A(4), 'Relier une œuvre à son époque et à ses usages', 'Les œuvres témoignent de leur époque : peintures religieuses au Moyen Âge, portraits royaux au XVIIe siècle, impressionnisme au XIXe siècle (peindre la lumière en plein air), art moderne au XXe siècle (cubisme, abstraction).', [
        Q('Les impressionnistes peignaient souvent…', 'en plein air pour saisir la lumière', 'uniquement des rois', 'dans le noir', 'avec des ordinateurs', ex='XIXe siècle.'),
        Q('« Impression, soleil levant » est un tableau de…', 'Claude Monet', 'Picasso', 'Léonard de Vinci', 'Rembrandt', ex='Il a donné son nom au mouvement.'),
        Q('Le cubisme, avec Picasso et Braque, représente les objets…', 'avec des formes géométriques et plusieurs points de vue', 'de façon très réaliste', 'uniquement en noir', 'en 3D réelle', ex='Début du XXe siècle.'),
        Q('Un portrait officiel de Louis XIV servait à…', 'montrer la puissance du roi', 'vendre un produit', 'décorer une cuisine', 'rien', ex='Usage politique.'),
        Q('L’art abstrait…', 'ne représente pas d’objet reconnaissable', 'représente toujours des paysages', 'est uniquement photographique', 'est médiéval', ex='Ex. : Kandinsky.'),
        O('Range ces mouvements dans l’ordre chronologique.', ['Art gothique', 'Renaissance', 'Impressionnisme', 'Cubisme'], ex='XIIe, XVe-XVIe, XIXe, XXe siècles.'),
    ])
    lesson(A(5), 'Comparer des démarches et justifier un choix', 'Deux artistes peuvent traiter un même sujet très différemment : un paysage réaliste ou impressionniste, un portrait fidèle ou déformé. Comparer, c’est observer techniques, couleurs, cadrage, intention. Justifier son choix, c’est expliquer ce qu’on préfère et pourquoi.', [
        Q('Comparer deux œuvres, c’est observer…', 'leurs techniques, couleurs, compositions et intentions', 'seulement leur prix', 'seulement leur taille', 'leur cadre', ex='Analyse.'),
        Q('Un artiste réaliste cherche à…', 'représenter le monde fidèlement', 'déformer tout', 'ne rien représenter', 'faire de la musique', ex='Réalisme.'),
        Q('Justifier un choix, c’est utiliser…', '« parce que… »', 'des cris', 'le silence', 'des insultes', ex='Argumenter.'),
        Q('Frida Kahlo est célèbre pour…', 'ses autoportraits', 'ses sculptures géantes', 'ses films', 'ses vitraux', ex='Peintre mexicaine.'),
        Q('Deux élèves aiment des œuvres différentes. C’est…', 'normal : les goûts varient', 'une erreur', 'interdit', 'impossible', ex='Diversité des goûts.'),
        Q('Une démarche artistique, c’est…', 'la façon dont l’artiste travaille et pense son œuvre', 'son adresse', 'son âge', 'son prix', ex='Démarche.'),
    ])
    lesson(A(6), 'Présenter un projet, écouter et ajuster', 'Présenter un projet à un public : expliquer son intention, ses étapes, ses choix. Écouter les retours, les accepter même quand ils sont critiques, et décider ce qu’on garde ou modifie.', [
        Q('Lors d’une présentation, on explique d’abord…', 'son intention', 'le prix', 'les erreurs des autres', 'rien', ex='Point de départ.'),
        Q('Un retour critique respectueux…', 'aide à améliorer son projet', 'doit être ignoré', 'est une insulte', 'n’existe pas', ex='Feedback.'),
        Q('Ajuster son projet, c’est…', 'le modifier en tenant compte des retours utiles', 'tout recommencer à chaque remarque', 'ne rien changer jamais', 'abandonner', ex='Prendre en compte.'),
        Q('Quelle phrase est un retour respectueux ?', '« Ton idée est forte, la couleur pourrait être plus contrastée. »', '« C’est raté. »', '« J’aime pas. »', '« Nul. »', ex='Critique constructive.'),
        Q('Pour bien présenter à l’oral, on…', 'parle clairement en regardant le public', 'parle dos au public', 'chuchote', 'lit très vite', ex='Posture.'),
        Q('Un cartel accompagne une œuvre exposée. Il indique…', 'titre, auteur, technique, date', 'le menu de la cantine', 'les notes de l’élève', 'rien', ex='Exposition.'),
    ])
    # ================= MUSIQUE =================
    U = lambda n: S('mu', n)
    lesson(U(1), 'Décrire la forme et les contrastes d’une œuvre', 'Une œuvre a une forme : A-B-A (thème, contraste, retour du thème), rondo (A-B-A-C-A), couplet-refrain. Les contrastes portent sur les nuances (pp, p, f, ff), le tempo, la hauteur, le timbre, la densité (un instrument ou tout l’orchestre).', [
        Q('Une forme A-B-A signifie…', 'un thème, un passage différent, puis le retour du thème', 'trois thèmes différents', 'une seule partie', 'une chanson sans fin', ex='Forme ternaire.'),
        Q('« ff » (fortissimo) veut dire…', 'très fort', 'très doux', 'très lent', 'très aigu', ex='Nuance.'),
        Q('« pp » (pianissimo) veut dire…', 'très doux', 'très fort', 'très rapide', 'très grave', ex='Nuance.'),
        Q('Un tutti, c’est quand…', 'tout l’orchestre joue ensemble', 'un seul instrument joue', 'il y a un silence', 'le chef parle', ex='Densité.'),
        Q('Dans un rondo, le thème A…', 'revient plusieurs fois', 'n’apparaît qu’une fois', 'est toujours à la fin', 'est chanté', ex='A-B-A-C-A.'),
        Q('Un decrescendo, c’est…', 'un son de plus en plus doux', 'de plus en plus fort', 'de plus en plus rapide', 'un silence', ex='Diminution.'),
    ])
    lesson(U(2), 'Identifier timbres, styles et contextes', 'On reconnaît un style musical à ses instruments, son rythme et son époque : musique baroque (clavecin, Bach), classique (Mozart), romantique (Chopin), jazz (saxophone, improvisation), rock (guitare électrique, batterie), rap (texte rythmé).', [
        Q('Le clavecin est typique de la musique…', 'baroque', 'rock', 'rap', 'électronique', ex='XVIIe-XVIIIe siècles.'),
        Q('L’improvisation est très présente dans…', 'le jazz', 'la musique baroque écrite', 'l’hymne national', 'les berceuses', ex='Jazz.'),
        Q('La guitare électrique et la batterie sont typiques du…', 'rock', 'baroque', 'chant grégorien', 'opéra', ex='Rock.'),
        Q('Le rap se caractérise par…', 'un texte scandé en rythme', 'des chants sans paroles', 'un orchestre symphonique', 'le silence', ex='Flow.'),
        Q('Le saxophone appartient à la famille…', 'des vents (bois)', 'des cordes', 'des percussions', 'des claviers', ex='Anche en roseau.'),
        Q('Frédéric Chopin composait surtout pour…', 'le piano', 'la batterie', 'la guitare électrique', 'la trompette', ex='Compositeur romantique.'),
    ])
    lesson(U(3), 'Construire des repères culturels musicaux', 'Repères : Moyen Âge (chant grégorien), Bach (XVIIIe), Mozart et Beethoven (fin XVIIIe-XIXe), Debussy (début XXe), naissance du jazz (XXe), musiques actuelles. Chaque époque a ses instruments et ses usages.', [
        O('Range ces compositeurs dans l’ordre chronologique.', ['Bach', 'Mozart', 'Beethoven', 'Debussy'], ex='Baroque, classique, romantique, moderne.'),
        Q('Le chant grégorien date…', 'du Moyen Âge', 'du XXe siècle', 'de l’Antiquité grecque', 'de 2000', ex='Chant religieux.'),
        Q('Beethoven est devenu…', 'sourd mais a continué à composer', 'aveugle', 'roi', 'peintre', ex='9e symphonie.'),
        Q('Claude Debussy est un compositeur…', 'français', 'américain', 'anglais', 'japonais', ex='« Clair de lune ».'),
        Q('L’Hymne européen vient d’une symphonie de…', 'Beethoven', 'Mozart', 'Vivaldi', 'Bach', ex='9e symphonie.'),
        Q('Louis Armstrong est une figure…', 'du jazz', 'de l’opéra baroque', 'du rap', 'du chant grégorien', ex='Trompettiste et chanteur.'),
    ])
    lesson(U(4), 'Inventer et organiser une courte création', 'Pour créer : choisir une intention, inventer des motifs (rythmiques, mélodiques), les organiser dans une forme (A-B-A), jouer sur les contrastes, enregistrer, écouter et améliorer.', [
        Q('Un motif, c’est…', 'un petit élément musical qu’on peut répéter', 'une partition entière', 'un instrument', 'un silence', ex='Cellule.'),
        Q('Organiser sa création en A-B-A apporte…', 'unité et contraste', 'du désordre', 'rien', 'du silence', ex='Retour du thème.'),
        Q('Enregistrer sa création permet…', 'de l’écouter et de l’améliorer', 'de l’effacer', 'de la vendre', 'rien', ex='Prise de recul.'),
        Q('Un ostinato est…', 'un motif répété en boucle', 'un solo improvisé', 'un silence', 'une fin', ex='Ex. : Boléro de Ravel.'),
        Q('Pour une musique de suspense, on utilise plutôt…', 'des sons graves et un crescendo', 'une comptine joyeuse', 'des rires', 'le silence total', ex='Intention.'),
        O('Remets dans l’ordre.', ['Choisir une intention', 'Inventer des motifs', 'Organiser la forme', 'Enregistrer et améliorer'], ex='Démarche de création.'),
    ])
    lesson(U(5), 'Interpréter un chant avec nuance', 'Interpréter, c’est chanter en respectant la mélodie et en donnant du sens : nuances, phrasé, respiration, articulation, posture. Chanter à plusieurs voix (polyphonie) demande une écoute attentive.', [
        Q('Interpréter un chant, c’est…', 'lui donner une expression personnelle en respectant l’œuvre', 'le chanter le plus fort possible', 'changer les paroles', 'le lire en silence', ex='Interprétation.'),
        Q('Le phrasé, c’est…', 'la façon de lier ou détacher les notes d’une phrase musicale', 'les paroles', 'le titre', 'le tempo', ex='Expression.'),
        Q('Une polyphonie est…', 'un chant à plusieurs voix différentes', 'un chant à l’unisson', 'un solo', 'un instrument', ex='Plusieurs mélodies.'),
        Q('Une bonne posture pour chanter :', 'debout, dos droit, épaules relâchées', 'avachi', 'allongé', 'tête baissée', ex='Respiration libre.'),
        Q('Chanter à l’unisson, c’est…', 'chanter tous la même mélodie', 'chanter chacun une mélodie différente', 'chanter seul', 'ne pas chanter', ex='Même note.'),
        Q('Respirer au bon endroit permet…', 'de ne pas couper le sens des paroles', 'de chanter plus faux', 'rien', 'de crier', ex='Respiration.'),
    ])
    lesson(U(6), 'Coopérer et expliquer un choix musical', 'Faire de la musique ensemble demande d’écouter les autres, de respecter le tempo commun, de suivre le chef. Expliquer un choix musical, c’est dire pourquoi on a choisi tel instrument, tel tempo, telle nuance, en lien avec l’intention.', [
        Q('Jouer ensemble demande surtout…', 'd’écouter les autres', 'de jouer plus fort que tous', 'd’ignorer le chef', 'de jouer à son propre tempo', ex='Coopération.'),
        Q('Pour garder le même tempo, on…', 'suit le chef ou la pulsation commune', 'accélère quand on veut', 's’arrête', 'joue seul', ex='Synchronisation.'),
        Q('Expliquer un choix musical, c’est…', 'relier son choix à l’intention', 'dire « je ne sais pas »', 'copier', 'refuser', ex='Justifier.'),
        Q('« J’ai choisi le xylophone pour imiter des gouttes de pluie » est…', 'une justification', 'une erreur', 'une insulte', 'un titre', ex='Lien son-intention.'),
        Q('Un groupe qui joue bien ensemble…', 'partage les rôles (mélodie, rythme, accompagnement)', 'joue tous la même chose fort', 'ne s’écoute pas', 'n’a pas de chef', ex='Rôles.'),
        Q('Si un camarade se trompe, on…', 'continue et on l’aide après', 'se moque', 'arrête tout en criant', 'quitte le groupe', ex='Bienveillance.'),
    ])
    # ================= EPS =================
    P = lambda n: S('eps', n)
    lesson(P(1), 'Produire et suivre une performance mesurée', 'En athlétisme, on mesure ses performances et on les compare dans le temps. On se fixe un objectif réaliste, on s’entraîne, on observe ses progrès. On gère son effort : partir trop vite fatigue avant la fin.', [
        Q('Pour une course longue, il vaut mieux…', 'partir à un rythme régulier', 'sprinter dès le départ', 's’arrêter souvent', 'marcher tout le temps', ex='Gestion de l’effort.'),
        Q('Un objectif réaliste, c’est…', 'un progrès atteignable', 'battre le record du monde', 'ne rien viser', 'gagner sans s’entraîner', ex='Objectif adapté.'),
        Q('Ton saut passe de 2,80 m à 3,10 m. Tu as progressé de…', '30 cm', '3 cm', '1 m', '13 cm', ex='3,10 − 2,80 = 0,30 m.'),
        Q('Ta course passe de 15 s à 13 s. Tu es…', 'plus rapide', 'plus lent', 'pareil', 'disqualifié', ex='Moins de temps = plus rapide.'),
        Q('Un carnet de suivi sert à…', 'noter ses résultats et voir ses progrès', 'dessiner', 'rien', 'tricher', ex='Suivi.'),
        Q('Après l’effort, on…', 'récupère, s’hydrate et s’étire doucement', 'mange des chips', 'recommence immédiatement', 'ne boit pas', ex='Récupération.'),
    ], adult='Chronométrez ensemble un petit parcours à intervalles réguliers et notez les temps pour suivre les progrès.')
    lesson(P(2), 'Adapter ses déplacements, s’orienter, nager et rouler en sécurité', 'S’orienter avec une carte et une boussole, adapter son allure au terrain. À la piscine : savoir nager, respecter les règles. À vélo : équipement, signalisation, code de la route, prudence aux intersections.', [
        Q('Pour une course d’orientation, on oriente la carte avec…', 'une boussole', 'un sifflet', 'un chronomètre', 'un ballon', ex='Orientation.'),
        Q('À vélo, à une intersection, on…', 'ralentit, regarde et respecte la priorité', 'accélère', 'ferme les yeux', 'passe sans regarder', ex='Prudence.'),
        Q('Un panneau « Stop » oblige…', 'à s’arrêter complètement', 'à ralentir un peu', 'à accélérer', 'à klaxonner', ex='Code de la route.'),
        Q('En piscine, avant de plonger, on vérifie…', 'la profondeur et que personne n’est dessous', 'la couleur de l’eau', 'l’heure', 'rien', ex='Sécurité.'),
        Q('Pour être vu la nuit à vélo, il faut…', 'des lumières et un gilet réfléchissant', 'des vêtements noirs', 'rien', 'un bonnet', ex='Visibilité.'),
        Q('Le « savoir rouler à vélo » apprend…', 'à circuler en autonomie et en sécurité', 'à faire des figures acrobatiques', 'à réparer un moteur', 'à conduire une voiture', ex='Programme national.'),
    ], adult='Faites un trajet à vélo ensemble en commentant les panneaux et les priorités rencontrés.')
    lesson(P(3), 'Présenter une prestation corporelle collective', 'En groupe, on crée un enchaînement (danse, gymnastique, acrosport) avec un début, un développement et une fin. On synchronise les mouvements, on utilise l’espace, on assure la sécurité des porteurs et des voltigeurs en acrosport.', [
        Q('En acrosport, le porteur…', 'soutient le voltigeur', 'saute sur les autres', 'regarde seulement', 'arbitre', ex='Rôles.'),
        Q('La parade sert à…', 'protéger le camarade pendant une figure', 'décorer', 'applaudir', 'chronométrer', ex='Sécurité.'),
        Q('Synchroniser, c’est…', 'faire les mouvements en même temps', 'les faire chacun son tour sans ordre', 'ne pas bouger', 'improviser seul', ex='Ensemble.'),
        Q('Une prestation collective réussie demande…', 'de répéter ensemble', 'de ne jamais répéter', 'que chacun fasse ce qu’il veut', 'un seul danseur', ex='Coopération.'),
        Q('Utiliser l’espace, c’est…', 'varier les niveaux, directions et placements', 'rester au même endroit', 'sortir de la salle', 'se cacher', ex='Espace scénique.'),
        Q('Pendant la prestation des autres, on…', 'regarde avec respect et on applaudit', 'parle fort', 'se moque', 'part', ex='Rôle de spectateur.'),
    ])
    lesson(P(4), 'Coopérer, s’opposer et assumer des rôles', 'En sport collectif, on a des rôles : attaquant, défenseur, arbitre, observateur, coach. On élabore une stratégie avec son équipe. On accepte la victoire et la défaite avec fair-play.', [
        Q('Une stratégie d’équipe, c’est…', 'un plan pour jouer ensemble efficacement', 'tricher', 'jouer seul', 'ne rien prévoir', ex='Tactique.'),
        Q('Le défenseur cherche à…', 'empêcher l’adversaire de marquer', 'marquer à tout prix', 'arbitrer', 'quitter le terrain', ex='Rôle défensif.'),
        Q('L’arbitre doit être…', 'juste et impartial', 'favorable à son équipe préférée', 'silencieux toujours', 'joueur en même temps', ex='Impartialité.'),
        Q('Après une défaite, on…', 'félicite l’autre équipe', 'insulte l’arbitre', 'part sans saluer', 'casse le matériel', ex='Fair-play.'),
        Q('Le coach d’équipe…', 'conseille et encourage', 'joue à la place de tous', 'crie sur les joueurs', 'triche', ex='Rôle de conseil.'),
        Q('Faire des passes permet…', 'd’avancer collectivement vers le but', 'de garder la balle pour soi', 'de perdre du temps', 'rien', ex='Jeu collectif.'),
    ])
    lesson(P(5), 'Analyser ses progrès et prendre soin de sa santé', 'Pour progresser, on analyse ses résultats, on identifie ses points forts et ce qu’on doit améliorer. Pour sa santé : bouger au moins une heure par jour, bien dormir, bien manger, s’hydrater, s’échauffer avant l’effort.', [
        Q('Combien de temps d’activité physique par jour est conseillé pour un enfant ?', 'au moins 1 heure', '5 minutes', '10 heures', 'aucune', ex='Recommandation de santé.'),
        Q('S’échauffer avant le sport permet…', 'd’éviter les blessures', 'de se fatiguer', 'de perdre du temps', 'rien', ex='Préparation.'),
        Q('Un point fort, c’est…', 'ce que je réussis bien', 'ce que je rate toujours', 'une blessure', 'une règle', ex='Analyse.'),
        Q('Pendant l’effort, il faut…', 'boire de l’eau', 'boire du soda', 'ne rien boire', 'manger des bonbons', ex='Hydratation.'),
        Q('Le sommeil aide…', 'le corps à récupérer', 'à rien', 'à se fatiguer', 'à perdre ses muscles', ex='Récupération.'),
        Q('Si tu as mal pendant l’effort, tu…', 't’arrêtes et préviens un adulte', 'continues coûte que coûte', 'caches la douleur', 'cours plus vite', ex='Écouter son corps.'),
    ], adult='Faites ensemble le point sur une semaine : temps d’activité, sommeil, eau bue, et fixez un petit objectif.')
    # ================= EVAR (activités accompagnées) =================
    V = lambda n: S('evar', n)
    lesson(V(1), 'Comprendre les transformations corporelles et émotionnelles', 'À la puberté, le corps change et les émotions peuvent être plus fortes ou changeantes. C’est normal. Savoir nommer ses émotions aide à les comprendre. On peut en parler à un adulte de confiance.', [
        Q('Avoir des émotions plus fortes à la puberté est…', 'fréquent et normal', 'une maladie', 'interdit', 'impossible', ex='Changements hormonaux.'),
        Q('Nommer ses émotions aide…', 'à les comprendre et à en parler', 'à les cacher', 'à rien', 'à se fâcher', ex='« Je me sens… »'),
        Q('Si tu te sens triste longtemps, tu peux…', 'en parler à un adulte de confiance', 'garder ça pour toi toujours', 'te moquer de toi', 'demander à un inconnu en ligne', ex='Demander de l’aide.'),
        Q('Chaque corps change…', 'à son propre rythme', 'exactement au même moment', 'jamais', 'seulement à 18 ans', ex='Diversité.'),
        Q('Se moquer des changements d’un camarade…', 'peut le blesser profondément', 'est drôle', 'l’aide', 'est sans effet', ex='Respect.'),
        Q('Pour gérer une colère, on peut…', 'respirer, s’éloigner un moment, en parler', 'frapper', 'crier sur tout le monde', 'casser des objets', ex='Stratégies.'),
    ], adult='Proposez à l’enfant de nommer ensemble une émotion de la semaine et ce qui l’a aidé.')
    lesson(V(2), 'Respecter consentement, intimité et vie privée', 'Le consentement, c’est donner son accord librement. Personne ne doit toucher ton corps sans ton accord, et tu dois respecter le refus des autres. L’intimité (salle de bain, se changer) se respecte. On ne partage pas les photos ou secrets des autres sans accord.', [
        Q('Le consentement, c’est…', 'donner son accord librement', 'obéir par peur', 'se taire', 'accepter tout', ex='Libre et sans pression.'),
        Q('Si quelqu’un dit non, on…', 'respecte son refus', 'insiste', 'se moque', 'fait quand même', ex='Non, c’est non.'),
        Q('Ton corps…', 't’appartient', 'appartient à tout le monde', 'appartient aux adultes', 'appartient à tes amis', ex='Personne ne doit le toucher sans ton accord.'),
        Q('Respecter l’intimité de quelqu’un, c’est…', 'frapper avant d’entrer dans la salle de bain', 'entrer sans prévenir', 'le photographier en train de se changer', 'lire son journal intime', ex='Intimité.'),
        Q('Partager la photo d’un camarade sans son accord est…', 'interdit et blessant', 'autorisé', 'drôle', 'conseillé', ex='Droit à l’image.'),
        Q('Si quelqu’un te demande de garder un secret qui te met mal à l’aise, tu…', 'peux en parler à un adulte de confiance', 'dois te taire pour toujours', 'dois avoir honte', 'dois oublier', ex='Mauvais secret.'),
    ], adult='Rappelez à l’enfant qu’il peut toujours vous parler, sans être grondé, de tout ce qui le met mal à l’aise.')
    lesson(V(3), 'Repérer et se protéger des violences sexistes et sexuelles', 'Personne, ni enfant ni adulte, même connu ou de la famille, n’a le droit de toucher les parties intimes d’un enfant, de lui montrer des images d’adultes nus ou de lui demander des photos. Ce n’est jamais la faute de l’enfant. Il faut en parler à un adulte de confiance ou appeler le 119, même si on a promis de garder le secret.', [
        Q('Un adulte a-t-il le droit de toucher les parties intimes d’un enfant ?', 'Non, jamais (sauf un soin médical expliqué, avec un parent)', 'Oui s’il est gentil', 'Oui s’il est de la famille', 'Oui s’il le demande', ex='C’est interdit par la loi.'),
        Q('Si cela arrive, c’est la faute…', 'de l’adulte, jamais de l’enfant', 'de l’enfant', 'des deux', 'de personne', ex='L’enfant n’est jamais responsable.'),
        Q('Si quelqu’un te demande de garder ce genre de secret, tu…', 'as le droit et le devoir d’en parler', 'dois tenir ta promesse', 'dois l’oublier', 'dois avoir honte', ex='Ce secret-là se dit.'),
        Q('Quel numéro gratuit peut-on appeler, jour et nuit ?', '119', '3615', '0800 jeux', '36 15', ex='Allô Enfance en danger.'),
        Q('Les remarques ou gestes déplacés liés au fait d’être une fille ou un garçon sont…', 'des violences sexistes, interdites', 'des compliments', 'des jeux', 'normaux', ex='Sexisme.'),
        Q('À qui peux-tu en parler ?', 'Un parent, un enseignant, l’infirmière, le 119', 'Personne', 'Seulement un inconnu en ligne', 'Seulement l’auteur', ex='Adultes de confiance.'),
    ], adult='Thème sensible : relisez-le avec l’enfant, rappelez-lui qu’il peut toujours vous parler et qu’il ne sera jamais grondé pour cela. Numéro 119, gratuit, 24 h/24.')
    lesson(V(4), 'Prévenir les risques liés au numérique', 'En ligne : ne jamais donner d’informations personnelles ni envoyer de photos de soi à un inconnu ; ne pas accepter de rendez-vous ; refuser toute demande gênante. Certaines images choquantes peuvent apparaître : on ferme et on en parle à un adulte. Numéro : 3018.', [
        Q('Un inconnu en ligne qui te fait des compliments et demande ta photo…', 'est un danger : on refuse et on prévient un adulte', 'est un ami', 'mérite une réponse', 'doit recevoir la photo', ex='Prudence.'),
        Q('Si tu vois une image choquante en ligne, tu…', 'fermes la page et en parles à un adulte', 'la partages', 'la gardes secrète', 'la regardes encore', ex='Réagir.'),
        Q('Accepter un rendez-vous avec quelqu’un connu seulement en ligne est…', 'dangereux', 'conseillé', 'sans risque', 'obligatoire', ex='Jamais sans adulte.'),
        Q('Le 3018 aide en cas de…', 'harcèlement ou violence en ligne', 'panne d’Internet', 'jeu vidéo bloqué', 'devoirs difficiles', ex='Numéro national.'),
        Q('Un écran le soir avant de dormir…', 'perturbe le sommeil', 'aide à s’endormir', 'n’a aucun effet', 'est conseillé', ex='Lumière bleue, excitation.'),
        Q('Si on te menace en ligne, tu…', 'fais une capture, bloques et préviens un adulte', 'réponds par des menaces', 'obéis', 'supprimes tout sans rien dire', ex='Garder des preuves.'),
    ], adult='Parlez ensemble des règles d’usage des écrans à la maison et affichez le numéro 3018.')
    lesson(V(5), 'Connaître les personnes et lieux d’aide', 'Quand on a un problème, on n’est pas seul. Adultes de confiance : parents, enseignants, infirmière scolaire, médecin, CPE. Numéros gratuits : 119 (enfance en danger), 3018 (harcèlement en ligne), 3020 (harcèlement à l’école), 15 (SAMU), 17 (police), 18 (pompiers), 112 (urgence européenne).', [
        Q('Quel numéro pour le SAMU (urgence médicale) ?', '15', '17', '18', '119', ex='SAMU.'),
        Q('Quel numéro pour les pompiers ?', '18', '15', '17', '3018', ex='Pompiers.'),
        Q('Quel numéro pour la police ?', '17', '18', '15', '3020', ex='Police secours.'),
        Q('Le 119 est destiné…', 'aux enfants en danger', 'aux pannes de voiture', 'aux livraisons', 'aux devoirs', ex='Gratuit, 24 h/24.'),
        Q('Le 112 est…', 'le numéro d’urgence européen', 'un jeu', 'le numéro de l’école', 'une chaîne de télé', ex='Valable dans toute l’UE.'),
        M('Associe chaque numéro.', [('3018', 'violences en ligne'), ('119', 'enfance en danger'), ('18', 'pompiers')], ex='Numéros d’aide.'),
    ], adult='Notez ensemble les numéros d’urgence et les noms des adultes de confiance de l’enfant, et rangez-les à un endroit connu.')
