import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core'

import { ModalSharedService } from '../../service/modal.shared.service'

import { ElementModalSharedComponent } from '../../element/component/element.modal.shared.component'

import { ModalSharedInterface } from '../../interface/modal.shared.interface'

@Component({
  selector: 'app-shared-modal-container',
  templateUrl: './container.modal.shared.component.html',
  styleUrls: ['./container.modal.shared.component.scss']
})
/**
 * @classdesc Gère les composants de boite modale
 */
export class ContainerModalSharedComponent implements AfterViewInit {
  display: boolean = false

  /**
   * @param changeDetectorRef Détecte les changements de references
   * @param modalSharedService Service de boite modale
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalSharedService: ModalSharedService
  ) { }

  /**
   * Permet d'initialiser une boite modale
   */
  ngAfterViewInit(): void {
    this.modalSharedService.modalClosingEvent.subscribe(() => {
      this.display = false
    })

    this.modalSharedService.modalOpeningEvent.subscribe((modal: ModalSharedInterface) => {
      let component: ComponentRef<ElementModalSharedComponent> = this.targetRef.createComponent(ElementModalSharedComponent)

      component.instance.modal = modal
      component.instance.componentRef = component

      this.changeDetectorRef.detectChanges()

      this.display = true
    })
  }

  @ViewChild('target', { read: ViewContainerRef }) targetRef!: ViewContainerRef
}
