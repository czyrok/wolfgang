import { ConfigGameInterface } from '../../../../../config/interface/config.game.interface'
import { StrategyCampPlayerGameInterface } from '../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'

import { TypeBehaviorItemLoopGameEnum } from '../../type/enum/type.behavior.item.loop.game.enum'
import { TypeChatGameEnum } from '../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../card/type/enum/type.card.game.enum'
import { TimerModeBehaviorItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.item.loop.game.enum'
import { TypeModeChatGameEnum } from '../../../../../chat/mode/type/enum/type.mode.chat.game.enum'

export interface ConfigBehaviorItemLoopGameInterface extends ConfigGameInterface<TypeBehaviorItemLoopGameEnum> {
    timer: number,
    timerMode?: TimerModeBehaviorItemLoopGameEnum,
    cardTypeList: Array<TypeCardGameEnum>,
    hierarchy: number,
    chat?: TypeChatGameEnum,
    chatMode?: TypeModeChatGameEnum,
    campStrategy?: StrategyCampPlayerGameInterface
}