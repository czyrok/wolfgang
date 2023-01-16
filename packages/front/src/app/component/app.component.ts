import { Component } from '@angular/core'

import { AuthSharedService } from '../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authSharedService: AuthSharedService
  ) {
    this.authSharedService.testAuth()
  }
}