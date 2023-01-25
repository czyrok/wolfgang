import { DocumentType } from '@typegoose/typegoose'
import { plainToInstance } from 'class-transformer'
import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'ts-socket.io-controller'
import { NotFoundUserError, UserModel, UserModelDocument } from 'common'
import { LeanDocument } from 'mongoose';


@SocketController({
    namespace: '/game/profile',
    init: () => { }
})
export class ProfileGameController {
    @OnConnect()
    connection() {
        console.log('client connected2');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected2');
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@MessageBody() username: string) {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findOne({
            username: username
        }).exec()

        if (!user) throw new NotFoundUserError

        return true
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() username: string) {
        const obj: LeanDocument<UserModel> | null = await UserModelDocument.findOne({
            username: username
        }).populate('skin').lean().exec()

        if (!obj) throw new NotFoundUserError

        return plainToInstance(UserModel, obj)
    }
}