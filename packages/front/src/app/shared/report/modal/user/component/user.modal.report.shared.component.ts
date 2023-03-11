import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormArray, FormControl, FormGroup, UntypedFormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { BasicUserReportModel, PlayerGameModel, LinkNamespaceSocketModel, StateGameModel, TypeReportEnum, TypeUserReportEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-shared-report-modal-user',
  templateUrl: './user.modal.report.shared.component.html',
  styleUrls: ['./user.modal.report.shared.component.scss']
})
export class UserModalReportSharedComponent implements OnInit, AfterViewInit {
  form!: UntypedFormGroup

  openingSignalSub!: Subscription

  players: Array<PlayerGameModel> = new Array

  reportUserOpeningSignal: Subject<Array<string>> = new Subject

  constructor(
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService,
    private modalSharedService: ModalSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      players: new FormArray([], [Validators.required, this.requireCheckboxesToBeCheckedValidator()])
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

      this.form.reset()

      this.modalSharedService.open({
        title: 'Signalement de joueur',
        template: this.chooseUserReportTemplateRef
      })
    })
  }

  requireCheckboxesToBeCheckedValidator(minCheckedRequired = 1): ValidatorFn {
    return function validate(formGroup: AbstractControl) {
      let checkedCount: number = 0;

      if (formGroup instanceof FormArray) {
        for (const control of formGroup.value) {
          if (control.checked) checkedCount++;
        }

        if (checkedCount < minCheckedRequired) {
          return {
            requireOneCheckboxToBeChecked: true
          }
        }
      }

      return null
    }
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

  negativeTacticsUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.NEGATIVE_TACTICS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  inapropriateWordsUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.INAPROPRIATE_WORDS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  floodUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.FLOOD, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  advertisingUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.ADVERTISING, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  linkUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.LINK, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  otherUserReportButtonCallback() {
    if (!this.form.valid) return

    this.reportUserOpeningSignal.next(this.getSelectedUsers())
  }

  closeModalButtonCallback(): void {
    this.modalSharedService.close()
  }

  async sendReport(reportUser: BasicUserReportModel): Promise<void> {
    const selectedUsersId: Array<string> = this.getSelectedUsers()

    reportUser.concernedUsers = selectedUsersId

    const addLink: LinkNamespaceSocketModel<BasicUserReportModel, void> = await this.socketSharedService.buildLink('/report', 'add')

    addLink.on(() => {
      addLink.destroy()

      this.displayAlertSharedService.emitSuccess('Votre signalement a bien été enregistré')

      this.modalSharedService.close()
    })

    addLink.onFail((error: any) => {
      addLink.destroy()

      this.displayAlertSharedService.emitDanger(error)

      this.modalSharedService.close()
    })

    addLink.emit(reportUser)
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

  getPlayersList(): Array<PlayerGameModel> | undefined {
    return this.players
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
