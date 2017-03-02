'use strict'

function urlBase64ToUint8Array (base64String) {
  const len = base64String.length % 4
  const redlen = (4 - len)
  const padding = '='.repeat(redlen % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// ask for permission to show notifications
function permitNotifications () {
  if (Notification.permission === 'granted') { // the user already gave the permission
    return Promise.resolve(true) // simply return a Promise that immediatly resolves to true
  } else {
    // request the permission asynchronously
    return Notification.requestPermission().then((permission) => {
      // the permission may be
      // denied - not notifications allowed
      // (if the permission is denied - the user will not be prompted again if you ask another time - denied will be stored and has to be actively revoked by the user)
      // granted - notifications allowed
      // default - the user did not answer the permission
      // console.log(permission)
      return permission === 'granted'
    })
  }
}

// initialize push - swReg has to be the currently active service worker
function initPush (swReg) {
  // asynchronously check if there is already a subscription
  // pushManager.getSubscription will resolve to undefined or a subscription
  return swReg.pushManager.getSubscription().then((subscription) => {
    if (subscription) { // if there is a subscription - return it
      return subscription
    }
    // if not try to subscribe
    return subscribe(swReg)
  }).then((subscription) => {
    // if there was a subscription or subscribing did work
    // send the subscription to the server
    if (subscription) {
      return sendSubscription(subscription.toJSON())
    }
    return false
  })
}

// send a subscription to the server
function sendSubscription (subscription) {
  // create some fetch options
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json' // you will send JSON
    }),
    body: JSON.stringify({ subscription }) // therefor stringify
  }
  // then JSON to 'push' route of the server
  // if the response is ok - resolve to true
  // in any other case - resolve to false
  return fetch('push', options).then((res) => res.ok).catch((err) => false)
}

// subscribe to push
function subscribe (swReg) {
  // first get the public key from the server
  return fetch('push').then((response) => {
    if (response.ok) {
      return response.json() // the public key will serve as JSON
    }
    throw new Error('Malformed response') // if fetching the public key does not work - throw an error
  }).then((jsonData) => {
    const pubKey = urlBase64ToUint8Array(jsonData.key) // transform the key to a usable format

    // subscribe to push asynchronously
    return swReg.pushManager.subscribe({
      userVisibleOnly: true, // will be neccessary for chrome
      applicationServerKey: pubKey // the public key
    })
  }).catch((err) => {
    // something did not work - simply return false
    // console.log(err)
    return false
  })
}

function initNetworkState () {
  function offline () {
    const dot = document.querySelector('.onlinedot')
    dot.classList.add('offline')
    dot.classList.remove('online')
  }

  function online () {
    const dot = document.querySelector('.onlinedot')
    dot.classList.remove('offline')
    dot.classList.add('online')
  }

  window.addEventListener('online', online)
  window.addEventListener('offline', offline)
  navigator.onLine ? online() : offline()
}

function createServiceWorker (serviceWorkerUrl = 'service-worker.js') { // default parameter for service-worker-file
  // register service worker asynchronous - returns a Promise that resolves to the registration
  return navigator.serviceWorker.register(serviceWorkerUrl).then((registration) => {
    // console.log(registration)
    // get the current service worker - navigator.serviceWorker.ready is a Promise that resolves to the current service worker
    return navigator.serviceWorker.ready
    // return swReady(registration)
  }).catch((err) => {
    // console.dir(err) // if anything is not ok - simply return null
    return null
  })
}

// RUN

createServiceWorker().then((swReg) => { // register service worker asynchronous and get the currently active service worker
  if (swReg) {
    console.log(`Active service worker is ${swReg}`)
    // if there is an active service-worker - ask if you are allowed to create notifications
    // permitNotifications().then((isPermitted) => { // isPermitted will be true or false
    //  if (isPermitted) {
    //    return initPush(swReg) // init push-subscription with the currently active service-worker instance
    //  }
    // })
  }
}).catch((err) => {
  // console.log(err)
})

window.onload = function () {
  initNetworkState()
}
