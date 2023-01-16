import { EmitOnFail, OnMessage, SocketController, EmitOnSuccess, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { Socket } from 'socket.io'
import { TypeLogEnum, JWTHelper, UserModelDocument, AlreadyExistUserError, UserModel, LogUtil, SignUpFormControllerModel } from 'common'

@SocketController({
    namespace: '/home/sign-up',
    init: () => { }
})
export class SignUpHomeController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async trigger(@ConnectedSocket() socket: Socket, @MessageBody() message: SignUpFormControllerModel) {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: message.username })

        if (user) throw new AlreadyExistUserError

        const newUser: DocumentType<UserModel> = new UserModelDocument(new UserModel(message.username, message.email, message.password)) as DocumentType<UserModel>

        await newUser.save()

        LogUtil.logger(TypeLogEnum.LOG_IN).info(`${newUser.username} is signing up`)

        return JWTHelper.generate(newUser, socket.handshake.address)
    }
}