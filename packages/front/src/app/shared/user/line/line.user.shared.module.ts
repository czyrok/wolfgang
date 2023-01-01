import { NgModule } from '@angular/core'

import { ItemSharedModule } from '../../item/item.shared.module'
import { AvatarUserSharedModule } from '../avatar/avatar.user.shared.module'
import { LabelUserSharedModule } from '../label/label.user.shared.module'

import { ProfileLineUserSharedComponent } from './profile/component/profile.line.user.shared.component'

@NgModule({
    imports: [
        ItemSharedModule,
        AvatarUserSharedModule,
        LabelUserSharedModule
    ],
    declarations: [
        ProfileLineUserSharedComponent
    ],
    exports: [
        ProfileLineUserSharedComponent
    ]
})
export class LineUserSharedModule { }