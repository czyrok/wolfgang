import { DocumentType } from '@typegoose/typegoose'
import { plainToInstance } from 'class-transformer'
import { CosmeticModel, CosmeticModelDocument, NotFoundUserError, SkinUserModel, SkinUserModelDocument, UserModel, UserModelDocument, NotFoundSkinUserError, NotFoundCosmeticError } from 'common'
import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'ts-socket.io-controller'


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
        const obj = await UserModelDocument.findOne({
            username: username
        }).populate('skin').lean().exec()

        if (!obj) throw new NotFoundUserError

        return plainToInstance(UserModel, obj)
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async skin(@MessageBody() username: string) {
        const user = await UserModelDocument.findOne({
            username: username
        }).populate('skin').lean().exec()

        if (!user) throw new NotFoundUserError

        const skin: DocumentType<SkinUserModel> | null = await SkinUserModelDocument.findById(user.skin).exec()

        if (!skin) throw new NotFoundSkinUserError

        const hat: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(skin.hat).exec(),
            head: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(skin.head).exec(),
            top: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(skin.top).exec(),
            pants: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(skin.pants).exec(),
            shoes: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(skin.shoes).exec()

        if (hat === null || head === null || top === null || pants === null || shoes === null) throw new NotFoundCosmeticError

        const cosmeticsList: Array<CosmeticModel> = [
            hat.toObject(),
            head.toObject(),
            top.toObject(),
            pants.toObject(),
            shoes.toObject()
        ]

        return cosmeticsList
    }
}