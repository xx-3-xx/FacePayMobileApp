'use client'

import { useState } from 'react'
import { registerPushSubscription } from '@/lib/push'

export default function NotifyConsumerPage() {
  const [subscriptionJSON, setSubscriptionJSON] = useState<string>('')

  const handleSubscribe = async () => {
    try {
      const publicKey = 'BAz6uwu2KYdsM6LRCcHbwKbLMR4yv5Gi7ION5DjgOvqPvwNt'
      const sub = await registerPushSubscription(publicKey)
      setSubscriptionJSON(JSON.stringify(sub))
      console.log('Subscription:', sub)
    } catch (err) {
      console.error('Push subscription error:', err)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Push Notification Setup</h1>
      <button onClick={handleSubscribe}>Subscribe to Push</button>
      {subscriptionJSON && (
        <>
          <h3>Subscription:</h3>
          <pre>{subscriptionJSON}</pre>
        </>
      )}
    </main>
  )
}
