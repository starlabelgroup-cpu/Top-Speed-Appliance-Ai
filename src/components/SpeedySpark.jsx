import React from 'react'

/**
 * Speedy's spark mark — white spark with a red core on a navy disc.
 * The platform's own Speedy mark, shared by the Tell Speedy buttons.
 */
export default function SpeedySpark({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ flex: 'none', display: 'block' }}
    >
      <circle cx="12" cy="12" r="11" fill="#0A265C" />
      <path
        d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z"
        fill="#FFFFFF"
      />
      <circle cx="12" cy="12" r="1.7" fill="#E8322E" />
    </svg>
  )
}
