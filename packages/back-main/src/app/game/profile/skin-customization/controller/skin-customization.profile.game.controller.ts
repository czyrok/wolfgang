import { ConnectedSocket, EmitOnFail, EmitOnSuccess, MessageBody, OnMessage, SocketController } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { LeanDocument, Types } from 'mongoose'
import { SkinUserModelDocument, CosmeticModelDocument, SkinUserModel, NotEnoughGamePointUserError, UserModel, NotFoundUserError, PurchaseCosmeticModelDocument, CosmeticModel, PurchaseCosmeticModel, SeparatedCosmeticsListFormControllerModel, NotFoundSkinUserError, NotFoundCosmeticError } from 'common'
import { Socket } from 'socket.io'
import { Request } from 'express'

@SocketController({
    namespace: '/game/profile/:username/skin-customization',
    init: () => { }
})
export class SkinCustomizationProfileGameController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async cosmetics(@ConnectedSocket() socket: Socket) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const purchasesListObj: Array<DocumentType<PurchaseCosmeticModel>> = await PurchaseCosmeticModelDocument.find({ user: new Types.ObjectId(user.id) }).populate('cosmetic').exec()
        const cosmeticsListObj: Array<DocumentType<CosmeticModel>> = await CosmeticModelDocument.find().exec()
        const ownedCosmeticsList: Array<DocumentType<CosmeticModel>> = new Array

        for (const purchase of purchasesListObj) {
            const cosmetic: DocumentType<CosmeticModel> = purchase.cosmetic.valueOf() as DocumentType<CosmeticModel>

            ownedCosmeticsList.push(cosmetic)
        }

        const notOwnedCosmeticsList: Array<DocumentType<CosmeticModel>> = cosmeticsListObj.filter((cosmetic) => {
            let test: boolean = false

            for (const ownedCosmetic of ownedCosmeticsList) {
                if (ownedCosmetic.id.toString() === cosmetic.id.toString()) test = true
            }

            return !test
        })

        const finalOwnedCosmeticsList: Array<CosmeticModel> = new Array
        const finalNotOwnedCosmeticsList: Array<CosmeticModel> = new Array

        for (const cosmeticDoc of ownedCosmeticsList) {
            const cosmetic: CosmeticModel = cosmeticDoc.toObject()

            cosmetic._id = cosmeticDoc.id

            finalOwnedCosmeticsList.push(cosmetic)
        }

        for (const cosmeticDoc of notOwnedCosmeticsList) {
            const cosmetic: CosmeticModel = cosmeticDoc.toObject()

            cosmetic._id = cosmeticDoc.id

            finalNotOwnedCosmeticsList.push(cosmetic)
        }

        return new SeparatedCosmeticsListFormControllerModel(finalOwnedCosmeticsList, finalNotOwnedCosmeticsList)
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async purchase(@ConnectedSocket() socket: Socket, @MessageBody() data: Array<CosmeticModel>) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const skin: DocumentType<SkinUserModel> | null = await SkinUserModelDocument.findById(user.skin).exec()

        if (!skin) throw new NotFoundSkinUserError

        for (const oneCosmetic of data) {
            const cosmetic: DocumentType<CosmeticModel> | null = await CosmeticModelDocument.findById(oneCosmetic._id).exec()

            if (!cosmetic) throw new NotFoundCosmeticError
            
            const purchase: LeanDocument<PurchaseCosmeticModel> | null = await PurchaseCosmeticModelDocument.findOne({ cosmetic: new Types.ObjectId(cosmetic.id), user: new Types.ObjectId(user.id) }).lean().exec()

            if (purchase !== null) {
                await skin.setCosmetic(cosmetic)
            } else {
                if (user.gamePointCount >= cosmetic.gamePointPrice) {
                    user.gamePointCount -= cosmetic.gamePointPrice

                    await skin.setCosmetic(cosmetic)

                    await user.updateOne({ gamePointCount: user.gamePointCount })

                    const newPurchase: DocumentType<PurchaseCosmeticModel> = new PurchaseCosmeticModelDocument()

                    newPurchase.cosmetic = cosmetic
                    newPurchase.user = user

                    newPurchase.save()
                }
                else {
                    throw new NotEnoughGamePointUserError
                }
            }
        }

        return true
    }
}

