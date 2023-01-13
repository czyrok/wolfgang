import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { ModalSharedInterface } from '../interface/modal.shared.interface'

@Injectable({
    providedIn: 'root'
})
export class ModalSharedService {
    private oneOpened: boolean = false

    private _modalOpeningEvent: Subject<ModalSharedInterface> = new Subject
    private _modalClosingEvent: Subject<boolean> = new Subject

    public get modalOpeningEvent(): Subject<ModalSharedInterface> {
        return this._modalOpeningEvent
    }

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

    public open(modal: ModalSharedInterface): void {
        if (!this.oneOpened) {
            this.modalOpeningEvent.next(modal)

            this.oneOpened = true
        }
    }

    public close(): void {
        if (this.oneOpened) {
            this.modalClosingEvent.next(false)

            this.oneOpened = false
        }
    }
}