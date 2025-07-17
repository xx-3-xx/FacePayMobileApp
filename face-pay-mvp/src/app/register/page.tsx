'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFaceScan = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 2000)
  }

  const handleKYC = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      // Store data in memory instead of localStorage for artifacts
      setStep(4) // Success step
    }, 1000)
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 16px', 
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <button 
          onClick={() => router.back()} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#000000', 
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
          color: '#000000',
          margin: 0
        }}>
          Register
        </h1>
        <div style={{ width: '60px' }}></div>
      </div>

      {/* Step 1: Face Verification */}
      {step === 1 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{ 
            marginBottom: '8px', 
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Face Verification
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Secure your account with facial recognition
          </p>
          
          <div style={{ 
            backgroundColor: '#000000', 
            borderRadius: '16px', 
            padding: '48px 24px', 
            textAlign: 'center',
            color: '#fff',
            margin: '0 auto',
            maxWidth: '400px'
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px',
              opacity: loading ? 0.5 : 1
            }}>
              📷
            </div>
            <h3 style={{ 
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Position Your Face
            </h3>
            <p style={{ 
              marginBottom: '32px', 
              color: '#ccc',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              Please position your face in the center of the camera for verification
            </p>
            {loading ? (
              <div style={{ 
                color: '#ccc',
                fontSize: '16px'
              }}>
                Scanning...
              </div>
            ) : (
              <button 
                onClick={handleFaceScan} 
                style={{ 
                  backgroundColor: '#fff', 
                  color: '#000000', 
                  padding: '14px 32px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
              >
                Start Face Scan
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Identity Verification */}
      {step === 2 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{ 
            marginBottom: '8px', 
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Identity Verification
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Verify your identity with your IC
          </p>
          
          <div style={{ 
            backgroundColor: '#000000', 
            borderRadius: '16px', 
            padding: '48px 24px', 
            textAlign: 'center',
            color: '#fff',
            margin: '0 auto',
            maxWidth: '400px'
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px',
              opacity: loading ? 0.5 : 1
            }}>
              🆔
            </div>
            <h3 style={{ 
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Scan Your IC
            </h3>
            <p style={{ 
              marginBottom: '32px', 
              color: '#ccc',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              Please scan your Identity Card (IC) for verification
            </p>
            {loading ? (
              <div style={{ 
                color: '#ccc',
                fontSize: '16px'
              }}>
                Scanning...
              </div>
            ) : (
              <button 
                onClick={handleKYC} 
                style={{ 
                  backgroundColor: '#fff', 
                  color: '#000000', 
                  padding: '14px 32px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
              >
                Scan IC
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Complete Registration */}
      {step === 3 && (
        <div style={{ padding: '24px 16px' }}>
          <h2 style={{ 
            marginBottom: '8px', 
            textAlign: 'center',
            color: '#000000',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Complete Registration
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: '#666',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            Fill in your details to complete setup
          </p>
          
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '16px', 
            padding: '24px', 
            margin: '0 auto',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '12px', 
                    border: '1px solid #e0e0e0', 
                    backgroundColor: '#f9f9f9', 
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '12px', 
                    border: '1px solid #e0e0e0', 
                    backgroundColor: '#f9f9f9', 
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '12px', 
                    border: '1px solid #e0e0e0', 
                    backgroundColor: '#f9f9f9', 
                    color: '#000000',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: '#000000', 
                  color: '#fff', 
                  padding: '16px 24px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div style={{ padding: '24px 16px' }}>
          <div style={{ 
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '400px',
            padding: '48px 24px'
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px'
            }}>
              ✅
            </div>
            <h2 style={{ 
              marginBottom: '16px',
              color: '#000000',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Registration Complete!
            </h2>
            <p style={{ 
              color: '#666',
              marginBottom: '32px',
              fontSize: '16px'
            }}>
              Your account has been successfully created
            </p>
            <button 
              onClick={() => router.push('/add-payment')}
              style={{ 
                backgroundColor: '#000000', 
                color: '#fff', 
                padding: '16px 32px', 
                borderRadius: '12px', 
                border: 'none', 
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue to Payment Setup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}