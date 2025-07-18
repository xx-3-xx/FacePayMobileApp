import webpush from 'web-push'

// Configure VAPID details
webpush.setVapidDetails(
  'mailto:lowliana@1utar.my',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendNotification(subscription: any, payload: any) {
  try {
    console.log('Sending notification to:', subscription.endpoint)
    console.log('Payload:', payload)
    
    await webpush.sendNotification(subscription, JSON.stringify(payload))
    console.log('Notification sent successfully')
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}