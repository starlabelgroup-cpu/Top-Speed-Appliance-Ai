import React, { useState, useEffect } from 'react'

function PromotionalBroadcasting() {
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxContent, setLightboxContent] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const images = [
    {
      id: 1,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fa8ec2012dc5f4ca684f921bbb5372c73?format=webp&width=800',
      alt: 'Professional Appliance Technician',
      category: 'services',
      span: 1,
    },
    {
      id: 2,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fe7086a58aff348d9a15f14afa6229ab0?format=webp&width=800',
      alt: 'Appliance Repair Service',
      category: 'services',
      span: 1,
    },
    {
      id: 3,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F38ed97fec9c24292befe3a065790c292?format=webp&width=800',
      alt: 'Expert Technician at Work',
      category: 'team',
      span: 2,
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fe2c31825464c4862bfc3cd4bcd5bd556?format=webp&width=800',
      alt: 'Professional Service',
      category: 'team',
      span: 1,
    },
    {
      id: 5,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Ff448d326084b464b8411c4c9fea87416?format=webp&width=800',
      alt: 'Quality Appliance Work',
      category: 'showcase',
      span: 1,
    },
  ]

  const videos = [
    {
      id: 1,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F0ac3727753ee4b35a9ff4792dfee87af?alt=media&token=ff56f031-aff7-4193-93b2-55f6ad535c44&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Expert Service Showcase',
      category: 'services',
      duration: '2:45',
    },
    {
      id: 2,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F02125d11566341d8a5b979f1ab517f7a?alt=media&token=76db8bb8-8699-4030-831f-538ad9b3d8df&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Professional Solutions',
      category: 'services',
      duration: '3:12',
    },
    {
      id: 3,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F3e514a549c1449a2b894643425bb159d?alt=media&token=0677758c-450e-472c-b51b-2276745671b5&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Quality Repair Work',
      category: 'showcase',
      duration: '2:20',
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F91fc3bcab1cb490f94cf126c428c3262?alt=media&token=8e3955ef-57c3-4593-a9f0-a592cc8506ff&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Fast Response Service',
      category: 'services',
      duration: '1:58',
    },
    {
      id: 5,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fee587dea57b14c8fa9ce7be59cfa3818?alt=media&token=1428e222-54ca-49e6-af88-76e5b6701899&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Certified Technicians',
      category: 'team',
      duration: '2:05',
    },
  ]

  const testimonials = [
    {
      id: 1,
      text: 'Top Speed Appliance fixed my refrigerator same-day. Excellent service!',
      author: 'Maria Rodriguez',
      rating: 5,
    },
    {
      id: 2,
      text: 'Professional, courteous, and fair pricing. Highly recommended!',
      author: 'James Wilson',
      rating: 5,
    },
    {
      id: 3,
      text: 'Best appliance repair service in Miami. Will definitely use again.',
      author: 'Sarah Martinez',
      rating: 5,
    },
  ]

  const stats = [
    { label: 'Happy Customers', value: '2,500+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Same-Day Service', value: '95%' },
    { label: 'Satisfaction Rate', value: '4.9★' },
  ]

  const filteredImages = activeTab === 'all' ? images : images.filter(img => img.category === activeTab)
  const filteredVideos = activeTab === 'all' ? videos : videos.filter(vid => vid.category === activeTab)

  const handleImageClick = (image) => {
    setLightboxContent({ type: 'image', data: image })
    setLightboxOpen(true)
  }

  const handleVideoClick = (video) => {
    setLightboxContent({ type: 'video', data: video })
    setLightboxOpen(true)
  }

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]))
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setTimeout(() => setLightboxContent(null), 300)
  }

  return (
    <section id="promotional-broadcast" className="promotional-broadcast">
      <div className="broadcast-header">
        <h2>Top Speed Appliance in Action</h2>
        <p className="broadcast-subtitle">See why South Florida trusts us for expert appliance repair</p>
      </div>

      <div className="broadcast-stats">
        {stats.map(stat => (
          <div key={stat.label} className="stat-item">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="broadcast-filters">
        <button
          className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Content
        </button>
        <button
          className={`filter-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          className={`filter-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Our Team
        </button>
        <button
          className={`filter-btn ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          Showcase
        </button>
      </div>

      <div className="broadcast-container">
        <div className="broadcast-media-grid">
          {filteredImages.map((image) => (
            <div key={`img-${image.id}`} className={`media-item image-item span-${image.span}`}>
              <div className="image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                  className={`broadcast-image ${loadedImages.has(image.id) ? 'loaded' : ''}`}
                />
                {!loadedImages.has(image.id) && <div className="image-placeholder"></div>}
                <div className="image-overlay">
                  <button
                    className="view-btn"
                    onClick={() => handleImageClick(image)}
                    aria-label="View image fullscreen"
                  >
                    <span className="view-icon">🔍</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredVideos.map((video) => (
            <div key={`vid-${video.id}`} className="media-item video-item">
              <div className="video-wrapper">
                <video
                  src={video.src}
                  title={video.title}
                  controls
                  className="broadcast-video"
                  preload="metadata"
                />
                <div className="video-overlay">
                  <button
                    className="view-btn"
                    onClick={() => handleVideoClick(video)}
                    aria-label="Play video fullscreen"
                  >
                    <span className="play-icon">⏬</span>
                  </button>
                </div>
                <div className="video-meta">
                  <p className="video-title">{video.title}</p>
                  <span className="video-duration">{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="broadcast-testimonials">
        <h3>What Our Customers Say</h3>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-item">
              <div className="testimonial-stars">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="broadcast-cta">
        <h3>Need Appliance Repair?</h3>
        <p>Top Speed Appliance provides fast, reliable service with same-day availability</p>
        <div className="cta-actions">
          <a
            href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button primary-btn"
          >
            Schedule Repair
          </a>
          <a href="tel:(954)931-7997" className="cta-button secondary-btn">
            Call Now
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              ✕
            </button>
            {lightboxContent?.type === 'image' && (
              <img
                src={lightboxContent.data.src}
                alt={lightboxContent.data.alt}
                className="lightbox-image"
              />
            )}
            {lightboxContent?.type === 'video' && (
              <div className="lightbox-video-wrapper">
                <video
                  src={lightboxContent.data.src}
                  controls
                  autoPlay
                  className="lightbox-video"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default PromotionalBroadcasting
