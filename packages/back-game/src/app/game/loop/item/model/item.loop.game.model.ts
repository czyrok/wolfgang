import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../context/model/context.game.model'

import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../strategy/interface/strategy.item.loop.game.interface'

export abstract class ItemLoopGameModel implements StrategyItemLoopGameInterface, HandlerBehaviorCardItemLoopGameInterface {
    private _isInitialized: boolean = false
    private _nextIndex: number = 0
    protected _nextList: Array<ItemLoopGameModel> = new Array

    public constructor(
        private _atNight: boolean
    ) { }

    protected get isInitialized(): boolean {
        let temp: boolean = this._isInitialized

        this._isInitialized = true

        return temp
    }

    public get nextIndex(): number {
        return this._nextIndex
    }

    private set nextIndex(value: number) {
        this._nextIndex = value
    }

    protected get nextList(): Array<ItemLoopGameModel> {
        return this._nextList
    }

    public get atNight(): boolean {
        return this._atNight
    }

    public get nextItem(): ItemLoopGameModel {
        if (this.nextIndex == this.nextList.length) this.nextIndex = 0

        return this.nextList[this.nextIndex++]
    }

    public abstract objectBuildingEnd(): void

    abstract entryPoint(context: ContextGameModel): void

    abstract getCardBehavior(): Array<BehaviorCardItemLoopGameModel>
}