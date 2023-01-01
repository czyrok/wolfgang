import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { FormItemSharedComponent } from './form/component/form.item.shared.component'
import { LineItemSharedComponent } from './line/component/line.item.shared.component'
import { BubbleItemSharedComponent } from './bubble/component/bubble.item.shared.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        FormItemSharedComponent,
        LineItemSharedComponent,
        BubbleItemSharedComponent
    ],
    exports: [
        FormItemSharedComponent,
        LineItemSharedComponent,
        BubbleItemSharedComponent
    ]
})
export class ItemSharedModule { }