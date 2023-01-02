import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'
import { ChatSharedModule } from './chat/chat.shared.module'
import { ItemSharedModule } from './item/item.shared.module'
import { AlertSharedModule } from './alert/alert.shared.module'
import { UserSharedModule } from './user/user.shared.module'
import { LabelSharedModule } from './label/label.shared.module'

@NgModule({
    imports: [
        CommonModule,
        InteractiveSharedModule,
        ChatSharedModule,
        ItemSharedModule,
        AlertSharedModule,
        UserSharedModule,
        LabelSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        ChatSharedModule,
        ItemSharedModule,
        AlertSharedModule,
        UserSharedModule,
        LabelSharedModule
    ]
})
export class SharedModule { }