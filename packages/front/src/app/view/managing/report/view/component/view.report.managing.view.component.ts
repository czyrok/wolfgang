import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReportModel, ReceiverLinkSocketModel, SenderLinkSocketModel, UserModel, OtherUserReportModel, TypeReportEnum, BugReportModel, BasicUserReportModel, MessageChatGameModel, TypeMessageChatGameEnum, UserMessageChatGameModel, EventMessageChatGameModel, TypeUserReportEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-managing-report-view',
  templateUrl: './view.report.managing.view.component.html',
  styleUrls: ['./view.report.managing.view.component.scss']
})
export class ViewReportManagingViewComponent implements OnInit, AfterViewInit {
  bugReport?: BugReportModel
  basicReport?: BasicUserReportModel
  otherReport?: OtherUserReportModel
  user!: UserModel
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

  async ngAfterViewInit(): Promise<void> {
    await this.loadChatEvent()
  }

  async loadChatEvent(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const chatReceiverLink: ReceiverLinkSocketModel<Array<MessageChatGameModel>> = await this.socketSharedService.registerReceiver('/managing/report', 'getChat'),
      chatSenderLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender('/managing/report', 'getChat')

    chatReceiverLink.subscribe((messages: Array<MessageChatGameModel>) => {
      console.log(messages)
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

    chatSenderLink.emit(id)
  }

  getDate(report: ReportModel): string {
    const date: Date = new Date(report.releaseDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  async cancel(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const reportSenderLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender('/managing/report', 'delete')
    reportSenderLink.emit(id)

    this.router.navigateByUrl('/managing/report')
  }

  async update(): Promise<void> {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('report_id')

    if (!id) return

    const reportSenderLink: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender('/managing/report', 'update')
    reportSenderLink.emit(id)
    
    this.router.navigateByUrl('/managing/report')
  }

  getType(type: TypeReportEnum): string {
    switch (type) {
      case TypeReportEnum.BASIC_USER:
        return 'Utilisateur'

        break
      case TypeReportEnum.BUG:
        return 'Bug'

        break
      case TypeReportEnum.OTHER_USER:
        return 'Utilisateur'

        break
    }
  }
  getUserReportType(type: TypeUserReportEnum): string {
    switch (type) {
      case TypeUserReportEnum.ADVERTISING:
        return 'Publicité'

        break
      case TypeUserReportEnum.FLOOD:
        return 'Spam'

        break
      case TypeUserReportEnum.INAPROPRIATE_WORDS:
        return 'Language grossié'

        break
      case TypeUserReportEnum.LINK:
        return 'Lien'

        break
      case TypeUserReportEnum.NEGATIVE_TACTICS:
        return 'Joue contre son camp'

        break
    }
  }
}
