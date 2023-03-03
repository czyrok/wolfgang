import { Component, Input, EventEmitter, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core'
import { EventMessageChatGameModel, UserMessageChatGameModel } from 'common'

@Component({
  selector: 'app-shared-chat',
  templateUrl: './chat.shared.component.html',
  styleUrls: ['./chat.shared.component.scss']
})
/**
 * @classdesc Gère le chat
 * @implements AfterViewInit
 */
export class ChatSharedComponent implements AfterViewInit {
  /**
   * S'abonne au différent type de message
   */
  ngAfterViewInit(): void {
    if (this.playerMessageEvent) this.playerMessageEvent.subscribe((message: UserMessageChatGameModel) => {
      this.addPlayerMessage(message)
    })

    if (this.eventMessageEvent) this.eventMessageEvent.subscribe((message: EventMessageChatGameModel) => {
      this.addEventMessage(message)
    })
  }

  /**
   * Ajoute le message d'un utilisateur dans le chat
   * @param message Message envoyé par un utilisateur
   */
  addPlayerMessage(message: UserMessageChatGameModel): void {
    if (this.viewContainerRefTarget && this.playerMessageTemplateRef)
      this.viewContainerRefTarget.createEmbeddedView(this.playerMessageTemplateRef, {
        message: message
      })
  }

  /**
   * Ajoute le message d'un evenement dans le chat
   * @param message Message d'un évenement
   */
  addEventMessage(message: EventMessageChatGameModel): void {
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
