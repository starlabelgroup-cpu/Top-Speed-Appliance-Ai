import React, { useState } from 'react'

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      service: 'Washer & Dryer Repair',
      rating: 5,
      text: 'The technician was friendly, efficient, and did an excellent job repairing my washing machine. I would highly recommend Top Speed Appliance!',
      date: '2024-12-15',
    },
    {
      id: 2,
      name: 'John Smith',
      service: 'Refrigerator Repair',
      rating: 5,
      text: 'Excellent service! The technician was professional and quickly fixed our refrigerator. At a fair price and very reliable. Highly recommend!',
      date: '2024-12-10',
    },
    {
      id: 3,
      name: 'Maria Garcia',
      service: 'Dishwasher Repair',
      rating: 5,
      text: 'Amazing experience from start to finish. Fast response time and professional repair work. Will definitely use them again!',
      date: '2024-12-05',
    },
    {
      id: 4,
      name: 'Robert Johnson',
      service: 'Oven & Stove Repair',
      rating: 5,
      text: 'Top Speed Appliance provided quick and affordable service. The technician knew exactly what to do with my dishwasher. Great company!',
      date: '2024-11-28',
    },
    {
      id: 5,
      name: 'Sarah Williams',
      service: 'Refrigerator Repair',
      rating: 5,
      text: 'Very impressed with the quality of work and the professionalism of the team. Would definitely recommend to friends and family.',
      date: '2024-11-20',
    },
    {
      id: 6,
      name: 'Michael Brown',
      service: 'Washer & Dryer Repair',
      rating: 4,
      text: 'Good service overall. Technician was knowledgeable and fixed the issue efficiently. Slight wait time but worth it.',
      date: '2024-11-15',
    },
  ])

  const [filterService, setFilterService] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Refrigerator Repair',
    rating: 5,
    text: '',
  })

  const services = ['All', 'Refrigerator Repair', 'Washer & Dryer Repair', 'Oven & Stove Repair', 'Dishwasher Repair']

  const filteredReviews = filterService === 'All'
    ? reviews
    : reviews.filter(r => r.service === filterService)

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
    return 0
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      service: formData.service,
      rating: parseInt(formData.rating),
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
    }
    setReviews(prev => [newReview, ...prev])
    setFormData({
      name: '',
      email: '',
      service: 'Refrigerator Repair',
      rating: 5,
      text: '',
    })
    setShowForm(false)
    alert('Thank you for your review! It has been added to our site.')
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="star" style={{opacity: i < rating ? 1 : 0.3}}>★</span>
    ))
  }

  return (
    <section id="reviews" className="reviews">
      <h2>Customer Reviews</h2>
      <p className="reviews-subtitle">See what our customers say about our service</p>

      <div className="reviews-controls">
        <div className="filter-group">
          <label>Filter by Service:</label>
          <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className="filter-select">
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="date">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <button className="add-review-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Your Review'}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h3>Share Your Experience</h3>
          
          <div className="form-group">
            <label htmlFor="review-name">Name</label>
            <input
              type="text"
              id="review-name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-email">Email</label>
            <input
              type="email"
              id="review-email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="review-service">Service</label>
            <select
              id="review-service"
              name="service"
              value={formData.service}
              onChange={handleFormChange}
              required
            >
              <option>Refrigerator Repair</option>
              <option>Washer & Dryer Repair</option>
              <option>Oven & Stove Repair</option>
              <option>Dishwasher Repair</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="review-rating">Rating</label>
            <select
              id="review-rating"
              name="rating"
              value={formData.rating}
              onChange={handleFormChange}
              required
            >
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Very Good</option>
              <option value="3">⭐⭐⭐ Good</option>
              <option value="2">⭐⭐ Fair</option>
              <option value="1">⭐ Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="review-text">Your Review</label>
            <textarea
              id="review-text"
              name="text"
              placeholder="Tell us about your experience..."
              rows="5"
              value={formData.text}
              onChange={handleFormChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-review-btn">Submit Review</button>
        </form>
      )}

      <div className="reviews-stats">
        <p>{sortedReviews.length} reviews</p>
        {filterService !== 'All' && <p style={{marginLeft: '20px', color: '#d10000'}}>Filtered: {filterService}</p>}
      </div>

      <div className="testimonials-grid">
        {sortedReviews.map((review) => (
          <div key={review.id} className="testimonial-card">
            <div className="review-header">
              <div>
                <h4 style={{margin: '0 0 4px 0'}}>{review.name}</h4>
                <p style={{margin: '0 0 8px 0', fontSize: '0.85rem', color: '#999'}}>{review.service}</p>
              </div>
              <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div className="stars">
              {renderStars(review.rating)}
            </div>
            <p className="testimonial-text">"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
