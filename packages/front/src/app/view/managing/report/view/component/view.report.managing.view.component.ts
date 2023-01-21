import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReportModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit {
  report!: ReportModel

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
  ) { }

  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (id !== null) {
      const reportLink: ReceiverLinkSocketModel<ReportModel> = await this.socketSharedService.registerReceiver<ReportModel>('/managing/report', 'view')
      
      reportLink.subscribe((data: ReportModel) => {
        this.report = data

        reportLink.unsubscribe()
      })
    
      const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/managing/report', 'view')

      triggerLink.emit(id)
    }
  }
}
