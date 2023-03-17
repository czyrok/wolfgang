import { Component, OnInit } from '@angular/core'
import { ReportModel, TypeReportEnum, LinkNamespaceSocketModel, TypeUserReportEnum, TypeAlertEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-default',
  templateUrl: './default.report.managing.view.component.html',
  styleUrls: ['./default.report.managing.view.component.scss']
})
/**
 * Component qui gère la liste des signalements qui n'ont pas encore été validé ou refusé par un administarteur
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
   * Récupère la liste des signalements qui n'ont pas été validé ou refusé par un administrateur
   */
  async ngOnInit(): Promise<void> {
    const listLink: LinkNamespaceSocketModel<void, Array<ReportModel>>
      = await this.socketSharedService.buildLink<void, Array<ReportModel>>('/managing/report', 'list')

    listLink.on((data: Array<ReportModel>) => {
      listLink.destroy()

      this.reportList = data
    })

    listLink.emit()
  }

  /**
   * Renvoie la date locale à laquelle le signalement a été fait
   * @param report Le signalement
   * @returns La date
   */
  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  /**
   * Permet de savoir si c'est un signalement d'utilisateur classique
   * @param report Le signalement
   * @returns Vrai si c'est le cas, faux sinon
   */
  isBasicUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.BASIC_USER) return true
    return false
  }

  /**
   * Permet de savoir si c'est un signalement d'utilisateur pas classique
   * @param report Le signalement
   * @returns Vrai si c'est le cas, faux sinon
   */
  isOtherUserReport(report: ReportModel): boolean {
    if (report.type === TypeReportEnum.OTHER_USER) return true
    return false
  }

  /**
   * Permet de récupérer le nom du signalement en fonction de son type
   * @param report Le type de signalement
   * @returns Le nom du signalement
   */
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

  /**
   * Permet de récupérer le type d'alerte du nom du signalement en fonction de son type
   * @param report Le type de signalement
   * @returns Le type d'alerte
   */
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

  /**
   * Permet de récupérer le nom du signalement en fonction du type de signalement utilisateur
   * @param report Le type de signalement utilisateur
   * @returns Le nom du signalement
   */
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

  /**
   * Permet de récupérer le type d'alerte du nom du signalement en fonction du type de signalement utilisateur
   * @param report Le type de signalement utilisateur
   * @returns Le type d'alerte
   */
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
