import React from 'react'

function Maps() {
  return (
    <section id="maps" className="maps">
      <h2>Find Us</h2>
      <p className="maps-subtitle">Visit our location or call us for service</p>
      
      <div className="maps-container">
        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.8425641263417!2d-80.31844!3d26.15833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d91b0f5b5b5b5d%3A0x5b5b5b5b5b5b5b5b!2s10120%20NW%2053rd%20St%2C%20South%20Florida%2C%20FL%2033351!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="500"
            style={{border: 0, borderRadius: '12px'}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Top Speed Appliance Location"
          ></iframe>
        </div>

        <div className="location-info">
          <h3>Top Speed Appliance</h3>
          <div className="info-block">
            <h4>📍 Address</h4>
            <p>10120 NW 53rd St<br/>South Florida, FL 33351</p>
            <a href="https://maps.google.com/?q=10120+NW+53rd+St+South+Florida+FL+33351" target="_blank" rel="noopener noreferrer" className="directions-link">
              Get Directions →
            </a>
          </div>

          <div className="info-block">
            <h4>📞 Phone</h4>
            <p>
              <a href="tel:9549317997">(954) 931-7997</a>
            </p>
          </div>

          <div className="info-block">
            <h4>📧 Email</h4>
            <p>
              <a href="mailto:service@topspeedappliance.net">service@topspeedappliance.net</a>
            </p>
          </div>

          <div className="info-block">
            <h4>⏰ Service Hours</h4>
            <p>
              Monday - Friday: 8:00 AM - 6:00 PM<br/>
              Saturday: 9:00 AM - 4:00 PM<br/>
              Sunday: Closed
            </p>
          </div>

          <div className="info-block">
            <h4>🚀 Quick Links</h4>
            <a href="#booking" className="quick-link">Request Service</a>
            <a href="https://book.housecallpro.com/book/Top-Speed-Appliance/c9b4dccc30ee46f2bd3e162ee377aae1?v2=true" target="_blank" rel="noopener noreferrer" className="quick-link">Book Online</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Maps
