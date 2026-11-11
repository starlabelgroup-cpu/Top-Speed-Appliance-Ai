import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PageMeta from './components/PageMeta'
import Footer from './components/Footer'
import SEOSchema from './components/SEOSchema'
import ServiceReserveScript from './components/ServiceReserveScript'
import HomePage from './pages/HomePage'

const Blog = lazy(() => import('./components/Blog'))
const BlogPost = lazy(() => import('./components/BlogPost'))
const Privacy = lazy(() => import('./components/Privacy'))
const ServiceRequestPage = lazy(() => import('./pages/ServiceRequestPage'))
const TrackPage = lazy(() => import('./pages/TrackPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const MediaPage = lazy(() => import('./pages/MediaPage'))
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'))
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage'))
const LocationServicePage = lazy(() => import('./pages/LocationServicePage'))
const AdminLogin = lazy(() => import('./components/AdminLogin'))
const AdminLeadsPage = lazy(() => import('./pages/AdminLeadsPage'))
const AdvancedAIAgent = lazy(() => import('./components/AdvancedAIAgent'))
const ServicePage = lazy(() => import('./components/ServicePage'))
const CityPage = lazy(() => import('./components/CityPage'))
const NetworkArchitecture = lazy(() => import('./components/NetworkArchitecture'))
const BrandsPage = lazy(() => import('./pages/BrandsPage'))
const ServiceDirectoryPage = lazy(() => import('./pages/ServiceDirectoryPage'))
const InfoPage = lazy(() => import('./pages/InfoPage'))

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

function AppRoutes() {
  return (
    <>
      <ServiceReserveScript />
      <SEOSchema />
      <PageMeta />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service-request" element={<ServiceRequestPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/media-os" element={<MediaPage />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/service-directory" element={<ServiceDirectoryPage />} />
          <Route path="/network" element={<NetworkArchitecture />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/pricing" element={<InfoPage page="pricing" />} />
          <Route path="/warranty" element={<InfoPage page="warranty" />} />
          <Route path="/reviews" element={<InfoPage page="reviews" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
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
          <Route path="/dishwasher-repair" element={<ServicePage service="dishwasher" />} />
          <Route path="/microwave-repair" element={<ServicePage service="microwave" />} />
          <Route path="/garbage-disposal-repair" element={<ServicePage service="garbageDisposal" />} />
          <Route path="/wine-cooler-repair" element={<ServicePage service="wineCooler" />} />
          <Route path="/home-appliance-repair" element={<ServicePage service="home" />} />
          <Route path="/commercial-appliance-repair" element={<ServicePage service="commercial" />} />
          <Route path="/appliance-installation" element={<ServicePage service="installation" />} />
          <Route path="/commercial-refrigeration-repair" element={<ServicePage service="commercialRefrigeration" />} />
          <Route path="/commercial-cooking-equipment-repair" element={<ServicePage service="commercialCooking" />} />
          <Route path="/commercial-dishwasher-repair" element={<ServicePage service="commercialDishwasher" />} />
          <Route path="/commercial-laundry-repair" element={<ServicePage service="commercialLaundry" />} />
          <Route path="/washer-dryer-installation" element={<ServicePage service="washerDryerInstallation" />} />
          <Route path="/refrigerator-installation" element={<ServicePage service="refrigeratorInstallation" />} />
          <Route path="/range-oven-installation" element={<ServicePage service="rangeOvenInstallation" />} />
          <Route path="/dishwasher-installation" element={<ServicePage service="dishwasherInstallation" />} />
          <Route path="/microwave-installation" element={<ServicePage service="microwaveInstallation" />} />

          {/* New City Pages (Local SEO) */}
          <Route path="/appliance-repair-fort-lauderdale" element={<CityPage city="fort-lauderdale" />} />
          <Route path="/appliance-repair-hollywood-fl" element={<CityPage city="hollywood-fl" />} />
          <Route path="/appliance-repair-plantation-fl" element={<CityPage city="plantation-fl" />} />
          <Route path="/appliance-repair-pembroke-pines-fl" element={<CityPage city="pembroke-pines-fl" />} />
          <Route path="/appliance-repair-delray-beach-fl" element={<CityPage city="delray-beach-fl" />} />
          <Route path="/appliance-repair-boynton-beach-fl" element={<CityPage city="boynton-beach-fl" />} />
          <Route path="/appliance-repair-jupiter-fl" element={<CityPage city="jupiter-fl" />} />
          <Route path="/appliance-repair-palm-beach-gardens-fl" element={<CityPage city="palm-beach-gardens-fl" />} />

          <Route path="/account" element={<AccountPage />} />
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
    </>
  )
}

export default AppRoutes
