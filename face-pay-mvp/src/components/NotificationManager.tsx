'use client'

import { useEffect, useState } from 'react'

export default function NotificationManager() {
  const [status, setStatus] = useState('Initializing...')
  const [error, setError] = useState('')
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      initializeNotifications()
    } else {
      setError('Service Worker not supported')
    }
  }, [])

  async function initializeNotifications() {
    try {
      setStatus('Requesting permission...')
      
      // Check if we have the VAPID key
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) {
        setError('VAPID public key not found in environment variables')
        return
      }

      const permission = await Notification.requestPermission()
      console.log('Notification permission:', permission)
      
      if (permission !== 'granted') {
        setError('Notification permission denied')
        return
      }

      setStatus('Registering service worker...')
      const reg = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker registered:', reg)

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready

      setStatus('Creating push subscription...')
      const pushSubscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      })

      console.log('Push subscription created:', pushSubscription)
      setSubscription(pushSubscription)
      setStatus('✅ Ready to receive notifications!')

    } catch (error) {
      console.error('Error setting up notifications:', error)
      setError(`Setup failed: ${error.message}`)
    }
  }

  async function notifyConsumer() {
    if (!subscription) {
      setError('No subscription available. Please initialize notifications first.')
      return
    }

    try {
      setStatus('Sending notification...')

      const response = await fetch('/api/notify-consumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          consumerId: 'abc123', // You might want to make this dynamic
          message: 'Test notification from NotificationManager',
          title: 'Test Notification'
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Notify consumer error:', errorData)
        setError(`Failed to send notification: ${response.status} ${response.statusText}`)
        return
      }

      const result = await response.json()
      console.log('Notification sent:', result)
      setStatus('✅ Notification sent successfully!')

    } catch (error) {
      console.error('Error sending notification:', error)
      setError(`Failed to send notification: ${error.message}`)
    }
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
  }

  // Show error state
  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#fef2f2',
        border: '1px solid #f87171',
        color: '#dc2626',
        padding: '12px 16px',
        borderRadius: '6px',
        maxWidth: '300px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <strong>Error:</strong> {error}
        <button 
          onClick={() => {
            setError('')
            setStatus('Initializing...')
            initializeNotifications()
          }}
          style={{
            display: 'block',
            marginTop: '8px',
            padding: '4px 12px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#eff6ff',
      border: '1px solid #60a5fa',
      color: '#1d4ed8',
      padding: '12px 16px',
      borderRadius: '6px',
      maxWidth: '300px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ marginBottom: '8px' }}>
        <strong>Status:</strong> {status}
      </div>
      
      {subscription && (
        <button
          onClick={notifyConsumer}
          style={{
            padding: '4px 12px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          Test Notification
        </button>
      )}
      
      <button
        onClick={() => {
          setError('')
          setStatus('Initializing...')
          initializeNotifications()
        }}
        style={{
          padding: '4px 12px',
          backgroundColor: '#4b5563',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        Reinitialize
      </button>
    </div>
  )
}