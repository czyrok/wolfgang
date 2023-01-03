import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { ManagingViewComponent } from './component/managing.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: ManagingViewComponent, children: [
                    { path: '', redirectTo: 'currently', pathMatch: 'full' }
                ]
            }
        ]),
        SharedModule,
        PageViewModule
    ],
    declarations: [
      ManagingViewComponent
    ],
})

export class ManagingViewModule { }
