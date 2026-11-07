import sys; sys.path.insert(0,'.')
import dsl, ma
for lv in ('cm1','cm2'):
    dsl.LESSONS.clear(); k=ma.cm_math(lv)
    print(lv, len(dsl.LESSONS), 'last k', k, [len(l['ex']) for l in dsl.LESSONS])
