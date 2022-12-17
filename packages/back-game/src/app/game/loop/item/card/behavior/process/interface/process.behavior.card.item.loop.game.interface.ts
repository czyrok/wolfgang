import { ContextParamBehaviorCardItemLoopGameModel } from '../../param/context/model/context.param.behavior.card.item.loop.game.model'

import { BuildContextStrategyItemLoopGameInterface } from '../../../../strategy/build-context/interface/build-context.strategy.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../../../../set/result/type/result.set.item.loop.game.type'

export interface ProcessBehaviorCardPItemLoopGameInterface<T extends ContextParamBehaviorCardItemLoopGameModel>
    extends BuildContextStrategyItemLoopGameInterface<T, T> {
    execute(context: T): ResultSetItemLoopGameType
}