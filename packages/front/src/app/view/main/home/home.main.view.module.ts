import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { HomeMainViewComponent } from './component/home.main.view.component'
import { DefaultHomeMainViewComponent } from './default/component/default.home.main.view.component'
import { LogInHomeMainViewComponent } from './log-in/component/log-in.home.main.view.component'
import { RegisterHomeMainViewComponent } from './register/component/register.home.main.view.component'

@NgModule({
    declarations: [
        HomeMainViewComponent,
        DefaultHomeMainViewComponent,
        LogInHomeMainViewComponent,
        RegisterHomeMainViewComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ]
})

export class HomeMainViewModule { }