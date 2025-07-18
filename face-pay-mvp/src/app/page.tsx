'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is registered (simulate checking localStorage or API)
    const checkRegistration = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      const registered = localStorage.getItem('userRegistered') === 'true'
      setIsRegistered(registered)
      setLoading(false)
    }

    checkRegistration()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (isRegistered) {
        router.push('/main')
      } else {
        router.push('/register')
      }
    }
  }, [loading, isRegistered, router])
  
  useEffect(() => {
  if (!loading) {
    console.log("Redirecting to:", isRegistered ? '/main' : '/register')
    router.push(isRegistered ? '/main' : '/register')
  }
}, [loading, isRegistered, router])


  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return null
}

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>Gaze & Go</h1>
//         <p>Payment System</p>
//       </div>

//       <div className="card">
//         <h2>Welcome to Gaze & Go</h2>
//         <p>Revolutionary payment system for MSMEs powered by facial recognition and DuitNow</p>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         <Link href="/register" className="button" style={{ textDecoration: 'none', textAlign: 'center' }}>
//           Register New Customer
//         </Link>
//         <Link href="/payment" className="button secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
//           Process Payment
//         </Link>
//         <Link href="/dashboard" className="button secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
//           Merchant Dashboard
//         </Link>
//       </div>
//     </div>
//   )
// }