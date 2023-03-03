import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { OtherUserReportModel, ReportModel} from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'


@Component({
  selector: 'app-shared-report-modal-user-other',
  templateUrl: './other.user.modal.report.shared.component.html',
  styleUrls: ['./other.user.modal.report.shared.component.scss']
})
/**
 * @classdesc Gère les boites modales de signalements détaillés d'un utilisateur
 */
export class OtherUserModalReportSharedComponent {
  report!: ReportModel
  form: UntypedFormGroup

  openingSignalSub!: Subscription

  /**
   * @param formBuilder Constructeur de formulaires
   * @param modalSharedService Service de boite modale
   */
  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalSharedService: ModalSharedService
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.minLength(20)]],
    })
  }

   /**
   * Effectue la souscription du signal d'ouverture d'un formulaire de signalement détaillé d'un utilisateur
   */
  ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Signalement utilisateur',
        template: this.otherUserReportTemplateRef
      })
    })
  }

  /**
   * Ferme le service de boite modale de signalement détaillé d'un utilisateur
   */
  closeReport(): void{
    this.modalSharedService.close()
  }

  /**
   * Crée un modèle de signalement détaillé d'un utilisateur avec la description donné dans le formulaire
   */
  callbackUserForm(): void {
    if (this.form.valid) {
      let reportUser: OtherUserReportModel = new OtherUserReportModel

      reportUser.reason = this.form.get('description')?.value
      this.report = reportUser
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('otherUserReportTemplate', { read: TemplateRef }) otherUserReportTemplateRef!: TemplateRef<any>

}
