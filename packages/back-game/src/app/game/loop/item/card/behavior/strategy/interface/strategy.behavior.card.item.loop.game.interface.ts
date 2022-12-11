import { ContextParamItemLoopGameModel } from '../../../../param/context/model/context.param.item.loop.game.model'
import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { StrategyItemLoopGameInterface } from '../../../../strategy/interface/strategy.item.loop.game.interface'

export interface StrategyBehaviorCardPItemLoopGameInterface<T extends ContextParamItemLoopGameModel> extends StrategyItemLoopGameInterface<T, ContextParamBehaviorCardItemLoopGameModel>  {

}