import { Component, OnInit } from '@angular/core'

import { AuthSharedService } from '../shared/auth/service/auth.shared.service'
import { SessionSharedService } from '../shared/session/service/session.shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private sessionSharedService: SessionSharedService,
    private authSharedService: AuthSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.sessionSharedService.refreshSession()
    await this.authSharedService.testAuth()
  }
}