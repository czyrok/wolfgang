import { Socket } from 'socket.io'
import { ConnectedSocket, EmitOnSuccess, OnMessage, SocketController } from 'ts-socket.io-controller'
import { Request } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import { LogUtil, NotFoundTokenUserError, NotFoundUserError, TokenUserModel, TypeLogEnum, UserModel } from 'common'

@SocketController({
    namespace: '/auth',
    init: () => { }
})
export class AuthController {
    @OnMessage()
    @EmitOnSuccess()
    test(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        LogUtil.logger(TypeLogEnum.ACCESS).info(`${user.username} is making authentification test`)

        return user.username
    }

    @OnMessage()
    @EmitOnSuccess()
    async logOut(@ConnectedSocket() socket: Socket) {
        console.log('dddjjj')
        const req: Request = socket.request as Request,
            token: DocumentType<TokenUserModel> | undefined = req.session.token

        if (!token) throw new NotFoundTokenUserError

        token.active = false

        await token.save()

        const user: DocumentType<UserModel> = token.user as DocumentType<UserModel>

        LogUtil.logger(TypeLogEnum.ACCESS).info(`${user.username} is disconnecting`)
    }
}