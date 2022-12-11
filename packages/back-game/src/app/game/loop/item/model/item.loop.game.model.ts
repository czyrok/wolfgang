import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../param/context/model/context.param.item.loop.game.model'

import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../strategy/interface/strategy.item.loop.game.interface'

import { ResultSetItemLoopGameType } from '../set/result/type/result.set.item.loop.game.type'

export abstract class ItemLoopGameModel implements StrategyItemLoopGameInterface<ContextParamItemLoopGameModel, ContextParamItemLoopGameModel>, HandlerBehaviorCardItemLoopGameInterface {
    private _nextList: Array<ItemLoopGameModel> = new Array
    private _nextIndex: number = 0

    public constructor(
        private _atNight: boolean
    ) { }

    private get nextList(): Array<ItemLoopGameModel> {
        return this._nextList
    }

    private get nextIndex(): number {
        return this._nextIndex
    }

    private set nextIndex(value: number) {
        this._nextIndex = value
    }

    public get atNight(): boolean {
        return this._atNight
    }

    protected goNext(currentContext: ContextParamItemLoopGameModel, result?: ResultSetItemLoopGameType): void {
        this.nextIndex++

        if (this.nextIndex == this.nextList.length) this.nextIndex = 0

        this.nextList[this.nextIndex].entryPoint(this.buildContext(currentContext, result))
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