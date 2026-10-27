import React from 'react'
import '../styles/appliance-icons.css'

const ICON_PATHS = {
  Refrigerator: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="9" y1="5" x2="9" y2="7" />
      <line x1="9" y1="12" x2="9" y2="15" />
    </>
  ),
  Washer: (
    <>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <circle cx="12" cy="13" r="5" />
    </>
  ),
  Dryer: (
    <>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="1.5" />
    </>
  ),
  Oven: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="6" y1="6" x2="8" y2="6" />
      <rect x="6" y="12" width="12" height="6" rx="1" />
    </>
  ),
  Dishwasher: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </>
  ),
  Microwave: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <rect x="5" y="8" width="10" height="8" rx="1" />
      <line x1="18" y1="9" x2="18" y2="15" />
    </>
  ),
  HVAC: (
    <>
      <rect x="2" y="4" width="20" height="8" rx="2" />
      <path d="M6 16h12M8 19h8" />
    </>
  ),
}

function ApplianceIcon({ type }) {
  return (
    <svg
      className="appliance-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[type]}
    </svg>
  )
}

export default ApplianceIcon
