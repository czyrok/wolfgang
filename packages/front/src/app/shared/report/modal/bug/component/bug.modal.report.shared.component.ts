import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { BugReportModel, ReportModel, SenderLinkSocketModel, TypeReportEnum } from 'common'

import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

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
    private formBuilder: UntypedFormBuilder,
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
        title: 'Signalement d\'un bug',
        template: this.bugReportTemplateRef
      })
    })
  }

  closeReport(): void {
    this.modalSharedService.close()
  }

  async callbackBugForm(): Promise<void> {
    if (this.form.valid) {
      const reportBug: BugReportModel = new BugReportModel(this.form.get('description')?.value, TypeReportEnum.BUG)

      this.report = reportBug
      
      const triggerLink: SenderLinkSocketModel<BugReportModel> = await this.socketSharedService.registerSender('/report', 'add')
      triggerLink.emit(reportBug)
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('bugReportTemplate', { read: TemplateRef }) bugReportTemplateRef!: TemplateRef<any>

}
