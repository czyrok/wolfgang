import { Component, Input, HostListener, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core'
import { PlayerGameModel, VoteFormControllerModel, CosmeticModel, TypeAlertEnum, TypeCosmeticEnum, LinkNamespaceSocketModel } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

import { EventVoteUserSharedModel } from '../../../vote/event/model/event.vote.user.shared.model'

@Component({
  selector: 'app-shared-user-avatar-all',
  templateUrl: './all.avatar.user.shared.component.html',
  styleUrls: ['./all.avatar.user.shared.component.scss']
})
/**
 * Gère l'avatar de l'utilisateur
 * @implements OnChanges, AfterViewInit
 */
export class AllAvatarUserSharedComponent implements OnChanges, AfterViewInit {
  deathTextAlertType: TypeAlertEnum = TypeAlertEnum.WARNING

  voteTextAlertType: TypeAlertEnum = TypeAlertEnum.DANGER
  playerVotingList: Array<string> = new Array

  cosmeticsList!: Array<CosmeticModel>

  /**
   * @param authSharedService Service d'authentification
   * @param socketSharedService Service de sockets
   */
  constructor(
    private authSharedService: AuthSharedService,
    private socketSharedService: SocketSharedService
  ) { }

  /**
   * Permet de déclencher le chargement de l'avatar de l'utilisateur ainsi que le système de vote
   */
  async ngAfterViewInit(): Promise<void> {
    await this.loadCosmetics(this.username)
    await this.loadSubVoteEvent()
  }

  /**
   * Permet de déclencher le chargement de l'avatar de l'utilisateur ainsi que le système de vote lors d'un changement de valeur en entrée
   * @param changes La nouvelle valeur en entrée
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.loadCosmetics(changes['username'].currentValue)
    await this.loadSubVoteEvent()
  }

  /**
   * Permet de charger le système de vote
   */
  async loadSubVoteEvent(): Promise<void> {
    if (!this.voteEvent) return

    this.voteEvent.playerVotingEvent.subscribe((vote: VoteFormControllerModel) => {
      const index = this.playerVotingList.indexOf(vote.votingPlayer)

      if (vote.votedPlayer === this.username && index === -1) {
        this.playerVotingList.push(vote.votingPlayer)
      }
    })

    this.voteEvent.playerUnvotingEvent.subscribe((votingUsername: string) => {
      const index = this.playerVotingList.indexOf(votingUsername)

      if (index !== -1) this.playerVotingList.splice(index, 1)
    })

    this.voteEvent.playerVotesResetEvent.subscribe(_ => {
      this.playerVotingList.splice(0, this.playerVotingList.length)
    })
  }

  /**
   * Permet de charger l'avatar de l'utilisateur
   */
  async loadCosmetics(username: string): Promise<void> {
    const cosmeticLink: LinkNamespaceSocketModel<void, Array<CosmeticModel>> = await this.socketSharedService.buildLink<void, Array<CosmeticModel>>('/game/profile/' + username, 'skin')

    cosmeticLink.on((data: Array<CosmeticModel>) => {
      cosmeticLink.destroy()

      this.cosmeticsList = data
    })

    cosmeticLink.emit()
  }

  /**
   * Permet de savoir le joueur est voté par le joueur connecté
   * @returns Vrai si c'est le cas, faux sinon
   */
  isVotedBySelf(): boolean {
    for (const username of this.playerVotingList) {
      if (username === this.authSharedService.username) return true
    }

    return false
  }

  /**
   * Renvoie le cosmétique de type "chapeau" parmis l'avatar ou la surchage de celui-ci
   * @returns Un cosmétique de type "chapeau"
   */
  getHat(): CosmeticModel | undefined {
    return this.hatOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HAT)[0]
  }

  /**
   * Renvoie le cosmétique de type "tête" parmis l'avatar ou la surchage de celui-ci
   * @returns Un cosmétique de type "tête"
   */
  getHead(): CosmeticModel | undefined {
    return this.headOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HEAD)[0]
  }

  /**
   * Renvoie le cosmétique de type "haut" parmis l'avatar ou la surchage de celui-ci
   * @returns Un cosmétique de type "haut"
   */
  getTop(): CosmeticModel | undefined {
    return this.topOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.TOP)[0]
  }

  /**
   * Renvoie le cosmétique de type "bas" parmis l'avatar ou la surchage de celui-ci
   * @returns Un cosmétique de type "bas"
   */
  getPants(): CosmeticModel | undefined {
    return this.pantsOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.PANTS)[0]
  }

  /**
   * Renvoie le cosmétique de type "chaussures" parmis l'avatar ou la surchage de celui-ci
   * @returns Un cosmétique de type "chaussures"
   */
  getShoes(): CosmeticModel | undefined {
    return this.shoesOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.SHOES)[0]
  }

  @Input() username!: string
  
  @Input() player!: PlayerGameModel
  
  @Input() usernameBubble: boolean = true
  @Input() reduced: boolean = false
  @Input() detailed: boolean = false

  @Input() hatOverride!: CosmeticModel
  @Input() headOverride!: CosmeticModel
  @Input() topOverride!: CosmeticModel
  @Input() pantsOverride!: CosmeticModel
  @Input() shoesOverride!: CosmeticModel

  @Input() voteEvent!: EventVoteUserSharedModel

  @HostListener('click') click(): void {
    if (this.authSharedService.username && this.voteEvent?.avatarSelectEvent && this.voteEvent?.avatarUnselectEvent) {
      if (this.playerVotingList.indexOf(this.authSharedService.username) === -1) {
        this.voteEvent.avatarSelectEvent.emit(this.username)
      } else {
        this.voteEvent.avatarUnselectEvent.emit(this.username)
      }
    }
  }
}
