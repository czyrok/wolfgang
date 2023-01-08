import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ButtonInteractiveSharedModule } from './button/button.interactive.shared.component'
import { ListInteractiveSharedModule } from './list/list.interactive.shared.module'
import { ListDetailedInteractiveSharedModule } from './list-detailed/list-detailed.interactive.shared.module'

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
        ListInteractiveSharedModule,
        ListDetailedInteractiveSharedModule
    ],
    exports: [
        ButtonInteractiveSharedModule,
        ListInteractiveSharedModule,
        ListDetailedInteractiveSharedModule,
        TextBarInteractiveSharedComponent
    ]
})
export class InteractiveSharedModule { }