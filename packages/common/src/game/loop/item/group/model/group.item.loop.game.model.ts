import { LogUtil } from '../../../../../log/util/log.util'

import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { ChildBehaviorCardItemLoopGameModel } from '../../card/behavior/child/model/child.behavior.card.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'
import { WaitingResContextGameModel } from '../../../../context/res/waiting/model/waiting.res.context.game.model'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'
import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class GroupItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        type: TypeItemLoopGameEnum,
        atNight: boolean,
        private _childBehaviorCardList: Array<ChildBehaviorCardItemLoopGameModel>
    ) {
        super(type, atNight)

        for (let cardBehavior of this.childBehaviorCardList) cardBehavior.setupPlayers()
    }

    public get childBehaviorCardList(): Array<ChildBehaviorCardItemLoopGameModel> {
        return this._childBehaviorCardList
    }

    entryPoint(context: ContextGameModel): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.type} loop item entrypoint triggered`)

        let childs: MapParamModel<{
            context: ContextGameModel,
            self: ChildBehaviorCardItemLoopGameModel
        }> = new MapParamModel,
            childContexts: Array<ContextGameModel> = new Array

        for (let i = 0; i < this.childBehaviorCardList.length; i++) {
            let childContext: ContextGameModel = ContextGameModel.buildContext(context, context.result)

            if (this.childBehaviorCardList[i].validCondition(childContext)) {
                childs[i] = {
                    context: childContext,
                    self: this.childBehaviorCardList[i]
                }

                childContexts.push(childContext)
            }
        }

        if (childContexts.length > 0) {
            let waiting: WaitingResContextGameModel = new WaitingResContextGameModel
            waiting.wait(childContexts)
            waiting.res.subscribeOne((result: ResultSetGameType) => {
                context.next(result)
            })

            for (let i = 0; i < this.childBehaviorCardList.length; i++) {
                if (childs[i] !== undefined) ((childs[i] as {
                    context: ContextGameModel,
                    self: ChildBehaviorCardItemLoopGameModel
                }).self).entryPoint((childs[i] as {
                    context: ContextGameModel,
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