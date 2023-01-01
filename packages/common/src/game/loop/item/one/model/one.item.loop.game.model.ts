import { BehaviorNotDefinedOneItemLoopGameError } from '../error/behavior-not-defined.one.item.loop.game.error'

import { LogUtil } from '../../../../../log/util/log.util'

import { FactoryBehaviorItemLoopGameModel } from '../../behavior/factory/model/factory.behavior.item.loop.game.model'
import { BehaviorItemLoopGameModel } from '../../behavior/model/behavior.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'

import { ConfigItemLoopGameInterface } from '../../config/interface/config.item.loop.game.interface'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class OneItemLoopGameModel extends ItemLoopGameModel {
    private _behavior: BehaviorItemLoopGameModel

    public constructor(config: ConfigItemLoopGameInterface) {
        super(config)

        let behavior = FactoryBehaviorItemLoopGameModel.instance.get(config.behaviorTypeList[0])

        if (behavior === undefined) throw new BehaviorNotDefinedOneItemLoopGameError(this.config.type)

        this._behavior = behavior
    }

    public get behavior(): BehaviorItemLoopGameModel {
        return this._behavior
    }

    entryPoint(context: ContextGameModel): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} loop item entrypoint triggered`)

        let childContext: ContextGameModel = ContextGameModel.buildContext(context, context.result)

        if (!this.behavior.validCondition(childContext)) return context.next()

        childContext.res.subscribeOne((result: ResultSetGameType) => {
            context.next(result)
        })

        this.behavior.entryPoint(childContext)
    }

    getBehavior(): Array<BehaviorItemLoopGameModel> {
        return [this.behavior]
    }

    setup(): void {
        this.behavior.setup()
    }
}