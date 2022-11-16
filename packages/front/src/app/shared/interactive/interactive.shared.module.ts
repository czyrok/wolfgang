import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

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
        FormsModule
    ],
    exports: [
        ButtonInteractiveShared,
        SearchBarInteractiveShared
    ]
})

export class InteractiveSharedModule { }
