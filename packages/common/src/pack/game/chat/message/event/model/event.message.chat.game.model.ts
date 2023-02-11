import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { MessageChatGameModel } from '../../model/message.chat.game.model'
import { EventMessageChatGameInterface } from '../interface/event.message.chat.game.interface'

@Exclude()
export class EventMessageChatGameModel extends MessageChatGameModel implements EventMessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    imageUrl!: string

    public constructor(text: string, imageUrl: string) {
        super(text)

        this.imageUrl = imageUrl
    }
}

export const EventMessageChatGameModelDocument = getModelForClass(EventMessageChatGameModel, { schemaOptions: { collection: 'event_mesage_chat_game' } })