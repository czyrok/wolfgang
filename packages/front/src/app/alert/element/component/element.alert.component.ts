import { Component, ComponentRef, HostListener } from '@angular/core'

@Component({
  selector: 'element-alert',
  templateUrl: './element.alert.component.html',
  styleUrls: ['./element.alert.component.scss']
})
export class ElementAlertComponent {
  constructor(
    private componentRef: ComponentRef<ElementAlertComponent>
  ) { }

  @HostListener('target') clic(): void {
    this.componentRef.destroy()
  }
}
