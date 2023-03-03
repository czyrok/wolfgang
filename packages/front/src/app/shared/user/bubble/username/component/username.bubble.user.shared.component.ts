import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-bubble-username',
  templateUrl: './username.bubble.user.shared.component.html',
  styleUrls: ['./username.bubble.user.shared.component.scss']
})
/**
 * Gère les composants de bulles d'affichage d'un utilisateur
 */
export class UsernameBubbleUserSharedComponent {
  @Input() username?: string
  @Input() level!: number
  @Input() detailed: boolean = false
}
