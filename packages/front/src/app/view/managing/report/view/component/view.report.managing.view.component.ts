import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReportModel, UserModel, OtherUserReportModel, TypeReportEnum, BugReportModel, BasicUserReportModel, LinkNamespaceSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit {
  user!: UserModel

  bugReport?: BugReportModel
  basicReport?: BasicUserReportModel
  otherReport?: OtherUserReportModel

  concernedUsers!: Array<UserModel>

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
  ) { }

  async ngOnInit(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const viewLink: LinkNamespaceSocketModel<string, ReportModel>
      = await this.socketSharedService.buildLink<string, ReportModel>('/managing/report', 'view')

    viewLink.on((data: ReportModel) => {
      viewLink.destroy()

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
    })

    viewLink.emit(id)
  }

  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
}
