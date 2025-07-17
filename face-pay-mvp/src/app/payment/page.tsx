'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Payment() {
  const [orderTotal, setOrderTotal] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle')
  const [customerName, setCustomerName] = useState('')

  const handleGazePayment = () => {
    setIsProcessing(true)
    setPaymentStatus('scanning')
    
    // Simulate facial recognition and payment process
    setTimeout(() => {
      setCustomerName('Ahmad Hassan')
      setPaymentStatus('success')
      setIsProcessing(false)
    }, 3000)
  }

  const resetPayment = () => {
    setPaymentStatus('idle')
    setOrderTotal('')
    setCustomerName('')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Gaze & Go Payment</h1>
        <p>Effortless Payment Processing</p>
      </div>

      {paymentStatus === 'idle' && (
        <div className="card">
          <h2>Enter Order Details</h2>
          <input
            type="number"
            placeholder="Order Total (RM)"
            className="input"
            value={orderTotal}
            onChange={(e) => setOrderTotal(e.target.value)}
          />
          <button 
            className="button"
            onClick={handleGazePayment}
            disabled={!orderTotal || isProcessing}
          >
            Start Gaze Payment
          </button>
        </div>
      )}

      {paymentStatus === 'scanning' && (
        <div className="card">
          <h2>Processing Payment</h2>
          <p>Amount: RM {orderTotal}</p>
          
          <div className="camera-view">
            <div className="face-overlay"></div>
            <span>Recognizing customer...</span>
          </div>

          <div className="status-indicator status-warning">
            <p>Please look at the Payment Mirror</p>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="card">
          <h2>Payment Successful!</h2>
          
          <div className="status-indicator status-success">
            <p>Pembayaran RM{orderTotal} diterima dari {customerName}!</p>
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div className="amount">RM {orderTotal}</div>
            <p>Customer: {customerName}</p>
            <p>Time: {new Date().toLocaleTimeString()}</p>
            <p>Status: Completed</p>
          </div>

          <button className="button" onClick={resetPayment}>
            New Payment
          </button>
          
          <Link href="/dashboard" className="button secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
            View Dashboard
          </Link>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link href="/" className="button secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
