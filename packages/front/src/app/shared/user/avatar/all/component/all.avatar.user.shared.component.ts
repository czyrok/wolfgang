import { Component, EventEmitter, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core'

// #nsm
import { CosmeticModel, ReceiverLinkSocketModel, SenderLinkSocketModel, TypeCosmeticEnum, UserModel, VotePlayerGameModel /*, TypeVotePlayerGameEnum */ } from 'common'
import { Subscription } from 'rxjs'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

@Component({
  selector: 'app-shared-user-avatar-all',
  templateUrl: './all.avatar.user.shared.component.html',
  styleUrls: ['./all.avatar.user.shared.component.scss']
})
/**
 * @classdesc Gère l'avatar complet de l'utilisateur
 * @implements AfterViewInit, OnDestroy
 */
export class AllAvatarUserSharedComponent implements AfterViewInit, OnDestroy {
  playerVotingList: Array<string> = new Array()
  sub!: Subscription

  cosmeticsList!: Array<CosmeticModel>

  /**
   * @param socketSharedService  Service de sockets
   */
  constructor(
    private socketSharedService: SocketSharedService
  ) { }

  /**
   * Permet de récuperer le skin d'un utilisateur
   */
  async ngAfterViewInit(): Promise<void> {
    /* if (this.eventPlayerVote !== undefined) this.sub = this.eventPlayerVote.subscribe((value: VotePlayerGameModel) => {
      if (value.votedUser == this.id) {
        let index = this.playerVotingList.indexOf(value.votingUser)

        if (index == -1) {
          this.playerVotingList.push(value.votingUser)
        }
      } else {
        let index = this.playerVotingList.indexOf(value.votingUser)

        if (index != -1) {
          this.playerVotingList.splice(index, 1)
        }
      }
    }) */

    console.log(this.username)

    const cosmeticLink: ReceiverLinkSocketModel<Array<CosmeticModel>> = await this.socketSharedService.registerReceiver<Array<CosmeticModel>>('/game/profile', 'skin')

    cosmeticLink.subscribe((data: Array<CosmeticModel>) => {
      console.log(data)
      this.cosmeticsList = data
    })

    const cosmeticLinkEmit: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/profile', 'skin')

    cosmeticLinkEmit.emit(this.username)
  }

  /**
   * Permet de désabonner l'élement en cas de déstruction
   */
  ngOnDestroy(): void {
    if (this.sub !== undefined) this.sub.unsubscribe()
  }

  /**
   * @returns Renvoie un cosmetique de type chapeau
   */
  getHat(): CosmeticModel | undefined {
    return this.hat || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HAT)[0]
  }

  /**
   * @returns Renvoie un cosmetique de type tête
   */
  getHead(): CosmeticModel | undefined {
    return this.head || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HEAD)[0]
  }

  /**
   * @returns Renvoie un cosmetique de type haut
   */
  getTop(): CosmeticModel | undefined {
    return this.top || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.TOP)[0]
  }

  /**
   * @returns Renvoie un cosmetique de type pantalon
   */
  getPants(): CosmeticModel | undefined {
    return this.pants || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.PANTS)[0]
  }

  /**
   * @returns Renvoie un cosmetique de type chaussure
   */
  getShoes(): CosmeticModel | undefined {
    return this.shoes || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.SHOES)[0]
  }

  @Input() user?: UserModel
  @Input() username!: string
  @Input() reduced: boolean = false
  @Input() detailed: boolean = false

  @Input() hat!: CosmeticModel
  @Input() head!: CosmeticModel
  @Input() top!: CosmeticModel
  @Input() pants!: CosmeticModel
  @Input() shoes!: CosmeticModel

  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>

  @HostListener('click') click(): void {
    /* if (this.eventPlayerVote !== undefined && this.userSharedService.username !== undefined) this.eventPlayerVote.emit(
      new VotePlayerGameModel(this.userSharedService.username, this.id, '', TypeVotePlayerGameEnum.DEFAULT)
    ) */
  }
}
