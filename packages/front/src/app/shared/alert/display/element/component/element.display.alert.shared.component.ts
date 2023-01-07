import { Component, ComponentRef, Input } from '@angular/core'

import { DisplayAlertSharedInterface } from '../../interface/display.alert.shared.interface'

@Component({
  selector: 'app-shared-alert-display-element',
  templateUrl: './element.display.alert.shared.component.html',
  styleUrls: ['./element.display.alert.shared.component.scss']
})
export class ElementDisplayAlertSharedComponent {
  timeOut!: ReturnType<typeof setTimeout> | undefined

  ngAfterViewInit(): void {
    this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.click()
    }, 60000 * 10)
  }

  click(): void {
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)

    this.componentRef.destroy()
  }

  @Input() componentRef!: ComponentRef<ElementDisplayAlertSharedComponent>

  @Input() icofont: string = 'info'

  @Input() alert!: DisplayAlertSharedInterface
  
  @Input() detailed: boolean = false
}
