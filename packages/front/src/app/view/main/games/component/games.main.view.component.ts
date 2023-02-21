import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TypeAlertEnum, GameModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-games',
  templateUrl: './games.main.view.component.html',
  styleUrls: ['./games.main.view.component.scss']
})
export class GamesMainViewComponent implements OnInit {
  games!: Array<GameModel>

  listReceiverLink!: ReceiverLinkSocketModel<Array<GameModel>>

  constructor(
    private router: Router,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    this.listReceiverLink = await this.socketSharedService.registerReceiver('/game/currently', 'list')

    this.listReceiverLink.subscribe((games: Array<GameModel>) => {
      this.games = games
    })

    const listSenderLink: SenderLinkSocketModel<void> = await this.socketSharedService.registerSender('/game/currently', 'list')

    listSenderLink.emit()

    await this.gameSharedService.checkStatus()
  }

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

  getDurationText(game: GameModel): string {
    if (game.state.rules.playerCountMax <= 4) return 'Très courte'
    if (game.state.rules.playerCountMax <= 7) return 'Courte'
    if (game.state.rules.playerCountMax <= 10) return 'Moyenne'

    return 'Longue'
  }

  getDurationTextAlertType(game: GameModel): TypeAlertEnum {
    if (game.state.rules.playerCountMax <= 4) return TypeAlertEnum.SUCCESS
    if (game.state.rules.playerCountMax <= 7) return TypeAlertEnum.INFORM
    if (game.state.rules.playerCountMax <= 10) return TypeAlertEnum.WARNING

    return TypeAlertEnum.DANGER
  }
}
