// API Service for Top Speed Appliance AI Agent Backend
// Communicates with Python FastAPI backend on Heroku

const API_BASE_URL = import.meta.env.VITE_REACT_APP_AGENT_API_URL || 'https://topspeed-ai-agent.herokuapp.com/api/v1'

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: expected JSON')
    }

    return await response.json()
  } catch (error) {
    throw error
  }
}

export const agentService = {
  /**
   * Send a chat message to the AI agent
   */
  sendMessage: async (query, sessionId) => {
    return apiCall('/chat', 'POST', {
      query,
      session_id: sessionId,
      context: {}
    })
  },

  /**
   * Get a diagnosis for an appliance
   */
  diagnoseAppliance: async (payload, sessionId) => {
    return apiCall('/diagnose', 'POST', {
      ...payload,
      session_id: sessionId
    })
  },

  /**
   * Get appliance recommendations
   */
  getRecommendations: async (payload, sessionId) => {
    return apiCall('/recommend', 'POST', {
      ...payload,
      session_id: sessionId
    })
  },

  /**
   * Schedule maintenance
   */
  scheduleMaintenance: async (payload, sessionId) => {
    return apiCall('/schedule-maintenance', 'POST', {
      ...payload,
      session_id: sessionId
    })
  },

  /**
   * Check API health
   */
  healthCheck: async () => {
    return apiCall('/health', 'GET')
  },

  /**
   * Get available agents
   */
  listAgents: async () => {
    return apiCall('/agents', 'GET')
  },

  /**
   * Get performance metrics
   */
  getMetrics: async () => {
    return apiCall('/metrics', 'GET')
  }
}

// Health check interval (check every 30 seconds)
let healthCheckInterval = null

export const startHealthCheck = () => {
  if (healthCheckInterval) return

  healthCheckInterval = setInterval(async () => {
    try {
      await agentService.healthCheck()
    } catch (error) {
      // Health check failures are non-fatal, silently ignore
    }
  }, 30000)
}

export const stopHealthCheck = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval)
    healthCheckInterval = null
  }
}
