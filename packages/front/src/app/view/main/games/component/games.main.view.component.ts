import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GameModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'
import { DisplayAlertSharedInterface } from 'src/app/shared/alert/display/interface/display.alert.shared.interface'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'
import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-games',
  templateUrl: './games.main.view.component.html',
  styleUrls: ['./games.main.view.component.scss']
})
export class GamesMainViewComponent implements OnInit, OnDestroy {
  games!: Array<GameModel>

  listReceiverLink!: ReceiverLinkSocketModel<Array<GameModel>>

  alreadyInGameAlert?: DisplayAlertSharedInterface

  constructor(
    private router: Router,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    this.listReceiverLink = await this.socketSharedService.registerReceiver('/game/currently', 'list')

    this.listReceiverLink.subscribe((games: Array<GameModel>) => {
      this.games = games
      console.log(games)
    })

    const listSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/game/currently', 'list')

    listSenderLink.emit()

    await this.gameSharedService.checkStatus()

    if (this.gameSharedService.inGame) {
      this.alreadyInGameAlert = this.displayAlertSharedService.emitInform('Vous êtes déjà dans une partie', undefined, false, [
        {
          text: 'Rejoindre',
          callback: () => {
            this.router.navigateByUrl(`/play/${this.gameSharedService.gameId}`)
          }
        }
      ])
    }
  }

  ngOnDestroy(): void {
    this.alreadyInGameAlert?.componentRef?.instance.click()
  }

  createGameButtonCallback(): void {
    this.socketSharedService.registerSender<void>('/game/currently', 'create').then((createSenderLink: SenderLinkSocketModel<void>) => {
      this.socketSharedService.registerReceiver<string>('/game/currently', 'create').then((createReceiverLink: ReceiverLinkSocketModel<string>) => {
        createReceiverLink.subscribe((id: string) => {
          console.log(id)

          createReceiverLink.unsubscribe()

          this.router.navigateByUrl(`/play/${id}`)
        })

        createSenderLink.emit()
      })
    })
  }
}
