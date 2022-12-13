import { EmitOnFail, EmitOnSuccess, MessageBody, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, SocketIO, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'

import { CosmeticModelDocument, TypeCosmeticEnum, UserModelDocument, PurchaseCosmeticModelDocument, SkinUserModelDocument, CosmeticModel } from 'common'

import { MessageChatGameModel, MessageChatGameModelDocument } from '../message/model/message.chat.game.model'

import { ChatGameModelDocument, ChatGameModel } from '../model/chat.game.model'

import { TypeChatGameEnum } from '../type/enum/type.chat.game.enum'

import * as mongoose from "mongoose";

import { Ref } from '@typegoose/typegoose'

@SocketController({
    namespace: '/main/profile/Skin-customization',
    init: () => { }
})
export class ChatGameController {
    @EmitOnSuccess('get')
    @OnConnect()
    async con() {
        let chat: any = await ChatGameModelDocument.findOne({
            gameId: 'ID_parti',
            type: TypeChatGameEnum.ALIVE
        }).populate('message').lean().exec()

        return chat
    }

    @EmitNamespaceBroadcastOnSuccess('get')
    @OnMessage()
    async emit(@MessageBody() message: MessageChatGameModel) {
        ChatGameModelDocument.addMessage(TypeChatGameEnum.ALIVE, message)
        let messagedoc = new MessageChatGameModelDocument(message)
        let chat: any = await ChatGameModelDocument.findOne({
            gameId: 'ID_parti',
            type: TypeChatGameEnum.ALIVE
        }).populate('message').exec()

        if (chat === null) chat = new ChatGameModelDocument({
            gameId: 'ID_parti',
            type: TypeChatGameEnum.ALIVE
        })

        await messagedoc.save()
        chat.push(messagedoc)
        await chat.save()

        return message;
    }

    /* @OnMessage()
    @EmitOnFail()
    purchase(@MessageBody() data: CosmeticModel) {
        let cosmetic = new CosmeticModelDocument(data)
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
        }
    } */
}

