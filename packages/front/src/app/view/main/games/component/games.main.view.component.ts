import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GameModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-games',
  templateUrl: './games.main.view.component.html',
  styleUrls: ['./games.main.view.component.scss']
})
/**
 * @classdesc Composant de la vue d'une partie
 * @implements OnInit
 */
export class GamesMainViewComponent implements OnInit {
  games!: Array<GameModel>

  listReceiverLink!: ReceiverLinkSocketModel<Array<GameModel>>

  /**
   *
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param gameSharedService Service regroupant les informations d'une partie
   * @param displayAlertSharedService Service qui permet de gérer l'affichage des alertes d'autentification
   */
  constructor(
    private router: Router,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }

  /**
   * Initialise la liste des parties
   */
  async ngOnInit(): Promise<void> {
    this.listReceiverLink = await this.socketSharedService.registerReceiver('/game/currently', 'list')

    this.listReceiverLink.subscribe((games: Array<GameModel>) => {
      this.games = games
    })

    const listSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/game/currently', 'list')

    listSenderLink.emit()

    await this.gameSharedService.checkStatus()
  }

  /**
   * Permet de créer une nouvelle partie en appuyant sur le bouton à cette éffet
   */
  async createGameButtonCallback(): Promise<void> {
    await this.gameSharedService.checkStatus()

    this.gameSharedService.displayJoinYourGameAlert()

    if (this.gameSharedService.inGame) return

    this.socketSharedService.registerSender<void>('/game/currently', 'create').then((createSenderLink: SenderLinkSocketModel<void>) => {
      this.socketSharedService.registerReceiver<string>('/game/currently', 'create').then((createReceiverLink: ReceiverLinkSocketModel<string>) => {
        createReceiverLink.subscribe((id: string) => {
          createReceiverLink.unsubscribe()

          if (!id) return

          this.router.navigateByUrl(`/play/${id}`)
        })

        createSenderLink.emit()
      })
    })
  }
}
