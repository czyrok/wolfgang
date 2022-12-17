import { EmitOnSuccess, MessageBody, OnConnect, OnMessage, SocketController, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'

import { TypeChatGameEnum, ChatGameModelDocument, MessageChatGameModel, MessageChatGameModelDocument } from 'common'

@SocketController({
    namespace: '/game/chat',
    init: () => { }
})
export class ChatGameController {
    @EmitOnSuccess('get')
    @OnConnect()
    async conn() {
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

        return message
    }
}

