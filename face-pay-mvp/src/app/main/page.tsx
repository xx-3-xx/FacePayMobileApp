'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card3D from '@/components/Card3D'

interface PaymentMethod {
  id: number
  type: string
  isDefault: boolean
}

export default function Main() {
  const [userName, setUserName] = useState('')
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [cardsExpanded, setCardsExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User'
    setUserName(name)
    const methods = JSON.parse(localStorage.getItem('paymentMethods') || '[]')
    setPaymentMethods(methods)
  }, [])

  const getCardDetails = (type: string, index: number) => {
    const last4 = `${1000 + index}`.slice(-4)
    return {
      brand: type.toUpperCase(),
      number: `•••• •••• •••• ${last4}`,
      holder: userName.toUpperCase(),
      expiry: type === 'bank' ? 'SAVINGS' : '12/28'
    }
  }

  const handleCardClick = (method: PaymentMethod) => {
    router.push(`/card-detail/${method.id}`)
  }

  const handleDefaultCardClick = () => {
    if (paymentMethods.length > 1) {
      setCardsExpanded(!cardsExpanded)
    } else if (paymentMethods.length === 1) {
      handleCardClick(paymentMethods[0])
    }
  }

  const handleStackedCardClick = (method: PaymentMethod, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!cardsExpanded) {
      setCardsExpanded(true)
    } else {
      handleCardClick(method)
    }
  }

  const cardColors = [
    { bg: 'linear-gradient(135deg, #000000 0%, #333333 100%)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)', text: '#000' },
    { bg: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)', text: '#000' },
    { bg: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', text: '#fff' },
  ]

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      padding: '24px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        maxWidth: '400px',
        margin: '0 auto 32px auto'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '600',
            color: '#000000',
            margin: '0 0 4px 0'
          }}>
            {userName}
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#666666',
            margin: '0'
          }}>
            Manage your payment methods
          </p>
        </div>
        <div style={{ 
          fontSize: '24px', 
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: '#000000',
          color: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}>
          ⚙️
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto',
        position: 'relative' 
      }}>
        {paymentMethods.length > 0 ? (
          <div>
            {/* Cards Container */}
            <div style={{ 
              position: 'relative',
              perspective: '1000px',
              minHeight: cardsExpanded ? 'auto' : '240px',
              transition: 'min-height 0.5s ease-out',
              WebkitOverflowScrolling: 'touch',
              maxHeight: 'calc(100vh - 300px)', // Adjust based on header + padding + button height
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
              
              {/* Default Card - Now clickable */}
              <div 
                style={{ 
                  position: 'relative',
                  zIndex: paymentMethods.length,
                  transform: cardsExpanded ? 'translateY(0)' : 'translateY(0)',
                  transition: 'transform 0.3s ease-out',
                  cursor: 'pointer'
                }}
                onClick={() => handleCardClick(paymentMethods[0])}
              >
                <Card3D
                  {...getCardDetails(paymentMethods[0].type, 0)}
                  onClick={() => handleCardClick(paymentMethods[0])}
                  style={{
                    background: cardColors[0].bg,
                    color: cardColors[0].text,
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                />
              </div>

              {/* Stack indicator when cards are stacked */}
              {!cardsExpanded && paymentMethods.length > 1 && (
                <div
                  onClick={handleDefaultCardClick}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: paymentMethods.length + 1,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#ffffff',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  +{paymentMethods.length - 1} more
                </div>
              )}

              {/* Stacked Cards */}
              {paymentMethods.slice(1).map((method, index) => (
                <div
                  key={method.id}
                  style={{
                    position: cardsExpanded ? 'relative' : 'absolute',
                    top: cardsExpanded ? 'auto' : `${(index + 1) * 6}px`,
                    left: cardsExpanded ? 'auto' : `${(index + 1) * 3}px`,
                    right: cardsExpanded ? 'auto' : `-${(index + 1) * 3}px`,
                    marginTop: cardsExpanded ? '20px' : '0',
                    marginBottom: cardsExpanded ? '0' : '0',
                    zIndex: cardsExpanded ? 1 : paymentMethods.length - index - 1,
                    transform: cardsExpanded 
                      ? 'translateY(0) scale(1)' 
                      : `translateY(0) scale(${1 - (index + 1) * 0.03})`,
                    opacity: cardsExpanded ? 1 : 0.8,
                    transition: `all 0.5s ease-out ${cardsExpanded ? index * 0.1 : 0}s`,
                    cursor: 'pointer'
                  }}
                  onClick={(e) => handleStackedCardClick(method, e)}
                >
                  <Card3D
                    {...getCardDetails(method.type, index + 1)}
                    stacked={!cardsExpanded}
                    onClick={(e) => {
                      e?.stopPropagation()
                      handleCardClick(method)
                    }}
                    style={{
                      background: cardColors[(index + 1) % cardColors.length].bg,
                      color: cardColors[(index + 1) % cardColors.length].text,
                      border: 'none',
                      boxShadow: cardsExpanded 
                        ? '0 8px 24px rgba(0,0,0,0.12)' 
                        : '0 4px 16px rgba(0,0,0,0.08)'
                    }}
                  />
                </div>
              ))}
            </div>

          </div>
          
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              opacity: 0.5
            }}>
              💳
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#000000',
              margin: '0 0 8px 0'
            }}>
              No Cards Yet
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#666666',
              margin: '0'
            }}>
              Add your first payment method to get started
            </p>
          </div>
        )}
      </div>


            {/* Expand/Collapse Button */}
            {paymentMethods.length > 1 && (
              <div
                onClick={() => setCardsExpanded(!cardsExpanded)}
                style={{
                  marginTop: '24px',
                  padding: '16px 24px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  textAlign: 'center',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px',
                  border: '1px solid #333333',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'all 3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {cardsExpanded ? (
                  <>
                    <span>↑</span>
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <span>↓</span>
                    <span>Show All Payment Methods({paymentMethods.length})</span>
                  </>
                )}
              </div>
            )}
      {/* Add Payment Button */}
      <div
        onClick={() => router.push('/add-payment')}
        style={{
          marginTop: '32px',
          padding: '18px 24px',
          backgroundColor: '#000000',
          color: '#ffffff',
          textAlign: 'center',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '16px',
          border: '1px solid #333333',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          maxWidth: '400px',
          margin: '32px auto 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '20px' }}>+</span>
        <span>Add New Payment Method</span>
      </div>
    </div>
  )
}