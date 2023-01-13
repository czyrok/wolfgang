import { AfterViewInit, Component, ComponentRef, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { ModalSharedInterface } from '../../interface/modal.shared.interface'
import { ModalSharedService } from '../../service/modal.shared.service'

@Component({
  selector: 'app-shared-modal-element',
  templateUrl: './element.modal.shared.component.html',
  styleUrls: ['./element.modal.shared.component.scss']
})
export class ElementModalSharedComponent implements AfterViewInit, OnDestroy {
  closingEventSub!: Subscription

  constructor(
    private modalSharedService: ModalSharedService
  ) { }

  ngAfterViewInit(): void {
    if (this.closingEventSub !== undefined)
      this.closingEventSub = this.modalSharedService.modalClosingEvent.subscribe((notForSelf: boolean) => {
        if (!notForSelf) {
          this.componentRef.destroy()
        }
      })
  }

  ngOnDestroy(): void {
    if (this.closingEventSub !== undefined) this.closingEventSub.unsubscribe()
  }

  closeButtonCallback(): void {
    this.modalSharedService.modalClosingEvent.next(true)

    this.componentRef.destroy()
  }

  @Input() componentRef!: ComponentRef<ElementModalSharedComponent>

  @Input() modal!: ModalSharedInterface
}