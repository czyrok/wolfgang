import { Injectable, EventEmitter } from '@angular/core'
import { AlertInterface } from '../interface/alert.interface'

@Injectable()
export class AlertService {
    private _alert!: EventEmitter<AlertInterface>

    public set alert(value: EventEmitter<AlertInterface>) {
        this._alert = value
    }

    public get alert(): EventEmitter<AlertInterface> {
        return this._alert
    }
}