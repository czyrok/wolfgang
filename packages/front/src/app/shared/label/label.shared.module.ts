import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LabelSharedComponent } from './component/label.shared.component'

@NgModule({
    declarations: [
        LabelSharedComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LabelSharedComponent
    ]
})
export class LabelSharedModule { }