import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-avatar',
  templateUrl: './avatar.shared.component.html',
  styleUrls: ['./avatar.shared.component.scss']
})
export class AvatarSharedComponent {
  @Input() id!: string
}