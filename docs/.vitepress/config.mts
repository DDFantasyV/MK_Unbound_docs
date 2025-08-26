import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/MK_Unbound_docs/',
  title: "MK Unbound docs",
  description: "A Quick Access Site for Unbound Developer",
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
        text: 'Markup Language Construct',
        items: [
          { text: 'General', link: '/markup-language-construct/' },
          { text: 'Constant', link: '/markup-language-construct/constant' },
          { text: 'Controller', link: '/markup-language-construct/controller' },
          { text: 'Element', link: '/markup-language-construct/element' },
          { text: 'Event', link: '/markup-language-construct/event' },
          { text: 'Function', link: '/markup-language-construct/function' },
          { text: 'Layout', link: '/markup-language-construct/layout' },
          { text: 'Macro', link: '/markup-language-construct/macro' },
          { text: 'Scope', link: '/markup-language-construct/scope' },
          { text: 'Toplevel Def', link: '/markup-language-construct/toplevel-def' },
          { text: 'Datahub', link: '/markup-language-construct/datahub' },
          { text: 'Debug', link: '/markup-language-construct/debug' },
          { text: 'UI Widget', link: '/markup-language-construct/ui-widget' },
          { text: 'Style and CSS', link: '/markup-language-construct/style-and-css' },
          { text: 'CSS Tip and Trick', link: '/markup-language-construct/css-tip-and-trick' },
          { text: 'Live Coding', link: '/markup-language-construct/live-coding' },
          { text: 'Drag and Drop', link: '/markup-language-construct/drag-and-drop' },
          { text: 'Smart Datahub', link: '/markup-language-construct/smart-datahub' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github',
        link: 'https://github.com/DDFantasyV/MK_Unbound_docs'
      },
      {
        icon: {
          svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUBChkA1+sBY3QBMEABChkAf5H////s4+S3AAAAAXRSTlMAQObYZgAAAAFiS0dEBmFmuH0AAAAHdElNRQfpCBoGAwTahve4AAAAoElEQVQoz3XR7RGDIAwG4LABWhnAngsUcQDL6wCc3X+W8iUkXvv+y3METSCKUUOOpppadxla7nURxUFf8LTWCnCAF/ABDgGjQxAwOC8uPVdg3RhMiNkZPBK8GJjUEjqYcmloMM0Jxr2DDxHAAIfziwDU7/6DNGwZt/1HgpkPdwJbW3Mec3n3Lecjpq3j17u0hyCS0uvSpBnQ7UAWWZO6Gr4XLCde0tm+gQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNS0wOC0yNlQwNjowMzowNCswMDowMHaENVkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjUtMDgtMjZUMDY6MDM6MDQrMDA6MDAH2Y3lAAAAAElFTkSuQmCC" /></svg>'
        },
        link: 'https://forum.korabli.su/topic/127231-ub2-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE-unbound-20/',
      },
    ],

    search: {
      provider: 'local'
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    
    ru: {
      label: 'Русский',
      lang: 'ru',
    }
  },
})
