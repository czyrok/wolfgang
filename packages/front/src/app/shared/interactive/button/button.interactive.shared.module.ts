import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ButtonInteractiveSharedComponent } from './component/button.interactive.shared.component'

@NgModule({
    declarations: [
        ButtonInteractiveSharedComponent
    ],
    imports: [
      CommonModule,
      RouterModule
    ],
    exports: [
        ButtonInteractiveSharedComponent
    ]
})
export class ButtonInteractiveSharedModule { }
