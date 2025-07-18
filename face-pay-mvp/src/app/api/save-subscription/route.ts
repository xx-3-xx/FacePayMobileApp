import { NextRequest, NextResponse } from 'next/server'

const subscriptions: Record<string, any> = {} // replace with DB in production

export async function POST(request: NextRequest) {
  try {
    const { subscription, consumerId } = await request.json()

    if (!subscription || !consumerId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    subscriptions[consumerId] = subscription // store in memory for demo

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving subscription:', error)
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
  }
}

export function getSubscriptionByConsumerId(id: string) {
  return subscriptions[id]
}