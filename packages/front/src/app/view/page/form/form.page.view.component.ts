import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-form',
  templateUrl: './form.page.view.component.html',
  styleUrls: ['./form.page.view.component.scss']
})
export class FormPageViewComponent {
  @Input() title!: string

  @Input() formTemplate!: TemplateRef<any>
}
