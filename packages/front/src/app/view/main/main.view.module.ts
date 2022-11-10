import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { MainViewComponent } from './component/main.view.component'
import { NavMainViewComponent } from './nav/component/nav.main.view.component'

@NgModule({
    declarations: [
        MainViewComponent,
        NavMainViewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})

export class MainViewModule { }
