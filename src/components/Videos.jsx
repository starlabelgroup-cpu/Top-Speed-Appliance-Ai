import React from 'react'

function Videos() {
  const videos = [
    {
      id: 'lC5eqysbdsk',
      title: 'Appliance Repair Expertise',
    },
    {
      id: 'Cx40plGVxg8',
      title: 'Professional Repair Solutions',
    },
    {
      id: 'QD_y_NRK9TA',
      title: 'Expert Technician In Action',
    },
    {
      id: 'hweqe2tPklo',
      title: 'Quality Appliance Service',
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
