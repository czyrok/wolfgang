import { NgModule } from '@angular/core'

import { InteractiveSharedModule } from './interactive/interactive.shared.module'

import { ButtonShared } from './button/button.shared.component'

@NgModule({
    declarations: [
        ButtonShared
    ],
    imports: [
        InteractiveSharedModule
    ],
    exports: [
        InteractiveSharedModule,
        ButtonShared
    ]
})

export class SharedModule { }