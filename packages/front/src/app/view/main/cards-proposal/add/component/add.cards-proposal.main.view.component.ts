import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CardsProposalFormControllerModel, LinkNamespaceSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-add',
  templateUrl: './add.cards-proposal.main.view.component.html',
  styleUrls: ['./add.cards-proposal.main.view.component.scss']
})
export class AddCardsProposalMainViewComponent {
  form: UntypedFormGroup

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const cardsProposalLink: LinkNamespaceSocketModel<CardsProposalFormControllerModel, void>
        = await this.socketSharedService.buildLink('/game/cards-proposal', 'add')

      cardsProposalLink.on(() => {
        cardsProposalLink.destroy()

        this.router.navigateByUrl('/game/cards-proposal')
      })

      cardsProposalLink.onFail((error: any) => {
        cardsProposalLink.destroy()

        this.displayAlertSharedService.emitDanger(error)
      })

      cardsProposalLink.emit(new CardsProposalFormControllerModel(this.form.get('title')?.value, this.form.get('description')?.value))
    }
  }
}
