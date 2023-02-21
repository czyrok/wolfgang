import { Component, Input, HostListener, AfterViewInit } from '@angular/core'
import { VoteFormControllerModel, CosmeticModel, ReceiverLinkSocketModel, SenderLinkSocketModel, TypeAlertEnum, TypeCosmeticEnum, VotePlayerGameModel, TypeVotePlayerGameEnum } from 'common'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'

import { EventVoteUserSharedModel } from '../../../vote/event/model/event.vote.user.shared.model'

@Component({
  selector: 'app-shared-user-avatar-all',
  templateUrl: './all.avatar.user.shared.component.html',
  styleUrls: ['./all.avatar.user.shared.component.scss']
})
export class AllAvatarUserSharedComponent implements AfterViewInit {
  voteTextAlertType: TypeAlertEnum = TypeAlertEnum.DANGER
  playerVotingList: Array<string> = new Array

  cosmeticsList!: Array<CosmeticModel>

  constructor(
    private authSharedService: AuthSharedService,
    private socketSharedService: SocketSharedService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.loadCosmetics()

    this.loadSubVoteEvent()
  }

  loadSubVoteEvent(): void {
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

  async loadCosmetics(): Promise<void> {
    const cosmeticLinkReceiver: ReceiverLinkSocketModel<Array<CosmeticModel>> = await this.socketSharedService.registerReceiver<Array<CosmeticModel>>('/game/profile', 'skin'),
      cosmeticLinkSender: SenderLinkSocketModel<string> = await this.socketSharedService.registerSender<string>('/game/profile', 'skin')

    cosmeticLinkReceiver.subscribe((data: Array<CosmeticModel>) => {
      this.cosmeticsList = data
    })

    cosmeticLinkSender.emit(this.username)
  }

  isVotedBySelf(): boolean {
    for (const username of this.playerVotingList) {
      if (username === this.authSharedService.username) return true
    }

    return false
  }

  isSelf(): boolean {
    if (this.username === this.authSharedService.username) return true

    return false
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

  @Input() voteEvent!: EventVoteUserSharedModel

  @HostListener('click') click(): void {
    if (this.authSharedService.username && this.voteEvent.avatarSelectEvent && this.voteEvent.avatarUnselectEvent) {
      if (this.playerVotingList.indexOf(this.authSharedService.username) === -1) {
        this.voteEvent.avatarSelectEvent.emit(this.username)
      } else {
        this.voteEvent.avatarUnselectEvent.emit(this.username)
      }
    }
  }
}
