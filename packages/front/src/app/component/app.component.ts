import { Component, OnInit } from '@angular/core'

import { AuthSharedService } from '../shared/auth/service/auth.shared.service'
import { SessionSharedService } from '../shared/session/service/session.shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 *
 * @implements OnInit
 */
export class AppComponent implements OnInit {
  /**
   * @param sessionSharedService Service pour la session d'un utilisateur
   * @param authSharedService Service d'autentification d'un utilisateur
   */
  constructor(
    private sessionSharedService: SessionSharedService,
    private authSharedService: AuthSharedService
  ) { }

  /**
   * @async Actualise la session utilisateur et vérifie sonauthentification
   */
  async ngOnInit(): Promise<void> {
    await this.sessionSharedService.refreshSession()
    await this.authSharedService.testAuth()
  }
}
