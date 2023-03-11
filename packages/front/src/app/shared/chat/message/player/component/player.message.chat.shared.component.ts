import { AfterViewInit, Component, Input } from '@angular/core'
import { UserModel } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-chat-message-player',
  templateUrl: './player.message.chat.shared.component.html',
  styleUrls: ['./player.message.chat.shared.component.scss']
})
/**
 * @classdesc Gère les messages des joueurs
 * @implements AfterViewInit
 */
export class PlayerMessageChatSharedComponent implements AfterViewInit {
  display: boolean = false
  self!: boolean

 /**
 * @param authSharedService Service d'authentification
 */
  constructor(
    private authSharedService: AuthSharedService
  ) { }

  /**
   * Définis si le message provient de l'utilisateur connecté
   */
  ngAfterViewInit(): void {
    if (this.user && this.user.username && this.user.username === this.authSharedService.username)
      this.self = true

    this.display = true
  }

  @Input() user!: UserModel
  @Input() text!: string
}
