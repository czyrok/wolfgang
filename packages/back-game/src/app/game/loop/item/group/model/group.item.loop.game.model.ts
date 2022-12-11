import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { ChildBehaviorCardItemLoopGameModel } from '../../card/behavior/child/model/child.behavior.card.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'
import { WaitingResContextParamItemLoopGameModel } from '../../param/context/res/waiting/model/waiting.res.context.param.item.loop.game.model'

import { ResultSetItemLoopGameType } from '../../set/result/type/result.set.item.loop.game.type'

export abstract class GroupItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        atNight: boolean,
        private _childBehaviorCardList: Array<ChildBehaviorCardItemLoopGameModel>
    ) {
        super(atNight)
    }

    public get childBehaviorCardList(): Array<ChildBehaviorCardItemLoopGameModel> {
        return this._childBehaviorCardList
    }

    entryPoint(context: ContextParamItemLoopGameModel): void {
        let childs: MapParamModel<{
            context: ContextParamItemLoopGameModel,
            self: ChildBehaviorCardItemLoopGameModel
        }> = new MapParamModel,
            childContexts: Array<ContextParamItemLoopGameModel> = new Array

        for (let i = 0; i < this.childBehaviorCardList.length; i++) {
            let childContext: ContextParamItemLoopGameModel = this.buildContext(context, context.result)

            if (this.childBehaviorCardList[i].validCondition(childContext)) {
                childs[i] = {
                    context: childContext,
                    self: this.childBehaviorCardList[i]
                }

                childContexts.push(childContext)
            }
        }

        if (childContexts.length > 0) {
            let waiting: WaitingResContextParamItemLoopGameModel = new WaitingResContextParamItemLoopGameModel
            waiting.wait(childContexts)
            waiting.res.subscribeOne((result: ResultSetItemLoopGameType) => {
                context.next(result)
            })

            for (let i = 0; i < this.childBehaviorCardList.length; i++) {
                if (childs[i] !== undefined) ((childs[i] as {
                    context: ContextParamItemLoopGameModel,
                    self: ChildBehaviorCardItemLoopGameModel
                }).self).entryPoint((childs[i] as {
                    context: ContextParamItemLoopGameModel,
                    self: ChildBehaviorCardItemLoopGameModel
                }).context)
            }
        } else {
            context.next()
        }
    }

    getCardBehavior(): Array<BehaviorCardItemLoopGameModel> {
        return this.childBehaviorCardList
    }
}