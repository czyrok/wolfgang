import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { PlayViewComponent } from './component/play.view.component'
import { RulesPlayViewComponent } from './rules/component/rules.play.view.component'
import { CircleAvatarPlayViewComponent } from './avatar/circle/component/circle.avatar.play.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: ':game_id', component: PlayViewComponent }
        ]),
        FormsModule,
        SharedModule,
        PageViewModule
    ],
    declarations: [
        PlayViewComponent,
        RulesPlayViewComponent,
        CircleAvatarPlayViewComponent
    ]
})
export class PlayViewModule { }