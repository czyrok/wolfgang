import { DocumentType } from '@typegoose/typegoose'
import { instanceToPlain } from 'class-transformer'
import { Request } from 'express'
import { Namespace, Socket } from 'socket.io'
import { ConnectedSocket, EmitOnFail, EmitOnSuccess, MessageBody, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { NotAllowedToVotePlayerGameError, NotAllowedToVoteHimPlayerGameError, NotHisTurnPlayerGameError, AlreadyInGameUserError, ChatGameModel, ChatGameModelDocument, EventMessageChatGameModelDocument, GameModel, InitializationGameError, MessageChatFormControllerModel, MessageChatGameModel, NotAllowedToSendMessagePlayerGameError, NotFoundChatGameError, NotFoundInGamePlayerGameError, NotFoundUserError, PlayerGameModel, TypeChatGameEnum, TypeMessageChatGameEnum, TypeVotePlayerGameEnum, UserMessageChatGameModel, UserMessageChatGameModelDocument, UserModel, UserModelDocument, VoteFormControllerModel, VotePlayerGameModel, TypeBehaviorItemLoopGameEnum } from 'common'

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
        const game: GameModel = GameModel.instance

        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const user: UserModel = userDoc.toObject(),
            test: boolean = game.leaveGame(user, socket.id)

        if (test) {
            await userDoc.updateOne({
                currentGameId: null
            })
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    async leave(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            userDoc: DocumentType<UserModel> | undefined = req.session.user

        if (!userDoc) throw new NotFoundUserError

        const game: GameModel = GameModel.instance

        const user: UserModel = userDoc.toObject(),
            test: boolean = game.leaveGame(user, socket.id)

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

        const game: GameModel = GameModel.instance,
            gameId: string | undefined = game.gameId

        if (!gameId) throw new InitializationGameError

        if (userDoc.currentGameId && gameId !== userDoc.currentGameId) throw new AlreadyInGameUserError

        if (userDoc.currentGameId !== gameId) {
            await userDoc.updateOne({
                currentGameId: gameId
            })
        }

        const user: UserModel = userDoc.toObject(),
            test: boolean = await game.joinGame(user, socket)

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
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(user._id)

        if (!player) throw new NotFoundInGamePlayerGameError

        try {
            const test: boolean = await game.chatManager.sendPlayerMessage(player, messageForm.text, messageForm.chat)

            if (!test) throw new NotAllowedToSendMessagePlayerGameError
        } catch {
            throw new NotAllowedToSendMessagePlayerGameError
        }
    }

    @OnMessage()
    @EmitOnSuccess()
    async playerState(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(user._id)

        if (!player) throw new NotFoundInGamePlayerGameError

        return player
    }

    @OnMessage()
    @EmitOnSuccess()
    getVote(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(user._id)

        if (!player) throw new NotFoundInGamePlayerGameError

        const test: TypeBehaviorItemLoopGameEnum | undefined = player.hisTurn(game.state.currentBehaviorType)

        if (!test) throw new NotHisTurnPlayerGameError

        return game.voteStorage.votesList
    }

    @OnMessage()
    @SkipEmitOnEmptyResult()
    @EmitOnSuccess()
    async votingAction(@ConnectedSocket() socket: Socket, @MessageBody() vote: VoteFormControllerModel) {
        const votingUser: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: vote.votingPlayer }).exec(),
            votedUser: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: vote.votedPlayer }).exec()

        if (!votingUser || !votedUser) throw new NotFoundUserError

        const game: GameModel = GameModel.instance

        const votingPlayer: PlayerGameModel | null = game.checkPlayer(votingUser._id),
            votedPlayer: PlayerGameModel | null = game.checkPlayer(votedUser._id)

        if (!votingPlayer || !votedPlayer) throw new NotFoundInGamePlayerGameError

        const behaviorType: TypeBehaviorItemLoopGameEnum | undefined = votingPlayer.hisTurn(game.state.currentBehaviorType)

        if (!behaviorType) throw new NotHisTurnPlayerGameError

        if (votingPlayer.isDead) throw new NotAllowedToVotePlayerGameError
        if (votedPlayer.isDead) throw new NotAllowedToVoteHimPlayerGameError

        // #achan mettre en place la gestion du message
        const hasVotedBefore: boolean = game.voteStorage.toVote(new VotePlayerGameModel(votingPlayer, votedPlayer, '', TypeVotePlayerGameEnum.DEFAULT))

        if (game.state.currentBehaviorType.length > 1) {
            if (hasVotedBefore) socket.emit('unvotingAction', instanceToPlain(votingPlayer.user.username))

            return vote
        }

        game.namespace?.to(behaviorType).emit('unvotingAction', instanceToPlain(votingPlayer.user.username))
        game.namespace?.to(behaviorType).emit('votingAction', instanceToPlain(vote))
    }

    @OnMessage()
    @SkipEmitOnEmptyResult()
    @EmitOnSuccess()
    unvotingAction(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const game: GameModel = GameModel.instance,
            player: PlayerGameModel | null = game.checkPlayer(user._id)

        if (!player) throw new NotFoundInGamePlayerGameError

        const behaviorType: TypeBehaviorItemLoopGameEnum | undefined = player.hisTurn(game.state.currentBehaviorType)

        if (!behaviorType) throw new NotHisTurnPlayerGameError

        const isRemoved: boolean = game.voteStorage.removeVoteOfPlayer(player)

        if (!isRemoved) return

        if (game.state.currentBehaviorType.length > 1) return player.user.username

        game.namespace?.to(behaviorType).emit('unvotingAction', instanceToPlain(player.user.username))
    }
}