import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-label-level',
  templateUrl: './level.label.user.shared.component.html',
  styleUrls: ['./level.label.user.shared.component.scss']
})
export class LevelLabelUserSharedComponent {
  @Input() text: boolean = true
}