import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ItemSharedModule } from '../item/item.shared.module'
import { ButtonInteractiveSharedModule } from '../interactive/button/button.interactive.shared.module'

import { ContainerModalSharedComponent } from './container/component/container.modal.shared.component'
import { ElementModalSharedComponent } from './element/component/element.modal.shared.component'

@NgModule({
    imports: [
        CommonModule,
        ItemSharedModule,
        ButtonInteractiveSharedModule
    ],
    declarations: [
        ContainerModalSharedComponent,
        ElementModalSharedComponent
    ],
    exports: [
        ContainerModalSharedComponent,
        ElementModalSharedComponent
    ]
})
export class ModalSharedModule { }