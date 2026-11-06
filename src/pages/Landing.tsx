import type React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, BookOpenCheck, EyeOff, Coffee, LineChart as LC, Sparkles, HeartHandshake, School, ArrowRight, ArrowUp, Lightbulb, Volume2, RotateCw, Check } from 'lucide-react'
import { Logo, Spark } from '../components/common'
import { Ico, Stars } from '../components/Icon'
import { LEVELS, SOURCES, levelStats, levelData, meta } from '../lib/curriculum'
import type { LevelId } from '../types'
import { useStore } from '../state/store'
import { avatarSrc } from '../lib/avatars'
import { useRef, useState, type ReactNode } from 'react'

/** Carte d'illustration qui se retourne au survol (souris) ou au clic / toucher. */
function FlipCard({ front, back, className, label }: { front: ReactNode; back: ReactNode; className: string; label: string }) {
  const [on, setOn] = useState(false)
  const mouse = useRef(false)
  return (
    <button type="button" className={`a flip ${className} ${on ? 'on' : ''}`} aria-pressed={on} aria-label={`Exemple ${label} : retourner la carte`}
      onPointerEnter={e => { if (e.pointerType === 'mouse') { mouse.current = true; setOn(true) } }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') { mouse.current = false; setOn(false) } }}
      onPointerDown={e => { mouse.current = e.pointerType === 'mouse' }}
      onClick={() => { if (!mouse.current) setOn(v => !v) }}>
      <span className="flip-in" aria-hidden="true">
        <span className="face front">{front}</span>
        <span className="face back">{back}</span>
      </span>
    </button>
  )
}

const SHOTS = [
  { file: 'parent-tableau', icon: 'chart', title: 'L’évolution, semaine après semaine', text: 'Temps passé, réussite au premier essai et leçons acquises, comparés à la semaine précédente.', cap: 'Tableau de bord : la carte de l’enfant' },
  { file: 'parent-notions', icon: '🎯', title: 'Les notions à consolider', text: 'EDUFUN repère les thèmes où l’enfant bute, pour l’aider au bon moment.', cap: 'Fiche de l’enfant : notions à consolider' },
  { file: 'parent-reglages', icon: '🛡️', title: 'Vous gardez la main', text: 'Objectif du jour, rappel de pause, sons, police adaptée, matières visibles, classe.', cap: 'Réglages de l’enfant' },
] as const

/** Vraies captures de l'espace parent : la carte se retourne au survol, au clic ou au choix d'un point à gauche. */
function ParentShots() {
  const [cur, setCur] = useState(0)
  const [angle, setAngle] = useState(0)
  const [faces, setFaces] = useState<[number, number]>([0, 1])
  const go = (to: number) => {
    if (to === cur) return
    const frontVisible = (angle / 180) % 2 === 0
    setFaces(f => frontVisible ? [f[0], to] : [to, f[1]])
    setAngle(a => a + 180); setCur(to)
  }
  const next = () => go((cur + 1) % SHOTS.length)
  const src = (i: number) => `${import.meta.env.BASE_URL}screens/${SHOTS[i].file}.webp`
  return (
    <>
      <div className="col">
        {SHOTS.map((s, i) => (
          <button key={s.file} type="button" className={`feat featbtn ${cur === i ? 'on' : ''}`} aria-pressed={cur === i}
            onPointerEnter={e => { if (e.pointerType === 'mouse') go(i) }} onFocus={() => go(i)} onClick={() => go(i)}>
            <div className="ic">{s.icon === 'chart' ? <LC size={24} /> : <Ico e={s.icon} color="currentColor" />}</div>
            <h3>{s.title}</h3><p className="muted">{s.text}</p>
          </button>
        ))}
      </div>
      <div className="shotwrap">
        <button type="button" className="shotflip" aria-label={`Capture : ${SHOTS[cur].cap}. Voir la suivante`}
          onClick={next}>
          <span className="shot-in" style={{ transform: `rotateY(${angle}deg)` }}>
            {faces.map((f, k) => (
              <span key={k} className={`shot-face ${k ? 'back' : ''}`}>
                <span className="shot-bar"><i /><i /><i /><b>{SHOTS[f].cap}</b></span>
                <img src={src(f)} alt={SHOTS[f].cap} loading="lazy" />
              </span>
            ))}
          </span>
        </button>
        <div className="shot-dots" aria-hidden="true">{SHOTS.map((s, i) => <i key={s.file} className={i === cur ? 'on' : ''} />)}</div>
        <p className="tiny muted center">Vraies captures de l’espace parent (famille de démonstration). Survolez un des trois encarts (ou touchez-le) pour changer d’écran.</p>
      </div>
    </>
  )
}

const LV_LOOK: Record<string, { color: string; dark: string; soft: string; cycle: string; q: string; opts: string[]; ok: number; subj: string }> = {
  ce1: { color: '#E07A4B', dark: '#B4552B', soft: '#FFEADF', cycle: 'Cycle 2', subj: 'fr', q: 'Quel mot contient le son « ou » ?', opts: ['loup', 'lion', 'chat'], ok: 0 },
  ce2: { color: '#17766E', dark: '#0D514C', soft: '#E3F4EE', cycle: 'Cycle 2', subj: 'ma', q: 'Quel outil sert à tracer un cercle ?', opts: ['L’équerre', 'Le compas', 'La règle'], ok: 1 },
  cm1: { color: '#11616B', dark: '#0A434A', soft: '#DDEDEE', cycle: 'Cycle 3', subj: 'ma', q: 'Combien font 2 400 + 1 300 ?', opts: ['3 700', '3 600', '4 700'], ok: 0 },
  cm2: { color: '#1E3A5F', dark: '#0F2238', soft: '#E2E8F1', cycle: 'Cycle 3', subj: 'ma', q: 'Combien font 24 000 + 13 000 ?', opts: ['36 000', '37 000', '38 000'], ok: 1 },
}

/** Carte de niveau : recto = chiffres clés, verso = une vraie question du niveau et les matières. */
function LevelFlip({ id }: { id: LevelId }) {
  const [on, setOn] = useState(false)
  const lv = LEVELS.find(l => l.id === id)!, s = levelStats(id), k = LV_LOOK[id]
  const full = id === 'ce1' || id === 'ce2'
  const subjects = levelData(id).subjects
  const m = meta(k.subj)
  return (
    <button type="button" className={`lvf ${on ? 'on' : ''}`} style={{ ['--lc' as string]: k.color, ['--ld' as string]: k.dark, ['--ls' as string]: k.soft } as React.CSSProperties}
      aria-pressed={on} aria-label={`${lv.title} : voir un exemple de question`}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setOn(true) }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') setOn(false) }}
      onClick={e => { if ((e.nativeEvent as PointerEvent).pointerType !== 'mouse') setOn(v => !v) }}>
      <span className="lvf-in">
        <span className="lvf-face">
          <span className="lvf-top"><span>{k.cycle}</span><span>{lv.ages}</span></span>
          <span className="lvf-title">{lv.title}</span>
          <span className="lvf-stats">
            <span><b>{s.themes}</b><small>thèmes au programme</small></span>
            <span><b>{s.lessons}</b><small>leçons jouables</small></span>
          </span>
          <span className="lvf-subj" aria-hidden="true">{subjects.slice(0, 7).map(su => <i key={su.id} style={{ background: meta(su.id).soft, color: meta(su.id).color }}><Ico e={meta(su.id).emoji} size={14} color="currentColor" /></i>)}</span>
          <span className={`lvf-status ${full ? 'ok' : 'wip'}`}>{full ? <><BookOpenCheck size={15} /> Programme complet</> : <><Sparkles size={15} /> En construction</>}</span>
          <span className="lvf-hint"><RotateCw size={13} /> Un exemple au dos</span>
        </span>
        <span className="lvf-face back">
          <span className="lvf-top"><span>{lv.title} · {m.name}</span><span>Exemple</span></span>
          <span className="lvf-q">{k.q}</span>
          <span className="lvf-opts">{k.opts.map((o, i) => <span key={o} className={i === k.ok ? 'ok' : ''}>{i === k.ok && <Check size={14} />}{o}</span>)}</span>
          <span className="lvf-sub">{subjects.length} matières, dont</span>
          <span className="lvf-tags">{subjects.slice(0, 4).map(su => <span key={su.id}>{meta(su.id).name}</span>)}</span>
          <span className="lvf-foot">{full ? 'Toutes les notions de l’année sont jouables.' : 'Programme cadré, premières leçons de découverte.'}</span>
        </span>
      </span>
    </button>
  )
}

export default function Landing() {
  // Le site navigue avec « # » : on fait défiler vers la section au lieu de changer de page
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const { account, mode, loginDemo } = useStore()
  const nav = useNavigate()
  const cta = account ? (mode === 'parent' ? '/parent' : '/profils') : '/inscription'
  const ce1 = levelStats('ce1')
  const ce2 = levelStats('ce2')
  return (
    <div>
      <header className="top"><div className="in">
        <Logo />
        <nav aria-label="Sections"><a href="#parents" onClick={go("parents")}>Parents</a><a href="#enfants" onClick={go("enfants")}>Enfants</a><a href="#niveaux" onClick={go("niveaux")}>Niveaux</a><a href="#enseignants" onClick={go("enseignants")}>Enseignants</a><a href="#faq" onClick={go("faq")}>Questions</a></nav>
        <div className="grow" />
        {account ? <Link className="btn sm" to={cta}>Mon espace</Link> : <><Link className="btn quiet sm" to="/connexion">Connexion</Link><Link className="btn sm" to="/inscription">Créer un compte</Link></>}
      </div></header>

      <section className="hero"><div className="in">
        <div>
          <span className="eyebrow">Du CE1 au CM2 · programmes officiels</span>
          <h1 className="h-xl">Apprendre en s’amusant, progresser en confiance.</h1>
          <p className="lead mt16">Des leçons de quelques minutes, alignées sur les programmes de l’école. L’enfant joue et avance à son rythme ; ses parents, et son enseignant s’ils le souhaitent, suivent ses progrès.</p>
          <ul className="who mt24">
            <li><span className="who-ic kid"><Sparkles size={20} /></span><div><b>Pour l’enfant</b><span>De petites aventures, des étoiles à gagner et un indice quand il se trompe. Jamais de punition.</span></div></li>
            <li><span className="who-ic par"><HeartHandshake size={20} /></span><div><b>Pour les parents</b><span>Un suivi clair chaque semaine : temps passé, réussite, notions à revoir.</span></div></li>
            <li><span className="who-ic tea"><School size={20} /></span><div><b>Pour l’enseignant</b><span>Un code de classe pour suivre les élèves dont la famille a donné son accord.</span></div></li>
          </ul>
          <div className="wrap mt24">
            <Link className="btn lg" to={cta}>Créer un compte parent</Link>
            <button className="btn lg ghost" onClick={async () => { await loginDemo(); nav('/parent') }}>Voir une démonstration</button>
          </div>
          <Link to="/enseignant/inscription" className="small mt16" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Vous êtes enseignant ? Créer votre classe <ArrowRight size={16} /></Link>
        </div>

        <div className="hero-art-wrap">
          <div className="hero-art">
            <FlipCard className="a-kid" label="côté enfant" front={<>
              <div className="row" style={{ gap: 10 }}><img className="kid-av" src={avatarSrc('princesse')} alt="" /><div className="col" style={{ gap: 2 }}><span className="role kid" style={{ alignSelf: 'flex-start' }}>Côté enfant</span><b className="small">Mila, 7 ans</b></div></div>
              <div className="row mt8"><span className="pill teal">Mathématiques</span><span className="grow" /><Stars n={2} size={16} /></div>
              <h3 style={{ margin: '10px 0 8px' }}>Combien font 240 + 130 ?</h3>
              <div className="opts">
                <div className="opt ko" style={{ opacity: .6, textDecoration: 'line-through' }}>380</div>
                <div className="opt ok">370</div>
              </div>
              <div className="hint mt8"><Lightbulb size={16} /> Indice : 240 + 100, puis encore + 30.</div>
            </>} back={<>
              <div className="row" style={{ gap: 10 }}><img className="kid-av" src={avatarSrc('dragon')} alt="" /><div className="col" style={{ gap: 2 }}><span className="role kid" style={{ alignSelf: 'flex-start' }}>Côté enfant</span><b className="small">Hugo, 9 ans</b></div></div>
              <div className="row mt8"><span className="pill" style={{ background: '#E4EEFB', color: '#1F4F95' }}>Anglais</span><span className="grow" /><Stars n={3} size={16} /></div>
              <h3 style={{ margin: '10px 0 8px' }}>Comment dit-on « un chat » ?</h3>
              <div className="opts">
                <div className="opt">a dog</div>
                <div className="opt ok">a cat</div>
              </div>
              <div className="hint mt8 good"><Volume2 size={16} /> Bravo ! Écoute : « a cat ».</div>
            </>} />
            <FlipCard className="a-par" label="côté parent" front={<>
              <span className="role par">Côté parent</span>
              <div className="row mt8" style={{ gap: 8 }}><b style={{ whiteSpace: 'nowrap' }}>Mila · CE1</b><span className="grow" /><span className="pill green" style={{ whiteSpace: 'nowrap' }}><ArrowUp size={12} /> 12 pts</span></div>
              <div className="mini3 mt8">
                <div><small>Temps</small><b>28 min</b></div>
                <div><small>Réussite</small><b>89 %</b></div>
              </div>
              <Spark values={[52, 58, 55, 66, 70, 74, 81, 88]} w={250} h={44} />
              <div className="tiny muted">À revoir : la soustraction posée</div>
            </>} back={<>
              <span className="role par">Côté parent</span>
              <div className="row mt8" style={{ gap: 8 }}><b style={{ whiteSpace: 'nowrap' }}>Mila · sa semaine</b><span className="grow" /><span className="pill gold" style={{ whiteSpace: 'nowrap' }}><Ico e="🔥" /> 6 j</span></div>
              <div className="week mt8">
                {[['L', 12], ['M', 8], ['M', 15], ['J', 0], ['V', 10], ['S', 20], ['D', 6]].map(([d, m], i) => (
                  <div key={i}><i style={{ height: `${(m as number) * 2.4 + 3}px` }} className={i === 5 ? 'on' : ''} /><small>{d}</small></div>
                ))}
              </div>
              <div className="tiny muted mt8">Point fort : <b style={{ color: 'var(--ink)' }}>la table de 3</b></div>
            </>} />
            <FlipCard className="a-tea" label="côté enseignant" front={<>
              <span className="role tea">Côté enseignant</span>
              <div className="row mt8"><b>CE1 A</b><span className="grow" /><span className="code">TIL3CE</span></div>
              <div className="small mt8"><b>7 / 10</b> élèves actifs cette semaine</div>
              <div className="tiny muted mt8">Notion à retravailler en classe :<br /><b style={{ color: 'var(--ink)' }}>Poser une addition</b> · 4 élèves</div>
            </>} back={<>
              <span className="role tea">Côté enseignant</span>
              <div className="row mt8"><b>CE1 A · élèves</b></div>
              <div className="studs mt8">
                <div><span className="ini">I</span>Inès<em className="up">92 %</em></div>
                <div><span className="ini">L</span>Lucas<em>78 %</em></div>
                <div><span className="ini">N</span>Nathan<em className="idle">inactif 9 j</em></div>
              </div>
            </>} />
          </div>
          <p className="tiny muted center mt8 flip-tip">Survolez ou touchez une carte pour la retourner</p>
        </div>
      </div></section>

      <div className="trust">
        <span><BookOpenCheck size={20} /> Programmes officiels</span>
        <span><EyeOff size={20} /> Aucune publicité</span>
        <span><ShieldCheck size={20} /> Données réservées à la famille</span>
        <span><Coffee size={20} /> Pauses proposées, pas d’achat intégré</span>
      </div>

      <section className="section" id="comment"><div className="in">
        <span className="eyebrow">Comment ça marche</span>
        <h2 className="h-lg mb16">Trois étapes, cinq minutes</h2>
        <div className="grid3">
          <div className="step"><div className="n">1</div><h3>Le parent crée un compte</h3><p className="muted">Puis ajoute un profil par enfant : un prénom, une classe et un avatar. C’est tout.</p></div>
          <div className="step"><div className="n">2</div><h3>L’enfant joue et apprend</h3><p className="muted">Des leçons de quelques minutes, des indices avant la correction, des étoiles et des récompenses.</p></div>
          <div className="step"><div className="n">3</div><h3>Le parent suit l’évolution</h3><p className="muted">Temps passé, réussite, notions acquises et points à consolider, dans un tableau de bord lisible.</p></div>
        </div>
      </div></section>

      <section className="section alt" id="enfants"><div className="in">
        <span className="eyebrow">Pour les enfants</span>
        <h2 className="h-lg mb16">Motivant, sans pression</h2>
        <div className="grid3">
          <div className="feat"><div className="ic"><Ico e="⭐" color="currentColor" /></div><h3>Des étoiles pour progresser</h3><p className="muted">Jusqu’à trois étoiles par leçon, selon les réussites au premier essai.</p></div>
          <div className="feat"><div className="ic"><Ico e="🔥" color="currentColor" /></div><h3>Des séries qui pardonnent</h3><p className="muted">Les jokers de série protègent d’un jour manqué. Pas de culpabilité.</p></div>
          <div className="feat"><div className="ic"><Ico e="🎁" color="currentColor" /></div><h3>Des coffres et des badges</h3><p className="muted">Avatars et cadres à débloquer au fil des efforts.</p></div>
          <div className="feat"><div className="ic"><Ico e="💡" color="currentColor" /></div><h3>Un indice avant la solution</h3><p className="muted">Après une erreur, un indice et une deuxième chance. Puis une explication claire.</p></div>
          <div className="feat"><div className="ic"><Ico e="🔁" color="currentColor" /></div><h3>Des rappels espacés</h3><p className="muted">Les notions déjà vues reviennent après quelques jours pour s’ancrer.</p></div>
          <div className="feat"><div className="ic"><Ico e="🔤" color="currentColor" /></div><h3>Accessible</h3><p className="muted">Police adaptée à la dyslexie, taille du texte réglable, lecture à voix haute.</p></div>
        </div>
      </div></section>

      <section className="section" id="parents"><div className="in">
        <span className="eyebrow">Pour les parents</span>
        <h2 className="h-lg mb16">Un suivi honnête et utile</h2>
        <div className="grid2">
          <ParentShots />
        </div>
      </div></section>

      <section className="section alt" id="niveaux"><div className="in">
        <span className="eyebrow">Programme</span>
        <h2 className="h-lg mb8">Du CE1 au CM2</h2>
        <p className="lead mb16">Le CE1 ({ce1.lessons} leçons) et le CE2 ({ce2.lessons} leçons) sont complets. Le CM1 et le CM2 s’enrichissent : leur programme est cadré et les premières leçons de découverte sont jouables.</p>
        <div className="lvl-grid">
          {LEVELS.map(l => <LevelFlip key={l.id} id={l.id} />)}
        </div>
      </div></section>

      <section className="section" id="enseignants"><div className="in">
        <div className="card teach-band">
          <div className="grow" style={{ minWidth: 260 }}>
            <span className="eyebrow">Enseignants</span>
            <h2 className="h-lg mb8">Suivez votre classe</h2>
            <p className="lead">Créez une classe, donnez son code aux familles, et voyez en un coup d’œil qui avance, qui décroche et quelles notions retravailler ensemble.</p>
          </div>
          <div className="col gap8" style={{ minWidth: 220 }}>
            <Link className="btn lg" to="/enseignant/inscription">Créer un compte enseignant</Link>
            <Link className="btn ghost" to="/enseignant/connexion">Connexion enseignant</Link>
          </div>
        </div>
      </div></section>

      <section className="section" id="faq"><div className="in faq" style={{ maxWidth: 760 }}>
        <h2 className="h-lg mb16">Questions fréquentes</h2>
        <details><summary>Quelles données sont collectées ?</summary><p>Un prénom ou pseudo, une classe et la progression dans les leçons, rien de plus. Ces données sont enregistrées sur un serveur sécurisé et ne sont visibles que par le compte parent, et par l’enseignant si le parent a saisi son code de classe.</p></details>
        <details><summary>Mon enfant peut-il accéder à l’espace parent ?</summary><p>Non : l’espace parent est protégé par votre code parent à 4 chiffres. L’enfant ouvre son propre profil en touchant simplement son avatar.</p></details>
        <details><summary>Est-ce conforme aux programmes ?</summary><p>Les leçons suivent les thèmes des programmes officiels de l’élémentaire. EDUFUN est un complément et ne remplace pas l’école ni une évaluation.</p></details>
        <details><summary>Que se passe-t-il si mon enfant se trompe ?</summary><p>Il reçoit un indice et une seconde chance. S’il se trompe encore, l’explication s’affiche et l’exercice revient plus tard.</p></details>
        <details><summary>Peut-on suivre plusieurs enfants ?</summary><p>Oui, avec un profil par enfant et une vue d’ensemble pour la famille.</p></details>
        <details><summary>Les données sont-elles synchronisées entre appareils ?</summary><p>Oui. En vous connectant avec le même compte, vous retrouvez la progression sur tous vos appareils. Vous pouvez aussi exporter la progression d’un enfant.</p></details>
      </div></section>

      <footer className="footer"><div className="in">
        <div className="row wrap" style={{ alignItems: 'flex-start' }}>
          <div className="grow"><b style={{ color: '#fff', fontSize: '1.2rem' }}>EDUFUN</b><p className="small mt8">Une plateforme éducative pour les enfants du CE1 au CM2.</p></div>
          <div style={{ maxWidth: 420 }}>
            <details className="srcs">
              <summary>Sources officielles</summary>
              <ul className="small" style={{ paddingLeft: 18 }}>{Object.values(SOURCES).slice(0, 5).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
              <Link to="/confidentialite" className="small" style={{ color: '#fff' }}>Toutes les sources</Link>
            </details>
            <Link to="/confidentialite" className="small" style={{ color: '#fff', display: 'inline-block', marginTop: 8 }}>Confidentialité</Link></div>
        </div>
      </div></footer>
    </div>
  )
}
