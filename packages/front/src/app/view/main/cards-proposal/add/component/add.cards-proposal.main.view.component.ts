import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { CardsProposalUserModel, CardsProposalUserModelDocument, SenderLinkSocketModel } from 'common'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

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
    private socketSharedService: SocketSharedService
  ) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.minLength(100),Validators.maxLength(2000)]]
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const addCardProposalLink: SenderLinkSocketModel</* CardsProposalUserModel */void> = await this.socketSharedService.registerSender<void>('/game/cards-proposal', 'add')
      const cardsproposalusermodel = new CardsProposalUserModel(this.form.get('title')?.value, this.form.get('description')?.value)

      addCardProposalLink.emit(/* cardsproposalusermodel */)
      console.log(cardsproposalusermodel)
      this.router.navigateByUrl('../')
    }
  }
}
