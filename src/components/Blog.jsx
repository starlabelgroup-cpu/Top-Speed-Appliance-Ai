import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, getCategoryOptions } from '../data/blogData'

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  const categories = getCategoryOptions()
  const allCategories = ['All', ...categories]

  let filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  if (sortBy === 'oldest') {
    filteredPosts = [...filteredPosts].reverse()
  }

  return (
    <section id="blog" className="blog">
      <h2>Appliance Repair Blog</h2>
      <p className="blog-subtitle">Tips, guides, and advice for keeping your appliances in top condition</p>

      <div className="blog-controls">
        <div className="filter-group">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="blog-grid">
        {filteredPosts.map(post => (
          <article key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-card-image" />
            <div className="blog-card-content">
              <span className="blog-category">{post.category}</span>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="blog-author">{post.author}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="read-more-btn">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="no-posts">No blog posts found in this category.</p>
      )}
    </section>
  )
}

export default Blog
