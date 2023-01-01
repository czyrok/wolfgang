import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module'

import { ViewComponent } from './component/view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: ViewComponent, children: [
                    { path: '', loadChildren: () => import('./home/home.view.module').then(m => m.HomeViewModule) },
                    { path: 'game', loadChildren: () => import('./main/main.view.module').then(m => m.MainViewModule) },
                    { path: 'play', loadChildren: () => import('./play/play.view.module').then(m => m.PlayViewModule) }
                ]
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
        SharedModule
    ],
    declarations: [
        ViewComponent
    ]
})
export class ViewModule { }