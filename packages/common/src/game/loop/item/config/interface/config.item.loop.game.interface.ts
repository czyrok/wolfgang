import { ConfigGameInterface } from '../../../../config/interface/config.game.interface'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorCardItemLoopGameEnum } from '../../card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

export interface ConfigItemLoopGameInterface extends ConfigGameInterface<TypeItemLoopGameEnum> {
    atNight: boolean
    behaviorTypeList: Array<TypeBehaviorCardItemLoopGameEnum>
    next: Array<TypeItemLoopGameEnum>
}