import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Keywords from './components/Keywords'
import Gallery from './components/Gallery'
import Videos from './components/Videos'
import Reviews from './components/Reviews'
import About from './components/About'
import Booking from './components/Booking'
import Maps from './components/Maps'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Privacy from './components/Privacy'
import Dashboard from './components/Dashboard'
import AdvancedAIAgent from './components/AdvancedAIAgent'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeAnalytics, setupPerformanceMonitoring } from './utils/analytics'
import { startHealthCheck, stopHealthCheck } from './services/agentService'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Keywords />
      <Gallery />
      <Videos />
      <Reviews />
      <About />
      <Booking />
      <Maps />
      <Contact />
    </>
  )
}

function App() {
  useEffect(() => {
    initializeAnalytics()
    setupPerformanceMonitoring()

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {})
    }
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/account" element={<Dashboard />} />
        </Routes>
        <Footer />
        <AIAssistant />
      </Router>
    </ErrorBoundary>
  )
}

export default App
