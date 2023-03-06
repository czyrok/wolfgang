import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TypeAlertEnum, GameModel, LinkNamespaceSocketModel } from 'common'

import { GameSharedService } from 'src/app/shared/game/service/game.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-view-main-games',
  templateUrl: './games.main.view.component.html',
  styleUrls: ['./games.main.view.component.scss']
})
export class GamesMainViewComponent implements OnInit, OnDestroy {
  games!: Array<GameModel>

  listLink!: LinkNamespaceSocketModel<void, Array<GameModel>>

  creationProcess: boolean = false

  constructor(
    private router: Router,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    this.listLink = await this.socketSharedService.buildLink<void, Array<GameModel>>('/game/currently', 'list')

    this.listLink.on((games: Array<GameModel>) => {
      this.games = games
    })

    this.listLink.emit()

    await this.gameSharedService.checkStatus()
  }

  ngOnDestroy(): void {
    if (this.listLink) this.listLink.destroy()
  }

  async createGameButtonCallback(): Promise<void> {
    if (this.creationProcess) return

    await this.gameSharedService.checkStatus()

    if (this.gameSharedService.inGame) return

    this.creationProcess = true

    const createLink: LinkNamespaceSocketModel<void, string>
      = await this.socketSharedService.buildLink('/game/currently', 'create')

    createLink.on((gameId: string) => {
      createLink.destroy()

      this.creationProcess = false
      
      if (!gameId) return
      
      this.router.navigateByUrl(`/play/${gameId}`)
    })

    createLink.emit()
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
