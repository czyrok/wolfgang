import { Component, OnInit } from '@angular/core'
import { ReportModel, TypeReportEnum, LinkNamespaceSocketModel, TypeUserReportEnum, TypeAlertEnum } from 'common'

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

  getReportName(type: TypeReportEnum): string {
    switch (type) {
      case TypeReportEnum.BUG:
        return 'Bug'
      case TypeReportEnum.BASIC_USER:
        return 'Utilisateur'
      case TypeReportEnum.OTHER_USER:
        return 'Utilisateur'
    }
  }

  getReportTextAlertType(type: TypeReportEnum): TypeAlertEnum {
    switch (type) {
      case TypeReportEnum.BUG:
        return TypeAlertEnum.WARNING
      case TypeReportEnum.BASIC_USER:
        return TypeAlertEnum.DANGER
      case TypeReportEnum.OTHER_USER:
        return TypeAlertEnum.DANGER
    }
  }

  getUserReportName(type: TypeUserReportEnum): string {
    switch (type) {
      case TypeUserReportEnum.ADVERTISING:
        return 'Publicité'
      case TypeUserReportEnum.FLOOD:
        return 'Spam'
      case TypeUserReportEnum.INAPROPRIATE_WORDS:
        return 'Language inapproprié'
      case TypeUserReportEnum.LINK:
        return 'Partage de liens'
      case TypeUserReportEnum.NEGATIVE_TACTICS:
        return 'Anti-jeu'
    }
  }

  getUserReportTextAlertType(type: TypeUserReportEnum): TypeAlertEnum {
    switch (type) {
      case TypeUserReportEnum.ADVERTISING:
        return TypeAlertEnum.INFORM
      case TypeUserReportEnum.FLOOD:
        return TypeAlertEnum.DANGER
      case TypeUserReportEnum.INAPROPRIATE_WORDS:
        return TypeAlertEnum.DANGER
      case TypeUserReportEnum.LINK:
        return TypeAlertEnum.INFORM
      case TypeUserReportEnum.NEGATIVE_TACTICS:
        return TypeAlertEnum.WARNING
    }
  }
}
