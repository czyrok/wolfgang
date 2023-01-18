import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { EventSocketService } from '../../../../../socket/event/service/event.socket.service'

import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'

import { CardsProposalUserModel } from 'common'

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
    private eventSocketService: EventSocketService
  ) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.minLength(100),Validators.maxLength(2000)]]
    })
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      const addCardProposalLink: SenderEventSocketModel<CardsProposalUserModel> = this.eventSocketService.registerSender<CardsProposalUserModel>('/game/cards-proposal', 'add')
      
      const cardsproposalusermodel = new CardsProposalUserModel(this.form.get('title')?.value, this.form.get('description')?.value)
      
      addCardProposalLink.emit(cardsproposalusermodel)

      this.router.navigateByUrl('../')
    }
  }
}
