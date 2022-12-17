import { prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../../model/document.model'

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