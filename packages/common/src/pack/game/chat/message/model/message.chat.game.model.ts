import { Exclude, Expose } from 'class-transformer'
import { prop, getModelForClass } from '@typegoose/typegoose'

import { DocumentModel } from '../../../../model/document.model'

import { MessageChatGameInterface } from '../interface/message.chat.game.interface'
import { TypeMessageChatGameEnum } from '../type/enum/type.message.chat.game.enum'

/**
 * Classe qui créer le message d'un chat
 */
@Exclude()
export class MessageChatGameModel extends DocumentModel implements MessageChatGameInterface {
    @Expose()
    @prop({ required: true })
    type!: TypeMessageChatGameEnum

    @Expose()
    @prop({ required: true })
    text!: string

    @Expose()
    @prop({ required: true })
    releaseDate!: Date

    /**
     * Constructeur
     * @param type Type du message
     * @param text Contenue du message
     */
    public constructor(type: TypeMessageChatGameEnum, text: string) {
        super()

        this.type = type
        this.text = text
        this.releaseDate = new Date()
    }
}

export const MessageChatGameModelDocument = getModelForClass(MessageChatGameModel, { schemaOptions: { collection: 'message_chat_game' } })