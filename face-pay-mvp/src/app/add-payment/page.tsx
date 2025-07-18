'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPayment() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const paymentMethods = [
    { id: 'visa', name: 'Visa Card', icon: '💳', description: 'Add your Visa card' },
    { id: 'bank', name: 'Bank Account', icon: '🏦', description: 'Link your bank account' },
    { id: 'mastercard', name: 'Mastercard', icon: '💳', description: 'Add your Mastercard' }
  ]

  const handleAdd = () => {
    if (!selectedMethod) return
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Store in memory instead of localStorage for artifacts
      const methods = [
        {
          id: Date.now(),
          type: selectedMethod,
          isDefault: true
        }
      ]

      setTimeout(() => {
        router.push('/main')
      }, 2000)
    }, 2000)
  }

  if (success) {
    return (
      <div style={{ 
        backgroundColor: '#ffffff', 
        minHeight: '100vh', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '48px 24px',
          maxWidth: '400px'
        }}>
          <div style={{ 
            fontSize: '64px', 
            marginBottom: '24px'
          }}>
            ✅
          </div>
          <h2 style={{ 
            color: '#333',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Payment Method Added!
          </h2>
          <p style={{ 
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.4'
          }}>
            Your payment method has been successfully added. Redirecting to main page...
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ 
        backgroundColor: '#ffffff', 
        minHeight: '100vh', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '48px 24px',
          maxWidth: '400px'
        }}>
          <div style={{ 
            width: '40px',
            height: '40px',
            border: '3px solid #e0e0e0',
            borderTop: '3px solid #333',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px'
          }}></div>
          <p style={{ 
            color: '#333',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Adding payment method...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 16px', 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <button 
          onClick={() => router.back()} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#333', 
            fontSize: '16px', 
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          ← Back
        </button>
        <h1 style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          Add Payment Method
        </h1>
        <div style={{ width: '60px' }}></div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600',
          color: '#333',
          marginBottom: '8px'
        }}>
          Choose Payment Method
        </h2>
        <p style={{ 
          color: '#666',
          fontSize: '16px',
          marginBottom: '32px'
        }}>
          Select your preferred payment method
        </p>

        {/* Payment Methods */}
        <div style={{ 
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          {paymentMethods.map(method => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              style={{
                backgroundColor: '#ffffff',
                border: selectedMethod === method.id ? '2px solid #333' : '1px solid #e0e0e0',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '12px',
                cursor: 'pointer',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                boxShadow: selectedMethod === method.id ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ 
                fontSize: '32px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '12px'
              }}>
                {method.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {method.name}
                </h3>
                <p style={{ 
                  margin: '4px 0 0',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  {method.description}
                </p>
              </div>
              {selectedMethod === method.id && (
                <div style={{ 
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px'
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}

          {/* Add Button */}
          <button 
            onClick={handleAdd}
            disabled={!selectedMethod}
            style={{
              marginTop: '24px',
              padding: '16px 24px',
              width: '100%',
              backgroundColor: selectedMethod ? '#333' : '#e0e0e0',
              color: selectedMethod ? '#fff' : '#999',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: selectedMethod ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease'
            }}
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  )
}