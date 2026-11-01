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
                💬 Chat
              </button>
              <button
                className={`mode-btn ${mode === 'diagnostic' ? 'active' : ''}`}
                onClick={() => handleModeChange('diagnostic')}
                title="Diagnose Issues"
              >
                🔧 Diagnose
              </button>
              <button
                className={`mode-btn ${mode === 'recommendation' ? 'active' : ''}`}
                onClick={() => handleModeChange('recommendation')}
                title="Get Recommendations"
              >
                🛒 Shop
              </button>
              <button
                className={`mode-btn ${mode === 'maintenance' ? 'active' : ''}`}
                onClick={() => handleModeChange('maintenance')}
                title="Schedule Maintenance"
              >
                📅 Maintain
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
