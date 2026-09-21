import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Illustration from './Illustration';

const sections = [
  {label: 'About Me', to: '/docs/about/intro'},
  {label: 'API Documentation', to: '/docs/api/intro'},
  {label: 'Developer Guides', to: '/docs/guides/intro'},
  {label: 'User Manuals', to: '/docs/manuals/intro'},
  {label: 'Process & Governance', to: '/docs/process-governance/intro'},
  {label: 'Glossary', to: '/docs/glossary'},
];

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3 text--center">
          <Illustration />
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              Hi. Ina here. If you're seeing this, a link's out of date –
              and that's because this portfolio's still growing.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              Try the search bar above, or head to one of these sections:
            </Translate>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '1rem',
            }}>
            {sections.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                className="button button--outline button--primary button--sm">
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
