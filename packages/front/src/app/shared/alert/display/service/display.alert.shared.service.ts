import { Injectable, EventEmitter } from '@angular/core'

import { DisplayAlertSharedInterface } from '../interface/display.alert.shared.interface'
import { ButtonListDisplayAlertSharedInterface } from '../button-list/interface/button-list.display.alert.shared.interface'

import { TypeAlertEnum } from 'common'

@Injectable({
    providedIn: 'root'
})
export class DisplayAlertSharedService {
    private _alertEvent: EventEmitter<DisplayAlertSharedInterface> = new EventEmitter

    public get alertEvent(): EventEmitter<DisplayAlertSharedInterface> {
        return this._alertEvent
    }

    public emitSuccess(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.SUCCESS, text, detailed, timer, buttonList)
    }

    public emitInform(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.INFORM, text, detailed, timer, buttonList)
    }

    public emitWarning(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.WARNING, text, detailed, timer, buttonList)
    }

    public emitDanger(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.DANGER, text, detailed, timer, buttonList)
    }

    public emit(type: TypeAlertEnum, text: string, detailed?: boolean, timer?: boolean, buttonList?: Array<ButtonListDisplayAlertSharedInterface>) {
        const alert: DisplayAlertSharedInterface = {
            type: type,
            text: text,
            detailed: detailed,
            timer: timer ?? true,
            buttonList: buttonList
        }

        this.alertEvent.emit(alert)

        return alert
    }
}