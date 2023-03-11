import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-label-level',
  templateUrl: './level.label.user.shared.component.html',
  styleUrls: ['./level.label.user.shared.component.scss']
})
/**
 * Gère les composants de labels du niveau
 */
export class LevelLabelUserSharedComponent {
  @Input() text: boolean = true
  @Input() level?: number
}
