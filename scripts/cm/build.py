"""Assemble les leçons CM1/CM2 et les fusionne dans src/data/lessons.json."""
import sys, json, os
sys.path.insert(0, os.path.dirname(__file__))
import dsl, ma, fr_cm1, fr_cm2, autres_cm1, autres_cm2

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
LP = os.path.join(ROOT, 'src/data/lessons.json')
PP = os.path.join(ROOT, 'src/data/programme.json')

dsl.LESSONS.clear()
ma.cm_math('cm1'); ma.cm_math('cm2')
fr_cm1.fr_cm1(); fr_cm2.fr_cm2()
autres_cm1.autres_cm1(); autres_cm2.autres_cm2()
new = list(dsl.LESSONS)

prog = json.load(open(PP))
themes = {}
for lv in prog:
    for s in lv['subjects']:
        for d in s['domains']:
            for t in d['themes']:
                themes[t['id']] = (lv['id'], s['id'], t['title'])

# Vérifications : un thème programme = une leçon, et tous les thèmes CM couverts
seen = set()
for l in new:
    assert l['theme'] in themes, ('thème inconnu', l['theme'])
    lv, sid, title = themes[l['theme']]
    assert (lv, sid) == (l['level'], l['subject']), (l['theme'], lv, sid)
    assert l['theme'] not in seen, ('doublon', l['theme'])
    seen.add(l['theme'])
    l['title'] = title
    assert 6 <= len(l['ex']) <= 10, (l['id'], len(l['ex']))
missing = [t for t, (lv, _, _) in themes.items() if lv in ('cm1', 'cm2') and t not in seen]
assert not missing, ('thèmes sans leçon', missing)

lessons = json.load(open(LP))
lessons = [l for l in lessons if not (l['level'] in ('cm1', 'cm2') and not l['theme'].endswith('-decouverte'))]
ids = {l['id'] for l in lessons}
nxt = max(l['idx'] for l in lessons) + 1
for l in new:
    assert l['id'] not in ids, l['id']
    ids.add(l['id'])
    for e in l['ex']:
        assert e['id'] not in ids, e['id']
        ids.add(e['id'])
    l['idx'] = nxt; nxt += 1
    # même ordre de clés que les leçons existantes
    out = {k: l[k] for k in ('id', 'level', 'subject', 'theme', 'title', 'intro')}
    if 'adult' in l: out['adult'] = l['adult']
    out['idx'] = l['idx']; out['ex'] = l['ex']
    lessons.append(out)

json.dump(lessons, open(LP, 'w'), ensure_ascii=False, separators=(',', ':'))
from collections import Counter
print('ajoutées', len(new), 'total', len(lessons), Counter(l['level'] for l in new), 'exercices', sum(len(l['ex']) for l in new))
