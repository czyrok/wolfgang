import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AvatarSharedComponent } from './avatar/component/avatar.shared.component'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'
import { ChatSharedModule } from './chat/chat.shared.module'

import { LabelSharedComponent } from './label/label.shared.component'

@NgModule({
    declarations: [
        AvatarSharedComponent,
        LabelSharedComponent
    ],
    imports: [
        CommonModule,
        InteractiveSharedModule,
        ChatSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        ChatSharedModule,
        AvatarSharedComponent,
        LabelSharedComponent
    ]
})

export class SharedModule { }
