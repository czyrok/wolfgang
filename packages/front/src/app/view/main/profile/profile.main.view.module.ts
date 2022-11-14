import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ProfileMainViewComponent } from './component/profile.main.view.component'
import { SkinCustomizationProfileMainViewComponent } from './skin-customization/component/skin-customization.profile.main.view.component'

@NgModule({
    declarations: [
        ProfileMainViewComponent,
        SkinCustomizationProfileMainViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})

export class ProfileMainViewModule { }