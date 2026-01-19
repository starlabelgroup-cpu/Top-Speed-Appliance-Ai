import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { agentService } from '../services/agentService'

const AgentChat = forwardRef(({ sessionId, onModeChange, onNotify, isLoading }, ref) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I\'m your Top Speed Appliance AI Assistant. I can help you with:\n\n🔧 Diagnose appliance issues\n🛒 Recommend new appliances\n📅 Schedule maintenance\n💬 Answer questions\n\nWhat can I help you with today?',
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
                  {msg.agent === 'Dr. Diagnosto' && '🔧'}
                  {msg.agent === 'Selina Sales' && '🛒'}
                  {msg.agent === 'Marty Maintenance' && '📅'}
                  {msg.agent === 'Cara Care' && '💬'}
                  {' '}{msg.agent}
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
