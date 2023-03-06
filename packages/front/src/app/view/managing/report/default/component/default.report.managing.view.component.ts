import { Component, OnInit } from '@angular/core'
import { ReportModel, UserModel, TypeReportEnum, LinkNamespaceSocketModel } from 'common'

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
    const listLink: LinkNamespaceSocketModel<void, Array<ReportModel>>
      = await this.socketSharedService.buildLink<void, Array<ReportModel>>('/managing/report', 'list')

    listLink.on((data: Array<ReportModel>) => {
      listLink.destroy()

      this.reportList = data
    })

    listLink.emit()
  }

  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  isBasicUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.BASIC_USER) return true
    return false
  }

  isOtherUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.OTHER_USER) return true
    return false
  }
}
