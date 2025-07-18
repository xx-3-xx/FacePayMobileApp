// lib/subscriptions.ts
const subscriptions: Record<string, any> = {} // replace with DB in production

export function saveSubscription(consumerId: string, subscription: any) {
  subscriptions[consumerId] = subscription
}

export function getSubscriptionByConsumerId(id: string) {
  return subscriptions[id]
}