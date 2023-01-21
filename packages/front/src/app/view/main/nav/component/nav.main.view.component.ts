import { Component } from '@angular/core'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-main-nav',
  templateUrl: './nav.main.view.component.html',
  styleUrls: ['./nav.main.view.component.scss']
})
export class NavMainViewComponent {
  constructor(
    private authSharedService: AuthSharedService
  ) { }
  
  getUsername(): string {
    return this.authSharedService.username ?? ''
  }
}