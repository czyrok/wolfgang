import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { MainViewComponent } from './component/main.view.component'
import { NavMainViewComponent } from './nav/component/nav.main.view.component'
import { GamesMainViewComponent } from './games/component/games.main.view.component'
import { HelpMainViewComponent } from './help/component/help.main.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: MainViewComponent, children: [
                    { path: 'currently', component: GamesMainViewComponent },
                    { path: 'profile', loadChildren: () => import('./profile/profile.main.view.module').then(m => m.ProfileMainViewModule) },
                    { path: 'cards-proposal', loadChildren: () => import('./cards-proposal/cards-proposal.main.view.module').then(m => m.CardsProposalMainViewModule) },
                    { path: 'help', component: HelpMainViewComponent },
                    { path: '', redirectTo: 'currently', pathMatch: 'full' }
                ]
            }
        ]),
        SharedModule,
        PageViewModule
    ],
    declarations: [
        MainViewComponent,
        NavMainViewComponent,
        GamesMainViewComponent,
        HelpMainViewComponent
    ],
})

export class MainViewModule { }
