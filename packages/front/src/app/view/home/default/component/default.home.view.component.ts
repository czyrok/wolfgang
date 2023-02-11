import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'

import { AuthSharedService } from '../../../../shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-view-home-default',
  templateUrl: './default.home.view.component.html',
  styleUrls: ['./default.home.view.component.scss']
})
export class DefaultHomeViewComponent {
  constructor(
    private authSharedService: AuthSharedService,
    private activatedRoute: ActivatedRoute
  ) {
    this.authSharedService
  }

  isAuth(): boolean {
    return this.authSharedService.isAuth
  }

  getUsername(): string | undefined{
    return this.authSharedService.username
  }

  reportOpeningSignal: Subject<void> = new Subject

  callbackReportBug() {
    this.reportOpeningSignal.next()
  }

}
