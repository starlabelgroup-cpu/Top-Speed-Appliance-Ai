# GA4 Event Tracking Setup

## Events to Track

### 1. Click Phone Call
```javascript
Event Name: click_call
Parameters:
  - event_category: "Contact"
  - event_label: "[service]_repair" or "city_[city]"
  - phone_number: "(954) 931-7997"
```

### 2. Schedule Service
```javascript
Event Name: schedule_service
Parameters:
  - event_category: "Booking"
  - event_label: "[service]_repair" or "city_[city]"
```

### 3. Page View (Service/City Pages)
```javascript
Event Name: page_view
Parameters:
  - page_title: "[service] Repair in [City]"
  - page_path: "/[service]-repair" or "/appliance-repair-[city]"
  - service_type: "washer|dryer|refrigerator|oven" (for service pages)
  - city: "[city name]" (for city pages)
```

---

## Setup Instructions

### Step 1: Verify GA4 Property
1. Go to Google Analytics 4
2. Find property: **G-SGXSB48MB8**
3. Go to: Admin → Events → Create Event

### Step 2: Create Custom Events
In GA4 → Configure → Events:

**Event 1: click_call**
- Click **Create Event**
- Event Name: `click_call`
- Matching Condition: `event = click_call`
- Create

**Event 2: schedule_service**
- Click **Create Event**
- Event Name: `schedule_service`
- Matching Condition: `event = schedule_service`
- Create

**Event 3: submit_form**
- Click **Create Event**
- Event Name: `submit_form`
- Matching Condition: `event = submit_form`
- Create

### Step 3: Convert Events to Conversions
In GA4 → Configure → Conversions:
- Click **New Conversion Event**
- Select: `click_call`, `schedule_service`, `submit_form`
- Mark as Conversion

### Step 4: Create Reports
In GA4 → Reports → Acquisition:
- **Traffic Acquisition**: See organic/direct/GBP traffic
- **Campaign**: See gbp_washer, gbp_dryer, etc. campaigns
- **Conversion Paths**: See which pages lead to conversions

---

## Testing GA4 Events

### Test in Console
```javascript
// Simulate click_call event
gtag('event', 'click_call', {
  'event_category': 'Contact',
  'event_label': 'washer_repair',
  'phone_number': '(954) 931-7997'
});

// Simulate schedule_service event
gtag('event', 'schedule_service', {
  'event_category': 'Booking',
  'event_label': 'city_fort-lauderdale'
});
```

### Real-Time Verification
1. Open Service Page in browser
2. Go to GA4 → Real-time
3. Click phone link
4. Event should appear in Real-time within seconds

---

## Key Metrics to Monitor

**Weekly**
- [ ] Organic traffic by city
- [ ] Phone clicks by service
- [ ] Booking form submissions
- [ ] Conversion rates

**Monthly**
- [ ] Top-performing service pages
- [ ] Top-performing city pages
- [ ] Cost per lead (if using ads)
- [ ] Lead quality score

---

## GA4 Dashboard Setup (Recommended)

Create custom dashboard with:
1. Organic Search traffic by city
2. Phone calls by service type
3. Booking form submissions by city
4. Conversion funnel (view → click → call/form)
5. Top referrers (GBP, organic, direct)

---

## Link GA4 to Google Ads (For Enhanced Attribution)

1. Go to Google Ads Account (AW-17817730406)
2. Settings → Linked accounts
3. Link to GA4 Property (G-SGXSB48MB8)
4. Enable conversion imports from GA4 to Google Ads
5. Map GA4 conversions to Google Ads conversion actions

This allows Google Ads to optimize for actual conversions (calls, bookings, forms).
