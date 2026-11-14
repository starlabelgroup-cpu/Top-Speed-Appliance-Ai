import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'
import './styles/main.css'
import './styles/dashboard.css'
import './styles/service-request.css'
import './styles/net-os.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
)

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
