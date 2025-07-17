'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPayment() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const paymentMethods = [
    { id: 'visa', name: 'Visa Card', icon: '💳' },
    { id: 'bank', name: 'Bank Account', icon: '🏦' },
    { id: 'mastercard', name: 'Mastercard', icon: '💳' }
  ]

  const handleAdd = () => {
    if (!selectedMethod) return
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      const methods = JSON.parse(localStorage.getItem('paymentMethods') || '[]')
      methods.push({
        id: Date.now(),
        type: selectedMethod,
        isDefault: methods.length === 0
      })
      localStorage.setItem('paymentMethods', JSON.stringify(methods))
      localStorage.removeItem('isFirstTime')

      setTimeout(() => {
        router.push('/main')
      }, 2000)
    }, 2000)
  }

  if (success) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
        <h2>Payment Method Added Successfully!</h2>
        <p style={{ marginTop: '10px', color: '#ccc' }}>
          Redirecting to main page...
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '40px', textAlign: 'center' }}>
        <div className="loading-spinner" style={{ margin: '100px 0 20px', height: '40px' }}></div>
        <p>Adding payment method...</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px' }}>← Back</button>
        <h1 style={{ fontSize: '20px' }}>Add Payment Method</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Choose a payment method</h2>

      {paymentMethods.map(method => (
        <div
          key={method.id}
          onClick={() => setSelectedMethod(method.id)}
          style={{
            background: selectedMethod === method.id ? '#fff' : '#111',
            color: selectedMethod === method.id ? '#000' : '#fff',
            border: '2px solid #fff',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            cursor: 'pointer',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <div style={{ fontSize: '24px' }}>{method.icon}</div>
          <div>
            <h3 style={{ margin: 0 }}>{method.name}</h3>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: selectedMethod === method.id ? '#000' : '#ccc' }}>
              {method.id === 'bank' ? 'Link your bank account' : 'Add your card'}
            </p>
          </div>
        </div>
      ))}

      <button 
        onClick={handleAdd}
        disabled={!selectedMethod}
        style={{
          marginTop: '20px',
          padding: '12px',
          width: '100%',
          background: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: selectedMethod ? 'pointer' : 'not-allowed',
          opacity: selectedMethod ? 1 : 0.5
        }}
      >
        Add Payment Method
      </button>
    </div>
  )
}