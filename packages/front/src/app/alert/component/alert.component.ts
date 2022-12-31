import { Component, ViewChild, ViewContainerRef, ComponentRef, HostListener, Input } from '@angular/core'

import { ElementAlertComponent } from '../element/component/element.alert.component'
import { AlertService } from '../service/alert.service'

import { TypeAlertEnum } from '../type/enum/type.alert.enum'
@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  providers: [AlertService]
})
export class AlertComponent {

  timeOut!: ReturnType<typeof setTimeout> | undefined
  
  constructor(
    private componentRef: ComponentRef<AlertComponent>,
    private alertService: AlertService
  ) { }
  
  ngAfterViewInit(): void {
    this.viewContainerRefTarget.createComponent(ElementAlertComponent)
    this.alertService.alert.emit({ type: this.typeEnum, text: this.message })
    
    this.timeOut = setTimeout(_ => {
      this.timeOut = undefined

      this.clic()
    }, 30000)
  }

  @Input() typeEnum!: TypeAlertEnum
  @Input() message!: string
  
  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @HostListener('target') clic(): void {
    this.componentRef.destroy()
    if (this.timeOut !== undefined) clearTimeout(this.timeOut)
  }
}
