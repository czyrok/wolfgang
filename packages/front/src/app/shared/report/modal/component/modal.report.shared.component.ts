import { Component, TemplateRef, ViewChild, Input, AfterViewInit } from '@angular/core'
import { Subject, Subscription } from 'rxjs'

import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal',
  templateUrl: './modal.report.shared.component.html',
  styleUrls: ['./modal.report.shared.component.scss']
})
export class ModalReportSharedComponent implements AfterViewInit {
  openingSignalSub!: Subscription

  reportBugOpeningSignal: Subject<void> = new Subject
  reportUserOpeningSignal: Subject<void> = new Subject

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

  callbackReportBug() {
    this.reportBugOpeningSignal.next()
  }

  callbackReportUser() {
    this.reportUserOpeningSignal.next()
  }

  closeModalCallback(): void {
    this.modalSharedService.close()
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('chooseReportTemplate', { read: TemplateRef }) chooseReportTemplateRef!: TemplateRef<any>
}
