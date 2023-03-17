import { Component, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core'

import { DisplayAlertSharedService } from '../../service/display.alert.shared.service'

import { ElementDisplayAlertSharedComponent } from '../../element/component/element.display.alert.shared.component'

import { DisplayAlertSharedInterface } from '../../interface/display.alert.shared.interface'

@Component({
  selector: 'app-shared-alert-display-container',
  templateUrl: './container.display.alert.shared.component.html',
  styleUrls: ['./container.display.alert.shared.component.scss']
})
/**
 * Composant correspond à la boite qui contiendra les alertes créées
 * @implements AfterViewInit
 */
export class ContainerDisplayAlertComponent implements AfterViewInit {
  /**
   * @param changeDetectorRef Service de détection de changement d'Angular
   * @param displayAlertSharedService Service d'affichage des alertes
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }
  /**
   * Souscription à l'évènement des alertes pour créer le composant de l'alerte correspondant
   */
  ngAfterViewInit(): void {
    this.displayAlertSharedService.alertEvent.subscribe((alert: DisplayAlertSharedInterface) => {
      let component: ComponentRef<ElementDisplayAlertSharedComponent> = this.targetRef.createComponent(ElementDisplayAlertSharedComponent)

      component.instance.alert = alert
      component.instance.componentRef = component

      alert.componentRef = component

      this.changeDetectorRef.detectChanges()
    })
  }

  @ViewChild('target', { read: ViewContainerRef }) targetRef!: ViewContainerRef
}
