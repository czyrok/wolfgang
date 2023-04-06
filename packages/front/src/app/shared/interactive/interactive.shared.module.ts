import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ButtonInteractiveSharedModule } from './button/button.interactive.shared.module'
import { ListInteractiveSharedModule } from './list/list.interactive.shared.module'

import { TextBarInteractiveSharedComponent } from './text-bar/component/text-bar.interactive.shared.component'

@NgModule({
    declarations: [
        TextBarInteractiveSharedComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ButtonInteractiveSharedModule,
        ListInteractiveSharedModule
    ],
    exports: [
        ButtonInteractiveSharedModule,
        ListInteractiveSharedModule,
        TextBarInteractiveSharedComponent
    ]
})
export class InteractiveSharedModule { }