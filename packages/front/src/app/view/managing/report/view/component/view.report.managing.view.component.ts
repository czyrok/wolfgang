import { Component, EventEmitter, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'

import { ReportModel } from 'common'
import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'
import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit {
  report!: ReportModel
  
  reportLink: ReceiverEventSocketModel<ReportModel> = this.eventSocketLink.registerReceiver<ReportModel>('/managing/report', 'view').subscribe({
    callback: (data: ReportModel) => {
      this.report = data
    }
  })

  idLink: SenderEventSocketModel<string> = this.eventSocketLink.registerSender<string>('/managing/report', 'view')

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventSocketLink: EventSocketService
  ) { }

  ngOnInit(): void {
    let id: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (id !== null) {
      this.idLink.emit(id)
    }
  }
}
