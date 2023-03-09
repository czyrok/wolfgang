import { Component } from '@angular/core'

import { AuthSharedService } from '../../../../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-home-default',
  templateUrl: './default.home.view.component.html',
  styleUrls: ['./default.home.view.component.scss']
})
export class DefaultHomeViewComponent {
  constructor(
    private authSharedService: AuthSharedService
  ) {
    this.authSharedService
  }

  isAuth(): boolean {
    return this.authSharedService.isAuth
  }

  getUsername(): string | undefined{
    return this.authSharedService.username
  }
}
