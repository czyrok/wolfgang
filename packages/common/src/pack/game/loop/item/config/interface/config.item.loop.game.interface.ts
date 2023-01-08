import { ConfigGameInterface } from '../../../../config/interface/config.game.interface'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'
import { TypeBehaviorItemLoopGameEnum } from '../../behavior/type/enum/type.behavior.item.loop.game.enum'

export interface ConfigItemLoopGameInterface extends ConfigGameInterface<TypeItemLoopGameEnum> {
    atNight: boolean
    behaviorTypeList: Array<TypeBehaviorItemLoopGameEnum>
    next: Array<TypeItemLoopGameEnum>
}