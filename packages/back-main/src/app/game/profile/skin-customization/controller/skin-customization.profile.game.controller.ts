import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, SocketRequest } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { CosmeticModelDocument, SkinUserModel, NotEnoughGamePointUserError, UserModel, NotFoundUserError, PurchaseCosmeticModelDocument, CosmeticModel, PurchaseCosmeticModel, SeparatedCosmeticsListFormControllerModel } from 'common'
import { plainToInstance } from 'class-transformer';
import { LeanDocument } from 'mongoose';

@SocketController({
    namespace: '/game/profile/skin-customization',
    init: () => { }
})
export class SkinCustomizationProfileGameController {
    @OnConnect()
    connection() {
        console.log('client connected3');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected3');
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    async list() {
        console.log('controller')
        let obj = await CosmeticModelDocument.find().lean().exec()

        return plainToInstance(CosmeticModel, obj)
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    async cosmetics(@SocketRequest() req: any) {
        console.log('controller cosmetic')
        let user: DocumentType<UserModel> = req.user

        if (!user) throw new NotFoundUserError

        const purchasesListObj = await PurchaseCosmeticModelDocument.find({ user: user }).populate('cosmetic').lean().exec()
        const cosmeticsListObj = await CosmeticModelDocument.find().lean().exec()

        const purchasesList = plainToInstance(PurchaseCosmeticModel, purchasesListObj)
        const allCosmeticsList = plainToInstance(CosmeticModel, cosmeticsListObj)

        const ownedCosmeticsList: Array<CosmeticModel> = new Array

        for (const purchase of purchasesList) {
            ownedCosmeticsList.push(purchase.cosmetic as CosmeticModel)
        }

        const notOwnedCosmeticsList = allCosmeticsList.filter((cosmetic) => {
            let test: boolean = false

            for (const ownedCosmetic of ownedCosmeticsList) {
                if (ownedCosmetic.id === cosmetic.id) test = true
            }

            return !test
        })

        return new SeparatedCosmeticsListFormControllerModel(ownedCosmeticsList, notOwnedCosmeticsList)
    }

    @OnMessage()
    @EmitOnFail()
    async purchase(@SocketRequest() req: any, @MessageBody() data: Array<CosmeticModel>) {
        const user: DocumentType<UserModel> = req.user
        const skin: DocumentType<SkinUserModel> = user.skin as DocumentType<SkinUserModel>
        
        if (!user) throw new NotFoundUserError

        for (const oneCosmetic of data) {
            const cosmetic: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(oneCosmetic.id).exec()

            if (!cosmetic) throw new Error

            const purchase: LeanDocument<PurchaseCosmeticModel> | null = await PurchaseCosmeticModelDocument.findOne({ cosmetic: cosmetic, user: user }).lean().exec()

            if (purchase !== null) {
                skin.setCosmetic(cosmetic)

                await skin.save()

            } else {
                if (user.gamePointCount >= cosmetic.gamePointPrice) {
                    user.gamePointCount -= cosmetic.gamePointPrice
                    skin.setCosmetic(cosmetic)

                    await skin.save()
                    await user.save()
                }
                else {
                    throw new NotEnoughGamePointUserError
                }
            }
        }
    }
}

