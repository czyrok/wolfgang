import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../../decorator/collection-name.decorator'
import { MessageChatGameModel } from '../../model/message.chat.game.model'
import { EventMessageChatGameInterface } from '../interface/event.message.chat.game.interface'

@Exclude()
@CollectionName()
export class EventMessageChatGameModel extends MessageChatGameModel implements EventMessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    imageUrl!: string
}

export const EventMessageChatGameModelDocument = getModelForClass(EventMessageChatGameModel)