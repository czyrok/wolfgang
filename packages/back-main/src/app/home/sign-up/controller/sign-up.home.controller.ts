import { EmitOnFail, OnMessage, SocketController, EmitOnSuccess, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { Socket } from 'socket.io'
import { TypeLogEnum, JWTHelper, UserModelDocument, AlreadyExistUserError, UserModel, LogUtil, SignUpFormControllerModel, SkinUserModel, CosmeticModelDocument, TypeCosmeticEnum, SkinUserModelDocument, PurchaseCosmeticModel, PurchaseCosmeticModelDocument } from 'common'

@SocketController({
    namespace: '/home/sign-up',
    init: () => { }
})
export class SignUpHomeController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async trigger(@ConnectedSocket() socket: Socket, @MessageBody() message: SignUpFormControllerModel) {
        const user: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: message.username }).exec()

        const hatCosmetic = await CosmeticModelDocument.findOne({ type: TypeCosmeticEnum.HAT }).exec()
        const headCosmetic = await CosmeticModelDocument.findOne({ type: TypeCosmeticEnum.HEAD }).exec()
        const topCosmetic = await CosmeticModelDocument.findOne({ type: TypeCosmeticEnum.TOP }).exec()
        const pantsCosmetic = await CosmeticModelDocument.findOne({ type: TypeCosmeticEnum.PANTS }).exec()
        const shoesCosmetic = await CosmeticModelDocument.findOne({ type: TypeCosmeticEnum.SHOES }).exec()
        const skin: DocumentType<SkinUserModel> = new SkinUserModelDocument(new SkinUserModel(hatCosmetic, headCosmetic, topCosmetic, pantsCosmetic, shoesCosmetic))

        if (!hatCosmetic || !headCosmetic || !topCosmetic || !pantsCosmetic || !shoesCosmetic) throw new Error('Cosmetic indefini')

        if (user) throw new AlreadyExistUserError

        const newUser: DocumentType<UserModel> = new UserModelDocument(new UserModel(skin, message.username, message.email, message.password)) as DocumentType<UserModel>
        
        let newPurchase: DocumentType<PurchaseCosmeticModel> = new PurchaseCosmeticModelDocument()

        newPurchase.cosmetic = hatCosmetic
        newPurchase.user = newUser
        newPurchase.save()

        newPurchase = new PurchaseCosmeticModelDocument()

        newPurchase.cosmetic = headCosmetic
        newPurchase.user = newUser
        newPurchase.save()

        newPurchase = new PurchaseCosmeticModelDocument()

        newPurchase.cosmetic = topCosmetic
        newPurchase.user = newUser
        newPurchase.save()

        newPurchase = new PurchaseCosmeticModelDocument()

        newPurchase.cosmetic = pantsCosmetic
        newPurchase.user = newUser
        newPurchase.save()

        newPurchase = new PurchaseCosmeticModelDocument()

        newPurchase.cosmetic = shoesCosmetic
        newPurchase.user = newUser
        newPurchase.save()

        await skin.save()
        await newUser.save()

        LogUtil.logger(TypeLogEnum.LOG_IN).info(`${newUser.username} is signing up`)

        const jwt: string = await JWTHelper.generate(newUser, socket.handshake.address)

        return jwt
    }
}