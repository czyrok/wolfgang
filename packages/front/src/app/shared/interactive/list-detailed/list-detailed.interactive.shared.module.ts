import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"

import { ListDetailedInteractiveSharedComponent } from './component/list-detailed.interactive.shared.component'
import { TabListDetailedInteractiveSharedComponent } from "./tab/component/tab.list-detailed.interactive.shared.component"
import { SubTabTabListDetailedInteractiveSharedComponent } from "./tab/sub-tab/component/sub-tab.tab.list-detailed.interactive.shared.component"
import { ItemSubTabTabListDetailedInteractiveSharedComponent } from "./tab/sub-tab/item/component/item.sub-tab.tab.list-detailed.interactive.shared.component"

@NgModule({
    declarations: [
        ListDetailedInteractiveSharedComponent,
        TabListDetailedInteractiveSharedComponent,
        SubTabTabListDetailedInteractiveSharedComponent,
        ItemSubTabTabListDetailedInteractiveSharedComponent
    ],
    imports: [
      CommonModule
    ],
    exports: [
        ListDetailedInteractiveSharedComponent,
        TabListDetailedInteractiveSharedComponent,
        SubTabTabListDetailedInteractiveSharedComponent,
        ItemSubTabTabListDetailedInteractiveSharedComponent
    ]
})

export class ListDetailedInteractiveSharedModule { }
