import { AfterViewInit, Component } from '@angular/core'

import { EventSocketService } from '../../../../socket/event/service/event.socket.service'

import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { SenderEventSocketModel } from 'src/app/socket/event/sender/model/sender.event.socket.model'

@Component({
  selector: 'app-view-home-log-in',
  templateUrl: './log-in.home.view.component.html',
  styleUrls: ['./log-in.home.view.component.scss']
})
export class LogInHomeViewComponent implements AfterViewInit {
  errorLink: ReceiverEventSocketModel<any> = this.eventSocketService.registerReceiver<any>('/home/log-in-failed', 'trigger').subscribe({
    callback: (data: any) => {
      console.log(data)
    }
  })

  triggerLink: SenderEventSocketModel<any> = this.eventSocketService.registerSender<any>('/home/log-in', 'trigger')

  constructor(
    private eventSocketService: EventSocketService
  ) { }

  ngAfterViewInit(): void {
    this.triggerLink.emit({
      'username': 'czyrok',
      'password': '1234'
    })
  }
}
