import { Component, OnInit } from '@angular/core'
import { ReportModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-default',
  templateUrl: './default.report.managing.view.component.html',
  styleUrls: ['./default.report.managing.view.component.scss']
})
export class DefaultReportManagingViewComponent implements OnInit {
  reportList!: Array<ReportModel>

  constructor(
    private socketSharedService: SocketSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    const reportListLink: ReceiverLinkSocketModel<Array<ReportModel>> = await this.socketSharedService.registerReceiver<Array<ReportModel>>('/managing/report', 'list')
    
    reportListLink.subscribe((data: Array<ReportModel>) => {
      this.reportList = data

      reportListLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender<void>('/managing/report', 'list')

    triggerLink.emit()
  }
}
