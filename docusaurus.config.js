// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ina Ciobanu | Senior Technical Writer',
  tagline: 'Clear documentation for complex products — APIs, developer tools, and beyond.',
  favicon: 'img/favicon.ico',

  // Update this to your GitHub Pages URL once deployed
  url: 'https://inaciobanu.github.io',
  baseUrl: '/tech-writing-portfolio/',

  organizationName: 'inaciobanu',
  projectName: 'tech-writing-portfolio',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
        },
        blog: false, // Portfolio doesn't need a blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
            ],
          },
          {
            title: 'Connect',
            items: [
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/inaciobanu' },
              { label: 'Medium', href: 'https://medium.com/@ina_ciobanu' },
              { label: 'GitHub', href: 'https://github.com/inaciobanu' },
              { label: 'Within London', href: 'https://www.withinlondon.com' },
              { label: 'Email', href: 'mailto:ciobanu.cati@gmail.com' },
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
