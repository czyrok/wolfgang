import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { ProfileMainViewModule } from './profile/profile.main.view.module'
import { GamesMainViewModule } from './games/games.main.view.module'

import { MainViewComponent } from './component/main.view.component'
import { NavMainViewComponent } from './nav/component/nav.main.view.component'
import { HomeMainViewComponent } from './home/component/home.main.view.component'
import { CardsProposalMainViewComponent } from './cards-proposal/component/cards-proposal.main.view.component'
import { HelpMainViewComponent } from './help/component/help.main.view.component'

@NgModule({
    declarations: [
        MainViewComponent,
        NavMainViewComponent,
        HomeMainViewComponent,
        CardsProposalMainViewComponent,
        HelpMainViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ProfileMainViewModule,
        GamesMainViewModule
    ]
})

export class MainViewModule { }
