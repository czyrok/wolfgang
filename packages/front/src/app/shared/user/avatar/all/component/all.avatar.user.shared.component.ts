import { Component, EventEmitter, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core'

// #nsm
import { VotePlayerGameModel, /* TypeVotePlayerGameEnum */ } from 'common'
import { Subscription } from 'rxjs'

import { UserService } from 'src/app/user/service/user.service'

@Component({
  selector: 'app-shared-user-avatar-all',
  templateUrl: './all.avatar.user.shared.component.html',
  styleUrls: ['./all.avatar.user.shared.component.scss']
})
export class AllAvatarUserSharedComponent implements AfterViewInit, OnDestroy {
  playerVotingList: Array<string> = new Array()
  sub!: Subscription

  constructor(
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    if (this.eventPlayerVote !== undefined) this.sub = this.eventPlayerVote.subscribe((value: VotePlayerGameModel) => {
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
    })
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) this.sub.unsubscribe()
  }

  @Input() id: string = 'czyrok'
  @Input() reduced: boolean = false
  @Input() detailed: boolean = false

  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>

  @HostListener('click') click(): void {
    /* if (this.eventPlayerVote !== undefined && this.userSharedService.username !== undefined) this.eventPlayerVote.emit(
      new VotePlayerGameModel(this.userSharedService.username, this.id, '', TypeVotePlayerGameEnum.DEFAULT)
    ) */
  }
}