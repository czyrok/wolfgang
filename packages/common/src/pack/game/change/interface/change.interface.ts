import { Subscription } from 'rxjs'

export interface ChangeInterface<T> {
    onChange(callback: (state: T) => void): Subscription
}