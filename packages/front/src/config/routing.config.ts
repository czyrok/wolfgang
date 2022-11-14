import { Routes } from '@angular/router'

import { MainViewComponent } from 'src/app/view/main/component/main.view.component'
import { HomeMainViewComponent } from 'src/app/view/main/home/component/home.main.view.component'
import { GamesMainViewComponent } from 'src/app/view/main/games/component/games.main.view.component'
import { CardsProposalMainViewComponent } from 'src/app/view/main/cards-proposal/component/cards-proposal.main.view.component'
import { ProfileMainViewComponent } from 'src/app/view/main/profile/component/profile.main.view.component'
import { SkinCustomizationProfileMainViewComponent } from 'src/app/view/main/profile/skin-customization/component/skin-customization.profile.main.view.component'

export const routes: Routes = [
    {
        path: '', component: MainViewComponent, children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeMainViewComponent },
          { path: 'games', component: GamesMainViewComponent },
          { path: 'cards-proposal', component: CardsProposalMainViewComponent },
          { path: 'profile', component: ProfileMainViewComponent, children: [
            { path: 'skin-customization', component: SkinCustomizationProfileMainViewComponent },
          ] },
        ]
      },
      //{ path: '404', component: NotFoundViewComponent },
      //{ path: '**', redirectTo: '404', pathMatch: 'full' }
]