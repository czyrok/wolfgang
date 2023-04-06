import { DocumentType } from "@typegoose/typegoose"
import { instanceToPlain } from "class-transformer"

import { EmptyMessageChatGameError } from "../../message/error/empty.message.chat.game.error"
import { UndefinedNamespaceGameError } from "../../../error/undefined-namespace.game.error"
import { NotFoundChatGameError } from "../../error/not-found.chat.game.error"

import { UserModelDocument } from "../../../../user/model/user.model"
import { GameModel } from "../../../model/game.model"
import { PlayerGameModel } from "../../../player/model/player.game.model"
import { EventMessageChatGameModel } from "../../message/event/model/event.message.chat.game.model"
import { UserMessageChatGameModel } from "../../message/user/model/user.message.chat.game.model"
import { ChatGameModel, ChatGameModelDocument } from "../../model/chat.game.model"

import { TypeChatGameEnum } from "../../type/enum/type.chat.game.enum"
import { TypeAlertEnum } from "../../../../alert/type/enum/type.alert.enum"

/**
 * Classe qui permet de manager le chat d'une partie
 */
export class ManagerChatGameModel {
    /**
     * Constructeur
     * @param _game Partie où figure le chat
     */
    public constructor(
        private _game: GameModel
    ) { }

    /**
     * @returns Renvoie la partie où figure le chat
     */
    private get game(): GameModel {
        return this._game
    }

    /**
     * 
     * @param player Joueur qui envoie le message
     * @param text Contenue du message
     * @param priorityChatType Type du chat
     * @returns Renvoie true si le message a bien été envoyé, false sinon
     */
    public async sendPlayerMessage(player: PlayerGameModel, text: string, priorityChatType?: TypeChatGameEnum): Promise<boolean> {
        const chatType: TypeChatGameEnum | null | boolean = player.getAvailableChatType(this.game.state, priorityChatType)

        if (chatType === false || chatType === true) return false

        if (!chatType) throw new NotFoundChatGameError

        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.game.gameId, chatType)

        if (!chat) throw new NotFoundChatGameError

        if (text === '') throw new EmptyMessageChatGameError

        const messageDoc: DocumentType<UserMessageChatGameModel> = await chat.sendUserMessage(new UserModelDocument(player.user), text),
            message: Array<UserMessageChatGameModel> = [messageDoc.toObject()]

        if (!this.game.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        this.game.namespace.to(chatType).emit('getChat', messageObj)

        return true
    }

    /**
     * 
     * @param text Contenue du message
     * @param imageUrl Nom de l'image
     * @param alertType Type de l'alerte
     * @param chatType Type du message
     */
    public async sendEventMessage(text: string, imageUrl: string, alertType: TypeAlertEnum, chatType: TypeChatGameEnum = TypeChatGameEnum.ALIVE): Promise<void> {
        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.game.gameId, chatType)

        if (!chat) throw NotFoundChatGameError

        const messageDoc: DocumentType<EventMessageChatGameModel> = await chat.sendEventMessage(text, imageUrl, alertType),
            message: Array<EventMessageChatGameModel> = [messageDoc.toObject()]

        if (!this.game.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        this.game.namespace.to(chatType).emit('getChat', messageObj)
    }
}