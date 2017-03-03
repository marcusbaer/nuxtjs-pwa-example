const pkg = require('./package.json')
const User = require('./lib/user')
const Nuxt = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const host = process.env.HOST || pkg.config.nuxt.host || '127.0.0.1'
const port = process.env.PORT || pkg.config.nuxt.port || '3000'

// body parser, to access req.body
app.use(bodyParser.json())

// sessions to create req.session
app.use(session({
  secret: process.env.SESSION_SECRET || 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))

// POST /api/login to log in the user and add him to the req.session.authUser
app.post('/api/login', (req, res) => {
  User.authenticate(req.body.username, req.body.password)
  .then((user) => {
    if (user) {
      req.session.authUser = user
      return res.json(user)
    }
    res.status(401).json({ message: 'Bad credentials' })
  })
})

// POST /api/logout to log out the user and remove it from the req.session
app.post('/api/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// import and set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

// listen the server
app.listen(port, host)
console.log(`Server listening on ${host}:${port}`) // eslint-disable-line no-console
