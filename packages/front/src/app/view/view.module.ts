import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module'

import { AuthSharedGuard } from '../shared/auth/guard/auth.shared.guard'
import { PlayViewGuard } from './play/guard/play.view.guard'

import { ViewComponent } from './component/view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: ViewComponent, children: [
                    { path: '', loadChildren: () => import('./home/home.view.module').then(m => m.HomeViewModule) },
                    { path: 'game', loadChildren: () => import('./main/main.view.module').then(m => m.MainViewModule), canActivate: [AuthSharedGuard] },
                    { path: 'managing', loadChildren: () => import('./managing/managing.view.module').then(m => m.ManagingViewModule), canActivate: [AuthSharedGuard] },
                    { path: 'play', loadChildren: () => import('./play/play.view.module').then(m => m.PlayViewModule), canActivate: [AuthSharedGuard, PlayViewGuard] }
                ]
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
        SharedModule
    ],
    providers: [
        PlayViewGuard
    ],
    declarations: [
        ViewComponent
    ]
})
export class ViewModule { }
