'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Card3D from '@/components/Card3D'

interface PaymentMethod {
  id: number
  type: string
  isDefault: boolean
}

interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  time: string
  status: 'completed' | 'pending' | 'failed'
  category: string
  icon: string
}

export default function CardDetail() {
  const [userName, setUserName] = useState('')
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [currentCard, setCurrentCard] = useState<PaymentMethod | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // const name = localStorage.getItem('userName') || 'User'
    // setUserName(name)
    setUserName('LOW LIANA');

    // const methods = JSON.parse(localStorage.getItem('paymentMethods') || '[]')
    // setPaymentMethods(methods)
    
    // Mock payment methods with specific IDs
    const methods = [
      { id: 1752680977859, type: 'visa', isDefault: true },
      { id: 1752681619070, type: 'bank', isDefault: false },
      { id: 1752681627188, type: 'mastercard', isDefault: false }
    ]
    
    setPaymentMethods(methods)

    // Find current card
    const cardId = parseInt(params.id as string)
    const card = methods.find((method: PaymentMethod) => method.id === cardId)
    setCurrentCard(card || null)
    
    // Generate different mock transactions based on card ID
    const getTransactionsForCard = (cardId: number): Transaction[] => {
      if (cardId === 1752680977859) {
        return [
          {
            id: '1',
            merchant: 'Amazon Purchase',
            amount: -127.45,
            date: '2025-07-18',
            time: '02:15 PM',
            status: 'completed',
            category: 'Shopping',
            icon: '📦'
          },
          {
            id: '2',
            merchant: 'Starbucks Coffee',
            amount: -12.50,
            date: '2025-07-18',
            time: '08:30 AM',
            status: 'completed',
            category: 'Food',
            icon: '☕'
          },
          {
            id: '3',
            merchant: 'Shell Gas Station',
            amount: -45.80,
            date: '2025-07-17',
            time: '06:45 PM',
            status: 'completed',
            category: 'Transport',
            icon: '⛽'
          },
          {
            id: '4',
            merchant: 'Netflix Subscription',
            amount: -15.99,
            date: '2025-07-17',
            time: '12:00 PM',
            status: 'completed',
            category: 'Entertainment',
            icon: '🎬'
          },
          {
            id: '5',
            merchant: 'Whole Foods Market',
            amount: -89.32,
            date: '2025-07-16',
            time: '05:20 PM',
            status: 'completed',
            category: 'Food',
            icon: '🛒'
          },
          {
            id: '6',
            merchant: 'Uber Ride',
            amount: -18.75,
            date: '2025-07-16',
            time: '09:15 AM',
            status: 'completed',
            category: 'Transport',
            icon: '🚗'
          },
          {
            id: '7',
            merchant: 'Apple Store',
            amount: -199.00,
            date: '2025-07-15',
            time: '03:30 PM',
            status: 'completed',
            category: 'Technology',
            icon: '📱'
          },
          {
            id: '8',
            merchant: 'Salary Direct Deposit',
            amount: 3200.00,
            date: '2025-07-15',
            time: '09:00 AM',
            status: 'completed',
            category: 'Income',
            icon: '💰'
          }
        ]
      } else if (cardId === 1752681619070) {
        return [
          {
            id: '1',
            merchant: 'Target Store',
            amount: -67.23,
            date: '2025-07-18',
            time: '04:45 PM',
            status: 'completed',
            category: 'Shopping',
            icon: '🎯'
          },
          {
            id: '2',
            merchant: 'McDonald\'s',
            amount: -9.85,
            date: '2025-07-18',
            time: '12:30 PM',
            status: 'completed',
            category: 'Food',
            icon: '🍟'
          },
          {
            id: '3',
            merchant: 'Metro Transit',
            amount: -2.75,
            date: '2025-07-18',
            time: '07:45 AM',
            status: 'completed',
            category: 'Transport',
            icon: '🚇'
          },
          {
            id: '4',
            merchant: 'CVS Pharmacy',
            amount: -34.67,
            date: '2025-07-17',
            time: '11:20 AM',
            status: 'completed',
            category: 'Health',
            icon: '💊'
          },
          {
            id: '5',
            merchant: 'Steam Games',
            amount: -29.99,
            date: '2025-07-16',
            time: '10:15 PM',
            status: 'completed',
            category: 'Entertainment',
            icon: '🎮'
          },
          {
            id: '6',
            merchant: 'Local Restaurant',
            amount: -42.80,
            date: '2025-07-16',
            time: '07:30 PM',
            status: 'completed',
            category: 'Food',
            icon: '🍽️'
          },
          {
            id: '7',
            merchant: 'Gym Membership',
            amount: -49.99,
            date: '2025-07-16',
            time: '06:00 AM',
            status: 'completed',
            category: 'Health',
            icon: '💪'
          },
          {
            id: '8',
            merchant: 'Freelance Payment',
            amount: 850.00,
            date: '2025-07-15',
            time: '02:00 PM',
            status: 'completed',
            category: 'Income',
            icon: '💼'
          }
        ]
      } else if (cardId === 1752681627188) {
        return [
          {
            id: '1',
            merchant: 'Best Buy Electronics',
            amount: -299.99,
            date: '2025-07-18',
            time: '03:20 PM',
            status: 'completed',
            category: 'Technology',
            icon: '💻'
          },
          {
            id: '2',
            merchant: 'Hotel Booking',
            amount: -185.50,
            date: '2025-07-18',
            time: '10:45 AM',
            status: 'completed',
            category: 'Travel',
            icon: '🏨'
          },
          {
            id: '3',
            merchant: 'Fine Dining Restaurant',
            amount: -78.90,
            date: '2025-07-17',
            time: '08:00 PM',
            status: 'completed',
            category: 'Food',
            icon: '🥂'
          },
          {
            id: '4',
            merchant: 'Premium Car Wash',
            amount: -35.00,
            date: '2025-07-17',
            time: '02:30 PM',
            status: 'completed',
            category: 'Services',
            icon: '🚙'
          },
          {
            id: '5',
            merchant: 'Designer Store',
            amount: -450.00,
            date: '2025-07-16',
            time: '04:15 PM',
            status: 'completed',
            category: 'Fashion',
            icon: '👔'
          },
          {
            id: '6',
            merchant: 'Airport Lounge',
            amount: -65.00,
            date: '2025-07-16',
            time: '06:30 AM',
            status: 'completed',
            category: 'Travel',
            icon: '✈️'
          },
          {
            id: '7',
            merchant: 'Wine Store',
            amount: -120.75,
            date: '2025-07-15',
            time: '05:45 PM',
            status: 'completed',
            category: 'Shopping',
            icon: '🍷'
          },
          {
            id: '8',
            merchant: 'Investment Return',
            amount: 1200.00,
            date: '2025-07-15',
            time: '11:30 AM',
            status: 'completed',
            category: 'Income',
            icon: '📈'
          }
        ]
      } else {
        // Default transactions for any other card ID
        return [
          {
            id: '1',
            merchant: 'Unknown Merchant',
            amount: -50.00,
            date: '2025-07-18',
            time: '12:00 PM',
            status: 'completed',
            category: 'Other',
            icon: '❓'
          }
        ]
      }
    }
    
    setTransactions(getTransactionsForCard(cardId))
    setLoading(false)
  }, [params.id])

  //   // Generate mock transactions
  //   const mockTransactions: Transaction[] = [
  //     {
  //       id: '1',
  //       merchant: 'Grocery Store',
  //       amount: -45.67,
  //       date: '2025-07-17',
  //       time: '10:30 AM',
  //       status: 'completed',
  //       category: 'Food',
  //       icon: '🛒'
  //     },
  //     {
  //       id: '2',
  //       merchant: 'Gas Station',
  //       amount: -32.00,
  //       date: '2025-07-16',
  //       time: '08:15 AM',
  //       status: 'completed',
  //       category: 'Transport',
  //       icon: '⛽'
  //     },
  //     {
  //       id: '3',
  //       merchant: 'Coffee Shop',
  //       amount: -8.50,
  //       date: '2025-07-16',
  //       time: '07:45 AM',
  //       status: 'completed',
  //       category: 'Food',
  //       icon: '☕'
  //     },
  //     {
  //       id: '4',
  //       merchant: 'Online Store',
  //       amount: -89.99,
  //       date: '2025-07-15',
  //       time: '02:20 PM',
  //       status: 'completed',
  //       category: 'Shopping',
  //       icon: '📦'
  //     },
  //     {
  //       id: '5',
  //       merchant: 'Pharmacy',
  //       amount: -24.30,
  //       date: '2025-07-15',
  //       time: '11:00 AM',
  //       status: 'completed',
  //       category: 'Health',
  //       icon: '💊'
  //     },
  //     {
  //       id: '6',
  //       merchant: 'Restaurant',
  //       amount: -56.80,
  //       date: '2025-07-14',
  //       time: '07:30 PM',
  //       status: 'completed',
  //       category: 'Food',
  //       icon: '🍽️'
  //     },
  //     {
  //       id: '7',
  //       merchant: 'Parking Fee',
  //       amount: -5.00,
  //       date: '2025-07-14',
  //       time: '02:00 PM',
  //       status: 'completed',
  //       category: 'Transport',
  //       icon: '🅿️'
  //     },
  //     {
  //       id: '8',
  //       merchant: 'Salary Deposit',
  //       amount: 2500.00,
  //       date: '2025-07-13',
  //       time: '09:00 AM',
  //       status: 'completed',
  //       category: 'Income',
  //       icon: '💰'
  //     }
  //   ]
    
  //   setTransactions(mockTransactions)
  //   setLoading(false)
  // }, [params.id])

  const getCardDetails = (type: string, index: number) => {
    const last4 = `${1000 + index}`.slice(-4)
    return {
      brand: type.toUpperCase(),
      number: `•••• •••• •••• ${last4}`,
      holder: userName.toUpperCase(),
      expiry: type === 'bank' ? 'SAVINGS' : '12/28'
    }
  }

  const cardColors = [
    { bg: 'linear-gradient(135deg, #000000 0%, #333333 100%)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)', text: '#000' },
    { bg: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)', text: '#000' },
    { bg: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', text: '#fff' },
  ]

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    return { formatted, isPositive }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#22c55e'
      case 'pending':
        return '#f59e0b'
      case 'failed':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  if (loading || !currentCard) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        maxHeight: '100vh',
        display: 'flex',
        overflowY:'auto',
        alignItems: 'center',
        WebkitOverflowScrolling: 'touch',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#666666'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  const cardIndex = paymentMethods.findIndex(method => method.id === currentCard.id)
  const cardColor = cardColors[cardIndex % cardColors.length]

  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh' // Ensure it takes full viewport
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 20px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div 
          onClick={() => router.back()}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            color: '#000000',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px'
          }}
        >
          ←
        </div>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000000',
          margin: 0
        }}>
          Card Details
        </h1>
        <div style={{
          fontSize: '24px',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '12px',
          backgroundColor: '#f5f5f5',
          color: '#000000',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
        }}>
          ⋯
        </div>
      </div>

      {/* Card Display */}
      <div style={{
        padding: '32px 20px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '360px',
          transform: 'scale(0.9)',
          transformOrigin: 'center'
        }}>
          <Card3D
            {...getCardDetails(currentCard.type, cardIndex)}
            style={{
              background: cardColor.bg,
              color: cardColor.text,
              border: 'none',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
            }}
          />
        </div>
      </div>

         {/* Transactions Section */}
      <div style={{
        padding: '24px 20px',
        maxWidth: '400px',
        margin: '0 auto',
        overflowY: 'auto',
        flex: 1,
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#000000',
            margin: 0
          }}>
            Recent Activity
          </h2>
          <div style={{
            fontSize: '14px',
            color: '#666666',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            See All
          </div>
        </div>

        {/* Transaction List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          {transactions.map((transaction) => {
            const { formatted, isPositive } = formatAmount(transaction.amount)
            
            return (
              <div
                key={transaction.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f8f8'
                  e.currentTarget.style.borderColor = '#e0e0e0'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                  e.currentTarget.style.borderColor = '#f0f0f0'
                }}
              >
                {/* Transaction Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: isPositive ? '#f0f9ff' : '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: `1px solid ${isPositive ? '#e0f2fe' : '#f0f0f0'}`,
                  flexShrink: 0
                }}>
                  {transaction.icon}
                </div>

                {/* Transaction Details */}
                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4px'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#000000',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {transaction.merchant}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: isPositive ? '#22c55e' : '#000000',
                      marginLeft: '12px',
                      flexShrink: 0
                    }}>
                      {isPositive ? '+' : ''}{formatted}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#666666'
                      }}>
                        {formatDate(transaction.date)} • {transaction.time}
                      </span>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(transaction.status)
                      }} />
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#888888',
                      backgroundColor: '#f5f5f5',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      textTransform: 'capitalize'
                    }}>
                      {transaction.category}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}