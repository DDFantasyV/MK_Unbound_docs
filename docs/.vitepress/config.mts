import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/MK_Unbound_docs/',
  title: "MK Unbound docs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/guide' }
    ],

    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Computed Expression', link: '/guide/computed-expression' },
        ]
      },
      {
        text: 'Basic Function',
        items: [
          { text: 'Build Stage', link: '/basic-function/build-stage' },
          { text: 'Element Definition', link: '/basic-function/element-definition' },
          { text: 'Scope', link: '/basic-function/scope' },
          { text: 'Binding', link: '/basic-function/binding' },
          { text: 'Controller', link: '/basic-function/controller' },
          { text: 'Style Display Object', link: '/basic-function/style-display-object' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DDFantasyV/MK_Unbound_docs' }
    ],

    search: {
      provider: 'local'
    }
  }
})
