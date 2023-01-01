import { NgModule } from '@angular/core'

import { AvatarUserSharedModule } from './avatar/avatar.user.shared.module'
import { LabelUserSharedModule } from './label/label.user.shared.module'
import { LineUserSharedModule } from './line/line.user.shared.module'
import { BubbleUserSharedModule } from './bubble/bubble.user.shared.module'

@NgModule({
    imports: [
        AvatarUserSharedModule,
        LabelUserSharedModule,
        LineUserSharedModule,
        BubbleUserSharedModule
    ],
    exports: [
        AvatarUserSharedModule,
        LabelUserSharedModule,
        LineUserSharedModule,
        BubbleUserSharedModule
    ]
})
export class UserSharedModule { }