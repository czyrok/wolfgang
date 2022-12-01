import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { HomeMainViewModule } from './home/home.main.view.module'
import { ProfileMainViewModule } from './profile/profile.main.view.module'
import { GamesMainViewModule } from './games/games.main.view.module'
import { CardsProposalMainViewModule } from './cards-proposal/cards-proposal.main.view.module'

import { MainViewComponent } from './component/main.view.component'
import { NavMainViewComponent } from './nav/component/nav.main.view.component'
import { HelpMainViewComponent } from './help/component/help.main.view.component'

@NgModule({
    declarations: [
        MainViewComponent,
        NavMainViewComponent,
        HelpMainViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        HomeMainViewModule,
        ProfileMainViewModule,
        GamesMainViewModule,
        CardsProposalMainViewModule
    ]
})

export class MainViewModule { }
