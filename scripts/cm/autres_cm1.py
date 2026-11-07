from dsl import Q, N, M, O, F, lesson

def autres_cm1():
    S = lambda s, n: f'cm1-{s}-{n:02d}'
    # ================= SCIENCES ET TECHNOLOGIE =================
    lesson(S('st', 1), 'Mesurer une masse et un volume', 'La masse se mesure avec une balance, en grammes (g) ou kilogrammes (kg). Le volume d’un liquide se mesure avec un récipient gradué, en litres (L) ou millilitres (mL). Un objet volumineux n’est pas forcément lourd.', [
        Q('Quel instrument mesure une masse ?', 'une balance', 'un thermomètre', 'une règle', 'un chronomètre', ex='La balance mesure la masse.'),
        Q('Quel instrument mesure le volume d’un liquide ?', 'une éprouvette graduée', 'une balance', 'un mètre ruban', 'une boussole', ex='Récipient gradué.'),
        Q('1 kg de plumes et 1 kg de plomb…', 'ont la même masse', 'le plomb est plus lourd', 'les plumes sont plus lourdes', 'on ne peut pas savoir', ex='1 kg = 1 kg.'),
        N('1 L = combien de mL ?', 1000, ex='1 L = 1 000 mL.'),
        Q('Un gros ballon gonflé et une petite bille de fer : lequel a le plus grand volume ?', 'le ballon', 'la bille', 'ils sont égaux', 'aucun', ex='Le ballon occupe plus de place.'),
        Q('Quelle unité pour la masse d’un cartable ?', 'le kilogramme', 'le litre', 'le mètre', 'le degré', ex='Quelques kilogrammes.'),
        N('Une éprouvette contient 150 mL. On ajoute 75 mL. Volume total (mL) ?', 225, ex='150 + 75 = 225.'),
        Q('Pour mesurer le volume d’un caillou, on peut…', 'le plonger dans l’eau et mesurer la montée du niveau', 'le peser', 'le mesurer avec une règle seulement', 'le chauffer', ex='Le niveau monte du volume du caillou.'),
    ])
    lesson(S('st', 2), 'Mélanger, dissoudre et séparer des matières', 'Le sucre se dissout dans l’eau : il ne se voit plus mais il est toujours là (l’eau est sucrée). Le sable ne se dissout pas. On peut séparer un mélange par décantation, filtration ou évaporation.', [
        Q('Quelle matière se dissout dans l’eau ?', 'le sel', 'le sable', 'l’huile', 'les cailloux', ex='Le sel disparaît à la vue.'),
        Q('Le sucre dissous dans l’eau…', 'est toujours présent', 'a disparu pour toujours', 'est devenu de l’eau', 'a explosé', ex='L’eau a un goût sucré.'),
        Q('Pour séparer l’eau et le sable, on peut…', 'filtrer', 'secouer', 'ajouter du sel', 'congeler', ex='Le filtre retient le sable.'),
        Q('Pour récupérer le sel d’une eau salée, on…', 'fait évaporer l’eau', 'filtre', 'tamise', 'aimante', ex='L’eau s’évapore, le sel reste.'),
        Q('L’eau et l’huile mélangées…', 'se séparent en deux couches', 'se mélangent parfaitement', 'deviennent du lait', 'disparaissent', ex='L’huile flotte.'),
        Q('Laisser reposer un mélange pour que les particules tombent au fond s’appelle…', 'la décantation', 'l’évaporation', 'la fusion', 'la cuisson', ex='Décanter.'),
        Q('Pour séparer de la limaille de fer et du sable, on utilise…', 'un aimant', 'de l’eau chaude', 'un filtre à café', 'une loupe', ex='Le fer est attiré.'),
        M('Associe chaque mélange à la méthode de séparation.', [('eau + sable', 'filtration'), ('eau + sel', 'évaporation'), ('fer + sable', 'aimant')], ex='Méthodes de séparation.'),
    ])
    lesson(S('st', 3), 'Mesurer une distance et une durée de déplacement', 'Pour décrire un déplacement, on mesure une distance (en m, km) et une durée (en s, min, h). Plus on va vite, plus on parcourt de distance dans la même durée.', [
        Q('Quel instrument mesure une durée ?', 'un chronomètre', 'une balance', 'un thermomètre', 'une boussole', ex='Chronomètre.'),
        Q('Quel instrument mesure une distance sur un terrain ?', 'un décamètre (mètre ruban)', 'une horloge', 'un sablier', 'une loupe', ex='Mètre ruban.'),
        Q('Léa court 100 m en 20 s, Tom en 16 s. Qui est le plus rapide ?', 'Tom', 'Léa', 'ils vont aussi vite', 'on ne peut pas savoir', ex='Moins de temps pour la même distance.'),
        N('Un vélo roule à 15 km par heure. Combien de km en 2 heures ?', 30, ex='15 × 2 = 30.'),
        Q('Un escargot et une voiture font 10 m. Lequel met le plus de temps ?', 'l’escargot', 'la voiture', 'pareil', 'aucun', ex='Il est bien plus lent.'),
        N('Un marcheur fait 5 km par heure. Combien de temps (en h) pour 20 km ?', 4, ex='20 ÷ 5 = 4.'),
        Q('Pour comparer deux vitesses, il faut…', 'la même distance ou la même durée', 'des couleurs', 'deux chronomètres identiques seulement', 'rien', ex='On compare à distance ou durée égale.'),
        Q('Une trajectoire est…', 'le chemin suivi par un objet en mouvement', 'la vitesse', 'la masse', 'la durée', ex='Droite, courbe, circulaire…'),
    ])
    lesson(S('st', 4), 'Comprendre lumière, matériaux et ombres', 'La lumière se propage en ligne droite. Un objet opaque l’arrête et forme une ombre ; un objet transparent la laisse passer ; un objet translucide la laisse passer en partie. L’ombre est toujours du côté opposé à la source.', [
        Q('Un matériau qui ne laisse pas passer la lumière est…', 'opaque', 'transparent', 'translucide', 'lumineux', ex='Il forme une ombre.'),
        Q('Une vitre est…', 'transparente', 'opaque', 'lumineuse', 'translucide toujours', ex='On voit à travers.'),
        Q('Un papier calque est…', 'translucide', 'opaque', 'transparent', 'métallique', ex='Il laisse passer une partie de la lumière.'),
        Q('Où se forme l’ombre d’un arbre au soleil ?', 'Du côté opposé au soleil', 'Du côté du soleil', 'Dans l’arbre', 'Nulle part', ex='La lumière est arrêtée.'),
        Q('À midi, l’ombre est…', 'la plus courte', 'la plus longue', 'invisible toujours', 'bleue', ex='Le soleil est haut.'),
        Q('La lumière se propage…', 'en ligne droite', 'en zigzag', 'en cercle', 'seulement la nuit', ex='Propagation rectiligne.'),
        Q('Quelle est une source de lumière ?', 'le Soleil', 'la Lune', 'un miroir', 'un mur blanc', ex='Le Soleil produit sa lumière ; la Lune la renvoie.'),
        M('Associe chaque objet à son type.', [('Une planche de bois', 'opaque'), ('Un verre d’eau', 'transparent'), ('Un rideau fin', 'translucide')], ex='Matériaux et lumière.'),
    ])
    lesson(S('st', 5), 'Classer des espèces à partir d’attributs', 'Pour classer les êtres vivants, on observe ce qu’ils ont (attributs) : squelette interne, plumes, poils, nageoires, 6 pattes… On regroupe ceux qui partagent des attributs, pas ce qu’ils font.', [
        Q('Quel attribut ont tous les oiseaux ?', 'des plumes', 'des poils', 'des écailles', 'six pattes', ex='Plumes.'),
        Q('La chauve-souris a des poils et allaite ses petits : c’est…', 'un mammifère', 'un oiseau', 'un insecte', 'un poisson', ex='Les mammifères ont des poils.'),
        N('Combien de pattes a un insecte ?', 6, ex='Six pattes.'),
        Q('L’araignée est-elle un insecte ?', 'Non, elle a 8 pattes', 'Oui', 'Seulement si elle vole', 'Seulement l’été', ex='Arachnide : 8 pattes.'),
        Q('Le dauphin est…', 'un mammifère', 'un poisson', 'un oiseau', 'un insecte', ex='Il respire de l’air et allaite.'),
        Q('Pourquoi ne classe-t-on pas « les animaux qui volent » ensemble ?', 'Car on classe selon ce qu’ils ont, pas ce qu’ils font', 'Car c’est interdit', 'Car ils sont trop nombreux', 'On le fait toujours', ex='Le papillon et l’aigle ne sont pas proches.'),
        M('Associe chaque animal à son attribut.', [('Truite', 'nageoires'), ('Lézard', 'écailles'), ('Renard', 'poils')], ex='Attributs.'),
        Q('Quel attribut partagent l’humain, le chat et la grenouille ?', 'un squelette interne', 'des poils', 'des plumes', 'des nageoires', ex='Ce sont des vertébrés.'),
    ])
    lesson(S('st', 6), 'Identifier et préserver la biodiversité', 'La biodiversité, c’est la variété des êtres vivants. Elle est menacée par la destruction des milieux, la pollution, les espèces invasives et le changement climatique. Chacun peut agir : protéger les haies, ne pas cueillir n’importe quoi, réduire ses déchets.', [
        Q('Qu’est-ce que la biodiversité ?', 'La variété des êtres vivants', 'Un type de plante', 'Une maladie', 'Un engrais', ex='Diversité du vivant.'),
        Q('Quelle action menace la biodiversité ?', 'Détruire les haies et les zones humides', 'Planter des fleurs locales', 'Installer un hôtel à insectes', 'Trier ses déchets', ex='Destruction des milieux.'),
        Q('Quelle action protège les abeilles ?', 'Planter des fleurs sans pesticides', 'Tondre toutes les fleurs', 'Utiliser beaucoup d’insecticides', 'Couper les arbres', ex='Les fleurs les nourrissent.'),
        Q('Une espèce invasive…', 'se répand et nuit aux espèces locales', 'est toujours protégée', 'n’existe pas', 'est un animal domestique', ex='Ex. : frelon asiatique.'),
        Q('Un hôtel à insectes sert à…', 'abriter des insectes utiles', 'piéger les insectes', 'vendre des insectes', 'décorer seulement', ex='Refuge.'),
        Q('Pourquoi garder des haies autour des champs ?', 'Elles abritent oiseaux et insectes', 'Pour faire de l’ombre seulement', 'Pour gêner les tracteurs', 'Ce n’est pas utile', ex='Refuges pour la faune.'),
        Q('Une espèce en voie de disparition est…', 'menacée de ne plus exister', 'très nombreuse', 'nouvelle', 'invasive', ex='Exemple : certaines tortues marines.'),
        Q('Que faire d’un déchet en promenade ?', 'Le garder et le jeter dans une poubelle', 'Le cacher sous une pierre', 'Le jeter dans la rivière', 'L’enterrer', ex='Les déchets polluent les milieux.'),
    ])
    lesson(S('st', 7), 'Décrire reproduction et développement d’êtres vivants', 'Les animaux naissent d’un œuf pondu (ovipares) ou se développent dans le ventre de la mère (vivipares). Certains changent beaucoup en grandissant : c’est la métamorphose (têtard → grenouille). Les plantes à fleurs donnent des graines.', [
        Q('Un animal qui pond des œufs est…', 'ovipare', 'vivipare', 'herbivore', 'carnivore', ex='Ovi = œuf.'),
        Q('Le chat est…', 'vivipare', 'ovipare', 'un insecte', 'une plante', ex='Les chatons se développent dans le ventre.'),
        O('Remets dans l’ordre le développement de la grenouille.', ['œuf', 'têtard', 'têtard avec pattes', 'grenouille'], ex='Métamorphose.'),
        O('Remets dans l’ordre le développement du papillon.', ['œuf', 'chenille', 'chrysalide', 'papillon'], ex='Métamorphose complète.'),
        Q('D’où vient une graine ?', 'D’une fleur fécondée', 'D’une racine', 'D’une feuille', 'De la terre', ex='La fleur devient fruit avec des graines.'),
        Q('La germination, c’est…', 'quand une graine commence à pousser', 'quand une fleur fane', 'quand un arbre tombe', 'quand on cueille un fruit', ex='Germer.'),
        Q('La poule est…', 'ovipare', 'vivipare', 'un mammifère', 'une plante', ex='Elle pond des œufs.'),
        Q('Le pollen est transporté de fleur en fleur par…', 'les insectes et le vent', 'les cailloux', 'la lune', 'les racines', ex='Pollinisation.'),
    ])
    lesson(S('st', 8), 'Observer les interactions dans un écosystème', 'Dans un écosystème, les êtres vivants dépendent les uns des autres. Une chaîne alimentaire montre « qui mange qui » : herbe → lapin → renard. Les décomposeurs (vers, champignons) transforment les déchets en éléments nutritifs pour les plantes.', [
        O('Remets la chaîne alimentaire dans l’ordre.', ['herbe', 'sauterelle', 'grenouille', 'héron'], ex='Chaque être vivant mange le précédent.'),
        Q('Le premier maillon d’une chaîne alimentaire est souvent…', 'une plante', 'un carnivore', 'un champignon', 'un rocher', ex='Les plantes produisent leur matière grâce à la lumière.'),
        Q('Un animal qui ne mange que des plantes est…', 'herbivore', 'carnivore', 'omnivore', 'décomposeur', ex='Herbivore.'),
        Q('Le ver de terre est…', 'un décomposeur', 'un prédateur de renards', 'un herbivore géant', 'une plante', ex='Il recycle les feuilles mortes.'),
        Q('Si les renards disparaissent, les lapins…', 'risquent de devenir trop nombreux', 'disparaissent aussi aussitôt', 'deviennent carnivores', 'ne changent pas', ex='Moins de prédateurs.'),
        Q('Un écosystème, c’est…', 'un milieu et les êtres vivants qui y vivent', 'un seul animal', 'une usine', 'une maison', ex='Ex. : une mare, une forêt.'),
        Q('Un animal qui mange de tout est…', 'omnivore', 'herbivore', 'carnivore', 'insectivore uniquement', ex='Le sanglier est omnivore.'),
        M('Associe.', [('Renard', 'carnivore'), ('Lapin', 'herbivore'), ('Champignon', 'décomposeur')], ex='Rôles dans l’écosystème.'),
    ])
    lesson(S('st', 9), 'Observer météo, climat local et phénomènes terrestres', 'La météo, c’est le temps qu’il fait un jour donné (pluie, vent, température). Le climat, c’est le temps habituel d’une région sur de nombreuses années. Séismes et volcans sont des phénomènes terrestres naturels.', [
        Q('La météo décrit…', 'le temps d’un jour donné', 'le temps moyen sur 30 ans', 'les volcans', 'les saisons uniquement', ex='Prévision du jour.'),
        Q('Le climat décrit…', 'le temps habituel sur de longues années', 'la pluie de demain', 'la température de ce matin', 'une tempête précise', ex='Moyenne sur longtemps.'),
        Q('Quel instrument mesure la température ?', 'le thermomètre', 'le pluviomètre', 'l’anémomètre', 'le baromètre', ex='Thermomètre.'),
        Q('Quel instrument mesure la quantité de pluie ?', 'le pluviomètre', 'le thermomètre', 'la girouette', 'la balance', ex='Pluviomètre.'),
        Q('La girouette indique…', 'la direction du vent', 'la température', 'la pluie', 'l’heure', ex='Elle tourne avec le vent.'),
        Q('Un séisme est…', 'un tremblement de terre', 'une tempête', 'une pluie forte', 'une éruption de lave', ex='Mouvement brusque du sol.'),
        Q('Un volcan en éruption rejette…', 'de la lave, des cendres et des gaz', 'de la neige', 'de l’eau douce', 'du sable de plage', ex='Magma qui remonte.'),
        Q('Le climat de la Bretagne est plutôt…', 'doux et humide (océanique)', 'désertique', 'polaire', 'tropical', ex='Influence de l’océan.'),
    ])
    lesson(S('st', 10), 'Identifier quelques fonctions du cerveau', 'Le cerveau reçoit les informations des sens (vue, ouïe, toucher…), les traite et commande les mouvements grâce aux nerfs. Il permet aussi de penser, de se souvenir et de ressentir des émotions. Le sommeil l’aide à se reposer.', [
        Q('Quel organe commande nos mouvements ?', 'le cerveau', 'le cœur', 'l’estomac', 'les poumons', ex='Il envoie des messages par les nerfs.'),
        Q('Les messages circulent entre le cerveau et le corps grâce…', 'aux nerfs', 'aux os', 'aux muscles seulement', 'au sang uniquement', ex='Réseau nerveux.'),
        Q('Que se passe-t-il quand on touche quelque chose de brûlant ?', 'On retire vite la main', 'On ne sent rien', 'On s’endort', 'On a faim', ex='Réflexe.'),
        Q('Pourquoi faut-il dormir suffisamment ?', 'Pour que le cerveau se repose et mémorise', 'Pour grandir des cheveux', 'Ce n’est pas utile', 'Pour digérer seulement', ex='Le sommeil aide la mémoire.'),
        Q('Le casque à vélo protège…', 'la tête et le cerveau', 'les pieds', 'les yeux', 'les mains', ex='Le cerveau est fragile.'),
        M('Associe chaque sens à son organe.', [('Vue', 'les yeux'), ('Ouïe', 'les oreilles'), ('Odorat', 'le nez')], ex='Les sens.'),
        Q('Le cerveau est protégé par…', 'le crâne', 'les côtes', 'la colonne seulement', 'la peau seulement', ex='Os du crâne.'),
        Q('Quelle activité sollicite la mémoire ?', 'Apprendre une poésie', 'Respirer', 'Cligner des yeux', 'Avoir chaud', ex='Mémorisation.'),
    ])
    lesson(S('st', 11), 'Comprendre attention, mémoire et perceptions', 'L’attention, c’est se concentrer sur une seule chose. Les écrans et le bruit la dispersent. La mémoire se renforce en répétant et en dormant. Nos sens peuvent être trompés : ce sont les illusions.', [
        Q('Qu’est-ce qui aide à être attentif ?', 'Faire une seule chose à la fois au calme', 'Regarder la télé en travaillant', 'Changer de tâche sans arrêt', 'Parler en même temps', ex='Concentration.'),
        Q('Pour mieux retenir une leçon, on…', 'la répète plusieurs jours de suite', 'la lit une fois la veille', 'ne la lit jamais', 'la photocopie', ex='La répétition espacée aide.'),
        Q('Une illusion d’optique, c’est…', 'quand nos yeux et notre cerveau se trompent', 'une maladie des yeux', 'un tour de magie réel', 'une lunette', ex='Le cerveau interprète mal.'),
        Q('Le multitâche (faire plusieurs choses en même temps)…', 'diminue souvent l’attention', 'double toujours l’attention', 'est conseillé pour apprendre', 'n’a aucun effet', ex='L’attention se divise.'),
        Q('Quel moment aide la mémoire à « ranger » ce qu’on a appris ?', 'Le sommeil', 'La récréation', 'Le repas', 'Le trajet', ex='La mémoire se consolide la nuit.'),
        Q('Se tester (s’interroger soi-même) sur une leçon…', 'aide à mieux mémoriser', 'ne sert à rien', 'fait oublier', 'est interdit', ex='Se rappeler activement renforce la mémoire.'),
        Q('Les notifications d’un téléphone pendant les devoirs…', 'détournent l’attention', 'aident à se concentrer', 'n’ont aucun effet', 'font gagner du temps', ex='Distraction.'),
        Q('Nos perceptions viennent…', 'des sens et du cerveau', 'seulement des yeux', 'du cœur', 'de l’estomac', ex='Le cerveau interprète les informations des sens.'),
    ])
    lesson(S('st', 12), 'Reconnaître les transformations de la puberté', 'La puberté est la période où le corps passe de l’enfance à l’âge adulte, généralement entre 8 et 16 ans. Le corps grandit, la voix change, des poils poussent, la peau peut changer. Chacun a son rythme et c’est normal.', [
        Q('La puberté, c’est…', 'le passage du corps de l’enfance vers l’âge adulte', 'une maladie', 'un sport', 'une saison', ex='Changements naturels.'),
        Q('À quel âge environ commence la puberté ?', 'Entre 8 et 14 ans, selon chacun', 'À 2 ans', 'À 30 ans', 'Le même jour pour tous', ex='Chacun son rythme.'),
        Q('Est-il normal de ne pas changer au même rythme que ses camarades ?', 'Oui, chacun a son rythme', 'Non, c’est grave', 'Seulement pour les filles', 'Seulement pour les garçons', ex='Chaque corps évolue différemment.'),
        Q('Quel changement peut arriver pendant la puberté ?', 'La voix change', 'Les yeux changent de couleur', 'On rapetisse', 'Les dents de lait repoussent', ex='Surtout chez les garçons, la voix mue.'),
        Q('Avec qui peut-on parler de ces changements ?', 'Un adulte de confiance, un parent, l’infirmière scolaire', 'Personne', 'Un inconnu sur Internet', 'On doit garder le secret', ex='Poser ses questions est normal.'),
        Q('Pourquoi l’hygiène devient-elle plus importante ?', 'Le corps transpire davantage', 'Pour faire plaisir aux autres seulement', 'Ce n’est pas le cas', 'Parce qu’il pleut', ex='Se laver régulièrement.'),
        Q('Se moquer des changements d’un camarade est…', 'blessant et irrespectueux', 'drôle et sans conséquence', 'conseillé', 'obligatoire', ex='Respect de chacun.'),
        Q('Pendant la puberté, le corps…', 'grandit souvent rapidement', 'arrête de grandir', 'perd tous ses muscles', 'ne change pas', ex='Poussée de croissance.'),
    ], adult='Ce thème peut être l’occasion d’un échange avec l’enfant : répondez simplement à ses questions et rappelez qu’il peut en parler à un adulte de confiance.')
    lesson(S('st', 13), 'Relier un besoin à une fonction et à une solution', 'Un objet technique répond à un besoin. Sa fonction d’usage, c’est à quoi il sert. Pour un même besoin, il peut exister plusieurs solutions : pour s’éclairer, une bougie, une lampe de poche, une lampe solaire.', [
        Q('À quel besoin répond un parapluie ?', 'Se protéger de la pluie', 'Se déplacer vite', 'Écrire', 'Cuisiner', ex='Fonction d’usage.'),
        Q('Quelle solution répond au besoin « se déplacer » ?', 'Un vélo', 'Une lampe', 'Une casserole', 'Un crayon', ex='Moyen de transport.'),
        Q('La fonction d’usage d’un ouvre-boîte est…', 'ouvrir des boîtes de conserve', 'couper du pain', 'éclairer', 'mesurer', ex='À quoi il sert.'),
        Q('Pour s’éclairer sans électricité du réseau, on peut utiliser…', 'une lampe solaire', 'un radiateur', 'un frigo', 'une télévision', ex='Énergie solaire.'),
        M('Associe chaque objet à son besoin.', [('Thermos', 'garder une boisson chaude'), ('Gourde', 'transporter de l’eau'), ('Lampe frontale', 'voir dans le noir')], ex='Besoin et objet.'),
        Q('Un cahier des charges, c’est…', 'la liste de ce que l’objet doit faire', 'le prix', 'le mode d’emploi', 'un cahier de brouillon', ex='Exigences à respecter.'),
        Q('Pourquoi les objets évoluent-ils dans le temps ?', 'Grâce à de nouvelles techniques et de nouveaux besoins', 'Par hasard', 'Ils n’évoluent jamais', 'Pour être plus chers', ex='Ex. : téléphone fixe → smartphone.'),
        Q('Un objet technique est…', 'fabriqué par l’humain', 'un caillou', 'un arbre', 'un nuage', ex='Conçu et fabriqué.'),
    ])
    lesson(S('st', 14), 'Décrire un objet et ses constituants', 'Un objet est fait de plusieurs pièces (constituants) en différents matériaux. On décrit chaque pièce, son matériau et son rôle. Le choix du matériau dépend de ses propriétés : solide, léger, souple, isolant…', [
        Q('Pourquoi les poignées de casserole sont-elles souvent en bois ou plastique ?', 'Ces matériaux ne conduisent pas bien la chaleur', 'Pour être plus lourdes', 'Pour être plus jolies seulement', 'Par hasard', ex='Matériau isolant.'),
        Q('Le cadre d’un vélo est souvent en…', 'métal', 'papier', 'verre', 'tissu', ex='Solide et assez léger.'),
        Q('Le rôle des freins d’un vélo est de…', 'ralentir et arrêter', 'avancer', 'éclairer', 'gonfler les pneus', ex='Fonction technique.'),
        Q('Un matériau qui laisse passer le courant électrique est…', 'conducteur', 'isolant', 'transparent', 'magnétique toujours', ex='Les métaux conduisent.'),
        Q('Les fils électriques sont entourés de plastique car il est…', 'isolant', 'conducteur', 'lourd', 'fragile', ex='Protection contre l’électrisation.'),
        M('Associe chaque partie d’une lampe de poche à son rôle.', [('Pile', 'fournir l’énergie'), ('Ampoule ou LED', 'produire la lumière'), ('Interrupteur', 'allumer et éteindre')], ex='Constituants.'),
        Q('Le verre est choisi pour une fenêtre car il est…', 'transparent', 'opaque', 'souple', 'très léger', ex='Il laisse passer la lumière.'),
        Q('Un schéma d’objet avec des légendes sert à…', 'nommer ses constituants', 'le colorier', 'le vendre', 'rien', ex='Description technique.'),
    ])
    lesson(S('st', 15), 'Programmer un objet ou un personnage virtuel', 'Programmer, c’est écrire une suite d’instructions qu’une machine exécute dans l’ordre. On utilise des boucles (répéter), des conditions (si… alors…) et des événements (quand on clique…).', [
        Q('Un programme est…', 'une suite d’instructions dans l’ordre', 'un dessin', 'un ordinateur', 'un jeu de cartes', ex='Algorithme.'),
        Q('« Répéter 10 fois » est…', 'une boucle', 'une condition', 'un événement', 'une erreur', ex='Elle répète des instructions.'),
        Q('« Si le personnage touche un mur, alors il recule » est…', 'une condition', 'une boucle', 'un événement', 'une variable', ex='Si… alors…'),
        Q('« Quand on appuie sur la flèche droite, le chat avance » utilise…', 'un événement', 'une boucle infinie', 'un capteur de lumière', 'une condition fausse', ex='Déclenché par une action.'),
        Q('Un bug est…', 'une erreur dans le programme', 'un insecte robot', 'un ordinateur neuf', 'un type de boucle', ex='On le corrige en testant.'),
        O('Remets dans l’ordre pour faire avancer un robot d’un carré.', ['Avancer de 10', 'Tourner à droite de 90°', 'Répéter ces deux instructions 4 fois'], ex='Construction d’un carré.'),
        Q('Scratch est…', 'un logiciel pour apprendre à programmer', 'un jeu de cartes', 'un robot aspirateur', 'un livre', ex='Programmation par blocs.'),
        Q('Pourquoi tester un programme souvent ?', 'Pour trouver et corriger les erreurs', 'Pour l’effacer', 'Pour l’allonger', 'Ce n’est pas utile', ex='Démarche essai-erreur.'),
    ])
    lesson(S('st', 16), 'Observer, expérimenter et présenter des résultats', 'La démarche scientifique : se poser une question, faire une hypothèse, réaliser une expérience en ne changeant qu’une chose à la fois, observer, noter les résultats dans un tableau ou un graphique, conclure.', [
        O('Remets la démarche scientifique dans l’ordre.', ['Se poser une question', 'Faire une hypothèse', 'Expérimenter', 'Observer et noter', 'Conclure'], ex='Démarche d’investigation.'),
        Q('Une hypothèse est…', 'une réponse possible à vérifier', 'une certitude', 'un résultat', 'une erreur', ex='On la teste.'),
        Q('Pour tester si la lumière est nécessaire à une plante, on…', 'compare une plante à la lumière et une dans le noir, le reste identique', 'met deux plantes différentes partout', 'arrose une seule plante', 'ne fait rien', ex='On ne change qu’un facteur.'),
        Q('Pourquoi ne changer qu’une chose à la fois ?', 'Pour savoir ce qui cause le résultat', 'Pour aller plus vite', 'C’est plus joli', 'Ce n’est pas nécessaire', ex='Expérience rigoureuse.'),
        Q('Où noter ses mesures ?', 'Dans un tableau', 'Dans sa tête', 'Nulle part', 'Sur le mur', ex='Tableau de résultats.'),
        Q('Si le résultat contredit l’hypothèse, on…', 'rejette ou modifie l’hypothèse', 'change le résultat', 'abandonne la science', 'cache le résultat', ex='Honnêteté scientifique.'),
        Q('Un graphique sert à…', 'montrer clairement des résultats', 'décorer', 'remplacer l’expérience', 'faire un dessin libre', ex='Visualiser les données.'),
        Q('Refaire une expérience plusieurs fois permet…', 'de vérifier que le résultat est fiable', 'de perdre du temps', 'de changer d’avis', 'de rien', ex='Reproductibilité.'),
    ])
    # ================= HISTOIRE =================
    lesson(S('hi', 1), 'Lire une frise et questionner un document historique', 'Une frise chronologique situe des événements dans le temps. Un siècle dure 100 ans : le XVe siècle va de 1401 à 1500. Face à un document, on se demande : qui l’a fait ? quand ? pourquoi ? que montre-t-il ?', [
        N('Combien d’années dans un siècle ?', 100, ex='Un siècle = 100 ans.'),
        Q('En quel siècle est l’année 1789 ?', 'XVIIIe siècle', 'XVIIe siècle', 'XIXe siècle', 'XVIe siècle', ex='De 1701 à 1800.'),
        Q('En quel siècle est l’année 1515 ?', 'XVIe siècle', 'XVe siècle', 'XIVe siècle', 'XVIIe siècle', ex='De 1501 à 1600.'),
        O('Range ces périodes de la plus ancienne à la plus récente.', ['Préhistoire', 'Antiquité', 'Moyen Âge', 'Temps modernes', 'Époque contemporaine'], ex='Les grandes périodes.'),
        Q('Un document d’époque est…', 'une source produite à l’époque étudiée', 'un manuel d’aujourd’hui', 'un film récent', 'une invention', ex='Source primaire.'),
        Q('Quelle question poser d’abord face à un document ?', 'Qui l’a réalisé et quand ?', 'Combien coûte-t-il ?', 'Est-il en couleur ?', 'Est-il grand ?', ex='Identifier la source.'),
        Q('Le Moyen Âge commence vers…', '476', '1492', '1789', '1914', ex='Chute de l’Empire romain d’Occident.'),
        Q('Les Temps modernes commencent vers…', '1492', '476', '1789', '1945', ex='Découverte de l’Amérique.'),
    ])
    lesson(S('hi', 2), 'Comprendre la vie quotidienne dans une seigneurie', 'Au Moyen Âge, la seigneurie est un territoire dirigé par un seigneur depuis son château fort. Les paysans cultivent ses terres, lui paient des taxes et travaillent gratuitement pour lui (corvées). En échange, il les protège.', [
        Q('Où vit le seigneur ?', 'Dans un château fort', 'Dans une chaumière', 'Dans un monastère', 'Dans une usine', ex='Château fort.'),
        Q('Qui cultive la terre dans la seigneurie ?', 'Les paysans', 'Le seigneur', 'Les chevaliers', 'Le roi', ex='Les paysans.'),
        Q('Une corvée est…', 'un travail gratuit pour le seigneur', 'une fête', 'un tournoi', 'une prière', ex='Travail obligatoire non payé.'),
        Q('En échange des taxes, le seigneur doit…', 'protéger les paysans', 'leur donner des châteaux', 'les payer chaque jour', 'rien', ex='Protection en cas de danger.'),
        Q('Un chevalier est…', 'un guerrier à cheval au service d’un seigneur', 'un paysan', 'un moine', 'un marchand', ex='Noble combattant.'),
        Q('Le pont-levis sert à…', 'fermer l’accès au château', 'traverser une rivière en bateau', 'décorer', 'moudre le grain', ex='Défense.'),
        M('Associe.', [('Seigneur', 'dirige la seigneurie'), ('Paysan', 'cultive la terre'), ('Chevalier', 'combat à cheval')], ex='Société médiévale.'),
        Q('Le moulin du seigneur sert à…', 'moudre le grain contre une taxe', 'faire de l’électricité', 'scier du bois seulement', 'pomper du pétrole', ex='Les paysans paient pour l’utiliser.'),
    ])
    lesson(S('hi', 3), 'Décrire la ville, la paroisse et le rôle de l’Église', 'Au Moyen Âge, l’Église est très puissante. Chaque village a sa paroisse et son église. Les moines vivent dans des monastères, copient des livres à la main. En ville, on construit des cathédrales ; artisans et marchands s’organisent.', [
        Q('Une paroisse est…', 'le territoire d’une église et de ses fidèles', 'un château', 'un marché', 'une école moderne', ex='Organisation religieuse locale.'),
        Q('Où vivent les moines ?', 'Dans un monastère', 'Dans un château fort', 'Dans une usine', 'Dans une gare', ex='Monastère ou abbaye.'),
        Q('Que copient les moines ?', 'Des livres, à la main', 'Des journaux imprimés', 'Des photos', 'Des cartes postales', ex='Manuscrits enluminés.'),
        Q('Une cathédrale est…', 'une grande église d’une ville où siège un évêque', 'une maison de paysan', 'un château', 'une tour de guet', ex='Ex. : Notre-Dame de Paris.'),
        Q('Le style des grandes cathédrales des XIIe-XIIIe siècles, avec de hauts vitraux, est…', 'gothique', 'roman', 'moderne', 'antique', ex='Art gothique.'),
        Q('En ville au Moyen Âge, on trouve…', 'artisans et marchands', 'uniquement des paysans', 'des usines', 'des supermarchés', ex='Les villes se développent.'),
        Q('Le calendrier des paysans suit…', 'les fêtes religieuses et les saisons', 'les vacances scolaires', 'les matchs de foot', 'la télévision', ex='Rythme de vie médiéval.'),
        Q('Une enluminure est…', 'une décoration peinte dans un manuscrit', 'une lampe', 'un vitrail', 'une épée', ex='Art du livre médiéval.'),
    ])
    lesson(S('hi', 4), 'Découvrir la monarchie aux XVIe et XVIIe siècles', 'Le roi de France renforce son pouvoir. François Ier (1515-1547) impose le français dans les actes officiels (1539). Henri IV met fin aux guerres de religion par l’édit de Nantes (1598). Louis XIV gouverne seul : c’est la monarchie absolue.', [
        Q('Quel roi a imposé le français dans les actes officiels ?', 'François Ier', 'Louis XIV', 'Henri IV', 'Charlemagne', ex='Ordonnance de Villers-Cotterêts, 1539.'),
        Q('Quel roi a signé l’édit de Nantes ?', 'Henri IV', 'François Ier', 'Louis XVI', 'Louis XIV', ex='1598, paix religieuse.'),
        Q('L’édit de Nantes accorde…', 'la liberté de culte aux protestants', 'l’école gratuite', 'le droit de vote', 'la fin de la monarchie', ex='Tolérance religieuse.'),
        Q('La monarchie absolue signifie que…', 'le roi a tous les pouvoirs', 'le peuple vote les lois', 'il n’y a pas de roi', 'le roi n’a aucun pouvoir', ex='Ex. : Louis XIV.'),
        Q('Louis XIV est surnommé…', 'le Roi-Soleil', 'le Roi-Lune', 'le Bon Roi', 'le Lion', ex='Symbole du soleil.'),
        O('Range ces rois dans l’ordre.', ['François Ier', 'Henri IV', 'Louis XIV'], ex='XVIe, fin XVIe, XVIIe siècles.'),
        Q('Les guerres de religion opposaient…', 'catholiques et protestants', 'Français et Romains', 'paysans et chevaliers', 'villes et campagnes', ex='XVIe siècle.'),
        N('En quelle année François Ier devient-il roi ?', 1515, ex='Bataille de Marignan, 1515.'),
    ])
    lesson(S('hi', 5), 'Situer Renaissance, pouvoir royal et Versailles', 'La Renaissance (XVe-XVIe siècles) est un renouveau des arts et des sciences venu d’Italie : Léonard de Vinci, les châteaux de la Loire. L’imprimerie de Gutenberg diffuse les livres. Louis XIV fait construire le château de Versailles pour montrer sa puissance.', [
        Q('D’où vient la Renaissance ?', 'D’Italie', 'D’Angleterre', 'De Chine', 'D’Amérique', ex='Florence, Rome…'),
        Q('Quel artiste a peint la Joconde ?', 'Léonard de Vinci', 'Picasso', 'Monet', 'Van Gogh', ex='Artiste de la Renaissance.'),
        Q('Qui a inventé l’imprimerie à caractères mobiles en Europe ?', 'Gutenberg', 'Pasteur', 'Edison', 'Louis XIV', ex='Vers 1450.'),
        Q('Pourquoi l’imprimerie est-elle importante ?', 'Les livres se diffusent plus vite et moins cher', 'Elle fabrique des châteaux', 'Elle produit de l’électricité', 'Elle remplace les rois', ex='Diffusion du savoir.'),
        Q('Quel château Louis XIV a-t-il fait agrandir pour y installer la cour ?', 'Versailles', 'Chambord', 'le Louvre', 'Fontainebleau', ex='Symbole du pouvoir royal.'),
        Q('Chambord est…', 'un château de la Renaissance au bord de la Loire', 'une cathédrale gothique', 'une usine', 'un château fort médiéval', ex='Construit pour François Ier.'),
        Q('À Versailles, la noblesse…', 'vit à la cour, sous le regard du roi', 'cultive les champs', 'est interdite', 'travaille à l’usine', ex='Le roi contrôle les nobles.'),
        Q('La galerie des Glaces se trouve…', 'au château de Versailles', 'à Chambord', 'à Notre-Dame', 'au Mont-Saint-Michel', ex='Salle célèbre.'),
    ])
    lesson(S('hi', 6), 'Comprendre les voyages européens du XVe au XVIIe siècle', 'Aux XVe et XVIe siècles, des navigateurs européens explorent les océans grâce à de nouveaux navires (caravelles) et instruments (boussole, astrolabe). Christophe Colomb atteint l’Amérique en 1492 ; l’expédition de Magellan fait le premier tour du monde (1519-1522).', [
        N('En quelle année Christophe Colomb atteint-il l’Amérique ?', 1492, ex='1492.'),
        Q('Quelle expédition fait le premier tour du monde ?', 'celle de Magellan', 'celle de Colomb', 'celle de Marco Polo', 'celle de Vasco de Gama', ex='1519-1522.'),
        Q('Quel navire utilisent les explorateurs ?', 'la caravelle', 'le paquebot', 'le sous-marin', 'le pétrolier', ex='Navire léger et maniable.'),
        Q('À quoi sert une boussole ?', 'À trouver le nord', 'À mesurer la vitesse', 'À pêcher', 'À voir loin', ex='Orientation.'),
        Q('Pourquoi les Européens cherchaient-ils de nouvelles routes ?', 'Pour commercer, notamment les épices', 'Pour faire du tourisme', 'Pour fuir la neige', 'Pour trouver des dinosaures', ex='Commerce des épices et de l’or.'),
        Q('Colomb pensait arriver…', 'aux Indes (Asie)', 'en Afrique', 'au pôle Nord', 'en Australie', ex='D’où le nom « Indiens ».'),
        Q('Vasco de Gama a ouvert une route vers l’Inde en contournant…', 'l’Afrique', 'l’Amérique', 'l’Europe', 'l’Antarctique', ex='Par le cap de Bonne-Espérance.'),
        O('Range ces voyages dans l’ordre.', ['Colomb atteint l’Amérique', 'Vasco de Gama arrive en Inde', 'Tour du monde de Magellan'], ex='1492, 1498, 1519-1522.'),
    ])
    lesson(S('hi', 7), 'Aborder conquêtes, traite et esclavage avec des documents', 'Les explorations sont suivies de conquêtes : les Européens soumettent les peuples d’Amérique (Aztèques, Incas), qui sont aussi décimés par les maladies. Du XVIe au XIXe siècle, des millions d’Africains sont déportés de force vers l’Amérique et réduits en esclavage : c’est la traite. La France abolit définitivement l’esclavage en 1848.', [
        Q('Quels empires d’Amérique ont été conquis par les Espagnols ?', 'les Aztèques et les Incas', 'les Romains et les Grecs', 'les Gaulois', 'les Vikings', ex='Conquête du XVIe siècle.'),
        Q('Pourquoi beaucoup d’Amérindiens sont-ils morts ?', 'Les guerres et les maladies apportées d’Europe', 'Le froid uniquement', 'Ils ont quitté l’Amérique', 'Par une météorite', ex='Variole, rougeole…'),
        Q('La traite négrière désigne…', 'le commerce forcé d’Africains réduits en esclavage', 'le commerce du lait', 'un voyage touristique', 'un échange culturel libre', ex='Crime contre l’humanité.'),
        Q('Le commerce triangulaire relie…', 'l’Europe, l’Afrique et l’Amérique', 'la France et l’Italie', 'l’Asie et l’Océanie', 'Paris et Lyon', ex='Trois continents.'),
        N('En quelle année la France abolit-elle définitivement l’esclavage ?', 1848, ex='Grâce notamment à Victor Schœlcher.'),
        Q('Une personne réduite en esclavage…', 'est privée de liberté et traitée comme une marchandise', 'est un employé payé', 'est un voyageur', 'est un soldat volontaire', ex='Négation des droits humains.'),
        Q('Aujourd’hui, la loi française reconnaît la traite et l’esclavage comme…', 'un crime contre l’humanité', 'un simple commerce', 'une légende', 'un sport', ex='Loi de 2001.'),
        Q('Pourquoi étudier cette histoire ?', 'Pour comprendre et ne pas oublier ces injustices', 'Pour la reproduire', 'Ce n’est pas utile', 'Pour se moquer', ex='Mémoire et respect.'),
    ])
    lesson(S('hi', 8), 'Comprendre les causes et les événements de 1789', 'En 1789, la France est en crise : le peuple a faim, le roi Louis XVI manque d’argent, le Tiers état paie presque tous les impôts. Les états généraux se réunissent. Le 14 juillet 1789, les Parisiens prennent la Bastille. Le 4 août, les privilèges sont abolis.', [
        N('En quelle année commence la Révolution française ?', 1789, ex='1789.'),
        Q('Que se passe-t-il le 14 juillet 1789 ?', 'La prise de la Bastille', 'Le sacre de Napoléon', 'La fin de la Première Guerre mondiale', 'La découverte de l’Amérique', ex='Symbole de la Révolution.'),
        Q('Quel roi règne en 1789 ?', 'Louis XVI', 'Louis XIV', 'Henri IV', 'François Ier', ex='Louis XVI.'),
        Q('Les trois ordres de la société sont…', 'clergé, noblesse, Tiers état', 'rois, reines, princes', 'paysans, ouvriers, patrons', 'enfants, adultes, anciens', ex='Société d’Ancien Régime.'),
        Q('Qui paie la plupart des impôts avant 1789 ?', 'le Tiers état', 'la noblesse', 'le clergé', 'le roi', ex='Injustice fiscale.'),
        Q('La nuit du 4 août 1789, on abolit…', 'les privilèges', 'la royauté', 'l’école', 'la monnaie', ex='Fin des privilèges.'),
        Q('La Bastille était…', 'une prison, symbole du pouvoir royal', 'un château de vacances', 'une église', 'un marché', ex='Prise le 14 juillet.'),
        Q('Aujourd’hui, le 14 juillet est…', 'la fête nationale', 'un jour comme un autre', 'la rentrée', 'Noël', ex='Fête nationale française.'),
    ])
    lesson(S('hi', 9), 'Relier droits, souveraineté et changements politiques', 'La Déclaration des droits de l’homme et du citoyen (26 août 1789) affirme que les hommes naissent libres et égaux en droits. La souveraineté appartient désormais à la nation. La monarchie est abolie et la République proclamée en 1792.', [
        Q('Quel texte est adopté le 26 août 1789 ?', 'la Déclaration des droits de l’homme et du citoyen', 'le Code civil', 'l’édit de Nantes', 'la Constitution de 1958', ex='Texte fondateur.'),
        Q('Article 1 : « Les hommes naissent et demeurent… »', '« libres et égaux en droits »', '« riches et puissants »', '« sujets du roi »', '« tous identiques »', ex='Principe d’égalité.'),
        Q('La souveraineté nationale signifie que le pouvoir appartient…', 'à la nation, au peuple', 'au roi seul', 'à l’Église', 'aux nobles', ex='Changement majeur.'),
        N('En quelle année la République est-elle proclamée pour la première fois ?', 1792, ex='Première République.'),
        Q('La devise « Liberté, Égalité, Fraternité » vient…', 'de la Révolution', 'du Moyen Âge', 'de l’Antiquité', 'de 2020', ex='Elle devient la devise de la République.'),
        Q('Que devient Louis XVI ?', 'Il est jugé et exécuté en 1793', 'Il devient président', 'Il part en Amérique', 'Il règne jusqu’en 1850', ex='Fin de la monarchie.'),
        Q('Le drapeau tricolore date…', 'de la Révolution', 'du Moyen Âge', 'de Louis XIV', 'de 1945', ex='Bleu, blanc, rouge.'),
        O('Range dans l’ordre.', ['Prise de la Bastille', 'Déclaration des droits de l’homme', 'Proclamation de la République'], ex='1789, 1789, 1792.'),
    ])
    # ================= GÉOGRAPHIE =================
    lesson(S('ge', 1), 'Lire une carte, une légende et localiser', 'Une carte représente un espace vu d’en haut, en plus petit. La légende explique les couleurs et symboles. L’échelle indique les distances réelles. La rose des vents donne les points cardinaux : nord, sud, est, ouest.', [
        Q('À quoi sert la légende d’une carte ?', 'À expliquer les symboles et couleurs', 'À décorer', 'À donner le prix', 'À rien', ex='Clé de lecture.'),
        Q('Le nord est généralement…', 'en haut de la carte', 'en bas', 'à gauche', 'à droite', ex='Convention.'),
        Q('Sur une carte, le bleu représente souvent…', 'l’eau (mers, rivières)', 'les forêts', 'les villes', 'les routes', ex='Convention des couleurs.'),
        Q('L’échelle d’une carte sert à…', 'calculer les distances réelles', 'mesurer la température', 'trouver l’heure', 'colorier', ex='1 cm = x km.'),
        N('Échelle : 1 cm = 10 km. Deux villes sont à 4 cm. Distance réelle (km) ?', 40, ex='4 × 10 = 40.'),
        Q('À l’opposé du nord se trouve…', 'le sud', 'l’est', 'l’ouest', 'le centre', ex='Points cardinaux.'),
        Q('Quel océan borde la côte ouest de la France ?', 'l’océan Atlantique', 'l’océan Pacifique', 'l’océan Indien', 'l’océan Arctique', ex='Atlantique.'),
        Q('Quelle mer borde le sud de la France ?', 'la Méditerranée', 'la mer du Nord', 'la Manche', 'la mer Baltique', ex='Méditerranée.'),
    ])
    lesson(S('ge', 2), 'Comparer les façons de se nourrir', 'Dans le monde, on ne mange pas de la même façon : selon le climat, les cultures, les ressources et les traditions. Le riz est essentiel en Asie, le maïs en Amérique, le blé en Europe. Une partie de nos aliments vient de très loin.', [
        Q('Quelle céréale est la base de l’alimentation en Asie ?', 'le riz', 'le blé', 'l’avoine', 'le seigle', ex='Riz.'),
        Q('Quelle céréale est très cultivée en Amérique ?', 'le maïs', 'le riz', 'l’orge', 'le sarrasin', ex='Maïs, d’origine américaine.'),
        Q('Pourquoi l’alimentation varie-t-elle selon les régions ?', 'Climat, ressources et traditions', 'Par hasard', 'Tout le monde mange pareil', 'À cause des écrans', ex='Facteurs géographiques et culturels.'),
        Q('Manger des produits locaux et de saison…', 'réduit le transport et la pollution', 'est interdit', 'coûte toujours plus cher', 'n’a aucun effet', ex='Moins de kilomètres parcourus.'),
        Q('Le cacao vient surtout…', 'de pays tropicaux (Afrique de l’Ouest, Amérique du Sud)', 'de Norvège', 'du pôle Nord', 'de France', ex='Climat chaud et humide.'),
        Q('Un circuit court, c’est…', 'acheter directement au producteur ou avec peu d’intermédiaires', 'acheter très vite', 'un circuit automobile', 'un trajet en avion', ex='Ex. : marché de producteurs.'),
        Q('Dans certaines régions du monde, des personnes souffrent…', 'de la faim', 'de trop de choix seulement', 'd’aucun problème', 'de trop de pluie seulement', ex='Inégalités alimentaires.'),
        Q('Le gaspillage alimentaire, c’est…', 'jeter de la nourriture encore mangeable', 'manger lentement', 'cuisiner', 'faire les courses', ex='À éviter.'),
    ])
    lesson(S('ge', 3), 'Comprendre les inégalités d’accès aux ressources et aux services', 'Dans le monde, tout le monde n’a pas le même accès à l’eau potable, à l’électricité, aux soins ou à l’école. Ces inégalités existent entre pays et aussi à l’intérieur d’un même pays.', [
        Q('L’eau potable est…', 'une eau qu’on peut boire sans danger', 'l’eau de mer', 'l’eau d’une flaque', 'l’eau gazeuse seulement', ex='Eau saine.'),
        Q('Dans certaines régions, les enfants marchent longtemps pour…', 'aller chercher de l’eau', 'aller au cinéma', 'acheter des jeux', 'faire du sport', ex='Inégalités d’accès.'),
        Q('Un service essentiel est…', 'l’hôpital', 'un parc d’attractions', 'une boutique de jouets', 'un stade', ex='Soins.'),
        Q('Les inégalités peuvent exister…', 'entre pays et à l’intérieur d’un pays', 'seulement entre continents', 'nulle part', 'seulement en ville', ex='Ville/campagne, quartiers…'),
        Q('Pourquoi l’accès à l’école est-il important ?', 'Pour apprendre et choisir son avenir', 'Pour jouer seulement', 'Ce n’est pas important', 'Pour manger', ex='Droit de l’enfant.'),
        Q('Une ONG est…', 'une association qui agit, par exemple, pour l’accès à l’eau ou aux soins', 'une entreprise de jeux', 'un pays', 'un parti politique', ex='Organisation non gouvernementale.'),
        Q('Le désert médical, c’est…', 'un territoire où il manque de médecins', 'un désert de sable', 'une plage', 'un hôpital neuf', ex='Inégalité en France.'),
        Q('Quelle action réduit les inégalités d’accès à l’eau ?', 'Construire des puits et des réseaux d’eau', 'Gaspiller l’eau', 'Polluer les rivières', 'Fermer les écoles', ex='Aménagements.'),
    ])
    lesson(S('ge', 4), 'Comparer des manières de se déplacer', 'On se déplace à pied, à vélo, en voiture, en bus, en train, en avion ou en bateau. Le choix dépend de la distance, du coût, du temps et des moyens disponibles. Certains modes de transport polluent plus que d’autres.', [
        Q('Quel moyen de transport pollue le moins ?', 'le vélo', 'l’avion', 'la voiture seule', 'le camion', ex='Pas de carburant.'),
        Q('Pour traverser l’océan Atlantique rapidement, on prend…', 'l’avion', 'le vélo', 'la trottinette', 'le bus', ex='Le plus rapide sur longue distance.'),
        Q('Le TGV est…', 'un train à grande vitesse', 'un bus', 'un bateau', 'un avion', ex='Train rapide.'),
        Q('Le covoiturage, c’est…', 'partager une voiture à plusieurs', 'louer un vélo', 'prendre l’avion', 'marcher en groupe', ex='Moins de voitures sur la route.'),
        Q('Dans une grande ville, le métro permet…', 'de se déplacer vite en évitant les embouteillages', 'de traverser l’océan', 'de voler', 'de transporter des montagnes', ex='Transport en commun.'),
        Q('Les transports en commun sont…', 'partagés par de nombreuses personnes', 'réservés à une personne', 'interdits en ville', 'toujours des avions', ex='Bus, tram, métro, train.'),
        Q('Dans certaines régions isolées, on se déplace surtout…', 'à pied ou en pirogue', 'en métro', 'en TGV', 'en téléphérique uniquement', ex='Selon les aménagements.'),
        M('Associe chaque transport à son milieu.', [('Bateau', 'eau'), ('Avion', 'air'), ('Train', 'rail')], ex='Modes de transport.'),
    ])
    lesson(S('ge', 5), 'Comprendre Internet comme réseau mondial', 'Internet relie des milliards d’ordinateurs, de téléphones et de serveurs dans le monde. Les données circulent par des câbles (souvent sous les océans), des antennes et des satellites. Il sert à communiquer, s’informer, travailler.', [
        Q('Internet est…', 'un réseau mondial d’ordinateurs reliés', 'un seul ordinateur', 'un logiciel de dessin', 'une chaîne de télévision', ex='Réseau de réseaux.'),
        Q('Par où passent une grande partie des données entre continents ?', 'Des câbles sous les océans', 'Des tuyaux d’eau', 'Des pigeons voyageurs', 'Des routes', ex='Câbles sous-marins.'),
        Q('Un serveur est…', 'un ordinateur qui stocke et distribue des données', 'un serveur de restaurant', 'un satellite', 'une tablette', ex='Centres de données.'),
        Q('Envoyer un message à l’autre bout du monde prend…', 'quelques secondes ou moins', 'plusieurs semaines', 'un an', 'c’est impossible', ex='Très rapide.'),
        Q('Le Wi-Fi permet…', 'de se connecter sans fil', 'de recharger une batterie', 'de laver le linge', 'de mesurer la pluie', ex='Connexion sans câble.'),
        Q('Les centres de données consomment…', 'beaucoup d’électricité', 'aucune énergie', 'de l’eau de mer uniquement', 'du sable', ex='Impact environnemental.'),
        Q('Avant de croire une information trouvée sur Internet, on…', 'vérifie la source', 'la partage immédiatement', 'la croit toujours', 'l’oublie', ex='Esprit critique.'),
        Q('Un satellite peut servir à…', 'relier à Internet des zones isolées', 'faire pousser des plantes', 'faire de la pluie', 'remplacer les câbles électriques des maisons', ex='Connexion par satellite.'),
    ])
    # ================= ANGLAIS =================
    E = lambda n: S('en', n)
    lesson(E(1), 'Se présenter et demander une information', 'To introduce yourself : « Hello, my name is Léo. I’m ten years old. I live in Lyon. » To ask : « What’s your name? How old are you? Where do you live? »', [
        Q('Comment demander le prénom de quelqu’un ?', 'What’s your name?', 'How old are you?', 'Where do you live?', 'How are you?', ex='What’s your name?'),
        Q('« I’m ten years old » veut dire…', 'J’ai dix ans', 'J’habite à Dix', 'Je suis le dixième', 'Il est dix heures', ex='Âge.'),
        Q('Comment demander où quelqu’un habite ?', 'Where do you live?', 'What’s your name?', 'How old are you?', 'What time is it?', ex='Where = où.'),
        Q('Réponse à « How are you? »', 'I’m fine, thank you.', 'I’m ten.', 'My name is Tom.', 'I live in Paris.', ex='Ça va ?'),
        M('Associe chaque question à sa réponse.', [('What’s your name?', 'My name is Lily.'), ('How old are you?', 'I’m nine.'), ('Where do you live?', 'I live in Nice.')], ex='Questions de présentation.'),
        Q('« I have got a brother » veut dire…', 'J’ai un frère', 'Je suis un frère', 'J’aime mon frère', 'Mon frère est grand', ex='have got = avoir.'),
        Q('Comment dire « J’ai onze ans » ?', 'I’m eleven.', 'I have eleven.', 'I’m eleven years.', 'My eleven.', ex='En anglais on utilise « to be ».'),
        Q('« Nice to meet you » se dit…', 'quand on rencontre quelqu’un', 'pour dire au revoir le soir', 'pour s’excuser', 'pour demander l’heure', ex='Enchanté.'),
    ])
    lesson(E(2), 'Présenter un personnage et ses goûts', 'To talk about someone : « This is Emma. She’s eleven. She likes football. She doesn’t like spinach. » Like / love / hate express tastes.', [
        Q('« She likes cats » veut dire…', 'Elle aime les chats', 'Il aime les chats', 'Elle n’aime pas les chats', 'Elle a des chats', ex='She = elle ; likes = aime.'),
        Q('Comment dire « Il n’aime pas le chocolat » ?', 'He doesn’t like chocolate.', 'He likes chocolate.', 'He don’t like chocolate.', 'She doesn’t like chocolate.', ex='doesn’t like.'),
        Q('« I love music » veut dire…', 'J’adore la musique', 'Je déteste la musique', 'Je joue de la musique', 'J’écoute la radio', ex='love = adorer.'),
        Q('Le contraire de « I like » ?', 'I don’t like', 'I love', 'I am', 'I have', ex='Négation.'),
        Q('« He has got blue eyes » décrit…', 'ses yeux', 'ses cheveux', 'son âge', 'ses goûts', ex='eyes = yeux.'),
        Q('Comment demander « Est-ce que tu aimes le sport ? »', 'Do you like sport?', 'You like sport?', 'Does you like sport?', 'Like you sport?', ex='Do you like… ?'),
        M('Associe.', [('hair', 'cheveux'), ('eyes', 'yeux'), ('tall', 'grand')], ex='Vocabulaire de description.'),
        Q('Réponse correcte à « Does she like pizza? »', 'Yes, she does.', 'Yes, she likes.', 'Yes, she is.', 'Yes, she do.', ex='Réponse courte.'),
    ])
    lesson(E(3), 'Exprimer une émotion et faire préciser un message', 'Emotions : happy, sad, angry, scared, tired, excited. « I’m happy! » To ask someone to repeat : « Can you repeat, please? » / « Sorry? » / « What does … mean? »', [
        Q('« I’m sad » veut dire…', 'Je suis triste', 'Je suis content', 'J’ai peur', 'Je suis fatigué', ex='sad = triste.'),
        Q('Comment dire « J’ai peur » ?', 'I’m scared.', 'I’m happy.', 'I’m angry.', 'I’m hungry.', ex='scared = effrayé.'),
        Q('Pour faire répéter, on dit…', 'Can you repeat, please?', 'Goodbye!', 'Thank you!', 'I’m fine.', ex='Demande polie.'),
        Q('« What does “ruler” mean? » sert à…', 'demander le sens d’un mot', 'demander l’heure', 'dire au revoir', 'demander son chemin', ex='Que signifie… ?'),
        M('Associe chaque émotion.', [('happy', 'content'), ('angry', 'en colère'), ('tired', 'fatigué')], ex='Émotions.'),
        Q('« I’m hungry » veut dire…', 'J’ai faim', 'J’ai soif', 'J’ai froid', 'J’ai peur', ex='hungry = faim.'),
        Q('Comment demander « Comment ça va ? »', 'How are you?', 'Who are you?', 'Where are you?', 'How old are you?', ex='How are you?'),
        Q('« Speak slowly, please » veut dire…', 'Parle lentement, s’il te plaît', 'Parle fort', 'Tais-toi', 'Viens vite', ex='slowly = lentement.'),
    ])
    lesson(E(4), 'Suivre une histoire et des consignes orales', 'Classroom instructions : « Stand up! Sit down! Open your book! Close the door! Listen! Look! » In stories : « Once upon a time… », « The end. »', [
        Q('« Stand up! » veut dire…', 'Lève-toi !', 'Assieds-toi !', 'Écoute !', 'Regarde !', ex='stand up = se lever.'),
        Q('« Open your book » veut dire…', 'Ouvre ton livre', 'Ferme ton livre', 'Lis ton livre', 'Range ton livre', ex='open = ouvrir.'),
        Q('« Once upon a time » veut dire…', 'Il était une fois', 'Fin de l’histoire', 'Bonne nuit', 'Une fois par semaine', ex='Début de conte.'),
        Q('« Close the window » veut dire…', 'Ferme la fenêtre', 'Ouvre la porte', 'Regarde la fenêtre', 'Nettoie la fenêtre', ex='close = fermer.'),
        M('Associe chaque consigne.', [('Listen!', 'Écoute !'), ('Look!', 'Regarde !'), ('Sit down!', 'Assieds-toi !')], ex='Consignes de classe.'),
        Q('« Take a pencil » veut dire…', 'Prends un crayon', 'Range ton crayon', 'Donne un crayon', 'Casse un crayon', ex='take = prendre.'),
        Q('« The end » se trouve…', 'à la fin d’une histoire', 'au début', 'au milieu', 'sur la couverture', ex='Fin.'),
        Q('« Raise your hand » veut dire…', 'Lève la main', 'Serre la main', 'Lave tes mains', 'Baisse la tête', ex='raise = lever.'),
    ])
    lesson(E(5), 'Lire de courts textes et repérer des informations', 'To read a short text in English, look for words you know, numbers, names and words that look like French (transparent words : animal, family, football).', [
        Q('« Tom is a boy. He is nine. He has got a dog called Max. » Quel âge a Tom ?', '9 ans', '10 ans', '8 ans', 'On ne sait pas', ex='nine = neuf.', passage='Tom is a boy. He is nine. He has got a dog called Max.'),
        Q('Comment s’appelle le chien ?', 'Max', 'Tom', 'Dog', 'Nine', ex='called Max.', passage='Tom is a boy. He is nine. He has got a dog called Max.'),
        Q('Un mot transparent ressemble…', 'à un mot français', 'à un chiffre', 'à rien', 'à un dessin', ex='Ex. : family, animal.'),
        Q('« Lucy lives in London. She likes tea. » Où vit Lucy ?', 'À Londres', 'À Paris', 'À Lucy', 'On ne sait pas', ex='London = Londres.', passage='Lucy lives in London. She likes tea.'),
        Q('Que boit Lucy ?', 'Du thé', 'Du café', 'Du lait', 'De l’eau', ex='tea = thé.', passage='Lucy lives in London. She likes tea.'),
        M('Associe chaque mot transparent.', [('elephant', 'éléphant'), ('chocolate', 'chocolat'), ('family', 'famille')], ex='Mots transparents.'),
        Q('« There are three apples on the table. » Combien de pommes ?', '3', '2', '4', '13', ex='three = trois.'),
        Q('Pour comprendre un texte, il faut…', 's’appuyer sur les mots connus', 'connaître tous les mots', 'abandonner', 'traduire mot à mot obligatoirement', ex='Stratégie de lecture.'),
    ])
    lesson(E(6), 'Écrire avec un modèle et décrire son environnement', 'To describe your room or town : « In my bedroom, there is a bed and a desk. There are two posters. » « In my town, there is a park and a school. »', [
        Q('« There is a bed » veut dire…', 'Il y a un lit', 'C’est mon lit', 'Le lit est là-bas', 'J’ai un lit', ex='There is = il y a (singulier).'),
        Q('Comment dire « Il y a deux chaises » ?', 'There are two chairs.', 'There is two chairs.', 'There are two chair.', 'There two chairs.', ex='There are + pluriel.'),
        M('Associe chaque meuble.', [('bed', 'lit'), ('desk', 'bureau'), ('wardrobe', 'armoire')], ex='Vocabulaire de la chambre.'),
        Q('« In my town, there is a library » : library veut dire…', 'bibliothèque', 'librairie', 'liberté', 'laboratoire', ex='Faux ami : library = bibliothèque.'),
        Q('Comment dire « ma maison » ?', 'my house', 'mine house', 'my home house', 'me house', ex='my = mon/ma.'),
        Q('« The cat is under the table » : under veut dire…', 'sous', 'sur', 'à côté de', 'devant', ex='under = sous.'),
        Q('« The book is on the shelf » : on veut dire…', 'sur', 'sous', 'derrière', 'dans', ex='on = sur.'),
        M('Associe chaque lieu de la ville.', [('school', 'école'), ('park', 'parc'), ('station', 'gare')], ex='La ville.'),
    ])
    lesson(E(7), 'Raconter brièvement à partir d’images', 'To tell a story from pictures : « First, … Then, … Finally, … » Use simple verbs : he wakes up, he eats, he goes to school, he plays.', [
        Q('« First » veut dire…', 'd’abord', 'enfin', 'ensuite', 'jamais', ex='first = d’abord.'),
        Q('« Then » veut dire…', 'ensuite', 'd’abord', 'enfin', 'toujours', ex='then = ensuite.'),
        Q('« Finally » veut dire…', 'enfin', 'd’abord', 'puis', 'parfois', ex='finally = enfin.'),
        O('Remets la journée dans l’ordre.', ['He wakes up.', 'He has breakfast.', 'He goes to school.', 'He goes to bed.'], ex='Ordre de la journée.'),
        Q('« She goes to school by bus » veut dire…', 'Elle va à l’école en bus', 'Elle va au bus à pied', 'Elle prend le bus pour rentrer', 'Elle aime le bus', ex='by bus = en bus.'),
        Q('« He plays football » veut dire…', 'Il joue au football', 'Il regarde le football', 'Il aime le football', 'Il a un ballon', ex='play = jouer.'),
        Q('« It’s raining » décrit…', 'la pluie', 'le soleil', 'la neige', 'le vent', ex='rain = pluie.'),
        Q('Pour raconter, on utilise…', 'des mots de liaison comme first, then, finally', 'uniquement des chiffres', 'des mots en désordre', 'rien', ex='Structurer le récit.'),
    ])
    lesson(E(8), 'Explorer albums, traditions et modes de vie anglophones', 'English is spoken in many countries : the United Kingdom, Ireland, the United States, Canada, Australia, India… Traditions : Halloween (31 October), Thanksgiving (USA), Christmas crackers, Bonfire Night (5 November, UK).', [
        Q('Quelle est la capitale du Royaume-Uni ?', 'Londres', 'Dublin', 'Édimbourg', 'New York', ex='London.'),
        Q('Halloween a lieu le…', '31 octobre', '25 décembre', '14 juillet', '1er janvier', ex='31 October.'),
        Q('Thanksgiving est une fête célébrée surtout…', 'aux États-Unis', 'en France', 'en Chine', 'en Italie', ex='En novembre.'),
        Q('Quel pays a pour langue officielle l’anglais ?', 'l’Australie', 'l’Espagne', 'le Brésil', 'le Japon', ex='Australia.'),
        Q('Le « fish and chips » est un plat typique…', 'britannique', 'italien', 'mexicain', 'japonais', ex='UK.'),
        Q('Big Ben se trouve à…', 'Londres', 'New York', 'Sydney', 'Dublin', ex='Tour de l’horloge.'),
        Q('La statue de la Liberté est à…', 'New York', 'Londres', 'Paris', 'Toronto', ex='Offerte par la France.'),
        Q('Le drapeau du Royaume-Uni s’appelle…', 'l’Union Jack', 'la Bannière étoilée', 'le Tricolore', 'la Feuille d’érable', ex='Union Jack.'),
    ])
    lesson(E(9), 'Expliquer à un camarade un message très simple', 'Mediation : you help someone who doesn’t understand English. You explain the main idea in French : « The shop is closed on Sunday » → « Le magasin est fermé le dimanche. »', [
        Q('« The museum opens at 9 » : que dis-tu à ton ami ?', 'Le musée ouvre à 9 h.', 'Le musée ferme à 9 h.', 'Il y a 9 musées.', 'Le musée est gratuit.', ex='opens = ouvre.'),
        Q('« No dogs allowed » : explication ?', 'Les chiens sont interdits.', 'Les chiens sont gratuits.', 'Il n’y a pas de chiens.', 'Les chiens sont bienvenus.', ex='not allowed = interdit.'),
        Q('« Exit » sur une porte signifie…', 'Sortie', 'Entrée', 'Toilettes', 'Danger', ex='exit = sortie.'),
        Q('« Please wait here » : explication ?', 'Merci d’attendre ici.', 'Partez vite.', 'Entrez.', 'C’est fermé.', ex='wait = attendre.'),
        Q('« The bus leaves at half past three » : à quelle heure part le bus ?', '15 h 30 (trois heures et demie)', '15 h 03', '13 h 30', '3 h 15', ex='half past three = 3 h 30.'),
        Q('« Free entry » signifie…', 'Entrée gratuite', 'Entrée libre de sortir', 'Entrée fermée', 'Entrée payante', ex='free = gratuit.'),
        Q('Expliquer un message, c’est…', 'dire l’essentiel avec ses mots', 'traduire chaque mot sans comprendre', 'inventer', 'ne rien dire', ex='Médiation.'),
        Q('« Toilets on the left » : où sont les toilettes ?', 'À gauche', 'À droite', 'En haut', 'Tout droit', ex='left = gauche.'),
    ])
    lesson(E(10), 'Travailler sons, rythme et intonation', 'English has sounds that don’t exist in French : « th » (three, the), the « h » that is breathed (hello, house). Questions go up at the end. Some syllables are stressed : HAPpy, comPUter.', [
        Q('Comment se prononce le « h » de « hello » ?', 'On souffle légèrement', 'Il est muet', 'Comme un r', 'Comme un k', ex='Le h anglais est aspiré.'),
        Q('Le son « th » se fait…', 'avec la langue entre les dents', 'avec les lèvres fermées', 'en sifflant', 'avec la gorge', ex='three, think.'),
        Q('Dans « HAPpy », quelle syllabe est accentuée ?', 'HAP', 'py', 'aucune', 'les deux', ex='Accent tonique.'),
        Q('Dans une question en anglais, l’intonation…', 'monte souvent à la fin', 'descend toujours', 'ne change jamais', 'est chuchotée', ex='Are you ready? ↗'),
        Q('Quel mot contient le son « th » ?', 'mother', 'cat', 'dog', 'blue', ex='mo-TH-er.'),
        Q('Une comptine aide à…', 'travailler le rythme et la prononciation', 'apprendre les tables', 'compter les mots', 'rien', ex='Nursery rhymes.'),
        Q('« Ship » et « sheep » se distinguent par…', 'la longueur du son i', 'le h', 'rien', 'le p', ex='i court / ee long.'),
        Q('Quel mot a le même son que « blue » ?', 'two', 'cat', 'dog', 'red', ex='bl-ou / t-ou.'),
    ])
    # ================= EMC =================
    C = lambda n: S('emc', n)
    lesson(C(1), 'Comprendre égalité, fraternité et dignité', 'Égalité : tous ont les mêmes droits. Fraternité : se sentir solidaires les uns des autres. Dignité : chaque personne mérite le respect, quelle que soit sa situation.', [
        Q('La devise de la République est…', 'Liberté, Égalité, Fraternité', 'Travail, Famille, Patrie', 'Paix et Amour', 'Un pour tous', ex='Devise républicaine.'),
        Q('L’égalité signifie que…', 'tous ont les mêmes droits', 'tout le monde est identique', 'tous ont le même âge', 'certains ont plus de droits', ex='Égalité en droits.'),
        Q('La fraternité se manifeste quand…', 'on aide quelqu’un en difficulté', 'on se moque', 'on reste chacun pour soi', 'on exclut', ex='Solidarité.'),
        Q('Respecter la dignité d’une personne, c’est…', 'la traiter avec respect quelle que soit sa situation', 'la juger sur ses vêtements', 'l’ignorer', 'se moquer de sa pauvreté', ex='Respect inconditionnel.'),
        Q('Une collecte pour les Restos du cœur est un exemple de…', 'fraternité', 'discrimination', 'moquerie', 'compétition', ex='Solidarité.'),
        Q('Un élève handicapé doit pouvoir…', 'participer aux activités comme les autres, avec des adaptations', 'rester à l’écart', 'ne rien faire', 'changer d’école obligatoirement', ex='Égalité et inclusion.'),
    ])
    lesson(C(2), 'Repérer et refuser les discriminations', 'Discriminer, c’est traiter quelqu’un moins bien à cause de son origine, de sa couleur de peau, de son sexe, de sa religion, de son handicap, de son apparence… C’est injuste et interdit par la loi.', [
        Q('Qu’est-ce qu’une discrimination ?', 'Traiter quelqu’un injustement à cause de ce qu’il est', 'Choisir un dessert', 'Aider un camarade', 'Ranger sa chambre', ex='Inégalité de traitement injuste.'),
        Q('« Tu ne peux pas jouer, tu es une fille » est…', 'une discrimination', 'une règle du jeu', 'un compliment', 'normal', ex='Discrimination liée au sexe.'),
        Q('Si tu es témoin d’une discrimination, tu peux…', 'en parler à un adulte et soutenir la personne', 'rire avec les autres', 'faire semblant de rien', 'participer', ex='Agir et alerter.'),
        Q('La discrimination est…', 'interdite par la loi', 'autorisée', 'obligatoire', 'un jeu', ex='Loi française.'),
        Q('Un stéréotype, c’est…', 'une idée toute faite sur un groupe', 'un instrument de musique', 'une vérité scientifique', 'un compliment personnel', ex='« Les garçons ne pleurent pas » est un stéréotype.'),
        Q('Le Défenseur des droits peut…', 'aider les victimes de discrimination', 'punir les élèves en retard', 'faire les lois', 'organiser les élections', ex='Institution de protection.'),
    ])
    lesson(C(3), 'Développer empathie et solidarité', 'L’empathie, c’est se mettre à la place de l’autre et comprendre ce qu’il ressent. La solidarité, c’est agir pour aider ceux qui en ont besoin.', [
        Q('Avoir de l’empathie, c’est…', 'comprendre ce que ressent l’autre', 'ne penser qu’à soi', 'être toujours d’accord', 'se moquer', ex='Se mettre à sa place.'),
        Q('Un camarade pleure seul dans la cour. Une réaction empathique ?', 'Aller lui demander ce qui ne va pas', 'Rire', 'L’ignorer', 'Le filmer', ex='Montrer de l’attention.'),
        Q('Quelle action est solidaire ?', 'Aider un camarade à rattraper un cours', 'Garder ses affaires pour soi', 'Se moquer d’une erreur', 'Pousser dans la file', ex='Entraide.'),
        Q('Le tutorat entre élèves, c’est…', 'un élève qui en aide un autre', 'une punition', 'un jeu vidéo', 'une sortie', ex='Coopération.'),
        Q('« Je comprends que tu sois triste » montre…', 'de l’empathie', 'de la colère', 'de l’indifférence', 'de la moquerie', ex='Reconnaître l’émotion.'),
        Q('La solidarité peut être…', 'locale ou internationale', 'seulement familiale', 'interdite', 'inutile', ex='De l’entraide de quartier à l’aide humanitaire.'),
    ])
    lesson(C(4), 'Comprendre règle, loi et intérêt général', 'Les règles organisent la vie d’un groupe (règlement de l’école). Les lois s’appliquent à tous dans le pays ; elles sont votées par le Parlement. L’intérêt général, c’est ce qui est bon pour tous, pas seulement pour quelques-uns.', [
        Q('Qui vote les lois en France ?', 'le Parlement', 'le maire seul', 'les élèves', 'le directeur d’école', ex='Assemblée nationale et Sénat.'),
        Q('Le règlement intérieur de l’école sert à…', 'organiser la vie à l’école', 'punir sans raison', 'remplacer les lois', 'décorer la classe', ex='Règles communes.'),
        Q('Une loi s’applique…', 'à tous les citoyens', 'seulement aux enfants', 'seulement aux adultes riches', 'à personne', ex='Égalité devant la loi.'),
        Q('L’intérêt général, c’est…', 'ce qui est utile à tous', 'ce qui m’arrange', 'ce qui plaît à mes amis', 'ce qui rapporte de l’argent', ex='Bien commun.'),
        Q('Pourquoi a-t-on besoin de règles ?', 'Pour vivre ensemble en sécurité et équitablement', 'Pour s’ennuyer', 'Pour faire peur', 'Ce n’est pas utile', ex='Vie collective.'),
        Q('Respecter le code de la route protège…', 'tout le monde', 'seulement les policiers', 'personne', 'les voitures seulement', ex='Sécurité collective.'),
    ])
    lesson(C(5), 'Participer à une décision collective et à un projet', 'Pour décider ensemble : chacun propose, on discute, on vote. La majorité l’emporte mais on respecte ceux qui ne sont pas d’accord. Les délégués de classe représentent les élèves.', [
        Q('Un délégué de classe…', 'représente les élèves', 'commande les élèves', 'remplace l’enseignant', 'note les copies', ex='Il porte la voix de la classe.'),
        Q('Dans un vote, la majorité c’est…', 'plus de la moitié des voix', 'la voix du plus grand', 'toutes les voix', 'une seule voix', ex='Plus de 50 %.'),
        Q('Le vote secret permet…', 'de voter librement sans pression', 'de tricher', 'de voter plusieurs fois', 'de connaître le vote de chacun', ex='Liberté de choix.'),
        O('Remets dans l’ordre une décision collective.', ['Faire des propositions', 'En discuter', 'Voter', 'Appliquer la décision'], ex='Démarche démocratique.'),
        Q('Si mon idée n’est pas choisie, je…', 'respecte la décision du groupe', 'boude et quitte le projet', 'triche', 'refuse de participer', ex='Respect du vote.'),
        Q('Le conseil d’élèves sert à…', 'discuter des projets et problèmes de l’école', 'faire les devoirs', 'manger', 'jouer au foot', ex='Instance de participation.'),
    ])
    lesson(C(6), 'Comprendre ses responsabilités sur Internet', 'Sur Internet, on reste responsable de ce qu’on publie. On ne publie pas la photo de quelqu’un sans son accord. On garde ses informations personnelles (adresse, mot de passe) pour soi. On ne parle pas avec des inconnus.', [
        Q('Peut-on publier la photo d’un camarade sans son accord ?', 'Non', 'Oui', 'Oui si elle est drôle', 'Oui si on est ami', ex='Droit à l’image.'),
        Q('Ton mot de passe, tu le…', 'gardes secret', 'partages avec tout le monde', 'publies', 'écris sur ton cartable', ex='Sécurité.'),
        Q('Un inconnu te demande ton adresse en ligne. Tu…', 'refuses et préviens un adulte', 'la donnes', 'lui envoies une photo', 'lui donnes rendez-vous', ex='Prudence.'),
        Q('Le cyberharcèlement, c’est…', 'harceler quelqu’un en ligne', 'un jeu vidéo', 'une application de dessin', 'un réseau de câbles', ex='Il est puni par la loi.'),
        Q('Un message méchant envoyé en ligne…', 'peut blesser autant qu’à l’oral', 'n’a aucune conséquence', 'disparaît forcément', 'est autorisé', ex='Responsabilité.'),
        Q('En cas de problème en ligne, on peut appeler…', 'le 3018', 'le 15', 'le 17 uniquement', 'personne', ex='Numéro national contre le cyberharcèlement.'),
    ])
    lesson(C(7), 'Vérifier une information et respecter autrui', 'Une information doit être vérifiée : qui l’a écrite ? est-elle datée ? d’autres sources disent-elles la même chose ? Une fausse information (infox, « fake news ») peut tromper et blesser.', [
        Q('Avant de partager une information, on…', 'vérifie sa source', 'la partage vite', 'la modifie', 'l’invente', ex='Esprit critique.'),
        Q('Une « fake news » est…', 'une fausse information', 'une nouvelle vraie', 'un journal papier', 'une émission météo', ex='Infox.'),
        Q('Une source fiable est…', 'un média reconnu ou un site officiel', 'un message anonyme', 'une rumeur', 'un inconnu sur un réseau', ex='Source identifiée.'),
        Q('Si deux sources sérieuses se contredisent, on…', 'cherche d’autres sources', 'croit la plus choquante', 'invente sa version', 'arrête de réfléchir', ex='Croiser les sources.'),
        Q('Une photo peut-elle être truquée ?', 'Oui', 'Non jamais', 'Seulement en noir et blanc', 'Seulement les dessins', ex='Retouches, montages.'),
        Q('Partager une rumeur sur un camarade…', 'peut lui faire beaucoup de mal', 'est sans conséquence', 'est drôle', 'est conseillé', ex='Respect d’autrui.'),
    ])
    lesson(C(8), 'Agir pour l’environnement et le bien commun', 'Le bien commun, c’est ce qui appartient à tous : l’air, l’eau, les parcs, l’école. On le protège en triant ses déchets, en économisant l’eau et l’énergie, en respectant les lieux publics.', [
        Q('Quel geste économise l’eau ?', 'Fermer le robinet en se brossant les dents', 'Laisser couler l’eau', 'Prendre des bains longs chaque jour', 'Arroser à midi en plein soleil', ex='Économie d’eau.'),
        Q('Le tri des déchets permet…', 'de recycler certains matériaux', 'de polluer plus', 'de remplir les poubelles plus vite', 'rien', ex='Recyclage.'),
        Q('Un parc public est…', 'un bien commun à respecter', 'la propriété d’un seul', 'un lieu sans règles', 'une poubelle', ex='Espace partagé.'),
        Q('Éteindre la lumière en sortant d’une pièce…', 'économise l’énergie', 'use l’ampoule', 'est inutile', 'est interdit', ex='Sobriété énergétique.'),
        Q('Le compost permet de…', 'transformer les épluchures en engrais', 'jeter le plastique', 'brûler les déchets', 'stocker des piles', ex='Déchets organiques.'),
        Q('Où jeter une pile usagée ?', 'Dans un bac de collecte spécial', 'Dans la nature', 'Dans le compost', 'Dans la poubelle des épluchures', ex='Déchet dangereux.'),
    ])
    # ================= ARTS PLASTIQUES =================
    A = lambda n: S('ap', n)
    lesson(A(1), 'Jouer avec représentation, cadrage et point de vue', 'Le cadrage choisit ce qu’on montre : gros plan (un détail), plan large (tout le paysage). Le point de vue change selon la position : vu d’en haut (plongée), vu d’en bas (contre-plongée).', [
        Q('Un gros plan montre…', 'un détail en grand', 'tout le paysage', 'rien', 'un plan de ville', ex='Détail rapproché.'),
        Q('Une plongée, c’est voir le sujet…', 'd’en haut', 'd’en bas', 'de face', 'de dos', ex='La caméra est au-dessus.'),
        Q('Une contre-plongée donne souvent l’impression que le sujet est…', 'grand et puissant', 'petit et fragile', 'lointain', 'flou', ex='Vu d’en bas.'),
        Q('Un plan large montre…', 'un ensemble, un paysage', 'un œil', 'une main seulement', 'une lettre', ex='Vue d’ensemble.'),
        Q('Cadrer, c’est…', 'choisir ce qui est dans l’image', 'mettre un cadre en bois', 'colorier', 'découper au hasard', ex='Choix de composition.'),
        Q('Un même objet photographié de deux points de vue…', 'peut sembler très différent', 'est toujours identique', 'disparaît', 'change de couleur', ex='Le point de vue transforme la perception.'),
    ])
    lesson(A(2), 'Explorer matière, assemblage et volume', 'Une sculpture occupe l’espace en trois dimensions. On peut modeler (argile), assembler (objets récupérés), creuser (taille) ou plier. Les matériaux ont des textures différentes : lisse, rugueux, doux.', [
        Q('Une sculpture est une œuvre…', 'en trois dimensions', 'toujours plate', 'uniquement peinte', 'sonore', ex='Volume.'),
        Q('Modeler, c’est…', 'donner forme à une matière molle comme l’argile', 'peindre', 'photographier', 'découper du papier', ex='Technique du modelage.'),
        Q('Assembler, c’est…', 'réunir plusieurs éléments', 'effacer', 'colorier', 'imprimer', ex='Ex. : sculpture en objets de récupération.'),
        Q('Une surface rugueuse est…', 'rêche au toucher', 'très lisse', 'liquide', 'transparente', ex='Texture.'),
        Q('Le land art utilise…', 'des éléments naturels dans la nature', 'des écrans', 'uniquement du métal', 'des livres', ex='Feuilles, pierres, branches.'),
        Q('Tourner autour d’une sculpture permet…', 'de la voir sous plusieurs angles', 'de la casser', 'de la peindre', 'rien', ex='Œuvre en volume.'),
    ])
    lesson(A(3), 'Conduire un projet et faire des choix plastiques', 'Un projet artistique se prépare : une intention (que veux-je exprimer ?), des recherches (croquis), des choix (couleurs, matériaux, format), une réalisation, puis une présentation.', [
        O('Remets les étapes d’un projet dans l’ordre.', ['Avoir une intention', 'Faire des croquis', 'Choisir matériaux et couleurs', 'Réaliser', 'Présenter'], ex='Démarche de projet.'),
        Q('Un croquis est…', 'un dessin rapide de recherche', 'une œuvre finie', 'une photo', 'une sculpture', ex='Étape de recherche.'),
        Q('Les couleurs chaudes sont…', 'rouge, orange, jaune', 'bleu, vert, violet', 'noir et blanc', 'gris et marron', ex='Couleurs chaudes.'),
        Q('Les couleurs froides sont…', 'bleu, vert, violet', 'rouge, orange, jaune', 'rose et rouge', 'or et argent', ex='Couleurs froides.'),
        Q('Mélanger du bleu et du jaune donne…', 'du vert', 'du violet', 'de l’orange', 'du marron', ex='Couleurs secondaires.'),
        Q('Expliquer ses choix plastiques, c’est…', 'dire pourquoi on a choisi telle couleur ou tel matériau', 'recommencer', 'cacher son travail', 'copier', ex='Justifier sa démarche.'),
    ])
    lesson(A(4), 'Décrire et comparer œuvres, époques et usages', 'Décrire une œuvre : sa nature (peinture, sculpture, photo), son auteur, sa date, ce qu’elle représente, les couleurs et formes. On compare avec d’autres œuvres pour voir ce qui change selon les époques.', [
        Q('Le cartel d’une œuvre au musée indique…', 'l’auteur, le titre, la date, la technique', 'le prix du billet', 'les horaires', 'le nom du gardien', ex='Fiche d’identité.'),
        Q('« Les Nymphéas » est une œuvre de…', 'Claude Monet', 'Léonard de Vinci', 'Picasso', 'Rodin', ex='Peintre impressionniste.'),
        Q('« Le Penseur » est une sculpture de…', 'Auguste Rodin', 'Claude Monet', 'Van Gogh', 'Frida Kahlo', ex='Rodin.'),
        Q('Un portrait représente…', 'une personne', 'un paysage', 'des fruits', 'une bataille uniquement', ex='Genre du portrait.'),
        Q('Une nature morte représente…', 'des objets inanimés (fruits, vases…)', 'des animaux vivants', 'un paysage', 'une personne', ex='Genre pictural.'),
        Q('Les vitraux des cathédrales servaient aussi à…', 'raconter des histoires à ceux qui ne savaient pas lire', 'chauffer l’église', 'remplacer les portes', 'rien', ex='Usage des œuvres au Moyen Âge.'),
    ])
    lesson(A(5), 'Relier une œuvre à un contexte et à un ressenti', 'Une œuvre est liée à son époque et à l’histoire de son auteur. Elle peut aussi provoquer des émotions chez celui qui la regarde : joie, calme, inquiétude… Chacun peut exprimer son ressenti en le justifiant.', [
        Q('« La Nuit étoilée » a été peinte par…', 'Vincent Van Gogh', 'Monet', 'Rodin', 'Matisse', ex='1889.'),
        Q('Exprimer son ressenti face à une œuvre, c’est…', 'dire ce qu’elle nous fait éprouver et pourquoi', 'réciter la date', 'en faire une copie', 'la juger sans raison', ex='Émotion justifiée.'),
        Q('Des couleurs sombres et des formes tordues peuvent exprimer…', 'l’inquiétude', 'la fête', 'le calme', 'le printemps', ex='Lien formes-émotions.'),
        Q('Le contexte d’une œuvre, c’est…', 'l’époque et les événements autour de sa création', 'le cadre doré', 'le musée', 'le prix', ex='Contexte historique.'),
        Q('« Guernica » de Picasso dénonce…', 'les horreurs de la guerre', 'les vacances', 'la mode', 'le sport', ex='Bombardement de 1937.'),
        Q('Deux personnes peuvent-elles ressentir différemment la même œuvre ?', 'Oui', 'Non', 'Seulement les adultes', 'Seulement les artistes', ex='Chaque regard est personnel.'),
    ])
    lesson(A(6), 'Présenter et discuter une production', 'Présenter son travail : dire ce qu’on a voulu faire, comment on l’a fait, ce qu’on a réussi et ce qu’on changerait. Écouter les remarques des autres avec respect et donner un avis constructif.', [
        Q('Présenter sa production, c’est expliquer…', 'son intention et sa démarche', 'seulement le prix', 'le nom de son voisin', 'rien', ex='Intention et étapes.'),
        Q('Une remarque constructive…', 'aide à progresser', 'blesse sans raison', 'se moque', 'est interdite', ex='Critique bienveillante.'),
        Q('Quelle phrase est constructive ?', '« J’aime tes couleurs ; peut-être agrandir le personnage ? »', '« C’est moche. »', '« Nul. »', '« Je ne regarde pas. »', ex='Positif + suggestion.'),
        Q('Écouter les avis des autres permet…', 'de voir son travail autrement', 'de perdre son temps', 'de copier', 'de se fâcher', ex='Regards croisés.'),
        Q('Le vocabulaire utile pour parler d’une œuvre :', 'couleurs, formes, matières, composition', 'calories, minutes, euros', 'buts, points, sets', 'kilomètres', ex='Vocabulaire plastique.'),
        Q('Exposer les travaux de la classe, c’est…', 'les montrer à un public', 'les cacher', 'les jeter', 'les vendre obligatoirement', ex='Exposition.'),
    ])
    # ================= MUSIQUE =================
    U = lambda n: S('mu', n)
    lesson(U(1), 'Reconnaître instruments, voix et familles de timbres', 'Les instruments se rangent en familles : cordes (violon, guitare), vents (flûte, trompette), percussions (tambour, xylophone), claviers (piano). Le timbre, c’est la couleur du son qui permet de reconnaître un instrument.', [
        Q('Le violon est un instrument…', 'à cordes', 'à vent', 'à percussion', 'électronique', ex='Cordes frottées.'),
        Q('La trompette est un instrument…', 'à vent (cuivres)', 'à cordes', 'à percussion', 'à clavier', ex='Cuivres.'),
        Q('Le tambour est un instrument…', 'à percussion', 'à cordes', 'à vent', 'à clavier', ex='On le frappe.'),
        Q('Le timbre, c’est…', 'la couleur du son', 'le volume', 'la vitesse', 'la durée', ex='Il permet de reconnaître la source.'),
        M('Associe chaque instrument à sa famille.', [('Flûte', 'vents'), ('Guitare', 'cordes'), ('Xylophone', 'percussions')], ex='Familles d’instruments.'),
        Q('Une voix très aiguë de femme est…', 'soprano', 'basse', 'baryton', 'ténor', ex='Voix aiguë.'),
    ])
    lesson(U(2), 'Comparer structures, répétitions et contrastes', 'Une œuvre musicale a une structure : un refrain qui revient, des couplets différents. On repère des contrastes : fort / doux (nuances), rapide / lent (tempo), aigu / grave (hauteur).', [
        Q('Le refrain d’une chanson…', 'revient plusieurs fois', 'n’apparaît qu’une fois', 'est toujours instrumental', 'est la fin', ex='Il se répète.'),
        Q('« Forte » en musique veut dire…', 'fort', 'doux', 'lent', 'rapide', ex='Nuance.'),
        Q('« Piano » comme nuance veut dire…', 'doux', 'fort', 'rapide', 'aigu', ex='Joué doucement.'),
        Q('Le tempo, c’est…', 'la vitesse de la musique', 'le volume', 'le timbre', 'la hauteur', ex='Lent ou rapide.'),
        Q('Un crescendo, c’est…', 'un son qui devient de plus en plus fort', 'un son qui ralentit', 'un silence', 'un son plus grave', ex='Augmentation progressive.'),
        Q('Couplet, refrain, couplet, refrain : c’est…', 'une structure de chanson', 'un instrument', 'une nuance', 'un tempo', ex='Forme couplet-refrain.'),
    ])
    lesson(U(3), 'Situer quelques œuvres et pratiques musicales', 'Mozart (XVIIIe siècle) a composé des opéras et symphonies. Vivaldi a écrit « Les Quatre Saisons ». Le jazz est né aux États-Unis au début du XXe siècle. Chaque culture a ses musiques traditionnelles.', [
        Q('Qui a composé « Les Quatre Saisons » ?', 'Vivaldi', 'Mozart', 'Beethoven', 'Bach', ex='Antonio Vivaldi.'),
        Q('Mozart a vécu au…', 'XVIIIe siècle', 'Moyen Âge', 'XXIe siècle', 'Antiquité', ex='1756-1791.'),
        Q('Le jazz est né…', 'aux États-Unis', 'en France', 'en Chine', 'en Russie', ex='La Nouvelle-Orléans.'),
        Q('Un opéra est…', 'une œuvre où l’histoire est chantée', 'un instrument', 'une danse', 'une chanson courte', ex='Théâtre chanté.'),
        Q('Un orchestre symphonique réunit…', 'de nombreux instruments de familles différentes', 'un seul piano', 'uniquement des tambours', 'des chanteurs seulement', ex='Ensemble.'),
        Q('Le chef d’orchestre…', 'dirige les musiciens', 'joue de tous les instruments', 'vend les billets', 'chante seul', ex='Il coordonne.'),
    ])
    lesson(U(4), 'Jouer avec rythme, pulsation et tempo', 'La pulsation est le battement régulier de la musique (comme un cœur). Le rythme est l’organisation des sons longs et courts. On peut frapper la pulsation dans les mains et jouer un rythme par-dessus.', [
        Q('La pulsation est…', 'le battement régulier de la musique', 'la mélodie', 'les paroles', 'le silence', ex='Comme un métronome.'),
        Q('Un métronome sert à…', 'donner un tempo régulier', 'accorder une guitare', 'enregistrer', 'chanter', ex='Il bat la mesure.'),
        Q('Taper des mains sur chaque temps, c’est marquer…', 'la pulsation', 'le timbre', 'la nuance', 'la hauteur', ex='Pulsation.'),
        Q('Un rythme est fait de…', 'sons longs et courts organisés', 'un seul son tenu', 'couleurs', 'mots seulement', ex='Durées.'),
        Q('Le tempo « allegro » est…', 'rapide', 'lent', 'très doux', 'grave', ex='Allegro = vif.'),
        Q('Le tempo « adagio » est…', 'lent', 'rapide', 'fort', 'aigu', ex='Adagio = lent.'),
    ])
    lesson(U(5), 'Chanter collectivement avec expression', 'Chanter ensemble demande d’écouter les autres, de respirer au bon moment, de bien articuler et de suivre le chef de chœur. On met de l’expression selon le sens des paroles.', [
        Q('Pour bien chanter en groupe, il faut…', 'écouter les autres', 'chanter plus fort que tous', 'chanter seul', 'ne pas respirer', ex='Écoute collective.'),
        Q('Une chorale est…', 'un groupe de chanteurs', 'un instrument', 'une salle', 'un solo', ex='Chœur.'),
        Q('Avant de chanter, on…', 's’échauffe la voix', 'crie très fort', 'mange beaucoup', 'court un marathon', ex='Échauffement vocal.'),
        Q('Bien articuler permet…', 'que les paroles soient comprises', 'de chanter plus vite', 'd’être plus grand', 'rien', ex='Clarté.'),
        Q('Chanter « en canon », c’est…', 'commencer la même mélodie à des moments décalés', 'chanter faux', 'chanter seul', 'chanter en silence', ex='Ex. : « Frère Jacques ».'),
        Q('Une chanson triste se chante plutôt…', 'doucement et lentement', 'en criant', 'très vite', 'sans émotion', ex='Expression adaptée.'),
    ])
    lesson(U(6), 'Composer une séquence et justifier ses choix', 'Composer, c’est inventer une musique : choisir des sons, un rythme, un tempo, des nuances, un ordre. On peut utiliser des instruments, la voix, des objets ou un logiciel. On explique ensuite ses choix.', [
        Q('Composer, c’est…', 'inventer une musique', 'recopier une partition', 'écouter la radio', 'accorder un violon', ex='Création.'),
        Q('Pour créer une ambiance de tempête, on choisit plutôt…', 'des sons forts et rapides', 'des sons très doux', 'le silence total', 'une berceuse', ex='Lien son-intention.'),
        Q('Un paysage sonore est…', 'une création qui évoque un lieu par des sons', 'une photo', 'un tableau', 'une carte', ex='Ex. : la forêt, la mer.'),
        Q('Une boucle (en musique numérique), c’est…', 'un motif répété', 'une erreur', 'un instrument à cordes', 'un silence', ex='Loop.'),
        Q('Justifier ses choix, c’est…', 'expliquer pourquoi on a choisi ces sons', 'cacher sa composition', 'copier un ami', 'ne rien dire', ex='Explication.'),
        O('Remets la démarche dans l’ordre.', ['Choisir une intention', 'Explorer des sons', 'Organiser la séquence', 'Jouer et présenter'], ex='Démarche de création.'),
    ])
    # ================= EPS =================
    P = lambda n: S('eps', n)
    lesson(P(1), 'Courir, sauter, lancer et apprécier ses résultats', 'En athlétisme, on mesure ses performances : temps en course, distance en lancer et en saut. On s’échauffe avant, on note ses résultats pour voir ses progrès.', [
        Q('Que mesure-t-on en course de vitesse ?', 'le temps', 'la distance lancée', 'la masse', 'la hauteur', ex='Chronomètre.'),
        Q('Que mesure-t-on au saut en longueur ?', 'la distance', 'le temps', 'le poids', 'la température', ex='En mètres.'),
        Q('Pourquoi s’échauffer avant l’effort ?', 'Pour préparer le corps et éviter les blessures', 'Pour se fatiguer', 'Ce n’est pas utile', 'Pour perdre du temps', ex='Prévention.'),
        Q('Un relais, c’est…', 'une course où l’on se passe un témoin', 'un saut', 'un lancer', 'une nage', ex='Course d’équipe.'),
        Q('Pour progresser, on…', 'note ses résultats et compare', 'ne mesure jamais', 'triche', 'abandonne', ex='Suivi des performances.'),
        Q('Après l’effort, il est bon de…', 's’étirer doucement et boire', 'manger des bonbons', 'courir encore plus vite', 'ne rien faire', ex='Récupération.'),
    ], adult='Mesurez ensemble un saut ou une course à l’extérieur et notez le résultat pour comparer plus tard.')
    lesson(P(2), 'S’orienter dans un espace partiellement connu', 'En course d’orientation, on utilise une carte pour trouver des balises. On oriente la carte (le nord de la carte vers le nord réel), on repère des éléments du terrain et on suit son itinéraire.', [
        Q('Que cherche-t-on en course d’orientation ?', 'des balises', 'des trésors cachés sous terre', 'des ballons', 'des animaux', ex='Balises de contrôle.'),
        Q('Orienter sa carte, c’est…', 'placer le nord de la carte vers le nord réel', 'la plier', 'la colorier', 'la retourner', ex='Lecture de carte.'),
        Q('Un élément utile pour se repérer est…', 'un grand arbre, un bâtiment, un chemin', 'un nuage', 'un oiseau qui passe', 'une flaque qui bouge', ex='Éléments fixes.'),
        Q('Si je suis perdu, je…', 'reviens au dernier point connu', 'cours au hasard', 'm’assois et pleure', 'jette la carte', ex='Stratégie.'),
        Q('Une boussole indique…', 'le nord', 'l’heure', 'la vitesse', 'la balise', ex='Aiguille aimantée.'),
        Q('En course d’orientation, la sécurité impose…', 'de rester dans la zone et d’écouter le signal de retour', 'de partir seul n’importe où', 'de courir les yeux fermés', 'de couper par les routes', ex='Règles de sécurité.'),
    ], adult='Faites une petite course d’orientation dans un parc avec un plan dessiné à la main.')
    lesson(P(3), 'Construire des équilibres, nager et rouler en sécurité', 'En gymnastique, on construit des équilibres et des enchaînements. À la piscine, on apprend à nager en sécurité (savoir nager). À vélo, on porte un casque et on respecte le code de la route.', [
        Q('À vélo, il faut porter…', 'un casque', 'des tongs', 'un bonnet de bain', 'rien', ex='Obligatoire pour les moins de 12 ans.'),
        Q('Au bord de la piscine, on…', 'marche sans courir', 'court', 'pousse les autres', 'plonge n’importe où', ex='Sol glissant.'),
        Q('Le « savoir nager » permet…', 'de se déplacer dans l’eau en sécurité', 'de gagner une médaille', 'de ne jamais se baigner', 'de plonger du plongeoir de 10 m', ex='Compétence de sécurité.'),
        Q('Pour tenir en équilibre sur une jambe, il aide de…', 'fixer un point devant soi', 'fermer les yeux', 'bouger la tête', 'parler fort', ex='Regard fixe.'),
        Q('À vélo, pour tourner à gauche, on…', 'tend le bras gauche', 'freine brusquement', 'ferme les yeux', 'klaxonne', ex='Signalisation.'),
        Q('Un gilet réfléchissant sert à…', 'être vu par les autres', 'avoir chaud', 'nager', 'décorer', ex='Sécurité routière.'),
    ], adult='Vérifiez ensemble l’équipement du vélo (freins, lumières, casque) avant une sortie.')
    lesson(P(4), 'Créer un enchaînement corporel expressif', 'Créer une chorégraphie, c’est enchaîner des mouvements pour exprimer une idée ou une émotion. On joue avec l’espace (haut, bas), le temps (lent, rapide) et l’énergie (doux, fort).', [
        Q('Une chorégraphie est…', 'un enchaînement de mouvements organisé', 'un sport de ballon', 'une course', 'un instrument', ex='Danse composée.'),
        Q('Pour exprimer la joie en dansant, on peut…', 'faire des sauts légers et rapides', 'rester immobile', 'se recroqueviller', 'marcher très lentement', ex='Expression corporelle.'),
        Q('Danser « en miroir », c’est…', 'reproduire les gestes d’un partenaire face à soi', 'danser seul', 'se regarder dans un miroir', 'tourner le dos', ex='Imitation symétrique.'),
        Q('Un enchaînement a…', 'un début, un milieu et une fin', 'aucun ordre', 'seulement une fin', 'des mouvements au hasard', ex='Structure.'),
        Q('Pour mémoriser une chorégraphie, on…', 'la répète plusieurs fois', 'la danse une fois', 'ne la répète jamais', 'l’écrit seulement', ex='Répétition.'),
        Q('Le public d’une danse doit…', 'regarder avec respect', 'se moquer', 'parler fort', 'partir', ex='Respect des danseurs.'),
    ], adult='Mettez une musique et inventez ensemble un court enchaînement de quatre mouvements.')
    lesson(P(5), 'Coopérer, s’opposer et faire respecter les règles', 'Dans les jeux collectifs, on coopère avec ses partenaires et on s’oppose aux adversaires en respectant les règles. On peut être joueur, arbitre ou observateur. Le fair-play, c’est respecter les autres, gagner ou perdre avec dignité.', [
        Q('Le fair-play, c’est…', 'respecter les règles et les adversaires', 'gagner à tout prix', 'tricher discrètement', 'se moquer des perdants', ex='Esprit sportif.'),
        Q('Le rôle de l’arbitre est…', 'faire respecter les règles', 'marquer des buts', 'encourager une équipe', 'choisir les joueurs', ex='Juge du jeu.'),
        Q('Coopérer, c’est…', 'jouer avec ses partenaires', 'jouer seul', 'refuser la balle', 'gêner son équipe', ex='Esprit d’équipe.'),
        Q('Après un match, on…', 'serre la main des adversaires', 'part en boudant', 'insulte l’arbitre', 'se dispute', ex='Respect.'),
        Q('Si l’arbitre se trompe, on…', 'accepte sa décision et on continue', 'le dispute', 'quitte le terrain', 'triche à son tour', ex='Respect de l’arbitre.'),
        Q('Un observateur dans un jeu sert à…', 'noter des informations pour aider l’équipe à progresser', 'gêner les joueurs', 'arbitrer seul', 'rien', ex='Rôle d’observation.'),
    ])
    # ================= EVAR (activités accompagnées) =================
    V = lambda n: S('evar', n)
    lesson(V(1), 'Comprendre les changements et la diversité des corps', 'En grandissant, le corps change : on grandit, la voix et la silhouette évoluent. Chaque corps est différent et tous méritent le respect. Personne ne doit être moqué pour son corps.', [
        Q('Tous les corps sont-ils identiques ?', 'Non, chaque corps est différent', 'Oui', 'Seulement chez les adultes', 'Seulement chez les enfants', ex='La diversité est normale.'),
        Q('Se moquer du corps de quelqu’un est…', 'blessant et irrespectueux', 'drôle et normal', 'conseillé', 'un compliment', ex='Respect.'),
        Q('Grandir plus vite ou plus lentement que les autres est…', 'normal', 'grave', 'interdit', 'impossible', ex='Chacun son rythme.'),
        Q('Si une question sur ton corps t’inquiète, tu peux…', 'en parler à un adulte de confiance', 'n’en parler à personne', 'demander à un inconnu en ligne', 'garder ta peur', ex='Adultes ressources : parents, infirmière, médecin.'),
        Q('Prendre soin de son corps, c’est…', 'dormir, manger varié, bouger, se laver', 'manger seulement des sucreries', 'ne jamais dormir', 'rester assis toute la journée', ex='Hygiène de vie.'),
        Q('Les images retouchées dans les publicités…', 'ne montrent pas toujours des corps réels', 'sont toujours réelles', 'sont des photos d’identité', 'n’existent pas', ex='Esprit critique.'),
    ], adult='Ce thème se discute en famille : répondez simplement aux questions de l’enfant et valorisez la diversité des corps.')
    lesson(V(2), 'Exprimer ses limites et respecter celles d’autrui', 'Chacun a le droit de dire non quand quelque chose le met mal à l’aise, et doit respecter le non des autres. Mon corps m’appartient. Si quelqu’un ne respecte pas mes limites, j’en parle à un adulte de confiance.', [
        Q('Si un jeu te met mal à l’aise, tu as le droit de…', 'dire non et arrêter', 'continuer sans rien dire', 'te taire forcément', 'faire semblant', ex='Ton avis compte.'),
        Q('Si un camarade dit « non, arrête », on…', 'arrête', 'continue pour rire', 'insiste', 'se moque', ex='Respect du refus.'),
        Q('À qui appartient ton corps ?', 'À toi', 'À tes amis', 'À tout le monde', 'Aux inconnus', ex='Personne ne doit te toucher sans ton accord.'),
        Q('Un secret qui te met mal à l’aise, on…', 'peut le confier à un adulte de confiance', 'doit le garder pour toujours', 'doit l’oublier', 'doit le publier en ligne', ex='Un « mauvais secret » se raconte.'),
        Q('Demander « Est-ce que je peux ? » avant d’emprunter ou de toucher, c’est…', 'respecter l’autre', 'inutile', 'impoli', 'interdit', ex='Demander l’accord.'),
        Q('Pour exprimer une limite, on peut dire…', '« Je n’aime pas ça, arrête s’il te plaît. »', 'rien', '« Fais ce que tu veux. »', 'en criant des insultes', ex='S’affirmer avec respect.'),
    ], adult='Rappelez à l’enfant qu’il peut toujours vous parler, et nommez avec lui les adultes de confiance autour de lui.')
    lesson(V(3), 'Construire des relations respectueuses et égalitaires', 'Filles et garçons ont les mêmes droits. Il n’y a pas de jeux, de métiers ou de couleurs réservés à un sexe. Une relation respectueuse, c’est écouter l’autre, ne pas imposer, partager.', [
        Q('Le football est-il réservé aux garçons ?', 'Non, tout le monde peut y jouer', 'Oui', 'Seulement le week-end', 'Seulement aux adultes', ex='Égalité filles-garçons.'),
        Q('Un garçon peut-il aimer la danse ?', 'Oui, bien sûr', 'Non', 'Seulement en secret', 'Seulement s’il est grand', ex='Pas de goûts réservés.'),
        Q('« Les filles sont nulles en maths » est…', 'un stéréotype faux', 'une vérité', 'une règle', 'une loi', ex='Préjugé à combattre.'),
        Q('Dans une relation d’amitié respectueuse…', 'chacun écoute et respecte l’autre', 'l’un commande toujours', 'on se moque', 'on impose ses choix', ex='Égalité dans la relation.'),
        Q('Tous les métiers sont-ils accessibles à tous ?', 'Oui, filles et garçons', 'Non', 'Seulement aux garçons', 'Seulement aux filles', ex='Pompière, infirmier, ingénieure…'),
        Q('Partager les tâches à la maison, c’est…', 'une question d’égalité', 'réservé aux mamans', 'réservé aux papas', 'inutile', ex='Partage équitable.'),
    ])
    lesson(V(4), 'Identifier pression, violence et ressources d’aide', 'La pression, c’est être poussé à faire quelque chose qu’on ne veut pas. La violence peut être physique, verbale ou en ligne. Personne n’a le droit de te faire du mal. On peut demander de l’aide : un adulte de confiance, le 119 (enfance en danger), le 3018 (harcèlement en ligne).', [
        Q('Quel numéro gratuit peut-on appeler si un enfant est en danger ?', '119', '18', '3018 uniquement pour les jeux', '112 seulement pour les accidents de voiture', ex='Allô Enfance en danger, 24 h/24.'),
        Q('Quel numéro pour le harcèlement en ligne ?', '3018', '15', '17', '119 seulement', ex='Numéro national.'),
        Q('Des insultes répétées sont…', 'une forme de violence', 'un jeu', 'normales', 'des compliments', ex='Violence verbale.'),
        Q('Si des camarades te poussent à faire quelque chose de dangereux, tu…', 'as le droit de refuser et d’en parler', 'dois obéir', 'dois le faire pour être accepté', 'ne dois rien dire', ex='Résister à la pression.'),
        Q('Un adulte de confiance peut être…', 'un parent, un enseignant, l’infirmière scolaire', 'un inconnu sur Internet', 'personne', 'un camarade qui te harcèle', ex='Ressources d’aide.'),
        Q('Si tu es témoin de violence, tu…', 'préviens un adulte', 'filmes et partages', 'ris', 'fais comme si de rien n’était', ex='Alerter protège.'),
    ], adult='Affichez à la maison les numéros 119 et 3018 et expliquez à l’enfant qu’il peut les appeler gratuitement.')
