import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { CosmeticModelDocument, SkinUserModel, NotEnoughGamePointUserError, UserModel, NotFoundUserError, UserModelDocument, PurchaseCosmeticModelDocument, CosmeticModel } from 'common'

@SocketController({
    namespace: '/game/profile/Skin-customization',
    init: () => { }
})
export class SkinCustomizationProfileGameController {
    @OnConnect()
    connection() {
        console.log('client connected');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    async list() {
        return await CosmeticModelDocument.find().lean().exec()
    }

    @OnMessage()
    @EmitOnFail()
    async purchase(@MessageBody() data: CosmeticModel) {
        const cosmetic = new CosmeticModelDocument(data),
            // #achan
            user: DocumentType<UserModel> | null = await UserModelDocument.findById('1').populate('skin', [
                'hat',
                'head',
                'top',
                'pants',
                'shoes'
            ]).exec()

        if (!user) throw new NotFoundUserError

        const purchase = PurchaseCosmeticModelDocument.find({ cosmetic: cosmetic, user: user }),
            skin: DocumentType<SkinUserModel> = user.skin as DocumentType<SkinUserModel>

        if (purchase.length > 0) {
            skin.setCosmetic(cosmetic)

            await skin.save()
        } else {
            if (user.gamePointCount >= cosmetic.gamePointPrice) {
                user.gamePointCount -= cosmetic.gamePointPrice

                skin.setCosmetic(cosmetic)

                await skin.save()
                await user.save()
            } else {
                throw new NotEnoughGamePointUserError
            }
        }
    }
}

