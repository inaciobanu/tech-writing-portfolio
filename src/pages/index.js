import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ina Ciobanu',
  jobTitle: 'Senior Technical Writer',
  url: 'https://inaciobanu.github.io/tech-writing-portfolio/',
  worksFor: {
    '@type': 'Organization',
    name: 'KX',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://www.linkedin.com/in/inaciobanu',
    'https://github.com/inaciobanu',
    'https://medium.com/@ina_ciobanu',
    'https://x.com/ina_ciobanu',
  ],
};

const impactItems = [
  {
    metric: "45,000+",
    desc: "words of user guides, API docs, and UX content delivered at PrimaryBid",
  },
  {
    metric: "2M+",
    desc: "words of technical content across fintech, SaaS, healthcare, and legal",
  },
  {
    metric: "7 awards",
    desc: "won for specialist content strategy and SEO copywriting",
  },
  {
    metric: "0 → 1",
    desc: "built PrimaryBid's Connect API Developer Portal from scratch — now award-nominated",
  },
];

const portfolioSections = [
  {
    emoji: '🔌',
    title: 'API & Developer Documentation',
    desc: 'REST API references, developer portals, authentication flows, error handling, and rate limiting — written for engineers who need to ship fast.',
    href: '/docs/api/intro',
    tags: ['REST API', 'OpenAPI', 'Developer Portal'],
  },
  {
    emoji: '🤖',
    title: 'Data & AI Platform Docs',
    desc: 'Technical documentation for a real-time vector search API — written in the style of the AI/ML platform docs I own daily at KX.',
    href: '/docs/api/kdbai-sample',
    tags: ['Vector Search', 'AI/ML', 'Python Client'],
  },
  {
    emoji: '🛠️',
    title: 'Developer Guides & Tutorials',
    desc: 'Quickstart guides, integration walkthroughs, and production best practices that reduce onboarding friction and support tickets.',
    href: '/docs/guides/intro',
    tags: ['Quickstart', 'Integration', 'Best Practices'],
  },
  {
    emoji: '💻',
    title: 'Code in Docs Style Guide',
    desc: 'A practical standard for language-labelled samples, copy-safe code, comments, input and output, verification, maintenance, and reader feedback.',
    href: '/docs/guides/code-in-docs',
    tags: ['Code Samples', 'Docs-as-Code', 'Style Guide'],
    isNew: true,
  },
  {
    emoji: '📖',
    title: 'UX & Product Content',
    desc: 'End-user documentation, onboarding flows, and in-app content that helps non-technical users navigate complex products confidently.',
    href: '/docs/manuals/intro',
    tags: ['UX Writing', 'Onboarding', 'User Guides'],
  },
  {
    emoji: '🌐',
    title: 'Open Source & Complex Systems',
    desc: 'Contributing guides, architecture overviews, and changelogs for open source projects — written for engineers contributing to real codebases.',
    href: '/docs/opensource/intro',
    tags: ['Open Source', 'Architecture', 'Changelog'],
  },
  {
    emoji: '🗂️',
    title: 'Documentation Governance & Process',
    desc: 'Auditing an existing documentation space, redesigning its structure, and building the ownership, review cycles, and automation that keep it from decaying again.',
    href: '/docs/process-governance/intro',
    tags: ['Confluence', 'Governance', 'Process Analysis'],
    isNew: true,
  },
];

const thinkingItems = [
  {
    problem: "API onboarding unclear for distribution partners",
    action: "Restructured the Connect API Developer Portal from scratch — added task-based navigation, code samples in multiple languages, and clearer error handling",
    result: "Faster partner integration, fewer support queries, portal now award-nominated",
    company: "PrimaryBid",
  },
  {
    problem: "Complex AI/data platform with no existing documentation ecosystem",
    action: "Built documentation architecture for KDB.AI and PyKX from first principles — collaborating directly with engineers and data scientists to capture accurate, user-focused content",
    result: "Developer resources that empower quants and engineers to self-serve advanced platform capabilities",
    company: "KX",
  },
  {
    problem: "Two 0-to-1 internal applications released with no user documentation",
    action: "Embedded with the product team, tested the applications end-to-end, and produced comprehensive user manuals covering full user journeys",
    result: "Internal teams onboarded quickly with minimal support overhead",
    company: "PrimaryBid",
  },
];

const approachItems = [
  "Restructure for task-based navigation — users come with goals, not curiosity",
  "Reduce cognitive load in API docs — one concept per page, examples before explanation",
  "Align documentation with release cycles — ship docs with the feature, not after",
  "Write for real user workflows, not feature lists",
  "Test documentation like a user — if I can't follow it, neither can they",
  "Treat the doc site as a product — information architecture matters as much as prose",
];

const techEnv = [
  { cat: "Docs-as-code", tools: "Markdown · MDX · Git / GitHub / GitLab · VS Code · MkDocs · Docusaurus" },
  { cat: "API tooling", tools: "OpenAPI / Swagger · Postman · REST · JSON · XML · readme.io" },
  { cat: "Dev environment", tools: "HTML · CSS · JavaScript · Python basics · CLI tools" },
  { cat: "Collaboration", tools: "Confluence · JIRA · Kanban · LucidChart · Figma · Monday.com" },
  { cat: "AI/data platforms", tools: "KDB.AI · PyKX · kdb+ · vector databases · time-series data" },
  { cat: "Style guides", tools: "Google Developer Documentation Style Guide · Microsoft Writing Style Guide" },
];

const testimonialItems = [
  {
    quote: "Ina brings an impressive blend of clarity, precision, and speed to her work. Her ability to translate complex concepts into relevant and user-focused content made her a trusted partner.",
    name: "Gareth Forshaw",
    title: "Content Leader · KX",
  },
  {
    quote: "Ina built our Developer Portal out from nothing — now award-nominated. She learned the platform and product and then wrote for developers, as a developer. A truly great skill.",
    name: "Gerry McQuade",
    title: "Senior Technical Customer Success · PrimaryBid",
  },
];

function HomepageHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Technical writer · systems thinker</p>
          <h1 className="hero__title">Ina Ciobanu</h1>
          <p className="hero__subtitle">
            Senior Technical Writer · KX · London
          </p>
          <p className={styles.heroDescription}>
            I turn complex systems into clear documentation that helps engineers ship, integrate, and adopt new technology faster.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/about/intro">
              About Me →
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.heroButtonOutline)}
              to="mailto:inatechwriter@gmail.com"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualTopline}>
            <span>DOCS / 01</span>
            <span className={styles.visualStatus}>● LIVE SYSTEM</span>
          </div>
          <p className={styles.visualTitle}>
            Clarity at every
            <br />
            <span>checkpoint.</span>
          </p>
          <div className={styles.visualDiagram}>
            <span className={styles.diagramNode}>API</span>
            <span className={styles.diagramLine} />
            <span className={styles.diagramNode}>USER</span>
            <span className={styles.diagramLine} />
            <span className={styles.diagramNode}>OUTCOME</span>
          </div>
          <div className={styles.visualFooter}>
            <span>STRUCTURE</span>
            <span>CLARITY</span>
            <span>IMPACT</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Ina Ciobanu · Senior Technical Writer Portfolio"
      description="Senior technical writer specialising in API docs, developer portals, and AI/data platform documentation. KX · PrimaryBid · London, open to remote."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Head>
      <HomepageHero />
      <main>
        <div className={clsx('container', styles.main)}>

          {/* Impact metrics */}
          <div className={clsx(styles.impactGrid, styles.section)}>
            {impactItems.map((item) => (
              <div key={item.metric} className={styles.impactCard}>
                <div className={styles.impactMetric}>
                  {item.metric}
                </div>
                <div className={styles.impactDesc}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Portfolio sections */}
          <h2 className={styles.sectionHeading}>Portfolio</h2>
          <p className={styles.sectionSubheading}>
            Writing samples grouped by documentation type — not just file format.
          </p>
          <div className={clsx('portfolio-grid', styles.section)}>
            {portfolioSections.map((item) => (
              <Link key={item.title} className="portfolio-card" to={item.href}>
                <div className="portfolio-card__header">
                  <span className="portfolio-card__emoji">{item.emoji}</span>
                  {item.isNew && <span className="portfolio-card__badge">New</span>}
                </div>
                <div className="portfolio-card__title">{item.title}</div>
                <p className="portfolio-card__desc">{item.desc}</p>
                <div className={styles.tagRow}>
                  {item.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* How I think */}
          <h2 className={styles.sectionHeading}>How I Think About Documentation</h2>
          <p className={styles.sectionSubheading}>
            Real problems I've solved — context, approach, and outcome.
          </p>
          <div className={clsx(styles.thinkingList, styles.section)}>
            {thinkingItems.map((item) => (
              <div key={item.company} className={styles.thinkingCard}>
                <div>
                  <div className={styles.thinkingLabel}>Problem · {item.company}</div>
                  <div className={styles.thinkingText}>{item.problem}</div>
                </div>
                <div>
                  <div className={styles.thinkingLabel}>What I Did</div>
                  <div className={styles.thinkingText}>{item.action}</div>
                </div>
                <div>
                  <div className={clsx(styles.thinkingLabel, styles.thinkingLabelResult)}>Result</div>
                  <div className={styles.thinkingText}>{item.result}</div>
                </div>
              </div>
            ))}
          </div>

          {/* How I improve docs */}
          <div className={clsx(styles.twoColGrid, styles.section)}>
            <div>
              <h2 className={styles.sectionHeading}>How I Improve Documentation</h2>
              <p className={clsx(styles.sectionSubheading, styles.sectionSubheadingTight)}>
                The principles I apply to every project.
              </p>
              <div className={styles.approachList}>
                {approachItems.map((item) => (
                  <div key={item} className={styles.approachItem}>
                    <span className={styles.approachArrow}>→</span>
                    <span className={styles.approachText}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical environment */}
            <div>
              <h2 className={styles.sectionHeading}>Technical Environment</h2>
              <p className={clsx(styles.sectionSubheading, styles.sectionSubheadingTight)}>
                Tools and platforms I work with daily.
              </p>
              <div className={styles.techEnvList}>
                {techEnv.map((item) => (
                  <div key={item.cat}>
                    <div className={styles.techEnvCat}>{item.cat}</div>
                    <div className={styles.techEnvTools}>{item.tools}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <h2 className={styles.sectionHeadingSolo}>What People Say</h2>
          <div className={styles.testimonialGrid}>
            {testimonialItems.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>
                  "{t.quote}"
                </p>
                <p className={styles.testimonialName}>{t.name}</p>
                <p className={styles.testimonialTitle}>{t.title}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <Link to="/docs/about/testimonials" className={styles.readAllLink}>
              Read all testimonials →
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
