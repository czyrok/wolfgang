import { LogUtil } from '../../../../../log/util/log.util'

import { MapParamModel } from '../../../../../param/map/model/map.param.model'
import { FactoryBehaviorItemLoopGameModel } from '../../behavior/factory/model/factory.behavior.item.loop.game.model'
import { ChildBehaviorItemLoopGameModel } from '../../behavior/child/model/child.behavior.item.loop.game.model'
import { BehaviorItemLoopGameModel } from '../../behavior/model/behavior.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'
import { WaitingResContextGameModel } from '../../../../context/res/waiting/model/waiting.res.context.game.model'

import { ConfigItemLoopGameInterface } from '../../config/interface/config.item.loop.game.interface'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class GroupItemLoopGameModel extends ItemLoopGameModel {
    private _childBehaviorList: Array<ChildBehaviorItemLoopGameModel> = new Array

    public constructor(config: ConfigItemLoopGameInterface) {
        super(config)

        for (let behaviorType of config.behaviorTypeList) {
            this._childBehaviorList.push(FactoryBehaviorItemLoopGameModel.instance.get(behaviorType))
        }
    }

    public get childBehaviorList(): Array<ChildBehaviorItemLoopGameModel> {
        return this._childBehaviorList
    }

    entryPoint(context: ContextGameModel): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} loop item entrypoint triggered`)

        let childs: MapParamModel<{
            context: ContextGameModel,
            self: ChildBehaviorItemLoopGameModel
        }> = new MapParamModel,
            childContexts: Array<ContextGameModel> = new Array

        for (let i = 0; i < this.childBehaviorList.length; i++) {
            let childContext: ContextGameModel = ContextGameModel.buildContext(context, context.result)

            if (this.childBehaviorList[i].validCondition(childContext)) {
                childs[i] = {
                    context: childContext,
                    self: this.childBehaviorList[i]
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

            for (let i = 0; i < this.childBehaviorList.length; i++) {
                if (childs[i] !== undefined) ((childs[i] as {
                    context: ContextGameModel,
                    self: ChildBehaviorItemLoopGameModel
                }).self).entryPoint((childs[i] as {
                    context: ContextGameModel,
                    self: ChildBehaviorItemLoopGameModel
                }).context)
            }
        } else {
            context.next()
        }
    }

    getBehavior(): Array<BehaviorItemLoopGameModel> {
        return this.childBehaviorList
    }

    setup(): void {
        for (const behavior of this.childBehaviorList) behavior.setup()
    }
}