import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-shared-chat',
  templateUrl: './chat.shared.component.html',
  styleUrls: ['./chat.shared.component.scss']
})
export class ChatSharedComponent {
  @Input() title!: string
}