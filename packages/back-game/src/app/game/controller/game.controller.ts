import { Socket, Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import { OnMessage, EmitOnSuccess, SocketController, ConnectedSocket, OnDisconnect, EmitOnFail, MessageBody } from 'ts-socket.io-controller'
import { GameModel, NotFoundUserError, UserModelDocument, TypeMessageChatGameEnum, UserMessageChatGameModelDocument, NotFoundInGamePlayerGameError, UserModel, InitializationGameError, AlreadyInGameUserError, LogUtil, TypeLogEnum, MessageChatFormControllerModel, PlayerGameModel, TypeChatGameEnum, MessageChatGameModel, ChatGameModel, ChatGameModelDocument, VotePlayerGameModel, NotAllowedToSendMessagePlayerGameError, NotFoundChatGameError, EventMessageChatGameModelDocument, UserMessageChatGameModel } from 'common'

@SocketController({
    namespace: `/game/${GameModel.instance.gameId}`,
    init: (io: Namespace) => {
        const game: GameModel = GameModel.instance

        game.onStateChange((game: GameModel) => {
            io.emit('state', instanceToPlain(game.state))
        })

        game.namespace = io
    }
})
export class GameController {
    @OnMessage()
    @EmitOnSuccess()
    state() {
        return GameModel.instance.state
    }

    @OnDisconnect()
    async disconnect(@ConnectedSocket() socket: Socket) {
        LogUtil.logger(TypeLogEnum.GAME).warn('WTF')
        const game: GameModel = GameModel.instance

        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const user: UserModel = userDoc.toObject(),
            test: boolean = game.connectionLost(user, socket.id)

        if (test) {
            await userDoc.updateOne({
                currentGameId: null
            })
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    async leave(@ConnectedSocket() socket: Socket) {
        const game: GameModel = GameModel.instance

        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const user: UserModel = userDoc.toObject(),
            test: boolean = game.connectionLost(user, socket.id)

        if (test) {
            await userDoc.updateOne({ currentGameId: null })

            return true
        }

        return false
    }

    @OnMessage()
    @EmitOnSuccess()
    async join(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        LogUtil.logger(TypeLogEnum.APP).warn('slt1')

        const game: GameModel = GameModel.instance,
            gameId: string | undefined = game.gameId

        LogUtil.logger(TypeLogEnum.APP).warn('slt2')

        if (!gameId) throw new InitializationGameError

        LogUtil.logger(TypeLogEnum.APP).warn('slt3', userDoc.currentGameId)

        if (userDoc.currentGameId && gameId !== userDoc.currentGameId) throw new AlreadyInGameUserError

        LogUtil.logger(TypeLogEnum.APP).warn('slt4')

        if (userDoc.currentGameId !== gameId) {
            await userDoc.updateOne({
                currentGameId: gameId
            })
        }

        LogUtil.logger(TypeLogEnum.APP).warn('slt5', socket.id)

        const user: UserModel = userDoc.toObject(),
            test: boolean = await game.newPlayer(user, socket)

        return test
    }

    @OnMessage()
    @EmitOnSuccess()
    async getChat(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(userDoc.id)

        if (!player) throw new NotFoundInGamePlayerGameError

        const chatTypeList: Array<TypeChatGameEnum> = player.getAllChat()

        let messages: Array<MessageChatGameModel> = new Array

        for (const chatType of chatTypeList) {
            const chatDoc: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(game.gameId, chatType)

            if (!chatDoc) throw new NotFoundChatGameError

            for (const messageDocId of chatDoc.messages) {
                let messageDoc: DocumentType<MessageChatGameModel> | null = await UserMessageChatGameModelDocument.findById(messageDocId).exec()

                if (!messageDoc) messageDoc = await EventMessageChatGameModelDocument.findById(messageDocId).exec()
                if (!messageDoc) continue

                if (messageDoc.type == TypeMessageChatGameEnum.USER) {
                    const userDoc: DocumentType<UserModel> | null = await UserModelDocument.findById((messageDoc as DocumentType<UserMessageChatGameModel>).user)

                    if (userDoc) (messageDoc as DocumentType<UserMessageChatGameModel>).user = userDoc
                }

                messages.push(messageDoc.toObject())
            }
        }

        messages = messages.sort((message1: MessageChatGameModel, message2: MessageChatGameModel) =>
            message1.releaseDate.getTime() - message2.releaseDate.getTime())

        return messages
    }

    @OnMessage()
    @EmitOnFail()
    @EmitOnSuccess()
    async emitMessage(@ConnectedSocket() socket: Socket, @MessageBody() messageForm: MessageChatFormControllerModel) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(userDoc._id)

        if (!player) throw new NotFoundInGamePlayerGameError

        try {
            const test: boolean = await game.sendPlayerMessage(player, messageForm.text, messageForm.chat)

            if (!test) throw new NotAllowedToSendMessagePlayerGameError
        } catch {
            throw new NotAllowedToSendMessagePlayerGameError
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    async playerState(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(userDoc.id)

        if (!player) throw new NotFoundInGamePlayerGameError

        return player
    }

    /* @OnConnect()
    @EmitOnSuccess('get')
    getVote() {
        let handler: HandlerVotePlayerGameModel =  HandlerVotePlayerGameModel.instance
        
        return handler.vote
    }

    @EmitNamespaceBroadcastOnSuccess('get')
    @OnMessage()
    sendVote(@MessageBody() vote: VotePlayerGameModel) {
        let handlervote: HandlerVotePlayerGameModel =  HandlerVotePlayerGameModel.instance
        handlervote.toVote(vote)

        return [vote]
    } */
}