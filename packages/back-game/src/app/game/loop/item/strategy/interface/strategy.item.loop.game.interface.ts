import { ContextParamBehaviorCardItemLoopGameModel } from '../../card/behavior/param/context/model/context.param.behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'

import { BuildContextStrategyItemLoopGameInterface } from '../build-context/interface/build-context.strategy.item.loop.game.interface'
import { EntryPointStrategyItemLoopGameInterface } from '../entry-point/interface/entry-point.strategy.item.loop.game.interface'

export interface StrategyItemLoopGameInterface<
    T extends ContextParamItemLoopGameModel,
    C extends ContextParamItemLoopGameModel | ContextParamBehaviorCardItemLoopGameModel
> extends EntryPointStrategyItemLoopGameInterface<T>, BuildContextStrategyItemLoopGameInterface<C, T> {

}