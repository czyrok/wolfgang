import { Component, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core'

import { AlertService } from '../service/alert.service'

import { ElementAlertComponent } from '../element/component/element.alert.component'

import { AlertInterface } from '../interface/alert.interface'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [AlertService]
})
export class AlertComponent implements AfterViewInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService
  ) { }

  ngAfterViewInit(): void {
    this.alertService.alertEvent.subscribe((alert: AlertInterface) => {
      let component: ComponentRef<ElementAlertComponent> = this.targetRef.createComponent(ElementAlertComponent)

      component.instance.alert = alert

      this.changeDetectorRef.detectChanges()
    })
  }

  @ViewChild('target', { read: ViewContainerRef }) targetRef!: ViewContainerRef
}
