'use strict'

// function urlBase64ToUint8Array (base64String) {
//   const len = base64String.length % 4
//   const redlen = (4 - len)
//   const padding = '='.repeat(redlen % 4)
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
//
//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)
//
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

// initialize push - serviceWorkerRegistration has to be the currently active service worker
// function initPush (serviceWorkerRegistration) {
//   // pushManager.getSubscription will resolve to undefined or a subscription
//   return serviceWorkerRegistration.pushManager.getSubscription().then((subscription) => {
//     if (subscription) { // if there is a subscription - return it
//       return subscription
//     }
//     return subscribe(serviceWorkerRegistration)
//   }).then((subscription) => {
//     if (subscription) {
//       return sendSubscription(subscription.toJSON())
//     }
//     return false
//   })
// }

// function sendSubscription (subscription) {
//   const options = {
//     method: 'POST',
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     }),
//     body: JSON.stringify({ subscription })
//   }
//   return fetch('subscribe', options).then((res) => res.ok).catch((err) => false)
// }

// subscribe to push services
// function subscribe (swReg) {
//   // first get the public key from the server
//   return fetch('subscribe').then((response) => {
//     if (response.ok) {
//       return response.json()
//     }
//     throw new Error('Malformed response')
//   }).then((jsonData) => {
//     const publicKey = urlBase64ToUint8Array(jsonData.key) // transforms key to a usable format
//     return swReg.pushManager.subscribe({
//       userVisibleOnly: true, // neccessary for Chrome
//       applicationServerKey: publicKey
//     })
//   }).catch((err) => {
//     return false
//   })
// }

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

// ask for permission to show notifications
function permitNotifications () {
  if (Notification.permission === 'granted') { // user already gave permission
    return Promise.resolve(true)
  } else {
    // request the permission asynchronously
    return Notification.requestPermission().then((permission) => {
      // the permission may be
      // denied - not notifications allowed (if the permission is denied - the user will not be prompted again if you ask another time - denied will be stored and has to be actively revoked by the user)
      // granted - notifications allowed
      // default - the user did not answer the permission
      return permission === 'granted'
    })
  }
}

function registerServiceWorker (serviceWorkerUrl = 'service-worker.js') {
  return navigator.serviceWorker.register(serviceWorkerUrl).then((registration) => {
    // get the current service worker - navigator.serviceWorker.ready is a Promise that resolves to the current service worker
    return navigator.serviceWorker.ready
  }).catch((err) => {
    return null
  })
}

// RUN

registerServiceWorker().then((swReg) => { // register service worker asynchronous and gets the currently active service worker
  if (swReg) {
    console.log(`Active service worker is ${swReg}`)
    // if there is an active service-worker - ask if you are allowed to create notifications
    permitNotifications().then((isPermitted) => { // isPermitted will be true or false
      // if (isPermitted) {
      //   return initPush(swReg) // init push-subscription with the currently active service-worker instance
      // }
    })
  }
}).catch((err) => {
  // console.log(err)
})

window.onload = function () {
  initNetworkState()
}
