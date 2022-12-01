import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { PlayGamesMainViewComponent } from './component/play.games.main.view.component'
import { RulesPlayGamesMainViewComponent } from './rules/component/rules.play.games.main.view.component'
import { CircleAvatarPlayGamesMainViewComponent } from './avatar/circle/component/circle.avatar.play.games.main.view.component'


@NgModule({
    declarations: [
        PlayGamesMainViewComponent,
        RulesPlayGamesMainViewComponent,
        CircleAvatarPlayGamesMainViewComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ]
})

export class PlayGamesMainViewModule { }
