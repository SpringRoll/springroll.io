import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SpringRoll',
  tagline: 'SpringRoll is a light-weight toolset for building accessible HTML5 games, focusing on utilities to help developers make games more accessible and deployable at scale.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://springroll.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SpringRoll', // Usually your GitHub org/user name.
  projectName: 'springroll', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/SpringRoll',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/SpringRoll',
        },
        theme: {
          customCss: './src/scss/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    announcementBar: {
      id: 'springroll_release',
      content:
        '<a href="https://github.com/SpringRoll/SpringRoll/releases/tag/2.6.0" target="_blank">SpringRoll 2.6.0</a> is out now!',
      backgroundColor: '#095B8F',
      textColor: 'white',
    },
    navbar: {
      title: 'SpringRoll',
      logo: {
        alt: 'SpringRoll Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'springrollSidebar',
          position: 'left',
          label: 'SpringRoll',
        },
        {
          type: 'docSidebar',
          sidebarId: 'containerSidebar',
          position: 'left',
          label: 'SpringRoll Container',
        },
        {
          type: 'docSidebar',
          sidebarId: 'examplesSidebar',
          position: 'left',
          label: 'Examples',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/SpringRoll',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'SpringRoll',
              to: '/docs/springroll/getting-started',
            },
            {
              label: 'SpringRoll Container',
              to: '/docs/springroll-container/getting-started',
            },
            {
              label: 'Examples',
              to: '/docs/Examples/introduction',
            },
          ],
        },
        {
          title: 'Direct Links',
          items: [
            {
              label: 'SpringRoll Container',
              href: 'https://github.com/SpringRoll/SpringRollContainer',
            },
            {
              label: 'SpringRoll',
              href: 'https://github.com/SpringRoll/SpringRoll',
            },
            {
              label: 'Bellhop',
              href: 'https://github.com/SpringRoll/Bellhop',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SpringRoll',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SpringRoll. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
