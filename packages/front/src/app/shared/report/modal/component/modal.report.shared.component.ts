import { Component, TemplateRef, ViewChild, EventEmitter, Input, AfterViewInit } from '@angular/core'
import { ReportModel } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal',
  templateUrl: './modal.report.shared.component.html',
  styleUrls: ['./modal.report.shared.component.scss']
})
/**
 * @classdesc Gère les boites modales de signalements
 */
export class ModalReportSharedComponent implements AfterViewInit {
  report!: ReportModel

  openingSignalSub!: Subscription

  /**
   * @param modalSharedService Service d'une boite modale
   */
  constructor(
    private modalSharedService: ModalSharedService,
  ) {}

  /**
   * Effectue la souscription du signal d'ouverture d'un formulaire de signalement et ouvre une boite modale
   */
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

  reportBugOpeningSignal: Subject<void> = new Subject

  /**
   * Ouvre la boite modale de signalement d'un bug
   */
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

  /**
   * Ouvre la boite modale de signalement d'un utilisateur
   */
  callbackReportUser() {
    this.reportUserOpeningSignal.next()

    /* this.modalSharedService.close()
    this.modalSharedService.open(this.tatemplateReportUser.elementRef.nativeElement) */
  }

 /*  @ViewChild('chooseReportTemplate', { read: TemplateRef }) tatemplate!: TemplateRef<any> */
  /* @ViewChild('bugReportTemplate', { read: TemplateRef }) tatemplateBug!: TemplateRef<any>
  @ViewChild('userReportTemplate', { read: TemplateRef }) tatemplateReportUser!: TemplateRef<any> */


  @Input() openingSignal!: Subject<void>

  @ViewChild('chooseReportTemplate', { read: TemplateRef }) chooseReportTemplateRef!: TemplateRef<any>

}
