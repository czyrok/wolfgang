import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CardsProposalUserModel, SenderLinkSocketModel, CardsProposalFormControllerModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-cards-proposal-add',
  templateUrl: './add.cards-proposal.main.view.component.html',
  styleUrls: ['./add.cards-proposal.main.view.component.scss']
})
/**
 * @classdesc Composant de la vue d'un ajout de proposition de carte
 */
export class AddCardsProposalMainViewComponent {
  form: UntypedFormGroup

  /**
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param formBuilder Service qui permet de construire des formulaires
   * @param socketSharedService Service qui permet d'utiliser des sockets
   */
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService
  ) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.minLength(10), Validators.maxLength(2000)]]
    })
  }

  /**
   * Si le formulaire est valide émet un modèle de proposition de carte et redirige l'utilisateur sur la page précédente
   */
  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const addCardProposalLink: SenderLinkSocketModel<CardsProposalFormControllerModel> = await this.socketSharedService.registerSender('/game/cards-proposal', 'add')
      const cardsproposalusermodel = new CardsProposalFormControllerModel(this.form.get('title')?.value, this.form.get('description')?.value)

      addCardProposalLink.emit(cardsproposalusermodel)

      this.router.navigateByUrl('/game/cards-proposal')
    }
  }
}
