import { FactoryItemLoopGameModel } from '../factory/model/factory.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ContextGameModel } from '../../../context/model/context.game.model'

import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'
import { StrategyItemLoopGameInterface } from '../strategy/interface/strategy.item.loop.game.interface'
import { SetupDistributionGameInterface } from '../../../distribution/setup/interface/setup.distribution.game.interface'
import { ConfigItemLoopGameInterface } from '../config/interface/config.item.loop.game.interface'

export abstract class ItemLoopGameModel implements
    StrategyItemLoopGameInterface,
    HandlerBehaviorCardItemLoopGameInterface,
    SetupDistributionGameInterface {
    private _isInitialized: boolean = false
    private _nextIndex: number = 0
    protected _nextList: Array<ItemLoopGameModel> = new Array

    public constructor(
        private readonly _config: ConfigItemLoopGameInterface
    ) {
        FactoryItemLoopGameModel.instance.register(this.config.type, this)
    }

    public get isInitialized(): boolean {
        return this._isInitialized
    }

    protected set isInitialized(value: boolean) {
        this._isInitialized = value
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

    public get config(): ConfigItemLoopGameInterface {
        return this._config
    }

    public get nextItem(): ItemLoopGameModel {
        if (this.nextIndex == this.nextList.length) this.nextIndex = 0

        return this.nextList[this.nextIndex++]
    }

    public objectBuildEnding(): void {
        if (!this.isInitialized) {
            for (let nextType of this.config.next) {
                this.nextList.push(FactoryItemLoopGameModel.instance.get(nextType))
            }

            this.isInitialized = true
        }
    }

    abstract entryPoint(context: ContextGameModel): void

    abstract getCardBehavior(): Array<BehaviorCardItemLoopGameModel>

    abstract setup(): void
}