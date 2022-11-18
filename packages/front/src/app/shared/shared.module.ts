import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'

import { LabelSharedComponent } from './label/label.shared.component'

@NgModule({
    declarations: [
        LabelSharedComponent
    ],
    imports: [
        CommonModule,
        InteractiveSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        LabelSharedComponent
    ]
})

export class SharedModule { }