import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { FormPageViewComponent } from './form/component/form.page.view.component'
import { ScrollPageViewComponent } from './scroll/component/scroll.page.view.component'
import { BlockPageViewComponent } from './block/component/block.page.view.component'
import { CustomPageViewComponent } from './custom/component/custom.page.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        ScrollPageViewComponent,
        FormPageViewComponent,
        BlockPageViewComponent,
        CustomPageViewComponent
    ],
    exports: [
        ScrollPageViewComponent,
        FormPageViewComponent,
        BlockPageViewComponent,
        CustomPageViewComponent
    ]
})
export class PageViewModule { }