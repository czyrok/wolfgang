import { Component, ViewChild, ViewContainerRef, ComponentRef, HostListener } from '@angular/core'
import { ElementAlertComponent } from '../element/component/element.alert.component'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  timeOut!: ReturnType<typeof setTimeout> | undefined

  constructor(
    private componentRef: ComponentRef<AlertComponent>
  ) { }

  ngAfterViewInit(): void {
    //let alert = ElementAlertComponent
    //this.viewContainerRefTarget.createComponent(alert)

    this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.clic()
    }, 30000)
  }

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef

  @HostListener('target') clic(): void {
    this.componentRef.destroy()

    if (this.timeOut !== undefined) clearTimeout(this.timeOut)
  }
}