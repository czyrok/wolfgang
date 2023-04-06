import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-user-label-point',
  templateUrl: './point.label.user.shared.component.html',
  styleUrls: ['./point.label.user.shared.component.scss']
})
/**
 * Gère le composant label des points d'un utilisateur
 */
export class PointLabelUserSharedComponent {
  @Input() pointCount?:number
}
