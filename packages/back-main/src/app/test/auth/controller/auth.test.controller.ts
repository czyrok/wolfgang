import { Socket } from 'socket.io'
import { ConnectedSocket, EmitOnSuccess, OnMessage, SocketController } from 'ts-socket.io-controller'
import { LogUtil, NotFoundUserError, TypeLogEnum, UserModel } from 'common'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'

@SocketController({
    namespace: '/test/auth',
    init: () => { }
})
export class AuthTestController {
    @OnMessage()
    @EmitOnSuccess()
    trigger(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> = req.user as DocumentType<UserModel>

        if (!user) throw new NotFoundUserError

        LogUtil.logger(TypeLogEnum.ACCESS).info(`${user.username} is making authentification test`)

        return user.username
    }
}