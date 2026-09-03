// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ina Ciobanu | Senior Technical Writer',
  tagline: 'Clear documentation for complex products — APIs, developer tools, and beyond.',
  favicon: 'img/favicon.png',

  // Update this to your GitHub Pages URL once deployed
  url: 'https://inaciobanu.github.io',
  baseUrl: '/tech-writing-portfolio/',

  organizationName: 'inaciobanu',
  projectName: 'tech-writing-portfolio',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          showLastUpdateTime: true,
          docItemComponent: '@theme/ApiItem',
        },
        blog: false, // Portfolio doesn't need a blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    // The OpenAPI theme's code-sample generator (postman-code-generators)
    // imports Node's `path` module, which webpack 5 no longer polyfills
    // for the browser bundle by default.
    function polyfillNodePathForOpenApi() {
      return {
        name: 'polyfill-node-path-for-openapi',
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                path: require.resolve('path-browserify'),
              },
            },
          };
        },
      };
    },
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'default',
        config: {
          payflow: {
            specPath: 'openapi/payflow.yaml',
            outputDir: 'docs/api/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og-image.png',
      metadata: [
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      navbar: {
        title: 'Ina Ciobanu · Technical Writer',
        logo: {
          alt: 'Portfolio Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'aboutSidebar',
            position: 'left',
            label: 'About',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Developer Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'manualsSidebar',
            position: 'left',
            label: 'User Manuals',
          },
          {
            type: 'docSidebar',
            sidebarId: 'opensourceSidebar',
            position: 'left',
            label: 'Open Source',
          },
          {
            type: 'docSidebar',
            sidebarId: 'processGovernanceSidebar',
            position: 'left',
            label: 'Process & Governance',
          },
          {
            href: 'https://github.com/inaciobanu/tech-writing-portfolio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Portfolio',
            items: [
              { label: 'About Me', to: '/docs/about/intro' },
              { label: 'API Documentation', to: '/docs/api/intro' },
              { label: 'Developer Guides', to: '/docs/guides/intro' },
              { label: 'User Manuals', to: '/docs/manuals/intro' },
              { label: 'Open Source Docs', to: '/docs/opensource/intro' },
              { label: 'Process & Governance', to: '/docs/process-governance/intro' },
            ],
          },
          {
            title: 'Connect',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/inaciobanu' },
              { label: 'Email', href: 'mailto:inatechwriter@gmail.com' },
              { label: 'Medium', href: 'https://medium.com/@ina_ciobanu' },
              { label: 'GitHub', href: 'https://github.com/inaciobanu' },
              { label: 'X', href: 'https://x.com/ina_ciobanu' },
              { label: 'Codecademy', href: 'https://www.codecademy.com/profiles/inaciobanu' },
              { label: 'WithinLondon blog', href: 'https://www.withinlondon.com/blog' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Ina Ciobanu. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'python'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
