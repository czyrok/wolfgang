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
/**
 * Gère les boites modales de signalements d'un utilisateur
 */
export class UserModalReportSharedComponent implements OnInit, AfterViewInit {
  form!: UntypedFormGroup

  openingSignalSub!: Subscription

  players: Array<PlayerGameModel> = new Array

  reportUserOpeningSignal: Subject<Array<string>> = new Subject

  /**
   * @param modalSharedService Service de boite modale
   */
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

  /**
   * Effectue la souscription du signal d'ouverture de la boite modale
   */
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

  /**
   * Permet de créer une fonction validation pour vérifier le nombre de case à cocher cochées
   * @param minCheckedRequired Le nombre minimum de cases à cocher cochées
   * @returns Fonction de validation
   */
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

  /**
   * Met à jour la liste des joueurs dans le formulaire
   */
  updateFormPlayerList(): void {
    const playersFormArray: FormArray = this.form.get('players') as FormArray

    playersFormArray.clear()

    for (const player of this.players) {
      playersFormArray.push(new FormGroup({
        checked: new FormControl(false)
      }))
    }
  }

  /**
   * Crée le modèle du signalement pour anti-jeu avec les données du formulaire
   */
  negativeTacticsUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.NEGATIVE_TACTICS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  /**
   * Crée le modèle du signalement pour mots inappropriés avec les données du formulaire
   */
  inapropriateWordsUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.INAPROPRIATE_WORDS, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  /**
   * Crée le modèle du signalement pour spam avec les données du formulaire
   */
  floodUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.FLOOD, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  /**
   * Crée le modèle du signalement pour publicité avec les données du formulaire
   */
  advertisingUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.ADVERTISING, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  /**
   * Crée le modèle du signalement pour mention de liens avec les données du formulaire
   */
  linkUserReportButtonCallback(): void {
    if (!this.gameSharedService.currentGameId) return
    if (!this.form.valid) return

    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.LINK, TypeReportEnum.BASIC_USER, this.gameSharedService.currentGameId)

    this.sendReport(reportUser)
  }

  /**
   * Ouvrir la boite modale pour renseigner un signalement d'un autre type en envoyant les données du formulaire
   */
  otherUserReportButtonCallback() {
    if (!this.form.valid) return

    this.reportUserOpeningSignal.next(this.getSelectedUsers())
  }

  /**
   * Ferme la boite modale
   */
  closeModalButtonCallback(): void {
    this.modalSharedService.close()
  }

  /**
   * Ajoute les données du formulaire au signalement et envoie le signalement
   */
  async sendReport(reportUser: BasicUserReportModel): Promise<void> {
    const selectedUsersUsername: Array<string> = this.getSelectedUsers()

    reportUser.concernedUsers = selectedUsersUsername

    console.log(selectedUsersUsername)

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

  /**
   * Permet de récupérer les utilisateurs sélectionnés du formulaire
   * @returns La liste des pseudos des utilisateurs sélectionnés
   */
  getSelectedUsers(): Array<string> {
    const selectedUsersUsername: Array<string> = new Array

    const playersFormArray: FormArray = this.form.get('players') as FormArray

    for (let i = 0; i < playersFormArray.value.length; i++) {
      const player: PlayerGameModel = this.players[i],
        checked: boolean = playersFormArray.value[i]?.checked

      if (!player || !checked) continue

      if (checked) selectedUsersUsername.push(player.user.username)
    }

    return selectedUsersUsername
  }

  /**
   * Permet de récupérer la liste des joueurs dans la partie
   * @returns La liste des joueurs
   */
  getPlayersList(): Array<PlayerGameModel> | undefined {
    return this.players
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
