import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../param/context/model/context.param.item.loop.game.model'

import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../strategy/interface/strategy.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../set/result/type/result.set.item.loop.game.type'

export abstract class ItemLoopGameModel implements StrategyItemLoopGameInterface<ContextParamItemLoopGameModel, ContextParamItemLoopGameModel>, HandlerBehaviorCardItemLoopGameInterface {
    private _nextList: Array<ItemLoopGameModel> = new Array

    public constructor(
        private _atNight: boolean
    ) { }

    public get atNight(): boolean {
        return this._atNight
    }

    public get nextList(): Array<ItemLoopGameModel> {
        return this._nextList
    }

    public abstract objectBuildingEnd(): void

    abstract entryPoint(context: ContextParamItemLoopGameModel): void

    buildContext(
        parentContext: ContextParamItemLoopGameModel,
        preivousResult?: ResultSetItemLoopGameType
    ): ContextParamItemLoopGameModel {
        return new ContextParamItemLoopGameModel(
            parentContext,
            preivousResult
        )
    }

    abstract getCardBehavior(): Array<BehaviorCardItemLoopGameModel>
}