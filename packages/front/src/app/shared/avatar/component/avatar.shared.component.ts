import { Component, EventEmitter, Output, Input, HostListener, AfterViewInit } from '@angular/core'

interface Vote {
  sender: string
  receiver: string
}

@Component({
  selector: 'app-shared-avatar',
  templateUrl: './avatar.shared.component.html',
  styleUrls: ['./avatar.shared.component.scss']
})
export class AvatarSharedComponent implements AfterViewInit {
  playerVotingList: Array<string> = new Array()

  ngAfterViewInit(): void {
    if (this.eventPlayerVote !== undefined) this.eventPlayerVote.subscribe((value: Vote) => {
      if (value.receiver == this.id) {
        let index = this.playerVotingList.indexOf(value.sender)

        if (index == -1) {
          this.playerVotingList.push(value.sender)
        }
      } else {
        let index = this.playerVotingList.indexOf(value.sender)

        if (index != -1) {
          this.playerVotingList.splice(index, 1)
        }
      }
    })
  }

  @Input() id!: string
  @Input() eventPlayerVote!: EventEmitter<Vote>

  @HostListener('click') click(): void {
    if (this.eventPlayerVote !== undefined) this.eventPlayerVote.emit({
      // id de l'utilisateur connecté
      sender: 'x',
      receiver: this.id
    })
  }
}