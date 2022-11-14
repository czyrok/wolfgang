import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ButtonInteractiveShared } from './button/component/button.interactive.shared.component'

@NgModule({
    declarations: [
        ButtonInteractiveShared
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    exports: [
        ButtonInteractiveShared
    ]
})

export class InteractiveSharedModule { }