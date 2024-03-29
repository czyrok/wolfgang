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
        const req: Request = socket.request as Request,
            token: DocumentType<TokenUserModel> | undefined = req.session.token

        if (!token) throw new NotFoundTokenUserError

        await token.updateOne({ active: false }).exec()

        const user: DocumentType<UserModel> = token.user as DocumentType<UserModel>

        req.session.user = undefined

        LogUtil.logger(TypeLogEnum.ACCESS).info(`${user.username} is disconnecting`)

        return true
    }

    @OnMessage()
    @EmitOnSuccess()
    async getScope(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            scopeAccess: Array<string> = req.session.scopeAccess ?? new Array

        return scopeAccess
    }
}