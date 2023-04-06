import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ContainerDisplayAlertComponent } from './container/component/container.display.alert.shared.component'
import { ElementDisplayAlertSharedComponent } from './element/component/element.display.alert.shared.component'

@NgModule({
  declarations: [
    ContainerDisplayAlertComponent,
    ElementDisplayAlertSharedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerDisplayAlertComponent,
    ElementDisplayAlertSharedComponent
  ]
})
export class DisplayAlertSharedModule { }
