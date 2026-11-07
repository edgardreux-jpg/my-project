from dsl import Q, N, M, O, F, lesson

def fr_cm2():
    T = lambda n: f'cm2-fr-{n:02d}'
    TXT = 'Le vieux phare se dressait au bout de la jetée. Depuis des années, plus personne n’y montait. Pourtant, ce soir-là, une lumière tremblante apparut tout en haut. Noé serra la main de sa sœur : « Tu as vu ? » murmura-t-il.'
    lesson(T(1), 'Lire avec fluidité et mettre un texte en voix', 'Mettre un texte en voix, c’est faire entendre son sens : on respecte la ponctuation, on adapte le volume et le rythme aux émotions des personnages, on fait des liaisons justes.', [
        Q('Comment lire « Tu as vu ? » murmura-t-il ?', 'À voix basse, avec une intonation de question', 'En criant', 'Très vite sans intonation', 'En riant', ex='« murmura » indique une voix basse.', passage=TXT),
        Q('Quelle émotion domine dans ce passage ?', 'Le mystère et l’inquiétude', 'La joie', 'L’ennui', 'La colère', ex='Lumière inattendue dans un phare abandonné.', passage=TXT),
        Q('Quel mot doit être mis en valeur à l’oral ?', 'Pourtant', 'de', 'la', 'au', ex='« Pourtant » annonce un retournement.', passage=TXT),
        Q('Que signifie « tremblante » ici ?', 'Qui vacille, qui n’est pas stable', 'Qui a froid', 'Qui fait du bruit', 'Qui est très forte', ex='Une lumière qui vacille.', passage=TXT),
        Q('Pour faire monter le suspense à l’oral, on peut…', 'ralentir et faire une pause avant la découverte', 'accélérer sans arrêt', 'lire sans regarder la ponctuation', 'chuchoter tout le texte', ex='La pause crée l’attente.'),
        Q('Une liaison à faire : « des années » se dit…', 'des-z-années', 'dé années', 'des-t-années', 'dèze-années', ex='Liaison en z.'),
        Q('Lire de façon fluide signifie…', 'lire avec aisance, en groupes de mots', 'lire mot par mot', 'lire le plus vite possible sans comprendre', 'lire en silence uniquement', ex='La fluidité sert la compréhension.'),
        O('Remets les étapes de la mise en voix.', ['Comprendre le texte', 'Repérer les émotions et la ponctuation', 'S’entraîner', 'Lire devant un public'], ex='Préparation avant la lecture publique.'),
    ], adult='L’enfant lit le passage du phare à voix haute pour un adulte, en jouant le suspense. La lecture orale n’est pas évaluée automatiquement.')
    lesson(T(2), 'Comparer et interpréter textes, images et documents', 'Comparer deux documents, c’est chercher leurs points communs et leurs différences : sujet, genre, intention, informations. Une image peut compléter un texte ou montrer un autre point de vue.', [
        Q('Un article de presse et un poème sur la mer ont souvent…', 'le même sujet mais une intention différente', 'la même intention', 'le même nombre de mots', 'les mêmes rimes', ex='Informer d’un côté, émouvoir de l’autre.'),
        Q('Une carte, un graphique et un texte sur la pluie…', 'peuvent se compléter', 'disent forcément l’inverse', 'sont inutiles ensemble', 'sont des poèmes', ex='Chaque document apporte une information.'),
        Q('L’intention d’une publicité est de…', 'faire acheter', 'raconter une légende', 'enseigner une règle de grammaire', 'faire peur toujours', ex='Elle cherche à convaincre d’acheter.'),
        Q('Quel document est le plus fiable pour une date historique ?', 'Un manuel ou une encyclopédie', 'Une rumeur entendue', 'Un roman fantastique', 'Une blague', ex='On choisit une source sérieuse.'),
        Q('Une photo de presse doit être lue avec…', 'sa légende et sa source', 'aucune information', 'uniquement ses couleurs', 'un dictionnaire', ex='La légende situe l’image.'),
        M('Associe chaque document à son intention principale.', [('Recette', 'expliquer comment faire'), ('Conte', 'raconter'), ('Affiche de prévention', 'mettre en garde')], ex='Chaque genre a une intention.'),
        Q('Si deux documents se contredisent, on…', 'cherche une troisième source', 'croit le plus court', 'croit le plus coloré', 'abandonne', ex='On croise les sources.'),
        Q('Interpréter une image, c’est…', 'dire ce qu’elle montre et ce qu’elle veut dire', 'la recopier', 'compter ses couleurs', 'la déchirer', ex='Décrire puis comprendre le message.'),
    ])
    TXT3 = 'Mathis posa son bulletin sur la table sans un mot et monta directement dans sa chambre. Il ne descendit pas pour le dîner. Sa mère regarda le bulletin, puis la porte fermée, et soupira doucement.'
    lesson(T(3), 'Comprendre implicite, points de vue et intentions', 'L’implicite, c’est ce que le texte suggère sans le dire. On le comprend grâce aux indices : gestes, silences, réactions des personnages. On se demande aussi ce que l’auteur veut nous faire ressentir.', [
        Q('Que peut-on deviner sur le bulletin de Mathis ?', 'Il est probablement décevant', 'Il est excellent', 'Il est perdu', 'Il est vide', ex='Silence, chambre, pas de dîner.', passage=TXT3),
        Q('Comment se sent Mathis ?', 'Triste ou honteux', 'Fier', 'Joyeux', 'Indifférent', ex='Il évite les autres.', passage=TXT3),
        Q('Le soupir de la mère exprime plutôt…', 'de la compréhension et de l’inquiétude', 'de la colère violente', 'de la joie', 'de l’ennui', ex='« doucement » adoucit le soupir.', passage=TXT3),
        Q('Le texte dit-il clairement que les notes sont mauvaises ?', 'Non, c’est sous-entendu', 'Oui', 'Il dit qu’elles sont bonnes', 'Il n’y a pas de bulletin', ex='C’est de l’implicite.', passage=TXT3),
        Q('Quelle question aide à repérer l’implicite ?', 'Que montrent les gestes des personnages ?', 'Combien de mots a le texte ?', 'Quelle est la police ?', 'Qui a imprimé le livre ?', ex='Les gestes sont des indices.'),
        Q('« Elle claqua la porte. » On comprend qu’elle est…', 'en colère', 'calme', 'endormie', 'contente', ex='Le geste trahit l’émotion.'),
        Q('L’intention de l’auteur dans ce passage est de…', 'faire ressentir la gêne de Mathis', 'expliquer le système scolaire', 'faire rire', 'donner une recette', ex='Il crée de l’émotion.', passage=TXT3),
        Q('« Il faisait un temps à ne pas mettre un chien dehors. » Quel temps fait-il ?', 'Très mauvais', 'Très beau', 'Frais et agréable', 'Ensoleillé', ex='Expression imagée.'),
    ])
    lesson(T(4), 'Résumer une œuvre et justifier une interprétation', 'Résumer, c’est dire l’essentiel en peu de mots : les personnages principaux, le problème et la fin, sans les détails. Justifier une interprétation, c’est appuyer son idée sur un passage du texte.', [
        Q('Un bon résumé contient…', 'les personnages principaux, le problème et la fin', 'tous les dialogues', 'la liste des chapitres', 'son avis seulement', ex='L’essentiel.'),
        Q('Quel résumé convient au Petit Chaperon rouge ?', 'Une fillette rencontre un loup qui la dévore avec sa grand-mère, puis un chasseur les sauve.', 'Une fillette porte un chaperon rouge.', 'Il était une fois une forêt.', 'Le loup a de grandes dents.', ex='Il raconte l’histoire entière en bref.'),
        Q('Pour justifier une interprétation, on…', 'cite un passage du texte', 'dit « parce que c’est comme ça »', 'raconte autre chose', 'compte les pages', ex='Le texte est la preuve.'),
        Q('Un résumé s’écrit plutôt…', 'au présent, avec ses propres mots', 'en recopiant des phrases', 'au futur', 'en vers', ex='Présent de narration, reformulation.'),
        Q('Quelle information est un détail à enlever d’un résumé ?', 'La couleur du panier', 'Le personnage principal', 'Le problème', 'La fin', ex='Détail non essentiel.'),
        Q('« Le héros a changé au cours de l’histoire » : comment le montrer ?', 'Comparer son comportement au début et à la fin', 'Compter ses répliques', 'Regarder la couverture', 'Lire seulement le titre', ex='On s’appuie sur le texte.'),
        O('Remets les étapes pour résumer un livre.', ['Relire ou se rappeler l’histoire', 'Repérer les moments clés', 'Écrire quelques phrases', 'Relire et raccourcir'], ex='Méthode du résumé.'),
        Q('Deux lecteurs interprètent différemment un texte. C’est…', 'possible si chacun justifie avec le texte', 'interdit', 'toujours faux', 'impossible', ex='Plusieurs interprétations peuvent exister.'),
    ])
    lesson(T(5), 'Découvrir héros, merveilleux et autres vies', 'Mythes, contes, légendes et romans d’aventure présentent des héros qui affrontent des épreuves. Les récits de vie et de voyage font découvrir d’autres époques et d’autres cultures.', [
        Q('Ulysse est le héros de…', 'l’Odyssée', 'Cendrillon', 'Le Petit Prince', 'Les Fables', ex='Récit de l’Antiquité grecque.'),
        Q('Un mythe raconte souvent…', 'l’origine du monde ou des exploits de dieux et héros', 'une recette', 'un fait divers récent', 'une règle de grammaire', ex='Récits fondateurs.'),
        Q('Hercule est connu pour…', 'ses douze travaux', 'ses inventions', 'ses voyages dans l’espace', 'ses poèmes', ex='Héros de la mythologie.'),
        Q('Une légende…', 'mêle souvent faits réels et merveilleux', 'est toujours vraie', 'n’a pas de personnages', 'est un poème obligatoirement', ex='Mélange d’histoire et d’imaginaire.'),
        Q('Le Petit Prince a été écrit par…', 'Antoine de Saint-Exupéry', 'Victor Hugo', 'Jules Verne', 'Charles Perrault', ex='Publié en 1943.'),
        Q('Jules Verne a écrit…', 'Le Tour du monde en quatre-vingts jours', 'Le Petit Prince', 'Les Misérables', 'Le Chat botté', ex='Roman d’aventure.'),
        M('Associe chaque héros à son récit.', [('Ulysse', 'l’Odyssée'), ('Phileas Fogg', 'Le Tour du monde en 80 jours'), ('Le Petit Prince', 'Le Petit Prince')], ex='Héros célèbres.'),
        Q('Un récit de vie raconte…', 'l’existence d’une personne', 'une recette', 'une notice de montage', 'un horaire de train', ex='Biographie ou autobiographie.'),
    ])
    lesson(T(6), 'Interroger morale, identité et relations', 'Certains récits nous font réfléchir à qui nous sommes, à nos choix, à l’amitié, à la différence, à la justice. On discute des actions des personnages et on donne son avis argumenté.', [
        Q('Dans « Le Vilain Petit Canard », le héros découvre…', 'qu’il est un cygne', 'qu’il est un poussin', 'qu’il est un loup', 'qu’il ne grandira jamais', ex='Récit sur la différence et l’identité.'),
        Q('Ce conte invite à réfléchir sur…', 'l’acceptation de la différence', 'la cuisine', 'la météo', 'le sport', ex='Le rejet puis la reconnaissance.'),
        Q('Un personnage qui ment pour protéger un ami : on peut en débattre car…', 'il y a un dilemme entre deux valeurs', 'mentir est toujours drôle', 'c’est obligatoire', 'il n’y a rien à dire', ex='Honnêteté et amitié s’opposent.'),
        Q('Quelle question pousse à réfléchir sur un récit ?', '« À sa place, qu’aurais-tu fait ? »', '« Combien de pages ? »', '« Quelle est la couleur du titre ? »', '« Qui est l’imprimeur ? »', ex='Question de réflexion morale.'),
        Q('La solidarité, c’est…', 's’entraider', 'se moquer', 'garder pour soi', 'gagner seul', ex='Aider les autres.'),
        Q('Un récit où un enfant est exclu pour sa différence permet de parler…', 'de discrimination et de respect', 'de géométrie', 'du système solaire', 'des fractions', ex='Thème moral.'),
        M('Associe chaque valeur à un comportement.', [('Loyauté', 'tenir sa promesse'), ('Tolérance', 'accepter les différences'), ('Justice', 'traiter chacun équitablement')], ex='Valeurs morales.'),
        Q('Pour donner son avis sur un personnage, on…', 'appuie ses idées sur ses actes dans le texte', 'parle de son propre goûter', 'invente une suite', 'répète le titre', ex='On argumente avec le texte.'),
    ])
    lesson(T(7), 'Goûter et créer des textes poétiques et théâtraux', 'Le théâtre est écrit pour être joué : il comporte des répliques et des didascalies (indications de jeu, souvent en italique). La poésie joue avec les sons, les rythmes et les images.', [
        Q('Une didascalie est…', 'une indication de jeu pour les acteurs', 'une réplique', 'un vers', 'un titre de chapitre', ex='Ex. : (Il sort en claquant la porte.)'),
        Q('Une réplique, c’est…', 'ce que dit un personnage', 'une indication de décor', 'une rime', 'le nom de l’auteur', ex='Le texte prononcé par un personnage.'),
        Q('Molière est un auteur de…', 'théâtre', 'romans policiers', 'bandes dessinées', 'dictionnaires', ex='« Le Malade imaginaire », « L’Avare »…'),
        Q('Une pièce de théâtre est découpée en…', 'actes et scènes', 'strophes', 'chapitres uniquement', 'paragraphes', ex='Actes et scènes.'),
        Q('« Ô nuit, douce nuit » : le « Ô » marque…', 'une apostrophe poétique', 'une erreur', 'une question', 'un chiffre', ex='On s’adresse à la nuit.'),
        Q('Une allitération, c’est…', 'la répétition d’un son consonne', 'une rime en fin de vers', 'un mot inventé', 'un vers long', ex='« Pour qui sont ces serpents qui sifflent sur vos têtes ? »'),
        M('Associe.', [('Vers', 'ligne de poème'), ('Réplique', 'parole de personnage'), ('Didascalie', 'indication de jeu')], ex='Vocabulaire du poème et du théâtre.'),
        Q('Pour écrire un poème, on peut partir…', 'd’une image, d’un son ou d’une émotion', 'd’une liste de courses uniquement', 'd’une table de multiplication', 'de rien', ex='Toutes les inspirations sont possibles.'),
    ])
    lesson(T(8), 'Distinguer COD, COI, attribut et circonstanciels', 'Le COD répond à « quoi ? / qui ? » après le verbe (Il lit un livre). Le COI est introduit par une préposition (Il parle à sa sœur). L’attribut du sujet suit un verbe d’état (être, sembler, devenir…). Les CC de lieu, temps, manière se déplacent.', [
        Q('Dans « Elle écrit une lettre », « une lettre » est…', 'COD', 'COI', 'attribut du sujet', 'CC de lieu', ex='Elle écrit quoi ?'),
        Q('Dans « Il pense à ses vacances », « à ses vacances » est…', 'COI', 'COD', 'CC de temps', 'attribut', ex='Il pense à quoi ? préposition « à ».'),
        Q('Dans « Le ciel devient gris », « gris » est…', 'attribut du sujet', 'COD', 'CC de manière', 'épithète', ex='Verbe d’état « devenir ».'),
        Q('Dans « Nous partirons à l’aube », « à l’aube » est…', 'CC de temps', 'COI', 'COD', 'attribut', ex='Quand ?'),
        Q('Quel verbe est un verbe d’état ?', 'sembler', 'manger', 'courir', 'écrire', ex='être, paraître, sembler, devenir, rester…'),
        Q('Dans « Paul offre un livre à Lina », combien de compléments d’objet ?', '2', '1', '3', '0', ex='un livre (COD) et à Lina (COI).'),
        M('Associe chaque groupe à sa fonction. « Hier, Tom a donné son vélo à son cousin. »', [('Hier', 'CC de temps'), ('son vélo', 'COD'), ('à son cousin', 'COI')], ex='Analyse complète.'),
        Q('Dans « Ces fleurs restent fraîches », « fraîches » est…', 'attribut du sujet', 'COD', 'COI', 'CC de lieu', ex='« rester » est un verbe d’état.'),
    ])
    lesson(T(9), 'Analyser les groupes de la phrase et le sujet inversé', 'Une phrase simple contient au moins un sujet et un groupe verbal ; elle peut avoir des compléments de phrase. Le sujet est parfois placé après le verbe : c’est un sujet inversé (« Au loin brillaient les étoiles »).', [
        Q('Quel est le sujet ? « Au loin brillaient les étoiles. »', 'les étoiles', 'Au loin', 'brillaient', 'loin', ex='C’est les étoiles qui brillaient.'),
        Q('Quel est le sujet ? « Que dit le maître ? »', 'le maître', 'Que', 'dit', 'il n’y en a pas', ex='Sujet inversé dans la question.'),
        Q('Quel est le sujet ? « Dans ce village vivait un vieux meunier. »', 'un vieux meunier', 'ce village', 'vivait', 'Dans', ex='Sujet après le verbe.'),
        Q('« Ainsi parla le roi. » Le verbe s’accorde avec…', 'le roi', 'Ainsi', 'parla', 'personne', ex='Le sujet inversé commande l’accord.'),
        Q('Choisis l’accord : « Sur la branche … deux oiseaux. »', 'chantent', 'chante', 'chantes', 'chanter', ex='Sujet : deux oiseaux.'),
        Q('Combien de groupes dans « Le matin, les enfants partent à l’école » ? (sujet, verbe et compléments)', '4', '2', '3', '6', ex='Le matin / les enfants / partent / à l’école.'),
        Q('Quel groupe est un complément de phrase ? « En hiver, les ours dorment. »', 'En hiver', 'les ours', 'dorment', 'aucun', ex='Il se déplace et se supprime.'),
        Q('Le sujet peut être…', 'un nom, un groupe nominal, un pronom ou un infinitif', 'uniquement un nom propre', 'seulement un pronom', 'jamais un pronom', ex='« Courir est bon pour la santé » : sujet infinitif.'),
    ])
    lesson(T(10), 'Distinguer natures et fonctions', 'La nature (classe) d’un mot est fixe : nom, verbe, adjectif, adverbe, pronom, déterminant, préposition, conjonction. La fonction dépend du rôle dans la phrase : sujet, COD, COI, attribut, complément du nom, épithète…', [
        Q('Nature de « avec » ?', 'préposition', 'adverbe', 'conjonction', 'déterminant', ex='Préposition.'),
        Q('Nature de « mais » ?', 'conjonction de coordination', 'adverbe', 'préposition', 'pronom', ex='mais, ou, et, donc, or, ni, car.'),
        Q('Nature de « souvent » ?', 'adverbe', 'adjectif', 'nom', 'verbe', ex='Il précise un verbe.'),
        Q('Fonction de « rouge » dans « une pomme rouge » ?', 'épithète', 'attribut', 'COD', 'sujet', ex='Adjectif placé près du nom.'),
        Q('Fonction de « rouge » dans « la pomme est rouge » ?', 'attribut du sujet', 'épithète', 'COD', 'CC', ex='Après le verbe d’état.'),
        Q('Fonction de « de bois » dans « une cabane de bois » ?', 'complément du nom', 'COI', 'CC de lieu', 'sujet', ex='Il complète le nom « cabane ».'),
        M('Associe chaque mot à sa nature.', [('lui', 'pronom'), ('leur (dans « leur maison »)', 'déterminant'), ('vite', 'adverbe')], ex='Natures des mots.'),
        Q('« Il les regarde » : « les » est…', 'un pronom COD', 'un déterminant', 'un nom', 'un sujet', ex='Il remplace un nom et complète le verbe.'),
    ])
    lesson(T(11), 'Distinguer phrase simple et phrase complexe', 'Une phrase simple contient un seul verbe conjugué. Une phrase complexe en contient plusieurs : elle est formée de propositions, reliées par une virgule, une conjonction (et, mais, car) ou un mot comme « qui », « quand », « parce que ».', [
        Q('Combien de verbes conjugués : « Le chat dort et le chien joue. » ?', '2', '1', '3', '0', ex='dort, joue.'),
        Q('Quelle phrase est simple ?', 'Les élèves écoutent la maîtresse.', 'Je pense qu’il viendra.', 'Il pleut mais il fait doux.', 'Quand il rentre, il mange.', ex='Un seul verbe conjugué.'),
        Q('Combien de propositions : « Je sais que tu as raison. » ?', '2', '1', '3', '4', ex='Je sais / que tu as raison.'),
        Q('Quel mot relie les propositions ? « Il reste à la maison car il est malade. »', 'car', 'Il', 'reste', 'malade', ex='Conjonction de coordination.'),
        Q('Une proposition contient…', 'un verbe conjugué', 'deux verbes conjugués', 'aucun verbe', 'seulement un nom', ex='Chaque proposition a son verbe.'),
        Q('« Le livre que je lis est passionnant » contient…', '2 verbes conjugués', '1 verbe conjugué', '3 verbes conjugués', 'aucun verbe', ex='lis, est.'),
        Q('Quelle phrase est complexe ?', 'Quand la cloche sonne, les élèves sortent.', 'La cloche sonne.', 'Sortez !', 'Les élèves dans la cour.', ex='Deux verbes : sonne, sortent.'),
        Q('Infinitifs et participes comptent-ils comme verbes conjugués ?', 'Non', 'Oui', 'Seulement les infinitifs', 'Seulement au futur', ex='« Je veux partir » : un seul verbe conjugué (veux).'),
    ])
    lesson(T(12), 'Enrichir le nom et transformer les types et formes', 'On enrichit un nom avec des adjectifs, un complément du nom ou une proposition relative (« le livre qui est sur la table »). On peut transformer une phrase en question, en ordre, en exclamation, à la forme négative.', [
        Q('Quelle expansion est une proposition relative ?', 'qui aboie la nuit', 'noir', 'de mon voisin', 'très', ex='Introduite par « qui ».'),
        Q('Enrichis « un gâteau » avec un complément du nom.', 'un gâteau au chocolat', 'un gros gâteau', 'un gâteau qui fond', 'un gâteau', ex='« au chocolat » complète le nom.'),
        Q('Transforme à la forme négative : « Elle a déjà mangé. »', 'Elle n’a pas encore mangé.', 'Elle n’a déjà mangé.', 'Elle a pas mangé.', 'Elle ne déjà a mangé.', ex='déjà → pas encore.'),
        Q('Transforme en phrase impérative : « Tu ranges ta chambre. »', 'Range ta chambre.', 'Ranges-tu ta chambre ?', 'Tu ne ranges pas ta chambre.', 'Quelle chambre rangée !', ex='Impératif : pas de sujet exprimé.'),
        Q('Transforme en question avec inversion : « Vous partez demain. »', 'Partez-vous demain ?', 'Vous partez demain ?!', 'Partez demain.', 'Vous ne partez pas demain.', ex='Inversion verbe-sujet.'),
        Q('La forme négative de « Quelqu’un est venu » est…', 'Personne n’est venu.', 'Quelqu’un n’est venu.', 'Personne est venu.', 'Quelqu’un est pas venu.', ex='quelqu’un → personne.'),
        Q('Quel groupe nominal contient trois expansions ?', 'une petite boîte en bois qui grince', 'une boîte', 'une petite boîte', 'la boîte de Léo', ex='adjectif + complément du nom + relative.'),
        Q('« Quel spectacle magnifique ! » est une phrase…', 'exclamative', 'interrogative', 'impérative', 'négative', ex='Point d’exclamation.'),
    ])
    lesson(T(13), 'Consolider présent, imparfait, futur et passé composé', 'Présent : il marche. Imparfait : il marchait. Futur : il marchera. Passé composé : il a marché / il est parti. On choisit le temps selon le moment de l’action.', [
        F('Écris « venir » au futur.', 'Nous {{a}} te voir.', {'a': 'viendrons'}, ex='nous viendrons.'),
        F('Écris « faire » à l’imparfait.', 'Ils {{a}} du vélo.', {'a': 'faisaient'}, ex='ils faisaient.'),
        F('Écris « aller » au passé composé.', 'Elle {{a}} {{b}} au marché.', {'a': 'est', 'b': 'allée'}, ex='être + accord au féminin.'),
        F('Écris « pouvoir » au présent.', 'Vous {{a}} entrer.', {'a': 'pouvez'}, ex='vous pouvez.'),
        Q('À quel temps est « nous avons pris » ?', 'passé composé', 'imparfait', 'futur', 'présent', ex='avoir + participe.'),
        Q('À quel temps est « tu seras » ?', 'futur', 'présent', 'imparfait', 'passé composé', ex='Futur de être.'),
        Q('Quel temps pour une habitude passée ? « Chaque été, nous … à la mer. »', 'allions', 'irons', 'allons', 'sommes allés', ex='L’imparfait exprime l’habitude.'),
        F('Écris « voir » au passé composé.', 'J’{{a}} {{b}} un arc-en-ciel.', {'a': 'ai', 'b': 'vu'}, ex='j’ai vu.'),
    ])
    lesson(T(14), 'Construire et employer le passé simple', 'Le passé simple est le temps des actions brèves et principales du récit, souvent à la 3e personne. 1er groupe : il chanta, ils chantèrent. 2e groupe : il finit, ils finirent. être : il fut ; avoir : il eut ; faire : il fit ; prendre : il prit.', [
        Q('« chanter » au passé simple, 3e personne du singulier ?', 'il chanta', 'il chantait', 'il chantit', 'il chanterait', ex='-a.'),
        Q('« finir » au passé simple, 3e personne du pluriel ?', 'ils finirent', 'ils finèrent', 'ils finissaient', 'ils finissent', ex='-irent.'),
        Q('« être » au passé simple avec « il » ?', 'il fut', 'il était', 'il eut', 'il sera', ex='il fut.'),
        Q('« avoir » au passé simple avec « elles » ?', 'elles eurent', 'elles avaient', 'elles furent', 'elles auront', ex='elles eurent.'),
        Q('« faire » au passé simple avec « il » ?', 'il fit', 'il faisa', 'il fut', 'il faisait', ex='il fit.'),
        Q('« prendre » au passé simple avec « ils » ?', 'ils prirent', 'ils prenèrent', 'ils prendirent', 'ils prenaient', ex='ils prirent.'),
        Q('Dans un récit au passé, le passé simple sert…', 'aux actions principales et brèves', 'aux descriptions', 'aux habitudes', 'au futur', ex='L’imparfait décrit, le passé simple fait avancer l’action.'),
        F('Écris « crier » au passé simple.', 'Soudain, le garçon {{a}}.', {'a': 'cria'}, ex='il cria.'),
    ])
    lesson(T(15), 'Former et employer le plus-que-parfait', 'Le plus-que-parfait = auxiliaire avoir ou être à l’imparfait + participe passé : j’avais mangé, elle était partie. Il exprime une action passée qui a eu lieu avant une autre action passée.', [
        Q('« manger » au plus-que-parfait avec « je » ?', 'j’avais mangé', 'j’ai mangé', 'je mangeais', 'j’aurai mangé', ex='avoir à l’imparfait + participe.'),
        Q('« partir » au plus-que-parfait avec « elle » ?', 'elle était partie', 'elle avait parti', 'elle est partie', 'elle partait', ex='être à l’imparfait + accord.'),
        Q('À quel temps est « nous avions fini » ?', 'plus-que-parfait', 'passé composé', 'imparfait', 'futur antérieur', ex='avoir à l’imparfait + participe.'),
        Q('« Quand je suis arrivé, le film avait commencé. » Quelle action a eu lieu en premier ?', 'Le film a commencé', 'Je suis arrivé', 'En même temps', 'On ne sait pas', ex='Le plus-que-parfait marque l’antériorité.'),
        F('Écris « venir » au plus-que-parfait.', 'Ils {{a}} {{b}} en avance.', {'a': 'étaient', 'b': 'venus'}, ex='être + accord masculin pluriel.'),
        F('Écris « voir » au plus-que-parfait.', 'Tu {{a}} {{b}} ce film.', {'a': 'avais', 'b': 'vu'}, ex='tu avais vu.'),
        Q('Le plus-que-parfait est un temps…', 'composé', 'simple', 'du futur', 'du présent', ex='Auxiliaire + participe.'),
        Q('Quelle phrase utilise le plus-que-parfait ?', 'Il avait oublié ses clés.', 'Il oublie ses clés.', 'Il oubliera ses clés.', 'Il a oublié ses clés.', ex='avait + participe.'),
    ])
    lesson(T(16), 'Choisir les temps dans un récit', 'Dans un récit au passé : le passé simple fait avancer l’action, l’imparfait décrit le décor et les habitudes, le plus-que-parfait raconte ce qui s’était passé avant. Les dialogues peuvent être au présent.', [
        Q('Quel temps pour décrire le décor ? « La forêt … sombre. »', 'était', 'fut', 'sera', 'a été', ex='Description : imparfait.'),
        Q('Quel temps pour une action soudaine ? « Soudain, un loup … . »', 'surgit', 'surgissait', 'surgira', 'surgissant', ex='Action brève : passé simple.'),
        Q('« Il faisait beau. Tout à coup, l’orage éclata. » Pourquoi deux temps différents ?', 'Décor à l’imparfait, événement au passé simple', 'C’est une erreur', 'Pour faire joli', 'Les deux sont au futur', ex='Rôles des temps du récit.'),
        Q('Dans un dialogue, on utilise souvent…', 'le présent', 'le passé simple', 'le plus-que-parfait uniquement', 'aucun verbe', ex='Les personnages parlent au présent.'),
        Q('Quel temps pour une action antérieure ? « Il retrouva le livre qu’il … la veille. »', 'avait perdu', 'perdit', 'perdra', 'perd', ex='Avant l’action principale : plus-que-parfait.'),
        M('Associe chaque temps à son rôle dans le récit.', [('Imparfait', 'décrire, habitudes'), ('Passé simple', 'actions principales'), ('Plus-que-parfait', 'action antérieure')], ex='Système des temps du récit.'),
        Q('« Chaque matin, il … son chien. » (habitude)', 'promenait', 'promena', 'promènera', 'avait promené', ex='Habitude : imparfait.'),
        Q('Quel connecteur annonce souvent le passé simple ?', 'Soudain', 'Chaque jour', 'Autrefois', 'D’habitude', ex='« Soudain » introduit un événement bref.'),
    ])
    lesson(T(17), 'Accorder le groupe nominal et ses expansions', 'Dans le groupe nominal, déterminants et adjectifs s’accordent avec le nom noyau, même s’ils sont éloignés. Attention aux adjectifs de couleur (des robes roses, mais des robes orange) et aux pluriels en -aux, -eux, -oux.', [
        Q('Choisis : des yeux …', 'bleus', 'bleu', 'bleue', 'bleues', ex='Masculin pluriel.'),
        Q('Choisis : une jupe et un pull …', 'neufs', 'neuves', 'neuf', 'neuve', ex='Masculin + féminin = masculin pluriel.'),
        Q('Pluriel de « un travail » ?', 'des travaux', 'des travails', 'des travailx', 'des travaus', ex='travail → travaux.'),
        Q('Choisis : des chaussures …', 'marron', 'marrons', 'marronnes', 'marrone', ex='Adjectif de couleur issu d’un nom : invariable.'),
        Q('Choisis : les arbres … de la cour', 'centenaires', 'centenaire', 'centenairs', 'centenaireux', ex='Pluriel en -s.'),
        Q('Pluriel de « un festival » ?', 'des festivals', 'des festivaux', 'des festivales', 'des festival', ex='Exception : festivals (comme bals, carnavals).'),
        F('Accorde.', 'des histoires {{a}} (merveilleux)', {'a': 'merveilleuses'}, ex='-eux → -euses au féminin pluriel.'),
        Q('Choisis : la maison de mes grands-parents, … et accueillante', 'grande', 'grand', 'grands', 'grandes', ex='L’adjectif se rapporte à « maison ».'),
    ])
    lesson(T(18), 'Accorder sujet, verbe et attribut', 'Le verbe s’accorde avec le sujet. L’attribut du sujet (après être, sembler, devenir, paraître, rester) s’accorde aussi avec le sujet : « Ces filles sont courageuses ».', [
        Q('Choisis : Ces gâteaux semblent …', 'délicieux', 'délicieuse', 'délicieuses', 'délicieu', ex='Masculin pluriel.'),
        Q('Choisis : Ma sœur est devenue …', 'championne', 'champion', 'championnes', 'champions', ex='Féminin singulier.'),
        Q('Choisis : Les montagnes paraissent …', 'immenses', 'immense', 'immensent', 'immensé', ex='Pluriel.'),
        Q('Choisis : Toi et moi … amis.', 'sommes', 'sont', 'êtes', 'est', ex='Toi et moi = nous.'),
        Q('Choisis : Lucas et toi … en retard.', 'êtes', 'sont', 'sommes', 'est', ex='Lucas et toi = vous.'),
        Q('Choisis : La foule des supporters … fort.', 'crie', 'crient', 'cries', 'crier', ex='Le noyau du sujet est « la foule ».'),
        F('Accorde l’attribut.', 'Les fenêtres restent {{a}} (ouvert).', {'a': 'ouvertes'}, ex='Féminin pluriel.'),
        Q('Choisis : Les élèves de la classe … contents.', 'sont', 'est', 'sommes', 'êtes', ex='Sujet : les élèves.'),
    ])
    lesson(T(19), 'Accorder le participe passé avec être et avec avoir', 'Avec être, le participe passé s’accorde avec le sujet (elles sont venues). Avec avoir, il ne s’accorde pas avec le sujet (elles ont mangé). Il s’accorde seulement avec le COD s’il est placé avant (la pomme que j’ai mangée).', [
        Q('Choisis : Elles ont …', 'chanté', 'chantées', 'chantés', 'chantée', ex='Avec avoir, pas d’accord avec le sujet.'),
        Q('Choisis : Elles sont …', 'sorties', 'sorti', 'sortis', 'sortie', ex='Avec être, accord avec le sujet.'),
        Q('Choisis : Les fleurs que j’ai …', 'cueillies', 'cueilli', 'cueillis', 'cueillie', ex='COD « que » (= les fleurs) placé avant.'),
        Q('Choisis : J’ai … des fleurs.', 'cueilli', 'cueillies', 'cueillis', 'cueillie', ex='COD placé après : pas d’accord.'),
        Q('Choisis : Nous (Lina et Zoé) sommes …', 'arrivées', 'arrivé', 'arrivés', 'arrivée', ex='Deux filles : féminin pluriel.'),
        Q('Choisis : Les lettres ont été …', 'envoyées', 'envoyé', 'envoyés', 'envoyée', ex='Avec « été » (être), accord avec le sujet.'),
        F('Accorde.', 'La tarte que tu as {{a}} (préparer) est délicieuse.', {'a': 'préparée'}, ex='COD « que » = la tarte, placé avant.'),
        Q('Avec l’auxiliaire avoir, le participe passé s’accorde…', 'avec le COD s’il est placé avant', 'toujours avec le sujet', 'jamais', 'avec le verbe', ex='Règle du COD antéposé.'),
    ])
    lesson(T(20), 'Réinvestir mots, homophones et régularités', 'Homophones fréquents : ce / se (ce chien, il se lave), ces / ses (ces livres-là, ses livres à lui), c’est / s’est, leur / leurs, quand / quant / qu’en, la / l’a / là.', [
        Q('Il … lave les mains.', 'se', 'ce', 'ceux', 'ses', ex='Pronom devant un verbe : se.'),
        Q('… matin, il pleut.', 'Ce', 'Se', 'Ceux', 'Ces', ex='Déterminant devant un nom : ce.'),
        Q('Il prend … affaires (les siennes).', 'ses', 'ces', 'c’est', 's’est', ex='Possession : ses.'),
        Q('… un beau jour !', 'C’est', 'S’est', 'Ses', 'Ces', ex='Cela est : c’est.'),
        Q('Elle … blessée au genou.', 's’est', 'c’est', 'ses', 'ces', ex='Verbe pronominal : s’est.'),
        Q('Je … donne un conseil (à eux).', 'leur', 'leurs', 'leure', 'l’heure', ex='Pronom devant un verbe : invariable.'),
        Q('Ils rangent … cahiers.', 'leurs', 'leur', 'l’heure', 'leure', ex='Déterminant devant un nom pluriel : leurs.'),
        Q('… il pleut, je prends mon parapluie.', 'Quand', 'Quant', 'Qu’en', 'Camp', ex='Indique le moment : quand.'),
    ])
    lesson(T(21), 'Justifier et corriger ses choix orthographiques', 'Justifier une orthographe, c’est expliquer la règle : « J’ai écrit -ent car le sujet est ils », « J’ai ajouté -es car le nom est féminin pluriel ». Cela aide à corriger seul.', [
        Q('Pourquoi écrit-on « ils jouent » ?', 'Le sujet est à la 3e personne du pluriel', 'Le verbe est à l’imparfait', 'Pour faire joli', 'C’est un nom', ex='-ent pour ils/elles.'),
        Q('Pourquoi « des robes rouges » prend-il des s ?', 'Le groupe est au pluriel', 'Rouge est un verbe', 'Robe est masculin', 'Par hasard', ex='Accord dans le GN.'),
        Q('Pourquoi « elle est partie » prend-il un e ?', 'Avec être, accord avec le sujet féminin', 'Avec avoir, toujours un e', 'C’est l’infinitif', 'Partir est féminin', ex='Règle du participe avec être.'),
        Q('Trouve l’erreur : « Les enfants mange des fruits. »', 'mange → mangent', 'enfants → enfant', 'fruits → fruit', 'Les → Le', ex='Sujet pluriel.'),
        Q('Trouve l’erreur : « Il a prit son sac. »', 'prit → pris', 'Il → Ils', 'son → sont', 'sac → sacs', ex='Participe passé de prendre : pris.'),
        Q('Trouve l’erreur : « Ces enfants on faim. »', 'on → ont', 'Ces → Ses', 'faim → fin', 'enfants → enfant', ex='Ils avaient faim : ont.'),
        Q('Pour vérifier « a » ou « à », je remplace par…', '« avait »', '« était »', '« avaient »', '« sont »', ex='Si ça marche : a.'),
        Q('Quelle stratégie aide à écrire la fin de « un tapis » ?', 'Chercher « tapisser »', 'Compter les lettres', 'Le mettre au pluriel', 'Le lire à l’envers', ex='Le mot de la famille révèle le s.'),
    ])
    lesson(T(22), 'Comprendre un mot par le contexte et sa construction', 'Pour comprendre un mot inconnu, on s’aide de la phrase (le contexte) et de sa construction : préfixe, radical, suffixe. « Inoxydable » : in- (pas) + oxyd (rouille) + -able (qui peut) = qui ne peut pas rouiller.', [
        Q('« Ce plat est immangeable. » Que veut dire « immangeable » ?', 'qu’on ne peut pas manger', 'très bon', 'chaud', 'sucré', ex='im- (pas) + mange + -able.'),
        Q('« Le randonneur, épuisé, s’assit sur un rocher. » « épuisé » veut dire…', 'très fatigué', 'pressé', 'joyeux', 'affamé', ex='Le contexte (il s’assoit) aide.'),
        Q('Que veut dire le suffixe « -able » ?', 'qui peut être', 'petit', 'celui qui fait', 'le contraire', ex='lavable : qui peut être lavé.'),
        Q('« Un octogone » a combien de côtés ?', '8', '6', '10', '4', ex='octo- = huit.'),
        Q('« La bibliothèque » : « biblio » veut dire…', 'livre', 'maison', 'boîte', 'savoir', ex='lieu des livres.'),
        Q('« Il marchait d’un pas nonchalant, sans se presser. » « nonchalant » veut dire…', 'lent et décontracté', 'rapide', 'bruyant', 'énervé', ex='« sans se presser » éclaire le sens.'),
        M('Associe chaque préfixe à son sens.', [('pré-', 'avant'), ('anti-', 'contre'), ('sous-', 'en dessous')], ex='Sens des préfixes.'),
        Q('« Un hydravion » se pose…', 'sur l’eau', 'sur la neige', 'sur la lune', 'sur un arbre', ex='hydr- = eau.'),
    ])
    lesson(T(23), 'Organiser réseaux de sens et nuances', 'Les synonymes ont un sens proche mais des nuances différentes : « content, joyeux, ravi, euphorique » vont du plus faible au plus fort. Les mots d’un même thème forment un champ lexical.', [
        O('Range du plus faible au plus fort.', ['tiède', 'chaud', 'brûlant', 'bouillant'], ex='Gradation de la chaleur.'),
        O('Range du plus faible au plus fort.', ['content', 'joyeux', 'ravi', 'fou de joie'], ex='Gradation de la joie.'),
        Q('Quel mot appartient au champ lexical de la peur ?', 'trembler', 'rire', 'manger', 'dormir', ex='La peur fait trembler.'),
        Q('Quel est l’antonyme de « généreux » ?', 'avare', 'gentil', 'riche', 'grand', ex='Contraire.'),
        Q('Un synonyme de « briller » ?', 'étinceler', 'éteindre', 'assombrir', 'cacher', ex='Sens proche.'),
        Q('« Murmurer, chuchoter, crier, hurler » concernent…', 'la voix', 'la vue', 'le goût', 'le toucher', ex='Champ lexical de la parole.'),
        M('Associe chaque mot à son antonyme.', [('fragile', 'solide'), ('ancien', 'moderne'), ('rare', 'fréquent')], ex='Contraires.'),
        Q('Quel mot est le plus fort ?', 'terrifié', 'inquiet', 'craintif', 'soucieux', ex='Terrifié exprime une très grande peur.'),
    ])
    lesson(T(24), 'Adapter le lexique à la situation et au destinataire', 'On ne parle pas de la même façon à un ami et à une directrice. Le langage courant convient à la plupart des situations ; le langage soutenu est plus recherché ; le langage familier se réserve aux proches.', [
        Q('Quel mot est familier ?', 'bouquin', 'livre', 'ouvrage', 'volume', ex='Bouquin : familier.'),
        Q('Quel mot est soutenu ?', 'demeure', 'maison', 'baraque', 'piaule', ex='Demeure : soutenu.'),
        Q('Pour écrire au maire, on commence par…', '« Monsieur le Maire, »', '« Salut ! »', '« Coucou mec, »', '« Hé ! »', ex='Formule de politesse adaptée.'),
        Q('Quelle phrase convient pour demander poliment ?', '« Pourriez-vous m’aider, s’il vous plaît ? »', '« Aide-moi ! »', '« File-moi un coup de main. »', '« Bouge-toi ! »', ex='Conditionnel de politesse.'),
        M('Associe chaque mot à son registre.', [('voiture', 'courant'), ('bagnole', 'familier'), ('automobile', 'soutenu')], ex='Niveaux de langue.'),
        Q('Dans un exposé devant la classe, on utilise…', 'le langage courant', 'le langage très familier', 'des insultes', 'uniquement des onomatopées', ex='Adapté à la situation.'),
        Q('« Je me suis fait gronder » au registre familier, c’est…', '« Je me suis fait engueuler »', '« J’ai été réprimandé »', '« On m’a fait des remontrances »', '« J’ai été félicité »', ex='« engueuler » est familier.'),
        Q('Pour conclure une lettre officielle, on écrit…', '« Veuillez agréer mes salutations distinguées. »', '« Bisous ! »', '« Salut, à plus ! »', '« Ciao »', ex='Formule soutenue.'),
    ])
    lesson(T(25), 'Écrire lisiblement et utiliser des écrits de travail', 'Les écrits de travail (brouillons, listes, tableaux, cartes mentales) aident à réfléchir et à organiser ses idées avant d’écrire au propre. Une écriture lisible respecte la taille des lettres et les espaces.', [
        Q('Une carte mentale sert à…', 'organiser ses idées autour d’un thème', 'faire un dessin libre', 'calculer', 'mesurer', ex='Idées reliées par des branches.'),
        Q('À quoi sert un brouillon ?', 'À chercher et corriger avant le propre', 'À rien', 'À décorer', 'À remplacer le texte final', ex='Étape de travail.'),
        Q('Pour prendre des notes rapidement, on écrit…', 'des mots-clés et des abréviations', 'des phrases très longues', 'le texte en entier', 'rien', ex='Aller à l’essentiel.'),
        Q('Un tableau à deux colonnes « pour / contre » aide à…', 'préparer un avis argumenté', 'faire une addition', 'dessiner', 'jouer', ex='Comparer les arguments.'),
        Q('Une écriture lisible demande…', 'des lettres bien formées et des espaces entre les mots', 'des lettres collées', 'une écriture minuscule', 'beaucoup de ratures', ex='Le lecteur doit pouvoir lire.'),
        O('Remets dans l’ordre.', ['Chercher des idées', 'Faire un plan', 'Écrire un brouillon', 'Recopier au propre'], ex='Du brouillon au propre.'),
        Q('Quelle abréviation signifie « quelque chose » ?', 'qqch', 'qqn', 'cad', 'ex', ex='qqch = quelque chose.'),
        Q('Un résumé de leçon est un écrit…', 'de travail pour apprendre', 'de fiction', 'de publicité', 'de poésie', ex='Il aide à mémoriser.'),
    ], adult='Avec un adulte, faites une carte mentale sur un sujet aimé de l’enfant, puis écrivez trois phrases à partir d’elle.')
    lesson(T(26), 'Planifier un récit et organiser ses paragraphes', 'Un récit bien construit est découpé en paragraphes : un paragraphe par étape (situation initiale, problème, péripéties, résolution, fin). On va à la ligne à chaque nouveau paragraphe.', [
        Q('Quand change-t-on de paragraphe ?', 'Quand on passe à une nouvelle étape ou idée', 'À chaque phrase', 'Jamais', 'Au hasard', ex='Un paragraphe = une étape.'),
        O('Remets le récit dans l’ordre.', ['Tom vivait près d’une forêt.', 'Un jour, son chien disparut.', 'Il le chercha partout, en vain.', 'Enfin, il l’entendit aboyer dans une grotte.', 'Depuis, Tom ne le quitte plus.'], ex='Schéma narratif.'),
        Q('Comment signale-t-on un nouveau paragraphe ?', 'On va à la ligne avec un alinéa', 'On écrit en rouge', 'On met un point d’exclamation', 'On saute trois pages', ex='Retour à la ligne.'),
        Q('Quel élément vient avant la résolution ?', 'Les péripéties', 'La situation finale', 'La morale', 'Le titre seulement', ex='Les péripéties préparent la résolution.'),
        Q('Planifier un récit, c’est…', 'décider à l’avance des grandes étapes', 'écrire sans réfléchir', 'recopier un livre', 'compter les mots', ex='Faire un plan.'),
        M('Associe chaque connecteur à l’étape.', [('Il était une fois', 'situation initiale'), ('Un jour', 'élément déclencheur'), ('Finalement', 'résolution ou fin')], ex='Connecteurs du récit.'),
        Q('Le personnage principal doit…', 'rester cohérent du début à la fin', 'changer de nom', 'disparaître au milieu', 'parler en vers', ex='Cohérence.'),
        Q('Un dialogue dans un récit se présente avec…', 'des guillemets ou des tirets et un retour à la ligne à chaque réplique', 'des parenthèses', 'rien de spécial', 'des majuscules partout', ex='Ponctuation du dialogue.'),
    ])
    lesson(T(27), 'Rédiger explication, résumé, dialogue et avis argumenté', 'Chaque écrit a sa forme : l’explication utilise des connecteurs logiques (d’abord, car, donc) ; le résumé va à l’essentiel ; le dialogue a des tirets ; l’avis argumenté donne une opinion et la justifie.', [
        Q('Quel connecteur exprime la conséquence ?', 'donc', 'car', 'mais', 'pourtant', ex='donc = conséquence.'),
        Q('Quel connecteur exprime la cause ?', 'car', 'donc', 'ensuite', 'enfin', ex='car = cause.'),
        Q('Un avis argumenté contient…', 'une opinion et des arguments', 'seulement une opinion', 'seulement des exemples', 'une recette', ex='Opinion + justification.'),
        Q('Dans un dialogue, le tiret indique…', 'un changement d’interlocuteur', 'une liste', 'une erreur', 'la fin du texte', ex='Chaque réplique commence par un tiret.'),
        Q('Quelle phrase commence bien un avis ?', '« À mon avis, ce livre est passionnant car… »', '« Ce livre. »', '« Il était une fois… »', '« Mélanger la farine… »', ex='Opinion + justification.'),
        Q('Une explication scientifique répond souvent à…', '« Pourquoi ? » et « Comment ? »', '« Qui est le héros ? »', '« Quelle rime ? »', '« Quel est le prix ? »', ex='Elle explique un phénomène.'),
        M('Associe chaque connecteur à son sens.', [('cependant', 'opposition'), ('parce que', 'cause'), ('c’est pourquoi', 'conséquence')], ex='Connecteurs logiques.'),
        Q('Un verbe de parole pour introduire une réplique ?', 'répondit', 'mangea', 'courut', 'dormit', ex='dit, répondit, demanda, s’exclama…'),
    ])
    lesson(T(28), 'Réviser cohérence, vocabulaire et correction', 'Réviser son texte : vérifier la cohérence (personnages, temps, logique), remplacer les mots vagues par des mots précis, supprimer les répétitions, corriger l’orthographe et la ponctuation.', [
        Q('Remplace le mot vague : « Il a fait une jolie chose. »', 'Il a construit une maquette remarquable.', 'Il a fait une chose.', 'Il a fait fait une jolie chose.', 'Chose jolie il a fait.', ex='Verbe et nom précis.'),
        Q('Quelle phrase est incohérente avec un récit au passé ?', 'Hier, je vais au cinéma.', 'Hier, je suis allé au cinéma.', 'Hier, j’allai au cinéma.', 'Hier, j’étais au cinéma.', ex='« Hier » demande un temps du passé.'),
        Q('Comment remplacer « Sophie » déjà répété trois fois ?', 'elle, la fillette, mon amie', 'Sophie Sophie', 'rien', 'il', ex='Reprises variées.'),
        Q('Quel verbe est plus précis que « aller » vite ?', 'se précipiter', 'faire', 'être', 'avoir', ex='Verbe précis.'),
        Q('Trouve l’erreur de ponctuation.', 'Où vas-tu.', 'Où vas-tu ?', 'Viens vite !', 'Il dort.', ex='Une question finit par « ? ».'),
        Q('Que vérifie-t-on pour la cohérence d’un personnage ?', 'Qu’il garde le même nom et le même caractère', 'Qu’il change de nom', 'Qu’il soit drôle', 'Qu’il parle peu', ex='Cohérence du récit.'),
        Q('Quelle révision améliore le style ?', 'Varier les débuts de phrases', 'Commencer toutes les phrases par « Et »', 'Supprimer la ponctuation', 'Tout écrire en majuscules', ex='Varier le style.'),
        Q('Un correcteur automatique…', 'peut aider mais ne repère pas toutes les erreurs', 'corrige toujours tout', 'est interdit', 'remplace la relecture', ex='La relecture reste nécessaire.'),
    ])
    REP = 'Ce matin, au port de Concarneau, les pêcheurs ont débarqué plus de deux tonnes de sardines. Selon le capitaine Le Goff, la saison est excellente grâce à une eau plus chaude que d’habitude. Les poissons seront vendus dès demain à la criée.'
    lesson(T(29), 'Comprendre un reportage ou un message', 'Un reportage informe sur un fait réel : il répond aux questions qui ? quoi ? où ? quand ? pourquoi ? On distingue les faits (vérifiables) des opinions (ce que pense quelqu’un).', [
        Q('Où se passe l’événement ?', 'Au port de Concarneau', 'À Paris', 'En montagne', 'On ne le sait pas', ex='« au port de Concarneau ».', passage=REP),
        Q('Quelle quantité de sardines a été débarquée ?', 'Plus de deux tonnes', 'Deux kilos', 'Vingt tonnes', 'Cent sardines', ex='« plus de deux tonnes ».', passage=REP),
        Q('Pourquoi la saison est-elle bonne, selon le capitaine ?', 'L’eau est plus chaude que d’habitude', 'Il a plu', 'Les bateaux sont neufs', 'Il y a moins de pêcheurs', ex='« grâce à une eau plus chaude ».', passage=REP),
        Q('Quand les poissons seront-ils vendus ?', 'Dès demain', 'Ce soir', 'La semaine prochaine', 'Jamais', ex='« dès demain ».', passage=REP),
        Q('« La saison est excellente » est…', 'l’avis du capitaine', 'un fait mesuré', 'une erreur', 'une question', ex='« Selon le capitaine » : c’est son opinion.', passage=REP),
        Q('Qu’est-ce qu’une criée ?', 'Un lieu de vente du poisson aux enchères', 'Un cri de mouette', 'Un bateau', 'Un filet de pêche', ex='Vocabulaire de la pêche.'),
        Q('Un fait est…', 'une information vérifiable', 'un avis personnel', 'une blague', 'un souhait', ex='Fait ≠ opinion.'),
        M('Associe chaque question à la réponse du reportage.', [('Qui ?', 'les pêcheurs'), ('Où ?', 'Concarneau'), ('Quand ?', 'ce matin')], ex='Les questions du journaliste.'),
    ], adult='Écoutez ensemble un court reportage radio ou télévisé, puis l’enfant résume qui, quoi, où, quand.')
    lesson(T(30), 'Présenter un exposé organisé', 'Un exposé se prépare : on choisit un sujet, on cherche des informations fiables, on fait un plan en parties, on prépare un support (affiche, diaporama) et des notes, puis on s’entraîne à le présenter.', [
        O('Remets les étapes de préparation dans l’ordre.', ['Choisir le sujet', 'Chercher des informations', 'Faire un plan', 'Préparer le support', 'S’entraîner'], ex='Méthode de l’exposé.'),
        Q('Un bon support d’exposé contient…', 'des images et des mots-clés', 'tout le texte écrit petit', 'rien', 'uniquement des couleurs', ex='Il illustre, il ne remplace pas l’oral.'),
        Q('Pendant l’exposé, on…', 'parle au public sans lire tout son texte', 'tourne le dos', 'lit sa feuille mot à mot', 'chuchote', ex='On s’adresse au public.'),
        Q('L’introduction d’un exposé sert à…', 'présenter le sujet et le plan', 'conclure', 'remercier seulement', 'poser des questions au public', ex='Annoncer ce qui va être dit.'),
        Q('La conclusion sert à…', 'résumer l’essentiel et ouvrir', 'présenter le sujet', 'donner sa source seulement', 'recommencer', ex='Finir clairement.'),
        Q('Pourquoi citer ses sources ?', 'Pour montrer d’où viennent les informations', 'Pour faire long', 'Ce n’est pas utile', 'Pour copier', ex='Honnêteté et fiabilité.'),
        Q('Combien de temps s’entraîner ?', 'Plusieurs fois, à voix haute', 'Jamais', 'Une seconde', 'Seulement dans sa tête', ex='L’entraînement donne confiance.'),
        Q('Les questions du public à la fin…', 'montrent son intérêt : on y répond simplement', 'sont interdites', 'doivent être ignorées', 'sont des pièges', ex='C’est un échange.'),
    ], adult='L’enfant présente un mini-exposé de 3 minutes devant un adulte avec une affiche ou des notes.')
    lesson(T(31), 'Débattre, écouter, reformuler et argumenter', 'Dans un débat, on prend la parole à son tour, on reformule l’idée de l’autre avant de répondre (« Si j’ai bien compris, tu penses que… »), on argumente avec des exemples et on respecte les avis différents.', [
        Q('Reformuler l’avis d’un camarade, c’est…', 'redire son idée avec ses propres mots', 'la répéter mot à mot', 'la critiquer', 'l’ignorer', ex='Montrer qu’on a compris.'),
        Q('Quelle formule sert à reformuler ?', '« Si j’ai bien compris, tu penses que… »', '« N’importe quoi. »', '« Moi j’ai raison. »', '« Tais-toi. »', ex='Formule de reformulation.'),
        Q('Un contre-argument…', 'répond à un argument opposé', 'approuve tout', 'est une insulte', 'n’a pas de raison', ex='Il nuance ou réfute.'),
        Q('Quel argument s’appuie sur un exemple ?', '« Les écrans gênent le sommeil : mon frère dort mal après ses jeux. »', '« Les écrans, c’est nul. »', '« Parce que. »', '« Je l’ai dit. »', ex='Exemple concret.'),
        Q('Pour concéder un point, on dit…', '« Certes…, mais… »', '« Non, jamais. »', '« Tu as tort. »', '« Bof. »', ex='Concession.'),
        Q('Dans un débat, le but est…', 'd’échanger des idées et de réfléchir ensemble', 'de gagner à tout prix', 'de crier le plus fort', 'de se moquer', ex='Réfléchir ensemble.'),
        M('Associe chaque formule à son rôle.', [('Certes…', 'concéder'), ('De plus…', 'ajouter un argument'), ('En conclusion…', 'conclure')], ex='Formules du débat.'),
        Q('Si quelqu’un a un avis différent, on…', 'le respecte et on argumente', 'se moque de lui', 'quitte le débat', 'lui coupe la parole', ex='Respect mutuel.'),
    ])
