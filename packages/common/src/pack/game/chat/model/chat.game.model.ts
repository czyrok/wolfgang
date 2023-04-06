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

/**
 * Classe qui créer un chat d'une partie
 */
export class ChatGameModel extends DocumentModel implements ChatGameInterface {
    @prop({ required: true })
    gameId!: string

    @prop({ required: true })
    type!: TypeChatGameEnum

    @prop({ required: true })
    modeType!: TypeModeChatGameEnum

    @prop({ ref: () => MessageChatGameModel, default: new Array })
    messages!: Array<Ref<MessageChatGameModel>>

    /**
     * Fonction qui créer un message
     * @param this Le chat lui-même
     * @param gameId Id de la partie
     * @param type Type du chat
     * @param modeType Mode du chat
     * @returns Renvoie le chat créée
     */
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

    /**
     * Fonction qui permet de récupérer le chat
     * @param gameId Id de la partie
     * @param type Type du chat
     * @returns Renvoie le chat
     */
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

    /**
     * Fonction qui créée et renvoie un message d'un utilisateur
     * @param this Le chat lui-même
     * @param user Utilisateur
     * @param text Contenue du message
     * @returns Renvoie le message créée
     */
    public async sendUserMessage(this: DocumentType<ChatGameModel>, user: DocumentType<UserModel>, text: string): Promise<DocumentType<UserMessageChatGameModel>> {
        const message: DocumentType<UserMessageChatGameModel> = new UserMessageChatGameModelDocument(new UserMessageChatGameModel(TypeMessageChatGameEnum.USER, text))

        message.user = user

        await message.save()

        this.messages.push(message)

        await this.save()

        return message
    }

    /**
     * Focntion qui créée et renvoie un message événementiel
     * @param this Le chat lui-même
     * @param text Contenue du message
     * @param imageUrl Nom de l'image
     * @param alertType Type de l'alerte
     * @returns Renvoie le message créée
     */
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