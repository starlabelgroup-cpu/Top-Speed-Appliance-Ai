import React from 'react'

function Gallery() {
  const images = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800',
      alt: 'Washing Machine Repair',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=800',
      alt: 'Refrigerator Repair',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc072dd8c0d7c4399a48c16f755323d21?format=webp&width=800',
      alt: 'Kitchen Appliance Repair',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800',
      alt: 'Professional Technician',
    },
  ]

  return (
    <section id="gallery" className="gallery">
      <h2>Gallery</h2>
      <p className="gallery-subtitle">See our professional work in action</p>
      <div className="gallery-grid">
        {images.map((image, i) => (
          <div key={i} className="gallery-item">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
