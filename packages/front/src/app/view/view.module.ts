import { NgModule } from '@angular/core'
import { MainViewModule } from './main/main.view.module'

@NgModule({
    imports: [
        MainViewModule
    ],
    exports: [
        MainViewModule
    ]
})

export class ViewModule { }