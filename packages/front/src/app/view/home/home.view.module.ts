import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { HomeViewGuard } from './guard/home.view.guard'

import { HomeViewComponent } from './component/home.view.component'
import { DefaultHomeViewComponent } from './default/component/default.home.view.component'
import { LogInHomeViewComponent } from './log-in/component/log-in.home.view.component'
import { SignUpHomeViewComponent } from './sign-up/component/sign-up.home.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: DefaultHomeViewComponent },
            { path: 'log-in', component: LogInHomeViewComponent, canActivate: [HomeViewGuard] },
            { path: 'sign-up', component: SignUpHomeViewComponent, canActivate: [HomeViewGuard] }
        ]),
        ReactiveFormsModule,
        SharedModule,
        PageViewModule
    ],
    providers: [
        HomeViewGuard
    ],
    declarations: [
        HomeViewComponent,
        DefaultHomeViewComponent,
        LogInHomeViewComponent,
        SignUpHomeViewComponent
    ]
})

export class HomeViewModule { }
