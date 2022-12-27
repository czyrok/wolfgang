import { Component, ViewChild, ViewContainerRef, ComponentRef, HostListener, Input } from '@angular/core'
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
    let alert = new Array<ElementAlertComponent>(this.nbAlert)

    alert.forEach( (value) =>{
      value = this.viewContainerRefTarget.createComponent(ElementAlertComponent)
    })
    
    this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.clic(alert)
    }, 30000)
  }
  
  @Input() nbAlert!: number

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @HostListener('target') clic(alertList: Array<ElementAlertComponent>): void {
    this.componentRef.destroy()
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)
  }
}