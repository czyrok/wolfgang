import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChatSharedComponent } from './component/chat.shared.component'
import { EventMessageChatSharedComponent } from './message/event/component/event.message.chat.shared.component'
import { PlayerMessageChatSharedComponent } from './message/player/component/player.message.chat.shared.component'

@NgModule({
  declarations: [
    ChatSharedComponent,
    EventMessageChatSharedComponent,
    PlayerMessageChatSharedComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChatSharedComponent,
    EventMessageChatSharedComponent,
    PlayerMessageChatSharedComponent
  ]
})

export class ChatSharedModule { }
