import { Component, OnInit } from '@angular/core'
import { ReportModel, ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel, TypeReportEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-default',
  templateUrl: './default.report.managing.view.component.html',
  styleUrls: ['./default.report.managing.view.component.scss']
})
/**
 * @classdesc Component qui gère la liste des signalements qui n'ont pas encore été validé ou refusé par un administarteur
 */
export class DefaultReportManagingViewComponent implements OnInit {
  reportList!: Array<ReportModel>
/**
 * 
 * @param socketSharedService Service qui permet d'utiliser des sockets
 */
  constructor(
    private socketSharedService: SocketSharedService
  ) { }
  
  /**
   * Récupère la liste des signalements qui n'ont pas été validé ou refusé par un administarteur
   */
  async ngOnInit(): Promise<void> {
    const reportListLink: ReceiverLinkSocketModel<Array<ReportModel>> = await this.socketSharedService.registerReceiver<Array<ReportModel>>('/managing/report', 'list')

    reportListLink.subscribe((data: Array<ReportModel>) => {
      this.reportList = data

      reportListLink.unsubscribe()
    })

    const triggerLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender<void>('/managing/report', 'list')

    triggerLink.emit()
  }

  /**
   * 
   * @param report le reporte
   * @returns la date sous format jj/mm/aaaa + heure
   */
  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  /**
   * 
   * @param report le report
   * @returns true si le reporte est de type BasicUserReport, false sinon
   */
  isBasicUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.BASIC_USER) return true
    return false
  }

  /**
   * 
   * @param report le reporte
   * @returns true si le reporte est de type OtherUserReport, false sinon
   */
  isOtherUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.OTHER_USER) return true
    return false
  }
}
