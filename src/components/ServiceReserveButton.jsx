import '../styles/servicereserve.css'

export const SERVICE_RESERVE_FORM_ID = '18f8a2a0-2aa1-4888-a355-9a91dfcc9a00'

function ServiceReserveButton({ source, className = '', children = 'Request Service' }) {
  return (
    <button
      type="button"
      className={`sr-booking-trigger ${className}`.trim()}
      data-form-id={SERVICE_RESERVE_FORM_ID}
      data-source={source}
    >
      {children}
    </button>
  )
}

export default ServiceReserveButton
