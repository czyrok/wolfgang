import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { ProfileMainViewComponent } from './component/profile.main.view.component'
import { HomeProfileMainViewComponent } from './home/component/home.profile.main.view.component'
import { SkinCustomizationProfileMainViewComponent } from './skin-customization/component/skin-customization.profile.main.view.component'

@NgModule({
    declarations: [
        ProfileMainViewComponent,
        HomeProfileMainViewComponent,
        SkinCustomizationProfileMainViewComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ]
})

export class ProfileMainViewModule { }