import { EmitOnSuccess, MessageBody, OnConnect, OnMessage, SocketController, ConnectedSocket, EmitOnFail } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { Socket } from 'socket.io'
import { Request } from 'express'
import { TypeChatGameEnum, ChatGameModelDocument, MessageChatFormControllerModel, GameModel, ChatGameModel, UserModel, NotFoundUserError, PlayerGameModel, MessageChatGameModel, LogUtil, TypeLogEnum } from 'common'

@SocketController({
    namespace: `/game/${GameModel.instance.gameId}/chat`,
    init: () => {
        LogUtil.logger(TypeLogEnum.GAME).warn('CONSOLE DE EMRDE1')
    }
})
export class ChatGameController {
    @OnConnect()
    async conn() {
        LogUtil.logger(TypeLogEnum.GAME).warn('CONSOLE DE EMRDE')
    }
}