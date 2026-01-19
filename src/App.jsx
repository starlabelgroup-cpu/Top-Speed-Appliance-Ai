import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './lib/builder' // Initialize Builder.io
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Keywords from './components/Keywords'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import SEOSchema from './components/SEOSchema'
import { initializeAnalytics, setupPerformanceMonitoring } from './utils/analytics'
import { startHealthCheck, stopHealthCheck } from './services/agentService'
import { adminAuth } from './utils/adminAuth'
import validateConfig from './utils/configValidator'

const Gallery = lazy(() => import('./components/Gallery'))
const Videos = lazy(() => import('./components/Videos'))
const PromotionalBroadcasting = lazy(() => import('./components/PromotionalBroadcasting'))
const Reviews = lazy(() => import('./components/Reviews'))
const About = lazy(() => import('./components/About'))
const Booking = lazy(() => import('./components/Booking'))
const Maps = lazy(() => import('./components/Maps'))
const Contact = lazy(() => import('./components/Contact'))
const Blog = lazy(() => import('./components/Blog'))
const BlogPost = lazy(() => import('./components/BlogPost'))
const Privacy = lazy(() => import('./components/Privacy'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const PromotionalPlatformPage = lazy(() => import('./pages/PromotionalPlatformPage'))
const ServiceRequestPage = lazy(() => import('./pages/ServiceRequestPage'))
const QrLeadPage = lazy(() => import('./pages/QrLeadPage'))
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'))
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage'))
const LocationServicePage = lazy(() => import('./pages/LocationServicePage'))
const TelecomArchitecturePage = lazy(() => import('./pages/TelecomArchitecturePage'))
const AdminLogin = lazy(() => import('./components/AdminLogin'))
const AdminLeadsPage = lazy(() => import('./pages/AdminLeadsPage'))
const AdvancedAIAgent = lazy(() => import('./components/AdvancedAIAgent'))
const ServicePage = lazy(() => import('./components/ServicePage'))
const CityPage = lazy(() => import('./components/CityPage'))
const NetworkArchitecture = lazy(() => import('./components/NetworkArchitecture'))

function DeferredMount({ children, timeoutMs = 1500 }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mount = () => setMounted(true)

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(mount, { timeout: timeoutMs })
      return () => window.cancelIdleCallback?.(id)
    }

    const timerId = window.setTimeout(mount, 250)
    return () => window.clearTimeout(timerId)
  }, [timeoutMs])

  return mounted ? children : null
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Keywords />

      <DeferredMount>
        <Suspense fallback={null}>
          <PromotionalBroadcasting />
          <Gallery />
          <Videos />
          <Reviews />
          <About />
          <Booking />
          <Maps />
          <Contact />
        </Suspense>
      </DeferredMount>
    </>
  )
}

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

    // Health check disabled - no backend agent available
    // startHealthCheck()

    return () => {
      // stopHealthCheck()
    }
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <SEOSchema />
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/promotional-platform" element={<PromotionalPlatformPage />} />
            <Route path="/service-request" element={<ServiceRequestPage />} />
            <Route path="/qr" element={<QrLeadPage />} />
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/network" element={<NetworkArchitecture />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/telecom-architecture" element={<TelecomArchitecturePage />} />
            <Route path="/locations/:citySlug/:serviceSlug" element={<LocationServicePage />} />
            {/* SEO Aliases for High-Intent Location + Service Pages (23 Pages) */}
            {/* Miami (5 services) */}
            <Route path="/dryer-repair-miami-fl" element={<LocationServicePage citySlug="miami" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-miami-fl" element={<LocationServicePage citySlug="miami" serviceSlug="washer-dryer-repair" />} />
            <Route path="/refrigerator-repair-miami-fl" element={<LocationServicePage citySlug="miami" serviceSlug="refrigerator-repair" />} />
            <Route path="/oven-stove-repair-miami-fl" element={<LocationServicePage citySlug="miami" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-miami-fl" element={<LocationServicePage citySlug="miami" serviceSlug="dishwasher-repair" />} />
            {/* Fort Lauderdale (4 services) */}
            <Route path="/dryer-repair-fort-lauderdale-fl" element={<LocationServicePage citySlug="fort-lauderdale" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-fort-lauderdale-fl" element={<LocationServicePage citySlug="fort-lauderdale" serviceSlug="washer-dryer-repair" />} />
            <Route path="/oven-stove-repair-fort-lauderdale-fl" element={<LocationServicePage citySlug="fort-lauderdale" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-fort-lauderdale-fl" element={<LocationServicePage citySlug="fort-lauderdale" serviceSlug="dishwasher-repair" />} />
            {/* Boca Raton (4 services) */}
            <Route path="/dryer-repair-boca-raton-fl" element={<LocationServicePage citySlug="boca-raton" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-boca-raton-fl" element={<LocationServicePage citySlug="boca-raton" serviceSlug="washer-dryer-repair" />} />
            <Route path="/oven-stove-repair-boca-raton-fl" element={<LocationServicePage citySlug="boca-raton" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-boca-raton-fl" element={<LocationServicePage citySlug="boca-raton" serviceSlug="dishwasher-repair" />} />
            {/* West Palm Beach (3 services) */}
            <Route path="/dryer-repair-west-palm-beach-fl" element={<LocationServicePage citySlug="west-palm-beach" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-west-palm-beach-fl" element={<LocationServicePage citySlug="west-palm-beach" serviceSlug="washer-dryer-repair" />} />
            <Route path="/refrigerator-repair-west-palm-beach-fl" element={<LocationServicePage citySlug="west-palm-beach" serviceSlug="refrigerator-repair" />} />
            {/* Delray Beach (3 services) */}
            <Route path="/dryer-repair-delray-beach-fl" element={<LocationServicePage citySlug="delray-beach" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-delray-beach-fl" element={<LocationServicePage citySlug="delray-beach" serviceSlug="washer-dryer-repair" />} />
            <Route path="/oven-stove-repair-delray-beach-fl" element={<LocationServicePage citySlug="delray-beach" serviceSlug="oven-stove-repair" />} />
            {/* Boynton Beach (5 services) */}
            <Route path="/dryer-repair-boynton-beach-fl" element={<LocationServicePage citySlug="boynton-beach" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-boynton-beach-fl" element={<LocationServicePage citySlug="boynton-beach" serviceSlug="washer-dryer-repair" />} />
            <Route path="/refrigerator-repair-boynton-beach-fl" element={<LocationServicePage citySlug="boynton-beach" serviceSlug="refrigerator-repair" />} />
            <Route path="/oven-stove-repair-boynton-beach-fl" element={<LocationServicePage citySlug="boynton-beach" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-boynton-beach-fl" element={<LocationServicePage citySlug="boynton-beach" serviceSlug="dishwasher-repair" />} />
            {/* Delray Beach - Additional Services (5 services) */}
            <Route path="/refrigerator-repair-delray-beach-fl" element={<LocationServicePage citySlug="delray-beach" serviceSlug="refrigerator-repair" />} />
            <Route path="/dishwasher-repair-delray-beach-fl" element={<LocationServicePage citySlug="delray-beach" serviceSlug="dishwasher-repair" />} />
            {/* Jupiter (5 services) */}
            <Route path="/dryer-repair-jupiter-fl" element={<LocationServicePage citySlug="jupiter" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-jupiter-fl" element={<LocationServicePage citySlug="jupiter" serviceSlug="washer-dryer-repair" />} />
            <Route path="/refrigerator-repair-jupiter-fl" element={<LocationServicePage citySlug="jupiter" serviceSlug="refrigerator-repair" />} />
            <Route path="/oven-stove-repair-jupiter-fl" element={<LocationServicePage citySlug="jupiter" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-jupiter-fl" element={<LocationServicePage citySlug="jupiter" serviceSlug="dishwasher-repair" />} />
            {/* Palm Beach Gardens (5 services) */}
            <Route path="/dryer-repair-palm-beach-gardens-fl" element={<LocationServicePage citySlug="palm-beach-gardens" serviceSlug="dryer-repair" />} />
            <Route path="/washer-dryer-repair-palm-beach-gardens-fl" element={<LocationServicePage citySlug="palm-beach-gardens" serviceSlug="washer-dryer-repair" />} />
            <Route path="/refrigerator-repair-palm-beach-gardens-fl" element={<LocationServicePage citySlug="palm-beach-gardens" serviceSlug="refrigerator-repair" />} />
            <Route path="/oven-stove-repair-palm-beach-gardens-fl" element={<LocationServicePage citySlug="palm-beach-gardens" serviceSlug="oven-stove-repair" />} />
            <Route path="/dishwasher-repair-palm-beach-gardens-fl" element={<LocationServicePage citySlug="palm-beach-gardens" serviceSlug="dishwasher-repair" />} />

            {/* New Service Pages (High-Converting) */}
            <Route path="/washer-repair" element={<ServicePage service="washer" />} />
            <Route path="/dryer-repair" element={<ServicePage service="dryer" />} />
            <Route path="/refrigerator-repair" element={<ServicePage service="refrigerator" />} />
            <Route path="/oven-stove-repair" element={<ServicePage service="oven" />} />

            {/* New City Pages (Local SEO) */}
            <Route path="/appliance-repair-fort-lauderdale" element={<CityPage city="fort-lauderdale" />} />
            <Route path="/appliance-repair-hollywood-fl" element={<CityPage city="hollywood-fl" />} />
            <Route path="/appliance-repair-plantation-fl" element={<CityPage city="plantation-fl" />} />
            <Route path="/appliance-repair-pembroke-pines-fl" element={<CityPage city="pembroke-pines-fl" />} />
            <Route path="/appliance-repair-delray-beach-fl" element={<CityPage city="delray-beach-fl" />} />
            <Route path="/appliance-repair-boynton-beach-fl" element={<CityPage city="boynton-beach-fl" />} />
            <Route path="/appliance-repair-jupiter-fl" element={<CityPage city="jupiter-fl" />} />
            <Route path="/appliance-repair-palm-beach-gardens-fl" element={<CityPage city="palm-beach-gardens-fl" />} />

            <Route path="/account" element={<Dashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
            <Route path="/:seoSlug" element={<SeoLandingPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <DeferredMount>
          <Suspense fallback={null}>
            <AdvancedAIAgent />
          </Suspense>
        </DeferredMount>
      </Router>
    </ErrorBoundary>
  )
}

export default App
