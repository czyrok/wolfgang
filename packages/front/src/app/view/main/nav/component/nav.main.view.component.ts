import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-main-nav',
  templateUrl: './nav.main.view.component.html',
  styleUrls: ['./nav.main.view.component.scss']
})
export class NavMainViewComponent {
  constructor(
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  getUsername(): string {
    return this.authSharedService.username ?? ''
  }

  getIsAuth(): boolean {
    return this.authSharedService.isAuth
  }

  async logoutCallback(): Promise<void> {
    await this.authSharedService.logOut()

    this.router.navigateByUrl('/')
  }
}