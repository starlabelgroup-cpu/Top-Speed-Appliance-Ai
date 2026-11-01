import React, { useState, useEffect } from 'react'
import '../styles/booking-calendar.css'

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    appliance: '',
    issue: '',
    preferredDate: null,
    preferredTime: null
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const appliances = ['Refrigerator', 'Washer', 'Dryer', 'Oven', 'Dishwasher', 'Microwave']
  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']

  useEffect(() => {
    generateAvailableSlots()
  }, [])

  const generateAvailableSlots = () => {
    const slots = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        slots.push(date)
      }
    }
    setAvailableSlots(slots)
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setFormData({...formData, preferredDate: date})
    setBookingStep(3)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setFormData({...formData, preferredTime: time})
    setBookingStep(4)
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async () => {
    try {
      const bookingData = {
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      localStorage.setItem('lastBooking', JSON.stringify(bookingData))
      setBookingConfirmed(true)
      
      setTimeout(() => {
        setBookingStep(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setFormData({
          name: '',
          phone: '',
          email: '',
          appliance: '',
          issue: '',
          preferredDate: null,
          preferredTime: null
        })
        setBookingConfirmed(false)
      }, 5000)
    } catch (err) {
      console.error('Booking error:', err)
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const today = new Date()

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-empty"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isAvailable = availableSlots.some(
        slot => slot.toDateString() === date.toDateString()
      )
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()
      const isPast = date < today

      days.push(
        <button
          key={day}
          className={`calendar-day ${isAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
          onClick={() => isAvailable && handleDateSelect(date)}
          disabled={!isAvailable || isPast}
        >
          {day}
        </button>
      )
    }

    return days
  }

  if (bookingConfirmed) {
    return (
      <div className="booking-confirmation">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p>Your appointment request has been received.</p>
          <p className="confirmation-details">
            <strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br/>
            <strong>Time:</strong> {selectedTime}<br/>
            <strong>Appliance:</strong> {formData.appliance}
          </p>
          <p className="confirmation-message">A technician will contact you shortly to confirm.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-calendar-container">
      <div className="booking-progress">
        <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>1. Info</div>
        <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>2. Date</div>
        <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>3. Time</div>
        <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>4. Confirm</div>
      </div>

      {bookingStep === 1 && (
        <div className="booking-step">
          <h3>Tell us about yourself</h3>
          <form className="booking-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <select
              name="appliance"
              value={formData.appliance}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Appliance</option>
              {appliances.map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>
            <textarea
              name="issue"
              placeholder="Describe the issue"
              value={formData.issue}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
            <button
              type="button"
              onClick={() => formData.name && formData.email && formData.phone && formData.appliance && formData.issue && setBookingStep(2)}
              className="btn-next"
            >
              Next: Select Date
            </button>
          </form>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="booking-step">
          <h3>Select a date</h3>
          <div className="calendar-nav">
            <button onClick={previousMonth} className="nav-btn">← Previous</button>
            <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
            <button onClick={nextMonth} className="nav-btn">Next →</button>
          </div>
          <div className="calendar-grid">
            <div className="weekday-header">Sun</div>
            <div className="weekday-header">Mon</div>
            <div className="weekday-header">Tue</div>
            <div className="weekday-header">Wed</div>
            <div className="weekday-header">Thu</div>
            <div className="weekday-header">Fri</div>
            <div className="weekday-header">Sat</div>
            {renderCalendarDays()}
          </div>
        </div>
      )}

      {bookingStep === 3 && (
        <div className="booking-step">
          <h3>Select a time on {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
          <div className="time-slots">
            {timeSlots.map(slot => (
              <button
                key={slot}
                className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookingStep === 4 && (
        <div className="booking-step">
          <h3>Confirm your booking</h3>
          <div className="booking-summary">
            <div className="summary-item">
              <strong>Name:</strong> {formData.name}
            </div>
            <div className="summary-item">
              <strong>Email:</strong> {formData.email}
            </div>
            <div className="summary-item">
              <strong>Phone:</strong> {formData.phone}
            </div>
            <div className="summary-item">
              <strong>Appliance:</strong> {formData.appliance}
            </div>
            <div className="summary-item">
              <strong>Issue:</strong> {formData.issue}
            </div>
            <div className="summary-item">
              <strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="summary-item">
              <strong>Time:</strong> {selectedTime}
            </div>
          </div>
          <button onClick={handleSubmit} className="btn-confirm">
            Confirm Booking
          </button>
          <button onClick={() => setBookingStep(1)} className="btn-back">
            Change Details
          </button>
        </div>
      )}
    </div>
  )
}
