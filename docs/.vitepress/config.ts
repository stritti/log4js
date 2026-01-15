import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Log4js',
  description: 'The Logging Framework for JavaScript',
  base: '/log4js/',
  
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Server', link: '/server/' },
      { 
        text: 'v3.0.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Migration Guide', link: '/migration' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Loggers', link: '/guide/loggers' },
            { text: 'Log Levels', link: '/guide/levels' },
            { text: 'Appenders', link: '/guide/appenders' },
            { text: 'WebSocket Appender', link: '/guide/websocket-appender' },
            { text: 'Layouts', link: '/guide/layouts' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'TypeScript', link: '/guide/typescript' },
            { text: 'Browser Usage', link: '/guide/browser' },
            { text: 'Best Practices', link: '/guide/best-practices' }
          ]
        },
        {
          text: 'Development',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Releases', link: '/guide/releases' }
          ]
        }
      ],
      '/server/': [
        {
          text: 'Node.js Server',
          items: [
            { text: 'Overview', link: '/server/' },
            { text: 'Installation', link: '/server/installation' },
            { text: 'Configuration', link: '/server/configuration' },
            { text: 'API Reference', link: '/server/api' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/stritti/log4js' }
    ],

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright © 2007-2026 Stephan Strittmatter'
    },

    search: {
      provider: 'local'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/log4js/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#0099CC' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Log4js' }],
    ['meta', { name: 'og:image', content: 'https://stritti.github.io/log4js/og-image.png' }]
  ]
})
