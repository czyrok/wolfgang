import { Component, Input } from '@angular/core'

import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'

@Component({
  selector: 'app-shared-user-bubble-username',
  templateUrl: './username.bubble.user.shared.component.html',
  styleUrls: ['./username.bubble.user.shared.component.scss']
})
export class UsernameBubbleUserSharedComponent {
  constructor(
    private authSharedService: AuthSharedService
  ) { }

  isSelf(): boolean {
    if (this.username === this.authSharedService.username) return true

    return false
  }

  @Input() username?: string
  @Input() level!: number
  @Input() detailed: boolean = false
}