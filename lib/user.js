const DEMO_USER = {
  username: 'demo',
  password: 'demo'
}

function _getPublicUserData (user) {
  return {
    username: user.username
  }
}

module.exports = {
  authenticate (username, password) {
    return new Promise((resolve, reject) => {
      if (username === DEMO_USER.username && password === DEMO_USER.password) {
        resolve(_getPublicUserData(DEMO_USER))
      } else {
        resolve(null)
      }
    })
  }
}
