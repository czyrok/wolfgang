import { BehaviorItemLoopGameModel } from '../../../loop/item/behavior/model/behavior.item.loop.game.model'
import { FactoryItemLoopGameModel } from '../../../loop/item/factory/model/factory.item.loop.game.model'
import { ItemLoopGameModel } from '../../../loop/item/model/item.loop.game.model'
import { PlayerGameModel } from '../../../player/model/player.game.model'

import { TypeChatGameEnum } from '../../type/enum/type.chat.game.enum'

export class RoomChatGameHelper {
    public static setRoom(player: PlayerGameModel) {
        const behaviorList: Array<BehaviorItemLoopGameModel> = new Array,
            chatTypeList: Array<TypeChatGameEnum> = new Array

        const factory: FactoryItemLoopGameModel = FactoryItemLoopGameModel.instance

        const itemList: Array<ItemLoopGameModel> = factory.getAll()

        for (const item of itemList) {
            behaviorList.push(...item.getPlayerBehavior(player))
        }

        for (const behavior of behaviorList) {
            chatTypeList.push(...behavior.getChatType())
        }

        for (const socket of player.socketsList) {
            for (const chatType of chatTypeList) {
                if (!socket.rooms.has(chatType)) socket.join(chatType)
            }

            for (const behavior of behaviorList) {
                if (!socket.rooms.has(behavior.config.type)) socket.join(behavior.config.type)
            }
        }
    }
}