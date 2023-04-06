import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DisplayAlertSharedModule } from './display/display.alert.shared.module'

import { TextAlertSharedComponent } from './text/component/text.alert.shared.component'

@NgModule({
  imports: [
    CommonModule,
    DisplayAlertSharedModule
  ],
  declarations: [
    TextAlertSharedComponent,
  ],
  exports: [
    DisplayAlertSharedModule,
    TextAlertSharedComponent
  ]
})
export class AlertSharedModule { }