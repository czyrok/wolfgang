import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../../fix/typegoose.fix'

import { DocumentModel } from '../../../../model/document.model'

import { MessageChatGameInterface } from '../interface/message.chat.game.interface'

@Exclude()
export class MessageChatGameModel extends DocumentModel implements MessageChatGameInterface {
    @Expose()
    @Prop({ required: true })
    text!: string

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const MessageChatGameModelDocument = getModelForClass(MessageChatGameModel, { schemaOptions: { collection: 'message_chat_game' } })