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
/**
 * Composant de la vue de la liste des parties disponibles
 * @implements OnInit
 */
export class GamesMainViewComponent implements OnInit, OnDestroy {
  games!: Array<GameModel>

  listLink!: LinkNamespaceSocketModel<void, Array<GameModel>>

  buttonProcess: boolean = false

  /**
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param gameSharedService Service regroupant les informations d'une partie
   */
  constructor(
    private router: Router,
    private socketSharedService: SocketSharedService,
    private gameSharedService: GameSharedService
  ) { }

  /**
   * Initialise la liste des parties
   */
  async ngOnInit(): Promise<void> {
    this.listLink = await this.socketSharedService.buildLink<void, Array<GameModel>>('/game/currently', 'list')

    this.listLink.on((games: Array<GameModel>) => {
      this.games = games
    })

    this.listLink.emit()

    await this.gameSharedService.checkStatus()
  }

  /**
   * Détruit le lien pour mettre à jour la liste des parties
   */
  ngOnDestroy(): void {
    if (this.listLink) this.listLink.destroy()
  }

  /**
   * Permet de créer une nouvelle partie
   */
  async createGameButtonCallback(): Promise<void> {
    if (this.buttonProcess) return

    await this.gameSharedService.checkStatus()

    if (this.gameSharedService.inGame) return

    this.buttonProcess = true

    const createLink: LinkNamespaceSocketModel<void, string>
      = await this.socketSharedService.buildLink('/game/currently', 'create')

    createLink.on((gameId: string) => {
      createLink.destroy()

      this.buttonProcess = false
      
      if (!gameId) return
      
      this.router.navigateByUrl(`/play/${gameId}`)
    })

    createLink.emit()
  }

  /**
   * Permet de rejoindre la première partie dans la liste
   */
  async joinGameButtonCallback(): Promise<void> {
    if (this.buttonProcess) return

    await this.gameSharedService.checkStatus()

    if (this.gameSharedService.inGame) return

    this.buttonProcess = true

    const game: GameModel = this.games[0]

    if (!game) return

    this.router.navigateByUrl(`/play/` + game.gameId)
  }

  /**
   * Permet de récupérer le texte associé à la durée d'une partie
   */
  getDurationText(game: GameModel): string {
    if (game.state.rules.playerCountMax <= 4) return 'Très courte'
    if (game.state.rules.playerCountMax <= 7) return 'Courte'
    if (game.state.rules.playerCountMax <= 10) return 'Moyenne'

    return 'Longue'
  }

  /**
   * Permet de récupérer le type d'alerte associé à la durée d'une partie
   */
  getDurationTextAlertType(game: GameModel): TypeAlertEnum {
    if (game.state.rules.playerCountMax <= 4) return TypeAlertEnum.SUCCESS
    if (game.state.rules.playerCountMax <= 7) return TypeAlertEnum.INFORM
    if (game.state.rules.playerCountMax <= 10) return TypeAlertEnum.WARNING

    return TypeAlertEnum.DANGER
  }
}
