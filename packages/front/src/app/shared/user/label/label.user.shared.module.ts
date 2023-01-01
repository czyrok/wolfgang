import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LabelSharedModule } from '../../label/label.shared.module'

import { LevelLabelUserSharedComponent } from './level/component/level.label.user.shared.component'
import { PointLabelUserSharedComponent } from './point/component/point.label.user.shared.component'

@NgModule({
    imports: [
        CommonModule,
        LabelSharedModule
    ],
    declarations: [
        LevelLabelUserSharedComponent,
        PointLabelUserSharedComponent
    ],
    exports: [
        LevelLabelUserSharedComponent,
        PointLabelUserSharedComponent
    ]
})
export class LabelUserSharedModule { }