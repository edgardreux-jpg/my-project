"""Petit langage pour écrire les leçons CM1/CM2 d'EDUFUN (contenus originaux, programmes 2025-2026)."""
import random, json, hashlib

HINTS = {
  'qcm': 'Relis la petite leçon, puis élimine les réponses qui ne conviennent pas.',
  'number_input': 'Pose le calcul au brouillon si besoin, puis vérifie ton résultat.',
  'matching': 'Commence par les associations dont tu es sûr, puis termine par élimination.',
  'ordering': 'Repère d’abord le premier élément, puis le suivant.',
  'fill_blank': 'Relis la phrase en entier avec ta réponse pour vérifier qu’elle a du sens.',
}

def _rng(key):
    return random.Random(int(hashlib.md5(key.encode()).hexdigest()[:8], 16))

def Q(prompt, correct, *wrongs, ex='', hint=None, passage=None):
    return {'t': 'qcm', 'prompt': prompt, 'correct': str(correct), 'wrongs': [str(w) for w in wrongs], 'ex': ex, 'hint': hint, 'passage': passage}
def N(prompt, value, ex='', hint=None):
    return {'t': 'number_input', 'prompt': prompt, 'value': value, 'ex': ex, 'hint': hint}
def M(prompt, pairs, ex='', hint=None):
    return {'t': 'matching', 'prompt': prompt, 'pairs': pairs, 'ex': ex, 'hint': hint}
def O(prompt, items, ex='', hint=None):
    return {'t': 'ordering', 'prompt': prompt, 'items': items, 'ex': ex, 'hint': hint}
def F(prompt, template, answers, ex='', hint=None, num=False):
    return {'t': 'fill_blank', 'prompt': prompt, 'template': template, 'answers': answers, 'ex': ex, 'hint': hint, 'num': num}

def fmt(n):
    """Écriture française : espace fine entre les milliers, virgule décimale."""
    if isinstance(n, float) and not n.is_integer():
        s = f'{n:.3f}'.rstrip('0').rstrip('.')
        ent, dec = s.split('.') if '.' in s else (s, '')
        return fmt(int(ent)) + (',' + dec if dec else '')
    n = int(n)
    s = f'{abs(n):,}'.replace(',', ' ')
    return ('-' if n < 0 else '') + s

def build(lid, items):
    out = []
    r = _rng(lid)
    for i, it in enumerate(items, 1):
        eid = f'{lid}-e{i}'
        t = it['t']
        base = {'id': eid, 'type': t, 'prompt': it['prompt'], 'hint': it.get('hint') or HINTS[t], 'explanation': it['ex']}
        if t == 'qcm':
            labels = [it['correct']] + it['wrongs']
            assert len(set(labels)) == len(labels) and len(labels) >= 2, (eid, labels)
            order = list(range(len(labels))); r.shuffle(order)
            base['choices'] = [{'id': str(k), 'label': labels[j]} for k, j in enumerate(order)]
            base['expected'] = str(order.index(0))
            if it.get('passage'): base['passage'] = it['passage']
        elif t == 'number_input':
            v = it['value']
            base['expected'] = (f'{v:.3f}'.rstrip('0').rstrip('.') if isinstance(v, float) else str(v))
            base['normalization'] = 'decimal'
        elif t == 'matching':
            pairs = it['pairs']; assert len(set(p[1] for p in pairs)) == len(pairs), eid
            ids = 'abcdef'; tids = 'uvwxyz'
            tg = list(range(len(pairs))); r.shuffle(tg)
            base['items'] = [{'id': ids[k], 'label': p[0]} for k, p in enumerate(pairs)]
            base['targets'] = [{'id': tids[j], 'label': pairs[j][1]} for j in tg]
            base['expected'] = {ids[k]: tids[k] for k in range(len(pairs))}
        elif t == 'ordering':
            items_ = it['items']; order = list(range(len(items_)))
            while order == sorted(order): r.shuffle(order)
            base['items'] = [{'id': str(j), 'label': items_[j]} for j in order]
            base['expected'] = [str(k) for k in range(len(items_))]
        elif t == 'fill_blank':
            base['template'] = it['template']; base['blanks'] = list(it['answers'].keys())
            base['expected'] = {k: str(v) for k, v in it['answers'].items()}
            if it.get('num'): base['normalization'] = 'decimal'
        out.append(base)
    return out

LESSONS = []
def lesson(theme, title, intro, items, adult=None):
    level, subject = theme.split('-')[0], theme.split('-')[1]
    lid = f'{theme}-decouvrir'
    l = {'id': lid, 'level': level, 'subject': subject, 'theme': theme, 'title': title, 'intro': intro, 'ex': build(lid, items)}
    if adult: l['adult'] = adult
    LESSONS.append(l)
    return l
