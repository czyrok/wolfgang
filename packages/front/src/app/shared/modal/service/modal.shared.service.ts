import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { ModalSharedInterface } from '../interface/modal.shared.interface'

@Injectable({
    providedIn: 'root'
})
/**
 * Gère le service des des boites modales
 */
export class ModalSharedService {
    private oneOpened: boolean = false

    private _modalOpeningEvent: Subject<ModalSharedInterface> = new Subject
    private _modalClosingEvent: Subject<boolean> = new Subject

    /**
     * @returns Renvois l'évenement d'ouverture d'une boite modale
     */
    public get modalOpeningEvent(): Subject<ModalSharedInterface> {
        return this._modalOpeningEvent
    }

    /**
     * @returns Renvois l'évenement de fermeture d'une boite modale
     */
    public get modalClosingEvent(): Subject<boolean> {
        return this._modalClosingEvent
    }

    constructor() {
        this.modalClosingEvent.subscribe((forSelf: boolean) => {
            if (forSelf) {
                this.oneOpened = false
            }
        })
    }

    /**
     * Ouvre une nouvelle boite modale
     * @param modal Une boite modale
     */
    public open(modal: ModalSharedInterface): void {
        if (!this.oneOpened) {
            this.modalOpeningEvent.next(modal)

            this.oneOpened = true
        }
    }

    /**
     * Ferme la boite modale active
     */
    public close(): void {
        if (this.oneOpened) {
            this.modalClosingEvent.next(false)

            this.oneOpened = false
        }
    }
}
