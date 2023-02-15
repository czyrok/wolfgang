import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { OtherUserReportModel, ReportModel, TypeReportEnum} from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'


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
    private modalSharedService: ModalSharedService
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

  callbackUserForm(): void {
    if (this.form.valid) {
      const reportUser: OtherUserReportModel = new OtherUserReportModel(this.form.get('description')?.value, TypeReportEnum.OTHER_USER)

      this.report = reportUser
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('otherUserReportTemplate', { read: TemplateRef }) otherUserReportTemplateRef!: TemplateRef<any>

}
