import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'


import { ModalReportSharedComponent } from './modal/component/modal.report.shared.component'

import { BugModalReportSharedComponent } from './modal/bug/component/bug.modal.report.shared.component'


import { ModalSharedModule } from '../modal/modal.shared.module'
import { ButtonInteractiveSharedModule } from '../interactive/button/button.interactive.shared.module'
import { UserModalReportSharedComponent } from './modal/user/component/user.modal.report.shared.component'
import { OtherUserModalReportSharedComponent } from './modal/user/other/component/other.user.modal.report.shared.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalSharedModule,
    ButtonInteractiveSharedModule
  ], declarations: [
    ModalReportSharedComponent,
    BugModalReportSharedComponent,
    UserModalReportSharedComponent,
    OtherUserModalReportSharedComponent
  ], exports: [
    ModalReportSharedComponent,
    BugModalReportSharedComponent,
    UserModalReportSharedComponent,
    OtherUserModalReportSharedComponent
  ]
})

export class ReportSharedModule { }
