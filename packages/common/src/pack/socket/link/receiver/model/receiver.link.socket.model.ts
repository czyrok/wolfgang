import { Observable, Subscription } from 'rxjs'

import { LinkSocketModel } from '../../model/link.socket.model'

export class ReceiverLinkSocketModel<T> extends LinkSocketModel<T> {
    private _defaultSub!: Subscription
    private _sub!: Subscription

    private _data!: T

    public constructor(
        event: string,
        private observable: Observable<T>
    ) {
        super(event)
    }

    public set defaultSub(value: Subscription) {
        this._defaultSub = value
    }

    public get defaultSub(): Subscription {
        return this._defaultSub
    }

    public set sub(value: Subscription) {
        this._sub = value
    }

    public get sub(): Subscription {
        return this._sub
    }

    public set data(value: T) {
        this._data = value
    }

    public get data(): T {
        return this._data
    }

    public subscribe(callback?: (data: T) => void): this {
        if (callback) {
            if (this.sub === undefined) {
                this.sub = this.observable.subscribe(callback)
            } else {
                this.sub.unsubscribe()

                this.sub = this.observable.subscribe(callback)
            }
        } else {
            if (this.defaultSub === undefined) this.defaultSub = this.observable.subscribe((data: T) => {
                this.data = data
            })
        }

        return this
    }

    public unsubscribe(): this {
        if (this.defaultSub !== undefined) this.defaultSub.unsubscribe()
        if (this.sub !== undefined) this.sub.unsubscribe()

        return this
    }
}