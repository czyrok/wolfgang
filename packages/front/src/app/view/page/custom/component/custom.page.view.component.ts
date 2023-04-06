import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-view-page-custom',
  templateUrl: './custom.page.view.component.html',
  styleUrls: ['./custom.page.view.component.scss']
})
/**
 * Composant de customisation d'une page
 */
export class CustomPageViewComponent {
  @Input() contentTemplate!: TemplateRef<any>
}
