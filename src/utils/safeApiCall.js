/**
 * Safe API Call Utility
 * 
 * Provides a wrapper around fetch that:
 * 1. Silently handles errors (prevents error logging loops)
 * 2. Validates JSON responses before parsing
 * 3. Never logs errors that could create infinite loops
 * 4. Returns null on failure instead of throwing errors
 * 
 * IMPORTANT: Use this for any optional API calls (metrics, analytics, etc.)
 * that are not critical to app functionality.
 */

/**
 * Make a safe API call that won't break the app if it fails
 * @param {string} endpoint - API endpoint URL or path
 * @param {Object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<Object|null>} - Parsed JSON response or null on error
 */
export const safeApiCall = async (endpoint, options = {}) => {
  try {
    // Validate endpoint
    if (!endpoint || typeof endpoint !== 'string') {
      return null
    }

    // Set default options
    const fetchOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Make the request
    const response = await fetch(endpoint, fetchOptions)

    // Don't throw on non-200 responses - silently return null
    if (!response.ok) {
      return null
    }

    // Check content type before parsing
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // Response is not JSON - silently fail
      return null
    }

    // Parse and return JSON
    const data = await response.json()
    return data
  } catch (error) {
    // Silently suppress all errors
    // DO NOT log errors here - that creates infinite loops!
    // DO NOT try to send error reports - that would use fetch again!
    return null
  }
}

/**
 * Make a safe POST request for optional operations (metrics, analytics, etc.)
 * @param {string} endpoint - API endpoint URL or path
 * @param {Object} payload - Data to send
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export const safePost = async (endpoint, payload = {}) => {
  try {
    const result = await safeApiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return result !== null
  } catch (error) {
    // Silently fail
    return false
  }
}

/**
 * Make a safe GET request for optional operations
 * @param {string} endpoint - API endpoint URL or path
 * @returns {Promise<Object|null>} - Response data or null
 */
export const safeGet = async (endpoint) => {
  return safeApiCall(endpoint, { method: 'GET' })
}

export default safeApiCall
