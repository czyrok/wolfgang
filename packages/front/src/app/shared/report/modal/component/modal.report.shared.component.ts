import { Component, TemplateRef, ViewChild, Input, AfterViewInit } from '@angular/core'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { ReportModel } from 'common'

@Component({
  selector: 'app-shared-report-modal',
  templateUrl: './modal.report.shared.component.html',
  styleUrls: ['./modal.report.shared.component.scss']
})
export class ModalReportSharedComponent implements AfterViewInit {
  report!: ReportModel

  openingSignalSub!: Subscription

  constructor(
    private modalSharedService: ModalSharedService,
  ) { }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Choix du signalement',
        template: this.chooseReportTemplateRef
      })
    })
  }

  reportBugOpeningSignal: Subject<void> = new Subject

  callbackReportBug() {
    this.reportBugOpeningSignal.next()
  }

  reportUserOpeningSignal: Subject<void> = new Subject

  callbackReportUser() {
    this.reportUserOpeningSignal.next()
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('chooseReportTemplate', { read: TemplateRef }) chooseReportTemplateRef!: TemplateRef<any>

}
