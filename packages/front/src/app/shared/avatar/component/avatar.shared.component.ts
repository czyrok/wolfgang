import { Component, EventEmitter, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core'

import { VotePlayerGameModel, TypeVotePlayerGameEnum } from 'common'
import { Subscription } from 'rxjs'

import { UserService } from 'src/app/user/service/user.service'

@Component({
  selector: 'app-shared-avatar',
  templateUrl: './avatar.shared.component.html',
  styleUrls: ['./avatar.shared.component.scss']
})
export class AvatarSharedComponent implements AfterViewInit, OnDestroy {
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
    this.sub.unsubscribe()
  }

  @Input() id!: string
  @Input() eventPlayerVote!: EventEmitter<VotePlayerGameModel>

  @HostListener('click') click(): void {
    if (this.eventPlayerVote !== undefined && this.userService.username !== undefined) this.eventPlayerVote.emit(
      new VotePlayerGameModel(this.userService.username, this.id, '', TypeVotePlayerGameEnum.DEFAULT)
    )
  }
}