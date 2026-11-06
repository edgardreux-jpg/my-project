import type React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, BookOpenCheck, EyeOff, Coffee, LineChart as LC, Sparkles, HeartHandshake, School, ArrowRight, ArrowUp, Lightbulb, Volume2 } from 'lucide-react'
import { Logo, Spark } from '../components/common'
import { Ico, Stars } from '../components/Icon'
import { LEVELS, SOURCES, levelStats } from '../lib/curriculum'
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
          <div className="col">
            <div className="feat"><div className="ic"><LC size={24} /></div><h3>L’évolution, semaine après semaine</h3><p className="muted">Temps passé, réussite au premier essai, jours actifs, comparés à la période précédente.</p></div>
            <div className="feat"><div className="ic"><Ico e="🎯" color="currentColor" /></div><h3>Les notions à consolider</h3><p className="muted">EDUFUN repère les thèmes où l’enfant bute, pour l’aider au bon moment.</p></div>
            <div className="feat"><div className="ic"><Ico e="🛡️" color="currentColor" /></div><h3>Vous gardez la main</h3><p className="muted">Matières visibles, objectif du jour, pauses, leçons proposées, export et suppression des données.</p></div>
          </div>
          <div className="card"><h3>Ce que vous verrez</h3>
            <div className="kpis" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {[['1 h 20', 'cette semaine'], ['84 %', 'réussite 1er essai'], ['6 / 7', 'jours actifs'], ['12', 'notions acquises']].map(([v, l]) => <div key={l} className="card flat kpi"><div className="v">{v}</div><div className="l">{l}</div></div>)}
            </div>
            <p className="tiny muted mt16">Exemple fictif. Les chiffres réels dépendent des séances terminées.</p>
          </div>
        </div>
      </div></section>

      <section className="section alt" id="niveaux"><div className="in">
        <span className="eyebrow">Programme</span>
        <h2 className="h-lg mb8">Du CE1 au CM2</h2>
        <p className="lead mb16">Le CE1 ({ce1.lessons} leçons) et le CE2 ({ce2.lessons} leçons) sont complets. Le CM1 et le CM2 s’enrichissent : leur programme est cadré et les premières leçons de découverte sont jouables.</p>
        <div className="grid4">
          {LEVELS.map(l => { const s = levelStats(l.id); return (
            <div key={l.id} className="card lvl-card"><div className="big">{l.title}</div><div className="muted small">{l.ages}</div>
              <div className="mt8"><b>{s.themes}</b> <span className="small muted">thèmes au programme</span></div>
              <div><b>{s.lessons}</b> <span className="small muted">leçons jouables</span></div>
              <span className={`pill mt8 ${l.id === 'ce1' || l.id === 'ce2' ? 'green' : 'gold'}`}>{l.id === 'ce1' || l.id === 'ce2' ? 'Programme complet' : 'En construction'}</span></div>
          ) })}
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
        <details><summary>Mon enfant peut-il accéder à l’espace parent ?</summary><p>Non : l’espace parent est protégé par votre code parent à 4 chiffres. L’enfant ouvre son propre profil en touchant son avatar, ou avec un code secret si vous en activez un.</p></details>
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
