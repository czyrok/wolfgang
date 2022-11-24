import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PlayGamesMainViewModule } from './play/play.games.main.view.module'

import { GamesMainViewComponent } from './component/games.main.view.component'
import { HomeGamesMainViewComponent } from './home/component/home.games.main.view.component'

@NgModule({
    declarations: [
        GamesMainViewComponent,
        HomeGamesMainViewComponent
    ],
    imports: [
        RouterModule,
        SharedModule,
        PlayGamesMainViewModule
    ]
})

export class GamesMainViewModule { }
