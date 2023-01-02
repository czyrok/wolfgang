import { Observable, Subscription } from 'rxjs'

import { EventSocketModel } from '../../model/event.socket.model'

export class ReceiverEventSocketModel<T> extends EventSocketModel<T> {
    private defaultSub!: Subscription
    private sub!: Subscription

    private _data!: T

    constructor(
        event: string,
        private observable: Observable<T>
    ) {
        super(event)
    }

    set data(value: T) {
        this._data = value
    }

    get data(): T {
        return this._data
    }

    public subscribe(options?: { callback?: ((data: T) => void) }): this {
        if (options && options.callback) {
            if (this.sub === undefined) {
                this.sub = this.observable.subscribe(options.callback)
            } else {
                this.sub.unsubscribe()

                this.sub = this.observable.subscribe(options.callback)
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