import { Injectable, EventEmitter } from '@angular/core'

import { DisplayAlertSharedInterface } from '../interface/display.alert.shared.interface'

import { TypeAlertEnum } from 'common'

@Injectable({
    providedIn: 'root'
})
export class DisplayAlertSharedService {
    private _alertEvent: EventEmitter<DisplayAlertSharedInterface> = new EventEmitter

    public get alertEvent(): EventEmitter<DisplayAlertSharedInterface> {
        return this._alertEvent
    }

    public emitSuccess(text: string): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.SUCCESS,
            text: text
        })
    }

    public emitInform(text: string): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.INFORM,
            text: text
        })
    }

    public emitWarning( text: string): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.WARNING,
            text: text
        })
    }

    public emitDanger(text: string): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.DANGER,
            text: text
        })
    }
}