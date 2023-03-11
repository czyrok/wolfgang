import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-avatar-head',
  templateUrl: './head.avatar.user.shared.component.html',
  styleUrls: ['./head.avatar.user.shared.component.scss']
})
/**
 * Composant correspondant à l'icone avec l'avatar de l'utilisateur
 */
export class HeadAvatarUserSharedComponent {
  @Input() username!: string
}