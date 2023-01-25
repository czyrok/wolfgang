import { Component } from '@angular/core'

import { ReportModel, UserModel } from 'common'
import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'

@Component({
  selector: 'app-view-managing-report-default',
  templateUrl: './default.report.managing.view.component.html',
  styleUrls: ['./default.report.managing.view.component.scss']
})
export class DefaultReportManagingViewComponent {
  reportList!: Array<ReportModel>

  reportLink: ReceiverEventSocketModel<Array<ReportModel>> = this.eventSocketLink.registerReceiver<Array<ReportModel>>('/managing/report', 'list').subscribe({
    callback: (data: Array<ReportModel>) => {
      this.reportList = data
    }
  })

  constructor(
    private eventSocketLink: EventSocketService
  ) { }

  getUserId(user: UserModel | string): string {
    if (user instanceof UserModel) return user.getId() || 'ntm'

    return 'ntm'
  }
}
