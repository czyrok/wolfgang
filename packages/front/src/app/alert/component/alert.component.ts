import { Component, ElementRef, ViewChild, ViewContainerRef, ComponentRef, HostListener } from '@angular/core'
import { ElementAlertComponent } from '../element/component/element.alert.component'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  timeoutID!: ReturnType<typeof setTimeout>

  
  ngAfterViewInit(): void {
    
    let alert = ElementAlertComponent
    this.viewContainerRefTarget.createComponent(alert)
    this.timeoutID = setTimeout(_=>this.clic(), 30000)
  }

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @HostListener('target') clic(): void {
    this.viewContainerRefTarget = ComponentRef.destroy()
    clearTimeout(this.timeoutID);
  }
}