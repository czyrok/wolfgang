import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, SocketRequest } from 'ts-socket.io-controller'
import { Ref, DocumentType } from '@typegoose/typegoose'
import { SkinUserModelDocument, CosmeticModelDocument, SkinUserModel, NotEnoughGamePointUserError, UserModel, NotFoundUserError, PurchaseCosmeticModelDocument, CosmeticModel, PurchaseCosmeticModel, SeparatedCosmeticsListFormControllerModel, TypeCosmeticEnum } from 'common'
import { plainToInstance } from 'class-transformer';
import { LeanDocument, Types } from 'mongoose';

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

        const purchasesListObj: Array<DocumentType<PurchaseCosmeticModel>> = await PurchaseCosmeticModelDocument.find({ user: new Types.ObjectId(user.id) }).populate('cosmetic').exec()
        const cosmeticsListObj: Array<DocumentType<CosmeticModel>> = await CosmeticModelDocument.find().exec()

        const ownedCosmeticsList: Array<DocumentType<CosmeticModel>> = new Array

        for (const purchase of purchasesListObj) {
            const cosmetic: any = purchase.cosmetic.valueOf()
            ownedCosmeticsList.push(cosmetic)
        }

        const notOwnedCosmeticsList = cosmeticsListObj.filter((cosmetic) => {
            let test: boolean = false

            for (const ownedCosmetic of ownedCosmeticsList) {
                if (ownedCosmetic.id.toString() === cosmetic.id.toString()) test = true
            }

            return !test
        })

        const finalOwnedCosmeticsList: Array<CosmeticModel> = new Array
        const finalNotOwnedCosmeticsList: Array<CosmeticModel> = new Array

        for (let cosmetic of ownedCosmeticsList) {
            const id: string = cosmetic.id
            cosmetic = cosmetic.toObject()
            cosmetic.id = id
            finalOwnedCosmeticsList.push(cosmetic)
        }

        for (let cosmetic of notOwnedCosmeticsList) {
            const id: string = cosmetic.id
            cosmetic = cosmetic.toObject()
            cosmetic.id = id
            finalNotOwnedCosmeticsList.push(cosmetic)
        }
        return new SeparatedCosmeticsListFormControllerModel(finalOwnedCosmeticsList, finalNotOwnedCosmeticsList)
    }

    @OnMessage()
    @EmitOnFail()
    async purchase(@SocketRequest() req: any, @MessageBody() data: Array<CosmeticModel>) {
        const user: DocumentType<UserModel> = req.user
        const skin: DocumentType<SkinUserModel> | null = await SkinUserModelDocument.findById(user.skin).exec()
        console.log('skin:', skin)
        console.log('user id:', user)
        if (!skin) throw new Error
        console.log('user')
        if (!user) throw new NotFoundUserError
        console.log('for')
        for (const oneCosmetic of data) {
            console.log('data:', data)
            console.log('cosmetic id:', oneCosmetic.id)
            const cosmetic: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(oneCosmetic.id).exec()
            console.log('cosmetic')
            if (!cosmetic) throw new Error
            const purchase: LeanDocument<PurchaseCosmeticModel> | null = await PurchaseCosmeticModelDocument.findOne({ cosmetic: new Types.ObjectId(cosmetic.id), user: new Types.ObjectId(user.id) }).lean().exec()
        
            console.log('purchase', purchase)
            if (purchase !== null) {
                console.log('cosmetic deja acheté')
                await skin.setCosmetic(cosmetic)

            } else {
                console.log('cosmetic non possédé')
                if (user.gamePointCount >= cosmetic.gamePointPrice) {
                    console.log('assez de tutune')
                    user.gamePointCount -= cosmetic.gamePointPrice
                    console.log('setCosmetic')
                    await skin.setCosmetic(cosmetic)
                    console.log('user perd la tutune')
                    await user.updateOne({ gamePointCount: user.gamePointCount })
                    console.log('création achat')
                    const newPurchase: DocumentType<PurchaseCosmeticModel> = new PurchaseCosmeticModelDocument()
                    newPurchase.cosmetic = cosmetic
                    newPurchase.user = user
                    newPurchase.save()
                    console.log('achat fini')
                }
                else {
                    console.log('pas assez de tutune')
                    throw new NotEnoughGamePointUserError
                }
            }
        }
        console.log('fin de purchase')
    }
}

