module.exports = {
  build: {
    vendor: [
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },
  loading: {
    color: 'red',
    height: '10px'
  },
  plugins: [
    // '~plugins/vue-app-tools'
  ],
  store: true
}
