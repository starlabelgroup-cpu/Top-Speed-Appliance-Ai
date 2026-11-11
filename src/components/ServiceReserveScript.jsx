import { useEffect } from 'react'
import { SERVICE_RESERVE_FORM_ID } from './ServiceReserveButton'

function ServiceReserveScript() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://book.servicereserve.com/embed.js'
    script.defer = true
    script.dataset.formId = SERVICE_RESERVE_FORM_ID
    document.body.appendChild(script)

    return () => script.remove()
  }, [])

  return null
}

export default ServiceReserveScript
