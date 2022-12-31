import { Component, ComponentRef, HostListener } from '@angular/core'

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

      this.clic()
    }, 30000)
  }

  @HostListener('target') clic(): void {
    this.componentRef.destroy()
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)
  }
}
