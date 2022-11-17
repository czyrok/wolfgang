import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { GamesMainViewComponent } from './component/games.main.view.component'
import { HomeGamesMainViewComponent } from './home/component/home.games.main.view.component'
import { PlayGamesMainViewComponent } from './play/component/play.games.main.view.component'

@NgModule({
    declarations: [
        GamesMainViewComponent,
        HomeGamesMainViewComponent,
        PlayGamesMainViewComponent,
    ],
    imports: [
        RouterModule,
        SharedModule
    ]
})

export class GamesMainViewModule { }