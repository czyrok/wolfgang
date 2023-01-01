import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-avatar-head',
  templateUrl: './head.avatar.user.shared.component.html',
  styleUrls: ['./head.avatar.user.shared.component.scss']
})
export class HeadAvatarUserSharedComponent {
  @Input() id!: string
}