// Admin Authentication Utilities
// Simple admin auth for now - can be enhanced with Supabase Auth later

const ADMIN_TOKEN_KEY = 'admin_token'
const ADMIN_ROLE_KEY = 'user_role'

export const adminAuth = {
  /**
   * Check if current user is admin
   */
  isAdmin: () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    const role = localStorage.getItem(ADMIN_ROLE_KEY)
    return token === 'admin_authenticated' && role === 'admin'
  },

  /**
   * Set admin session
   */
  setAdminSession: (token) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    localStorage.setItem(ADMIN_ROLE_KEY, 'admin')
  },

  /**
   * Clear admin session
   */
  clearAdminSession: () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    localStorage.removeItem(ADMIN_ROLE_KEY)
  },

  /**
   * Check if user has admin access (can be enhanced)
   */
  hasAdminAccess: () => {
    // For now, check localStorage
    // Later this will check Supabase Auth user roles
    return adminAuth.isAdmin()
  }
}

export const ProtectedAdminRoute = ({ children, redirectPath = '/' }) => {
  if (!adminAuth.hasAdminAccess()) {
    window.location.href = redirectPath
    return null
  }
  return children
}
