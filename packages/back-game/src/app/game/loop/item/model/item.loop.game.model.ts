import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../param/context/model/context.param.item.loop.game.model'

import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../strategy/interface/strategy.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../set/result/type/result.set.item.loop.game.type'
import { CallbackContextParamItemLoopGameType } from '../param/context/callback/type/callback.context.param.item.loop.game.type'

export abstract class ItemLoopGameModel implements StrategyItemLoopGameInterface<ContextParamItemLoopGameModel, ContextParamItemLoopGameModel>, HandlerBehaviorCardItemLoopGameInterface {
    public constructor(
        private _nextList: Array<ItemLoopGameModel>,
        private _atNight: boolean
    ) { }

    public set atNight(value: boolean) {
        this._atNight = value
    }

    public get atNight(): boolean {
        return this._atNight
    }

    public set nextList(value: Array<ItemLoopGameModel>) {
        this._nextList = value
    }

    public get nextList(): Array<ItemLoopGameModel> {
        return this._nextList
    }

    abstract execute(context: ContextParamItemLoopGameModel): void

    buildContext(
        parentContext: ContextParamItemLoopGameModel,
        callback: CallbackContextParamItemLoopGameType,
        result?: ResultSetItemLoopGameType
    ): ContextParamItemLoopGameModel {
        return new ContextParamItemLoopGameModel(
            parentContext.next,
            callback,
            parentContext,
            result
        )
    }

    abstract getCardBehavior(): Array<BehaviorCardItemLoopGameModel>
}