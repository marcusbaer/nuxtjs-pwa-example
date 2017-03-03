module.exports = {
  build: {
    vendor: [
      // 'vue-app-tools',
      'axios'
    ]
  },
  css: [
    // Load a node.js module
    // 'hover.css/css/hover-min.css',
    'bootstrap/dist/css/bootstrap.css',
    // node.js module but we specify the pre-processor
    // { src: 'bulma', lang: 'sass' },
    // Css file in the project
    '~static/styles.css'
  ],
  env: {
    API_URL: '/api/',
    MSG: {
      'hello': 'Hello Nuxt'
    }
  },
  head: {
    titleTemplate: '%s - Web app',
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-title', content: 'Example PWA' },
      { name: 'application-name', content: 'Example PWA' },
      { name: 'theme-color', content: '#686868' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js' },
      { src: '/worker-main.js' }
    ],
    link: [
      { rel: 'canonical', href: '/' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#006837' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },
  loading: {
    color: 'red',
    height: '10px'
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    '~plugins/i18n'
  ],
  store: true
}
