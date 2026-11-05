import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, BookOpenCheck, EyeOff, HardDrive, LineChart as LC } from 'lucide-react'
import { Logo, Spark } from '../components/common'
import { LEVELS, SOURCES, levelStats } from '../lib/curriculum'
import { useStore } from '../state/store'

export default function Landing() {
  const { account, mode, loginDemo } = useStore()
  const nav = useNavigate()
  const cta = account ? (mode === 'parent' ? '/parent' : '/profils') : '/inscription'
  const ce1 = levelStats('ce1')
  return (
    <div>
      <header className="top"><div className="in">
        <Logo />
        <nav aria-label="Sections"><a href="#parents">Parents</a><a href="#enfants">Enfants</a><a href="#niveaux">Niveaux</a><a href="#faq">Questions</a></nav>
        <div className="grow" />
        {account ? <Link className="btn sm" to={cta}>Mon espace</Link> : <><Link className="btn quiet sm" to="/connexion">Connexion</Link><Link className="btn sm" to="/inscription">Créer un compte</Link></>}
      </div></header>

      <section className="hero"><div className="in">
        <div>
          <span className="eyebrow">Du CE1 au CM2</span>
          <h1 className="h-xl">Apprendre en jouant, avec un suivi clair pour les parents.</h1>
          <p className="lead mt16">Des leçons courtes et motivantes, alignées sur les programmes de l’école élémentaire. Les enfants avancent à leur rythme, les parents voient leurs progrès semaine après semaine.</p>
          <div className="wrap mt24">
            <Link className="btn lg" to={cta}>Commencer gratuitement</Link>
            <button className="btn lg ghost" onClick={async () => { await loginDemo(); nav('/parent') }}>Voir une démonstration</button>
          </div>
          <p className="small muted mt16">Sans publicité. Sans collecte inutile. Un prénom, une classe, un code secret.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="a" style={{ left: 0, top: 10, width: 300, transform: 'rotate(-3deg)' }}>
            <div className="row"><span className="pill teal">Mathématiques</span><span className="grow" /><span>⭐⭐⭐</span></div>
            <h3 style={{ margin: '12px 0 8px' }}>Combien font 240 + 130 ?</h3>
            <div className="opts">
              <div className="opt">380</div><div className="opt ok">370</div>
            </div>
            <div className="bar mt16"><i style={{ width: '60%', background: 'var(--green)' }} /></div>
          </div>
          <div className="a" style={{ right: 0, top: 150, width: 290, transform: 'rotate(2deg)' }}>
            <div className="row"><b>Mila · CE1</b><span className="grow" /><span className="pill green">▲ 12 pts</span></div>
            <div className="small muted mt8">Réussite au premier essai</div>
            <Spark values={[52, 58, 55, 66, 70, 74, 81, 88]} w={250} h={60} />
            <div className="row mt8"><span className="pill gold">🔥 6 jours</span><span className="pill">1 h 20 cette semaine</span></div>
          </div>
          <div className="a" style={{ left: 40, bottom: 0, width: 240 }}>
            <div className="small muted">Maîtrise</div>
            <div className="stack-bar mt8"><i style={{ width: '45%', background: '#2E8B57' }} /><i style={{ width: '25%', background: '#7CC79A' }} /><i style={{ width: '15%', background: '#F5C65D' }} /></div>
            <div className="tiny muted mt8">Nombres et calculs</div>
          </div>
        </div>
      </div></section>

      <div className="trust">
        <span><BookOpenCheck size={20} /> Programmes officiels</span>
        <span><EyeOff size={20} /> Aucune publicité</span>
        <span><ShieldCheck size={20} /> Données minimales</span>
        <span><HardDrive size={20} /> Données conservées sur l’appareil</span>
      </div>

      <section className="section" id="comment"><div className="in">
        <span className="eyebrow">Comment ça marche</span>
        <h2 className="h-lg mb16">Trois étapes, cinq minutes</h2>
        <div className="grid3">
          <div className="step"><div className="n">1</div><h3>Le parent crée un compte</h3><p className="muted">Puis ajoute un profil par enfant : prénom, classe, code secret à 4 chiffres.</p></div>
          <div className="step"><div className="n">2</div><h3>L’enfant joue et apprend</h3><p className="muted">Des leçons de quelques minutes, des indices avant la correction, des étoiles et des récompenses.</p></div>
          <div className="step"><div className="n">3</div><h3>Le parent suit l’évolution</h3><p className="muted">Temps passé, réussite, notions acquises et points à consolider, dans un tableau de bord lisible.</p></div>
        </div>
      </div></section>

      <section className="section alt" id="enfants"><div className="in">
        <span className="eyebrow">Pour les enfants</span>
        <h2 className="h-lg mb16">Motivant, sans pression</h2>
        <div className="grid3">
          <div className="feat"><div className="ic">⭐</div><h3>Des étoiles pour progresser</h3><p className="muted">Jusqu’à trois étoiles par leçon, selon les réussites au premier essai.</p></div>
          <div className="feat"><div className="ic">🔥</div><h3>Des séries qui pardonnent</h3><p className="muted">Les gels de série protègent d’un jour manqué. Pas de culpabilité.</p></div>
          <div className="feat"><div className="ic">🎁</div><h3>Des coffres et des badges</h3><p className="muted">Avatars et cadres à débloquer au fil des efforts.</p></div>
          <div className="feat"><div className="ic">💡</div><h3>Un indice avant la solution</h3><p className="muted">Après une erreur, un indice et une deuxième chance. Puis une explication claire.</p></div>
          <div className="feat"><div className="ic">🔁</div><h3>Des rappels espacés</h3><p className="muted">Les notions déjà vues reviennent après quelques jours pour s’ancrer.</p></div>
          <div className="feat"><div className="ic">🔤</div><h3>Accessible</h3><p className="muted">Police adaptée à la dyslexie, taille du texte réglable, lecture à voix haute.</p></div>
        </div>
      </div></section>

      <section className="section" id="parents"><div className="in">
        <span className="eyebrow">Pour les parents</span>
        <h2 className="h-lg mb16">Un suivi honnête et utile</h2>
        <div className="grid2">
          <div className="col">
            <div className="feat"><div className="ic"><LC size={24} /></div><h3>L’évolution, semaine après semaine</h3><p className="muted">Temps passé, réussite au premier essai, jours actifs, comparés à la période précédente.</p></div>
            <div className="feat"><div className="ic">🎯</div><h3>Les notions à consolider</h3><p className="muted">Pépite repère les thèmes où l’enfant bute, pour l’aider au bon moment.</p></div>
            <div className="feat"><div className="ic">🛡️</div><h3>Vous gardez la main</h3><p className="muted">Matières visibles, objectif du jour, pauses, leçons proposées, export et suppression des données.</p></div>
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
        <p className="lead mb16">Le CE1 est disponible avec {ce1.lessons} leçons et {ce1.exercises.toLocaleString('fr-FR')} exercices. Le CE2, le CM1 et le CM2 s’enrichissent : leur programme est cadré et les premières leçons de découverte sont jouables.</p>
        <div className="grid4">
          {LEVELS.map(l => { const s = levelStats(l.id); return (
            <div key={l.id} className="card lvl-card"><div className="big">{l.title}</div><div className="muted small">{l.ages}</div>
              <div className="mt8"><b>{s.themes}</b> <span className="small muted">thèmes au programme</span></div>
              <div><b>{s.lessons}</b> <span className="small muted">leçons jouables</span></div>
              <span className={`pill mt8 ${l.id === 'ce1' ? 'green' : 'gold'}`}>{l.id === 'ce1' ? 'Programme complet' : 'En construction'}</span></div>
          ) })}
        </div>
      </div></section>

      <section className="section" id="faq"><div className="in faq" style={{ maxWidth: 760 }}>
        <h2 className="h-lg mb16">Questions fréquentes</h2>
        <details><summary>Quelles données sont collectées ?</summary><p>Un prénom ou pseudo, une classe et la progression dans les leçons. Dans cette version, tout est conservé sur l’appareil, rien n’est transmis.</p></details>
        <details><summary>Mon enfant peut-il accéder à l’espace parent ?</summary><p>Non sans le mot de passe du compte. Le profil enfant s’ouvre avec un code secret à 4 chiffres.</p></details>
        <details><summary>Est-ce conforme aux programmes ?</summary><p>Les leçons suivent les thèmes des programmes officiels de l’élémentaire. Pépite est un complément et ne remplace pas l’école ni une évaluation.</p></details>
        <details><summary>Que se passe-t-il si mon enfant se trompe ?</summary><p>Il reçoit un indice et une seconde chance. S’il se trompe encore, l’explication s’affiche et l’exercice revient plus tard.</p></details>
        <details><summary>Peut-on suivre plusieurs enfants ?</summary><p>Oui, avec un profil par enfant et une vue d’ensemble pour la famille.</p></details>
        <details><summary>Les données sont-elles synchronisées entre appareils ?</summary><p>Pas encore. Elles restent sur l’appareil utilisé. Vous pouvez exporter la progression d’un enfant.</p></details>
      </div></section>

      <footer className="footer"><div className="in">
        <div className="row wrap" style={{ alignItems: 'flex-start' }}>
          <div className="grow"><b style={{ color: '#fff', fontSize: '1.2rem' }}>Pépite</b><p className="small mt8">Une plateforme éducative pour les enfants du CE1 au CM2.</p></div>
          <div style={{ maxWidth: 420 }}><b style={{ color: '#fff' }}>Sources officielles</b>
            <ul className="small" style={{ paddingLeft: 18 }}>{Object.values(SOURCES).slice(0, 5).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
            <Link to="/confidentialite" style={{ color: '#fff' }}>Confidentialité et toutes les sources</Link></div>
        </div>
      </div></footer>
    </div>
  )
}
