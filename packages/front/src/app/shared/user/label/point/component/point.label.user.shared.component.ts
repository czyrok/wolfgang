import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReceiverEventSocketModel } from 'src/app/socket/event/receiver/model/receiver.event.socket.model'
import { EventSocketService } from 'src/app/socket/event/service/event.socket.service'

@Component({
  selector: 'app-shared-user-label-point',
  templateUrl: './point.label.user.shared.component.html',
  styleUrls: ['./point.label.user.shared.component.scss']
})
export class PointLabelUserSharedComponent {
  @Input() pointCount?:number
}
