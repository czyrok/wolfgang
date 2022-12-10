import { ChildBehaviorCardItemLoopGameModel } from '../../card/behavior/child/model/child.behavior.card.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'

export class GroupItemLoopGameModel extends ItemLoopGameModel {
    public _childBehaviorCardList: Array<ChildBehaviorCardItemLoopGameModel> = new Array()

    public constructor(atNight: boolean, cardBehavior: BehaviorCardItemLoopGameModel) {
        super(atNight, cardBehavior)
    }

    public set childBehaviorCardList(value: Array<ChildBehaviorCardItemLoopGameModel>) {
        this._childBehaviorCardList = value
    }

    public get childBehaviorCardList(): Array<ChildBehaviorCardItemLoopGameModel> {
        return this._childBehaviorCardList
    }
}