import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { OtherUserReportModel, LinkNamespaceSocketModel, TypeReportEnum} from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-shared-report-modal-user-other',
  templateUrl: './other.user.modal.report.shared.component.html',
  styleUrls: ['./other.user.modal.report.shared.component.scss']
})
export class OtherUserModalReportSharedComponent {
  form: UntypedFormGroup

  selectedUsersId!: Array<string>

  openingSignalSub!: Subscription

  constructor(
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService,
    private modalSharedService: ModalSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required, Validators.minLength(10)]],
    })
  }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe((selectedUsersId: Array<string>) => {
      this.selectedUsersId = selectedUsersId

      this.modalSharedService.close()

      this.form.get('description')?.setValue('')

      this.modalSharedService.open({
        title: 'Signalement de joueur',
        template: this.otherUserReportTemplateRef
      })
    })
  }

  closeReport(): void{
    this.modalSharedService.close()
  }

  async callbackUserForm(): Promise<void> {
    if (this.form.valid) {
      if(!this.gameSharedService.gameId) throw new Error

      const reportUser: OtherUserReportModel = new OtherUserReportModel(this.form.get('description')?.value, TypeReportEnum.OTHER_USER, this.gameSharedService.gameId)

      reportUser.concernedUsers = this.selectedUsersId
    
      const addLink: LinkNamespaceSocketModel<OtherUserReportModel, void> = await this.socketSharedService.buildLink('/report', 'add')

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
  }

  @Input() openingSignal!: Subject<Array<string>>

  @ViewChild('otherUserReportTemplate', { read: TemplateRef }) otherUserReportTemplateRef!: TemplateRef<any>
}
