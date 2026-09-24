// Derived from openapi/payflow.yaml by `npm run gen-api-docs` (see
// scripts/build-api-sidebar.js), so a new endpoint in the spec can't end up
// orphaned (unlinked from the sidebar) the way a hand-maintained list
// could. Runs automatically before `start`/`build` (see package.json
// "prestart"/"prebuild"); run `npm run gen-api-docs` manually first if
// requiring it below fails.
let apiReferenceItems;
try {
  apiReferenceItems = require('./docs/api/reference/sidebar.generated.js').filter(
    (item) => item.type === 'category'
  );
} catch (err) {
  throw new Error(
    'docs/api/reference/sidebar.generated.js is missing or unreadable. Run ' +
      '`npm run gen-api-docs` to generate the API reference pages and sidebar ' +
      `from openapi/payflow.yaml before building. (${err.message})`
  );
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  aboutSidebar: [
    {
      type: 'category',
      label: 'About Me',
      items: [
        'about/intro',
        'about/experience',
        'about/education',
        'about/testimonials',
      ],
    },
  ],
  apiSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'api/intro',
        'api/authentication',
        {
          type: 'category',
          label: 'API Reference',
          link: { type: 'doc', id: 'api/reference/payflow-api' },
          items: apiReferenceItems,
        },
        'api/errors',
        'api/rate-limits',
        'api/rotko-sample',
        'api/connect-api-sample',
      ],
    },
  ],
  guidesSidebar: [
    {
      type: 'category',
      label: 'Developer Guides',
      items: [
        'guides/intro',
        'guides/quickstart',
        'guides/integration',
        'guides/best-practices',
        'guides/code-in-docs',
      ],
    },
  ],
  manualsSidebar: [
    {
      type: 'category',
      label: 'User Manuals',
      items: [
        'manuals/intro',
        'manuals/getting-started',
        'manuals/dashboard',
        'manuals/troubleshooting',
      ],
    },
  ],
  opensourceSidebar: [
    {
      type: 'category',
      label: 'Open Source Docs',
      items: [
        'opensource/intro',
        'opensource/contributing',
        'opensource/architecture',
        'opensource/changelog',
      ],
    },
  ],
  processGovernanceSidebar: [
    {
      type: 'category',
      label: 'Process & Governance',
      items: [
        'process-governance/intro',
        'process-governance/audit',
        'process-governance/structure',
        'process-governance/template-sop',
        'process-governance/governance',
        'process-governance/process-improvement',
      ],
    },
  ],
  fmOperationsSidebar: [
    {
      type: 'category',
      label: 'FM Operations Sample',
      items: [
        'fm-operations/fm-intro',
        'fm-operations/documentation-strategy',
        'fm-operations/ppm-procedure',
      ],
    },
  ],
  glossarySidebar: ['glossary', 'glossary/glossary-intro'],
  metaSidebar: ['meta/building-this-site'],
};

module.exports = sidebars;
