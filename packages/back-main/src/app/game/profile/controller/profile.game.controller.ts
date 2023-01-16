import { plainToInstance } from 'class-transformer'
import { UserModel, UserModelDocument } from 'common';
import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'


@SocketController({
    namespace: '/game/profile',
    init: () => { }
})
export class ProfileGameController {
    @OnConnect()
    connection() {
        console.log('client connected');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @OnMessage()
    async view(@MessageBody() username: string) {
        let obj = await UserModelDocument.findById(username).populate('user', 'skin').lean().exec()
        let user: UserModel = plainToInstance(UserModel, obj)
        return user
    }
}