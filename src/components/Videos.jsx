import React from 'react'

function Videos() {
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Washing Machine Repair Guide',
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Refrigerator Troubleshooting Tips',
    },
    {
      id: '9bZkp7q19f0',
      title: 'Dishwasher Common Problems',
    },
    {
      id: 'u8m-4ow3Gm8',
      title: 'Oven & Stove Repair Basics',
    },
  ]

  return (
    <section id="videos" className="videos">
      <h2>Appliance Repair Videos</h2>
      <p className="videos-subtitle">Learn maintenance tips and see our expertise in action</p>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Videos
