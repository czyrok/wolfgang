import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'

import { ExecuteLoopGameInterface } from '../../execute/interface/execute.loop.game.interface'
import { HandlerBehaviorCardItemLoopGameInterface } from '../card/behavior/handler/interface/handler.behavior.card.item.loop.game.interface'

export abstract class ItemLoopGameModel implements ExecuteLoopGameInterface, HandlerBehaviorCardItemLoopGameInterface {
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

    abstract execute(): void
    abstract getCardBehavior(): Array<BehaviorCardItemLoopGameModel>
}