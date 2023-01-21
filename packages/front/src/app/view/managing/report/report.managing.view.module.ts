import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../../page/page.view.module'

import { ViewReportManagingViewGuard } from './view/guard/view.report.managing.view.guard'

import { ReportManagingViewComponent } from './component/report.managing.view.component'
import { DefaultReportManagingViewComponent } from './default/component/default.report.managing.view.component'
import { ViewReportManagingViewComponent } from './view/component/view.report.managing.view.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ReportManagingViewComponent, children: [
          { path: '', component: DefaultReportManagingViewComponent },
          {
            path: 'view', children: [
              { path: ':report_id', component: ViewReportManagingViewComponent },
            ], canActivate: [
              ViewReportManagingViewGuard
            ]
          }
        ]
      }
    ]),
    SharedModule,
    PageViewModule
  ],
  providers: [
    ViewReportManagingViewGuard
  ],
  declarations: [
    ReportManagingViewComponent,
    ViewReportManagingViewComponent,
    DefaultReportManagingViewComponent
  ]
})

export class ReportManagingViewModule { }
