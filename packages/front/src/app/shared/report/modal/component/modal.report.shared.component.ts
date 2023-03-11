import { Component, TemplateRef, ViewChild, Input, AfterViewInit } from '@angular/core'
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
  openingSignalSub!: Subscription

  reportBugOpeningSignal: Subject<void> = new Subject
  reportUserOpeningSignal: Subject<void> = new Subject

  /**
   * @param modalSharedService Service gérant les boites modales
   */
  constructor(
    private modalSharedService: ModalSharedService,
  ) { }

  /**
   * Effectue la souscription du signal d'ouverture de la boite modale
   */
  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Choix du signalement',
        template: this.chooseReportTemplateRef
      })
    })
  }

  /**
   * Ouvre la boite modale de signalement d'un bug
   */
  callbackReportBug() {
    this.reportBugOpeningSignal.next()
  }

  /**
   * Ouvre la boite modale de signalement d'un utilisateur
   */
  callbackReportUser() {
    this.reportUserOpeningSignal.next()
  }

  /**
   * Ferme la boite modale
   */
  closeModalCallback(): void {
    this.modalSharedService.close()
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('chooseReportTemplate', { read: TemplateRef }) chooseReportTemplateRef!: TemplateRef<any>
}
