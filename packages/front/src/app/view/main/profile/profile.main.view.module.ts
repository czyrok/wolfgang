import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'
import { PageViewModule } from '../../page/page.view.module'

import { ProfileMainViewComponent } from './component/profile.main.view.component'
import { DefaultProfileMainViewComponent } from './default/component/default.profile.main.view.component'
import { SkinCustomizationProfileMainViewComponent } from './skin-customization/component/skin-customization.profile.main.view.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: ProfileMainViewComponent, children: [
                    { path: '', component: DefaultProfileMainViewComponent },
                    { path: 'skin-customization', component: SkinCustomizationProfileMainViewComponent }
                ]
            }
        ]),
        SharedModule,
        PageViewModule
    ],
    declarations: [
        ProfileMainViewComponent,
        DefaultProfileMainViewComponent,
        SkinCustomizationProfileMainViewComponent
    ]
})

export class ProfileMainViewModule { }