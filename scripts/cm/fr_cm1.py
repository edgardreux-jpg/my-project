from dsl import Q, N, M, O, F, lesson

def fr_cm1():
    T = lambda n: f'cm1-fr-{n:02d}'
    TXT1 = 'Le soir tombait. Marius ferma les volets, puis il alluma la vieille lampe à huile. Dehors, le vent hurlait et la pluie frappait les vitres. Son grand-père, assis près du feu, ouvrit un livre aux pages jaunies : « Ce soir, je vais te raconter l’histoire du phare. »'
    lesson(T(1), 'Lire avec fluidité et expressivité', 'Lire avec fluidité, c’est lire sans hésiter, en respectant la ponctuation : on marque une petite pause à la virgule, une pause plus longue au point. Le point d’exclamation et le point d’interrogation changent le ton de la voix.', [
        Q('Que fait-on à une virgule quand on lit à voix haute ?', 'Une petite pause', 'Une très longue pause', 'On crie', 'On s’arrête de lire', ex='La virgule marque une courte pause.'),
        Q('Comment lit-on une phrase qui finit par « ? »', 'Avec une voix qui monte', 'En chuchotant toujours', 'Sans changer le ton', 'Très vite', ex='La question fait monter la voix.'),
        Q('Comment lit-on « Attention ! » ?', 'Avec force, comme un avertissement', 'Tout doucement', 'Comme une question', 'Sans aucun ton', ex='Le point d’exclamation exprime une émotion forte.'),
        Q('Dans le texte, que fait Marius en premier ?', 'Il ferme les volets', 'Il allume la lampe', 'Il ouvre un livre', 'Il sort sous la pluie', ex='« Marius ferma les volets, puis il alluma la lampe ».', passage=TXT1),
        Q('Quelle ambiance le texte installe-t-il ?', 'Une soirée de tempête, calme à l’intérieur', 'Une journée de plage', 'Une fête bruyante', 'Un matin d’école', ex='Le vent et la pluie dehors, le feu à l’intérieur.', passage=TXT1),
        Q('Comment lire les paroles du grand-père ?', 'Avec une voix douce et mystérieuse', 'En criant', 'Très vite sans pause', 'Sans regarder le texte', ex='Il va raconter une histoire : le ton invite à écouter.', passage=TXT1),
        Q('Pourquoi relire un texte avant de le lire à voix haute ?', 'Pour comprendre et bien placer le ton', 'Pour aller plus vite', 'Pour l’apprendre par cœur', 'Ce n’est pas utile', ex='On lit mieux un texte qu’on a compris.'),
        O('Remets les étapes d’une bonne lecture à voix haute dans l’ordre.', ['Lire le texte en silence', 'Repérer la ponctuation et les mots difficiles', 'S’entraîner à voix haute', 'Lire devant les autres'], ex='On prépare avant de lire en public.'),
    ], adult='Lis le texte de Marius à voix haute à un adulte en respectant les pauses. La fluence orale ne peut pas être notée automatiquement : c’est l’adulte qui écoute.')
    TXT2 = 'Quand Léna rentra, ses bottes étaient couvertes de boue et ses joues toutes rouges. Elle posa sur la table un panier rempli de champignons. Sa mère sourit : « Tu as eu de la chance, il y en a beaucoup cette année ! »'
    lesson(T(2), 'Déduire une information à partir d’indices', 'Un texte ne dit pas tout. Le lecteur relie des indices pour comprendre ce qui est sous-entendu : c’est l’inférence. Des bottes pleines de boue et un panier de champignons font deviner une promenade en forêt.', [
        Q('D’où revient Léna ?', 'De la forêt', 'De la piscine', 'De l’école', 'Du supermarché', ex='Indices : boue, champignons.', passage=TXT2),
        Q('Pourquoi a-t-elle les joues rouges ?', 'Elle a marché dehors au frais', 'Elle est en colère', 'Elle a de la fièvre', 'Elle s’est maquillée', ex='La promenade dehors rougit les joues.', passage=TXT2),
        Q('En quelle saison se passe probablement la scène ?', 'En automne', 'En été', 'Au printemps', 'On ne peut rien deviner', ex='Boue et champignons : c’est l’automne.', passage=TXT2),
        Q('Que ressent sa mère ?', 'Elle est contente', 'Elle est fâchée', 'Elle a peur', 'Elle est triste', ex='Elle sourit.', passage=TXT2),
        Q('« Paul regarda la pluie et soupira. » Que ressent Paul ?', 'De la déception', 'De la joie', 'De la peur', 'De la colère', ex='Soupirer en regardant la pluie montre une déception.'),
        Q('« Le gâteau avait disparu et le chien se léchait les babines. » Qui a mangé le gâteau ?', 'Le chien', 'Le chat', 'Personne', 'Le facteur', ex='Les babines léchées sont l’indice.'),
        Q('« Elle prit son cartable et courut vers l’arrêt : le bus partait. » Pourquoi court-elle ?', 'Elle a peur de rater le bus', 'Elle fait du sport', 'Elle fuit un chien', 'Elle joue à chat', ex='Le bus partait.'),
        Q('Qu’est-ce qu’une inférence ?', 'Une information déduite d’indices', 'Une faute d’orthographe', 'Un titre de livre', 'Un mot inventé', ex='On déduit ce que le texte ne dit pas directement.'),
    ])
    DOC = 'Le loup gris vit en meute, un groupe de 4 à 8 loups. Il peut parcourir plus de 40 km en une nuit pour chasser. En France, il avait disparu vers 1930. Il est revenu naturellement par l’Italie au début des années 1990. Il est aujourd’hui une espèce protégée.'
    lesson(T(3), 'Comprendre textes, documents et images', 'Un document informatif donne des faits : chiffres, dates, lieux. Pour répondre, on retrouve l’information dans le texte, le titre, l’image ou sa légende, sans inventer.', [
        Q('Comment s’appelle un groupe de loups ?', 'Une meute', 'Un troupeau', 'Un essaim', 'Une harde', ex='« Le loup gris vit en meute ».', passage=DOC),
        N('Combien de kilomètres un loup peut-il parcourir en une nuit, au moins ?', 40, ex='« plus de 40 km ».'),
        Q('Par quel pays le loup est-il revenu en France ?', 'L’Italie', 'L’Espagne', 'La Belgique', 'La Suisse uniquement', ex='« par l’Italie ».', passage=DOC),
        Q('Que signifie « espèce protégée » ?', 'On n’a pas le droit de la chasser librement', 'Elle vit dans un zoo', 'Elle est dangereuse', 'Elle a disparu', ex='La loi la protège.', passage=DOC),
        Q('À quoi sert la légende d’une photo ?', 'À expliquer ce que montre l’image', 'À décorer', 'À donner le prix', 'À rien', ex='Elle précise ce qu’on voit.'),
        Q('Ce texte est…', 'documentaire', 'un conte', 'un poème', 'une recette', ex='Il donne des informations vraies.', passage=DOC),
        O('Range ces événements dans l’ordre chronologique.', ['Le loup disparaît de France', 'Le loup revient par l’Italie', 'Le loup est protégé aujourd’hui'], ex='Vers 1930, puis années 1990, puis aujourd’hui.'),
        Q('Pour trouver une date dans un document, on…', 'cherche les nombres et les mots comme « en », « vers »', 'lit seulement le titre', 'regarde les couleurs', 'invente une réponse', ex='On repère les indices de temps.'),
    ])
    TXT4 = 'Je n’avais jamais vu une mer aussi grise. Mon cousin Hugo, lui, riait en sautant dans les vagues. Moi, je restais sur la plage, les bras croisés, à compter les mouettes.'
    lesson(T(4), 'Distinguer narrateur, personnages et points de vue', 'Le narrateur est celui qui raconte. S’il dit « je », il est aussi un personnage. S’il dit « il » ou « elle », il raconte de l’extérieur. Deux personnages peuvent vivre la même scène de façon différente : ce sont des points de vue.', [
        Q('Qui raconte l’histoire ?', 'Un enfant qui dit « je »', 'Hugo', 'Une mouette', 'Un narrateur extérieur', ex='« Je n’avais jamais vu… »', passage=TXT4),
        Q('Le narrateur est-il un personnage de l’histoire ?', 'Oui', 'Non', 'On ne sait pas', 'C’est l’auteur du livre', ex='Il dit « je » et il est sur la plage.', passage=TXT4),
        Q('Comment Hugo vit-il la journée ?', 'Il s’amuse', 'Il s’ennuie', 'Il a peur', 'Il dort', ex='Il rit en sautant dans les vagues.', passage=TXT4),
        Q('Comment le narrateur vit-il la journée ?', 'Il s’ennuie', 'Il s’amuse beaucoup', 'Il nage', 'Il est très joyeux', ex='Bras croisés, il compte les mouettes.', passage=TXT4),
        Q('« Il entra dans la grotte. » Le narrateur raconte…', 'de l’extérieur, avec « il »', 'avec « je »', 'en vers', 'au futur', ex='Le pronom « il » montre un narrateur extérieur.'),
        Q('Qu’est-ce qu’un point de vue ?', 'La façon dont un personnage voit les choses', 'Un paysage', 'Une question', 'Un chapitre', ex='Chaque personnage a son regard.'),
        Q('Dans « Le loup pensait que le repas serait facile », de qui connaît-on les pensées ?', 'Du loup', 'Du chasseur', 'De personne', 'Du lecteur', ex='Le narrateur entre dans la tête du loup.'),
        Q('L’auteur est…', 'la personne qui a écrit le livre', 'toujours le personnage principal', 'le lecteur', 'l’illustrateur seulement', ex='L’auteur écrit ; le narrateur raconte dans le texte.'),
    ])
    lesson(T(5), 'Construire un parcours de lectures personnelles', 'Un lecteur choisit ses livres en lisant la couverture, le titre, la quatrième de couverture (le résumé au dos) et le début. On peut garder une trace de ses lectures dans un carnet.', [
        Q('Comment appelle-t-on le texte au dos d’un livre ?', 'La quatrième de couverture', 'La préface', 'Le sommaire', 'L’index', ex='Elle présente le livre.'),
        Q('Où trouve-t-on le nom de l’auteur ?', 'Sur la couverture', 'Seulement à la dernière page', 'Dans le sommaire uniquement', 'Nulle part', ex='Sur la couverture et la page de titre.'),
        M('Associe chaque genre à sa description.', [('Conte', 'Il était une fois, merveilleux'), ('Documentaire', 'Informations vraies'), ('Bande dessinée', 'Images et bulles')], ex='Chaque genre a ses caractéristiques.'),
        Q('Le sommaire sert à…', 'trouver les chapitres et leurs pages', 'résumer l’histoire', 'présenter l’auteur', 'donner le prix', ex='C’est la table des matières.'),
        Q('Pour choisir un roman d’aventure, je regarde d’abord…', 'le titre, la couverture et le résumé', 'le nombre de pages seulement', 'le code-barres', 'la couleur du dos', ex='Ils donnent une idée de l’histoire.'),
        Q('Un carnet de lecteur sert à…', 'garder une trace et un avis sur ses lectures', 'faire ses devoirs de maths', 'dessiner seulement', 'noter ses notes', ex='Titre, auteur, avis, citation préférée…'),
        Q('Une série de livres, c’est…', 'plusieurs livres avec les mêmes personnages', 'un seul livre très long', 'un dictionnaire', 'un journal', ex='Les tomes se suivent.'),
        Q('Donner son avis sur un livre, c’est…', 'dire ce qu’on a aimé ou non et pourquoi', 'recopier le résumé', 'donner le prix', 'lire la dernière page', ex='On justifie son avis.'),
    ])
    lesson(T(6), 'Explorer héros, merveilleux et autres vies', 'Le héros affronte des épreuves et change souvent au cours de l’histoire. Dans le merveilleux, des événements magiques arrivent (fées, objets enchantés, animaux qui parlent). Lire, c’est aussi découvrir d’autres vies et d’autres pays.', [
        Q('Quel élément appartient au merveilleux ?', 'Une baguette magique', 'Un vélo', 'Une salle de classe', 'Un ticket de bus', ex='La magie appartient au merveilleux.'),
        Q('Un héros, c’est souvent…', 'un personnage qui affronte des épreuves', 'le méchant de l’histoire', 'un objet', 'le lecteur', ex='Il surmonte des obstacles.'),
        Q('Dans un conte, l’opposant…', 'empêche le héros d’avancer', 'aide toujours le héros', 'n’existe jamais', 'est le narrateur', ex='Sorcière, ogre, loup…'),
        Q('Dans un conte, l’adjuvant…', 'aide le héros', 'veut le dévorer', 'est toujours un roi', 'raconte l’histoire', ex='Une fée, un animal ami…'),
        O('Remets les étapes d’un conte dans l’ordre.', ['Il était une fois…', 'Un problème arrive', 'Le héros affronte des épreuves', 'Le problème est résolu', 'Fin heureuse'], ex='Le schéma du conte.'),
        Q('Quelle formule ouvre souvent un conte ?', '« Il était une fois »', '« Cher journal »', '« Ingrédients »', '« Article 1 »', ex='C’est la formule traditionnelle.'),
        Q('Lire un récit qui se passe dans un autre pays permet…', 'de découvrir d’autres façons de vivre', 'de ne rien apprendre', 'd’apprendre les tables', 'd’oublier sa langue', ex='La lecture ouvre sur le monde.'),
        Q('Ulysse, Robin des Bois, Mulan sont…', 'des héros de récits', 'des inventeurs', 'des villes', 'des animaux', ex='Des héros célèbres.'),
    ])
    lesson(T(7), 'Interroger la morale et les relations aux autres', 'Une fable est un court récit, souvent avec des animaux, qui se termine par une morale : une leçon de vie. Les récits nous font réfléchir à l’amitié, à la justice, au courage et au respect.', [
        Q('Qu’est-ce qu’une morale ?', 'Une leçon de vie à retenir', 'Le titre du livre', 'Un personnage', 'Une rime', ex='Elle conclut souvent une fable.'),
        Q('Qui a écrit de nombreuses fables en vers au XVIIe siècle ?', 'Jean de La Fontaine', 'Victor Hugo', 'Charles Perrault', 'Jules Verne', ex='« Le Corbeau et le Renard », « La Cigale et la Fourmi »…'),
        Q('Le Lièvre et la Tortue enseigne que…', 'rien ne sert de courir, il faut partir à point', 'il faut toujours courir vite', 'les tortues sont lentes', 'les lièvres gagnent toujours', ex='La tortue gagne par sa régularité.'),
        Q('Le Corbeau et le Renard met en garde contre…', 'les flatteurs', 'les fromages', 'la pluie', 'les arbres', ex='« Tout flatteur vit aux dépens de celui qui l’écoute. »'),
        Q('Dans une fable, les animaux…', 'représentent souvent des défauts ou qualités humaines', 'sont toujours des vrais animaux de zoo', 'ne parlent jamais', 'sont des robots', ex='Le renard rusé, la fourmi travailleuse…'),
        Q('Un personnage partage son goûter avec un nouveau élève. C’est un exemple de…', 'générosité', 'jalousie', 'moquerie', 'paresse', ex='Partager, c’est être généreux.'),
        M('Associe chaque valeur à un exemple.', [('Courage', 'défendre un camarade'), ('Honnêteté', 'rendre un objet trouvé'), ('Patience', 'attendre son tour')], ex='Les récits illustrent ces valeurs.'),
        Q('Pourquoi discute-t-on de la morale d’un récit ?', 'Pour réfléchir à nos comportements', 'Pour apprendre le texte par cœur', 'Pour trouver les rimes', 'Pour compter les mots', ex='Le récit fait réfléchir.'),
    ])
    lesson(T(8), 'Lire, dire et créer de la poésie', 'Un poème est écrit en vers, regroupés en strophes. Les rimes sont des sons répétés à la fin des vers. Les images poétiques comparent les choses : « la lune comme une pièce d’argent ».', [
        Q('Une ligne d’un poème s’appelle…', 'un vers', 'une strophe', 'un paragraphe', 'une rime', ex='Un vers.'),
        Q('Un groupe de vers s’appelle…', 'une strophe', 'un chapitre', 'une phrase', 'un titre', ex='Une strophe.'),
        Q('Quel mot rime avec « château » ?', 'bateau', 'chaton', 'chemin', 'cheval', ex='-eau / -eau.'),
        Q('« La lune est comme une pièce d’argent » est…', 'une comparaison', 'une question', 'une rime', 'une liste', ex='« comme » introduit une comparaison.'),
        N('Combien de syllabes dans « pa-pil-lon » ?', 3, ex='pa / pil / lon.'),
        Q('Quel poète a écrit « Demain, dès l’aube… » ?', 'Victor Hugo', 'Jean de La Fontaine', 'Charles Perrault', 'Hergé', ex='Victor Hugo.'),
        M('Associe chaque mot à sa rime.', [('fleur', 'couleur'), ('soleil', 'merveille'), ('lune', 'plume')], ex='Les sons de fin se ressemblent.'),
        Q('Dire un poème, c’est…', 'le réciter avec le ton et les pauses', 'le lire le plus vite possible', 'le recopier', 'le dessiner', ex='On met le texte en voix.'),
    ])
    lesson(T(9), 'Identifier sujet, groupe verbal et compléments', 'Le sujet indique de qui ou de quoi on parle ; on le trouve avec « C’est … qui ». Le groupe verbal contient le verbe et ses compléments. Les compléments de phrase (lieu, temps) peuvent se déplacer ou se supprimer.', [
        Q('Quel est le sujet ? « Les élèves de CM1 visitent un musée. »', 'Les élèves de CM1', 'visitent', 'un musée', 'CM1', ex='C’est les élèves de CM1 qui visitent.'),
        Q('Quel est le verbe ? « Chaque matin, mon frère prend le bus. »', 'prend', 'Chaque matin', 'mon frère', 'le bus', ex='Le verbe se conjugue : il prend, il prenait.'),
        Q('Quel est le groupe verbal ? « Le chat attrape une souris. »', 'attrape une souris', 'Le chat', 'une souris', 'Le chat attrape', ex='Verbe + son complément.'),
        Q('Quel groupe peut se déplacer ? « Hier, nous avons joué au parc. »', 'Hier', 'nous', 'avons joué', 'joué au', ex='« Nous avons joué au parc hier. »'),
        Q('Quel est le sujet ? « Dans la forêt vivaient trois ours. »', 'trois ours', 'Dans la forêt', 'vivaient', 'la forêt', ex='Sujet inversé : c’est trois ours qui vivaient.'),
        Q('Quel complément peut être supprimé ? « Le soir, Lina lit une histoire. »', 'Le soir', 'Lina', 'lit', 'une histoire', ex='« Lina lit une histoire » garde du sens.'),
        Q('Comment trouve-t-on le sujet ?', 'Avec « C’est … qui »', 'En cherchant le dernier mot', 'En cherchant le nom propre', 'Avec « Pourquoi ? »', ex='Encadrer avec « c’est … qui ».'),
        M('Associe chaque groupe à sa fonction. « Ce matin, Tom mange une pomme. »', [('Ce matin', 'complément de phrase'), ('Tom', 'sujet'), ('mange une pomme', 'groupe verbal')], ex='Analyse de la phrase.'),
    ])
    lesson(T(10), 'Distinguer classes grammaticales et fonctions', 'La classe (nature) d’un mot ne change pas : nom, verbe, adjectif, déterminant, pronom, adverbe… La fonction dépend du rôle du mot dans la phrase : sujet, complément, attribut…', [
        Q('Quelle est la classe de « rapidement » ?', 'adverbe', 'adjectif', 'nom', 'verbe', ex='Il précise le verbe ; il est invariable.'),
        Q('Quelle est la classe de « elles » ?', 'pronom', 'déterminant', 'nom', 'adjectif', ex='Pronom personnel.'),
        Q('Quelle est la classe de « courageux » ?', 'adjectif', 'adverbe', 'nom', 'verbe', ex='Il précise un nom.'),
        Q('Quelle est la classe de « ces » ?', 'déterminant', 'pronom', 'adjectif', 'nom', ex='Déterminant démonstratif.'),
        Q('Dans « Le chien aboie », quelle est la fonction de « Le chien » ?', 'sujet', 'complément', 'attribut', 'verbe', ex='C’est le chien qui aboie.'),
        Q('Dans « Je vois le chien », quelle est la fonction de « le chien » ?', 'complément du verbe', 'sujet', 'adjectif', 'déterminant', ex='Je vois quoi ? le chien.'),
        M('Associe chaque mot à sa classe.', [('maison', 'nom'), ('chanter', 'verbe'), ('très', 'adverbe')], ex='Classes grammaticales.'),
        Q('Le même nom peut-il être sujet dans une phrase et complément dans une autre ?', 'Oui', 'Non', 'Seulement les noms propres', 'Seulement au pluriel', ex='La fonction change selon la phrase, pas la classe.'),
    ])
    lesson(T(11), 'Reconnaître compléments d’objet et circonstanciels', 'Le complément d’objet complète le verbe ; on ne peut ni le déplacer ni le supprimer facilement (Je mange une pomme). Les compléments circonstanciels donnent le lieu, le temps ou la manière ; on peut souvent les déplacer.', [
        Q('Dans « Inès lit un roman », « un roman » est…', 'un complément d’objet', 'un complément de temps', 'le sujet', 'un adjectif', ex='Inès lit quoi ? un roman.'),
        Q('Dans « Nous partons demain », « demain » est un complément…', 'de temps', 'de lieu', 'd’objet', 'de manière', ex='Quand ? demain.'),
        Q('Dans « Il joue dans le jardin », « dans le jardin » est un complément…', 'de lieu', 'de temps', 'd’objet', 'de manière', ex='Où ? dans le jardin.'),
        Q('Dans « Elle chante avec joie », « avec joie » est un complément…', 'de manière', 'de lieu', 'de temps', 'd’objet', ex='Comment ? avec joie.'),
        Q('Quel complément peut se déplacer ?', 'Le complément circonstanciel', 'Le complément d’objet', 'Aucun', 'Le sujet seulement', ex='« Demain, nous partons. »'),
        Q('Dans « Je parle à ma sœur », « à ma sœur » est…', 'un complément d’objet indirect', 'un complément de lieu', 'le sujet', 'un complément de temps', ex='Je parle à qui ? Il est introduit par « à ».'),
        M('Associe chaque question au complément.', [('Où ?', 'lieu'), ('Quand ?', 'temps'), ('Comment ?', 'manière')], ex='Questions des compléments circonstanciels.'),
        Q('« Le matin, Paul promène son chien au parc. » Combien de compléments circonstanciels ?', '2', '1', '3', '0', ex='Le matin (temps) et au parc (lieu).'),
    ])
    lesson(T(12), 'Repérer le nom noyau et les adjectifs épithètes', 'Dans un groupe nominal, le nom noyau est le mot principal. Il peut être enrichi par des adjectifs épithètes (placés à côté du nom) ou par un complément du nom (« une tasse de thé »).', [
        Q('Quel est le nom noyau ? « une petite maison blanche »', 'maison', 'petite', 'blanche', 'une', ex='Le mot principal est « maison ».'),
        Q('Quel est l’adjectif épithète ? « un chat noir »', 'noir', 'chat', 'un', 'il n’y en a pas', ex='« noir » précise le nom.'),
        Q('Quel est le complément du nom ? « une tasse de chocolat »', 'de chocolat', 'une', 'tasse', 'il n’y en a pas', ex='Il complète « tasse ».'),
        N('Combien d’adjectifs dans « un grand arbre vert et feuillu » ?', 3, ex='grand, vert, feuillu.'),
        Q('Quel est le nom noyau ? « la bicyclette rouge de mon frère »', 'bicyclette', 'rouge', 'frère', 'mon', ex='C’est la bicyclette.'),
        Q('Enrichir un groupe nominal, c’est…', 'ajouter des adjectifs ou un complément du nom', 'supprimer le nom', 'changer le verbe', 'mettre au pluriel', ex='On donne plus de précisions.'),
        Q('Quel groupe nominal est le plus enrichi ?', 'un vieux pull de laine bleu', 'un pull', 'le pull', 'ce pull', ex='Adjectifs + complément du nom.'),
        M('Associe.', [('une robe', 'nom avec déterminant'), ('une robe longue', 'nom + adjectif'), ('une robe de soirée', 'nom + complément du nom')], ex='Différentes expansions.'),
    ])
    lesson(T(13), 'Transformer les types et les formes de phrases', 'Il y a quatre types de phrases : déclarative (.), interrogative (?), exclamative (!) et impérative (ordre). Une phrase peut être à la forme affirmative ou négative (ne … pas, ne … jamais, ne … plus).', [
        Q('Quel est le type de « Ferme la porte. » ?', 'impérative', 'déclarative', 'interrogative', 'exclamative', ex='C’est un ordre.'),
        Q('Quel est le type de « Quelle belle journée ! » ?', 'exclamative', 'impérative', 'interrogative', 'déclarative', ex='Elle exprime une émotion.'),
        Q('Quelle est la forme négative de « Il pleut » ?', 'Il ne pleut pas.', 'Il pleut pas.', 'Ne il pleut.', 'Pleut-il ?', ex='ne … pas encadre le verbe.'),
        Q('Transforme en question : « Tu viens demain. »', 'Viens-tu demain ?', 'Tu viens demain !', 'Viens demain.', 'Tu ne viens pas demain.', ex='Inversion du sujet et point d’interrogation.'),
        Q('Quelle phrase est à la forme négative ?', 'Je ne mange jamais de bonbons.', 'Je mange des bonbons.', 'Mange des bonbons !', 'Manges-tu des bonbons ?', ex='ne … jamais.'),
        Q('« Est-ce que tu as faim ? » est une phrase…', 'interrogative', 'exclamative', 'impérative', 'négative uniquement', ex='Elle pose une question.'),
        M('Associe chaque phrase à son type.', [('Range ta chambre.', 'impérative'), ('Où vas-tu ?', 'interrogative'), ('Le ciel est bleu.', 'déclarative')], ex='Types de phrases.'),
        Q('La négation de « Il a encore faim » est…', 'Il n’a plus faim.', 'Il a pas faim.', 'Il n’a encore faim.', 'Il a encore pas faim.', ex='encore → ne … plus.'),
    ])
    lesson(T(14), 'Consolider présent, imparfait et futur', 'Présent : ce qui se passe maintenant (je chante). Imparfait : ce qui durait ou se répétait dans le passé (je chantais). Futur : ce qui arrivera (je chanterai). Terminaisons de l’imparfait : -ais, -ais, -ait, -ions, -iez, -aient.', [
        Q('Conjugue « finir » au présent avec « nous ».', 'nous finissons', 'nous finons', 'nous finirons', 'nous finissions', ex='Verbe du 2e groupe : -issons.'),
        Q('Conjugue « être » à l’imparfait avec « vous ».', 'vous étiez', 'vous êtes', 'vous serez', 'vous étaient', ex='-iez.'),
        Q('Conjugue « aller » au futur avec « je ».', 'j’irai', 'j’allerai', 'je vais', 'j’allais', ex='Futur irrégulier : ir-.'),
        Q('Conjugue « avoir » au futur avec « ils ».', 'ils auront', 'ils avaient', 'ils ont', 'ils aurons', ex='aur- + -ont.'),
        Q('À quel temps est « nous chantions » ?', 'imparfait', 'présent', 'futur', 'passé composé', ex='Terminaison -ions.'),
        F('Écris « faire » au présent.', 'Vous {{a}} vos devoirs.', {'a': 'faites'}, ex='vous faites.'),
        F('Écris « prendre » à l’imparfait.', 'Je {{a}} le bus chaque matin.', {'a': 'prenais'}, ex='je prenais.'),
        F('Écris « voir » au futur.', 'Demain, tu {{a}} la mer.', {'a': 'verras'}, ex='tu verras.'),
    ])
    lesson(T(15), 'Construire et accorder le passé composé', 'Le passé composé = auxiliaire avoir ou être au présent + participe passé. J’ai mangé. Avec être, le participe s’accorde avec le sujet : elle est partie, ils sont venus.', [
        Q('Conjugue « manger » au passé composé avec « nous ».', 'nous avons mangé', 'nous sommes mangé', 'nous mangions', 'nous avons mangés', ex='avoir + participe en -é.'),
        Q('Conjugue « partir » au passé composé avec « elle ».', 'elle est partie', 'elle a partie', 'elle est parti', 'elle partait', ex='Avec être, accord avec le sujet féminin.'),
        Q('Participe passé de « prendre » ?', 'pris', 'prendu', 'prit', 'prené', ex='j’ai pris.'),
        Q('Participe passé de « faire » ?', 'fait', 'faisé', 'faisu', 'fais', ex='j’ai fait.'),
        F('Écris « arriver » au passé composé.', 'Mes cousines {{a}} {{b}} hier.', {'a': 'sont', 'b': 'arrivées'}, ex='être + participe accordé au féminin pluriel.'),
        F('Écris « finir » au passé composé.', 'Tu {{a}} {{b}} ton dessin.', {'a': 'as', 'b': 'fini'}, ex='tu as fini.'),
        Q('Quels verbes se conjuguent souvent avec « être » ?', 'aller, venir, partir, arriver', 'manger, chanter, jouer', 'faire, dire, voir', 'avoir, prendre, finir', ex='Verbes de mouvement surtout.'),
        Q('Quelle phrase est correcte ?', 'Ils sont tombés.', 'Ils ont tombés.', 'Ils sont tombé.', 'Ils est tombés.', ex='être + accord au masculin pluriel.'),
    ])
    lesson(T(16), 'Mémoriser les verbes fréquents et analyser leurs marques', 'Un verbe conjugué a un radical (le début) et une terminaison (la fin) qui indique la personne et le temps. Les verbes être, avoir, aller, faire, dire, venir, pouvoir, voir, vouloir, prendre sont très fréquents : on les apprend par cœur.', [
        Q('Dans « nous chantions », quelle est la terminaison ?', '-ions', 'chant-', 'nous', '-ant', ex='La terminaison indique la personne et le temps.'),
        Q('Conjugue « pouvoir » au présent avec « ils ».', 'ils peuvent', 'ils pouvent', 'ils peuvons', 'ils pourront', ex='ils peuvent.'),
        Q('Conjugue « vouloir » au présent avec « je ».', 'je veux', 'je voulais', 'je veut', 'je voudrai', ex='je veux.'),
        Q('Conjugue « dire » au présent avec « vous ».', 'vous dites', 'vous disez', 'vous dîtes', 'vous direz', ex='vous dites (sans accent).'),
        Q('Conjugue « venir » au présent avec « nous ».', 'nous venons', 'nous viendrons', 'nous viennons', 'nous venions', ex='nous venons.'),
        M('Associe chaque terminaison à sa personne (présent, 1er groupe).', [('-e (je)', 'je joue'), ('-ons', 'nous jouons'), ('-ent', 'ils jouent')], ex='Terminaisons du présent.'),
        Q('Quel est l’infinitif de « ils vont » ?', 'aller', 'voir', 'venir', 'vouloir', ex='aller : je vais, ils vont.'),
        Q('Quel est l’infinitif de « nous pouvons » ?', 'pouvoir', 'pouver', 'pondre', 'poser', ex='pouvoir.'),
    ])
    lesson(T(17), 'Accorder le groupe nominal', 'Dans le groupe nominal, le déterminant et l’adjectif s’accordent en genre et en nombre avec le nom : une belle fleur, des belles fleurs, de grands arbres. Pluriel en -s, parfois -x (des chevaux, des bijoux).', [
        Q('Choisis le bon accord : des chemises …', 'blanches', 'blanc', 'blanche', 'blancs', ex='Féminin pluriel.'),
        Q('Choisis le bon accord : des … journaux', 'vieux', 'vieils', 'vieilles', 'vieille', ex='Masculin pluriel : vieux.'),
        Q('Pluriel de « un cheval » ?', 'des chevaux', 'des chevals', 'des chevauxs', 'des chevales', ex='-al → -aux.'),
        Q('Pluriel de « un bijou » ?', 'des bijoux', 'des bijous', 'des bijoues', 'des bijou', ex='bijou fait partie des 7 mots en -ou qui prennent -x.'),
        Q('Choisis : une … idée', 'bonne', 'bon', 'bons', 'bonnes', ex='Féminin singulier.'),
        Q('Choisis : les … feuilles', 'vertes', 'vert', 'verts', 'verte', ex='Féminin pluriel.'),
        Q('Pluriel de « un genou » ?', 'des genoux', 'des genous', 'des genouxs', 'des genoue', ex='Comme bijou, caillou, chou, hibou, joujou, pou.'),
        F('Accorde l’adjectif.', 'des maisons {{a}} (neuf)', {'a': 'neuves'}, ex='neuf → neuve → neuves.'),
    ])
    lesson(T(18), 'Accorder sujet et verbe, puis le participe passé avec être', 'Le verbe s’accorde avec son sujet, même s’il est loin ou inversé : « Les enfants du quartier jouent ». Avec l’auxiliaire être, le participe passé s’accorde avec le sujet : « Les filles sont parties ».', [
        Q('Choisis : Les oiseaux du jardin …', 'chantent', 'chante', 'chantes', 'chantez', ex='Sujet pluriel : -ent.'),
        Q('Choisis : Mon frère et moi …', 'partons', 'part', 'partent', 'partez', ex='Mon frère et moi = nous.'),
        Q('Choisis : Les chiens du voisin …', 'aboient', 'aboie', 'aboit', 'aboies', ex='Le sujet est « les chiens ».'),
        Q('Choisis : Elles sont …', 'arrivées', 'arrivé', 'arrivés', 'arrivée', ex='Féminin pluriel.'),
        Q('Choisis : Nous sommes … (un garçon et une fille)', 'partis', 'partie', 'parties', 'parti', ex='Mélange masculin/féminin : masculin pluriel.'),
        Q('Choisis : Dans la mare … des grenouilles.', 'nagent', 'nage', 'nages', 'nageons', ex='Sujet inversé : des grenouilles.'),
        F('Accorde.', 'La fusée est {{a}} (partir).', {'a': 'partie'}, ex='être + féminin singulier.'),
        Q('Pourquoi écrit-on « ils mangent » et pas « ils mange » ?', 'Le sujet est au pluriel', 'C’est l’imparfait', 'Le verbe est au futur', 'Par habitude', ex='3e personne du pluriel : -ent.'),
    ])
    lesson(T(19), 'Choisir les mots et formes selon leur contexte', 'Les homophones se prononcent pareil mais s’écrivent différemment. a / à : remplace par « avait » ; et / est : remplace par « était » ; son / sont : remplace par « étaient » ; on / ont : remplace par « avaient ».', [
        Q('Il … un vélo neuf.', 'a', 'à', 'as', 'ah', ex='Il avait un vélo : « a ».'),
        Q('Nous allons … la piscine.', 'à', 'a', 'as', 'ha', ex='On ne peut pas dire « avait » : « à ».'),
        Q('Le ciel … bleu.', 'est', 'et', 'ait', 'es', ex='Le ciel était bleu : « est ».'),
        Q('Mes cousins … arrivés.', 'sont', 'son', 'sons', 'sont-ils', ex='Ils étaient arrivés : « sont ».'),
        Q('Ils … gagné le match.', 'ont', 'on', 'onts', 'om', ex='Ils avaient gagné : « ont ».'),
        Q('… frappe à la porte.', 'On', 'Ont', 'Om', 'Ons', ex='Il frappe : « on ».'),
        Q('Elle range … cartable.', 'son', 'sont', 'sons', 'çon', ex='Son cartable (le sien).'),
        Q('Le chat … le chien jouent.', 'et', 'est', 'ait', 'es', ex='« et » relie deux sujets.'),
    ])
    lesson(T(20), 'Utiliser la morphologie pour orthographier', 'Pour trouver la lettre muette à la fin d’un mot, on cherche un mot de la même famille : « grand » → « grande » ; « lait » → « laitier ». On peut aussi mettre l’adjectif au féminin.', [
        Q('Quelle lettre muette dans « gran… » ?', 'd', 't', 's', 'x', ex='grande, grandir.'),
        Q('Quelle lettre muette dans « un chan… » (des champs) ?', 'p', 't', 'd', 's', ex='champêtre.'),
        Q('Quelle lettre muette dans « un dra… » ?', 'p', 't', 'd', 's', ex='draper, draperie.'),
        Q('Quelle lettre muette dans « le ven… » ?', 't', 'd', 's', 'p', ex='venter, venteux.'),
        Q('Quelle lettre muette dans « un regar… » ?', 'd', 't', 's', 'x', ex='regarder.'),
        Q('Quel mot aide à écrire « galop » ?', 'galoper', 'galette', 'gala', 'galet', ex='galoper → le p.'),
        M('Associe chaque mot à un mot de sa famille qui révèle la lettre muette.', [('bavard', 'bavarder'), ('respect', 'respecter'), ('sirop', 'siroter')], ex='La famille révèle la lettre.'),
        Q('Quelle orthographe est juste ?', 'un toit', 'un toi', 'un toix', 'un toie', ex='toiture → t.'),
    ])
    lesson(T(21), 'Réviser une dictée et un texte', 'Pour relire efficacement, on vérifie une chose à la fois : les accords dans le groupe nominal, l’accord sujet-verbe, les homophones, la ponctuation et les majuscules.', [
        Q('Quelle phrase est correctement écrite ?', 'Les petites filles jouent.', 'Les petite filles jouent.', 'Les petites fille joue.', 'Les petites filles joue.', ex='Accords dans le GN et du verbe.'),
        Q('Trouve l’erreur : « Il son partis à la mer. »', 'son → sont', 'Il → Ils seulement', 'partis → parti', 'mer → mère', ex='Ils étaient partis : « sont » (et « Ils »).'),
        Q('Que vérifie-t-on en premier dans une relecture ?', 'Une seule chose à la fois, par exemple les accords', 'Tout en même temps', 'Rien', 'La couleur de l’encre', ex='Relire méthodiquement.'),
        Q('Quelle phrase a une bonne ponctuation ?', 'Où vas-tu ?', 'où vas-tu ?', 'Où vas-tu.', 'Où vas tu', ex='Majuscule et point d’interrogation.'),
        Q('Corrige : « Nous mangons des fraises. »', 'Nous mangeons des fraises.', 'Nous mangon des fraises.', 'Nous mangeont des fraises.', 'Nous mangez des fraises.', ex='Avec g, on garde le e devant -ons.'),
        Q('Corrige : « Les enfants a gagné. »', 'Les enfants ont gagné.', 'Les enfants à gagné.', 'Les enfants on gagné.', 'Les enfants ont gagnés.', ex='Ils avaient gagné : ont.'),
        Q('Quel mot est mal écrit ?', 'boucoup', 'toujours', 'maintenant', 'souvent', ex='On écrit « beaucoup ».'),
        O('Remets les étapes de relecture dans l’ordre proposé.', ['Je relis le sens du texte', 'Je vérifie les majuscules et la ponctuation', 'Je vérifie les accords', 'Je vérifie les mots difficiles'], ex='Du sens vers les détails.'),
    ])
    lesson(T(22), 'Explorer familles, préfixes, suffixes et réseaux de sens', 'Une famille de mots partage un radical : terre, terrain, enterrer. Le préfixe se place avant le radical (re-faire, im-possible), le suffixe après (jardin-ier, rapide-ment).', [
        Q('Quel est le préfixe de « défaire » ?', 'dé-', 'faire', '-re', 'déf-', ex='dé- + faire.'),
        Q('Quel est le suffixe de « boulanger » ?', '-er', 'boul-', 'bou-', '-lang', ex='boulange + -er (le métier).'),
        Q('Que veut dire le préfixe « im- » dans « impossible » ?', 'le contraire', 'encore', 'avant', 'petit', ex='Impossible : pas possible.'),
        Q('Que veut dire « re- » dans « relire » ?', 'à nouveau', 'le contraire', 'très', 'mal', ex='Lire de nouveau.'),
        Q('Quel mot n’est pas de la même famille ?', 'terrible', 'terrain', 'terrasse', 'enterrer', ex='« terrible » vient de « terreur ».'),
        M('Associe chaque mot à son suffixe.', [('lentement', '-ment'), ('fillette', '-ette'), ('chanteur', '-eur')], ex='Le suffixe change le sens ou la classe.'),
        Q('Quel suffixe forme un nom de métier ?', '-ier (pâtissier)', '-ment (doucement)', '-ette (maisonnette)', '-able (lavable)', ex='-ier, -eur, -er.'),
        Q('Mer, vague, plage, sable, coquillage forment…', 'un réseau de mots sur le thème de la mer', 'une famille de mots', 'des synonymes', 'des antonymes', ex='Même thème, radicaux différents.'),
    ])
    lesson(T(23), 'Interpréter polysémie, sens propre et figuré', 'Un mot polysémique a plusieurs sens : une « feuille » d’arbre, une « feuille » de papier. Le sens propre est le sens premier ; le sens figuré est une image : « avoir un cœur de pierre ».', [
        Q('« Il a un cœur de pierre » signifie…', 'il est insensible', 'son cœur est malade', 'il aime les cailloux', 'il est très fort', ex='Sens figuré.'),
        Q('Dans quelle phrase « tête » est au sens propre ?', 'Il s’est cogné la tête.', 'Elle est en tête de la course.', 'Il n’en fait qu’à sa tête.', 'Elle a la tête dans les nuages.', ex='La partie du corps.'),
        Q('« Une souris » d’ordinateur : c’est…', 'un autre sens du même mot', 'un animal', 'une erreur', 'un synonyme de chat', ex='Polysémie.'),
        Q('« Tomber dans les pommes » veut dire…', 's’évanouir', 'cueillir des pommes', 'tomber d’un arbre', 'manger trop', ex='Expression figurée.'),
        Q('Dans quelle phrase « glace » veut dire « miroir » ?', 'Elle se regarde dans la glace.', 'Je mange une glace.', 'La glace fond au soleil.', 'Il patine sur la glace.', ex='Le contexte donne le sens.'),
        M('Associe chaque expression à son sens.', [('Avoir la pêche', 'être en forme'), ('Poser un lapin', 'ne pas venir au rendez-vous'), ('Coûter les yeux de la tête', 'coûter très cher')], ex='Expressions figurées.'),
        Q('Comment trouver le bon sens d’un mot polysémique ?', 'Grâce au contexte de la phrase', 'En prenant toujours le premier sens', 'En comptant ses lettres', 'C’est impossible', ex='Le contexte éclaire le sens.'),
        Q('« Une pluie de questions » : « pluie » est au sens…', 'figuré', 'propre', 'scientifique', 'interdit', ex='Beaucoup de questions, comme des gouttes.'),
    ])
    lesson(T(24), 'Utiliser le dictionnaire et réemployer un lexique précis', 'Dans le dictionnaire, les mots sont rangés dans l’ordre alphabétique. Un article donne la classe du mot (n., v., adj.), ses différents sens et des exemples. Employer le mot juste rend un texte plus précis.', [
        O('Range ces mots dans l’ordre alphabétique.', ['balance', 'baleine', 'ballon', 'banane'], ex='On compare lettre par lettre : bala, bale, ball, bana.'),
        Q('Que signifie « n. m. » dans un dictionnaire ?', 'nom masculin', 'nombre moyen', 'nom de métier', 'nouveau mot', ex='Abréviation de la classe et du genre.'),
        Q('Quel mot vient en premier dans le dictionnaire ?', 'carton', 'cartable', 'carte', 'carton-pâte', ex='cartab < carte < carton.'),
        Q('Un mot plus précis que « dire » pour une question ?', 'demander', 'parler', 'faire', 'voir', ex='On demande quand on pose une question.'),
        Q('Un mot plus précis que « faire » dans « faire un gâteau » ?', 'préparer', 'mettre', 'avoir', 'donner', ex='Préparer un gâteau.'),
        Q('Un synonyme précis de « marcher lentement » ?', 'flâner', 'galoper', 'bondir', 'sprinter', ex='Flâner : marcher sans se presser.'),
        M('Remplace « mettre » par le verbe précis.', [('mettre un manteau', 'enfiler'), ('mettre la table', 'dresser'), ('mettre une lettre à la poste', 'poster')], ex='Verbes précis.'),
        Q('Les mots-repères en haut des pages du dictionnaire indiquent…', 'le premier et le dernier mot de la page', 'les mots difficiles', 'les synonymes', 'le numéro du chapitre', ex='Ils aident à chercher vite.'),
    ])
    lesson(T(25), 'Écrire à la main et copier efficacement', 'Pour copier efficacement, on lit un groupe de mots, on le mémorise, on l’écrit sans regarder, puis on vérifie. On copie par groupes de sens plutôt que lettre par lettre.', [
        Q('Quelle méthode de copie est la plus efficace ?', 'Mémoriser un groupe de mots, l’écrire, puis vérifier', 'Copier lettre par lettre', 'Copier sans relire', 'Copier le plus vite possible', ex='On copie par groupes de sens.'),
        Q('Après avoir copié, il faut…', 'comparer avec le modèle', 'jeter le modèle', 'recommencer sans regarder', 'souligner tout', ex='La vérification évite les erreurs.'),
        Q('Quelle posture aide à bien écrire ?', 'Dos droit, feuille légèrement inclinée', 'Allongé sur la table', 'Debout sur une chaise', 'Les yeux fermés', ex='Une bonne posture aide le geste.'),
        O('Remets dans l’ordre.', ['Je lis la phrase', 'Je mémorise un groupe de mots', 'J’écris sans regarder', 'Je vérifie'], ex='Méthode de copie.'),
        Q('Pourquoi copier par groupes de sens ?', 'On fait moins d’erreurs et on va plus vite', 'C’est plus joli', 'C’est obligatoire', 'Pour user le crayon', ex='Le sens aide la mémoire.'),
        Q('Écrire lisiblement sert à…', 'être compris par le lecteur', 'gagner du temps seulement', 'faire des dessins', 'rien', ex='Un écrit est fait pour être lu.'),
        Q('Quel groupe de mots est un bon « morceau » à mémoriser ?', '« le petit chat gris »', '« le pe »', '« tit ch »', '« gris. Le »', ex='Un groupe qui a du sens.'),
        Q('Combien de fois regarder le modèle par groupe de mots, idéalement ?', 'Une fois, puis on vérifie', 'À chaque lettre', 'Jamais', 'Dix fois', ex='Mémoriser puis vérifier.'),
    ], adult='Avec un adulte, copie deux phrases d’un livre par groupes de mots, puis vérifiez ensemble. Le geste d’écriture se travaille sur papier.')
    lesson(T(26), 'Planifier puis rédiger récits et descriptions', 'Avant d’écrire, on prépare : qui ? où ? quand ? quel problème ? comment cela finit-il ? Pour décrire, on va du général au détail et on utilise des adjectifs et des comparaisons.', [
        O('Remets les étapes d’un récit dans l’ordre.', ['Situation de départ', 'Élément perturbateur', 'Péripéties', 'Résolution', 'Situation finale'], ex='Le schéma narratif.'),
        Q('Que faut-il préparer avant d’écrire un récit ?', 'Les personnages, le lieu et le problème', 'Uniquement le titre', 'Le nombre de mots', 'Rien', ex='Un plan aide à écrire.'),
        Q('« Soudain, un bruit retentit » marque souvent…', 'l’élément perturbateur', 'la situation finale', 'le titre', 'la morale', ex='« Soudain » annonce un changement.'),
        Q('Pour décrire un personnage, on peut parler de…', 'son apparence et son caractère', 'seulement son prénom', 'le temps qu’il fait', 'la date', ex='Portrait physique et moral.'),
        Q('Quel connecteur marque la fin d’un récit ?', 'Finalement', 'Il était une fois', 'Soudain', 'D’abord', ex='« Finalement » conclut.'),
        Q('Quelle description est la plus précise ?', 'Une vieille maison aux volets bleus écaillés', 'Une maison', 'Une jolie maison', 'Une maison comme ça', ex='Adjectifs et détails précis.'),
        M('Associe chaque connecteur à son rôle.', [('D’abord', 'début'), ('Ensuite', 'suite'), ('Enfin', 'fin')], ex='Ils organisent le récit.'),
        Q('Pourquoi varier les verbes dans un récit ?', 'Pour être plus précis et éviter les répétitions', 'Pour faire plus de fautes', 'Pour allonger sans raison', 'Ce n’est pas utile', ex='Le récit devient plus vivant.'),
    ])
    lesson(T(27), 'Produire des écrits documentaires et des écrits de travail', 'Un écrit documentaire informe : il a un titre, des sous-titres, des faits précis, parfois des illustrations avec légende. Les écrits de travail (listes, schémas, résumés) aident à apprendre.', [
        Q('Que trouve-t-on dans un écrit documentaire ?', 'Un titre, des sous-titres et des informations vraies', 'Un dialogue de conte', 'Des rimes', 'Une morale', ex='Il informe.'),
        Q('À quoi servent les sous-titres ?', 'À organiser les informations', 'À décorer', 'À raconter une histoire', 'À rien', ex='Chaque partie a un thème.'),
        Q('Un schéma avec des flèches et des légendes est…', 'un écrit de travail utile pour apprendre', 'un poème', 'un roman', 'une bande dessinée', ex='Il résume visuellement.'),
        Q('Quel temps utilise-t-on surtout dans un documentaire ?', 'le présent', 'le passé simple', 'le futur', 'l’impératif', ex='Le présent de vérité générale.'),
        Q('Quelle phrase convient à un documentaire sur le chat ?', 'Le chat dort jusqu’à 16 heures par jour.', 'Il était une fois un chat.', 'Mon chat est le plus beau du monde !', 'Miaou, dit le chat en riant.', ex='Une information vérifiable.'),
        Q('Pour trouver des informations fiables, on consulte…', 'des documentaires ou sites reconnus', 'n’importe quelle rumeur', 'un roman de science-fiction', 'un rêve', ex='On vérifie ses sources.'),
        O('Remets dans l’ordre la fabrication d’une fiche documentaire.', ['Choisir le sujet', 'Chercher des informations', 'Trier et organiser', 'Rédiger et illustrer'], ex='Étapes d’un écrit documentaire.'),
        Q('Une liste de mots-clés sert à…', 'retenir l’essentiel', 'remplacer le texte entier', 'faire une rime', 'compter les lettres', ex='Écrit de travail.'),
    ])
    lesson(T(28), 'Réviser la cohérence et la langue', 'Réviser un texte, c’est l’améliorer : vérifier qu’il a du sens, que les personnages sont bien repris (il, elle, le garçon), qu’on ne répète pas trop les mêmes mots, et corriger l’orthographe.', [
        Q('Comment éviter de répéter « Lucas » ?', 'Utiliser « il », « le garçon », « mon ami »', 'Écrire Lucas plus gros', 'Supprimer toutes les phrases', 'Changer de prénom à chaque fois', ex='Les reprises évitent la répétition.'),
        Q('Quelle phrase est incohérente ?', 'Il faisait nuit noire et le soleil brillait.', 'Il faisait nuit et la lune brillait.', 'Il pleuvait, il prit son parapluie.', 'Elle avait faim, elle mangea.', ex='Nuit noire et soleil : contradiction.'),
        Q('Pour améliorer « Il a fait un dessin », on peut écrire…', 'Il a dessiné un dragon multicolore.', 'Il a fait fait un dessin.', 'Il dessin.', 'Dessin il a.', ex='Verbe plus précis et détails.'),
        Q('Que vérifier pour la cohérence des temps ?', 'Garder les mêmes temps dans le récit', 'Changer de temps à chaque phrase', 'Tout mettre au futur', 'Ne rien vérifier', ex='Passé simple et imparfait vont ensemble dans un récit.'),
        Q('Dans « Le chien courut. Il aboyait. », « Il » reprend…', 'le chien', 'un autre chien', 'le lecteur', 'personne', ex='Reprise pronominale.'),
        Q('Quel mot remplace bien « et puis » répété ?', 'ensuite', 'et puis encore', 'puis puis', 'donc donc', ex='Varier les connecteurs.'),
        Q('Réviser un texte, c’est…', 'l’améliorer et le corriger', 'le recopier sans changer', 'le jeter', 'l’apprendre par cœur', ex='On le rend meilleur.'),
        Q('Quel outil aide à corriger l’orthographe ?', 'le dictionnaire', 'la gomme seulement', 'la calculatrice', 'le compas', ex='Pour vérifier un mot.'),
    ])
    ORAL = 'Bonjour à tous ! Pour la fête de l’école, samedi 14 juin, nous avons besoin de volontaires pour tenir le stand de crêpes de 10 heures à midi. Inscrivez-vous auprès de madame Diallo avant vendredi. N’oubliez pas d’apporter un tablier !'
    lesson(T(29), 'Comprendre et reformuler une écoute', 'Pour comprendre un message oral, on écoute les informations clés : qui ? quoi ? quand ? où ? Reformuler, c’est redire avec ses propres mots l’essentiel du message.', [
        Q('De quel événement parle le message ?', 'La fête de l’école', 'Un match de foot', 'Une sortie au musée', 'Un anniversaire', ex='« Pour la fête de l’école ».', passage=ORAL),
        Q('Quand a lieu la fête ?', 'Samedi 14 juin', 'Vendredi', 'Dimanche 15 juin', 'Lundi', ex='« samedi 14 juin ».', passage=ORAL),
        Q('Auprès de qui faut-il s’inscrire ?', 'Madame Diallo', 'Le directeur', 'Les parents', 'Personne', ex='« auprès de madame Diallo ».', passage=ORAL),
        Q('Que faut-il apporter ?', 'Un tablier', 'Des crêpes', 'Un ballon', 'De la farine', ex='« N’oubliez pas d’apporter un tablier ».', passage=ORAL),
        Q('Quelle reformulation est juste ?', 'On cherche des volontaires pour le stand de crêpes samedi matin.', 'La fête est annulée.', 'Il faut acheter des crêpes vendredi.', 'Madame Diallo vend des tabliers.', ex='C’est l’essentiel du message.', passage=ORAL),
        N('Combien d’heures dure le service au stand ?', 2, ex='De 10 h à midi : 2 heures.'),
        Q('Avant quand faut-il s’inscrire ?', 'Avant vendredi', 'Avant samedi soir', 'Avant lundi', 'Après la fête', ex='« avant vendredi ».', passage=ORAL),
        Q('Pour bien écouter, il faut…', 'repérer qui, quoi, quand, où', 'tout noter mot à mot', 'parler en même temps', 'regarder ailleurs', ex='On cherche les informations clés.'),
    ], adult='Faites écouter un court message (radio, annonce) puis demandez à l’enfant de le reformuler avec ses mots.')
    lesson(T(30), 'Présenter, raconter et réciter', 'Pour présenter à l’oral, on prépare un plan, on parle fort et distinctement, on regarde son public et on s’aide de notes courtes plutôt que d’un texte entier.', [
        Q('Que faut-il faire en présentant à l’oral ?', 'Regarder le public', 'Lire sa feuille sans lever les yeux', 'Parler très vite', 'Chuchoter', ex='Le regard capte l’attention.'),
        Q('Quelles notes sont les plus utiles ?', 'Des mots-clés', 'Le texte entier', 'Aucune note', 'Un dessin sans rapport', ex='Les mots-clés guident sans enfermer.'),
        O('Remets dans l’ordre un exposé.', ['Présenter le sujet', 'Développer les parties', 'Conclure', 'Répondre aux questions'], ex='Plan d’un exposé.'),
        Q('Pour réciter un poème, on…', 'respecte les pauses et le ton', 'le lit à toute vitesse', 'change les mots', 'tourne le dos au public', ex='On le met en voix.'),
        Q('Raconter une histoire à l’oral, c’est…', 'utiliser des connecteurs et varier sa voix', 'réciter une liste', 'lire le sommaire', 'ne rien préparer', ex='On captive l’auditoire.'),
        Q('Si on oublie un passage en récitant…', 'on reprend calmement', 'on s’enfuit', 'on invente n’importe quoi', 'on arrête tout', ex='Garder son calme.'),
        Q('Le volume de la voix doit être…', 'assez fort pour que tous entendent', 'très faible', 'un cri', 'variable sans raison', ex='Tout le monde doit entendre.'),
        Q('Pour mémoriser un texte, il vaut mieux…', 'l’apprendre petit à petit et le répéter', 'le lire une seule fois', 'le recopier sans le lire', 'attendre le dernier moment', ex='La répétition aide la mémoire.'),
    ], adult='L’enfant présente à l’oral un sujet de son choix pendant deux minutes. L’oral se pratique devant quelqu’un.')
    lesson(T(31), 'Participer à un débat et justifier une réponse', 'Dans un débat, chacun donne son avis et le justifie avec des arguments : « Je pense que… parce que… ». On écoute les autres, on ne coupe pas la parole, on peut changer d’avis.', [
        Q('Pour justifier un avis, on utilise…', '« parce que »', '« et puis voilà »', '« c’est comme ça »', '« n’importe quoi »', ex='On donne une raison.'),
        Q('Que fait-on quand un camarade parle ?', 'On l’écoute jusqu’au bout', 'On lui coupe la parole', 'On parle plus fort', 'On sort de la classe', ex='Respect de la parole.'),
        Q('Quel est un argument ?', '« Il faut recycler car cela protège la nature. »', '« Le recyclage. »', '« Bof. »', '« Parce que. »', ex='Une idée + une raison.'),
        Q('On peut changer d’avis dans un débat ?', 'Oui, si un argument nous convainc', 'Non, jamais', 'Seulement le maître', 'Seulement à la fin de l’année', ex='C’est le but d’un débat.'),
        Q('Quelle phrase est respectueuse ?', '« Je ne suis pas d’accord avec toi, car… »', '« Tu dis n’importe quoi ! »', '« Tais-toi ! »', '« C’est nul ! »', ex='On critique l’idée, pas la personne.'),
        Q('Le rôle du « président de séance » est de…', 'distribuer la parole', 'gagner le débat', 'décider qui a raison', 'se taire', ex='Il organise les échanges.'),
        M('Associe chaque formule à son usage.', [('Je pense que…', 'donner son avis'), ('Je suis d’accord avec…', 'approuver'), ('Au contraire…', 's’opposer')], ex='Formules du débat.'),
        Q('Un bon argument s’appuie sur…', 'un fait ou un exemple', 'une insulte', 'un cri', 'rien', ex='Il doit convaincre.'),
    ])
