'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NotificationManager from '@/components/NotificationManager'

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



//Temporary app/page.tsx for testing (replace your current one temporarily)
// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import NotificationManager from '@/components/NotificationManager'

// export default function Home() {
//   const [isRegistered, setIsRegistered] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     // Check if user is registered (simulate checking localStorage or API)
//     const checkRegistration = async () => {
//       await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
//       const registered = localStorage.getItem('userRegistered') === 'true'
//       setIsRegistered(registered)
//       setLoading(false)
//     }

//     checkRegistration()
//   }, [])

//   // Comment out the redirect for testing
//   // useEffect(() => {
//   //   if (!loading) {
//   //     console.log("Redirecting to:", isRegistered ? '/main' : '/register')
//   //     router.push(isRegistered ? '/main' : '/register')
//   //   }
//   // }, [loading, isRegistered, router])

//   if (loading) {
//     return (
//       <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <div className="loading-spinner"></div>
//       </div>
//     )
//   }

//   // Show content with NotificationManager for testing
//   return (
//     <>
//       <NotificationManager />
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <h1>Testing NotificationManager</h1>
//         <p>Check the blue notification box in the top-right corner</p>
//         <p>Status: {isRegistered ? 'Registered' : 'Not registered'}</p>
//         <button onClick={() => router.push('/main')}>Go to Main</button>
//       </div>
//     </>
//   )
// }