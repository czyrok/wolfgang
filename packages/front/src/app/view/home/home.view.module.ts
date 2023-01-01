import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../page/page.view.module'

import { HomeViewComponent } from './component/home.view.component'
import { DefaultHomeViewComponent } from './default/component/default.home.view.component'
import { LogInHomeViewComponent } from './log-in/component/log-in.home.view.component'
import { SignUpHomeViewComponent } from './sign-up/component/sign-up.home.view.component'
import { UsernameHomeViewComponent } from './username/component/username.home.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: DefaultHomeViewComponent },
            { path: 'log-in', component: LogInHomeViewComponent },
            { path: 'sign-up', component: SignUpHomeViewComponent },
            { path: 'username', component: UsernameHomeViewComponent }
        ]),
        ReactiveFormsModule,
        SharedModule,
        PageViewModule
    ],
    declarations: [
        HomeViewComponent,
        DefaultHomeViewComponent,
        LogInHomeViewComponent,
        SignUpHomeViewComponent,
        UsernameHomeViewComponent
    ]
})

export class HomeViewModule { }
