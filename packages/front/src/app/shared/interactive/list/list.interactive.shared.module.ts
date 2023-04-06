import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { DetailedListInteractiveSharedModule } from './detailed/detailed.list.interactive.shared.module'

import { ListInteractiveSharedComponent } from './component/list.interactive.shared.component'
import { TabListInteractiveSharedComponent } from './tab/component/tab.list.interactive.shared.component'
import { ItemTabListInteractiveSharedComponent } from './tab/item/component/item.tab.list.interactive.shared.component'

@NgModule({
    imports: [
        CommonModule,
        DetailedListInteractiveSharedModule
    ],
    declarations: [
        ListInteractiveSharedComponent,
        TabListInteractiveSharedComponent,
        ItemTabListInteractiveSharedComponent
    ],
    exports: [
        DetailedListInteractiveSharedModule,
        ListInteractiveSharedComponent,
        TabListInteractiveSharedComponent,
        ItemTabListInteractiveSharedComponent
    ]
})
export class ListInteractiveSharedModule { }