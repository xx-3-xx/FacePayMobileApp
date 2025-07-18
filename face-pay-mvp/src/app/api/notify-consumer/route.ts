// app/api/notify-consumer/route.ts
import { NextRequest, NextResponse } from 'next/server'
import webpush from 'web-push'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    console.log('Request body:', body)
    
    const { subscription, consumerId, message, title } = body
    
    // Validate required fields
    if (!subscription) {
      console.error('Missing subscription')
      return NextResponse.json({ error: 'Missing subscription' }, { status: 400 })
    }
    
    if (!subscription.endpoint || !subscription.keys) {
      console.error('Invalid subscription format')
      return NextResponse.json({ error: 'Invalid subscription format' }, { status: 400 })
    }
    
    // Check environment variables
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY
    const vapidEmail = process.env.VAPID_EMAIL || 'mailto:test@example.com'
    
    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error('Missing VAPID keys')
      return NextResponse.json({ error: 'Missing VAPID keys' }, { status: 500 })
    }
    
    console.log('VAPID keys configured:', {
      publicKey: vapidPublicKey ? 'Present' : 'Missing',
      privateKey: vapidPrivateKey ? 'Present' : 'Missing'
    })
    
    // Configure web-push with VAPID details
    webpush.setVapidDetails(
      vapidEmail,
      vapidPublicKey,
      vapidPrivateKey
    )
    
    // Create notification payload
    const payload = JSON.stringify({
      title: title || 'Payment Notification',
      body: message || 'You have a new payment notification',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      data: {
        consumerId,
        timestamp: new Date().toISOString()
      }
    })
    
    console.log('Sending notification with payload:', payload)
    
    // Send notification with proper options
    const result = await webpush.sendNotification(
      subscription,
      payload,
      {
        TTL: 60, // Time to live in seconds
        headers: {
          'Urgency': 'high'
        }
      }
    )
    
    console.log('Notification sent successfully:', result)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notification sent successfully',
      consumerId 
    })
    
  } catch (error) {
    console.error('Detailed error sending notification:', error)
    
    // More specific error handling
    if (error.statusCode === 400) {
      return NextResponse.json({ 
        error: 'Bad request - Invalid subscription or payload',
        details: error.body 
      }, { status: 400 })
    }
    
    if (error.statusCode === 410) {
      return NextResponse.json({ 
        error: 'Subscription expired',
        details: 'The subscription is no longer valid' 
      }, { status: 410 })
    }
    
    if (error.statusCode === 413) {
      return NextResponse.json({ 
        error: 'Payload too large',
        details: 'The notification payload exceeds the maximum size' 
      }, { status: 413 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to send notification',
      details: error.message || 'Unknown error'
    }, { status: 500 })
  }
}

// Optional: Add a GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Notify consumer endpoint is working',
    timestamp: new Date().toISOString()
  })
}