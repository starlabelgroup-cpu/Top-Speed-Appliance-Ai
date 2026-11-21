# Development Safeguards & Best Practices

## Critical Issue History

### The Error Logging Loop (Resolved)
**Problem**: The app was throwing `SyntaxError: Unexpected token '<'` errors

**Root Cause**:
1. Analytics tried to POST metrics to `/api/metrics` (non-existent endpoint)
2. The fetch wrapper caught the error and tried to log it with `trackError()`
3. Error logging tried to POST to `/api/metrics` again
4. The missing endpoint returned HTML (<!DOCTYPE>) instead of JSON
5. This created an infinite loop of errors

**Solution Implemented**:
- Removed error logging from fetch wrapper
- Made all metrics logging silent (no re-throwing errors)
- Used `sendBeacon` instead of fetch for metrics (more reliable, doesn't trigger fetch interceptors)
- Created `safeApiCall` utility for optional API calls

---

## Guidelines for Developers

### ✅ DO
- **Use `safeApiCall` for optional API calls** (metrics, analytics, etc.)
- **Use booking config for HouseCall Pro links** - import from `src/config/bookingConfig.js`
- **Silently fail for non-critical operations** (analytics, metrics)
- **Avoid error logging inside error handlers** - creates infinite loops
- **Test with missing/broken APIs** - ensure the app still works

### ❌ DON'T
- **Don't call fetch inside fetch error handlers** - creates circular errors
- **Don't try to log errors that occurred while logging errors** - obvious loop!
- **Don't hardcode booking URLs** - use `BOOKING_CONFIG.BOOKING_URL`
- **Don't make critical business logic dependent on optional APIs**
- **Don't fetch from endpoints that don't exist in production**

---

## Key Files to Know

### Booking Links
**File**: `src/config/bookingConfig.js`

**Usage**:
```javascript
import { BOOKING_CONFIG, getBookingLink } from '@/config/bookingConfig'

// Use the constant
<a href={BOOKING_CONFIG.BOOKING_URL}>Book Now</a>

// Or with tracking
<a href={getBookingLink('services')}>Book Now</a>
```

### Safe API Calls
**File**: `src/utils/safeApiCall.js`

**Usage**:
```javascript
import { safePost, safeGet } from '@/utils/safeApiCall'

// For analytics/metrics
const logged = await safePost('/api/metrics', { data: 'value' })
// Returns true/false, never throws

// For health checks
const health = await safeGet('/api/health')
// Returns null if it fails, never throws
```

### Analytics
**File**: `src/utils/analytics.js`

**Current Safeguards**:
- Only logs metrics in development mode
- Uses `sendBeacon` instead of fetch
- Never logs errors (prevents infinite loops)
- All failures are silent

---

## How to Add New API Calls

### For Optional Operations (Analytics, Metrics, Health Checks)
```javascript
import { safeApiCall } from '@/utils/safeApiCall'

// Do this
const result = await safeApiCall('/api/my-endpoint')
if (result) {
  // Handle success
}
// No error handling needed - failures are silent
```

### For Required Operations (Booking, Business Logic)
```javascript
// Must work in production - handle errors properly
try {
  const response = await fetch('/api/critical-endpoint')
  // ... handle response
} catch (error) {
  // Show user-friendly error message
  // Do NOT attempt to log this error!
}
```

### For Metrics/Analytics
```javascript
import { logMetric } from '@/utils/analytics'

// Do this
logMetric('user_action', { action: 'clicked_button' })
// Always succeeds silently - no error handling needed
```

---

## Testing Checklist

Before pushing code:

- [ ] App works with all APIs down
- [ ] No errors in console when optional APIs fail
- [ ] HouseCall Pro links work correctly
- [ ] Booking buttons visible and functional
- [ ] No infinite error loops
- [ ] Analytics don't break the app
- [ ] Mobile responsive

---

## If You See "API call failed" Errors

**Steps to debug**:
1. Check browser console for actual error message
2. Check which endpoint is failing (look at network tab)
3. Determine if this is a required or optional operation
4. If optional: Use `safeApiCall` and add silent error handling
5. If required: Add proper error UI and user messaging
6. Never call fetch inside a fetch error handler!

---

## Important: HouseCall Pro Links

The booking links are centralized for a reason. If you need to update them:

1. **Edit ONLY**: `src/config/bookingConfig.js`
2. **Update**: `BOOKING_CONFIG.BOOKING_URL`
3. **All components automatically get the new link**
4. **No need to update individual components**

This prevents broken links and ensures consistency across the entire site.
