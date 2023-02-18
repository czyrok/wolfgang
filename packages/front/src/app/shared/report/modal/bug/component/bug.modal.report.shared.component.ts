import { Component, Input, TemplateRef, ViewChild} from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { BugReportModel, ReportModel, TypeReportEnum } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal-bug',
  templateUrl: './bug.modal.report.shared.component.html',
  styleUrls: ['./bug.modal.report.shared.component.scss']
})
export class BugModalReportSharedComponent {
  report!: ReportModel
  form: UntypedFormGroup

  openingSignalSub!: Subscription

  constructor(
    private modalSharedService: ModalSharedService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.minLength(20)]],
    })
  }

   ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Signalement d\'un bug',
        template: this.bugReportTemplateRef
      })
    })
  }

  closeReport(): void{
    this.modalSharedService.close()
  }

  callbackBugForm(): void {
    if (this.form.valid) {
      let reportBug: BugReportModel = new BugReportModel(this.form.get('description')?.value, TypeReportEnum.BUG)

      this.report = reportBug
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('bugReportTemplate', { read: TemplateRef }) bugReportTemplateRef!: TemplateRef<any>

}
