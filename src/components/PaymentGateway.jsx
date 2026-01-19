import React, { useState } from 'react'
import '../styles/payment-gateway.css'

export default function PaymentGateway({ amount = 89, description = 'Service Diagnostic' }) {
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    } else if (name === 'cardExpiry') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4)
      }
    } else if (name === 'cardCvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData({ ...formData, [name]: formattedValue })
  }

  const validatePaymentForm = () => {
    if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
      setPaymentError('Please fill in all card details')
      return false
    }

    const cardNum = formData.cardNumber.replace(/\s/g, '')
    if (cardNum.length < 13 || cardNum.length > 19) {
      setPaymentError('Invalid card number')
      return false
    }

    const [month, year] = formData.cardExpiry.split('/')
    if (!month || !year || month < 1 || month > 12) {
      setPaymentError('Invalid expiry date')
      return false
    }

    if (formData.cardCvc.length < 3 || formData.cardCvc.length > 4) {
      setPaymentError('Invalid CVC')
      return false
    }

    return true
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setPaymentError(null)

    if (!validatePaymentForm()) return

    setIsProcessing(true)

    try {
      const payload = {
        amount: Math.round(amount * 100),
        currency: 'USD',
        description,
        paymentMethod,
        email: formData.email,
        phone: formData.phone,
        card: {
          name: formData.cardName,
          number: formData.cardNumber.replace(/\s/g, ''),
          expiry: formData.cardExpiry,
          cvc: formData.cardCvc
        },
        timestamp: new Date().toISOString()
      }

      localStorage.setItem('pendingPayment', JSON.stringify(payload))

      await new Promise(resolve => setTimeout(resolve, 1500))

      setPaymentSuccess(true)
      setTimeout(() => {
        setPaymentSuccess(false)
        setPaymentStep(1)
        setFormData({
          cardName: '',
          cardNumber: '',
          cardExpiry: '',
          cardCvc: '',
          email: '',
          phone: ''
        })
      }, 3000)
    } catch (err) {
      setPaymentError('Payment processing failed. Please try again.')
      console.error('Payment error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <div className="success-card">
          <div className="success-checkmark">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your payment of ${amount.toFixed(2)} has been processed.</p>
          <p className="receipt-info">A receipt has been sent to your email.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-gateway">
      <div className="payment-container">
        <h2>Secure Payment</h2>
        
        <div className="payment-amount">
          <span className="amount-label">{description}</span>
          <span className="amount-value">${amount.toFixed(2)}</span>
        </div>

        {paymentError && (
          <div className="payment-error">
            <strong>Error:</strong> {paymentError}
          </div>
        )}

        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="form-section">
            <label>Full Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-section">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-section">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(954) 931-7997"
            />
          </div>

          <div className="form-section">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Expiry Date</label>
              <input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>

            <div className="form-section">
              <label>CVC</label>
              <input
                type="text"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isProcessing} className="payment-btn">
            {isProcessing ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
        </form>

        <div className="payment-security">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="#d10000"/>
          </svg>
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </div>
  )
}
