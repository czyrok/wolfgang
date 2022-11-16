import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'

import { LabelShared } from './label/label.shared.component'

@NgModule({
    declarations: [
        LabelShared
    ],
    imports: [
        CommonModule,
        InteractiveSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        LabelShared
    ]
})

export class SharedModule { }