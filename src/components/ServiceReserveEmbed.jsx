import { SERVICE_RESERVE_FORM_ID } from './ServiceReserveButton'

const SOURCE = 'homepage'

const inlineButtonStyle = {
  background: '#2563eb',
  color: '#fff',
  padding: '12px 24px',
  border: 0,
  borderRadius: 6,
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
}

const floatingButtonStyle = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 9999,
  background: '#2563eb',
  color: '#ffffff',
  padding: '14px 22px',
  border: 0,
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  boxShadow: '0 6px 20px rgba(0,0,0,.18)',
}

function ServiceReserveEmbed() {
  return (
    <>
      <section id="booking" className="booking">
        <h2>Request a Service</h2>
        <p className="booking-subtitle">Schedule your appliance repair today</p>
        <div
          className="sr-booking-inline"
          data-form-id={SERVICE_RESERVE_FORM_ID}
          data-source={SOURCE}
        />
        <button
          type="button"
          className="sr-booking-trigger"
          data-form-id={SERVICE_RESERVE_FORM_ID}
          data-source={SOURCE}
          style={inlineButtonStyle}
        >
          Book Now
        </button>
      </section>
      <button
        type="button"
        className="sr-booking-trigger"
        data-form-id={SERVICE_RESERVE_FORM_ID}
        data-source={SOURCE}
        style={floatingButtonStyle}
      >
        Book Now
      </button>
    </>
  )
}

export default ServiceReserveEmbed
