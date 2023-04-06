import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { BugReportModel, LinkNamespaceSocketModel, TypeReportEnum } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { ModalSharedService } from 'src/app/shared/modal/service/modal.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-shared-report-modal-bug',
  templateUrl: './bug.modal.report.shared.component.html',
  styleUrls: ['./bug.modal.report.shared.component.scss']
})
/**
 * Gère la boite modale de signalement des bugs
 */
export class BugModalReportSharedComponent {
  form: UntypedFormGroup

  openingSignalSub!: Subscription

  /**
   * @param modalSharedService Service de boite modale
   * @param formBuilder Constructeur de formulaires
   */
  constructor(
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private modalSharedService: ModalSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required, Validators.minLength(10)]],
    })
  }

  /**
   * Effectue la souscription du signal d'ouverture de la boite modale
   */
   ngAfterViewInit(): void {
    this.openingSignalSub = this.openingSignal.subscribe(() => {
      this.modalSharedService.close()

      this.form.reset()

      this.modalSharedService.open({
        title: 'Signalement d\'un bug',
        template: this.bugReportTemplateRef
      })
    })
  }

  /**
   * Ferme la boite modale
   */
  closeModalCallback(): void {
    this.modalSharedService.close()
  }

  /**
   * Crée un modèle de signalement d'un bug avec la description donné dans le formulaire
   */
  async callbackBugForm(): Promise<void> {
    if (this.form.valid) {
      const reportBug: BugReportModel = new BugReportModel(this.form.get('description')?.value, TypeReportEnum.BUG)
      
      const addLink: LinkNamespaceSocketModel<BugReportModel, void> = await this.socketSharedService.buildLink('/report', 'add')
      
      addLink.on(() => {
        addLink.destroy()

        this.displayAlertSharedService.emitSuccess('Votre signalement a bien été enregistré')

        this.modalSharedService.close()
      })

      addLink.onFail((error: any) => {
        addLink.destroy()

        this.displayAlertSharedService.emitDanger(error)

        this.modalSharedService.close()
      })

      addLink.emit(reportBug)
    }
  }

  @Input() openingSignal!: Subject<void>

  @ViewChild('bugReportTemplate', { read: TemplateRef }) bugReportTemplateRef!: TemplateRef<any>

}
