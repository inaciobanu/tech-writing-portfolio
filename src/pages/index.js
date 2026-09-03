import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

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
    desc: 'Technical documentation for KDB.AI and PyKX — real-time vector databases and Python analytics libraries used by quants and data scientists.',
    href: '/docs/api/kdbai-sample',
    tags: ['KDB.AI', 'PyKX', 'AI/ML', 'Fintech'],
  },
  {
    emoji: '🛠️',
    title: 'Developer Guides & Tutorials',
    desc: 'Quickstart guides, integration walkthroughs, and production best practices that reduce onboarding friction and support tickets.',
    href: '/docs/guides/intro',
    tags: ['Quickstart', 'Integration', 'Best Practices'],
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

function HomepageHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Ina Ciobanu</h1>
        <p className="hero__subtitle">
          Senior Technical Writer · KX · London
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto 0.5rem', lineHeight: 1.6 }}>
          I work on complex systems where documentation directly affects how quickly engineers can ship, integrate, and adopt new technology.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '2rem' }}>
          🌙 Dark mode available — toggle top right
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/about/intro">
            About Me →
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{ marginLeft: '1rem', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
            to="mailto:inatechwriter@gmail.com"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Ina Ciobanu · Senior Technical Writer Portfolio"
      description="Senior technical writer specialising in API docs, developer portals, and AI/data platform documentation. KX · PrimaryBid · London."
    >
      <HomepageHero />
      <main>
        <div className="container" style={{ padding: '3rem 0 4rem' }}>

          {/* Impact metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3.5rem',
          }}>
            {impactItems.map((item) => (
              <div key={item.metric} style={{
                padding: '1.25rem 1.5rem',
                background: 'var(--ifm-color-emphasis-100)',
                borderRadius: '4px',
                borderTop: '3px solid var(--ifm-color-primary)',
              }}>
                <div style={{ fontSize: '1.6rem', fontWeight: '300', color: 'var(--ifm-color-primary)', marginBottom: '0.4rem' }}>
                  {item.metric}
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Portfolio sections */}
          <h2 style={{ fontWeight: '300', fontSize: '1.6rem', marginBottom: '0.25rem' }}>Portfolio</h2>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Writing samples grouped by documentation type — not just file format.
          </p>
          <div className="portfolio-grid" style={{ marginBottom: '3.5rem' }}>
            {portfolioSections.map((item) => (
              <Link key={item.title} className="portfolio-card" to={item.href}>
                <span className="portfolio-card__emoji">{item.emoji}</span>
                <div className="portfolio-card__title">{item.title}</div>
                <p className="portfolio-card__desc">{item.desc}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      background: 'var(--ifm-color-emphasis-200)',
                      borderRadius: '100px',
                      color: 'var(--ifm-color-primary)',
                      fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* How I think */}
          <h2 style={{ fontWeight: '300', fontSize: '1.6rem', marginBottom: '0.25rem' }}>How I Think About Documentation</h2>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Real problems I've solved — context, approach, and outcome.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
            {thinkingItems.map((item) => (
              <div key={item.company} style={{
                padding: '1.5rem',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: '4px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ifm-color-primary)', marginBottom: '0.4rem', fontWeight: 500 }}>Problem · {item.company}</div>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{item.problem}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ifm-color-primary)', marginBottom: '0.4rem', fontWeight: 500 }}>What I Did</div>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{item.action}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2e7d32', marginBottom: '0.4rem', fontWeight: 500 }}>Result</div>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>{item.result}</div>
                </div>
              </div>
            ))}
          </div>

          {/* How I improve docs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}>
            <div>
              <h2 style={{ fontWeight: '300', fontSize: '1.6rem', marginBottom: '0.25rem' }}>How I Improve Documentation</h2>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                The principles I apply to every project.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {approachItems.map((item) => (
                  <div key={item} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--ifm-color-primary)', fontWeight: 'bold', flexShrink: 0 }}>→</span>
                    <span style={{ opacity: 0.8 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical environment */}
            <div>
              <h2 style={{ fontWeight: '300', fontSize: '1.6rem', marginBottom: '0.25rem' }}>Technical Environment</h2>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Tools and platforms I work with daily.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {techEnv.map((item) => (
                  <div key={item.cat}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ifm-color-primary)', fontWeight: 500, marginBottom: '0.2rem' }}>{item.cat}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: 1.5 }}>{item.tools}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <h2 style={{ fontWeight: '300', fontSize: '1.6rem', marginBottom: '1.25rem' }}>What People Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1rem' }}>
            {[
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
            ].map((t) => (
              <div key={t.name} style={{
                padding: '1.5rem',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderLeft: '3px solid var(--ifm-color-primary)',
                borderRadius: '0 4px 4px 0',
              }}>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  "{t.quote}"
                </p>
                <p style={{ margin: 0, fontWeight: '500', fontSize: '0.85rem' }}>{t.name}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>{t.title}</p>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '3.5rem' }}>
            <Link to="/docs/about/testimonials" style={{ fontSize: '0.9rem' }}>
              Read all testimonials →
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  );
}
