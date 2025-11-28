import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Top Speed Appliance. All Rights Reserved.</p>
      <p>Fast • Reliable • Professional</p>
      <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      <img src="https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Faa11a37d4c46448dbb38b23141033072?format=webp&width=800" alt="Top Speed Appliance Flag" className="footer-flag" />
    </footer>
  )
}

export default Footer
