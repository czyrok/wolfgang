import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { routes } from '../config/routing.config'

import { ViewModule } from './view/view.module'

import { AppComponent } from './component/app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }