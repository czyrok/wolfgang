import { Subscription } from 'rxjs'

export interface SubscriptionReceiverLinkSocketInterface<T> {
    callback: (data: T) => void
    subscription: Subscription
}