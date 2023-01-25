import { Namespace } from 'socket.io'
import { TypeLogEnum } from '../../../../log/type/enum/type.log.enum'
import { LogUtil } from '../../../../log/util/log.util'

import { BehaviorItemLoopGameModel } from '../../../loop/item/behavior/model/behavior.item.loop.game.model'
import { IteratorLoopGameModel } from '../../../loop/iterator/model/iterator.loop.game.model'
import { PlayerGameModel } from '../../../player/model/player.game.model'

import { TypeChatGameEnum } from '../../type/enum/type.chat.game.enum'

export class RoomChatGameHelper {
    public static setRoom(player: PlayerGameModel) {
        const loopIte: IteratorLoopGameModel = new IteratorLoopGameModel

        const behaviorList: Array<BehaviorItemLoopGameModel> = new Array,
            chatTypeList: Array<TypeChatGameEnum> = new Array

        for (const item of loopIte) {
            behaviorList.push(...item.getPlayerBehavior(player))
        }

        for (const behavior of behaviorList) {
            chatTypeList.push(...behavior.getChatType())
        }

        for (const socket of player.socketsList) {
            for (const chatType of chatTypeList) {
                if (!socket.rooms.has(chatType)) socket.join(chatType)
            }
        }
    }
}