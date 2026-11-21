import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BuilderComponent, builder } from '@builder.io/react'

/**
 * BuilderPage Component
 * 
 * This is an example of how to fetch and render dynamic content from Builder.io
 * Usage: <Route path="/pages/:slug" element={<BuilderPage />} />
 */
function BuilderPage() {
  const { slug } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        
        // Fetch content from Builder.io
        // You can use different model names: 'page', 'blog-post', 'service', etc.
        const page = await builder
          .get('page', {
            userAttributes: {
              urlPath: '/' + (slug || ''),
            },
          })
          .toPromise()

        if (page) {
          setContent(page)
        } else {
          setError('Page not found')
        }
      } catch (err) {
        console.error('Error fetching Builder.io content:', err)
        setError('Failed to load page content')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchContent()
    }
  }, [slug])

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Loading...</p>
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
        <p>No content available</p>
      </div>
    )
  }

  // Render the Builder.io content
  return <BuilderComponent model="page" content={content} />
}

export default BuilderPage
