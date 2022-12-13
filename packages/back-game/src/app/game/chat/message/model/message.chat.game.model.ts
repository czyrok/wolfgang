import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { DocumentModel, CollectionName } from 'common'

import { MessageChatGameInterface } from '../interface/message.chat.game.interface'

@Exclude()
@CollectionName()
export class MessageChatGameModel extends DocumentModel implements MessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    text!: string

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const MessageChatGameModelDocument = getModelForClass(MessageChatGameModel)