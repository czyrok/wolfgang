import { prop, getModelForClass, Ref, ReturnModelType } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { DocumentModel, CollectionName } from 'common'

import { MessageChatGameModel, MessageChatGameModelDocument } from '../message/model/message.chat.game.model'

import { ChatGameInterface } from '../interface/chat.game.interface'

import { TypeChatGameEnum } from '../type/enum/type.chat.game.enum'

@Exclude()
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

    // #achan
    public static async getChat(this: ReturnModelType<typeof ChatGameModelDocument>, gameId: string, type: TypeChatGameEnum): Promise<any> {
        let chat: any = this.findOne({
            gameId: gameId,
            type: type
        }).exec()

        if (chat === null) {
            chat = new ChatGameModelDocument({
                gameId: gameId,
                type: type
            })

            chat.save()
        }

        return chat
    }

    // #achan
    public static async addMessage(this: ReturnModelType<typeof ChatGameModelDocument>, chat: any, message: MessageChatGameModel) {
        // #averif
        chat.message.push(new MessageChatGameModelDocument(message))

        chat.save()
    }
}

export const ChatGameModelDocument = getModelForClass(ChatGameModel)