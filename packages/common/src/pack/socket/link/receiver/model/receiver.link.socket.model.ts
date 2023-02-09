import { Observable, Subscription } from 'rxjs'

import { LinkSocketModel } from '../../model/link.socket.model'

import { SubscriptionReceiverLinkSocketInterface } from '../subscription/interface/subscription.receiver.link.socket.interface'

export class ReceiverLinkSocketModel<T> extends LinkSocketModel<T> {
    private _defaultSub?: Subscription
    private _subList: Array<SubscriptionReceiverLinkSocketInterface<T>> = new Array

    private _data!: T

    public constructor(
        event: string,
        private observable: Observable<T>
    ) {
        super(event)
    }

    public set defaultSub(value: Subscription | undefined) {
        this._defaultSub = value
    }

    public get defaultSub(): Subscription | undefined {
        return this._defaultSub
    }

    private set subList(value: Array<SubscriptionReceiverLinkSocketInterface<T>>) {
        this._subList = value
    }

    public get subList(): Array<SubscriptionReceiverLinkSocketInterface<T>> {
        return this._subList
    }

    public set data(value: T) {
        this._data = value
    }

    public get data(): T {
        return this._data
    }

    public subscribe(callback?: (data: T) => void): this {
        if (callback) {
            this.subList.push({
                callback: callback,
                subscription: this.observable.subscribe(callback)
            })
        } else {
            if (this.defaultSub === undefined) this.defaultSub = this.observable.subscribe((data: T) => {
                this.data = data
            })
        }

        return this
    }

    public unsubscribe(callback?: (data: T) => void): this {
        if (callback) {
            const sub: Subscription = this.subList
                .filter((sub: SubscriptionReceiverLinkSocketInterface<T>) => sub.callback === callback)
                .map((sub: SubscriptionReceiverLinkSocketInterface<T>) => sub.subscription)[0]

            this.subList = this.subList
                .filter((sub: SubscriptionReceiverLinkSocketInterface<T>) => sub.callback !== callback)

            if (sub) sub.unsubscribe()

            return this
        }

        if (this.defaultSub !== undefined) {
            this.defaultSub.unsubscribe()

            this.defaultSub = undefined
        }

        for (const sub of this.subList) {
            sub.subscription.unsubscribe()
        }

        this.subList.splice(0, this.subList.length)

        return this
    }
}