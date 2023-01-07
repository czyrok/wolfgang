import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ItemSharedModule } from '../../item/item.shared.module'
import { InteractiveSharedModule } from '../../interactive/interactive.shared.module'
import { LabelUserSharedModule } from '../label/label.user.shared.module'

import { UsernameBubbleUserSharedComponent } from './username/component/username.bubble.user.shared.component'

@NgModule({
    imports: [
        CommonModule,
        ItemSharedModule,
        InteractiveSharedModule,
        LabelUserSharedModule
    ],
    declarations: [
        UsernameBubbleUserSharedComponent
    ],
    exports: [
        UsernameBubbleUserSharedComponent
    ]
})
export class BubbleUserSharedModule { }