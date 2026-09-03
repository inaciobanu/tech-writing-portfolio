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
          // Generated from openapi/payflow.yaml — run `npm run gen-api-docs`
          // after editing the spec, then keep this list in sync with the
          // output of docs/api/reference/sidebar.ts.
          items: [
            {
              type: 'category',
              label: 'Payments',
              items: [
                { type: 'doc', id: 'api/reference/create-payment', label: 'Create a payment', className: 'api-method post' },
                { type: 'doc', id: 'api/reference/list-payments', label: 'List payments', className: 'api-method get' },
                { type: 'doc', id: 'api/reference/retrieve-payment', label: 'Retrieve a payment', className: 'api-method get' },
                { type: 'doc', id: 'api/reference/create-refund', label: 'Create a refund', className: 'api-method post' },
              ],
            },
            {
              type: 'category',
              label: 'Customers',
              items: [
                { type: 'doc', id: 'api/reference/create-customer', label: 'Create a customer', className: 'api-method post' },
                { type: 'doc', id: 'api/reference/list-customers', label: 'List customers', className: 'api-method get' },
              ],
            },
          ],
        },
        'api/errors',
        'api/rate-limits',
        'api/kdbai-sample',
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
};

module.exports = sidebars;
