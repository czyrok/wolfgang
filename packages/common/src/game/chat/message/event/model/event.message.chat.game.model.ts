import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../../../fix/typegoose.fix'

import { MessageChatGameModel } from '../../model/message.chat.game.model'
import { EventMessageChatGameInterface } from '../interface/event.message.chat.game.interface'

@Exclude()
export class EventMessageChatGameModel extends MessageChatGameModel implements EventMessageChatGameInterface {
    @Expose()
    @Prop({ required: true })
    imageUrl!: string
}

export const EventMessageChatGameModelDocument = getModelForClass(EventMessageChatGameModel, { schemaOptions: { collection: 'event_mesage_chat_game' } })