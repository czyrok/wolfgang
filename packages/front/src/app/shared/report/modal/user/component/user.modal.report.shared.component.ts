import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { BasicUserReportModel, ReportModel, TypeUserReportEnum } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal-user',
  templateUrl: './user.modal.report.shared.component.html',
  styleUrls: ['./user.modal.report.shared.component.scss']
})
/**
 * @classdesc Gère les boites modales de signalements d'un utilisateur
 */
export class UserModalReportSharedComponent {
  report!: ReportModel

  openingSignalSub!: Subscription

  /**
   * @param modalSharedService Service de boite modale
   */
  constructor(
    private modalSharedService: ModalSharedService
  ) { }

  /**
   * Effectue la souscription du signal d'ouverture de formulaire pour le signalement d'un joueur et ouvre une boite modale
   */
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

  /**
   * Ouvre la boite modale de signalement détailler d'un utilisateur
   */
  callbackOtherReportUser() {
    this.reportUserOpeningSignal.next()

    /* this.modalSharedService.close()
    this.modalSharedService.open(this.tatemplateAutherReportUser.elementRef.nativeElement) */
  }

/*   @ViewChild('otherUserReportTemplate', { read: TemplateRef }) tatemplateAutherReportUser!: TemplateRef<any> */

  /**
   * Crée un modèle de signalement basic d'un utilisateur pour movaises pratiques
   */
  callbackNegativeTacticsReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.NEGATIVE_TACTICS
    this.report = reportUser
  }

  /**
   * Crée un modèle de signalement basic d'un utilisateur pour langage inapproprié
   */
  callbackInapropriateWordsReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.INAPROPRIATE_WORDS
    this.report = reportUser
  }

  /**
   * Crée un modèle de signalement basic d'un utilisateur pour spam
   */
  callbackFloodReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.FLOOD
    this.report = reportUser
  }

  /**
   * Crée un modèle de signalement basic d'un utilisateur pour publicité
   */
  callbackAdvertisingReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.ADVERTISING
    this.report = reportUser
  }

  /**
   * Crée un modèle de signalement basic d'un utilisateur pour partage de lien
   */
  callbackLinkReport(): void {
    let reportUser: BasicUserReportModel = new BasicUserReportModel

    reportUser.type = TypeUserReportEnum.LINK
    this.report = reportUser
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('userReportTemplate', { read: TemplateRef }) chooseUserReportTemplateRef!: TemplateRef<any>
}
