import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-bubble-username',
  templateUrl: './username.bubble.user.shared.component.html',
  styleUrls: ['./username.bubble.user.shared.component.scss']
})
export class UsernameBubbleUserSharedComponent {
  @Input() id!: string

  @Input() detailed: boolean = false
}