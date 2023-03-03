import { Component, Input, TemplateRef, ViewChild} from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { BugReportModel, ReportModel } from 'common'
import { Subject, Subscription } from 'rxjs'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'

@Component({
  selector: 'app-shared-report-modal-bug',
  templateUrl: './bug.modal.report.shared.component.html',
  styleUrls: ['./bug.modal.report.shared.component.scss']
})
/**
 * @classdesc Gère la boite modale de signalement des bugs
 */
export class BugModalReportSharedComponent {
  report!: ReportModel
  form: UntypedFormGroup

  openingSignalSub!: Subscription

  /**
   * @param modalSharedService Service de boite modale
   * @param formBuilder Constructeur de formulaires
   */
  constructor(
    private modalSharedService: ModalSharedService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.minLength(20)]],
    })
  }

  /**
   * Effectue la souscription du signal d'ouverture d'un formulaire de signalement d'un bug
   */
   ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.modalSharedService.open({
        title: 'Signalement d\'un bug',
        template: this.bugReportTemplateRef
      })
    })
  }

  /**
   * Ferme le service de boite modale de signalement d'un bug
   */
  closeReport(): void{
    this.modalSharedService.close()
  }

  /**
   * Crée un modèle de signalement d'un bug avec la description donné dans le formulaire
   */
  callbackBugForm(): void {
    if (this.form.valid) {
      let reportBug: BugReportModel = new BugReportModel

      reportBug.desc = this.form.get('description')?.value
      this.report = reportBug
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('bugReportTemplate', { read: TemplateRef }) bugReportTemplateRef!: TemplateRef<any>

}
