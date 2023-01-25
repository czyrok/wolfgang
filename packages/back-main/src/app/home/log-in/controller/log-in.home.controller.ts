import { EmitOnFail, OnMessage, SocketController, EmitOnSuccess, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { Socket } from 'socket.io'
import { TypeLogEnum, JWTHelper, InvalidPasswordUserError, UserModelDocument, NotFoundUserError, UserModel, LogInFormControllerModel, LogUtil } from 'common'

@SocketController({
    namespace: '/home/log-in',
    init: () => { }
})
export class LogInHomeController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async trigger(@ConnectedSocket() socket: Socket, @MessageBody() message: LogInFormControllerModel) {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: message.username }).exec()

        if (!user) throw new NotFoundUserError

        let is: boolean = await user.verifyPassword(message.password)

        if (!is) throw new InvalidPasswordUserError

        LogUtil.logger(TypeLogEnum.LOG_IN).info(`${user.username} is connecting`)

        return JWTHelper.generate(user, socket.handshake.address)
    }
}