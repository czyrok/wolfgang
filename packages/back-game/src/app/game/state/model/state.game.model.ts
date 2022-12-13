import { TypeBehaviorCardItemLoopGameEnum } from '../../loop/item/card/behavior/type/enum/type.behavior.card.item.loop.game.enum'

// #amet
export class StateGameModel {
    private _currentCardBehaviorType: Array<TypeBehaviorCardItemLoopGameEnum> = new Array
    private _isNight: boolean

    public set isNight(value: boolean) {
        this._isNight = value
    }

    public set currentCardBehaviorType(value: Array<TypeBehaviorCardItemLoopGameEnum>) {
        this._currentCardBehaviorType = value
    }

    public get isNight(): boolean {
        return this._isNight
    }

    public get currentCardBehaviorType(): Array<TypeBehaviorCardItemLoopGameEnum> {
        return this._currentCardBehaviorType
    }
}