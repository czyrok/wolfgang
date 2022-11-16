import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ListInteractiveSharedModule } from './list/list.interactive.shared.module'

import { ButtonInteractiveShared } from './button/component/button.interactive.shared.component'
import { SearchBarInteractiveShared } from './search-bar/component/search-bar.interactive.shared.component'

@NgModule({
    declarations: [
        ButtonInteractiveShared,
        SearchBarInteractiveShared
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        ListInteractiveSharedModule
    ],
    exports: [
        ButtonInteractiveShared,
        ListInteractiveSharedModule,
        SearchBarInteractiveShared
    ]
})

export class InteractiveSharedModule { }
