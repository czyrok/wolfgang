import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

import { SharedModule } from './shared/shared.module'

import { AppComponent } from './component/app.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) }
    ]),
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }