import { Component, ComponentRef, Input } from '@angular/core'

import { AlertInterface } from '../../interface/alert.interface'

@Component({
  selector: 'element-alert',
  templateUrl: './element.alert.component.html',
  styleUrls: ['./element.alert.component.scss']
})
export class ElementAlertComponent {
  timeOut!: ReturnType<typeof setTimeout> | undefined

  constructor(
    private componentRef: ComponentRef<ElementAlertComponent>
  ) { }

  ngAfterViewInit(): void {
    this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.click()
    }, 30000)
  }

  click(): void {
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)

    this.componentRef.destroy()
  }

  @Input() alert!: AlertInterface
}
