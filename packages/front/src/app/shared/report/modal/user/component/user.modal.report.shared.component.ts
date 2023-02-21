import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
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
export class UserModalReportSharedComponent {
  form: UntypedFormGroup
  openingSignalSub!: Subscription

  constructor(
    private gameSharedService: GameSharedService,
    private modalSharedService: ModalSharedService,
    private socketSharedService: SocketSharedService
  ) {
    this.form = new FormGroup({
      users: new FormArray([])
    });

    const formArray = this.form.get('users') as FormArray

    if (this.gameSharedService.gameState) {
      this.gameSharedService.gameState.players.forEach(player => {
        formArray.push(new FormGroup({
          name: new FormControl(player),
          checked: new FormControl(false)
        }))
      })
    }
  }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Type de signalement',
        template: this.chooseUserReportTemplateRef
      })
    })
  }

  reportUserOpeningSignal: Subject<void> = new Subject

  callbackOtherReportUser() {
    this.reportUserOpeningSignal.next()

    /* this.modalSharedService.close()
    this.modalSharedService.open(this.tatemplateAutherReportUser.elementRef.nativeElement) */
  }

  /*   @ViewChild('otherUserReportTemplate', { read: TemplateRef }) tatemplateAutherReportUser!: TemplateRef<any> */

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

  async setConcernedUsers(reportUser: BasicUserReportModel): Promise<void> {
    const selectedPlayers = this.form.get('users')?.value.filter((player: any) => player.checked) || []

    for (const player of selectedPlayers) {
      if (!this.gameSharedService.gameState) continue

      for (const user of this.gameSharedService.gameState.players) {
        if (player.name === user.user.username) reportUser.concernedUsers.push(user.user._id)
      }
    }

    const triggerLink: SenderLinkSocketModel<BasicUserReportModel> = await this.socketSharedService.registerSender('/report', 'add')

    triggerLink.emit(reportUser)
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>

  getPlayersList(): Array<PlayerGameModel> | undefined {
    return this.gameSharedService.gameState?.players
  }
}
