import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'
import { ChatSharedModule } from './chat/chat.shared.module'

import { LabelShared } from './label/label.shared.component'

@NgModule({
    declarations: [
        LabelShared
    ],
    imports: [
        CommonModule,
        InteractiveSharedModule,
        ChatSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        ChatSharedModule,
        LabelShared
    ]
})

export class SharedModule { }
