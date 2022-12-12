import { prop, getModelForClass, Ref, ReturnModelType, plugin } from '@typegoose/typegoose'
import * as findOrCreate from 'mongoose-findorcreate'
import { Exclude, Expose } from 'class-transformer'
import { DocumentModel, CollectionName } from 'common'

import { MessageChatGameModel, MessageChatGameModelDocument } from '../message/model/message.chat.game.model'

import { ChatGameInterface } from '../interface/chat.game.interface'

import { TypeChatGameEnum } from '../type/enum/type.chat.game.enum'

@Exclude()
@plugin(findOrCreate)
@CollectionName()
export class ChatGameModel extends DocumentModel implements ChatGameInterface {
    @Expose()
    @prop({ required: true })
    gameId!: string

    @Expose()
    @prop({ required: true })
    type!: TypeChatGameEnum

    @Expose()
    @prop({ ref: () => MessageChatGameModel, default: new Array })
    message!: Array<Ref<MessageChatGameModel>>

    public static async getChat(this: ReturnModelType<typeof ChatGameModelDocument>, type: TypeChatGameEnum, gameId: string): Promise<any> {
        return await this.findOrCreate({
            type: type,
            gameId: gameId
        }).exec()
    }

    public static async addMessage(this: ReturnModelType<typeof ChatGameModelDocument>, chat: any, message: MessageChatGameModel) {
        chat.message.push(new MessageChatGameModelDocument(message))

        chat.save()
    }
}

export const ChatGameModelDocument = getModelForClass(ChatGameModel)