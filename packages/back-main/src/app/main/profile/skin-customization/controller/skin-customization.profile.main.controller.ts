import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController } from 'ts-socket.io-controller'
import { CosmeticModelDocument, TypeCosmeticEnum, UserModelDocument, PurchaseCosmeticModelDocument, CosmeticModel } from 'common'

import { ListSkinCustomizationProfileMainModel } from '../list/model/list.skin-customization.profile.main.model'

import { NotEnoughGamePointSkinCustomizationProfileMainError } from '../error/not-enough-game-point.skin-customization.profile.main.error'

@SocketController({
    namespace: '/main/profile/Skin-customization',
    init: () => { }
})
export class SkinCustomizationProfileMainController {
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
    list() {
        let list: ListSkinCustomizationProfileMainModel = new ListSkinCustomizationProfileMainModel(
            CosmeticModelDocument.find({
                type: TypeCosmeticEnum.HAT
            }).lean().exec(),
            CosmeticModelDocument.find({
                type: TypeCosmeticEnum.HEAD
            }).lean().exec(),
            CosmeticModelDocument.find({
                type: TypeCosmeticEnum.TOP
            }).lean().exec(),
            CosmeticModelDocument.find({
                type: TypeCosmeticEnum.PANTS
            }).lean().exec(),
            CosmeticModelDocument.find({
                type: TypeCosmeticEnum.SHOES
            }).lean().exec()
        )

        return list
    }

    @OnMessage()
    @EmitOnFail()
    purchase(@MessageBody() data: CosmeticModel) {
        /* let cosmetic = new CosmeticModelDocument(data)
        //recuperer un user
        let user = UserModelDocument.findOne({ id: 1 }).exec()
        //verifie si le chapeu est deja acheter
        let purchase = PurchaseCosmeticModelDocument.find({ cosmetic: cosmetic, user: user })

        if (purchase.length > 0) {
            user.skin.hat = cosmetic
            user.skin.save()
        } else {
            if (user.gamePointCount >= cosmetic.gamePointPrice) {
                user.gamePointCount -= cosmetic.gamePointPrice
                user.skin.hat = cosmetic
                user.skin.save()
                user.save()
            } else {
                throw new NotEnoughGamePointSkinCustomizationProfileMainError()
            }
        } */
    }
}

