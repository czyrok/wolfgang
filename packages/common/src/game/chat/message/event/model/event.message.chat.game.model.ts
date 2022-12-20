import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { MessageChatGameModel } from '../../model/message.chat.game.model'
import { EventMessageChatGameInterface } from '../interface/event.message.chat.game.interface'

@Exclude()
@modelOptions({ schemaOptions: { collection: "event_mesage_chat_game" } })
export class EventMessageChatGameModel extends MessageChatGameModel implements EventMessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    imageUrl!: string
}

export const EventMessageChatGameModelDocument = getModelForClass(EventMessageChatGameModel)