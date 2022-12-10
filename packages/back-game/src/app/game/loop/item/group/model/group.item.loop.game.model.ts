import { ChildBehaviorCardItemLoopGameModel } from '../../card/behavior/child/model/child.behavior.card.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'

export class GroupItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        nextList: Array<ItemLoopGameModel>,
        atNight: boolean,
        private _childBehaviorCardList: Array<ChildBehaviorCardItemLoopGameModel>
    ) {
        super(nextList, atNight)
    }

    public set childBehaviorCardList(value: Array<ChildBehaviorCardItemLoopGameModel>) {
        this._childBehaviorCardList = value
    }

    public get childBehaviorCardList(): Array<ChildBehaviorCardItemLoopGameModel> {
        return this._childBehaviorCardList
    }

    execute(context: ContextParamItemLoopGameModel): void {
        for (let behavior of this.childBehaviorCardList) {
            // adef
            behavior.execute(context)
        }
    }

    getCardBehavior(): Array<BehaviorCardItemLoopGameModel> {
        return this.childBehaviorCardList
    }
}