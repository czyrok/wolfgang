import { Component, ComponentRef, Input } from '@angular/core'

import { DisplayAlertSharedInterface } from '../../interface/display.alert.shared.interface'

@Component({
  selector: 'app-shared-alert-display-element',
  templateUrl: './element.display.alert.shared.component.html',
  styleUrls: ['./element.display.alert.shared.component.scss']
})
/**
 * Composant représentant une alerte
 */
export class ElementDisplayAlertSharedComponent {
  timeOut!: ReturnType<typeof setTimeout> | undefined

  /**
  * Mise en place du minuteur de l'alerte
  */
  ngAfterViewInit(): void {
    if (this.alert && this.alert.timer) this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.click()
    }, 10e3)
  }

  /**
   *  Méthode déclenchée au clique sur la croix de l'alerte pour fermer l'alerte
   */
  click(): void {
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)

    this.alert.componentRef = undefined

    this.componentRef.destroy()
  }

  @Input() componentRef!: ComponentRef<ElementDisplayAlertSharedComponent>

  @Input() icofont: string = 'info'
  @Input() alert!: DisplayAlertSharedInterface
}
