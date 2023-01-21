import { Component, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core'

import { DisplayAlertSharedService } from '../../service/display.alert.shared.service'

import { ElementDisplayAlertSharedComponent } from '../../element/component/element.display.alert.shared.component'

import { DisplayAlertSharedInterface } from '../../interface/display.alert.shared.interface'

@Component({
  selector: 'app-shared-alert-display-container',
  templateUrl: './container.display.alert.shared.component.html',
  styleUrls: ['./container.display.alert.shared.component.scss']
})
export class ContainerDisplayAlertComponent implements AfterViewInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }

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
