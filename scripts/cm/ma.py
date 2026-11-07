from dsl import Q, N, M, O, F, lesson, fmt, _rng

def words_small(n):
    U = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize']
    T = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']
    if n <= 16: return U[n]
    if n < 20: return 'dix-' + U[n-10]
    t, u = divmod(n, 10)
    if t in (7, 9): return T[t] + (' et ' if t == 7 and u == 1 else '-') + words_small(10 + u)
    if u == 0: return 'quatre-vingts' if t == 8 else T[t]
    if u == 1 and t != 8: return T[t] + ' et un'
    return T[t] + '-' + U[u]
def words(n):
    if n < 100: return words_small(n)
    if n < 1000:
        c, r = divmod(n, 100)
        cs = 'cent' if c == 1 else words_small(c) + ' cent' + ('s' if r == 0 else '')
        return cs + (' ' + words_small(r) if r else '')
    if n < 1_000_000:
        m, r = divmod(n, 1000)
        ms = 'mille' if m == 1 else words(m).replace('cents', 'cent') + ' mille'
        return ms + (' ' + words(r) if r else '')
    mi, r = divmod(n, 1_000_000)
    return words(mi) + ' million' + ('s' if mi > 1 else '') + (' ' + words(r) if r else '')

def distinct(*xs):
    out = []
    for x in xs:
        if x not in out: out.append(x)
    return out

def cm_math(lv):
    big = lv == 'cm2'
    T = lambda n: f'{lv}-ma-{n:02d}'
    r = _rng(lv + 'ma')

    # ---------- Nombres entiers ----------
    a = r.randint(120_000, 989_999) if not big else r.randint(12_000_000, 989_999_999)
    b = r.randint(10_000, 99_999) if not big else r.randint(1_000_000, 9_999_999)
    n3 = 305_040 if not big else 45_300_070
    lesson(T(1), 'Lire et représenter les nombres jusqu’à 999 999' if not big else 'Lire et décomposer les grands nombres',
           ('Un grand nombre se lit par classes de trois chiffres : la classe des mille, puis celle des unités. 254 108 se lit « deux cent cinquante-quatre mille cent huit ».' if not big else
            'Les grands nombres se lisent par classes de trois chiffres : millions, mille, unités. 45 300 070 se lit « quarante-cinq millions trois cent mille soixante-dix ».'), [
        Q(f'Comment s’écrit « {words(n3)} » ?', fmt(n3), fmt(n3 + 9 * (10 ** (2 if not big else 4))), fmt(int(str(n3).replace('0', '', 1) or 0)), fmt(n3 * 10), ex=f'On écrit chaque classe : {fmt(n3)}. Les zéros gardent la place des rangs vides.'),
        Q('Quel est le chiffre des dizaines de mille dans 476 302 ?' if not big else 'Quel est le chiffre des millions dans 538 214 096 ?', *(['7', '4', '6', '3'] if not big else ['8', '5', '3', '2']), ex='On compte les rangs depuis la droite : unités, dizaines, centaines, puis la classe des mille, puis celle des millions.'),
        N(f'Écris en chiffres : {words(b)}.', b, ex=f'{words(b)} s’écrit {fmt(b)}.'),
        F('Complète la décomposition.', (f'{fmt(254_108)} = {{{{a}}}} + {{{{b}}}} + 100 + 8' if not big else f'{fmt(7_040_300)} = {{{{a}}}} + {{{{b}}}} + 300'),
          ({'a': '200000', 'b': '54000'} if not big else {'a': '7000000', 'b': '40000'}), ex=('254 108 = 200 000 + 54 000 + 100 + 8.' if not big else '7 040 300 = 7 000 000 + 40 000 + 300.'), num=True),
        N('Combien y a-t-il de milliers dans 63 500 ?' if not big else 'Combien y a-t-il de milliers dans 4 250 000 ?', 63 if not big else 4250, ex=('63 500 = 63 milliers et 500.' if not big else '4 250 000 = 4 250 milliers.')),
        Q('Quel nombre est le plus proche de 500 000 ?' if not big else 'Quel nombre est le plus proche de 50 millions ?', *(['499 870', '510 000', '450 000', '600 000'] if not big else ['49 800 000', '52 000 000', '45 000 000', '60 000 000']), ex='On calcule l’écart avec le nombre visé : le plus petit écart gagne.'),
        M('Associe chaque nombre à son écriture en lettres.', ([('90 000', 'quatre-vingt-dix mille'), ('19 000', 'dix-neuf mille'), ('9 100', 'neuf mille cent')] if not big else [('3 000 000', 'trois millions'), ('300 000', 'trois cent mille'), ('30 000 000', 'trente millions')]), ex='On lit d’abord la classe la plus élevée.'),
        N('Quel nombre vient juste après ' + ('99 999 ?' if not big else '999 999 ?'), 100_000 if not big else 1_000_000, ex=('99 999 + 1 = 100 000 (cent mille).' if not big else '999 999 + 1 = 1 000 000 (un million).')),
    ])
    c1, c2 = (r.randint(300_000, 400_000), r.randint(300_000, 400_000)) if not big else (r.randint(70_000_000, 80_000_000), r.randint(70_000_000, 80_000_000))
    lesson(T(2), 'Comparer, encadrer et décomposer' if not big else 'Comparer, encadrer et placer de grands nombres',
           'Pour comparer deux nombres, on compte d’abord leurs chiffres. S’ils en ont autant, on compare chiffre par chiffre en partant de la gauche. Encadrer, c’est trouver le nombre juste avant et juste après à un rang donné.', [
        Q(f'Quel signe compléter : {fmt(c1)} … {fmt(c2)} ?', '<' if c1 < c2 else '>' if c1 > c2 else '=', *[s for s in ['<', '>', '='] if s != ('<' if c1 < c2 else '>' if c1 > c2 else '=')], ex='On compare les chiffres de gauche à droite jusqu’au premier qui diffère.'),
        O('Range du plus petit au plus grand.', ([fmt(98_700), fmt(124_500), fmt(142_050), fmt(421_000)] if not big else [fmt(9_870_000), fmt(12_450_000), fmt(14_205_000), fmt(42_100_000)]), ex='Le nombre qui a le moins de chiffres est le plus petit ; ensuite on compare chiffre par chiffre.'),
        F('Encadre à la dizaine de mille près.' if not big else 'Encadre au million près.', ('{{a}} < 347 820 < {{b}}' if not big else '{{a}} < 63 480 000 < {{b}}'), ({'a': '340000', 'b': '350000'} if not big else {'a': '63000000', 'b': '64000000'}), ex='On garde les chiffres jusqu’au rang demandé, puis on ajoute 1 à ce rang.', num=True),
        Q('Quel nombre est compris entre 450 000 et 460 000 ?' if not big else 'Quel nombre est compris entre 7 millions et 8 millions ?', *(['455 300', '465 000', '45 500', '540 000'] if not big else ['7 450 000', '8 100 000', '745 000', '70 450 000']), ex='Il doit être plus grand que la première borne et plus petit que la seconde.'),
        N('Arrondis 38 760 au millier le plus proche.' if not big else 'Arrondis 26 480 000 au million le plus proche.', 39_000 if not big else 26_000_000, ex=('38 760 est plus près de 39 000 que de 38 000.' if not big else '26 480 000 est plus près de 26 millions que de 27 millions.')),
        F('Complète.', ('500 000 + 20 000 + 7 000 + 40 = {{a}}' if not big else '6 000 000 + 400 000 + 9 000 + 80 = {{a}}'), {'a': '527040' if not big else '6409080'}, ex='On place chaque morceau à son rang, avec des zéros pour les rangs vides.', num=True),
        Q('Sur une droite graduée de 0 à 1 000 000, où se trouve 500 000 ?' if not big else 'Sur une droite graduée de 0 à 100 millions, où se trouve 25 millions ?', *(['Au milieu', 'Tout au début', 'Tout à la fin', 'Aux trois quarts'] if not big else ['Au premier quart', 'Au milieu', 'Tout à la fin', 'Aux trois quarts']), ex=('500 000 est la moitié d’un million.' if not big else '25 millions est le quart de 100 millions.')),
        N('Quel est le plus grand nombre à six chiffres ?' if not big else 'Quel est le plus petit nombre à neuf chiffres ?', 999_999 if not big else 100_000_000, ex=('999 999 : six fois le chiffre 9.' if not big else '100 000 000 : cent millions.')),
    ])
    lesson(T(3), 'Multiples et divisibilité par 2, 5 et 10' if not big else 'Multiples, diviseurs et critères de divisibilité',
           ('Un nombre est divisible par 2 s’il se termine par 0, 2, 4, 6 ou 8 ; par 5 s’il se termine par 0 ou 5 ; par 10 s’il se termine par 0. Les multiples de 4 sont 4, 8, 12, 16…' if not big else
            'Divisible par 2 : se termine par 0, 2, 4, 6, 8. Par 5 : se termine par 0 ou 5. Par 10 : se termine par 0. Par 3 : la somme des chiffres est un multiple de 3. Par 9 : la somme des chiffres est un multiple de 9.'), [
        Q('Quel nombre est divisible par 5 ?', '345', '342', '351', '1 003', ex='Il se termine par 5.'),
        Q('Quel nombre est divisible par 2 et par 5 ?', '1 280', '1 285', '1 282', '1 287', ex='Divisible par 2 et par 5, c’est divisible par 10 : il se termine par 0.'),
        Q('Lequel est un multiple de 6 ?', '42', '32', '26', '45', ex='42 = 6 × 7.'),
        N('Quel est le plus petit multiple commun à 4 et 6 ?' if not big else 'Combien vaut la somme des chiffres de 7 245 ?', 12 if not big else 18, ex=('Multiples de 4 : 4, 8, 12… ; multiples de 6 : 6, 12… Le premier commun est 12.' if not big else '7 + 2 + 4 + 5 = 18.')),
        Q('Quel nombre est divisible par 3 ?' if big else 'Quel nombre n’est PAS divisible par 2 ?', *(['7 245', '7 246', '7 241', '7 249'] if big else ['137', '136', '310', '98']), ex=('7 + 2 + 4 + 5 = 18, multiple de 3.' if big else '137 se termine par 7 : il est impair.')),
        M('Associe chaque nombre à un de ses diviseurs.', [('49', '7'), ('64', '8'), ('81', '9')], ex='49 = 7 × 7 ; 64 = 8 × 8 ; 81 = 9 × 9.'),
        Q('« 24 est un multiple de 8 » veut dire…', '24 est dans la table de 8', '8 est dans la table de 24', '24 + 8 = 32', '24 se termine par 8', ex='24 = 8 × 3.'),
        N('Combien de multiples de 10 y a-t-il entre 1 et 100 (100 compris) ?', 10, ex='10, 20, 30, … 100 : il y en a 10.'),
    ])

    # ---------- Fractions et décimaux ----------
    lesson(T(4), 'Placer des fractions sur une droite graduée' if not big else 'Comparer, encadrer et calculer avec des fractions',
           ('Une fraction peut se placer sur une droite : pour 3/4, on partage l’unité en 4 parts égales et on compte 3 parts depuis 0. Si le numérateur dépasse le dénominateur, la fraction est plus grande que 1.' if not big else
            'Une fraction est plus grande que 1 si son numérateur dépasse son dénominateur. Avec le même dénominateur, on compare les numérateurs. 7/4 = 1 + 3/4 : elle est comprise entre 1 et 2.'), [
        Q('Sur une droite où l’unité est partagée en 4, où est 3/4 ?', 'À 3 graduations de 0', 'À 4 graduations de 0', 'Après 1', 'À 1 graduation de 0', ex='Chaque graduation vaut 1/4 ; 3/4, c’est 3 graduations.'),
        Q('Quelle fraction est plus grande que 1 ?', '5/4', '3/4', '4/5', '1/2', ex='5/4 : 5 parts de quart, c’est plus qu’une unité (4/4).'),
        F('Complète : 7/4 = 1 + …', '7/4 = 1 + {{a}}/4', {'a': '3'}, ex='4/4 = 1, il reste 3/4.'),
        Q('Entre quels entiers se trouve 9/4 ?', 'Entre 2 et 3', 'Entre 1 et 2', 'Entre 3 et 4', 'Entre 0 et 1', ex='8/4 = 2 et 12/4 = 3.'),
        Q('Quelle fraction est égale à 1 ?', '6/6', '6/1', '1/6', '5/6', ex='6 parts de sixième font une unité.'),
        O('Range du plus petit au plus grand.', ['1/5', '3/5', '4/5', '7/5'], ex='Même dénominateur : on compare les numérateurs.'),
        Q('Une droite va de 0 à 1 avec 10 graduations. Que vaut la 7e ?', '7/10', '1/7', '7/1', '10/7', ex='Chaque graduation vaut un dixième.'),
        N('Combien de quarts faut-il pour faire 2 unités ?', 8, ex='2 = 8/4.'),
    ])
    lesson(T(5), 'Comparer et calculer avec des fractions' if not big else 'Calculer une fraction d’une quantité',
           ('Avec le même dénominateur, on additionne les numérateurs : 2/5 + 1/5 = 3/5. Pour comparer deux fractions de même dénominateur, on compare les numérateurs.' if not big else
            'Pour prendre les 3/4 de 20, on partage 20 en 4 parts égales (5), puis on en prend 3 : 15. On divise par le dénominateur, puis on multiplie par le numérateur.'), [
        F('Calcule.', '2/7 + 3/7 = {{a}}/7', {'a': '5'}, ex='On additionne les septièmes : 2 + 3 = 5.'),
        F('Calcule.', '9/10 − 4/10 = {{a}}/10', {'a': '5'}, ex='9 − 4 = 5 dixièmes.'),
        Q('Quelle fraction est la plus grande ?', '5/8', '3/8', '1/8', '4/8', ex='Même dénominateur : 5 est le plus grand numérateur.'),
        N('Combien font la moitié de 36 ?' if not big else 'Combien font les 3/4 de 20 ?', 18 if not big else 15, ex=('36 ÷ 2 = 18.' if not big else '20 ÷ 4 = 5, puis 5 × 3 = 15.')),
        N('Combien font le quart de 28 ?' if not big else 'Combien font les 2/3 de 30 ?', 7 if not big else 20, ex=('28 ÷ 4 = 7.' if not big else '30 ÷ 3 = 10, puis 10 × 2 = 20.')),
        Q('Que vaut 1/2 + 1/4 ?', '3/4', '2/6', '2/4', '1/6', ex='1/2 = 2/4, et 2/4 + 1/4 = 3/4.'),
        Q('Quelle fraction est égale à 1/2 ?', '4/8', '2/8', '1/4', '3/4', ex='4/8 : 4 parts sur 8, c’est la moitié.'),
        N('Une tablette a 24 carreaux. Léo en mange 1/3. Combien de carreaux ?' if not big else 'Une classe de 28 élèves : 3/7 sont des filles. Combien de filles ?', 8 if not big else 12, ex=('24 ÷ 3 = 8.' if not big else '28 ÷ 7 = 4, puis 4 × 3 = 12.')),
    ])
    lesson(T(6), 'Relier dixièmes, centièmes et écriture à virgule' if not big else 'Lire et représenter les décimaux jusqu’aux millièmes',
           ('Un dixième (1/10) s’écrit 0,1 ; un centième (1/100) s’écrit 0,01. Dans 3,45 : 3 unités, 4 dixièmes et 5 centièmes. La virgule sépare la partie entière de la partie décimale.' if not big else
            'Dans 2,357 : 2 unités, 3 dixièmes, 5 centièmes et 7 millièmes. Un millième (1/1000) s’écrit 0,001.'), [
        Q('Comment s’écrit 7/10 avec une virgule ?', '0,7', '7,0', '0,07', '7,10', ex='7 dixièmes : 0,7.'),
        Q('Comment s’écrit 35/100 ?', '0,35', '3,5', '35,0', '0,035', ex='35 centièmes : 0,35.'),
        Q('Quel est le chiffre des centièmes dans 12,48 ?' if not big else 'Quel est le chiffre des millièmes dans 4,826 ?', *(['8', '4', '2', '1'] if not big else ['6', '2', '8', '4']), ex=('Après la virgule : dixièmes (4), centièmes (8).' if not big else 'Après la virgule : dixièmes 8, centièmes 2, millièmes 6.')),
        F('Complète.', ('3,45 = 3 + {{a}}/10 + {{b}}/100' if not big else '2,357 = 2 + {{a}}/10 + {{b}}/100 + {{c}}/1000'), ({'a': '4', 'b': '5'} if not big else {'a': '3', 'b': '5', 'c': '7'}), ex='Chaque chiffre après la virgule a son rang.', num=True),
        Q('« Deux unités et six centièmes » s’écrit…', '2,06', '2,6', '2,60', '26,0', ex='Pas de dixième : on écrit 0 au rang des dixièmes.'),
        M('Associe chaque écriture.', [('1/10', '0,1'), ('1/100', '0,01'), ('1/1000', '0,001')] if big else [('4/10', '0,4'), ('4/100', '0,04'), ('40/100', '0,40 (soit 0,4)')], ex='Le nombre de zéros du dénominateur donne le nombre de chiffres après la virgule.'),
        N('Combien de centièmes dans 1 unité ?', 100, ex='1 = 100/100.'),
        Q('Quel nombre vaut 15 dixièmes ?', '1,5', '0,15', '15,0', '0,015', ex='15/10 = 1 unité et 5 dixièmes.'),
    ])
    lesson(T(7), 'Comparer, ranger et placer des décimaux' if not big else 'Passer d’une fraction décimale à une écriture à virgule',
           ('Pour comparer deux décimaux, on compare d’abord la partie entière, puis les dixièmes, puis les centièmes. 2,5 > 2,45 car 5 dixièmes > 4 dixièmes. Attention : 2,5 = 2,50.' if not big else
            '327/100 = 3,27 : on divise par 100 en déplaçant les chiffres de deux rangs. 45/1000 = 0,045. Inversement, 1,8 = 18/10.'), [
        Q('Quel nombre est le plus grand ?', '2,5', '2,45', '2,09', '2,4', ex='On compare les dixièmes : 5 est le plus grand.'),
        O('Range du plus petit au plus grand.', ['1,07', '1,3', '1,35', '1,5'], ex='Compare les dixièmes, puis les centièmes.'),
        Q('Quel nombre est égal à 4,7 ?', '4,70', '4,07', '47', '0,47', ex='Ajouter un zéro à la fin de la partie décimale ne change rien.'),
        Q(*(['Quel nombre est entre 3,1 et 3,2 ?', '3,15', '3,25', '3,01', '31,5'] if not big else ['Comment s’écrit 327/100 ?', '3,27', '32,7', '0,327', '327,0']), ex=('3,15 est plus grand que 3,10 et plus petit que 3,20.' if not big else '327 centièmes = 3 unités et 27 centièmes.')),
        Q(*(['Sur une droite de 0 à 1 graduée en dixièmes, où est 0,6 ?', 'À la 6e graduation', 'À la 60e graduation', 'Au début', 'Après 1'] if not big else ['Comment s’écrit 45/1000 ?', '0,045', '0,45', '4,5', '45,0']), ex=('Chaque graduation vaut 0,1.' if not big else '45 millièmes : 0,045.')),
        F('Écris la fraction décimale.', ('2,3 = {{a}}/10' if not big else '1,08 = {{a}}/100'), {'a': '23' if not big else '108'}, ex=('2,3 = 23 dixièmes.' if not big else '1,08 = 108 centièmes.'), num=True),
        Q('Quel nombre est le plus petit ?', '0,099', '0,1', '0,11', '0,9', ex='0,099 a 0 dixième : il est le plus petit.'),
        N('Combien y a-t-il de dixièmes dans 3,6 ?', 36, ex='3,6 = 36 dixièmes.'),
    ])
    if big:
        lesson(T(8), 'Comparer, placer et arrondir à l’entier', 'Arrondir à l’unité, c’est trouver l’entier le plus proche : 4,6 s’arrondit à 5 ; 4,3 à 4. On regarde le chiffre des dixièmes : 5 ou plus, on arrondit au-dessus.', [
            N('Arrondis 7,8 à l’unité.', 8, ex='7,8 est plus proche de 8.'),
            N('Arrondis 12,41 à l’unité.', 12, ex='4 dixièmes : on arrondit en dessous.'),
            N('Arrondis 0,5 à l’unité (règle de la classe : 5 dixièmes ou plus, au-dessus).', 1, ex='5 dixièmes : on arrondit au-dessus.'),
            Q('Entre quels entiers est 9,99 ?', 'Entre 9 et 10', 'Entre 10 et 11', 'Entre 8 et 9', 'Il est entier', ex='La partie entière est 9.'),
            O('Range du plus petit au plus grand.', ['0,8', '1,08', '1,8', '8,01'], ex='Compare les parties entières, puis les dixièmes.'),
            Q('Quel nombre est le plus proche de 3 ?', '2,95', '3,2', '2,8', '3,15', ex='Écarts : 0,05 ; 0,2 ; 0,2 ; 0,15.'),
            F('Encadre à l’unité.', '{{a}} < 15,7 < {{b}}', {'a': '15', 'b': '16'}, ex='15 < 15,7 < 16.', num=True),
            Q('Le prix 4,99 € arrondi à l’euro, c’est…', '5 €', '4 €', '4,9 €', '6 €', ex='9 dixièmes : on arrondit au-dessus.'),
        ])

    # ---------- Calcul ----------
    k = 8 if not big else 9
    lesson(T(k), 'Consolider tables et stratégies mentales' if not big else 'Automatiser les stratégies mentales',
           'En calcul mental, on s’aide de décompositions : 25 × 4 = 100 ; 99 + 47 = 100 + 47 − 1 ; 6 × 15 = 6 × 10 + 6 × 5. Multiplier par 10 décale les chiffres d’un rang.', [
        N('7 × 8 = ?', 56, ex='Table de 8 : 7 × 8 = 56.'),
        N('9 × 6 = ?', 54, ex='9 × 6 = 54.'),
        N('99 + 47 = ?', 146, ex='100 + 47 − 1 = 146.'),
        N('25 × 4 = ?' if not big else '25 × 12 = ?', 100 if not big else 300, ex=('25 × 4 = 100.' if not big else '25 × 4 = 100, donc 25 × 12 = 300.')),
        N('6 × 15 = ?', 90, ex='6 × 10 + 6 × 5 = 60 + 30 = 90.'),
        N('340 × 10 = ?' if not big else '4,5 × 100 = ?', 3400 if not big else 450, ex=('Les chiffres glissent d’un rang : 3 400.' if not big else 'Les chiffres glissent de deux rangs : 450.')),
        N('56 ÷ 7 = ?', 8, ex='7 × 8 = 56.'),
        M('Associe chaque calcul à son résultat.', [('12 × 5', '60'), ('11 × 7', '77'), ('9 × 9', '81')], ex='12 × 5 = 60 ; 11 × 7 = 77 ; 9 × 9 = 81.'),
    ])
    x, y = r.randint(2_300, 8_900), r.randint(1_200, 6_800)
    p1, p2 = r.randint(120, 480), r.randint(12, 48)
    k += 1
    lesson(T(k), 'Effectuer additions, soustractions et multiplications' if not big else 'Calculer avec les entiers et les décimaux',
           'On pose les opérations en alignant les chiffres de même rang (unités sous unités). Pour une multiplication par un nombre à deux chiffres, on calcule deux lignes puis on additionne. Avec des décimaux, on aligne les virgules.', [
        N(f'{fmt(x)} + {fmt(y)} = ?', x + y, ex=f'{fmt(x)} + {fmt(y)} = {fmt(x + y)}.'),
        N(f'{fmt(max(x, y))} − {fmt(min(x, y))} = ?', abs(x - y), ex=f'Résultat : {fmt(abs(x - y))}.'),
        N(f'{p1} × {p2} = ?', p1 * p2, ex=f'{p1} × {p2} = {fmt(p1 * p2)}.'),
        N('305 × 6 = ?', 1830, ex='300 × 6 + 5 × 6 = 1 800 + 30.'),
        N('12,5 + 3,75 = ?' if big else '1 000 − 358 = ?', 16.25 if big else 642, ex=('On aligne les virgules : 16,25.' if big else '1 000 − 358 = 642.')),
        N('8,4 − 2,65 = ?' if big else '4 005 − 1 997 = ?', 5.75 if big else 2008, ex=('8,40 − 2,65 = 5,75.' if big else '4 005 − 2 000 + 3 = 2 008.')),
        N('2,5 × 4 = ?' if big else '48 × 25 = ?', 10 if big else 1200, ex=('2,5 × 4 = 10.' if big else '48 × 25 = 12 × 100 = 1 200.')),
        Q('Pour poser 4 528 + 397, on aligne…', 'les unités sous les unités', 'les premiers chiffres à gauche', 'le 4 sous le 3', 'n’importe comment', ex='Chaque rang sous le même rang.'),
    ])
    k += 1
    lesson(T(k), 'Comprendre et effectuer la division' if not big else 'Maîtriser multiplication et division',
           'Diviser, c’est chercher combien de fois un nombre est contenu dans un autre. 47 ÷ 5 : quotient 9, reste 2, car 5 × 9 + 2 = 47. Le reste est toujours plus petit que le diviseur.', [
        N('Quotient de 72 ÷ 8 ?', 9, ex='8 × 9 = 72.'),
        F('Complète la division.', '47 = 5 × {{a}} + {{b}}', {'a': '9', 'b': '2'}, ex='5 × 9 = 45, il reste 2.', num=True),
        N('Quel est le reste de 38 ÷ 6 ?', 2, ex='6 × 6 = 36, reste 2.'),
        N('864 ÷ 4 = ?' if not big else '1 548 ÷ 6 = ?', 216 if not big else 258, ex=('800 ÷ 4 + 64 ÷ 4 = 200 + 16.' if not big else '6 × 258 = 1 548.')),
        N('On partage 125 billes entre 5 enfants. Combien chacun ?', 25, ex='125 ÷ 5 = 25.'),
        Q('Dans 47 = 5 × 9 + 2, le reste est…', '2', '9', '5', '47', ex='Le reste est 2.'),
        N('Combien de boîtes de 6 œufs faut-il pour ranger 50 œufs ?', 9, ex='50 = 6 × 8 + 2 : 8 boîtes pleines, et une 9e pour les 2 œufs restants.'),
        N('Combien de groupes de 12 dans 144 ?', 12, ex='12 × 12 = 144.'),
    ])
    if not big:
        k += 1
        lesson(T(k), 'Calculer avec des décimaux', 'Pour additionner ou soustraire des décimaux, on aligne les virgules et on complète avec des zéros si besoin : 4,5 − 1,25 = 4,50 − 1,25 = 3,25.', [
            N('2,4 + 1,3 = ?', 3.7, ex='2 + 1 = 3 et 4 + 3 = 7 dixièmes.'),
            N('5,6 − 2,3 = ?', 3.3, ex='5,6 − 2,3 = 3,3.'),
            N('4,5 − 1,25 = ?', 3.25, ex='4,50 − 1,25 = 3,25.'),
            N('0,7 + 0,6 = ?', 1.3, ex='7 + 6 = 13 dixièmes = 1,3.'),
            N('3 × 1,5 = ?', 4.5, ex='1,5 + 1,5 + 1,5 = 4,5.'),
            N('10,2 + 4,85 = ?', 15.05, ex='10,20 + 4,85 = 15,05.'),
            Q('Un cahier coûte 2,40 € et un stylo 1,35 €. Le total ?', '3,75 €', '3,57 €', '3,65 €', '4,75 €', ex='2,40 + 1,35 = 3,75.'),
            N('Je paie 5 € pour un achat de 3,20 €. Combien me rend-on ?', 1.8, ex='5 − 3,20 = 1,80 €.'),
        ])
    k += 1
    lesson(T(k), 'Estimer et vérifier un résultat' if not big else 'Contrôler un calcul par estimation et opération inverse',
           'Avant de calculer, on estime avec des nombres ronds : 398 + 512 ≈ 400 + 500 = 900. Après, on vérifie avec l’opération inverse : si 84 ÷ 7 = 12, alors 12 × 7 doit faire 84.', [
        Q('Quel est l’ordre de grandeur de 398 + 512 ?', '900', '800', '9 000', '90', ex='400 + 500 = 900.'),
        Q('Quel est l’ordre de grandeur de 49 × 21 ?', '1 000', '100', '10 000', '500', ex='50 × 20 = 1 000.'),
        Q('Léa trouve 2 045 + 1 990 = 3 135. Est-ce plausible ?', 'Non, c’est environ 4 000', 'Oui', 'Non, c’est environ 300', 'On ne peut pas savoir', ex='2 000 + 2 000 ≈ 4 000.'),
        Q('Comment vérifier 84 ÷ 7 = 12 ?', 'Calculer 12 × 7', 'Calculer 84 + 7', 'Calculer 84 − 12', 'Calculer 12 + 7', ex='La multiplication est l’opération inverse de la division.'),
        Q('Comment vérifier 563 − 278 = 285 ?', 'Calculer 285 + 278', 'Calculer 563 + 278', 'Calculer 285 − 278', 'Calculer 563 × 2', ex='L’addition vérifie la soustraction.'),
        N('Estime 31 × 29 en arrondissant à la dizaine.', 900, ex='30 × 30 = 900.'),
        Q('Un résultat de 7 × 489 est-il plus proche de…', '3 500', '350', '35 000', '700', ex='7 × 500 = 3 500.'),
        Q('Tom trouve 6 × 1,5 = 90. Quelle erreur ?', 'La virgule a été oubliée : 9', 'Il fallait 7,5', 'C’est juste', 'Il fallait 60', ex='6 × 1,5 = 9 ; 90 est 10 fois trop grand.'),
    ])

    # ---------- Grandeurs et mesures ----------
    k += 1
    lesson(T(k), 'Mesurer et convertir longueurs, masses et contenances' if not big else 'Réinvestir longueurs, masses et contenances',
           '1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm. 1 kg = 1 000 g. 1 L = 100 cL = 1 000 mL. Pour convertir, on multiplie ou on divise par 10, 100 ou 1 000.', [
        N('3 km = … m', 3000, ex='1 km = 1 000 m.'),
        N('250 cm = … m (écris avec une virgule)', 2.5, ex='100 cm = 1 m, donc 250 cm = 2,5 m.'),
        N('2 kg = … g', 2000, ex='1 kg = 1 000 g.'),
        N('1,5 L = … cL', 150, ex='1 L = 100 cL.'),
        N('4 500 g = … kg (écris avec une virgule)', 4.5, ex='1 000 g = 1 kg.'),
        Q('Quelle unité pour la masse d’un éléphant ?', 'la tonne', 'le gramme', 'le litre', 'le centimètre', ex='Un éléphant pèse plusieurs tonnes (1 t = 1 000 kg).'),
        M('Associe chaque objet à une mesure vraisemblable.', [('Une bouteille d’eau', '1,5 L'), ('Une pomme', '150 g'), ('Une porte', '2 m')], ex='Il faut une unité et un ordre de grandeur adaptés.'),
        N('Un ruban de 2 m. J’en coupe 35 cm. Combien de cm reste-t-il ?', 165, ex='200 − 35 = 165 cm.'),
    ])
    k += 1
    if not big:
        lesson(T(k), 'Calculer des périmètres', 'Le périmètre est la longueur du contour d’une figure. Rectangle : (longueur + largeur) × 2. Carré : côté × 4.', [
            N('Périmètre d’un carré de côté 7 cm (en cm) ?', 28, ex='7 × 4 = 28.'),
            N('Périmètre d’un rectangle de 8 cm sur 5 cm (en cm) ?', 26, ex='(8 + 5) × 2 = 26.'),
            N('Périmètre d’un triangle de côtés 4, 5 et 6 cm (en cm) ?', 15, ex='4 + 5 + 6 = 15.'),
            N('Un carré a un périmètre de 36 cm. Combien mesure son côté ?', 9, ex='36 ÷ 4 = 9.'),
            Q('Le périmètre se mesure en…', 'centimètres ou mètres', 'centimètres carrés', 'litres', 'grammes', ex='C’est une longueur.'),
            N('Un jardin rectangulaire de 12 m sur 8 m. Longueur de clôture (en m) ?', 40, ex='(12 + 8) × 2 = 40.'),
            N('Périmètre d’un hexagone régulier de côté 3 cm ?', 18, ex='6 côtés : 6 × 3 = 18.'),
            Q('Deux rectangles : 6 × 4 et 7 × 3. Lequel a le plus grand périmètre ?', 'Ils ont le même (20 cm)', 'Le 6 × 4', 'Le 7 × 3', 'On ne peut pas savoir', ex='(6 + 4) × 2 = 20 et (7 + 3) × 2 = 20.'),
        ])
    else:
        lesson(T(k), 'Distinguer aire et périmètre', 'Le périmètre est la longueur du contour (en cm, m). L’aire est la surface à l’intérieur (en cm², m²). Deux figures peuvent avoir le même périmètre et des aires différentes.', [
            Q('Pour poser une clôture, on calcule…', 'le périmètre', 'l’aire', 'le volume', 'la masse', ex='La clôture fait le tour.'),
            Q('Pour poser de la moquette, on calcule…', 'l’aire', 'le périmètre', 'la contenance', 'la durée', ex='La moquette recouvre la surface.'),
            N('Rectangle 6 cm × 4 cm : périmètre (cm) ?', 20, ex='(6 + 4) × 2 = 20.'),
            N('Rectangle 6 cm × 4 cm : aire (cm²) ?', 24, ex='6 × 4 = 24.'),
            Q('Un carré de 5 cm et un rectangle de 7 × 3 cm…', 'ont le même périmètre mais pas la même aire', 'ont la même aire', 'ont tout pareil', 'n’ont rien de commun', ex='Périmètres 20 et 20 ; aires 25 et 21.'),
            Q('L’aire s’exprime en…', 'cm²', 'cm', 'L', 'kg', ex='Une surface : unités « carrées ».'),
            N('Carré de côté 9 m : aire (m²) ?', 81, ex='9 × 9 = 81.'),
            N('Carré de côté 9 m : périmètre (m) ?', 36, ex='9 × 4 = 36.'),
        ])
    k += 1
    lesson(T(k), 'Comprendre et comparer des aires' if not big else 'Calculer des aires et convertir',
           ('L’aire d’une surface se mesure en comptant combien de carreaux-unités la recouvrent. Un rectangle de 5 carreaux sur 3 a une aire de 15 carreaux.' if not big else
            'Aire du rectangle = longueur × largeur ; du carré = côté × côté ; du triangle rectangle = (base × hauteur) ÷ 2. 1 m² = 10 000 cm².'), [
        N('Un rectangle de 5 carreaux sur 3 : combien de carreaux ?', 15, ex='5 × 3 = 15.'),
        Q('Deux figures recouvertes de 12 carreaux chacune…', 'ont la même aire', 'ont le même périmètre', 'sont identiques', 'n’ont pas d’aire', ex='Même nombre de carreaux = même aire.'),
        N('Aire d’un carré de côté 6 cm (en cm²) ?', 36, ex='6 × 6 = 36.'),
        N('Aire d’un rectangle de 9 m sur 4 m (en m²) ?', 36, ex='9 × 4 = 36.'),
        N(*(('Combien de carrés de 1 cm² dans un carré de 10 cm de côté ?', 100) if not big else ('Aire d’un triangle rectangle de côtés 6 cm et 4 cm (angle droit entre eux) en cm² ?', 12)), ex=('10 × 10 = 100.' if not big else '(6 × 4) ÷ 2 = 12.')),
        Q('Quelle figure a la plus grande aire ?', 'Un carré de 5 cm', 'Un rectangle de 6 × 4 cm', 'Un rectangle de 8 × 3 cm', 'Un carré de 4 cm', ex='25 > 24 = 24 > 16.'),
        N(*(('Un rectangle a une aire de 24 carreaux et 6 carreaux de long. Combien de large ?', 4) if not big else ('1 m² = combien de dm² ?', 100)), ex=('24 ÷ 6 = 4.' if not big else '1 m = 10 dm, donc 1 m² = 10 × 10 = 100 dm².')),
        Q('Une pièce de 4 m sur 3 m : aire ?', '12 m²', '14 m²', '7 m²', '12 m', ex='4 × 3 = 12 m².'),
    ])
    k += 1
    lesson(T(k), 'Reconnaître et comparer des angles' if not big else 'Comparer et construire des angles',
           'Un angle droit se vérifie avec l’équerre (90°). Un angle aigu est plus petit qu’un angle droit, un angle obtus est plus grand. Pour comparer deux angles, on peut utiliser un gabarit.', [
        Q('Un angle plus petit qu’un angle droit est…', 'aigu', 'obtus', 'plat', 'droit', ex='Aigu : plus fermé que l’angle droit.'),
        Q('Quel outil vérifie un angle droit ?', 'l’équerre', 'le compas', 'la règle seule', 'le rapporteur obligatoirement', ex='L’équerre a un angle droit.'),
        Q('Les aiguilles indiquent 3 h. Quel angle forment-elles ?', 'un angle droit', 'un angle aigu', 'un angle obtus', 'un angle plat', ex='À 3 h, elles forment un quart de tour.'),
        Q('Les aiguilles à 5 h forment un angle…', 'obtus', 'aigu', 'droit', 'nul', ex='Plus ouvert qu’un quart de tour.'),
        N('Combien d’angles droits dans un rectangle ?', 4, ex='Un rectangle a 4 angles droits.'),
        Q('Un triangle peut-il avoir deux angles droits ?', 'Non', 'Oui', 'Seulement s’il est grand', 'Seulement s’il est petit', ex='Les deux côtés seraient parallèles et ne se rejoindraient pas.'),
        M('Associe.', [('Angle de 90°', 'droit'), ('Angle de 40°', 'aigu'), ('Angle de 130°', 'obtus')], ex='Comparer à 90°.'),
        N('Un demi-tour correspond à combien d’angles droits ?', 2, ex='Deux quarts de tour font un demi-tour.'),
    ])
    k += 1
    lesson(T(k), 'Lire l’heure et calculer des durées' if not big else 'Résoudre des problèmes de durées',
           '1 h = 60 min ; 1 min = 60 s ; 1 jour = 24 h. Pour calculer une durée, on avance par étapes jusqu’à l’heure ronde : de 9 h 40 à 11 h 15, c’est 20 min + 1 h + 15 min = 1 h 35.', [
        N('Combien de minutes dans 2 h ?', 120, ex='2 × 60 = 120.'),
        F('De 9 h 40 à 11 h 15, il s’écoule…', '{{a}} h {{b}} min', {'a': '1', 'b': '35'}, ex='20 min jusqu’à 10 h, 1 h jusqu’à 11 h, puis 15 min.', num=True),
        F('Un film de 1 h 50 commence à 20 h 30. Il finit à…', '{{a}} h {{b}}', {'a': '22', 'b': '20'}, ex='20 h 30 + 1 h 30 = 22 h, + 20 min = 22 h 20.', num=True),
        N('Combien de minutes dans 1 h 15 ?', 75, ex='60 + 15 = 75.'),
        Q('14 h 45, c’est aussi…', '3 heures moins le quart de l’après-midi', '2 heures et quart', '4 heures moins le quart', 'midi moins le quart', ex='14 h 45 = 15 h − 15 min.'),
        N('Combien de secondes dans 3 minutes ?', 180, ex='3 × 60 = 180.'),
        N('Un train part à 8 h 50 et arrive à 10 h 05. Durée en minutes ?', 75, ex='10 min jusqu’à 9 h, 1 h jusqu’à 10 h, puis 5 min : 75 min.'),
        (N('Combien d’heures dans 3 jours ?', 72, ex='3 × 24 = 72.') if not big else F('Un train devait arriver à 16 h 40. Il a 45 min de retard. Il arrive à…', '{{a}} h {{b}}', {'a': '17', 'b': '25'}, ex='16 h 40 + 20 min = 17 h, puis + 25 min = 17 h 25.', num=True)),
    ])

    # ---------- Géométrie ----------
    k += 1
    if not big:
        lesson(T(k), 'Droites, segments, perpendiculaires et parallèles', 'Deux droites perpendiculaires se coupent en formant un angle droit. Deux droites parallèles ne se coupent jamais : l’écart entre elles reste le même. Un segment a deux extrémités.', [
            Q('Deux droites qui se coupent à angle droit sont…', 'perpendiculaires', 'parallèles', 'confondues', 'courbes', ex='Angle droit = perpendiculaires.'),
            Q('Deux droites qui ne se coupent jamais sont…', 'parallèles', 'perpendiculaires', 'sécantes', 'égales', ex='Elles gardent toujours le même écart.'),
            Q('Dans un rectangle, deux côtés opposés sont…', 'parallèles', 'perpendiculaires', 'de longueurs différentes', 'courbes', ex='Les côtés opposés d’un rectangle sont parallèles.'),
            Q('Dans un rectangle, deux côtés qui se touchent sont…', 'perpendiculaires', 'parallèles', 'égaux toujours', 'confondus', ex='Ils forment un angle droit.'),
            Q('Un segment…', 'a deux extrémités', 'est illimité des deux côtés', 'n’a pas de longueur', 'est toujours vertical', ex='Le segment [AB] va de A à B.'),
            Q('Quel instrument pour tracer une perpendiculaire ?', 'l’équerre', 'le compas', 'le rapporteur', 'la gomme', ex='L’équerre donne l’angle droit.'),
            Q('Les rails d’un train sont…', 'parallèles', 'perpendiculaires', 'sécants', 'circulaires', ex='Ils gardent le même écart.'),
            N('Combien de paires de côtés parallèles dans un carré ?', 2, ex='Haut/bas et gauche/droite.'),
        ])
    else:
        lesson(T(k), 'Construire et décrire des figures complexes', 'Une figure complexe se décrit en la découpant en figures simples : carrés, triangles, cercles. Un programme de construction donne les étapes dans l’ordre, avec les mesures.', [
            Q('Une maison dessinée est souvent…', 'un carré surmonté d’un triangle', 'deux cercles', 'un seul triangle', 'un hexagone', ex='Le mur et le toit.'),
            O('Remets le programme de construction dans l’ordre.', ['Trace un segment [AB] de 6 cm.', 'Trace la perpendiculaire à [AB] en A.', 'Place C sur cette droite à 4 cm de A.', 'Trace le triangle ABC.'], ex='On commence par le segment de base.'),
            Q('Le cercle de centre O de rayon 3 cm : tous ses points sont…', 'à 3 cm de O', 'à 6 cm de O', 'sur une droite', 'à 3 cm les uns des autres', ex='Définition du cercle.'),
            N('Diamètre d’un cercle de rayon 4 cm (en cm) ?', 8, ex='Diamètre = 2 × rayon.'),
            Q('Un quadrilatère avec 4 angles droits et 4 côtés égaux est…', 'un carré', 'un losange quelconque', 'un trapèze', 'un triangle', ex='Carré : angles droits et côtés égaux.'),
            Q('Un losange a…', '4 côtés de même longueur', '4 angles droits obligatoirement', '3 côtés', '2 côtés égaux seulement', ex='Ses côtés sont égaux.'),
            Q('Un triangle avec un angle droit est…', 'rectangle', 'équilatéral', 'isocèle forcément', 'plat', ex='Triangle rectangle.'),
            M('Associe.', [('Triangle équilatéral', '3 côtés égaux'), ('Triangle isocèle', '2 côtés égaux'), ('Triangle rectangle', 'un angle droit')], ex='Vocabulaire des triangles.'),
        ])
    k += 1
    if not big:
        lesson(T(k), 'Triangles, quadrilatères et cercles', 'Un triangle a 3 côtés, un quadrilatère 4. Carré, rectangle, losange sont des quadrilatères particuliers. Un cercle se trace au compas : le centre, le rayon, le diamètre (2 rayons).', [
            Q('Combien de côtés a un quadrilatère ?', '4', '3', '5', '6', ex='Quadri = quatre.'),
            Q('Un triangle avec 3 côtés égaux est…', 'équilatéral', 'rectangle', 'isocèle seulement', 'quelconque', ex='Équi-latéral : côtés égaux.'),
            N('Rayon d’un cercle de diamètre 10 cm ?', 5, ex='Rayon = diamètre ÷ 2.'),
            Q('Quel outil trace un cercle ?', 'le compas', 'l’équerre', 'la règle', 'le rapporteur', ex='Le compas garde l’écart.'),
            Q('Un rectangle a…', '4 angles droits', '4 côtés égaux toujours', '3 angles droits', 'aucun angle droit', ex='C’est sa propriété.'),
            M('Associe chaque figure à sa propriété.', [('Carré', '4 côtés égaux et 4 angles droits'), ('Losange', '4 côtés égaux'), ('Rectangle', '4 angles droits')], ex='Le carré est à la fois losange et rectangle.'),
            Q('Le segment qui relie le centre à un point du cercle est…', 'un rayon', 'un diamètre', 'une corde quelconque', 'un côté', ex='Rayon.'),
            Q('Un triangle avec 2 côtés égaux est…', 'isocèle', 'équilatéral', 'rectangle', 'plat', ex='Isocèle.'),
        ])
    else:
        lesson(T(k), 'Utiliser parallélisme, perpendicularité et symétrie', 'Perpendiculaires : angle droit. Parallèles : même écart, ne se coupent pas. Deux figures symétriques par rapport à un axe se superposent par pliage le long de l’axe.', [
            Q('Deux droites perpendiculaires à une même droite sont…', 'parallèles entre elles', 'perpendiculaires entre elles', 'confondues', 'sécantes', ex='Elles ont la même direction.'),
            Q('Le symétrique d’un point par rapport à un axe est…', 'à la même distance de l’axe, de l’autre côté', 'sur l’axe toujours', 'deux fois plus loin', 'du même côté', ex='Comme dans un miroir.'),
            Q('Combien d’axes de symétrie a un carré ?', '4', '2', '1', '0', ex='2 médianes et 2 diagonales.'),
            Q('Combien d’axes de symétrie a un rectangle (non carré) ?', '2', '4', '1', '0', ex='Les deux médianes.'),
            Q('Quelle lettre a un axe de symétrie vertical ?', 'A', 'F', 'G', 'R', ex='A se plie en deux moitiés identiques.'),
            Q('Un cercle a…', 'une infinité d’axes de symétrie', 'un seul axe', 'deux axes', 'aucun axe', ex='Tout diamètre est un axe.'),
            Q('Pour vérifier que deux droites sont parallèles, on peut…', 'mesurer leur écart en deux endroits', 'regarder si elles sont longues', 'tracer un cercle', 'compter les points', ex='L’écart doit être le même.'),
            N('Combien d’axes de symétrie a un triangle équilatéral ?', 3, ex='Un par sommet.'),
        ])
    k += 1
    if not big:
        lesson(T(k), 'Utiliser la symétrie axiale', 'Une figure a un axe de symétrie si on peut la plier le long de cet axe et que les deux moitiés se superposent. Le symétrique d’un point est à la même distance de l’axe, de l’autre côté.', [
            Q('Plier une figure le long de son axe de symétrie : les deux parties…', 'se superposent', 'ne se touchent pas', 'changent de taille', 'disparaissent', ex='C’est la définition.'),
            Q('Quelle forme a un axe de symétrie ?', 'un cœur', 'la lettre F', 'la lettre G', 'le chiffre 7', ex='Un cœur se plie en deux moitiés identiques.'),
            N('Combien d’axes de symétrie a un carré ?', 4, ex='2 médianes et 2 diagonales.'),
            Q('Le symétrique d’un point situé sur l’axe est…', 'lui-même', 'loin de l’axe', 'effacé', 'au milieu de la feuille', ex='Il ne bouge pas.'),
            Q('Sur quadrillage, un point est à 3 carreaux à gauche de l’axe. Son symétrique est…', 'à 3 carreaux à droite', 'à 6 carreaux à droite', 'à 3 carreaux à gauche', 'sur l’axe', ex='Même distance, de l’autre côté.'),
            Q('Quelle lettre n’a aucun axe de symétrie ?', 'F', 'A', 'H', 'O', ex='F ne se plie pas en deux moitiés identiques.'),
            N('Combien d’axes de symétrie a un rectangle non carré ?', 2, ex='Les deux médianes.'),
            Q('Un papillon dessiné est souvent…', 'symétrique', 'impossible à plier', 'sans axe', 'rond', ex='Ses deux ailes sont symétriques.'),
        ])
    else:
        lesson(T(k), 'Reconnaître solides et patrons', 'Un patron est une figure plane qu’on plie pour fabriquer un solide. Un cube a 6 faces carrées, 12 arêtes et 8 sommets. Un pavé droit a 6 faces rectangulaires.', [
            N('Combien de faces a un cube ?', 6, ex='6 faces carrées.'),
            N('Combien d’arêtes a un cube ?', 12, ex='4 en haut, 4 en bas, 4 verticales.'),
            N('Combien de sommets a un cube ?', 8, ex='4 en haut, 4 en bas.'),
            Q('Un patron de cube est formé de…', '6 carrés', '4 carrés', '6 rectangles quelconques', '8 triangles', ex='Une face par carré.'),
            Q('Quel solide n’a aucune arête droite ?', 'la boule', 'le cube', 'la pyramide', 'le pavé', ex='La sphère (boule) est toute ronde.'),
            Q('Une pyramide à base carrée a combien de faces ?', '5', '4', '6', '8', ex='1 base + 4 triangles.'),
            Q('Une boîte à chaussures a la forme d’un…', 'pavé droit', 'cylindre', 'cône', 'cube forcément', ex='Faces rectangulaires.'),
            Q('Une canette a la forme d’un…', 'cylindre', 'cube', 'pavé', 'pyramide', ex='Deux disques et une surface courbe.'),
        ])
    k += 1
    if not big:
        lesson(T(k), 'Décrire solides et représentations', 'Un solide a des faces, des arêtes (les bords) et des sommets (les coins). Cube : 6 faces carrées. Pavé droit : 6 faces rectangulaires. Cylindre, cône et boule ont des surfaces courbes.', [
            N('Combien de faces a un pavé droit ?', 6, ex='6 faces rectangulaires.'),
            N('Combien de sommets a un pavé droit ?', 8, ex='Comme le cube.'),
            Q('Quel solide a des faces toutes carrées ?', 'le cube', 'le pavé quelconque', 'le cylindre', 'le cône', ex='Le cube.'),
            Q('Un ballon de foot ressemble à…', 'une boule', 'un cube', 'un cylindre', 'un cône', ex='Une sphère.'),
            Q('Un cornet de glace ressemble à…', 'un cône', 'un cylindre', 'un pavé', 'une pyramide à base carrée', ex='Une pointe et un disque.'),
            Q('Le bord entre deux faces s’appelle…', 'une arête', 'un sommet', 'un rayon', 'un angle droit', ex='Arête.'),
            M('Associe.', [('Dé à jouer', 'cube'), ('Rouleau', 'cylindre'), ('Brique', 'pavé droit')], ex='Formes du quotidien.'),
            N('Combien d’arêtes a un pavé droit ?', 12, ex='Comme le cube : 12.'),
        ])
    else:
        lesson(T(k), 'Coder des déplacements et un programme', 'Un programme de déplacement est une suite d’instructions : avancer, tourner à gauche, tourner à droite, répéter. Sur un quadrillage, on peut repérer une case par une lettre et un nombre (B4).', [
            Q('Un robot regarde vers le nord. Il tourne à droite. Il regarde vers…', 'l’est', 'l’ouest', 'le sud', 'le nord', ex='À droite du nord : l’est.'),
            Q('Il regarde vers l’est et fait un demi-tour. Il regarde vers…', 'l’ouest', 'le nord', 'le sud', 'l’est', ex='Demi-tour : direction opposée.'),
            Q('« Répéter 4 fois : avancer de 3, tourner à droite » trace…', 'un carré', 'un triangle', 'une ligne droite', 'un cercle', ex='4 côtés égaux et 4 angles droits.'),
            Q('« Répéter 3 fois : avancer, tourner de 120° » trace…', 'un triangle équilatéral', 'un carré', 'un hexagone', 'un rectangle', ex='3 côtés égaux.'),
            Q('Sur un quadrillage, la case B3 se trouve…', 'colonne B, ligne 3', 'colonne 3, ligne B', 'au centre', 'en haut à droite toujours', ex='Lettre pour la colonne, nombre pour la ligne.'),
            N('Un robot part de la case 2, avance de 5 cases puis recule de 3. Sur quelle case est-il ?', 4, ex='2 + 5 − 3 = 4.'),
            Q('Une boucle dans un programme sert à…', 'répéter des instructions', 'arrêter le robot', 'effacer l’écran', 'changer de couleur', ex='Répéter.'),
            Q('Pour corriger un programme qui ne marche pas, on…', 'teste étape par étape', 'efface tout sans regarder', 'ajoute des instructions au hasard', 'éteint l’ordinateur', ex='On cherche l’instruction fautive.'),
        ])
    if not big:
        k += 1
        lesson(T(k), 'Se repérer et programmer un déplacement', 'On se repère sur un quadrillage avec des coordonnées (C2) ou avec des directions : avancer, tourner à gauche, tourner à droite. Un programme est une suite d’instructions dans l’ordre.', [
            Q('Je regarde vers le nord et je tourne à gauche. Je regarde vers…', 'l’ouest', 'l’est', 'le sud', 'le nord', ex='À gauche du nord : l’ouest.'),
            Q('La case D1 est…', 'colonne D, ligne 1', 'colonne 1, ligne D', 'en bas à droite toujours', 'impossible', ex='Lettre puis nombre.'),
            Q('« Avancer 2, tourner à droite, avancer 2, tourner à droite, avancer 2, tourner à droite, avancer 2 » trace…', 'un carré', 'un triangle', 'une droite', 'un rond', ex='4 côtés égaux et des angles droits.'),
            Q('Un quart de tour à droite puis un quart de tour à gauche…', 'ramène dans la direction de départ', 'fait un demi-tour', 'fait un tour complet', 'fait regarder en arrière', ex='Les deux rotations s’annulent.'),
            N('Combien de quarts de tour pour faire un tour complet ?', 4, ex='4 × un quart = 1 tour.'),
            O('Remets dans l’ordre pour aller de la porte au bureau.', ['Entrer par la porte', 'Avancer de 3 pas', 'Tourner à droite', 'Avancer jusqu’au bureau'], ex='Les instructions s’exécutent dans l’ordre.'),
            Q('Un « bug » dans un programme, c’est…', 'une erreur', 'un robot', 'un ordinateur', 'une boucle', ex='On le corrige en testant.'),
            Q('Pour répéter une instruction 5 fois, on utilise…', 'une boucle', 'une gomme', 'un compas', 'une flèche', ex='« Répéter 5 fois ».'),
        ])

    # ---------- Problèmes et proportionnalité ----------
    k += 1
    lesson(T(k), 'Résoudre des problèmes en plusieurs étapes' if not big else 'Résoudre et expliquer une démarche en plusieurs étapes',
           'Pour un problème en plusieurs étapes : 1) je repère la question ; 2) je cherche les informations utiles ; 3) je calcule une étape intermédiaire ; 4) je réponds par une phrase et je vérifie.', [
        N('Une classe achète 3 ballons à 12 € et 2 cordes à 8 €. Combien paie-t-elle ?', 52, ex='3 × 12 = 36 ; 2 × 8 = 16 ; 36 + 16 = 52.'),
        N('Un car contient 48 places. 3 cars partent ; 131 élèves voyagent. Combien de places vides ?', 13, ex='3 × 48 = 144 ; 144 − 131 = 13.'),
        N('Léo a 50 €. Il achète 3 livres à 9 €. Combien lui reste-t-il ?', 23, ex='3 × 9 = 27 ; 50 − 27 = 23.'),
        N('Un fermier ramasse 156 œufs et les range par boîtes de 12. Il vend chaque boîte 3 €. Combien gagne-t-il ?', 39, ex='156 ÷ 12 = 13 boîtes ; 13 × 3 = 39 €.'),
        N(*(('3 tablettes de chocolat à 2,60 € chacune. Je paie avec 8 €. Combien me rend-on ? (en euros, avec une virgule)', 0.2) if big else ('Un livre a 240 pages. Inès en lit 35 par jour pendant 4 jours. Combien de pages lui reste-t-il ?', 100)), ex=('3 × 2,60 = 7,80 ; 8 − 7,80 = 0,20 €.' if big else '35 × 4 = 140 ; 240 − 140 = 100.')),
        Q('Quelle est la première étape pour résoudre un problème ?', 'Bien comprendre la question', 'Calculer avec tous les nombres', 'Écrire la réponse', 'Ajouter tous les nombres', ex='Savoir ce qu’on cherche.'),
        N('Un stylo et une trousse coûtent 9 €. La trousse coûte 5 € de plus que le stylo. Prix du stylo ?', 2, ex='9 − 5 = 4, partagé en 2 : stylo 2 €, trousse 7 €.'),
        N('Une piscine : 25 m. Nina fait 12 longueurs le lundi et 16 le mardi. Combien de mètres en tout ?', 700, ex='12 + 16 = 28 longueurs ; 28 × 25 = 700 m.'),
    ])
    k += 1
    lesson(T(k), 'Reconnaître une situation de proportionnalité' if not big else 'Résoudre une proportionnalité par linéarité',
           'Il y a proportionnalité quand on multiplie toujours par le même nombre : 1 cahier coûte 2 €, 3 cahiers coûtent 6 €. On peut aussi additionner : prix de 5 = prix de 2 + prix de 3.', [
        N('1 cahier coûte 3 €. Combien coûtent 7 cahiers ?', 21, ex='7 × 3 = 21.'),
        N('2 parts de gâteau coûtent 3 €. Combien coûtent 8 parts ?', 12, ex='8 = 4 × 2, donc 4 × 3 = 12 €.'),
        N('4 baguettes coûtent 5 €. Combien coûtent 12 baguettes ?', 15, ex='12 = 3 × 4, donc 3 × 5 = 15 €.'),
        Q('Quelle situation est proportionnelle ?', 'Le prix de pommes à 2 € le kilo selon le poids', 'La taille d’un enfant selon son âge', 'Le score d’un match selon la durée', 'La température selon l’heure', ex='Chaque kilo coûte toujours 2 €.'),
        F('Complète le tableau de proportionnalité.', 'Pour 3 personnes : 6 œufs ; pour 9 personnes : {{a}} œufs', {'a': '18'}, ex='9 = 3 × 3, donc 6 × 3 = 18.', num=True),
        N('Une recette pour 4 personnes demande 200 g de farine. Pour 6 personnes ?', 300, ex='Pour 2 personnes : 100 g ; pour 6 : 300 g.'),
        N('Un robinet remplit 15 L en 3 minutes. Combien en 10 minutes ?', 50, ex='5 L par minute ; 10 × 5 = 50.'),
        N('3 boîtes de 10 feutres à 5 € la boîte. Prix total ?', 15, ex='3 × 5 = 15 €.'),
    ])
    k += 1
    lesson(T(k), 'Trouver une valeur manquante et poursuivre des suites' if not big else 'Raisonner sur une valeur inconnue et des suites',
           'Pour trouver un nombre caché, on utilise l’opération inverse : … + 27 = 50, donc … = 50 − 27. Dans une suite, on cherche la règle : 3, 7, 11, 15… on ajoute 4 à chaque fois.', [
        N('… + 27 = 50', 23, ex='50 − 27 = 23.'),
        N('… × 6 = 54', 9, ex='54 ÷ 6 = 9.'),
        N('Suite : 3, 7, 11, 15, … Nombre suivant ?', 19, ex='+ 4 à chaque fois.'),
        N('Suite : 2, 4, 8, 16, … Nombre suivant ?', 32, ex='× 2 à chaque fois.'),
        N('Suite : 100, 91, 82, 73, … Nombre suivant ?', 64, ex='− 9 à chaque fois.'),
        N('Je pense à un nombre, je le multiplie par 3 et j’ajoute 5 : je trouve 26. Quel nombre ?', 7, ex='26 − 5 = 21 ; 21 ÷ 3 = 7.'),
        N('… − 125 = 375', 500, ex='375 + 125 = 500.'),
        N('Motif : 1 carré, puis 3, puis 5, puis 7… Combien à la 6e étape ?', 11, ex='+ 2 à chaque étape : 1, 3, 5, 7, 9, 11.'),
    ])

    # ---------- Données et probabilités ----------
    k += 1
    lesson(T(k), 'Lire et interpréter tableaux et graphiques' if not big else 'Interpréter et produire tableaux et diagrammes',
           'Un tableau range des données en lignes et colonnes. Un diagramme en barres montre des quantités : plus la barre est haute, plus la valeur est grande. On lit toujours le titre et les unités.', [
        Q('Animal préféré : chien 12, chat 9, lapin 5, poisson 4. Lequel est le plus choisi ?', 'le chien', 'le chat', 'le lapin', 'le poisson', ex='12 est la plus grande valeur.', passage='Enquête dans une classe. Animal préféré : chien 12 · chat 9 · lapin 5 · poisson 4'),
        N('Combien d’élèves ont répondu en tout ?', 30, ex='12 + 9 + 5 + 4 = 30.'),
        N('Combien d’élèves de plus pour le chien que pour le chat ?', 3, ex='12 − 9 = 3.'),
        Q('Dans un diagramme en barres, la barre la plus haute représente…', 'la plus grande valeur', 'la plus petite valeur', 'la moyenne', 'rien', ex='La hauteur montre la quantité.'),
        Q('Températures : lundi 8°, mardi 12°, mercredi 10°. Quel jour fait-il le plus chaud ?', 'mardi', 'lundi', 'mercredi', 'aucun', ex='12° est la plus haute.'),
        N('Ventes de crêpes : 25 le lundi, 40 le mardi, 35 le mercredi. Total ?', 100, ex='25 + 40 + 35 = 100.'),
        Q('Que faut-il lire en premier dans un graphique ?', 'le titre et les axes', 'la couleur', 'la dernière barre', 'rien', ex='Pour savoir ce qui est représenté.'),
        Q('Pour suivre la température heure par heure, le meilleur graphique est…', 'une courbe', 'un dessin', 'un tableau vide', 'une photo', ex='La courbe montre une évolution.'),
    ])
    k += 1
    lesson(T(k), 'Distinguer certain, possible et impossible' if not big else 'Décrire une expérience aléatoire et ses issues',
           'Un événement est certain s’il arrive à coup sûr, impossible s’il ne peut pas arriver, possible s’il peut arriver ou non. Les issues d’une expérience sont tous les résultats possibles.', [
        Q('Lancer un dé à 6 faces et obtenir 7 est…', 'impossible', 'certain', 'possible', 'probable', ex='Le dé va de 1 à 6.'),
        Q('Lancer un dé et obtenir un nombre entre 1 et 6 est…', 'certain', 'impossible', 'rare', 'possible seulement', ex='Toutes les faces vont de 1 à 6.'),
        Q('Lancer une pièce et obtenir « pile » est…', 'possible', 'certain', 'impossible', 'interdit', ex='On peut aussi obtenir face.'),
        N('Combien d’issues possibles pour un dé à 6 faces ?', 6, ex='1, 2, 3, 4, 5, 6.'),
        Q('Un sac contient seulement des billes rouges. Tirer une bille rouge est…', 'certain', 'possible', 'impossible', 'rare', ex='Il n’y a que du rouge.'),
        Q('Ce même sac : tirer une bille bleue est…', 'impossible', 'certain', 'possible', 'probable', ex='Aucune bille bleue.'),
        N('Combien d’issues pour une pièce de monnaie ?', 2, ex='Pile ou face.'),
        Q('« Il fera jour demain matin » est…', 'certain', 'impossible', 'possible', 'improbable', ex='Le Soleil se lève chaque jour.'),
    ])
    k += 1
    lesson(T(k), 'Comparer des chances dans une expérience simple' if not big else 'Comparer des probabilités simples',
           'Plus il y a de cas favorables, plus on a de chances. Dans un sac de 3 billes rouges et 1 bleue, on a plus de chances de tirer une rouge. La probabilité de rouge est 3 sur 4.', [
        Q('Sac : 5 rouges, 2 bleues. Quelle couleur a le plus de chances ?', 'rouge', 'bleue', 'autant', 'aucune', ex='5 > 2.'),
        Q('Sac : 4 vertes, 4 jaunes. Les chances sont…', 'égales', 'plus fortes pour le vert', 'plus fortes pour le jaune', 'nulles', ex='4 = 4.'),
        Q('Dé à 6 faces : obtenir un nombre pair ou impair ?', 'autant de chances', 'plus de chances pour pair', 'plus de chances pour impair', 'impossible', ex='3 pairs, 3 impairs.'),
        Q('Dé à 6 faces : obtenir 6 ou obtenir un nombre plus petit que 3 ?', 'plus petit que 3', 'obtenir 6', 'autant', 'aucun', ex='1 ou 2 : 2 chances contre 1.'),
        Q('Roue : 3 secteurs rouges, 1 bleu (égaux). Probabilité de bleu ?', '1 chance sur 4', '1 chance sur 3', '3 chances sur 4', 'certain', ex='1 secteur sur 4.'),
        N('Sac de 10 billes dont 7 rouges. Combien de chances sur 10 de tirer une rouge ?', 7, ex='7 cas favorables sur 10.'),
        Q('Pour avoir plus de chances de tirer une bille bleue, il faut…', 'ajouter des bleues', 'ajouter des rouges', 'fermer les yeux', 'secouer plus fort', ex='Plus de cas favorables.'),
        Q('Tirer pile 3 fois de suite rend-il face plus probable au 4e lancer ?', 'Non, c’est toujours 1 chance sur 2', 'Oui, forcément', 'Non, pile devient certain', 'Oui, 3 chances sur 4', ex='La pièce n’a pas de mémoire.'),
    ])
    return k
