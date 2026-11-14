import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { agentService } from '../services/agentService'
import { findRelevantSiteLinks } from '../data/siteLinks'

const AgentChat = forwardRef(({ sessionId, onModeChange, onNotify, isLoading }, ref) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I\'m your Top Speed Appliance AI Assistant. I can help you with:\n\n Diagnose appliance issues\n Recommend new appliances\n Schedule maintenance\n Answer questions\n\nWhat can I help you with today?',
      timestamp: new Date(),
      suggestedActions: ['diagnose', 'recommend', 'maintenance', 'questions']
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message
    const userMsg = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // Send to API
      const response = await agentService.sendMessage(userMessage, sessionId)

      if (response.success) {
        const botMsg = {
          id: `msg_${Date.now()}_bot`,
          sender: 'bot',
          text: response.response.answer || response.response,
          timestamp: new Date(),
          suggestedActions: response.response.suggested_actions || [],
          siteLinks: findRelevantSiteLinks(userMessage),
          confidence: response.response.confidence,
          requiresHuman: response.response.requires_human,
          agent: response.agent_used
        }
        setMessages(prev => [...prev, botMsg])

        // Check if we should switch modes
        if (response.response.suggested_action === 'diagnose') {
          setTimeout(() => onModeChange('diagnostic'), 1000)
        }
      } else {
        onNotify('Failed to get response. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      onNotify('Connection error. Please check your internet.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedAction = (action) => {
    const actionMap = {
      diagnose: { mode: 'diagnostic', text: 'I need to diagnose an appliance issue' },
      recommend: { mode: 'recommendation', text: 'Can you recommend a new appliance?' },
      maintenance: { mode: 'maintenance', text: 'I want to schedule maintenance' },
      questions: { text: 'What other questions do you have for me?' }
    }

    const mapped = actionMap[action]
    if (mapped?.mode) {
      onModeChange(mapped.mode)
    } else {
      setInput(mapped?.text || '')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="agent-chat-wrapper">
      <div className="agent-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`agent-message agent-message-${msg.sender}`}>
            <div className="agent-message-bubble">
              <div className="agent-message-text">
                {msg.text}
              </div>
              {msg.agent && (
                <div className="agent-badge">
                  {msg.agent === 'Dr. Diagnosto' && <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.4 4.4 0 0 1 5.9-4L18 4.9l2.3 2.3 2.7-2.6a4.4 4.4 0 0 1-5.9 5.2L8 18.9a2 2 0 0 1-2.9 0l-1.2-1.2a2 2 0 0 1 0-2.9z" transform="translate(-1.2 .6) scale(.94)"/></svg>}
                  {msg.agent === 'Selina Sales' && <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2.4l2.2 11h10.4l1.8-8.4H6.2"/><circle cx="9.6" cy="19.4" r="1.5"/><circle cx="16.6" cy="19.4" r="1.5"/><path d="M9.4 9l.6 3.4M13.4 8.8l-.5 3.4M17.4 8.6l-.9 3.4" stroke="#E8322E"/></svg>}
                  {msg.agent === 'Marty Maintenance' && <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M7.5 3.5v4M16.5 3.5v4" stroke="#E8322E"/><path d="M7.4 14h2.2M11 14h2.2M14.6 14h2.2M7.4 17h2.2M11 17h2.2" strokeWidth="2"/></svg>}
                  {msg.agent === 'Cara Care' && <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A1.8 1.8 0 0 1 5.8 3.7h12.4A1.8 1.8 0 0 1 20 5.5v8.3a1.8 1.8 0 0 1-1.8 1.8H13l-4.6 3.9v-3.9H5.8A1.8 1.8 0 0 1 4 13.8z"/><path d="M7.6 9.3h.01M12 9.3h.01M16.4 9.3h.01" strokeWidth="2.6" stroke="#E8322E"/></svg>}
                  {' '}{msg.agent}
                </div>
              )}
              {msg.siteLinks && msg.siteLinks.length > 0 && (
                <div className="agent-site-links">
                  {msg.siteLinks.map((link) => (
                    <Link key={link.href} to={link.href} className="agent-site-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="agent-suggested-actions">
                  {msg.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="agent-action-btn"
                      onClick={() => handleSuggestedAction(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.confidence !== undefined && (
              <div className="agent-confidence">
                Confidence: {(msg.confidence * 100).toFixed(0)}%
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="agent-message agent-message-bot">
            <div className="agent-message-bubble">
              <div className="agent-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="agent-input-area">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question or issue..."
          className="agent-input"
          rows={1}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          className="agent-send-btn"
          title="Send message"
        >
          {loading ? '...' : '→'}
        </button>
      </div>
    </div>
  )
})

AgentChat.displayName = 'AgentChat'

export default AgentChat
