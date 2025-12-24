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

  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return

  const isNavigation = request.mode === 'navigate'
  const isAsset = request.destination === 'script' || request.destination === 'style'
  const isImageOrFont = request.destination === 'image' || request.destination === 'font'

  const cacheFirst = async () => {
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(request)
    if (cached) return cached

    const response = await fetch(request)
    if (response && response.status === 200 && response.type !== 'error') {
      cache.put(request, response.clone())
    }
    return response
  }

  const networkFirst = async () => {
    const cache = await caches.open(CACHE_NAME)
    try {
      const response = await fetch(request)
      if (response && response.status === 200 && response.type !== 'error') {
        cache.put(request, response.clone())
      }
      return response
    } catch (err) {
      const cached = await cache.match(request)
      if (cached) return cached
      return isNavigation ? caches.match('/index.html') : Response.error()
    }
  }

  // HTML and app assets should be network-first to prevent stale bundles
  if (isNavigation || isAsset) {
    event.respondWith(networkFirst())
    return
  }

  // Images/fonts can be cache-first
  if (isImageOrFont) {
    event.respondWith(cacheFirst())
    return
  }

  // Default: network-first
  event.respondWith(networkFirst())
})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
