import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const portfolioItems = [
  {
    emoji: '👤',
    title: 'About Me',
    desc: '18 years across IT, fintech, SaaS, and more. Currently Senior Technical Writer at KX, London.',
    href: '/docs/about/intro',
  },
  {
    emoji: '🔌',
    title: 'API Documentation',
    desc: 'REST API reference including real-world samples from KDB.AI and PrimaryBid Connect API.',
    href: '/docs/api/intro',
  },
  {
    emoji: '🛠️',
    title: 'Developer Guides',
    desc: 'Quickstart, integration walkthrough, and production best practices for developers.',
    href: '/docs/guides/intro',
  },
  {
    emoji: '📖',
    title: 'User Manuals',
    desc: 'End-user documentation covering onboarding, dashboard features, and troubleshooting.',
    href: '/docs/manuals/intro',
  },
  {
    emoji: '🌐',
    title: 'Open Source Docs',
    desc: 'Contributing guide, architecture overview, and changelog for an open source project.',
    href: '/docs/opensource/intro',
  },
];

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Ina Ciobanu</h1>
        <p className="hero__subtitle">
          Senior Technical Writer · KX · London
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          API docs · Developer portals · Fintech · AI/ML tooling · 18 years experience
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '-0.5rem' }}>
          🌙 Dark mode available — toggle top right
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/about/intro">
            View Portfolio →
          </Link>
          <Link
            className="button button--outline button--lg"
            style={{ marginLeft: '1rem', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
            to="mailto:ciobanu.cati@gmail.com"
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
      title="Ina · Technical Writer Portfolio"
      description="Technical writing portfolio — API docs, developer guides, user manuals, and open source documentation."
    >
      <HomepageHero />
      <main>
        <section style={{ padding: '3rem 0', background: 'var(--ifm-background-color)' }}>
          <div className="container">

            <div className="about-banner">
              Certified Senior Technical Writer with 18 years of experience across IT, fintech, SaaS, healthcare, and e-commerce.
              Currently at <strong>KX</strong>, documenting KDB.AI and PyKX for data scientists, quants, and enterprise engineering teams.
              Previously Technical Writer II at <strong>PrimaryBid</strong>. Founder of award-winning <strong>SEOzon Prime</strong>.
              Available for senior technical writing roles in London and remotely.
            </div>

            <h2 style={{ marginTop: '2.5rem', fontStyle: 'italic', fontWeight: 'normal' }}>
              Portfolio Samples
            </h2>

            <div className="portfolio-grid">
              {portfolioItems.map((item) => (
                <Link key={item.title} className="portfolio-card" to={item.href}>
                  <span className="portfolio-card__emoji">{item.emoji}</span>
                  <div className="portfolio-card__title">{item.title}</div>
                  <p className="portfolio-card__desc">{item.desc}</p>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px' }}>
              <h3 style={{ marginTop: 0 }}>Tools & Skills</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Docs-as-code:</strong> Docusaurus · MkDocs · Markdown · MDX · Git / GitHub / GitLab · VS Code
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>API tooling:</strong> OpenAPI / Swagger · Postman · REST · JSON · XML · readme.io
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Dev skills:</strong> HTML · CSS · JavaScript · Python basics (certified front-end developer)
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Collaboration:</strong> Confluence · JIRA · Kanban · LucidChart · Figma · Monday.com
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Style guides:</strong> Google Developer Documentation Style Guide · Microsoft Writing Style Guide
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Industries:</strong> Fintech · AI/ML tooling · SaaS · Healthcare · Legal · E-commerce · Investment platforms
              </p>
            </div>

            <h2 style={{ marginTop: '3rem', fontStyle: 'italic', fontWeight: 'normal' }}>
              What People Say
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
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
                  borderRadius: '0 8px 8px 0',
                  background: 'var(--ifm-background-color)',
                }}>
                  <p style={{ fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.6 }}>
                    "{t.quote}"
                  </p>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{t.name}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.65 }}>{t.title}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <Link to="/docs/about/testimonials" style={{ fontSize: '0.9rem' }}>
                Read all testimonials →
              </Link>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
