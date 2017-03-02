'use strict'

/* eslint no-undef: 0 */

// give the cache a name and a version to be able to clean up if the cache is redundant
const CACHE_NAME = 'example-pwa-v1'
const CACHE_ITEMS = [
  // '/offline'
]

// event fired on installing state
self.addEventListener('install', (event) => {
  // console.log('INSTALL EVENT')
  // caches.open asynchronously opens a cache or creates it if it does not exist
  // it will return a Promise and resolve to the cache
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    // if the cache is opened - put all cache-items (se above) in the cache
    // they will be fetched and put in the cache
    return cache.addAll(CACHE_ITEMS)
  }))
})

// event fired on activating state
self.addEventListener('activate', (event) => {
  // console.log('ACTIVATE EVENT')
  // caches.keys asynchronously gets the names of all present caches
  // it returns a Promise that resolves to a list of cache-names
  event.waitUntil(caches.keys().then((keyList) => {
    // keyList.map will iterate through the keyList and map the name of the cache to a Promise or a value
    // inside if a cache is inside the list of caches but is not named like the cache above
    // asynchronously delete the cache - this will return a Promise
    // all the Promises returned by the map-function will be put in a Promise.all-wrapper
    // this deletes all caches that do not have the name from above
    return Promise.all(keyList.map((key) => {
      if (key !== CACHE_NAME) {
        return caches.delete(key)
      }
    }))
  }))
})

// event fired every time any http-request happens
self.addEventListener('fetch', (event) => {
  // console.log('FETCH EVENT')
  // get the original request from the event
  const req = event.request

  // respond asynchronously to the event
  // first open the cache - see above
  event.respondWith(caches.open(CACHE_NAME).then((cache) => { // respondWith expects a Promise
    // try to match the original request in the cache asynchronously
    return cache.match(req).then((response) => { // response can be undefined or the response found
      // offline-first, fall back to network
      return response || fetch(req)
    }).catch((err) => {
      // if cache and network fail, show a generic fallback
      return cache.match('/offline')
    })
  }))
})

// some push event happend - the server sent something
self.addEventListener('push', (event) => {
  let data = {}
  // try to get json-data from the event.data field - this may fail due to malformed json
  try {
    data = event.data.json()
  } catch (err) { }

  // set title and body to the received ones or some default
  const title = data.title || 'Neue Nachricht'
  const body = data.body || 'Eine neue Nachricht wurde empfangen'

  // wait with futher computation until the user was notified
  event.waitUntil(notify(title, body))
})

function notify (title, body) {
  // console.log(`NOTIFY WITH ${title} and ${body}`);
  // be sure that the user realy gave permission to get Notifications
  // this will most likely be true here
  if (Notification.permission === 'granted') {
    // use registration.showNotification to show a Notification
    return self.registration.showNotification(title, { // some title
      lang: 'de-DE',
      icon: 'favicon-32x32.png', // an image
      tag: 'image galery',
      vibrate: [200, 100, 100], // the phone shall vibrate - not implemented in every system
      title,
      body
    })
  }

  return Promise.resolve() // waitUntil (see above) expects a Promise
}

// check if the user clicked on a notification
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification
  notification.close() // closed the notification

  // asynchronously get all clients that are associated with the service worker (windows, frames, webworker...)
  // clients.matchAll will resolve to a Promise with a client-list
  event.waitUntil(clients.matchAll({
    type: 'window' // just get the ones that are windows
  }).then((clientList) => {
    // get the first client that...
    for (let client of clientList) {
      // hat a focus - function
      if ('focus' in client) {
        // if it has a navigate function
        if ('navigate' in client) {
          // navigate the window to index.html
          client.navigate('/')
        }
        // focus the current window
        return client.focus()
      }
    }
    // this part will be called if there has not been any window that could be focues
    // therefore check if the service worker can open a window
    if (clients.openWindow) {
      try {
        // try to open a new window with index.html
        return clients.openWindow('/')
      } catch (err) {
        // something may go wrong
        // console.log(err)
      }
    }
  }))
})
