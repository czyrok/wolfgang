import { Observable, Subscription } from 'rxjs'

import { LinkSocketModel } from '../../model/link.socket.model'

export class ReceiverLinkSocketModel<T> extends LinkSocketModel<T> {
    private _defaultSub!: Subscription
    private _subList: Array<Subscription> = new Array

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

    public get subList(): Array<Subscription> {
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
            this.subList.push(this.observable.subscribe(callback))
        } else {
            if (this.defaultSub === undefined) this.defaultSub = this.observable.subscribe((data: T) => {
                this.data = data
            })
        }

        return this
    }

    public unsubscribe(): this {
        if (this.defaultSub !== undefined) this.defaultSub.unsubscribe()

        for (const sub of this.subList) {
            sub.unsubscribe()
        }

        return this
    }
}