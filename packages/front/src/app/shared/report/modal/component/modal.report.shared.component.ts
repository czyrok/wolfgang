import { Component, TemplateRef, ViewChild, EventEmitter, Input, AfterViewInit } from '@angular/core'
import { ReportModel } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal',
  templateUrl: './modal.report.shared.component.html',
  styleUrls: ['./modal.report.shared.component.scss']
})
export class ModalReportSharedComponent implements AfterViewInit {
  report!: ReportModel

  // partout
  openingSignalSub!: Subscription

  constructor(
    private modalSharedService: ModalSharedService,
  ) {}

  // partout
  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      console.log('ici')
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Choix du signalement',
        template: this.chooseReportTemplateRef
      })
    })
  }

  // pour chaque callback ou faut ouvrir une modal
  reportBugOpeningSignal: Subject<void> = new Subject

  callbackReportBug() {
    this.reportBugOpeningSignal.next()

    /*
    this.modalSharedService.close()

    this.modalSharedService.open({
      title: 'Un titre',
      template: this.tatemplateBug
    }) */
  }

  reportUserOpeningSignal: Subject<void> = new Subject

  callbackReportUser() {
    this.reportUserOpeningSignal.next()

    /* this.modalSharedService.close()
    this.modalSharedService.open(this.tatemplateReportUser.elementRef.nativeElement) */
  }

 /*  @ViewChild('chooseReportTemplate', { read: TemplateRef }) tatemplate!: TemplateRef<any> */
  /* @ViewChild('bugReportTemplate', { read: TemplateRef }) tatemplateBug!: TemplateRef<any>
  @ViewChild('userReportTemplate', { read: TemplateRef }) tatemplateReportUser!: TemplateRef<any> */


  // partout
  @Input() openingSignal!: Subject<void>

  @ViewChild('chooseReportTemplate', { read: TemplateRef }) chooseReportTemplateRef!: TemplateRef<any>

}
