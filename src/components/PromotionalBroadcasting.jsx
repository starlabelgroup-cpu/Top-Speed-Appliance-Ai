import React, { useState } from 'react'

function PromotionalBroadcasting() {
  const [activeTab, setActiveTab] = useState('all')

  const images = [
    {
      id: 1,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fa8ec2012dc5f4ca684f921bbb5372c73?format=webp&width=800',
      alt: 'Professional Appliance Technician',
      category: 'services',
    },
    {
      id: 2,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fe7086a58aff348d9a15f14afa6229ab0?format=webp&width=800',
      alt: 'Appliance Repair Service',
      category: 'services',
    },
    {
      id: 3,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F38ed97fec9c24292befe3a065790c292?format=webp&width=800',
      alt: 'Expert Technician at Work',
      category: 'team',
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fe2c31825464c4862bfc3cd4bcd5bd556?format=webp&width=800',
      alt: 'Professional Service',
      category: 'team',
    },
    {
      id: 5,
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Ff448d326084b464b8411c4c9fea87416?format=webp&width=800',
      alt: 'Quality Appliance Work',
      category: 'showcase',
    },
  ]

  const videos = [
    {
      id: 1,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F0ac3727753ee4b35a9ff4792dfee87af?alt=media&token=ff56f031-aff7-4193-93b2-55f6ad535c44&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Expert Service Showcase',
      category: 'services',
    },
    {
      id: 2,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F02125d11566341d8a5b979f1ab517f7a?alt=media&token=76db8bb8-8699-4030-831f-538ad9b3d8df&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Professional Solutions',
      category: 'services',
    },
    {
      id: 3,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F3e514a549c1449a2b894643425bb159d?alt=media&token=0677758c-450e-472c-b51b-2276745671b5&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Quality Repair Work',
      category: 'showcase',
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F91fc3bcab1cb490f94cf126c428c3262?alt=media&token=8e3955ef-57c3-4593-a9f0-a592cc8506ff&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Fast Response Service',
      category: 'services',
    },
    {
      id: 5,
      src: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fee587dea57b14c8fa9ce7be59cfa3818?alt=media&token=1428e222-54ca-49e6-af88-76e5b6701899&apiKey=a186f40324f047e6b518d0ea27bf7f66',
      title: 'Certified Technicians',
      category: 'team',
    },
  ]

  const filteredImages = activeTab === 'all' ? images : images.filter(img => img.category === activeTab)
  const filteredVideos = activeTab === 'all' ? videos : videos.filter(vid => vid.category === activeTab)

  return (
    <section id="promotional-broadcast" className="promotional-broadcast">
      <h2>Our Promotional Broadcasting Platform</h2>
      <p className="broadcast-subtitle">See why Top Speed Appliance is South Florida's trusted repair service</p>

      <div className="broadcast-filters">
        <button
          className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
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
          Team
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
            <div key={`img-${image.id}`} className="media-item image-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}

          {filteredVideos.map((video) => (
            <div key={`vid-${video.id}`} className="media-item video-item">
              <video
                src={video.src}
                title={video.title}
                controls
                className="broadcast-video"
              />
              <p className="video-title">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="broadcast-cta">
        <p>Ready to experience Top Speed Appliance service?</p>
        <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">
          Schedule Your Repair Today
        </a>
      </div>
    </section>
  )
}

export default PromotionalBroadcasting
