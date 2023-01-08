import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-shared-item-form',
  templateUrl: './form.item.shared.component.html',
  styleUrls: ['./form.item.shared.component.scss']
})
export class FormItemSharedComponent {
  @Input() titleTemplate!: TemplateRef<any>
  @Input() contentTemplate!: TemplateRef<any>

  @Input() aside: boolean = false
}