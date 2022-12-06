import { ExecuteLoopGameInterface } from '../../execute/interface/execute.loop.game.interface'
import { BehaviorCardItemLoopGameModel } from '../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameInterface } from '../interface/item.loop.game.interface'

export class ItemLoopGameModel implements ExecuteLoopGameInterface, ItemLoopGameInterface {
    private _atNight: boolean
    private _nextList: Array<ItemLoopGameModel> = new Array()
    private _cardBehavior: BehaviorCardItemLoopGameModel

    public constructor(atNight: boolean, cardBehavior: BehaviorCardItemLoopGameModel) {
        this._atNight = atNight
        this._cardBehavior = cardBehavior
    }

    public set atNight(value: boolean) {
        this._atNight = this.atNight
    }

    public get atNight(): boolean {
        return this._atNight
    }

    public set cardBehavior(value: BehaviorCardItemLoopGameModel) {
        this._cardBehavior = value
    }

    public get cardBehavior(): BehaviorCardItemLoopGameModel {
        return this._cardBehavior
    }

    execute(): void {
        this.cardBehavior.behaviorStrategy.execute()
    }
    getCardBehavior(): BehaviorCardItemLoopGameModel[] {
        return [this.cardBehavior]
    }
}