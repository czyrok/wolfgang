import { Injectable, EventEmitter } from '@angular/core'
import { AlertInterface } from '../interface/alert.interface'
import { TypeAlertEnum } from '../type/enum/type.alert.enum'

@Injectable()
export class AlertService {
    private _alertEvent: EventEmitter<AlertInterface> = new EventEmitter

    public get alertEvent(): EventEmitter<AlertInterface> {
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