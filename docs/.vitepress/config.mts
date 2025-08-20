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
          { text: 'General', link: '/basic-function/' },
          { text: 'Build Stage', link: '/basic-function/build-stage' },
          { text: 'Element Definition', link: '/basic-function/element-definition' },
          { text: 'Scope', link: '/basic-function/scope' },
          { text: 'Binding', link: '/basic-function/binding' },
          { text: 'Controller', link: '/basic-function/controller' },
          { text: 'Style Display Object', link: '/basic-function/style-display-object' },
        ]
      },
      {
        text: 'Declarative Markup Language and S-Expression',
        items: [
          { text: 'General', link: '/declarative-markup-language-and-s-expression/' },
          { text: 'Macro', link: '/declarative-markup-language-and-s-expression/macro' },
          { text: 'Layout Execution', link: '/declarative-markup-language-and-s-expression/layout-execution' },
          { text: 'Data Type', link: '/declarative-markup-language-and-s-expression/data-type' },
          { text: 'Enum', link: '/declarative-markup-language-and-s-expression/enum' },
        ]
      },
      {
        text: 'Markup language construct',
        items: [
          { text: 'General', link: '/markup-language-construct/' },
          { text: 'Constant', link: '/markup-language-construct/constant' },
          { text: 'Controller', link: '/markup-language-construct/controller' },
          { text: 'Element', link: '/markup-language-construct/element' },
          { text: 'Event', link: '/markup-language-construct/event' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DDFantasyV/MK_Unbound_docs' }
    ],

    search: {
      provider: 'local'
    }
  }
})
