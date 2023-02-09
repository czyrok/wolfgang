import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReportModel, ReceiverLinkSocketModel, SenderLinkSocketModel, UserReportModel, UserModel, OtherUserReportModel, TypeReportEnum, BugReportModel, BasicUserReportModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit {
  bugReport?: BugReportModel
  basicReport?: BasicUserReportModel
  otherReport?: OtherUserReportModel
  user!: UserModel
  concernedUsers!: Array<UserModel>

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
  ) { }

  async ngOnInit(): Promise<void> {
    let id: string | null = this.activatedRoute.snapshot.paramMap.get('id')

    if (id !== null) {
      const reportLink: ReceiverLinkSocketModel<ReportModel> = await this.socketSharedService.registerReceiver('/managing/report', 'view')

      reportLink.subscribe((data: ReportModel) => {
        switch (data.type) {
          case TypeReportEnum.BASIC_USER:
            this.basicReport = data as BasicUserReportModel
            this.user = this.basicReport.user.valueOf() as UserModel
            this.concernedUsers = this.basicReport.concernedUsers as Array<UserModel>
            break
          case TypeReportEnum.BUG:
            this.bugReport = data as BugReportModel
            this.user = this.bugReport.user.valueOf() as UserModel
            break
          case TypeReportEnum.OTHER_USER:
            this.otherReport = data as OtherUserReportModel
            this.user = this.otherReport.user.valueOf() as UserModel
            this.concernedUsers = this.otherReport.concernedUsers as Array<UserModel>
            break
        }

        reportLink.unsubscribe()
      })

      const triggerLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/managing/report', 'view')
      triggerLink.emit(id)
    }
  }

  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
}
