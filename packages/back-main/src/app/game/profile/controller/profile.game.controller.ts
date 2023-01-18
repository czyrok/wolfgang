import { DocumentType } from '@typegoose/typegoose';
import { plainToInstance } from 'class-transformer'
import { NotFoundUserError, UserModel, UserModelDocument } from 'common';
import { LeanDocument } from 'mongoose';
import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'


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

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() username: string) {
        const obj = await UserModelDocument.findOne({
            username: username
        }).populate('skin').lean().exec()

        if (!obj) throw new NotFoundUserError
        
        return plainToInstance(UserModel, obj)
    }
}