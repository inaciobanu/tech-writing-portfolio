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
        'api/endpoints',
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
};

module.exports = sidebars;
