import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'

const projects = {
  urban: {
    path: '/opportunities/urban-apartment-house',
    eyebrow: 'LIVE OPPORTUNITY · REFERENCE 01',
    title: 'Urban Apartment', italic: 'House.',
    summary: "An upper-envelope concept for Formara's focused development strategy: a meaningful apartment count, controlled footprint, and a clear sale-led exit.",
    hero: '/assets/zm2-hero.jpg', gallery: '/assets/zm2-view-02.jpg',
    badges: ['OPEN FOR INVESTMENT', '14 APARTMENTS', 'PRIVATE SPV', 'CAPITAL AT RISK'],
    area: '738.6 m²', units: '14 homes', range: '20-28%', phase: 'Construction',
    download: '/downloads/formara-urban-apartments-teaser.pdf',
    thesis: 'A compact apartment development sized for a controllable build programme and a clean sale-led exit.',
    fundingTarget: 380000, fundingRaised: 247000, investors: 31, daysLeft: 38,
    returnRate: '21%', duration: '18 months', status: 'OPEN',
    ltv: '58%', mortgageRank: 'First-ranking', valuationType: 'Independent MRICS valuation',
    collateral: 'First-ranking mortgage on project land title, personal guarantee from development principal, independent cost monitoring throughout the construction programme.',
    loanType: 'Senior secured development loan',
    security: [
      {layer:'First-ranking mortgage', detail:'Registered charge over the project land title. In an enforcement scenario, the mortgage holder is repaid before any unsecured creditor.'},
      {layer:'Personal guarantee', detail:'The development principal provides a personal guarantee, creating direct recourse beyond the SPV in the event of project failure.'},
      {layer:'Independent valuation', detail:'An independent MRICS valuation was completed at the point of site acquisition. Loan-to-value ratio: 58%.'},
      {layer:'Escrow & milestone drawdowns', detail:'Capital is held in a dedicated project escrow account. Funds are released only against signed construction milestones — not advanced in bulk to the developer.'},
      {layer:'Construction all-risk insurance', detail:'A named construction all-risk policy covers sudden physical loss or damage to the works. Investors are noted as interested parties on the policy.'},
      {layer:'Independent cost monitor', detail:'A chartered quantity surveyor reviews cost reports at each milestone before drawdown approval. No milestone is signed off without their written confirmation.'},
    ],
  },
  infill: {
    path: '/opportunities/compact-infill-house',
    eyebrow: 'CLOSED OPPORTUNITY · REFERENCE 02',
    title: 'Compact Infill', italic: 'House.',
    summary: "A repeatable building language for constrained urban plots, adaptable toward Formara's 550-1,200 m² development range.",
    hero: '/assets/zm1-view-02.jpg', gallery: '/assets/zm1-hero.jpg',
    badges: ['FULLY FUNDED', 'URBAN INFILL', 'IN PROGRESS', 'CAPITAL AT RISK'],
    area: '550-1,200 m²', units: 'Site-led', range: '18-24%', phase: 'Pre-development',
    download: '/downloads/formara-compact-infill-teaser.pdf',
    thesis: 'Modular thinking creates a disciplined starting point while every scheme remains site-specific.',
    fundingTarget: 220000, fundingRaised: 220000, investors: 18, daysLeft: 0,
    returnRate: '18%', duration: '14 months', status: 'FUNDED',
    ltv: '52%', mortgageRank: 'First-ranking', valuationType: 'Independent valuation',
    collateral: 'First-ranking mortgage on project land, independent valuation report, escrow account for construction drawdowns.',
    loanType: 'Senior secured development loan',
    security: [
      {layer:'First-ranking mortgage', detail:'Registered charge over the project land title. LTV: 52% against independent valuation.'},
      {layer:'Escrow drawdowns', detail:'Construction capital was held in escrow and released against milestone completions signed off by the independent monitor.'},
      {layer:'Independent cost monitor', detail:'Quarterly cost reviews completed by a chartered quantity surveyor throughout the construction programme.'},
      {layer:'Construction insurance', detail:'Construction all-risk policy in place for the full build duration, naming investors as interested parties.'},
    ],
  },
  courtyard: {
    path: '/opportunities/private-courtyard-residences',
    eyebrow: 'PIPELINE OPPORTUNITY · REFERENCE 03',
    title: 'Private Courtyard', italic: 'Residences.',
    summary: 'A low-density apartment model organised around a secure landscaped plot, family privacy and a clear quality premium.',
    hero: '/assets/zm2-view-02.jpg', gallery: '/assets/zm2-hero.jpg',
    badges: ['PIPELINE Q4 2026', 'FENCED PLOT', 'FAMILY-FOCUSED', 'CAPITAL AT RISK'],
    area: '650-950 m²', units: '10-16 homes', range: '21-27%', phase: 'Pipeline model',
    download: '/downloads/formara-urban-apartments-teaser.pdf',
    thesis: 'A protected courtyard, controlled access and useful shared landscape create a differentiated family product without excessive amenity cost.',
    fundingTarget: 310000, fundingRaised: 0, investors: 0, daysLeft: null,
    returnRate: '24%', duration: '20 months', status: 'PIPELINE',
    ltv: 'TBC', mortgageRank: 'First-ranking (planned)', valuationType: 'Pending site acquisition',
    collateral: 'Security structure to be documented upon site acquisition. First-ranking mortgage expected.',
    loanType: 'Senior secured development loan',
    security: [
      {layer:'First-ranking mortgage (planned)', detail:'On site acquisition, a first-ranking mortgage will be registered over the title as the primary investor security.'},
      {layer:'Independent valuation', detail:'An independent MRICS valuation will be commissioned before investment opens. LTV ceiling: 65%.'},
      {layer:'Escrow & milestone drawdowns', detail:'The same escrow and milestone structure used on Reference 01 and 02 will apply.'},
    ],
  },
  garden: {
    path: '/opportunities/smart-garden-apartments',
    eyebrow: 'PIPELINE OPPORTUNITY · REFERENCE 04',
    title: 'Smart Garden', italic: 'Apartments.',
    summary: 'A compact smart-building concept pairing efficient apartments with private outdoor space and practical resident technology.',
    hero: '/assets/zm1-hero.jpg', gallery: '/assets/zm1-view-02.jpg',
    badges: ['PIPELINE Q2 2027', 'SMART ACCESS', 'PRIVATE GARDENS', 'CAPITAL AT RISK'],
    area: '550-850 m²', units: '8-14 homes', range: '18-25%', phase: 'Pipeline model',
    download: '/downloads/formara-compact-infill-teaser.pdf',
    thesis: 'Smaller homes, efficient systems and considered outdoor space target a broad owner-occupier market while protecting construction discipline.',
    fundingTarget: 280000, fundingRaised: 0, investors: 0, daysLeft: null,
    returnRate: '21%', duration: '16 months', status: 'PIPELINE',
    ltv: 'TBC', mortgageRank: 'First-ranking (planned)', valuationType: 'Pending site acquisition',
    collateral: 'Security structure to be documented upon site acquisition.',
    loanType: 'Senior secured development loan',
    security: [
      {layer:'First-ranking mortgage (planned)', detail:'Site-specific security structure will be documented and published before investment opens.'},
      {layer:'Independent valuation', detail:'Valuation and LTV ceiling to be confirmed at feasibility stage.'},
    ],
  },
}

const pipelineProjects = [
  {name:'Niš Courtyard 01', window:'2026-2027', progress:22, status:'PLOT SHORTLIST', current:'Title and planning review', next:'Commercial terms and concept feasibility', steps:[1,1,0,0,0,0]},
  {name:'Niš Garden 02', window:'2027-2028', progress:8, status:'SOURCING', current:'Micro-location screening', next:'Identify a controlled plot', steps:[1,0,0,0,0,0]},
  {name:'Niš Smart Court 03', window:'2028-2029', progress:3, status:'STRATEGIC PIPELINE', current:'Demand and product mapping', next:'Build acquisition brief', steps:[0,0,0,0,0,0]},
]

const platformStats = [
  {label:'CAPITAL DEPLOYED', value:'€467k', note:'Across open projects'},
  {label:'REGISTERED INVESTORS', value:'49', note:'Qualified participants'},
  {label:'PROJECT DEFAULTS', value:'0', note:'Since inception — clean record'},
  {label:'AVG TARGET RETURN', value:'21%', note:'Gross, end of term'},
]

const closedStats = [
  {label:'Reference 02 — Compact Infill House', status:'FULLY FUNDED', raised:'€220k', investors:18, returnRate:'18%', duration:'14 months', outcome:'In progress'},
]

const faqItems = [
  {q:'What is the minimum investment?', a:'The minimum commitment per project is €50,000. Larger commitments qualify for higher illustrative return tiers, from 18% at €50k up to 30% for €400k and above.'},
  {q:'How are my returns generated?', a:'Returns come from apartment sales proceeds. When completed units are sold, proceeds first cover project costs and obligations, then investor distributions are made according to the SPV documents.'},
  {q:'What is an SPV and why is it used?', a:"A Special Purpose Vehicle is a separate legal entity created for each project. It ring-fences each development's assets and liabilities, keeping your investment isolated from any other project or company activity."},
  {q:'How is my capital protected?', a:'Each project uses first-ranking mortgage security over the development land, independent cost monitoring, milestone-based drawdowns and professional cover for key advisers. Property development involves real risk and your capital is not guaranteed.'},
  {q:'When do I receive returns?', a:'Returns are distributed after apartment sales complete and project obligations are settled. The timeline depends on construction and sales velocity — typically 12 to 24 months from capital deployment.'},
  {q:'Can I exit early?', a:'This is not a liquid investment. There is currently no secondary market for Formara project interests. Invest only capital you can commit for the full project duration.'},
  {q:'Who manages the projects?', a:'Formara Property Capital sources, structures and oversees each development. Construction is managed by licensed contractors under independent supervision with milestone sign-offs.'},
  {q:'Is Formara regulated?', a:'Formara Property Capital is a concept-stage platform. All live investment activity requires appropriate regulatory registration, licensed advisers and compliance with Serbian financial law before investor funds are accepted.'},
  {q:'How do I access project documents?', a:'Documents are released in stages. Registered investors receive a project teaser. After a qualification call and approval, detailed documents and data-room materials are available through the investor portal.'},
  {q:'What happens if a project fails?', a:'The security structure — mortgage and guarantees — would be enforced to recover investor capital to the extent possible. Development failure can result in significant or total loss of capital.'},
]

const blogPosts = [
  {slug:'understanding-spv-structures', date:'14 Oct 2026', category:'INVESTOR EDUCATION', image:'/assets/formara-investor-meeting.png', title:'Understanding SPV investment structures', excerpt:'A Special Purpose Vehicle keeps each development isolated — protecting your capital from unrelated projects while creating a clear, auditable record of every cost and distribution.', body:"When you invest in a property development project through a Special Purpose Vehicle, you are not investing in the development company itself. You are investing in a separate legal entity created for one project only. That entity owns the development land, holds the construction contract, receives sales proceeds and makes distributions.\n\nThis structure protects investors in several important ways. First, it isolates the project from the developer's other activities. Second, it creates a clean financial record — every cost, every payment, every distribution flows through one ledger. Third, it simplifies security enforcement: if the project fails, the security holder can take action against the SPV's specific assets without navigating a larger corporate structure.\n\nThe trade-off is complexity. SPVs require legal formation, accounting and dissolution. But for a private capital investment of €50,000 or more, that administration cost is proportionate to the protection it provides."},
  {slug:'nis-apartment-market-2026', date:'28 Sep 2026', category:'MARKET ANALYSIS', image:'/assets/formara-hero-v2.png', title:'Niš apartment market: what buyers want in 2026', excerpt:'A practical read of Niš buyer behaviour, pricing signals and the product gap Formara is targeting — without the headline-only optimism common in developer marketing.', body:"Niš apartment buyers in 2026 are navigating a market where new-build pricing has risen steadily, yet supply quality has not always followed. Published data suggests new-build pricing sits in a €1,700 to €2,300 per m² range across the city, with premium micro-locations and better-specified buildings pushing toward €2,800 to €3,200 per m².\n\nThe gap Formara is targeting is between the standard developer offer and what a family buyer genuinely needs: controlled access, practical outdoor space, fewer neighbours and a building designed from the buyer's perspective rather than the developer's profit model.\n\nGetting to a premium above the city average requires evidence — real reservations, real comparable sales and honest absorption tracking — not just marketing positioning. The product thesis is only proved when buyers pay the price."},
  {slug:'how-we-underwrite-a-project', date:'5 Sep 2026', category:'DEVELOPMENT PROCESS', image:'/assets/formara-construction.png', title:'How Formara underwrites a development project', excerpt:'Six questions every potential site must answer before Formara invests time, capital or reputation in a development opportunity.', body:"Every development project starts with a site. But a site is not an opportunity until it passes a structured filter.\n\nThe first question is product fit: can this plot support apartments a real Niš buyer would pay a premium for? The second is planning risk: is there a credible path to a construction permit, and what is the probability of a material redesign?\n\nThe third is cost discipline: can the scheme be built to a budget that supports the return model? The fourth is sales underwriting: how many units per month is a conservative estimate, and what does a stress scenario look like?\n\nThe fifth is legal title: is ownership clean, are there encumbrances, and can we acquire control without material contingency? The sixth is capital fit: does the project economics support private participation at the commitment levels we work with?\n\nOnly when a site passes all six does it enter the pipeline. Most do not."},
]

function Brand({ light = false }) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/">
    <img className="brand-symbol" src="/assets/formara-mark.svg" alt="" aria-hidden="true" />
    <span><strong>FORMARA</strong><small>PROPERTY CAPITAL</small></span>
  </Link>
}

function Layout({ children }) {
  const [open, setOpen] = useState(false)
  return <><header className="site-header"><Brand light /><button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">☰</button><nav className={open ? 'open' : ''}>
    <Link to="/projects">Opportunities</Link><Link to="/how-it-works">How it works</Link><Link to="/security">Security</Link><Link to="/statistics">Statistics</Link><Link to="/strategy">Strategy</Link><Link to="/portal">Portal</Link><Link className="nav-cta" to="/contact">Register →</Link>
  </nav></header>{children}<Footer /></>
}

function Footer() {
  return <footer><div className="wrap footer-grid"><Brand light /><div><small>INVEST</small><Link to="/projects">Investment opportunities</Link><Link to="/how-it-works">How it works</Link><Link to="/statistics">Platform statistics</Link><Link to="/faq">Investor FAQ</Link><Link to="/blog">Knowledge base</Link><Link to="/invest">Investment model</Link><Link to="/security">Security & risk</Link><Link to="/portal">Investor portal</Link><Link to="/contact">Register interest</Link></div><div><small>PLATFORM</small><Link to="/strategy">Development strategy</Link><Link to="/nis-market">Niš market thesis</Link><Link to="/pipeline">2026–2029 pipeline</Link><Link to="/trust">Trust framework</Link><Link to="/about">About</Link></div></div><div className="wrap footer-bottom"><span>© 2026 Formara Property Capital. Concept platform · Advancing toward NBS registration.</span><span>Senior secured loans · Capital at risk · Returns not guaranteed</span></div></footer>
}

function FundingMeter({ project, large = false }) {
  const fmt = n => '€' + (n >= 1000 ? Math.round(n / 1000) + 'k' : n)
  if (project.status === 'PIPELINE') return (
    <div className="fm-pipeline">
      <span className="fm-pipeline-tag">◎ PIPELINE</span>
      <span>Opens when feasibility and planning evidence gates are passed · Est. {project.badges[0].replace('PIPELINE ', '')}</span>
    </div>
  )
  const pct = Math.round(project.fundingRaised / project.fundingTarget * 100)
  return <div className={`fm${large ? ' fm-large' : ''}`}>
    <div className="fm-top">
      <div className="fm-return-block">
        <span className="fm-rate">{project.returnRate}</span>
        <span className="fm-rate-sub">target return · gross · end of term</span>
      </div>
      <div className="fm-meta-right">
        <div><small>TERM</small><strong>{project.duration}</strong></div>
        <div><small>LTV</small><strong>{project.ltv}</strong></div>
        <div><small>LOAN TYPE</small><strong>Senior secured</strong></div>
      </div>
    </div>
    <div className="fm-progress-label">
      <span><strong>{pct}%</strong> funded · {fmt(project.fundingRaised)} raised</span>
      <span>{fmt(project.fundingTarget)} target</span>
    </div>
    <div className="fm-bar-wrap"><i className="fm-bar" style={{width:`${pct}%`}} /></div>
    <div className="fm-foot">
      {project.investors > 0 && <span><strong>{project.investors}</strong> investors</span>}
      {project.daysLeft > 0 && <span className="fm-urgency">⏱ <strong>{project.daysLeft} days</strong> remaining</span>}
      {project.status === 'FUNDED' && <span className="fm-funded">✓ Fully funded</span>}
    </div>
  </div>
}

function StatsBand() {
  return <div className="stats-band">
    <div className="wrap stats-grid">
      {platformStats.map(s => <article key={s.label}>
        <strong>{s.value}</strong>
        <small>{s.label}</small>
        <span>{s.note}</span>
      </article>)}
    </div>
    <div className="stats-band-foot wrap">
      <span>Track record data updated monthly · Formara concept platform, Serbia</span>
      <Link to="/statistics" style={{color:'var(--gold)',textDecoration:'none',fontWeight:700,fontSize:11,letterSpacing:'.1em'}}>FULL PLATFORM STATISTICS →</Link>
    </div>
  </div>
}

function TrustBar() {
  return <div className="trust-bar">
    <div className="wrap trust-bar-inner">
      {[
        ['✓','First-ranking mortgage on every project'],
        ['✓','Independent MRICS valuation · LTV ≤ 65%'],
        ['✓','Escrow & milestone drawdown control'],
        ['✓','Named construction all-risk insurance'],
        ['0','Defaults since inception'],
      ].map(([icon, text]) => <span key={text}><b>{icon}</b>{text}</span>)}
    </div>
  </div>
}

function FeaturedOpportunity({ project }) {
  const pct = Math.round(project.fundingRaised / project.fundingTarget * 100)
  const fmt = n => '€' + (n >= 1000 ? Math.round(n / 1000) + 'k' : n)
  return <section className="featured-opp">
    <div className="wrap">
      <div className="fo-eyebrow">
        <span className="fo-live-badge">● LIVE</span>
        <p className="eyebrow" style={{margin:0}}>OPEN FOR INVESTMENT · {project.daysLeft} DAYS REMAINING</p>
      </div>
      <div className="fo-layout">
        <div className="fo-image-wrap">
          <img src={project.hero} alt={`${project.title} reference`} className="fo-image" />
          <div className="fo-image-overlay">
            <span className="fo-ref">{project.eyebrow.split('·')[0].trim()}</span>
            {project.daysLeft > 0 && <span className="fo-countdown"><strong>{project.daysLeft}</strong> days left</span>}
          </div>
        </div>
        <div className="fo-content">
          <div className="fo-return-block">
            <span className="fo-return-label">TARGET RETURN</span>
            <strong className="fo-return-value">{project.returnRate}</strong>
            <span className="fo-return-note">gross · {project.duration} · end-of-term distribution</span>
          </div>
          <h2 className="fo-title">{project.title} <em>{project.italic}</em></h2>
          <p className="fo-thesis">{project.thesis}</p>
          <div className="fo-metrics">
            <div><small>LOAN TYPE</small><strong>{project.loanType}</strong></div>
            <div><small>LTV RATIO</small><strong>{project.ltv}</strong></div>
            <div><small>MORTGAGE</small><strong>{project.mortgageRank}</strong></div>
            <div><small>DURATION</small><strong>{project.duration}</strong></div>
          </div>
          <div className="fo-funding">
            <div className="fo-fund-header">
              <span><strong>{pct}%</strong> funded</span>
              <span>{fmt(project.fundingRaised)} raised of {fmt(project.fundingTarget)} target</span>
            </div>
            <div className="fo-bar-wrap"><i className="fo-bar" style={{width:`${pct}%`}} /></div>
            <div className="fo-fund-footer">
              <span><strong>{project.investors}</strong> investors committed</span>
              {project.daysLeft > 0 && <span className="fo-urgency">Closes in <strong>{project.daysLeft} days</strong></span>}
            </div>
          </div>
          <div className="fo-security-strip">
            {project.security.slice(0,3).map(l => <span key={l.layer}><b>✓</b> {l.layer}</span>)}
          </div>
          <Link className="fo-cta" to={project.path}>View full project details and invest →</Link>
        </div>
      </div>
    </div>
  </section>
}

function SecurityStack({ layers, compact = false }) {
  return <div className={`security-stack${compact ? ' compact' : ''}`}>
    {layers.map((l, i) => <div className="sec-layer" key={i}>
      <div className="sec-num">{String(i + 1).padStart(2, '0')}</div>
      <div className="sec-body"><strong>{l.layer}</strong>{!compact && <p>{l.detail}</p>}</div>
      <div className="sec-check">✓</div>
    </div>)}
  </div>
}

function BlogCard({ post }) {
  return <Link className="blog-card" to={`/blog/${post.slug}`}>
    <img src={post.image} alt="" />
    <div className="blog-card-body"><small>{post.category} · {post.date}</small><h3>{post.title}</h3><p>{post.excerpt}</p></div>
  </Link>
}

function CampaignCard({ project: p }) {
  const isOpen = p.status === 'OPEN', isFunded = p.status === 'FUNDED', isPipe = p.status === 'PIPELINE'
  const fmt = n => '€' + (n >= 1000 ? Math.round(n / 1000) + 'k' : n)
  const pct = !isPipe ? Math.round(p.fundingRaised / p.fundingTarget * 100) : 0
  return <article className={`campaign-card${isOpen ? ' campaign-live' : ''}`}>
    <div className="cc-image-wrap">
      <img src={p.hero} alt={`${p.title} reference`} />
      <span className={`cc-status cc-status-${p.status.toLowerCase()}`}>
        {isOpen ? <><i className="cc-live-dot" />LIVE</> : isFunded ? '✓ FUNDED' : '◎ PIPELINE'}
      </span>
      {p.daysLeft > 0 && <span className="cc-countdown"><strong>{p.daysLeft}</strong>d</span>}
    </div>
    <div className="cc-rate-hero">
      <span className="cc-rate-value">{p.returnRate}</span>
      <span className="cc-rate-label">{isPipe ? 'est. return · target · gross' : 'target return · gross · end of term'}</span>
      <div className="cc-rate-meta">
        <span><small>TERM</small><strong>{p.duration}</strong></span>
        {!isPipe && <span><small>LTV</small><strong>{p.ltv}</strong></span>}
        <span><small>LOAN</small><strong>Senior secured</strong></span>
      </div>
    </div>
    <div className="cc-body">
      <div className="cc-name-row">
        <div><small className="cc-ref">{p.eyebrow.split('·')[0].trim()}</small><h3 className="cc-title">{p.title} <em>{p.italic}</em></h3></div>
      </div>
      {isPipe ? (
        <div className="cc-pipe-note">◎ Opens when feasibility &amp; planning gates pass · Est. {p.badges[0].replace('PIPELINE ', '')}</div>
      ) : (
        <>
          <div className="cc-progress-label">
            <span><strong>{pct}%</strong> funded · {fmt(p.fundingRaised)} raised</span>
            <span>{fmt(p.fundingTarget)} target</span>
          </div>
          <div className="cc-bar-wrap"><i className="cc-bar" style={{width:`${pct}%`}} /></div>
          <div className="cc-foot">
            {p.investors > 0 && <span><strong>{p.investors}</strong> investors</span>}
            {p.daysLeft > 0 && <span className="cc-urgency">⏱ <strong>{p.daysLeft} days</strong> left</span>}
            {isFunded && <span className="cc-funded-tag">✓ Fully funded</span>}
          </div>
        </>
      )}
      <Link className={`cc-cta${isOpen ? ' cc-cta-invest' : ''}`} to={p.path}>
        {isOpen ? 'INVEST NOW →' : isFunded ? 'View funded project →' : 'View pipeline details →'}
      </Link>
    </div>
  </article>
}

function Home() {
  const [amount, setAmount] = useState(250000)
  const rate = amount < 100000 ? 18 : amount < 200000 ? 21 : amount < 300000 ? 24 : amount < 400000 ? 27 : 30
  const money = useMemo(() => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }), [])
  return <Layout><main>
    <section className="hero" id="top"><img className="hero-image" src="/assets/formara-hero-v2.png" alt="Contemporary apartment development in a European city" /><div className="hero-shade" /><div className="wrap hero-content">
      <p className="eyebrow">SENIOR SECURED REAL ESTATE LOANS · NIŠ, SERBIA</p>
      <h1>Earn 18–30%<br /><em>on secured<br />development loans.</em></h1>
      <p className="hero-copy">Private investors earn fixed-rate returns on senior secured development loans, backed by first-ranking mortgages on Niš apartment projects. Start from €50,000.</p>
      <div className="hero-actions">
        <Link className="primary" to={projects.urban.path}>View live opportunity →</Link>
        <Link to="/how-it-works">How it works</Link>
      </div>
      <div className="hero-metrics">
        <span><b>01</b><strong>€50k–€500k<br />per project</strong></span>
        <span><b>02</b><strong>18–30%<br />target return</strong></span>
        <span><b>03</b><strong>Senior secured<br />first mortgage</strong></span>
      </div>
    </div></section>
    <TrustBar />
    <StatsBand />
    <section className="campaigns-section" id="all-campaigns"><div className="wrap">
      <div className="campaigns-head">
        <div><p className="eyebrow">ALL INVESTMENT CAMPAIGNS</p><h2>Live, funded<br /><em>and pipeline.</em></h2></div>
        <div className="campaigns-filter-row">
          <span className="camp-filter-live">● 1 Live</span>
          <span className="camp-filter-funded">✓ 1 Funded</span>
          <span className="camp-filter-pipe">◎ 2 Pipeline</span>
          <Link to="/projects" className="camp-all-link">Filter →</Link>
        </div>
      </div>
      <div className="campaign-grid">{Object.values(projects).map(p => <CampaignCard key={p.path + '-home'} project={p} />)}</div>
    </div></section>

    <section className="returns-explainer"><div className="wrap re-inner">
      <div className="re-left">
        <p className="eyebrow">HOW YOUR RETURNS WORK</p>
        <h2>You lend.<br /><em>We build and sell.<br />You earn.</em></h2>
        <p>Formara raises senior secured development loans from private investors. Your capital funds land acquisition and construction. When apartments are sold, your principal and agreed return are repaid — secured throughout by first-ranking mortgage security.</p>
        <Link className="inline-link" to="/how-it-works">Full investor journey →</Link>
      </div>
      <div className="re-steps">
        {[
          ['01','You invest','From €50,000 — at a fixed return rate matching your commitment tier. Documents signed, capital into escrow.'],
          ['02','Construction runs','Milestone drawdowns from escrow. Independent cost monitor signs off every payment. Monthly updates in the portal.'],
          ['03','Apartments sell','Units are sold in phases. Sales proceeds flow into the project account as the exit completes.'],
          ['04','You receive','Principal returned plus agreed return, net of project obligations — distributed when sales complete.'],
        ].map(([n, h, p]) => <div className="re-step" key={n}><span>{n}</span><div><strong>{h}</strong><p>{p}</p></div></div>)}
      </div>
    </div></section>

    <section className="investor-benefits"><div className="wrap">
      <div className="ib-head"><p className="eyebrow">WHY INVESTORS CHOOSE FORMARA</p><h2>Specific returns.<br /><em>Specific security.</em></h2></div>
      <div className="ib-grid">
        {[
          ['18–30% target','Gross project return tied to commitment size. Not a fund average — a project-specific number agreed at commitment.'],
          ['First-ranking mortgage','Registered charge over the development land before a single euro is deployed. Priority repayment in any enforcement.'],
          ['Escrow control','No bulk advance to the developer. Capital sits in a dedicated escrow account and releases only against signed milestones.'],
          ['Independent oversight','MRICS valuation, chartered QS cost monitor and construction all-risk insurance. Three independent parties checking the work.'],
          ['Project-by-project SPV','Your capital is ring-fenced in a separate legal entity for each project — isolated from every other development.'],
          ['Portal reporting','Monthly construction updates, cost reports and sales data in the investor portal. No surprises, no black boxes.'],
        ].map(([h, p]) => <article className="ib-card" key={h}><strong>{h}</strong><p>{p}</p></article>)}
      </div>
    </div></section>

    <section className="section wrap returns" id="standards"><div><p className="eyebrow">COMMITMENT-BASED PARTICIPATION</p><h2>More committed capital.<br /><em>A higher target share.</em></h2><p>The prototype uses five commitment tiers from €50,000 to €500,000. Larger commitments receive a higher illustrative project-return target.</p><Link className="inline-link" to="/invest">Understand the tier model →</Link></div><div className="calculator"><label>INDICATIVE COMMITMENT <output>{money.format(amount)}</output><input type="range" min="50000" max="500000" step="10000" value={amount} onChange={e => setAmount(+e.target.value)} /></label><div className="tier-readout"><span>CURRENT ILLUSTRATIVE TIER</span><strong>{rate}%</strong><small>gross project target · 12-24 months</small></div><div className="tier-scale">{[[50, 18], [100, 21], [200, 24], [300, 27], [400, 30]].map(([k, r]) => <span className={rate === r ? 'active' : ''} key={k}>€{k}k+<b>{r}%</b></span>)}</div><div className="calc-results"><span>Illustrative gross gain<strong>{money.format(amount * rate / 100)}</strong></span><span>Illustrative total value<strong>{money.format(amount * (1 + rate / 100))}</strong></span></div><small>Illustration only · not a public offer or guaranteed return · capital at risk</small></div></section>
    <section className="security-section-home"><div className="wrap"><div className="sec-home-head"><div><p className="eyebrow">HOW YOUR INVESTMENT IS SECURED</p><h2>Six layers.<br /><em>Not just a promise.</em></h2><p>Every Formara project is structured with a defined security stack documented before a single euro is committed. Here is what sits between your capital and a worst-case outcome.</p><Link className="inline-link" to="/security">Full security explainer →</Link></div><img src="/assets/formara-construction.png" alt="Development site under construction" /></div><div className="sec-home-layers">{[['01','First-ranking mortgage','A registered charge over the development land title. The mortgage holder is repaid before any unsecured creditor in an enforcement scenario.'],['02','Personal guarantee','The development principal personally guarantees the loan obligation — creating recourse beyond the SPV.'],['03','Independent valuation','An MRICS valuation sets the LTV ceiling before investment opens. Formara targets below 65% LTV on every project.'],['04','Escrow & milestone drawdowns','Capital is held in a dedicated escrow account. No bulk advance to the developer — funds release only against signed construction milestones.'],['05','Construction all-risk insurance','A named CAR policy covers sudden physical loss during the build. Investors are noted as interested parties on the policy schedule.'],['06','Independent cost monitor','A chartered QS reviews and signs off every cost report before any drawdown is released. No milestone is approved without their written confirmation.']].map(([n,h,p]) => <div className="sec-home-layer" key={n}><span>{n}</span><div><strong>{h}</strong><p>{p}</p></div></div>)}</div><div className="sec-home-footer"><div className="sec-disclaimer"><strong>What is NOT protected</strong><p>Investor principal and target returns are not insured or guaranteed. Property development carries real risk. Construction insurance protects named perils, not commercial outcomes. Your capital may be lost in part or in full.</p></div><Link className="primary sec-cta-btn" to="/security">Understand the full risk framework →</Link></div></div></section>
    <section className="section wrap blog-preview"><div className="section-head"><div><p className="eyebrow">KNOWLEDGE BASE</p><h2>Understand before<br /><em>you invest.</em></h2></div><p>Developer insights, market analysis and investor guides — written for people who want to understand a deal before they commit to it.</p></div><div className="blog-grid">{blogPosts.map(post => <BlogCard key={post.slug} post={post} />)}</div><Link className="inline-link" to="/blog">Read all articles →</Link></section>
    <section className="pipeline-preview"><div className="wrap"><div className="section-head"><div><p className="eyebrow">2026 TO 2029 PLANNING PIPELINE</p><h2>Three projects.<br /><em>Visible stage gates.</em></h2></div><p>Early pipeline items are planning targets, not acquired assets. Their status changes only when evidence supports the next milestone.</p></div><div className="pipeline-cards">{pipelineProjects.map(p => <PipelineCard key={p.name} project={p} />)}</div><Link className="inline-link" to="/pipeline">Open the full development roadmap →</Link></div></section>
    <section className="access-cta" id="access"><div className="wrap"><p className="eyebrow">CONTROLLED ACCESS</p><h2>Public story.<br /><em>Private intelligence.</em></h2><p>Register interest to unlock limited investor briefs. Detailed site, cost, financial and legal information is released only after qualification and a direct call.</p><div><Link className="primary" to="/projects">View opportunities →</Link><Link to="/portal">Preview investor portal</Link></div></div></section>
  </main></Layout>
}

function Opportunity({ project }) {
  const [registered, setRegistered] = useState(() => localStorage.getItem('formaraInvestorInterest') === 'registered')
  const register = e => { e.preventDefault(); localStorage.setItem('formaraInvestorInterest', 'registered'); setRegistered(true) }
  const pct = project.status !== 'PIPELINE' ? Math.round(project.fundingRaised / project.fundingTarget * 100) : 0
  const fmt = n => '€' + (n >= 1000 ? Math.round(n / 1000) + 'k' : n)
  return <><header className="project-header"><Brand light /><Link className="back-link" to="/projects">← All opportunities</Link></header><main className="project-page">
    <section className="project-hero"><img src={project.hero} alt="Apartment building reference concept" /><div className="project-hero-content wrap"><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}<br /><em>{project.italic}</em></h1><p>{project.summary}</p><div className="project-badges">{project.badges.map(x => <span key={x}>{x}</span>)}</div></div></section>
    <nav className="project-nav"><div className="wrap"><a href="#overview">Overview</a><a href="#security">Security</a><a href="#architecture">Architecture</a><a href="#access">Investor access</a><a href="#risk">Risk</a><span className={`access-chip ${registered ? '' : 'locked'}`}>{registered ? 'Registered investor' : 'Public preview'}</span></div></nav>
    <section className="section wrap overview" id="overview"><div><p className="eyebrow">OPPORTUNITY PROFILE</p><h2>Compact scale.<br /><em>Institutional discipline.</em></h2></div><div className="overview-copy"><p>{project.thesis} This is a reference rather than a live offer; final location, budget and investor terms move through staged disclosure.</p><div className="metric-grid"><div><small>TARGET AREA</small><strong>{project.area}</strong></div><div><small>ILLUSTRATIVE GROSS TARGET</small><strong>{project.range}</strong></div><div><small>ESTIMATED LIFECYCLE</small><strong>12-24 mo.</strong></div><div><small>STRATEGY</small><strong>Build & sell</strong></div></div>
    <div className="invest-status-panel">
      <p className="eyebrow" style={{marginBottom:'14px'}}>INVESTMENT STATUS</p>
      {project.status !== 'PIPELINE' ? <>
        <FundingMeter project={project} />
        <div className="invest-metrics"><div><small>TARGET RETURN</small><strong>{project.returnRate}</strong></div><div><small>LOAN TYPE</small><strong>{project.loanType}</strong></div><div><small>HORIZON</small><strong>{project.duration}</strong></div></div>
      </> : <p style={{color:'var(--muted)',fontSize:'14px',margin:0}}>This project is in the pipeline. Investment opens when the project passes its feasibility and planning evidence gates.</p>}
      <div className="project-security-full"><div className="psf-head"><small>SECURITY STRUCTURE</small><h4>{project.loanType}</h4><div className="psf-kv"><span><small>MORTGAGE RANK</small><strong>{project.mortgageRank}</strong></span><span><small>LTV RATIO</small><strong>{project.ltv}</strong></span><span><small>VALUATION</small><strong>{project.valuationType}</strong></span></div></div><SecurityStack layers={project.security} /></div>
    </div>
    </div></section>
    <section className="section wrap project-security-section" id="security"><div className="pss-intro"><p className="eyebrow">INVESTOR SECURITY</p><h2>What protects your capital<br /><em>on this project.</em></h2><p>Every layer below is documented in the project data room. Security claims without supporting documents are not security — they are marketing. Registered investors receive the full evidence pack after a qualification call.</p></div><SecurityStack layers={project.security} /><div className="pss-disclaimer"><strong>Capital is not guaranteed.</strong> The security structure reduces but does not eliminate the risk of loss. An enforcement scenario may not recover full investor capital depending on market conditions at the time.</div></section>
    <section className="project-case wrap"><div className="case-intro"><p className="eyebrow">PROJECT LOGIC</p><h2>What makes this<br /><em>model investable.</em></h2></div><div className="case-grid"><article><span>01</span><h3>Buyer proposition</h3><p>Contemporary apartments with controlled access, useful outdoor space and a clear owner-occupier story.</p></article><article><span>02</span><h3>Delivery logic</h3><p>Repeatable structure, rational circulation and a focused specification designed for programme control.</p></article><article><span>03</span><h3>Sales strategy</h3><p>Phased releases, transparent availability and pricing reviewed against real local absorption.</p></article></div></section>
    <section className="stage-band"><div className="wrap"><div><p className="eyebrow">DEVELOPMENT PATH</p><h2>Evidence before advancement.</h2></div><ol><li className="complete"><b>01</b><span>Plot screen</span></li><li><b>02</b><span>Feasibility</span></li><li><b>03</b><span>Permit</span></li><li><b>04</b><span>Build</span></li><li><b>05</b><span>Sales</span></li><li><b>06</b><span>Exit</span></li></ol></div></section>
    <section className="architecture" id="architecture"><img src={project.gallery} alt="Architecture reference view" /><div><p className="eyebrow">ARCHITECTURAL DIRECTION</p><h2>A clear residential product for an urban buyer.</h2><p>Efficient circulation, disciplined repetition and contemporary façades provide a credible starting point. Every live project remains subject to licensed local adaptation, planning and engineering.</p></div></section>
    <section className="section access-section" id="access"><div className="wrap"><div className="access-head"><div><p className="eyebrow">CONTROLLED DISCLOSURE</p><h2>Access grows with<br /><em>investor readiness.</em></h2></div><p>The public layer explains the thesis. Commercial know-how and sensitive project data remain reserved for approved investors.</p></div><div className="access-ladder"><AccessCard level="01 · PUBLIC" title="Opportunity overview" items={['Development thesis', 'Reference architecture', 'Headline scale', 'High-level risk framing']} action="Current access ✓" /><AccessCard level="02 · REGISTERED" title="Investor teaser" items={['Controlled downloadable brief', 'Development process', 'Indicative access pathway', 'Disclosure boundaries']} action={registered ? <a href={project.download} download>Download limited brief ↓</a> : 'Register below →'} /><AccessCard level="03 · CALL APPROVED" title="Private data room" items={['Site and title diligence', 'Detailed cost plan', 'Financial sensitivities', 'Legal and SPV documents']} action="Approval required 🔒" /></div>{!registered && <form className="gate-panel" onSubmit={register}><div><p className="eyebrow">REGISTER INTEREST</p><h3>Unlock the limited investor brief.</h3><p>Detailed opportunity information is released only after a direct call and approval.</p></div><div className="gate-form"><label>Full name<input required autoComplete="name" /></label><label>Email<input type="email" required autoComplete="email" /></label><label>Indicative investment range<select required defaultValue=""><option value="" disabled>Select</option><option>€50k-€149k</option><option>€150k-€499k</option><option>€500k+</option></select></label><label>Investor type<select required defaultValue=""><option value="" disabled>Select</option><option>Private investor</option><option>Family office</option><option>Professional investor</option></select></label><button className="full" type="submit">Register and unlock teaser</button></div></form>}</div></section>
    <section className="risk-section" id="risk"><div className="wrap"><p className="eyebrow">RISK FIRST</p><h2>Targets are not guarantees.</h2><p>Property development involves planning, construction, financing, sales, market and liquidity risk. Investors may lose some or all invested capital. Definitive documents, not this concept platform, govern any investment.</p></div></section>
  </main><Footer /></>
}

function AccessCard({ level, title, items, action }) { return <article className="access-card"><span className="step">LEVEL {level}</span><h3>{title}</h3><ul>{items.map(x => <li key={x}>{x}</li>)}</ul><div className="button">{action}</div></article> }
function PipelineCard({ project }) { const stages = ['Plot', 'Concept', 'Permit', 'Build', 'Sales', 'Exit']; return <article className="pipeline-card"><div className="pipeline-top"><div><small>{project.status}</small><h3>{project.name}</h3></div><strong>{project.window}</strong></div><div className="pipeline-progress"><i style={{ width: `${project.progress}%` }} /></div><div className="pipeline-stage-row">{stages.map((s, i) => <span className={project.steps[i] ? 'done' : ''} key={s}><b>{project.steps[i] ? '✓' : i + 1}</b>{s}</span>)}</div><dl><div><dt>CURRENT</dt><dd>{project.current}</dd></div><div><dt>NEXT EVIDENCE GATE</dt><dd>{project.next}</dd></div></dl><p>{project.progress}% planning progress</p></article> }

const portalViews = { overview: 'Portfolio overview', investments: 'My investments', construction: 'Live construction', costs: 'Construction costs', documents: 'Document vault', legal: 'Legal library', alerts: 'Alerts' }
function Portal() {
  const navigate = useNavigate(), location = useLocation(); const current = location.pathname.split('/')[2] || 'overview'
  const [access, setAccess] = useState(() => localStorage.getItem('formaraInvestorInterest') === 'registered')
  const enter = () => { localStorage.setItem('formaraInvestorInterest', 'registered'); setAccess(true) }
  if (!access) return <div className="portal-gate"><div className="gate-box"><Brand /><p className="kicker">INVESTOR PORTAL</p><h1>Private access<br />starts with interest.</h1><p>This prototype becomes available after registering interest. Production identity and permissions will be enforced securely on the server.</p><div className="gate-actions"><Link className="primary" to={projects.urban.path + '#access'}>Register interest</Link><button onClick={enter}>Enter demo portal</button></div></div></div>
  return <div className="portal-shell"><aside><Brand light /><div className="account"><span>AL</span><div><strong>Alex Laurent</strong><small>Verified investor · Demo</small></div></div><nav>{Object.entries(portalViews).map(([key, label]) => <button className={current === key ? 'active' : ''} onClick={() => navigate('/portal/' + key)} key={key}><span>{label}</span>{key === 'alerts' && <i>3</i>}</button>)}</nav><div className="aside-foot"><Link to="/">← Public website</Link><button onClick={() => { localStorage.removeItem('formaraInvestorInterest'); setAccess(false) }}>Lock demo</button></div></aside><main><header><div><p className="kicker">{portalViews[current]?.toUpperCase()}</p><h1>{current === 'overview' ? 'Welcome back, Alex.' : portalViews[current] + '.'}</h1></div><span className="profile">AL</span></header><PortalPanel view={current} /></main></div>
}
function PortalPanel({ view }) {
  if (view === 'overview') return <div className="view active"><div className="notice"><span>i</span><p>Demo account. Figures are illustrative and do not represent a live investment or promise of returns.</p></div><div className="stat-grid"><Stat label="COMMITTED CAPITAL" value="€250,000" note="Across 2 project SPVs" /><Stat label="PROJECTED GROSS RANGE" value="18-30%" note="Per project over 12-24 months" /><Stat label="WEIGHTED PROGRESS" value="47%" note="Based on milestones" /><Stat label="NEXT UPDATE" value="21 Oct" note="Monthly investor report" /></div><div className="portal-grid"><div className="panel"><div className="panel-head"><div><p className="kicker">ACTIVE PORTFOLIO</p><h2>Development progress</h2></div></div><Investment p={projects.urban} image="/assets/zm2-hero.jpg" progress="58%" committed="€175,000" /><Investment p={projects.infill} image="/assets/zm1-hero.jpg" progress="21%" committed="€75,000" /></div><div className="panel"><p className="kicker">RECENT ACTIVITY</p><h2>Latest updates</h2><ul className="timeline"><li><i /><div><strong>Concrete structure milestone</strong><p>Level three slab signed off.</p><small>Today · SPV 01</small></div></li><li><i /><div><strong>Cost report uploaded</strong><p>September cost plan available.</p><small>2 days ago · SPV 01</small></div></li></ul></div></div></div>
  if (view === 'investments') return <PortalSimple title="Your active portfolio." cards />
  if (view === 'construction') return <div className="view active"><div className="construction-layout"><div className="site-feed"><div className="feed-image"><img src="/assets/zm2-view-02.jpg" /><span>REFERENCE SITE VIEW</span></div><div className="feed-meta"><strong>Urban Apartment House</strong><span>Illustrative construction feed</span></div></div><div className="milestones"><p className="kicker">MILESTONES</p><h2>Delivery programme</h2><ol>{['Site secured', 'Design frozen', 'Permit issued', 'Structure complete', 'Fit-out', 'Sales completion'].map((x, i) => <li className={i < 3 ? 'done' : i === 3 ? 'active' : ''} key={x}><span>{i < 3 ? '✓' : i + 1}</span><div><strong>{x}</strong><small>{i < 3 ? 'Completed' : i === 3 ? 'In progress' : 'Upcoming'}</small></div></li>)}</ol></div></div></div>
  if (view === 'costs') return <PortalSimple title="Budget movement, explained." table />
  if (view === 'documents') return <PortalSimple title="Your approved materials." docs />
  if (view === 'legal') return <PortalSimple title="Understand the structure." legal />
  return <PortalSimple title="What needs your attention." alerts />
}
function Stat({ label, value, note }) { return <article><small>{label}</small><strong>{value}</strong><span>{note}</span></article> }
function Investment({ p, image, progress, committed }) { return <div className="investment-row"><img src={image} /><div className="investment-info"><span className="tag green">{p.phase.toUpperCase()}</span><h3>{p.title} {p.italic}</h3><p>Private project SPV · Illustrative</p><div className="bar"><i style={{ width: progress }} /></div><small>{progress} development progress</small></div><div className="investment-value"><small>COMMITMENT</small><strong>{committed}</strong><small>TARGET RANGE</small><b>{p.range}</b></div></div> }
function PortalSimple({ title, cards, table, docs, legal, alerts }) { return <div className="view active"><div className="section-intro"><h2>{title}</h2><p>Illustrative portal content demonstrating the reporting and controlled-document experience available to approved investors.</p></div>{cards && <div className="project-cards"><Investment p={projects.urban} image="/assets/zm2-hero.jpg" progress="58%" committed="€175,000" /><Investment p={projects.infill} image="/assets/zm1-hero.jpg" progress="21%" committed="€75,000" /></div>}{table && <div className="panel cost-table"><table><thead><tr><th>CATEGORY</th><th>APPROVED</th><th>FORECAST</th><th>VARIANCE</th></tr></thead><tbody>{[['Land & acquisition', '€420k', '€420k', '—'], ['Construction', '€1.18m', '€1.16m', '+€20k'], ['Professional fees', '€146k', '€151k', '−€5k'], ['Sales & contingency', '€214k', '€218k', '−€4k']].map(r => <tr key={r[0]}>{r.map((x, i) => <td key={`${r[0]}-${i}`}>{x}</td>)}</tr>)}</tbody></table></div>}{docs && <DocList />}{legal && <div className="legal-grid">{['SPV overview', 'Investor agreement', 'Risk memorandum', 'Reporting framework'].map(x => <article key={x}><span>§</span><h3>{x}</h3><p>Available according to investor approval level and project stage.</p><button>Request access →</button></article>)}</div>}{alerts && <div className="alert-list">{['Construction milestone approved', 'New monthly cost report', 'Planning response received'].map((x, i) => <article key={x}><i /><div><small>{i ? 'PROJECT UPDATE' : 'ACTION'}</small><h3>{x}</h3><p>Review the latest controlled update in your document vault.</p></div><button>View →</button></article>)}</div>}</div> }
function DocList() { return <div className="doc-list">{['September investor report', 'Construction progress summary', 'Project risk overview', 'Detailed cost plan · Call approved'].map((x, i) => <article className={i === 3 ? 'locked' : ''} key={x}><span>{i === 3 ? 'LOCK' : 'PDF'}</span><div><strong>{x}</strong><small>{i === 3 ? 'Requires additional approval' : 'Approved investor document · Demo'}</small></div><button>{i === 3 ? 'Request' : 'Download'}</button></article>)}</div> }

function PageHero({ eyebrow, title, italic, copy, image }) { return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-shade" /><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}<br /><em>{italic}</em></h1><p>{copy}</p></div></section> }

function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = Object.values(projects).filter(p => filter === 'all' || p.status.toLowerCase() === filter)
  return <Layout><main>
    <section className="projects-page-hero"><div className="wrap"><div><p className="eyebrow">INVESTMENT OPPORTUNITIES</p><h1>Active projects.<br /><em>Transparent progress.</em></h1></div><p>Browse Formara's current development pipeline. Open projects accept new investment commitments. Funded and pipeline projects are shown for context and continuity.</p></div></section>
    <div className="filter-bar"><div className="wrap">{[['all', 'All'], ['open', '● Open'], ['funded', '✓ Funded'], ['pipeline', '◎ Pipeline']].map(([val, label]) => <button key={val} className={`filter-btn${filter === val ? ' active' : ''}`} onClick={() => setFilter(val)}>{label}</button>)}</div></div>
    <section className="section wrap">
      <div className="campaign-grid">
        {filtered.map(p => <CampaignCard key={p.path} project={p} />)}
        {filtered.length === 0 && <p style={{color:'var(--muted)',gridColumn:'1/-1',padding:'40px 0'}}>No projects match this filter.</p>}
      </div>
    </section>
    <section className="access-cta"><div className="wrap"><p className="eyebrow">READY TO INVEST?</p><h2>Register your interest.<br /><em>We respond within 48 hours.</em></h2><p>A short registration unlocks project teasers. Full data-room access follows a qualification call.</p><div><Link className="primary" to="/contact">Register interest →</Link><Link to="/how-it-works">How it works</Link></div></div></section>
  </main></Layout>
}

function HowItWorksPage() {
  const steps = [
    ['01', 'REGISTER', 'Create your investor profile', 'Complete a short qualification form. We review your investment background and confirm suitability before opening access to project teasers and the portal. No commitment required at this stage.'],
    ['02', 'BROWSE & SELECT', 'Review open opportunities', 'Explore live projects — return target, loan type, security structure, LTV and live funding progress. Registered investors access the full teaser. Approved investors unlock the data room.'],
    ['03', 'INVEST', 'Sign documents and commit capital', 'Choose your commitment amount (€50k–€500k). Sign the project-specific investment documents. Capital moves into the escrow account — held there until the project funding milestone is met.'],
    ['04', 'EARN', 'Receive your returns', 'Monthly portal updates track construction and sales. When apartments sell, project proceeds settle costs and obligations, then your principal plus agreed return is distributed.'],
  ]
  return <Layout><main>
    <PageHero eyebrow="HOW IT WORKS" title="Register. Browse." italic="Invest. Earn." copy="Four steps from first enquiry to return distribution — each one transparent, document-backed and auditable." image="/assets/formara-investor-meeting.png" />
    <section className="section wrap">
      <div className="how-steps">{steps.map(([n, step, h, p]) => <article className="how-step" key={n}><div className="how-step-n">{n}</div><div><small style={{fontSize:9,letterSpacing:'.14em',color:'#967744',fontWeight:700}}>{step}</small><h3>{h}</h3><p>{p}</p></div></article>)}</div>
    </section>
    <section className="section wrap">
      <div className="hiw-explainer-grid">
        <div className="hiw-timing">
          <p className="eyebrow">TYPICAL TIMELINE</p>
          <div className="timeline-bar">
            {[['Week 1','Register & qualify'],['Week 2–3','Review project, sign documents'],['Month 1','Capital into escrow'],['Months 1–18','Construction programme'],['Month 14–20','Apartment sales'],['Month 18–24','Distribution to investors']].map(([t, l]) => <div className="tl-item" key={t}><span>{t}</span><strong>{l}</strong></div>)}
          </div>
        </div>
        <div className="hiw-returns">
          <p className="eyebrow">RETURN STRUCTURE</p>
          <div className="return-tiers-list">
            {[[50000,'18%','Access'],[100000,'21%','Select'],[200000,'24%','Core'],[300000,'27%','Priority'],[400000,'30%','Anchor']].map(([amt, r, name]) => <div className="rtl-item" key={amt}><span>€{amt/1000}k+</span><strong>{r}</strong><small>{name} tier</small></div>)}
          </div>
          <p style={{fontSize:12,color:'var(--muted)',marginTop:14}}>Illustrative gross project target. Not a fixed interest rate or guaranteed return. Capital at risk.</p>
        </div>
      </div>
    </section>
    <section className="dark-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">THE ACCESS LADDER</p><h2>More context at each level.</h2></div><p>Project information is released in stages. Public content explains the thesis. Registered investors receive a teaser. Approved investors access the data room.</p></div><div className="criteria-grid">{[['PUBLIC ACCESS', 'Development thesis, building models, return calculator and risk framework. No registration needed.'], ['REGISTERED INVESTOR', 'Project teaser documents, indicative access pathway and additional development context. Requires a short registration form.'], ['CALL APPROVED', 'Full site data, cost plan, legal structure, financial sensitivities and SPV documents. Released after a qualification call.']].map(([h, p], i) => <article key={h}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></article>)}</div></div></section>
    <section className="access-cta"><div className="wrap"><p className="eyebrow">START THE PROCESS</p><h2>Register your interest.<br /><em>No commitment required.</em></h2><p>A short conversation is enough to understand whether an opportunity is worth exploring further.</p><div><Link className="primary" to="/contact">Register interest →</Link><Link to="/faq">Read the FAQ</Link></div></div></section>
  </main></Layout>
}

function FaqPage() {
  const [open, setOpen] = useState(null)
  return <Layout><main>
    <PageHero eyebrow="FREQUENTLY ASKED QUESTIONS" title="Clear answers." italic="Before you ask." copy="Honest responses to the questions investors ask most often. If yours is not here, write to us directly." image="/assets/formara-investor-meeting.png" />
    <section className="section wrap"><div className="editorial"><div><p className="eyebrow">INVESTOR Q&A</p><h2>Ask the right questions<br /><em>before you commit.</em></h2></div><div className="faq-list">{faqItems.map((item, i) => <div className="faq-item" key={i}><button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}><h3>{item.q}</h3><span>{open === i ? '−' : '+'}</span></button>{open === i && <div className="faq-ans"><p>{item.a}</p></div>}</div>)}</div></div></section>
    <section className="access-cta"><div className="wrap"><p className="eyebrow">STILL HAVE QUESTIONS?</p><h2>Start a conversation.<br /><em>No commitment required.</em></h2><p>We respond to all enquiries within 48 hours and do not add you to any marketing list.</p><div><Link className="primary" to="/contact">Contact us →</Link><Link to="/how-it-works">How it works</Link></div></div></section>
  </main></Layout>
}

function BlogPage() {
  return <Layout><main>
    <PageHero eyebrow="KNOWLEDGE BASE" title="Investor intelligence." italic="Developer transparency." copy="Market analysis, structural explainers and development process guides for investors who want to understand a deal before they commit to it." image="/assets/formara-hero-v2.png" />
    <section className="section wrap"><div className="blog-grid">{blogPosts.map(post => <BlogCard key={post.slug} post={post} />)}</div></section>
  </main></Layout>
}

function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <Layout><main><section className="section wrap"><h2>Post not found.</h2><Link to="/blog" style={{ fontWeight: 700 }}>← Back to knowledge base</Link></section></main></Layout>
  return <Layout><main>
    <div className="blog-post-hd"><div className="wrap"><small>{post.category} · {post.date}</small><h1>{post.title}</h1><p>{post.excerpt}</p></div></div>
    <section className="section wrap"><div className="post-body">{post.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}<hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--line)' }} /><Link to="/blog" style={{ fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid currentColor' }}>← Back to knowledge base</Link></div></section>
  </main></Layout>
}

function StrategyPage() { return <Layout><main><PageHero eyebrow="THE MANDATE" title="Focused development." italic="Repeatable execution." copy="Apartment buildings between 550 and 1,200 m². Large enough to create meaningful value, compact enough to source, control and exit with discipline." image="/assets/formara-hero-v2.png" /><section className="section wrap editorial"><div><p className="eyebrow">WHY THIS SEGMENT</p><h2>The space between a housebuilder and a major developer.</h2></div><div><p>Formara targets projects that are often too operational for passive capital and too small for institutional development funds. That creates a focused lane for private investors who value a clear asset, a finite programme and project-level reporting.</p><p>The strategy is not to accumulate a long-term rental portfolio. It is to source, permit, construct, sell and distribute through a project-specific vehicle.</p></div></section><section className="dark-section"><div className="wrap"><p className="eyebrow">THE FILTER</p><div className="criteria-grid">{[['01', 'Site fit', 'Urban plot, feasible density, legible ownership and access.'], ['02', 'Product fit', 'Primarily apartments with saleable layouts and disciplined common areas.'], ['03', 'Market fit', 'Observable end-buyer demand, pricing depth and manageable competing supply.'], ['04', 'Delivery fit', 'A realistic permit path, capable contractor pool and controlled programme.'], ['05', 'Exit fit', 'Unit count and pricing designed around absorption, not optimistic headlines.'], ['06', 'Capital fit', 'Project economics capable of supporting risk-adjusted private participation.']].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section><section className="image-story reverse"><img src="/assets/formara-construction.png" alt="Compact apartment building under construction" /><div><p className="eyebrow">DELIVERY MODEL</p><h2>One project.<br /><em>One accountable plan.</em></h2><p>Each opportunity advances through feasibility, controlled disclosure, SPV formation, procurement, construction, sales and close-out. Decisions are tied to milestones rather than marketing calendars.</p><Link to="/invest">See how capital participates →</Link></div></section></main></Layout> }

function InvestPage() { const tiers = [[50000, 18, 'Access'], [100000, 21, 'Select'], [200000, 24, 'Core'], [300000, 27, 'Priority'], [400000, 30, 'Anchor']]; return <Layout><main><PageHero eyebrow="PRIVATE CAPITAL" title="A defined commitment." italic="A project-specific return." copy="Investors enter individual development SPVs. Commitment size influences the illustrative target tier, while every project keeps its own underwriting, documents and risk profile." image="/assets/formara-investor-meeting.png" /><section className="section wrap"><div className="section-head"><div><p className="eyebrow">INDICATIVE TIERS</p><h2>Aligned participation,<br /><em>capped at €500k.</em></h2></div><p>The percentages below are concept-stage gross project targets. They are not fixed interest, promised yield or insured returns.</p></div><div className="investment-tiers">{tiers.map(([amount, rate, name]) => <article key={amount}><small>{name.toUpperCase()} TIER</small><strong>€{amount / 1000}k+</strong><span>{rate}%</span><p>Illustrative gross target over a 12-24 month project horizon.</p></article>)}</div><p className="legal-note">At €500,000 the model remains capped at the 30% illustrative tier. Final allocation, priority, profit waterfall and investor rights must be set by the definitive SPV documents and Serbian legal/tax advice.</p></section><section className="capital-flow"><div className="wrap"><p className="eyebrow">CAPITAL PATH</p><h2>Know where the money goes.</h2><div>{[['01', 'Commit', 'Qualification, KYC and signed project documents.'], ['02', 'Fund', 'Capital enters the project-specific structure under agreed drawdown terms.'], ['03', 'Deploy', 'Land, professional fees, construction and approved development costs.'], ['04', 'Report', 'Programme, cost and sales reporting through the investor portal.'], ['05', 'Exit', 'Apartment sale proceeds settle project obligations before investor distributions.']].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section><section className="section wrap editorial"><div><p className="eyebrow">IMPORTANT</p><h2>Return targets move with the project.</h2></div><div><p>Commitment tier is only one input. Feasibility, planning, construction duration, market warmth, pricing, sales velocity and supply saturation all affect the outcome.</p><p>Project information is released in stages so investors can evaluate risk without exposing commercially sensitive sourcing, pricing and procurement information publicly.</p><Link className="inline-link" to="/contact">Request a private introduction →</Link></div></section></main></Layout> }

function ProtectionPage() { return <SecurityPage /> }

function SecurityPage() {
  const layers = [
    {n:'01', title:'First-ranking mortgage', type:'LEGAL SECURITY', what:'A registered charge over the development land title, filed at the land registry before investment opens.', why:'As first-ranking mortgagee, investors (via the SPV) have priority over unsecured creditors. If the project fails and the land must be sold, mortgage proceeds are applied to the investor obligation first.', limits:'A forced sale in a distressed market may not recover full value. Mortgage security reduces but does not eliminate loss risk.', icon:'§'},
    {n:'02', title:'Personal guarantee', type:'RECOURSE SECURITY', what:"The development principal personally guarantees the loan obligation. This creates recourse beyond the SPV to the developer's personal assets.", why:'An SPV can be wound up with limited assets remaining. A personal guarantee means investor recourse survives SPV insolvency, subject to the principal\'s own financial position at the time.', limits:"A guarantee is only as strong as the guarantor's assets. It is not a balance-sheet substitute and may not cover the full loan amount.", icon:'G'},
    {n:'03', title:'Independent valuation', type:'LOAN CONTROL', what:'An independent MRICS-qualified surveyor values the site before investment opens. Formara targets a maximum LTV of 65% on every project.', why:'The valuation sets the LTV ceiling — ensuring the mortgage security represents a meaningful proportion of an independently assessed asset value, not a developer-estimated figure.', limits:'Valuations are point-in-time assessments. Market conditions change. A later-dated open market value may differ materially from the valuation at commitment.', icon:'V'},
    {n:'04', title:'Escrow & milestone drawdowns', type:'CAPITAL CONTROL', what:'Investor capital is held in a dedicated project escrow account. Funds are released to the contractor in tranches against signed construction milestones — not advanced in bulk.', why:'Bulk advance gives developers unrestricted use of funds before work is complete. Escrow and milestone drawdowns mean capital can only leave the account when work has been verified.', limits:'Escrow protects against misuse of advance capital. It does not protect against contractor insolvency, construction defects or cost overruns beyond the contingency.', icon:'E'},
    {n:'05', title:'Construction all-risk insurance', type:'PHYSICAL RISK', what:'A named construction all-risk (CAR) policy covers sudden, unforeseen physical loss or damage to the works and on-site materials during the construction period.', why:'Without CAR insurance, a fire, flood or structural collapse could destroy project value with no recovery mechanism. The policy covers rebuilding costs up to the sum insured, enabling the project to continue.', limits:'CAR insurance covers physical damage to the works — not commercial risk, not cost overruns, not investor principal. Policy exclusions, limits and deductibles apply.', icon:'I'},
    {n:'06', title:'Independent cost monitor', type:'DELIVERY CONTROL', what:'A chartered quantity surveyor independently reviews and approves every cost report before a drawdown is released from escrow.', why:"The QS acts as an independent check on the developer's cost management — verifying that reported progress is real, that costs are reasonable and that the contingency remains adequate.", limits:"The QS reviews reported costs and construction progress. They cannot prevent fraud, discover every defect or guarantee that a contractor will perform.", icon:'Q'},
  ]
  const risks = [
    ['Planning risk', 'A permit may be delayed, amended or refused. Construction cannot begin without an approved permit.'],
    ['Construction risk', 'Cost overruns, contractor failure, programme delays and defects can all affect project returns and timeline.'],
    ['Sales risk', 'Apartment buyers may not materialise at forecast prices or velocity. A weaker market extends the exit and reduces returns.'],
    ['Market risk', 'Real estate values and buyer demand can fall. The project thesis is based on conditions at underwriting — those conditions can change.'],
    ['Liquidity risk', 'There is no secondary market. Capital committed to a project is locked for its full duration. Early exit is not available.'],
    ['Platform risk', 'Formara is a concept-stage platform. Regulatory registration, licensed advisers and formal SPV structures are required before any live investment activity.'],
  ]
  return <Layout><main>
    <PageHero eyebrow="SECURITY & RISK" title="Six layers of security." italic="Zero guarantees of return." copy="Every Formara project is structured with a defined security stack. This page explains what each layer does, why it matters and — critically — what it does not protect against." image="/assets/formara-construction.png" />
    <section className="section wrap">
      <div className="section-head"><div><p className="eyebrow">THE SECURITY STACK</p><h2>Documented before you commit.<br /><em>Not implied after.</em></h2></div><p>Security claims that are not backed by documents are marketing. Every layer below must be evidenced in the project data room before Formara presents it as active protection.</p></div>
      <div className="full-security-stack">{layers.map(l => <div className="fss-layer" key={l.n}>
        <div className="fss-icon">{l.icon}</div>
        <div className="fss-content">
          <div className="fss-head"><strong>{l.title}</strong><span className="fss-type">{l.type}</span></div>
          <div className="fss-grid">
            <div><small>WHAT IT IS</small><p>{l.what}</p></div>
            <div><small>WHY IT MATTERS</small><p>{l.why}</p></div>
            <div className="fss-limits"><small>LIMITS & GAPS</small><p>{l.limits}</p></div>
          </div>
        </div>
      </div>)}</div>
    </section>
    <section className="truth-panel"><div className="wrap"><p className="eyebrow">WHAT IS NOT PROTECTED</p><h2>Investor principal.<br />Target returns.<br />Sales velocity.</h2><p>Construction insurance protects named physical risks on the build. It does not insure commercial outcomes. A first-ranking mortgage provides priority over other creditors — it does not guarantee full recovery. The personal guarantee is only as strong as the guarantor's position at enforcement. Formara will never describe an investment as insured, safe or capital-protected. It is a private development participation with real risk of loss.</p></div></section>
    <section className="section wrap">
      <div className="section-head"><div><p className="eyebrow">RISK REGISTER</p><h2>Six risks every investor<br /><em>must understand.</em></h2></div><p>These are not boilerplate disclaimers. Each represents a real scenario that has affected development investments in markets similar to Serbia.</p></div>
      <div className="risk-register">{risks.map(([h, p]) => <div className="risk-row" key={h}><strong>{h}</strong><p>{p}</p></div>)}</div>
    </section>
    <section className="section wrap editorial"><div><p className="eyebrow">EVIDENCE IN THE DATA ROOM</p><h2>Documents, not declarations.</h2></div><div><p>For every live Formara project, registered and approved investors receive a data room containing the mortgage registration document, personal guarantee, independent valuation report, cost plan, insurance schedule and SPV legal documents.</p><p>If a document is not available, that layer of protection is not active for that project — regardless of what the marketing material says.</p><ul className="evidence-list"><li>Mortgage registration extract from land registry</li><li>Personal guarantee document (signed, dated)</li><li>Independent valuation report (MRICS, within 6 months)</li><li>Construction all-risk insurance schedule</li><li>QS appointment letter and first cost report</li><li>Escrow account agreement</li><li>SPV formation documents and shareholder register</li></ul><Link className="inline-link" to="/contact">Request data room access →</Link></div></section>
    <section className="access-cta"><div className="wrap"><p className="eyebrow">READY TO SEE THE DOCUMENTS?</p><h2>Register interest.<br /><em>Access follows a call.</em></h2><p>The data room is not publicly available. Register, complete a qualification call, and receive the full evidence pack for the project you are evaluating.</p><div><Link className="primary" to="/contact">Register interest →</Link><Link to="/projects">View open projects</Link></div></div></section>
  </main></Layout>
}

function TrustPage() { const checks = [['Identity and ownership', 'Registry extracts, beneficial owners, directors and authority to sign.'], ['Integrity screening', 'Sanctions, politically exposed persons, adverse media, litigation and insolvency review.'], ['Track record', 'Completed projects, references, delivery history, disputes and warranty performance.'], ['Financial capacity', 'Accounts, tax standing, banking evidence, insurance and capacity to meet obligations.'], ['Technical competence', 'Licences, named responsible engineers, safety record and subcontractor controls.'], ['Ongoing monitoring', 'Expiry alerts, material-change declarations, incident reporting and annual refresh.']]; return <Layout><main><PageHero eyebrow="TRUST FRAMEWORK" title="Reputation is useful." italic="Evidence is better." copy="Strong introductions can open a door. They do not replace identity checks, documented experience, clean ownership, independent legal review and controlled project accounts." image="/assets/formara-investor-meeting.png" /><section className="section wrap"><div className="section-head"><div><p className="eyebrow">COUNTERPARTY STANDARD</p><h2>No anonymous operators.<br /><em>No unexplained money.</em></h2></div><p>The same discipline applies to founders, public-facing developers, contractors, advisers, introducers and investors.</p></div><div className="trust-grid">{checks.map(([h, p], i) => <article key={h}><span>0{i + 1}</span><h3>{h}</h3><p>{p}</p></article>)}</div></section><section className="truth-panel"><div className="wrap"><p className="eyebrow">NON-NEGOTIABLE</p><h2>Identity.<br />Source of funds.<br />Conflicts disclosed.</h2><p>Any failed sanctions check, hidden beneficial owner, unexplained source of funds, forged document or material undisclosed conflict stops onboarding and triggers legal review.</p></div></section><section className="section wrap partner-section"><div><p className="eyebrow">PUBLIC-FACING DEVELOPMENT TEAM</p><h2>Profiles should add accountability, not celebrity.</h2><p>Influencers or recognised operators can be introduced as development partners only after their role, experience, conflicts and authority are documented.</p></div><div className="partner-placeholders">{['Development principal', 'Architecture lead', 'Construction delivery lead'].map((x, i) => <article key={x}><div>{String(i + 1).padStart(2, '0')}</div><small>VERIFIED PROFILE SLOT</small><h3>{x}</h3><p>Identity, role, track record and references required before publication.</p><span>AWAITING VERIFIED PROFILE</span></article>)}</div></section><section className="governance-band"><div className="wrap">{[['Project SPV', 'Separate records and contracts for each opportunity.'], ['Controlled account', 'Documented payment authority and reconciled project ledger.'], ['Independent review', 'External legal, title, technical and tax work where relevant.'], ['Investor record', 'Milestones, decisions and documents preserved in the portal.']].map(([h, p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div></section></main></Layout> }

function PipelinePage() { return <Layout><main><PageHero eyebrow="2026 TO 2029 ROADMAP" title="A visible pipeline." italic="Evidence at every gate." copy="The roadmap is a planning scenario for three compact Niš developments. No site is presented as secured until control, title and commercial terms are documented." image="/assets/formara-construction.png" /><section className="section wrap"><div className="section-head"><div><p className="eyebrow">PROJECT PIPELINE</p><h2>Status before storytelling.</h2></div><p>Progress is earned through six evidence gates: plot control, concept feasibility, construction permit, build completion, contracted sales and final exit.</p></div><div className="pipeline-cards vertical">{pipelineProjects.map(p => <PipelineCard key={p.name} project={p} />)}</div></section><section className="roadmap"><div className="wrap"><p className="eyebrow">THREE-YEAR PLAN</p><div className="roadmap-years">{[['2026', 'Build the platform', 'Complete partner onboarding, screen plots, validate the Niš buyer product and place the first site under controlled diligence.'], ['2027', 'Permit and mobilise', 'Advance Project 01 through design and permitting, establish its SPV and begin construction only after capital and controls are ready.'], ['2028', 'Deliver and overlap', 'Complete and sell Project 01 while Project 02 advances through permitting and early works. Keep Project 03 at feasibility stage.'], ['2029', 'Prove repeatability', 'Close Project 02, deliver Project 03 if its evidence gates are met, and publish realised rather than projected performance.']].map(([y, h, p]) => <article key={y}><strong>{y}</strong><h3>{h}</h3><p>{p}</p></article>)}</div></div></section><section className="section wrap editorial"><div><p className="eyebrow">PROGRESS LOGIC</p><h2>A percentage tied to evidence.</h2></div><div><p>Planning progress is not construction progress. A project can be 20% through the full development path while still having no building permit. The portal should therefore show the active stage, the documents completed, the next decision and the current critical risk.</p><p>When a milestone slips, the date and explanation remain visible instead of silently resetting the bar.</p></div></section></main></Layout> }

function NisMarketPage() { return <Layout><main><PageHero eyebrow="NIŠ MARKET THESIS" title="Regional demand." italic="A premium product gap." copy="Niš is more affordable than Belgrade, yet new-build pricing has continued to rise. Formara's thesis is to earn a premium through privacy, family utility, efficient plans and disciplined delivery." image="/assets/formara-hero-v2.png" /><section className="market-numbers"><div className="wrap"><article><small>OBSERVED BROAD NEW-BUILD BAND</small><strong>€1,700 to €2,300</strong><span>per m², location and source dependent</span></article><article><small>FORMARA PLANNING BAND</small><strong>€1,800 to €3,200</strong><span>per m², standard to premium scenario</span></article><article><small>2025 NIŠ SALES SIGNAL</small><strong>+48%</strong><span>reported growth in apartment contract count</span></article><article><small>SELL-OUT CLAIM</small><strong>Not assumed</strong><span>measured project by project</span></article></div></section><section className="section wrap editorial"><div><p className="eyebrow">HONEST MARKET READ</p><h2>Demand exists.<br /><em>Absorption still matters.</em></h2></div><div><p>Published 2025 commentary placed centre new-build pricing around €2,200 per m² before a further reported €100 to €200 increase, while other market sources show lower citywide figures. Premium asking prices above that level exist, but €3,200 per m² should be treated as a top-end product and micro-location case, not a city average.</p><p>Public sources do not provide a dependable citywide number of months required to sell every new apartment scheme. Formara should report reservations, signed contracts, cancellations and achieved price monthly for each building.</p></div></section><section className="product-thesis"><div className="wrap"><div><p className="eyebrow">THE PRODUCT PREMIUM</p><h2>A small building that feels private.</h2><p>The price thesis is not based on a logo. It depends on a defensible product buyers can experience.</p></div><div className="product-grid">{[['Fenced private plot', 'Controlled pedestrian and vehicle access with a clear boundary between home and street.'], ['Family-safe landscape', 'Visible play space, lighting, planted edges and routes separated from parking movements.'], ['Smart building basics', 'Video entry, access control, leak detection readiness, parcel strategy and efficient common-area systems.'], ['Fewer neighbours', 'A compact apartment count that supports privacy, quieter common areas and clearer upkeep.'], ['Efficient homes', 'Useful storage, natural light, sensible room proportions and family-ready two-bedroom layouts.'], ['Parking and bicycles', 'Practical spaces planned from the outset, not treated as leftover area.']].map(([h, p]) => <article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div></div></section><section className="section wrap velocity"><div><p className="eyebrow">UNDERWRITING SALES VELOCITY</p><h2>Model the downside first.</h2></div><div className="velocity-scenarios"><article><small>STRESS</small><strong>0.5 to 1</strong><span>units per month</span><p>Price resistance, weaker financing or oversupply.</p></article><article><small>BASE</small><strong>1 to 2</strong><span>units per month</span><p>Target assumption to validate with launch enquiries.</p></article><article><small>UPSIDE</small><strong>2 to 3</strong><span>units per month</span><p>Strong micro-location and early buyer response.</p></article></div><p className="legal-note">These are Formara underwriting scenarios, not verified Niš market averages.</p></section></main></Layout> }

function AboutPage() { return <Layout><main><PageHero eyebrow="ABOUT THE PLATFORM" title="Developer discipline." italic="Investor visibility." copy="Formara is being shaped as a focused property-capital platform for compact apartment development in Serbia, built for private investors who expect clarity rather than theatre." image="/assets/formara-investor-meeting.png" /><section className="section wrap editorial"><div><p className="eyebrow">THE PROPOSITION</p><h2>A specialist platform, not a property supermarket.</h2></div><div><p>One repeatable mandate: source smaller urban plots, develop high-quality apartment buildings, sell completed units and close each project with transparent reporting.</p><p>The platform separates the public narrative from proprietary execution. Qualified investors can progress from concept material to project teasers and, after review and a call, to controlled data-room access.</p></div></section><section className="values-band"><div className="wrap">{[['01', 'Selectivity', 'Fewer projects, each expected to earn its place.'], ['02', 'Specificity', 'Every claim tied to a project, document or milestone.'], ['03', 'Alignment', 'Clear economics and project-specific participation.'], ['04', 'Discretion', 'Commercial intelligence shared with the right people.']].map(x => <article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section><section className="section wrap editorial"><div><p className="eyebrow">MEETING READY</p><h2>Built for serious conversations.</h2></div><div><p>The current platform is a sophisticated concept prototype for partner and investor meetings. It clearly separates illustrative information from live offers and leaves room for local counsel, licensed advisers and insurer documentation before launch.</p><Link className="inline-link" to="/contact">Start the conversation →</Link></div></section></main></Layout> }

const nameDirections = [['FORMARA CAPITAL', 'Architectural, controlled and closest to the current visual identity.', 'Descriptor options: Property Capital · Urban Capital · Capital & Development'], ['PLOTLINE CAPITAL', 'Directly connects sourcing discipline to investment execution.', 'Descriptor options: Property Ventures · Development Capital'], ['ARCLANE', 'Short, international and design-led without sounding like a brokerage.', 'Descriptor options: Urban Investments · Property Capital'], ['TERREVIA CAPITAL', 'Land-to-exit narrative with a more continental, institutional tone.', 'Descriptor options: Real Assets · Property Ventures'], ['CIVANT CAPITAL', 'Urban and investment-oriented with a compact, ownable sound.', 'Descriptor options: Development Capital · Urban Ventures']]
function BrandPage() { return <Layout><main><PageHero eyebrow="WORKING IDENTITY" title="A name with weight." italic="Without the theatre." copy="The aim is to feel credible in Belgrade, Dubai and Bali: property-specific, internationally legible and far away from boiler-room finance." image="/assets/formara-hero-v2.png" /><section className="section wrap"><div className="section-head"><div><p className="eyebrow">NAME DIRECTIONS</p><h2>Five credible lanes.</h2></div><p>Creative directions only. Company-register, trademark, language and domain screening are still required before selection.</p></div><div className="name-grid">{nameDirections.map(([name, position, options], i) => <article className={i === 0 ? 'selected' : ''} key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{position}</p><small>{options}</small>{i === 0 && <b>CURRENT WORKING DIRECTION</b>}</article>)}</div></section><section className="truth-panel"><div className="wrap"><p className="eyebrow">CURRENT RECOMMENDATION</p><h2>FORMARA<br />PROPERTY CAPITAL</h2><p>It keeps the strongest part of the name, replaces the vague "Development Partners," and makes the platform's role clearer without suggesting a public fund or guaranteed product.</p></div></section></main></Layout> }

function StatisticsPage() {
  const bigStats = [
    {n:'€467k', label:'TOTAL CAPITAL DEPLOYED', sub:'Across Reference 01 & 02'},
    {n:'49', label:'REGISTERED INVESTORS', sub:'Qualified, verified participants'},
    {n:'21%', label:'AVERAGE TARGET RETURN', sub:'Gross · end of term per project'},
    {n:'0', label:'DEFAULTS', sub:'No investor has suffered a capital loss'},
    {n:'1', label:'FULLY FUNDED PROJECT', sub:'Reference 02 — in construction'},
    {n:'58%', label:'MAX LTV RATIO', sub:'Reference 01 · first-ranking mortgage'},
  ]
  const openProj = projects.urban
  const fundedProj = projects.infill
  return <Layout><main>
    <PageHero eyebrow="PLATFORM STATISTICS" title="Transparent." italic="Auditable data." copy="All performance data from every project Formara has opened, funded and tracked. Updated monthly. Nothing hidden, nothing inflated." image="/assets/formara-hero-v2.png" />
    <section className="stat-hero-band">
      <div className="wrap">
        <div className="shb-grid">
          {bigStats.map(s => <article className="shb-item" key={s.label}>
            <strong>{s.n}</strong>
            <small>{s.label}</small>
            <span>{s.sub}</span>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section wrap">
      <div className="section-head"><div><p className="eyebrow">LIVE PROJECT</p><h2>Reference 01 — Urban Apartment House</h2></div><p>Open for investment. Senior secured development loan. First-ranking mortgage registered.</p></div>
      <div className="stats-project-row">
        <img src={openProj.hero} alt="" />
        <div>
          <div className="spr-kv">
            <div><small>STATUS</small><strong className="status-open">● Open for investment</strong></div>
            <div><small>FUNDING TARGET</small><strong>€{Math.round(openProj.fundingTarget/1000)}k</strong></div>
            <div><small>RAISED SO FAR</small><strong>€{Math.round(openProj.fundingRaised/1000)}k ({Math.round(openProj.fundingRaised/openProj.fundingTarget*100)}%)</strong></div>
            <div><small>INVESTORS</small><strong>{openProj.investors}</strong></div>
            <div><small>DAYS REMAINING</small><strong>{openProj.daysLeft}</strong></div>
            <div><small>TARGET RETURN</small><strong>{openProj.returnRate}</strong></div>
            <div><small>DURATION</small><strong>{openProj.duration}</strong></div>
            <div><small>LTV RATIO</small><strong>{openProj.ltv}</strong></div>
            <div><small>MORTGAGE RANK</small><strong>{openProj.mortgageRank}</strong></div>
          </div>
          <div className="spr-bar-wrap">
            <i className="spr-bar" style={{width:`${Math.round(openProj.fundingRaised/openProj.fundingTarget*100)}%`}} />
          </div>
          <p className="spr-note">Funding bar as of last monthly update. Subject to change.</p>
          <Link className="primary" to={openProj.path} style={{display:'inline-block',marginTop:18,textDecoration:'none',padding:'15px 24px',background:'var(--gold)',color:'var(--navy)',fontWeight:700}}>View project and invest →</Link>
        </div>
      </div>
    </section>
    <section className="section wrap" style={{borderTop:'1px solid var(--line)'}}>
      <div className="section-head"><div><p className="eyebrow">COMPLETED FUNDRAISE</p><h2>Reference 02 — Compact Infill House</h2></div><p>Fully funded. Capital deployed. Construction in progress.</p></div>
      <div className="stats-project-row">
        <img src={fundedProj.hero} alt="" />
        <div>
          <div className="spr-kv">
            <div><small>STATUS</small><strong className="status-funded">✓ Fully funded</strong></div>
            <div><small>TOTAL RAISED</small><strong>€{Math.round(fundedProj.fundingTarget/1000)}k (100%)</strong></div>
            <div><small>INVESTORS</small><strong>{fundedProj.investors}</strong></div>
            <div><small>TARGET RETURN</small><strong>{fundedProj.returnRate}</strong></div>
            <div><small>DURATION</small><strong>{fundedProj.duration}</strong></div>
            <div><small>LTV RATIO</small><strong>{fundedProj.ltv}</strong></div>
            <div><small>OUTCOME</small><strong>In construction</strong></div>
          </div>
          <div className="spr-bar-wrap"><i className="spr-bar spr-bar-funded" style={{width:'100%'}} /></div>
          <p className="spr-note">This fundraise is closed. Investors are receiving monthly portal updates through the construction programme.</p>
        </div>
      </div>
    </section>
    <section className="stat-pipeline-section"><div className="wrap">
      <div className="section-head"><div><p className="eyebrow">PIPELINE</p><h2>Three projects in planning.</h2></div><p>Pipeline projects are planning targets, not funded opportunities. Each will open for investment only after evidence gates are passed.</p></div>
      <div className="pipeline-cards">{pipelineProjects.map(p => <PipelineCard key={p.name} project={p} />)}</div>
    </div></section>
    <section className="truth-panel"><div className="wrap">
      <p className="eyebrow">OUR COMMITMENT</p>
      <h2>Real numbers.<br />Updated monthly.<br />Nothing hidden.</h2>
      <p>Formara will publish actual raised amounts, real investor counts, confirmed LTV ratios and verified returns — not marketing projections. When a project completes, we publish what actually happened, not the target.</p>
    </div></section>
    <section className="access-cta"><div className="wrap"><p className="eyebrow">BECOME AN INVESTOR</p><h2>Register today.<br /><em>Access follows a call.</em></h2><p>Qualified investors receive project teasers, portal access and the full data room after a short qualification call.</p><div><Link className="primary" to="/contact">Register interest →</Link><Link to="/projects">View opportunities</Link></div></div></section>
  </main></Layout>
}

function ContactPage() { const [sent, setSent] = useState(false); return <Layout><main><PageHero eyebrow="PRIVATE INTRODUCTION" title="Start with fit." italic="Then open the detail." copy="Tell us how you invest and what you need to understand. This prototype stores nothing and sends nothing externally." image="/assets/formara-investor-meeting.png" /><section className="section wrap contact-layout"><div><p className="eyebrow">ACCESS PATH</p><h2>One considered conversation.</h2><ol><li><span>01</span><div><strong>Register interest</strong><p>Commitment range, investor type and preferred contact.</p></div></li><li><span>02</span><div><strong>Qualification call</strong><p>Strategy, suitability, timing and information needs.</p></div></li><li><span>03</span><div><strong>Controlled access</strong><p>Relevant opportunity material and approved data-room documents.</p></div></li></ol></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Full name<input required /></label><label>Email<input type="email" required /></label><label>Based in<input placeholder="City / country" required /></label><label>Indicative commitment<select defaultValue="" required><option value="" disabled>Select range</option><option>€50k-€99k</option><option>€100k-€199k</option><option>€200k-€299k</option><option>€300k-€399k</option><option>€400k-€500k</option></select></label><label className="full">What matters most?<textarea rows="4" placeholder="Project timing, structure, risk controls, reporting…" /></label><button className="full" type="submit">{sent ? 'Interest noted in this demo ✓' : 'Request private introduction →'}</button><small className="full">Prototype only. This form does not transmit or store your information.</small></form></section></main></Layout> }

function ScrollTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }

export default function App() {
  return <><ScrollTop /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/how-it-works" element={<HowItWorksPage />} />
    <Route path="/faq" element={<FaqPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
    <Route path="/strategy" element={<StrategyPage />} />
    <Route path="/nis-market" element={<NisMarketPage />} />
    <Route path="/pipeline" element={<PipelinePage />} />
    <Route path="/trust" element={<TrustPage />} />
    <Route path="/invest" element={<InvestPage />} />
    <Route path="/protection" element={<ProtectionPage />} />
    <Route path="/security" element={<SecurityPage />} />
    <Route path="/statistics" element={<StatisticsPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/brand-directions" element={<BrandPage />} />
    <Route path="/contact" element={<ContactPage />} />
    {Object.values(projects).map(project => <Route key={project.path} path={project.path} element={<Opportunity project={project} />} />)}
    <Route path="/portal/*" element={<Portal />} />
    <Route path="*" element={<Home />} />
  </Routes></>
}
