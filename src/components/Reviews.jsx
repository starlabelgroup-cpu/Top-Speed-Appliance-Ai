import React from 'react'

function Reviews() {
  const testimonials = [
    {
      name: 'Jane Doe',
      rating: 5,
      text: 'The technician was friendly, efficient, and did an excellent job repairing my washing machine. I would highly recommend Top Speed Appliance!',
    },
    {
      name: 'John Smith',
      rating: 5,
      text: 'Excellent service! The technician was professional and quickly fixed our refrigerator. At a fair price and very reliable. Highly recommend!',
    },
    {
      name: 'Maria Garcia',
      rating: 5,
      text: 'Amazing experience from start to finish. Fast response time and professional repair work. Will definitely use them again!',
    },
    {
      name: 'Robert Johnson',
      rating: 5,
      text: 'Top Speed Appliance provided quick and affordable service. The technician knew exactly what to do with my dishwasher. Great company!',
    },
  ]

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <span key={i} className="star">★</span>
    ))
  }

  return (
    <section id="reviews" className="reviews">
      <h2>Testimonials</h2>
      <p className="reviews-subtitle">What our customers say about us</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="testimonial-card">
            <div className="stars">
              {renderStars(testimonial.rating)}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">— {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
