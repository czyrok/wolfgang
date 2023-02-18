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
export class AllAvatarUserSharedComponent implements AfterViewInit, OnDestroy {
  playerVotingList: Array<string> = new Array()
  sub!: Subscription

  cosmeticsList!: Array<CosmeticModel>

  constructor(
    private socketSharedService: SocketSharedService
  ) { }

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

    const cosmeticLink: ReceiverLinkSocketModel<Array<CosmeticModel>> = await this.socketSharedService.registerReceiver<Array<CosmeticModel>>('/game/profile', 'skin')

    cosmeticLink.subscribe((data: Array<CosmeticModel>) => {
      this.cosmeticsList = data
    })

    const cosmeticLinkEmit: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/profile', 'skin')

    cosmeticLinkEmit.emit(this.username)
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) this.sub.unsubscribe()
  }

  getHat(): CosmeticModel | undefined {
    return this.hatOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HAT)[0]
  }

  getHead(): CosmeticModel | undefined {
    return this.headOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.HEAD)[0]
  }

  getTop(): CosmeticModel | undefined {
    return this.topOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.TOP)[0]
  }

  getPants(): CosmeticModel | undefined {
    return this.pantsOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.PANTS)[0]
  }

  getShoes(): CosmeticModel | undefined {
    return this.shoesOverride || this.cosmeticsList?.filter((cosmetic: CosmeticModel) => cosmetic.type === TypeCosmeticEnum.SHOES)[0]
  }

  @Input() username!: string
  @Input() usernameBubble: boolean = true
  @Input() reduced: boolean = false
  @Input() detailed: boolean = false

  @Input() hatOverride!: CosmeticModel
  @Input() headOverride!: CosmeticModel
  @Input() topOverride!: CosmeticModel
  @Input() pantsOverride!: CosmeticModel
  @Input() shoesOverride!: CosmeticModel

  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>

  @HostListener('click') click(): void {
    /* if (this.eventPlayerVote !== undefined && this.userSharedService.username !== undefined) this.eventPlayerVote.emit(
      new VotePlayerGameModel(this.userSharedService.username, this.id, '', TypeVotePlayerGameEnum.DEFAULT)
    ) */
  }
}
