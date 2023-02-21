import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { OtherUserReportModel, ReportModel, SenderLinkSocketModel, TypeReportEnum} from 'common'
import { Subject, Subscription } from 'rxjs'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'


@Component({
  selector: 'app-shared-report-modal-user-other',
  templateUrl: './other.user.modal.report.shared.component.html',
  styleUrls: ['./other.user.modal.report.shared.component.scss']
})
export class OtherUserModalReportSharedComponent {
  report!: ReportModel
  form: UntypedFormGroup

  openingSignalSub!: Subscription

  constructor(
    private formBuilder: UntypedFormBuilder,
    private gameSharedService: GameSharedService,
    private modalSharedService: ModalSharedService,
    private socketSharedService: SocketSharedService
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.minLength(20)]],
    })
  }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Signalement utilisateur',
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

      this.report = reportUser

      const triggerLink: SenderLinkSocketModel<OtherUserReportModel> = await this.socketSharedService.registerSender('/report', 'add')
      triggerLink.emit(reportUser)
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('otherUserReportTemplate', { read: TemplateRef }) otherUserReportTemplateRef!: TemplateRef<any>

}
