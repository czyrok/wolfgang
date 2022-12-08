import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { ChatGameInterface } from '../interface/chat.game.interface'
import { MessageChatGameModel } from '../message/model/message.chat.game.model'

@Exclude()
@CollectionName()
export class ChatGameModel extends DocumentModel implements ChatGameInterface {
    @Expose()
    @prop({ required: true })
    key!: string

    @Expose()
    @prop({ required: true, ref: () => MessageChatGameModel })
    message!: Ref<MessageChatGameModel>
}

export const ChatGameModelDocument = getModelForClass(ChatGameModel)