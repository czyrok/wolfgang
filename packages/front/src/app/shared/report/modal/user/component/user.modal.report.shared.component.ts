import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms'
import { BasicUserReportModel, PlayerGameModel, ReceiverLinkSocketModel, ReportModel, SenderLinkSocketModel, StateGameModel, TypeReportEnum, TypeUserReportEnum, UserModel } from 'common'
import { Subject, Subscription } from 'rxjs'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-shared-report-modal-user',
  templateUrl: './user.modal.report.shared.component.html',
  styleUrls: ['./user.modal.report.shared.component.scss']
})
export class UserModalReportSharedComponent implements OnInit, AfterViewInit {
  form!: UntypedFormGroup

  openingSignalSub!: Subscription

  players: Array<PlayerGameModel> = new Array

  constructor(
    private gameSharedService: GameSharedService,
    private modalSharedService: ModalSharedService,
    private socketSharedService: SocketSharedService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      players: new FormArray([])
    })

    this.updateFormPlayerList()

    this.gameSharedService.onStateChange((state: StateGameModel) => {
      this.players = state.players

      this.updateFormPlayerList()
    })
  }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Signalement de joueur',
        template: this.chooseUserReportTemplateRef
      })
    })
  }

  reportUserOpeningSignal: Subject<Array<string>> = new Subject

  callbackOtherReportUser() {
    this.reportUserOpeningSignal.next(this.getSelectedUsers())
  }

  updateFormPlayerList(): void {
    const playersFormArray: FormArray = this.form.get('players') as FormArray

    this.players.forEach(player => {
      playersFormArray.push(new FormGroup({
        model: new FormControl(player),
        checked: new FormControl(false)
      }))
    })
  }

  async callbackNegativeTacticsReport(): Promise<void> {
    if (!this.gameSharedService.currentGameId) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.NEGATIVE_TACTICS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.setConcernedUsers(reportUser)
  }

  async callbackInapropriateWordsReport(): Promise<void> {
    if (!this.gameSharedService.currentGameId) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.INAPROPRIATE_WORDS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.setConcernedUsers(reportUser)
  }

  async callbackFloodReport(): Promise<void> {
    if (!this.gameSharedService.currentGameId) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.FLOOD, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.setConcernedUsers(reportUser)
  }

  async callbackAdvertisingReport(): Promise<void> {
    if (!this.gameSharedService.currentGameId) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.ADVERTISING, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.setConcernedUsers(reportUser)
  }

  async callbackLinkReport(): Promise<void> {
    if (!this.gameSharedService.currentGameId) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.LINK, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.setConcernedUsers(reportUser)
  }

  getSelectedUsers(): Array<string> {
    const selectedUsersId: Array<string> = new Array

    const playersFormArray: FormArray = this.form.get('players') as FormArray

    for (const value of playersFormArray.value) {
      const player: PlayerGameModel = value.model,
        checked: boolean = value.checked

      if (!player || !checked) continue

      if (checked) selectedUsersId.push(player.user.username)
    }

    return selectedUsersId
  }

  async setConcernedUsers(reportUser: BasicUserReportModel): Promise<void> {
    const selectedUsersId: Array<string> = this.getSelectedUsers()

    reportUser.concernedUsers = selectedUsersId

    const triggerLink: SenderLinkSocketModel<BasicUserReportModel> = await this.socketSharedService.registerSender('/report', 'add')

    triggerLink.emit(reportUser)
  }

  getPlayersList(): Array<PlayerGameModel> | undefined {
    return this.players
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
