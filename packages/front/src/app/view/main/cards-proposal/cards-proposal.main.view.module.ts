import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../../page/page.view.module'

import { AddCardsProposalMainViewComponent } from './add/component/add.cards-proposal.main.view.component'
import { CardsProposalMainViewComponent } from './component/cards-proposal.main.view.component'
import { DefaultCardsProposalMainViewComponent } from './default/component/default.cards-proposal.main.view.component'
import { ViewCardsProposalMainViewComponent } from './view/component/view.cards-proposal.main.view.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: CardsProposalMainViewComponent, children: [
          { path: '', component: DefaultCardsProposalMainViewComponent },
          { path: 'view/:id', component: ViewCardsProposalMainViewComponent },
          { path: 'add', component: AddCardsProposalMainViewComponent }
        ]
      }
    ]),
    SharedModule,
    PageViewModule
  ],
  declarations: [
    CardsProposalMainViewComponent,
    ViewCardsProposalMainViewComponent,
    AddCardsProposalMainViewComponent,
    DefaultCardsProposalMainViewComponent
  ]
})

export class CardsProposalMainViewModule { }