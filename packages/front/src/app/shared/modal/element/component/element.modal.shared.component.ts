import { AfterViewInit, Component, ComponentRef, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { ModalSharedInterface } from '../../interface/modal.shared.interface'
import { ModalSharedService } from '../../service/modal.shared.service'

@Component({
  selector: 'app-shared-modal-element',
  templateUrl: './element.modal.shared.component.html',
  styleUrls: ['./element.modal.shared.component.scss']
})
/**
 * Gère les composants des élements de boite modale
 */
export class ElementModalSharedComponent implements AfterViewInit, OnDestroy {
  closingEventSub!: Subscription
  /**
   * @param modalSharedService Service de boite modale
   */
  constructor(
    private modalSharedService: ModalSharedService
  ) { }

  /**
   * Permet d'instancier l'abonnement de l'évenement de fermeture
   */
  ngAfterViewInit(): void {
    if (this.closingEventSub === undefined)
      this.closingEventSub = this.modalSharedService.modalClosingEvent.subscribe((notForSelf: boolean) => {
        if (!notForSelf) {
          this.componentRef.destroy()
        }
      })
  }

  /**
   * Permet de désabonner l'élement en cas de déstruction
   */
  ngOnDestroy(): void {
    if (this.closingEventSub !== undefined) this.closingEventSub.unsubscribe()
  }

  /**
   * Permet de détruire le composant apres appuis sur le boutton
   */
  closeButtonCallback(): void {
    this.modalSharedService.modalClosingEvent.next(true)

    this.componentRef.destroy()
  }

  @Input() componentRef!: ComponentRef<ElementModalSharedComponent>

  @Input() modal!: ModalSharedInterface
}
