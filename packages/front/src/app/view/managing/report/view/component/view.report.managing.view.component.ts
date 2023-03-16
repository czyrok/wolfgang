import { Component, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReportModel, UserModel, OtherUserReportModel, TypeReportEnum, BugReportModel, BasicUserReportModel, LinkNamespaceSocketModel, MessageChatGameModel, TypeMessageChatGameEnum, UserMessageChatGameModel, EventMessageChatGameModel, TypeUserReportEnum, TypeAlertEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
/**
 * Component qui gère la vue d'un signalement
 */
export class ViewReportManagingViewComponent implements OnInit {
  user!: UserModel

  bugReport?: BugReportModel
  basicReport?: BasicUserReportModel
  otherReport?: OtherUserReportModel

  concernedUsers!: Array<UserModel>

  playerMessageEvent: EventEmitter<UserMessageChatGameModel> = new EventEmitter
  eventMessageEvent: EventEmitter<EventMessageChatGameModel> = new EventEmitter

  /**
   * @param router Correspond router d'angular
   * @param activatedRoute Correspond à la route actuelle
   * @param socketSharedService Service qui permet d'utiliser des sockets
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }

  /**
   * Récupère les informations du signalement pour pouvoir les afficher dans la page
   */
  async ngOnInit(): Promise<void> {
    const reportId: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!reportId) return

    await this.loadView(reportId)
    await this.loadChatEvent(reportId)
  }

  async loadView(reportId: string): Promise<void> {
    const viewLink: LinkNamespaceSocketModel<void, ReportModel>
      = await this.socketSharedService.buildLink<void, ReportModel>('/managing/report/view/' + reportId, 'view')

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

    viewLink.onFail((error: any) => {
      viewLink.destroy()

      this.displayAlertSharedService.emitDanger(error)
    })

    viewLink.emit()
  }

  async loadChatEvent(reportId: string): Promise<void> {
    const getChatLink: LinkNamespaceSocketModel<void, Array<MessageChatGameModel>> = await this.socketSharedService.buildLink('/managing/report/view/' + reportId, 'getChat')

    getChatLink.on((messages: Array<MessageChatGameModel>) => {
      getChatLink.destroy()

      for (const message of messages) {
        switch (message.type) {
          case TypeMessageChatGameEnum.EVENT:
            this.eventMessageEvent.emit(message as EventMessageChatGameModel)

            break
          case TypeMessageChatGameEnum.USER:
            this.playerMessageEvent.emit(message as UserMessageChatGameModel)

            break
        }
      }
    })

    getChatLink.onFail(() => {
      getChatLink.destroy()
    })

    getChatLink.emit()
  }

  async deleteButtonCallback(): Promise<void> {
    const reportId: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!reportId) return

    const deleteLink: LinkNamespaceSocketModel<void, void> = await this.socketSharedService.buildLink('/managing/report/view/' + reportId, 'delete')

    deleteLink.on(() => {
      deleteLink.destroy()

      this.displayAlertSharedService.emitSuccess('Le signalement a bien été supprimé')
    })

    deleteLink.onFail((error: any) => {
      deleteLink.destroy()

      this.displayAlertSharedService.emitDanger(error)
    })

    deleteLink.emit()

    this.router.navigateByUrl('/managing/report')
  }

  async punishButtonCallback(): Promise<void> {
    const reportId: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!reportId) return

    const punishLink: LinkNamespaceSocketModel<void, void> = await this.socketSharedService.buildLink('/managing/report/view/' + reportId, 'punish')

    punishLink.on(() => {
      punishLink.destroy()

      this.displayAlertSharedService.emitSuccess('Les joueurs ont bien été punis')
    })

    punishLink.onFail((error: any) => {
      punishLink.destroy()

      this.displayAlertSharedService.emitDanger(error)
    })

    punishLink.emit()

    this.router.navigateByUrl('/managing/report')
  }

  /**
   * Permet de récupérer la date locale du signalement
   * @param report Le signalement
   * @returns La date
   */
  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  /**
   * Permet de supprimer le signalement
   */
  async cancel(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const deleteLink: LinkNamespaceSocketModel<string, void> = await this.socketSharedService.buildLink('/managing/report', 'delete')

    deleteLink.emit(id)

    this.router.navigateByUrl('/managing/report')
  }

  /**
   * Permet de punir les utilisateurs concernés par le signalement
   */
  async update(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const updateLink: LinkNamespaceSocketModel<string, void> = await this.socketSharedService.buildLink('/managing/report', 'update')

    updateLink.emit(id)

    this.router.navigateByUrl('/managing/report')
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