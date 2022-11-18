import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ListInteractiveSharedModule } from './list/list.interactive.shared.module'

import { ButtonInteractiveSharedComponent } from './button/component/button.interactive.shared.component'
import { TextBarInteractiveSharedComponent } from './text-bar/component/text-bar.interactive.shared.component'

@NgModule({
    declarations: [
        ButtonInteractiveSharedComponent,
        TextBarInteractiveSharedComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        ListInteractiveSharedModule
    ],
    exports: [
        ButtonInteractiveSharedComponent,
        ListInteractiveSharedModule,
        TextBarInteractiveSharedComponent
    ]
})

export class InteractiveSharedModule { }
