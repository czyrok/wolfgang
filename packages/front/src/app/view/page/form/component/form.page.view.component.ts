import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-form',
  templateUrl: './form.page.view.component.html',
  styleUrls: ['./form.page.view.component.scss']
})

/**
 * Component qui sert de template pour les formulaires
 */
export class FormPageViewComponent {
  @Input() title!: string

  @Input() formTemplate!: TemplateRef<any>
}
