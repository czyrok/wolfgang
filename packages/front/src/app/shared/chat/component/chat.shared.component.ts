import { Component, Input, EventEmitter, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core'
import { EventMessageChatGameModel, UserMessageChatGameModel } from 'common'

@Component({
  selector: 'app-shared-chat',
  templateUrl: './chat.shared.component.html',
  styleUrls: ['./chat.shared.component.scss']
})
export class ChatSharedComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (this.playerMessageEvent) this.playerMessageEvent.subscribe((message: UserMessageChatGameModel) => {
      console.log('allo')
      this.addPlayerMessage(message)
    })

    console.log(this.eventMessageEvent, 'JFFRHGRIUGHIURHGRIUHGRGIHURHRGGRIUGRHU')

    if (this.eventMessageEvent) this.eventMessageEvent.subscribe((message: EventMessageChatGameModel) => {
      console.log('allo')
      this.addEventMessage(message)
    })
  }

  addPlayerMessage(message: UserMessageChatGameModel): void {
    if (this.viewContainerRefTarget && this.playerMessageTemplateRef)
      this.viewContainerRefTarget.createEmbeddedView(this.playerMessageTemplateRef, {
        message: message
      })
  }

  addEventMessage(message: EventMessageChatGameModel): void {
    console.log(this.viewContainerRefTarget)

    if (this.viewContainerRefTarget && this.eventMessageTemplateRef)
      this.viewContainerRefTarget.createEmbeddedView(this.eventMessageTemplateRef, {
        message: message
      })
  }

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @ViewChild('playerMessageTemplate', { read: TemplateRef }) playerMessageTemplateRef!: TemplateRef<any>
  @ViewChild('eventMessageTemplate', { read: TemplateRef }) eventMessageTemplateRef!: TemplateRef<any>

  @Input() title!: string

  @Input() playerMessageEvent!: EventEmitter<UserMessageChatGameModel>
  @Input() eventMessageEvent!: EventEmitter<EventMessageChatGameModel>
}