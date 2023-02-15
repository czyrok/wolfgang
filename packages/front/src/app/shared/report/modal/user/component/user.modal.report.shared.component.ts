import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { BasicUserReportModel, ReportModel, TypeReportEnum, TypeUserReportEnum } from 'common'
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
    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.NEGATIVE_TACTICS, TypeReportEnum.BASIC_USER)

    this.report = reportUser
  }

  callbackInapropriateWordsReport(): void {
    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.INAPROPRIATE_WORDS, TypeReportEnum.BASIC_USER)

    this.report = reportUser
  }

  callbackFloodReport(): void {
    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.FLOOD, TypeReportEnum.BASIC_USER)

    this.report = reportUser
  }

  callbackAdvertisingReport(): void {
    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.ADVERTISING, TypeReportEnum.BASIC_USER)

    this.report = reportUser
  }

  callbackLinkReport(): void {
    const reportUser: BasicUserReportModel = new BasicUserReportModel(TypeUserReportEnum.LINK, TypeReportEnum.BASIC_USER)

    this.report = reportUser
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
