import React, { useState, useEffect, useRef } from 'react'
import AgentChat from './AgentChat'
import DiagnosticMode from './DiagnosticMode'
import RecommendationMode from './RecommendationMode'
import MaintenanceMode from './MaintenanceMode'
import '../styles/advanced-ai-agent.css'

export default function AdvancedAIAgent() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('chat') // 'chat', 'diagnostic', 'recommendation', 'maintenance'
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const chatRef = useRef(null)

  useEffect(() => {
    // Generate unique session ID
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(id)
  }, [])

  const handleNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
  }

  const renderContent = () => {
    switch (mode) {
      case 'diagnostic':
        return <DiagnosticMode sessionId={sessionId} onNotify={handleNotification} />
      case 'recommendation':
        return <RecommendationMode sessionId={sessionId} onNotify={handleNotification} />
      case 'maintenance':
        return <MaintenanceMode sessionId={sessionId} onNotify={handleNotification} />
      case 'chat':
      default:
        return (
          <AgentChat
            ref={chatRef}
            sessionId={sessionId}
            onModeChange={handleModeChange}
            onNotify={handleNotification}
            isLoading={isLoading}
          />
        )
    }
  }

  return (
    <>
      {!open && (
        <button
          className="ai-agent-bubble"
          onClick={() => setOpen(true)}
          title="Open AI Assistant"
          aria-label="Open Top Speed Appliance AI Assistant"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
            <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="ai-bubble-label">AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="ai-agent-container">
          <div className="ai-agent-header">
            <div className="ai-agent-title-bar">
              <h2>Top Speed AI Assistant</h2>
              <button
                className="ai-close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="ai-mode-selector">
              <button
                className={`mode-btn ${mode === 'chat' ? 'active' : ''}`}
                onClick={() => handleModeChange('chat')}
                title="General Chat"
              >
                <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A1.8 1.8 0 0 1 5.8 3.7h12.4A1.8 1.8 0 0 1 20 5.5v8.3a1.8 1.8 0 0 1-1.8 1.8H13l-4.6 3.9v-3.9H5.8A1.8 1.8 0 0 1 4 13.8z"/><path d="M7.6 9.3h.01M12 9.3h.01M16.4 9.3h.01" strokeWidth="2.6" stroke="#E8322E"/></svg> Chat
              </button>
              <button
                className={`mode-btn ${mode === 'diagnostic' ? 'active' : ''}`}
                onClick={() => handleModeChange('diagnostic')}
                title="Diagnose Issues"
              >
                <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.4 4.4 0 0 1 5.9-4L18 4.9l2.3 2.3 2.7-2.6a4.4 4.4 0 0 1-5.9 5.2L8 18.9a2 2 0 0 1-2.9 0l-1.2-1.2a2 2 0 0 1 0-2.9z" transform="translate(-1.2 .6) scale(.94)"/></svg> Diagnose
              </button>
              <button
                className={`mode-btn ${mode === 'recommendation' ? 'active' : ''}`}
                onClick={() => handleModeChange('recommendation')}
                title="Get Recommendations"
              >
                <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2.4l2.2 11h10.4l1.8-8.4H6.2"/><circle cx="9.6" cy="19.4" r="1.5"/><circle cx="16.6" cy="19.4" r="1.5"/><path d="M9.4 9l.6 3.4M13.4 8.8l-.5 3.4M17.4 8.6l-.9 3.4" stroke="#E8322E"/></svg> Shop
              </button>
              <button
                className={`mode-btn ${mode === 'maintenance' ? 'active' : ''}`}
                onClick={() => handleModeChange('maintenance')}
                title="Schedule Maintenance"
              >
                <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M7.5 3.5v4M16.5 3.5v4" stroke="#E8322E"/><path d="M7.4 14h2.2M11 14h2.2M14.6 14h2.2M7.4 17h2.2M11 17h2.2" strokeWidth="2"/></svg> Maintain
              </button>
            </div>
          </div>

          {notification && (
            <div className={`ai-notification ai-notification-${notification.type}`}>
              {notification.message}
            </div>
          )}

          <div className="ai-agent-content">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  )
}
