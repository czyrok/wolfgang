import { Injectable, EventEmitter } from '@angular/core'

import { DisplayAlertSharedInterface } from '../interface/display.alert.shared.interface'
import { ButtonListDisplayAlertSharedInterface } from '../button-list/interface/button-list.display.alert.shared.interface'

import { TypeAlertEnum } from 'common'

@Injectable({
    providedIn: 'root'
})
/**
 *@classdesc Gère l'affichage des alertes
 */
export class DisplayAlertSharedService {
    private _alertEvent: EventEmitter<DisplayAlertSharedInterface> = new EventEmitter

    /**
     * @returns alertEvent
     */
    public get alertEvent(): EventEmitter<DisplayAlertSharedInterface> {
        return this._alertEvent
    }

    /**
     * Fonction qui permet de créer une alerte de type succès
     * @param text Description de l'alerte
     * @param detailed Modifie l'affichage de l'alerte
     * @param timer Dis si l'alerte est temporaire ou permanente
     * @param buttonList Permet de modifier le bouton par défaut d'une alerte
     * @returns Elle renvois l'objet de l'alerte émise
     */
    public emitSuccess(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.SUCCESS, text, detailed, timer, buttonList)
    }

    /**
     * Fonction qui permet de créer une alerte de type information
     * @param text Description de l'alerte
     * @param detailed Modifie l'affichage de l'alerte
     * @param timer Dis si l'alerte est temporaire ou permanente
     * @param buttonList Permet de modifier le bouton par défaut d'une alerte
     * @returns Elle renvois l'objet de l'alerte émise
     */
    public emitInform(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.INFORM, text, detailed, timer, buttonList)
    }

    /**
     * Fonction qui permet de créer une alerte de type avertissement
     * @param text Description de l'alerte
     * @param detailed Modifie l'affichage de l'alerte
     * @param timer Dis si l'alerte est temporaire ou permanente
     * @param buttonList Permet de modifier le bouton par défaut d'une alerte
     * @returns Elle renvois l'objet de l'alerte émise
     */
    public emitWarning(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.WARNING, text, detailed, timer, buttonList)
    }

    /**
     * Fonction qui permet de créer une alerte de type danger
     * @param text Description de l'alerte
     * @param detailed Modifie l'affichage de l'alerte
     * @param timer Dis si l'alerte est temporaire ou permanente
     * @param buttonList Permet de modifier le bouton par défaut d'une alerte
     * @returns Elle renvois l'objet de l'alerte émise
     */
    public emitDanger(
        text: string,
        detailed?: boolean,
        timer?: boolean,
        buttonList?: Array<ButtonListDisplayAlertSharedInterface>
    ): DisplayAlertSharedInterface {
        return this.emit(TypeAlertEnum.DANGER, text, detailed, timer, buttonList)
    }

    /**
     * Fonction qui construit une alerte et qui l'émet
     * @param type Type de l'alerte selon l'énumération TypeAlertEnum
     * @param text Description de l'alerte
     * @param detailed Modifie l'affichage de l'alerte
     * @param timer Dis si l'alerte est temporaire ou permanente
     * @param buttonList Permet de modifier le bouton par défaut d'une alerte
     * @returns Une alerte
     */
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
