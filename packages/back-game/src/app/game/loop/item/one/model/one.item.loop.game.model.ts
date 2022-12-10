import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'

export class OneItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        nextList: Array<ItemLoopGameModel>,
        atNight: boolean,
        private _cardBehavior: BehaviorCardItemLoopGameModel
    ) {
        super(nextList, atNight)
    }

    public set cardBehavior(value: BehaviorCardItemLoopGameModel) {
        this._cardBehavior = value
    }

    public get cardBehavior(): BehaviorCardItemLoopGameModel {
        return this._cardBehavior
    }

    execute(context: ContextParamItemLoopGameModel): void {
        // adef
        this.cardBehavior.execute(context)
    }

    getCardBehavior(): Array<BehaviorCardItemLoopGameModel> {
        return [this.cardBehavior]
    }
}