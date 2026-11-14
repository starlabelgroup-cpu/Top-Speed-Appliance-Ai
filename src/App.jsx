import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './lib/builder' // Initialize Builder.io
import AppRoutes from './AppRoutes'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeAnalytics, setupPerformanceMonitoring } from './utils/analytics'
import validateConfig from './utils/configValidator'

function App() {
  useEffect(() => {
    // Validate configuration on app startup (dev only)
    validateConfig()

    initializeAnalytics()
    setupPerformanceMonitoring()

    const isProd = import.meta.env.PROD

    if (!isProd && 'serviceWorker' in navigator) {
      // Dev + Service Worker is a common source of "Failed to fetch" errors (it can cache/override Vite HMR requests).
      // Unregister any existing SWs so the dev experience remains stable.
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          if (!registrations.length) return

          const hadController = Boolean(navigator.serviceWorker.controller)

          Promise.all(
            registrations.map((registration) => registration.unregister().catch(() => false))
          )
            .then(() => {
              if (hadController) {
                // One reload is needed to drop the old controller.
                window.location.reload()
              }
            })
            .catch(() => {})

          if (typeof caches !== 'undefined' && caches.keys) {
            caches
              .keys()
              .then((keys) => Promise.all(keys.map((k) => caches.delete(k).catch(() => false))))
              .catch(() => {})
          }
        })
        .catch(() => {})
    }

    if (isProd && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          registration.update().catch(() => {})

          const activateAndReload = (worker) => {
            if (!worker) return
            worker.postMessage({ type: 'SKIP_WAITING' })

            if (navigator.serviceWorker.controller) {
              window.location.reload()
            }
          }

          if (registration.waiting) {
            activateAndReload(registration.waiting)
          }

          registration.addEventListener('updatefound', () => {
            const worker = registration.installing
            if (!worker) return

            worker.addEventListener('statechange', () => {
              if (worker.state === 'installed') {
                activateAndReload(worker)
              }
            })
          })
        })
        .catch(() => {})
    }

  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  )
}

export default App
