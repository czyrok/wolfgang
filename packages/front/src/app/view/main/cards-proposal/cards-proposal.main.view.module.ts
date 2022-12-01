import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { AddCardsProposalMainViewComponent } from './add/component/add.cards-proposal.main.view.component'
import { CardsProposalMainViewComponent } from './component/cards-proposal.main.view.component'
import { DefaultCardsProposalMainViewComponent } from './default/component/default.cards-proposal.main.view.component'
import { ViewCardsProposalMainViewComponent } from './view/view.cards-proposal.main.view.component'



@NgModule({
    declarations: [
      CardsProposalMainViewComponent,
      ViewCardsProposalMainViewComponent,
      AddCardsProposalMainViewComponent,
      DefaultCardsProposalMainViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})

export class CardsProposalMainViewModule { }
