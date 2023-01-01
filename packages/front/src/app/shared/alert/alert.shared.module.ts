import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { DisplayAlertSharedModule } from './display/display.alert.shared.module'

import { TextAlertSharedComponent } from './text/component/text.alert.shared.component'

@NgModule({
  declarations: [
    TextAlertSharedComponent,
  ],
  imports: [
    CommonModule,
    DisplayAlertSharedModule
  ],
  exports: [
    DisplayAlertSharedModule,
    TextAlertSharedComponent
  ]
})
export class AlertSharedModule { }