import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { SharedModule } from './shared/shared.module'

import { AppComponent } from './component/app.component'

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) }
    ]),
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }