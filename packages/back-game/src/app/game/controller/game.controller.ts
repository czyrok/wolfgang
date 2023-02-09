import { Socket, Namespace } from 'socket.io'
import { instanceToPlain } from 'class-transformer'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import { OnMessage, EmitOnSuccess, SocketController, ConnectedSocket, OnDisconnect, EmitOnFail, MessageBody } from 'ts-socket.io-controller'
import { GameModel, NotFoundUserError, HandlerVotePlayerGameModel, UserModel, InitializationGameError, AlreadyInGameUserError, LogUtil, TypeLogEnum, MessageChatFormControllerModel, PlayerGameModel, TypeChatGameEnum, MessageChatGameModel, ChatGameModel, ChatGameModelDocument, VotePlayerGameModel } from 'common'

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
        LogUtil.logger(TypeLogEnum.GAME).warn('IL EST PASSE PAR LA1')
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            // ne fonctione pas
            player: PlayerGameModel | null = game.checkPlayer(userDoc.id)

        LogUtil.logger(TypeLogEnum.GAME).warn('IL EST PASSE PAR LA2', userDoc.id)

        // #achan
        if (!player) return []

        LogUtil.logger(TypeLogEnum.GAME).warn('IL EST PASSE PAR LA3')

        const chatTypeList: Array<TypeChatGameEnum> = game.getChatOfPlayer(player)

        const messages: Array<MessageChatGameModel> = new Array

        for (const chatType of chatTypeList) {
            const chatDoc: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(GameModel.instance.id, chatType)

            // #achan
            if (!chatDoc) throw new Error

            await chatDoc.populate('messages', 'user')

            const chat: ChatGameModel = chatDoc.toObject()

            messages.push(...chat.messages as Array<MessageChatGameModel>)
        }

        LogUtil.logger(TypeLogEnum.GAME).warn('IL EST PASSE PAR LA8')

        LogUtil.logger(TypeLogEnum.GAME).warn('IL EST PASSE PAR LA')

        return messages
    }

    @OnMessage()
    @EmitOnFail()
    @EmitOnSuccess()
    async emitMessage(@ConnectedSocket() socket: Socket, @MessageBody() messageForm: MessageChatFormControllerModel) {
        LogUtil.logger(TypeLogEnum.GAME).fatal('playeremit')
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        LogUtil.logger(TypeLogEnum.GAME).fatal('playeremit2')

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(userDoc.id)

        // #achan
        if (!player) throw new Error('Vous ne faites pas partie de la partie')

        LogUtil.logger(TypeLogEnum.GAME).fatal('playeremit3', player.user._id)

        const test: boolean = await game.sendPlayerMessage(player, messageForm.chat, messageForm.text)

        LogUtil.logger(TypeLogEnum.GAME).fatal('playeremit4', test)

        // #achan
        if (!test) throw new Error('Vous ne pouvez pas envoyer de message')

        return true
    }

    @OnMessage()
    @EmitOnSuccess()
    async playerState(@ConnectedSocket() socket: Socket) {
        LogUtil.logger(TypeLogEnum.GAME).warn('player')
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(userDoc.id)

        LogUtil.logger(TypeLogEnum.GAME).warn('player2', player)

        // #achan
        if (!player) return undefined

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