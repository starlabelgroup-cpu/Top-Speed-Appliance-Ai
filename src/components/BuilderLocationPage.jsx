import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BuilderComponent, builder } from '@builder.io/react'

/**
 * BuilderLocationPage Component
 * 
 * This component demonstrates how to use Builder.io to manage
 * dynamic location + service pages for Top Speed Appliance
 * 
 * Example URLs:
 * - /location-pages/miami/dryer-repair
 * - /location-pages/fort-lauderdale/refrigerator-repair
 * - /location-pages/boca-raton/washer-dryer-repair
 * 
 * Usage: <Route path="/location-pages/:citySlug/:serviceSlug" element={<BuilderLocationPage />} />
 */
function BuilderLocationPage() {
  const { citySlug, serviceSlug } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        
        // Build the URL path based on city and service
        const urlPath = `/${serviceSlug}-${citySlug}-fl`
        
        // Fetch location-specific page from Builder.io
        const page = await builder
          .get('location-service-page', {
            userAttributes: {
              urlPath,
              citySlug,
              serviceSlug,
            },
          })
          .toPromise()

        if (page) {
          setContent(page)
        } else {
          setError('Location page not found')
        }
      } catch (err) {
        console.error('Error fetching location page:', err)
        setError('Failed to load location page')
      } finally {
        setLoading(false)
      }
    }

    if (citySlug && serviceSlug) {
      fetchContent()
    }
  }, [citySlug, serviceSlug])

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading {serviceSlug} repair services in {citySlug}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'red' }}>
        <p>{error}</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>No content available for this location and service</p>
      </div>
    )
  }

  // Render the location-specific content from Builder.io
  return <BuilderComponent model="location-service-page" content={content} />
}

export default BuilderLocationPage
