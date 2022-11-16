import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ListInteractiveSharedModule } from './list/list.interactive.shared.module'

import { ButtonInteractiveShared } from './button/component/button.interactive.shared.component'

@NgModule({
    declarations: [
        ButtonInteractiveShared
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        ListInteractiveSharedModule
    ],
    exports: [
        ButtonInteractiveShared,
        ListInteractiveSharedModule
    ]
})

export class InteractiveSharedModule { }