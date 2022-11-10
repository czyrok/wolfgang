import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainViewComponent } from './view/main/component/main.view.component'
import { GamesMainViewComponent } from './view/main/games/component/games.main.view.component'
import { HomeMainViewComponent } from './view/main/home/component/home.main.view.component'
import { CardsProposalMainViewComponent } from './view/main/cards-proposal/component/cards-proposal.main.view.component'

const routes: Routes = [
  {
    path: '', component: MainViewComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeMainViewComponent },
      { path: 'games', component: GamesMainViewComponent },
      { path: 'cards-proposal', component: CardsProposalMainViewComponent },
    ]
  },
  //{ path: '404', component: NotFoundViewComponent },
  //{ path: '**', redirectTo: '404', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
