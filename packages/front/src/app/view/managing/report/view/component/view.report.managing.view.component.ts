import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReportModel, UserModel, OtherUserReportModel, TypeReportEnum, BugReportModel, BasicUserReportModel, LinkNamespaceSocketModel, MessageChatGameModel, TypeMessageChatGameEnum, UserMessageChatGameModel, EventMessageChatGameModel, TypeUserReportEnum, TypeAlertEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit, AfterViewInit {
  user!: UserModel

  bugReport?: BugReportModel
  basicReport?: BasicUserReportModel
  otherReport?: OtherUserReportModel

  concernedUsers!: Array<UserModel>

  playerMessageEvent: EventEmitter<UserMessageChatGameModel> = new EventEmitter
  eventMessageEvent: EventEmitter<EventMessageChatGameModel> = new EventEmitter

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketSharedService: SocketSharedService,
    private router: Router,
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

  async ngAfterViewInit(): Promise<void> {
    await this.loadChatEvent()
  }

  async loadChatEvent(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const getChatLink: LinkNamespaceSocketModel<string, Array<MessageChatGameModel>> = await this.socketSharedService.buildLink('/managing/report', 'getChat')

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

    getChatLink.emit(id)
  }

  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  async cancel(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const deleteLink: LinkNamespaceSocketModel<string, void> = await this.socketSharedService.buildLink('/managing/report', 'delete')

    deleteLink.emit(id)

    this.router.navigateByUrl('/managing/report')
  }

  async update(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const updateLink: LinkNamespaceSocketModel<string, void> = await this.socketSharedService.buildLink('/managing/report', 'update')

    updateLink.emit(id)

    this.router.navigateByUrl('/managing/report')
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