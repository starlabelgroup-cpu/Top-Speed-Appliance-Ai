import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogData'

function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const relatedPosts = post ? getRelatedPosts(post.id) : []

  // Add SEO meta tags dynamically
  useEffect(() => {
    if (post) {
      // Update page title
      document.title = `${post.title} | Top Speed Appliance Blog`

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt)
      }

      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', post.title)

      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) ogDescription.setAttribute('content', post.excerpt)

      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) ogImage.setAttribute('content', post.image)

      // Add JSON-LD schema for blog post
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: post.author,
          url: 'https://topspeedappliance.com'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Top Speed Appliance',
          logo: {
            '@type': 'ImageObject',
            url: 'https://topspeedappliance.com/logo.png'
          }
        }
      })
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [post])

  if (!post) {
    return (
      <section id="blog-post" className="blog-post">
        <div className="post-not-found">
          <h2>Blog post not found</h2>
          <p>Sorry, the blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-to-blog-btn">
            Back to Blog
          </Link>
        </div>
      </section>
    )
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    // Scroll to top and navigate to home with contact anchor
    window.location.href = '/#contact'
  }

  return (
    <section id="blog-post" className="blog-post">
      <article className="post-container">
        <Link to="/blog" className="back-link">← Back to Blog</Link>

        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta-header">
            <span className="post-category">{post.category}</span>
            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
            <span className="post-author">By {post.author}</span>
          </div>
        </header>

        <img
          src={post.image}
          alt={post.title}
          className="post-featured-image"
          loading="lazy"
        />

        <div className="post-content">
          {post.content.split('\n\n').map((block, index) => {
            const lines = block.split('\n')
            const firstLine = lines[0]

            // Handle section headers
            if (firstLine.startsWith('##')) {
              const headerText = firstLine.replace('## ', '')
              const restContent = lines.slice(1).join('\n')

              return (
                <div key={index}>
                  <h2 className="post-section-title">{headerText}</h2>
                  {restContent && (
                    <p className="post-paragraph">{restContent}</p>
                  )}
                </div>
              )
            }

            // Handle lists
            if (lines.some(line => line.trim().startsWith('-'))) {
              const listItems = lines.filter(line => line.trim().startsWith('-'))
              const nonListLines = lines.filter(line => !line.trim().startsWith('-') && line.trim())

              return (
                <div key={index}>
                  {nonListLines.length > 0 && (
                    <p className="post-paragraph">
                      {nonListLines.join(' ')}
                    </p>
                  )}
                  {listItems.length > 0 && (
                    <ul className="post-list">
                      {listItems.map((item, i) => (
                        <li key={i}>{item.trim().replace('- ', '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            }

            // Handle regular paragraphs
            return (
              <p key={index} className="post-paragraph">
                {block}
              </p>
            )
          })}
        </div>

        <div className="post-cta">
          <h3>Need Professional Help?</h3>
          <p>If you're experiencing appliance issues, our expert technicians are here to help.</p>
          <button
            className="cta-button"
            onClick={handleContactClick}
            aria-label="Contact us for appliance repair services"
          >
            Contact Us Today
          </button>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h2>Related Articles</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(relatedPost => (
              <article key={relatedPost.id} className="related-post-card">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  loading="lazy"
                />
                <h3>{relatedPost.title}</h3>
                <p>{relatedPost.excerpt}</p>
                <Link to={`/blog/${relatedPost.slug}`} className="read-more-link">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default BlogPost
