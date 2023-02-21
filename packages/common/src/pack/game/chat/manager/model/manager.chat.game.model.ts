import { DocumentType } from "@typegoose/typegoose"
import { instanceToPlain } from "class-transformer"

import { UndefinedNamespaceGameError } from "../../../error/undefined-namespace.game.error"
import { NotFoundChatGameError } from "../../error/not-found.chat.game.error"

import { UserModelDocument } from "../../../../user/model/user.model"
import { GameModel } from "../../../model/game.model"
import { PlayerGameModel } from "../../../player/model/player.game.model"
import { EventMessageChatGameModel } from "../../message/event/model/event.message.chat.game.model"
import { UserMessageChatGameModel } from "../../message/user/model/user.message.chat.game.model"
import { ChatGameModel, ChatGameModelDocument } from "../../model/chat.game.model"

import { TypeChatGameEnum } from "../../type/enum/type.chat.game.enum"

export class ManagerChatGameModel {
    public constructor(
        private _game: GameModel
    ) { }

    private get game(): GameModel {
        return this._game
    }

    public async sendPlayerMessage(player: PlayerGameModel, text: string, priorityChatType?: TypeChatGameEnum): Promise<boolean> {
        const chatType: TypeChatGameEnum | null | boolean = player.getAvailableChatType(this.game.state, priorityChatType)

        if (chatType === false || chatType === true) return false

        if (!chatType) throw new NotFoundChatGameError

        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.game.gameId, chatType)

        if (!chat) throw new NotFoundChatGameError

        const messageDoc: DocumentType<UserMessageChatGameModel> = await chat.sendUserMessage(new UserModelDocument(player.user), text),
            message: Array<UserMessageChatGameModel> = [messageDoc.toObject()]

        if (!this.game.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        this.game.namespace.to(chatType).emit('getChat', messageObj)

        return true
    }

    public async sendEventMessage(text: string, imageUrl: string): Promise<void> {
        const chat: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(this.game.gameId, TypeChatGameEnum.ALIVE)

        if (!chat) throw NotFoundChatGameError

        const messageDoc: DocumentType<EventMessageChatGameModel> = await chat.sendEventMessage(text, imageUrl),
            message: Array<EventMessageChatGameModel> = [messageDoc.toObject()]

        if (!this.game.namespace) throw new UndefinedNamespaceGameError

        const messageObj: any = instanceToPlain(message)

        this.game.namespace.to(TypeChatGameEnum.ALIVE).emit('getChat', messageObj)
    }
}