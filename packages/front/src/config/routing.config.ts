import { Routes } from '@angular/router'

import { MainViewComponent } from 'src/app/view/main/component/main.view.component'
import { HomeMainViewComponent } from 'src/app/view/main/home/component/home.main.view.component'
import { CardsProposalMainViewComponent } from 'src/app/view/main/cards-proposal/component/cards-proposal.main.view.component'
import { HelpMainViewComponent } from 'src/app/view/main/help/component/help.main.view.component'

import { HomeGamesMainViewComponent } from 'src/app/view/main/games/home/component/home.games.main.view.component'
import { DefaultHomeMainViewComponent } from 'src/app/view/main/home/default/component/default.home.main.view.component'
import { LogInHomeMainViewComponent } from 'src/app/view/main/home/log-in/component/log-in.home.main.view.component'
import { RegisterHomeMainViewComponent } from 'src/app/view/main/home/register/component/register.home.main.view.component'

import { GamesMainViewComponent } from 'src/app/view/main/games/component/games.main.view.component'
import { PlayGamesMainViewComponent } from 'src/app/view/main/games/play/component/play.games.main.view.component'

import { ProfileMainViewComponent } from 'src/app/view/main/profile/component/profile.main.view.component'
import { HomeProfileMainViewComponent } from 'src/app/view/main/profile/home/component/home.profile.main.view.component'
import { SkinCustomizationProfileMainViewComponent } from 'src/app/view/main/profile/skin-customization/component/skin-customization.profile.main.view.component'

import { NotFoundHomeMainViewComponent } from 'src/app/view/main/home/not-found/component/not-found.home.main.view.component'


export const routes: Routes = [
    {
        path: '', component: MainViewComponent, children: [
          { path: '', component: HomeMainViewComponent, children: [
            { path: '', component: DefaultHomeMainViewComponent },
            { path: 'log-in', component: LogInHomeMainViewComponent },
            { path: 'register', component: RegisterHomeMainViewComponent },
            { path: '404', component: NotFoundHomeMainViewComponent },
          ]},
          { path: 'games', component: GamesMainViewComponent, children: [
            { path: '', component: HomeGamesMainViewComponent },
            { path: 'play', component: PlayGamesMainViewComponent },
          ] },
          { path: 'cards-proposal', component: CardsProposalMainViewComponent },
          { path: 'profile', component: ProfileMainViewComponent, children: [
            { path: '', component: HomeProfileMainViewComponent },
            { path: 'skin-customization', component: SkinCustomizationProfileMainViewComponent },
          ] },
          { path: 'help', component: HelpMainViewComponent },
          { path: '**', redirectTo: '404', pathMatch: 'full' },
        ]
      },
]
