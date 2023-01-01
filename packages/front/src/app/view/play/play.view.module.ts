import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { PlayViewGuard } from './guard/play.view.guard'

import { PlayViewComponent } from './component/play.view.component'
import { RulesPlayViewComponent } from './rules/component/rules.play.view.component'
import { CircleAvatarPlayViewComponent } from './avatar/circle/component/circle.avatar.play.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: PlayViewComponent /*, canActivate: [PlayViewGuard] */ }
        ]),
        SharedModule,
        PageViewModule
    ],
    declarations: [
        PlayViewComponent,
        RulesPlayViewComponent,
        CircleAvatarPlayViewComponent
    ],
    providers: [
        PlayViewGuard
    ]
})
export class PlayViewModule { }