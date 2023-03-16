import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-shared-item-form',
  templateUrl: './form.item.shared.component.html',
  styleUrls: ['./form.item.shared.component.scss']
})
/**
 * @classdesc Gère les composants de formulaire
 */
export class FormItemSharedComponent {
  @Input() titleTemplate: TemplateRef<any> | undefined
  @Input() contentTemplate!: TemplateRef<any>

  @Input() aside: boolean = false
  @Input() maxWidth: boolean = false
  @Input() maxHeight: boolean = true
  @Input() absolute: boolean = true
}