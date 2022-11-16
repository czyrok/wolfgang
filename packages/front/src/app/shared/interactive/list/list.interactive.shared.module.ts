import { NgModule } from "@angular/core"

import { ListInteractiveSharedComponent } from './component/list.interactive.shared.component'
import { TabListInteractiveSharedComponent } from "./tab/component/tab.list.interactive.shared.component"
import { ItemTabListInteractiveSharedComponent } from './tab/item/component/item.tab.list.interactive.shared.component'

@NgModule({
    declarations: [
        ListInteractiveSharedComponent,
        TabListInteractiveSharedComponent,
        ItemTabListInteractiveSharedComponent
    ],
    exports: [
        ListInteractiveSharedComponent,
        TabListInteractiveSharedComponent,
        ItemTabListInteractiveSharedComponent
    ]
})

export class ListInteractiveSharedModule { }