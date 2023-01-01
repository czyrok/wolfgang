import { ConfigGameInterface } from '../../../../../../config/interface/config.game.interface'
import { StrategyCampPlayerGameInterface } from '../../../../../../player/camp/strategy/interface/strategy.camp.player.game.interface'

import { TypeBehaviorCardItemLoopGameEnum } from '../../type/enum/type.behavior.card.item.loop.game.enum'
import { TypeChatGameEnum } from '../../../../../../chat/type/enum/type.chat.game.enum'
import { TypeCardGameEnum } from '../../../../../../card/type/enum/type.card.game.enum'
import { TimerModeBehaviorCardItemLoopGameEnum } from '../../timer-mode/enum/timer-mode.behavior.card.item.loop.game.enum'

export interface ConfigBehaviorCardItemLoopGameInterface extends ConfigGameInterface<TypeBehaviorCardItemLoopGameEnum> {
    timer: number,
    cardTypeList: Array<TypeCardGameEnum>,
    timerMode?: TimerModeBehaviorCardItemLoopGameEnum,
    chat?: TypeChatGameEnum,
    campHierarchy?: number,
    campStrategy?: StrategyCampPlayerGameInterface,
}