const CACHE_NAME = 'top-speed-v2'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Cache add error:', err)
      })
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(response => {
        if (response) {
          return response
        }

        return fetch(request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response
            }

            const responseToCache = response.clone()
            cache.put(request, responseToCache)
            return response
          })
          .catch(() => {
            return caches.match('/index.html')
          })
      })
    })
  )
})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
