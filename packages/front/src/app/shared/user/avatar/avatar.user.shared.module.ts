import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ItemSharedModule } from '../../item/item.shared.module'
import { BubbleUserSharedModule } from '../bubble/bubble.user.shared.module'

import { AllAvatarUserSharedComponent } from './all/component/all.avatar.user.shared.component'
import { HeadAvatarUserSharedComponent } from './head/component/head.avatar.user.shared.component'

@NgModule({
    imports: [
        CommonModule,
        ItemSharedModule,
        BubbleUserSharedModule
    ],
    declarations: [
        AllAvatarUserSharedComponent,
        HeadAvatarUserSharedComponent
    ],
    exports: [
        AllAvatarUserSharedComponent,
        HeadAvatarUserSharedComponent
    ]
})
export class AvatarUserSharedModule { }