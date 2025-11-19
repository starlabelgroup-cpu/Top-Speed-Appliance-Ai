import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogData'

function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  const relatedPosts = post ? getRelatedPosts(post.id) : []

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

        <img src={post.image} alt={post.title} className="post-featured-image" />

        <div className="post-content">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="post-section-title">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('-')) {
              const items = paragraph.split('\n').filter(item => item.startsWith('-'))
              return (
                <ul key={index} className="post-list">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="post-paragraph">
                {paragraph}
              </p>
            )
          })}
        </div>

        <div className="post-cta">
          <h3>Need Professional Help?</h3>
          <p>If you're experiencing appliance issues, our expert technicians are here to help.</p>
          <a href="#contact" className="cta-button">
            Contact Us Today
          </a>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h2>Related Articles</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(relatedPost => (
              <article key={relatedPost.id} className="related-post-card">
                <img src={relatedPost.image} alt={relatedPost.title} />
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
