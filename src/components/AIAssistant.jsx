import React, { useState, useEffect, useRef } from 'react'
import '../styles/ai-assistant.css'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m the Top Speed Appliance AI Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [bookingMode, setBookingMode] = useState(false)
  const [troubleshootMode, setTroubleshootMode] = useState(false)
  const [troubleStep, setTroubleStep] = useState(0)
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    appliance: '',
    issue: '',
    date: '',
    time: ''
  })
  const [userLocation, setUserLocation] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      })
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { sender: 'user', text: input }
    setMessages((p) => [...p, userMsg])

    const userText = input.toLowerCase()
    setInput('')

    if (bookingMode) {
      handleBookingFlow(userText)
      return
    }

    if (troubleshootMode) {
      handleTroubleshootingFlow(userText)
      return
    }

    const reply = mainAIResponse(userText)
    setTimeout(() => {
      setMessages((p) => [...p, { sender: 'bot', text: reply }])
    }, 300)
  }

  const mainAIResponse = (text) => {
    if (text.includes('book') || text.includes('schedule') || text.includes('appointment')) {
      setBookingMode(true)
      return "Great! Let's schedule your service. What's your full name?"
    }

    if (text.includes('troubleshoot') || text.includes('not working') || text.includes('issue') || text.includes('problem')) {
      setTroubleshootMode(true)
      setTroubleStep(1)
      return "Sure! Which appliance are you having trouble with? (dryer, washer, fridge, oven, dishwasher, microwave)"
    }

    if (text.includes('location')) {
      if (userLocation)
        return `You are approximately near latitude ${userLocation.lat.toFixed(2)} and longitude ${userLocation.lng.toFixed(2)}. We service your area!`
      return "I couldn't detect your location automatically, but we service all areas in South Florida within a 30-mile radius."
    }

    if (text.includes('hours') || text.includes('open'))
      return "We're open every day from 8 AM to 8 PM. We offer same-day and emergency repair services!"

    if (text.includes('price') || text.includes('cost'))
      return "Diagnostics start at $89. Final pricing depends on appliance model and parts needed. No hidden fees!"

    if (text.includes('repair'))
      return "We repair refrigerators, dryers, washers, ovens, dishwashers, and microwaves. What appliance do you need help with?"

    if (text.includes('warranty'))
      return "All repairs come with a 12-month parts warranty. Labor is guaranteed!"

    if (text.includes('emergency'))
      return "Yes! We offer emergency repair services. Call us or book an emergency appointment and we'll get there ASAP."

    return "I'm here to help! You can say:\n• 'book service' to schedule\n• 'troubleshoot' for help\n• 'hours', 'price', 'repair', 'emergency', or 'warranty' for info"
  }

  const handleBookingFlow = (text) => {
    if (!bookingData.name) {
      setBookingData({ ...bookingData, name: text })
      addBotMessage("Great! What's the best phone number to reach you?")
      return
    }
    if (!bookingData.phone) {
      setBookingData({ ...bookingData, phone: text })
      addBotMessage("What appliance needs service? (ex: washer, dryer, fridge, oven)")
      return
    }
    if (!bookingData.appliance) {
      setBookingData({ ...bookingData, appliance: text })
      addBotMessage("Briefly describe the issue.")
      return
    }
    if (!bookingData.issue) {
      setBookingData({ ...bookingData, issue: text })
      addBotMessage("What day works for you? (ex: tomorrow, Friday, 12/10)")
      return
    }
    if (!bookingData.date) {
      setBookingData({ ...bookingData, date: text })
      addBotMessage("What time works best? (morning / afternoon / evening)")
      return
    }
    if (!bookingData.time) {
      setBookingData({ ...bookingData, time: text })
      addBotMessage(`Perfect! Your appointment request has been saved:\n\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nAppliance: ${bookingData.appliance}\nIssue: ${bookingData.issue}\nDate: ${bookingData.date}\nTime: ${text}\n\nA technician will confirm shortly!`)
      setBookingMode(false)
      setBookingData({ name: '', phone: '', appliance: '', issue: '', date: '', time: '' })
      return
    }
  }

  const handleTroubleshootingFlow = (text) => {
    if (troubleStep === 1) {
      addBotMessage(`Got it. Let's troubleshoot your ${text}. What's the issue? (no power, not heating, leaking, noise, not cooling)`)
      setTroubleStep(2)
      return
    }
    if (troubleStep === 2) {
      if (text.includes('no power')) addBotMessage("Check if the outlet has power. Try plugging in another device. Does the outlet work?")
      else if (text.includes('not heating')) addBotMessage("For dryers/ovens: check settings and circuit breaker. Is everything set correctly?")
      else if (text.includes('leak')) addBotMessage("Leaks often mean a loose hose or drain issue. Check the connections and floor area.")
      else if (text.includes('noise')) addBotMessage("Unusual noise could be a failing motor or loose drum. This usually needs professional help.")
      else if (text.includes('not cooling')) addBotMessage("For fridges: check temperature settings and ensure vents aren't blocked. Still not working?")
      else addBotMessage("I understand. This might need professional service.")
      setTroubleStep(3)
      return
    }
    if (troubleStep === 3) {
      addBotMessage("Would you like to book a service appointment? Just say 'book service'!")
      setTroubleshootMode(false)
      setTroubleStep(0)
      return
    }
  }

  const addBotMessage = (text) => {
    setTimeout(() => {
      setMessages((p) => [...p, { sender: 'bot', text }])
    }, 300)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ai-bubble"
          aria-label="Open AI Assistant"
          title="Chat with Top Speed Appliance"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2C7.37 2 2 6.6 2 12.4c0 3.1 1.4 6 3.7 8l-1 5.6c-.2 1.1.6 2 1.8 2 .4 0 .8-.1 1.2-.3l5.5-3.2c.8.1 1.6.2 2.5.2 6.63 0 12-4.6 12-10.4S20.63 2 14 2z" fill="white"/>
          </svg>
        </button>
      )}

      {open && (
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-header-content">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM14 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM10 14a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM14 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" fill="white"/>
              </svg>
              <h2>Top Speed Appliance AI</h2>
            </div>
            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-integrations-btn"
                onClick={() => setShowIntegrations((s) => !s)}
                aria-expanded={showIntegrations}
                aria-controls="ai-integrations"
              >
                Integrations
              </button>
              <button onClick={() => setOpen(false)} className="ai-close-btn" aria-label="Close chat">
                ✕
              </button>
            </div>
          </div>

          {showIntegrations && (
            <div className="ai-integrations" id="ai-integrations" role="region" aria-label="AI Assistant integrations">
              <div className="ai-integrations-title">Connect AI Assistant to Platforms</div>
              <div className="ai-integrations-subtitle">
                Use these platforms for parts shopping, order lookups, customer messaging, payments, and automations.
              </div>

              <div className="ai-integrations-section">
                <div className="ai-integrations-section-title">Shopping Platforms</div>
                <div className="ai-integrations-grid">
                  <a className="ai-integration-link" href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">Shopify</a>
                  <a className="ai-integration-link" href="https://woocommerce.com/" target="_blank" rel="noopener noreferrer">WooCommerce</a>
                  <a className="ai-integration-link" href="https://sellercentral.amazon.com/" target="_blank" rel="noopener noreferrer">Amazon Seller Central</a>
                  <a className="ai-integration-link" href="https://www.ebay.com/sellercenter" target="_blank" rel="noopener noreferrer">eBay Seller Hub</a>
                  <a className="ai-integration-link" href="https://www.etsy.com/sell" target="_blank" rel="noopener noreferrer">Etsy Shop</a>
                </div>
              </div>

              <div className="ai-integrations-section">
                <div className="ai-integrations-section-title">Marketing & Messaging</div>
                <div className="ai-integrations-grid">
                  <a className="ai-integration-link" href="https://business.google.com/" target="_blank" rel="noopener noreferrer">Google Business Profile</a>
                  <a className="ai-integration-link" href="https://ads.google.com/" target="_blank" rel="noopener noreferrer">Google Ads</a>
                  <a className="ai-integration-link" href="https://business.facebook.com/" target="_blank" rel="noopener noreferrer">Meta Business Suite</a>
                  <a className="ai-integration-link" href="https://www.twilio.com/" target="_blank" rel="noopener noreferrer">Twilio (SMS)</a>
                </div>
              </div>

              <div className="ai-integrations-section">
                <div className="ai-integrations-section-title">Payments & Automation</div>
                <div className="ai-integrations-grid">
                  <a className="ai-integration-link" href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a>
                  <a className="ai-integration-link" href="https://zapier.com/" target="_blank" rel="noopener noreferrer">Zapier</a>
                  <a className="ai-integration-link" href="https://www.make.com/" target="_blank" rel="noopener noreferrer">Make</a>
                  <a className="ai-integration-link" href="https://www.google.com/sheets/about/" target="_blank" rel="noopener noreferrer">Google Sheets</a>
                </div>
              </div>

              <div className="ai-integrations-note">
                Need a custom workflow? Use Zapier/Make to connect your booking leads to email, SMS, CRM, or spreadsheets.
              </div>
            </div>
          )}

          <div className="ai-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-message ai-message-${msg.sender}`}>
                <div className="ai-message-content">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="ai-input-field"
              placeholder="Type your message…"
              autoFocus
            />
            <button onClick={sendMessage} className="ai-send-btn" aria-label="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16183899 C3.50612381,0.9 2.40999899,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.34915502,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
