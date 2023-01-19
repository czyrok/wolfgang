import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { BasicUserReportModel, ReportModel, TypeUserReportEnum } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal-user',
  templateUrl: './user.modal.report.shared.component.html',
  styleUrls: ['./user.modal.report.shared.component.scss']
})
export class UserModalReportSharedComponent {
  report!: ReportModel

  openingSignalSub!: Subscription

  constructor(
    private modalSharedService: ModalSharedService
  ) { }

  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Type de signalement',
        template: this.chooseUserReportTemplateRef
      })
    })
  }

  reportUserOpeningSignal: Subject<void> = new Subject

  callbackOtherReportUser() {
    this.reportUserOpeningSignal.next()

    /* this.modalSharedService.close()
    this.modalSharedService.open(this.tatemplateAutherReportUser.elementRef.nativeElement) */
  }

/*   @ViewChild('otherUserReportTemplate', { read: TemplateRef }) tatemplateAutherReportUser!: TemplateRef<any> */

  callbackNegativeTacticsReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.NEGATIVE_TACTICS
    this.report = reportUser
  }

  callbackInapropriateWordsReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.INAPROPRIATE_WORDS
    this.report = reportUser
  }

  callbackFloodReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.FLOOD
    this.report = reportUser
  }

  callbackAdvertisingReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.ADVERTISING
    this.report = reportUser
  }

  callbackLinkReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.LINK
    this.report = reportUser
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
