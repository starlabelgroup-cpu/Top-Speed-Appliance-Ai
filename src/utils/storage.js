function getLocalStorage() {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function storageGetItem(key, fallback = '') {
  const storage = getLocalStorage()
  if (!storage) return fallback

  try {
    const value = storage.getItem(key)
    return value == null ? fallback : value
  } catch {
    return fallback
  }
}

export function storageSetItem(key, value) {
  const storage = getLocalStorage()
  if (!storage) return false

  try {
    storage.setItem(key, String(value))
    return true
  } catch {
    return false
  }
}

export function storageRemoveItem(key) {
  const storage = getLocalStorage()
  if (!storage) return false

  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function storageGetJson(key, fallback) {
  const raw = storageGetItem(key, null)
  if (raw == null || raw === '') return fallback

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function storageSetJson(key, value) {
  try {
    return storageSetItem(key, JSON.stringify(value))
  } catch {
    return false
  }
}
