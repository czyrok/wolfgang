import { Ref, prop, getModelForClass, DocumentType, ReturnModelType } from '@typegoose/typegoose'

import { DocumentModel } from '../../../model/document.model'
import { MessageChatGameModel } from '../message/model/message.chat.game.model'
import { UserMessageChatGameModel, UserMessageChatGameModelDocument } from '../message/user/model/user.message.chat.game.model'
import { UserModel } from '../../../user/model/user.model'
import { EventMessageChatGameModel, EventMessageChatGameModelDocument } from '../message/event/model/event.message.chat.game.model'

import { ChatGameInterface } from '../interface/chat.game.interface'

import { TypeChatGameEnum } from '../type/enum/type.chat.game.enum'
import { TypeModeChatGameEnum } from '../mode/type/enum/type.mode.chat.game.enum'
import { TypeMessageChatGameEnum } from '../message/type/enum/type.message.chat.game.enum'
import { TypeAlertEnum } from '../../../alert/type/enum/type.alert.enum'

export class ChatGameModel extends DocumentModel implements ChatGameInterface {
    @prop({ required: true })
    gameId!: string

    @prop({ required: true })
    type!: TypeChatGameEnum

    @prop({ required: true })
    modeType!: TypeModeChatGameEnum

    @prop({ ref: () => MessageChatGameModel, default: new Array })
    messages!: Array<Ref<MessageChatGameModel>>

    public static async createChat(
        this: ReturnModelType<typeof ChatGameModel>,
        gameId: string,
        type: TypeChatGameEnum,
        modeType: TypeModeChatGameEnum
    ): Promise<DocumentType<ChatGameModel> | null> {
        let chat: DocumentType<ChatGameModel> | null = await this.findOne({
            gameId: gameId,
            type: type
        }).exec()

        if (!chat) {
            chat = new ChatGameModelDocument({
                gameId: gameId,
                type: type,
                modeType: modeType
            })

            await chat.save()
        }

        return chat
    }

    public static async getChat(
        gameId: string,
        type: TypeChatGameEnum
    ): Promise<DocumentType<ChatGameModel> | null> {
        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.findOne({
            gameId: gameId,
            type: type
        }).populate('messages.message.user').exec()

        return chat
    }

    public async sendUserMessage(this: DocumentType<ChatGameModel>, user: DocumentType<UserModel>, text: string): Promise<DocumentType<UserMessageChatGameModel>> {
        const message: DocumentType<UserMessageChatGameModel> = new UserMessageChatGameModelDocument(new UserMessageChatGameModel(TypeMessageChatGameEnum.USER, text))

        message.user = user

        await message.save()

        this.messages.push(message)

        await this.save()

        return message
    }

    public async sendEventMessage(this: DocumentType<ChatGameModel>, text: string, imageUrl: string, alertType: TypeAlertEnum): Promise<DocumentType<EventMessageChatGameModel>> {
        const message: DocumentType<EventMessageChatGameModel>
            = new EventMessageChatGameModelDocument(new EventMessageChatGameModel(TypeMessageChatGameEnum.EVENT, text, imageUrl, alertType))

        await message.save()

        this.messages.push(message)

        await this.save()

        return message
    }
}

export const ChatGameModelDocument = getModelForClass(ChatGameModel, { schemaOptions: { collection: 'chat_game' } })