import { Injectable, EventEmitter } from '@angular/core'

import { DisplayAlertSharedInterface } from '../interface/display.alert.shared.interface'

import { TypeAlertEnum } from 'common'
import { ButtonListDisplayAlertSharedInterface } from '../button-list/interface/button-list.display.alert.shared.interface'

@Injectable({
    providedIn: 'root'
})
export class DisplayAlertSharedService {
    private _alertEvent: EventEmitter<DisplayAlertSharedInterface> = new EventEmitter

    public get alertEvent(): EventEmitter<DisplayAlertSharedInterface> {
        return this._alertEvent
    }

    public emitSuccess(text: string, buttonList?: Array<ButtonListDisplayAlertSharedInterface>): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.SUCCESS,
            text: text,
            buttonList: buttonList
        })
    }

    public emitInform(text: string, buttonList?: Array<ButtonListDisplayAlertSharedInterface>): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.INFORM,
            text: text,
            buttonList: buttonList
        })
    }

    public emitWarning(text: string, buttonList?: Array<ButtonListDisplayAlertSharedInterface>): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.WARNING,
            text: text,
            buttonList: buttonList
        })
    }

    public emitDanger(text: string, buttonList?: Array<ButtonListDisplayAlertSharedInterface>): void {
        this.alertEvent.emit({
            type: TypeAlertEnum.DANGER,
            text: text,
            buttonList: buttonList
        })
    }
}