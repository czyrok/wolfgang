import { DocumentType } from '@typegoose/typegoose'
import { plainToInstance } from 'class-transformer'
import { CosmeticModel, CosmeticModelDocument, NotFoundUserError, SkinUserModel, SkinUserModelDocument, UserModel, UserModelDocument } from 'common'
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

        let skin: DocumentType<SkinUserModel> | null = await SkinUserModelDocument.findById(user.skin).exec()

        if (!skin) throw new NotFoundUserError

        const id: string = skin.id

        const cosmeticListObj: Array<DocumentType<CosmeticModel>> = new Array
        const cosmeticsListObj: Array<DocumentType<CosmeticModel>> = await CosmeticModelDocument.find().exec()

        for(let oneCosmetic of cosmeticsListObj){

            if(oneCosmetic.id === skin.hat.toString()){
                cosmeticListObj.push(oneCosmetic)
            }
            else if(oneCosmetic.id === skin.head.toString()){
                cosmeticListObj.push(oneCosmetic)
            }
            else if(oneCosmetic.id === skin.top.toString()){
                cosmeticListObj.push(oneCosmetic)
            }
            else if(oneCosmetic.id === skin.pants.toString()){

                cosmeticListObj.push(oneCosmetic)
            }
            else if(oneCosmetic.id === skin.shoes.toString()){
                cosmeticListObj.push(oneCosmetic)
            }
        }

        const cosmeticList: Array<CosmeticModel> = new Array

        for(let oneCosmetic of cosmeticListObj){
            const id: string = oneCosmetic.id
            oneCosmetic = oneCosmetic.toObject()
            oneCosmetic.id = id
            cosmeticList.push(oneCosmetic)
        }

        return cosmeticList
    }
}