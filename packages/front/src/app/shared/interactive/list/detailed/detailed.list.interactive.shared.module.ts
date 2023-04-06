import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ItemSharedModule } from '../../../item/item.shared.module'
import { ButtonInteractiveSharedModule } from '../../button/button.interactive.shared.module'

import { DetailedListInteractiveSharedComponent } from './component/detailed.list.interactive.shared.component'
import { TabDetailedListInteractiveSharedComponent } from './tab/component/tab.detailed.list.interactive.shared.component'
import { SubTabTabDetailedListInteractiveSharedComponent } from './tab/sub-tab/component/sub-tab.tab.detailed.list.interactive.shared.component'
import { ItemSubTabTabDetailedListInteractiveSharedComponent } from './tab/sub-tab/item/component/item.sub-tab.tab.detailed.list.interactive.shared.component'

@NgModule({
    declarations: [
        DetailedListInteractiveSharedComponent,
        TabDetailedListInteractiveSharedComponent,
        SubTabTabDetailedListInteractiveSharedComponent,
        ItemSubTabTabDetailedListInteractiveSharedComponent
    ],
    imports: [
      CommonModule,
      ItemSharedModule,
      ButtonInteractiveSharedModule
    ],
    exports: [
        DetailedListInteractiveSharedComponent,
        TabDetailedListInteractiveSharedComponent,
        SubTabTabDetailedListInteractiveSharedComponent,
        ItemSubTabTabDetailedListInteractiveSharedComponent
    ]
})
export class DetailedListInteractiveSharedModule { }