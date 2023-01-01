import { BehaviorNotDefinedOneItemLoopGameError } from '../error/behavior-not-defined.one.item.loop.game.error'

import { LogUtil } from '../../../../../log/util/log.util'

import { FactoryCardBehaviorItemLoopGameModel } from '../../card/behavior/factory/model/factory.behavior.card.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'

import { ConfigItemLoopGameInterface } from '../../config/interface/config.item.loop.game.interface'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class OneItemLoopGameModel extends ItemLoopGameModel {
    private _cardBehavior: BehaviorCardItemLoopGameModel

    public constructor(config: ConfigItemLoopGameInterface) {
        super(config)

        let behavior = FactoryCardBehaviorItemLoopGameModel.instance.get(config.behaviorTypeList[0])

        if (behavior === undefined) throw new BehaviorNotDefinedOneItemLoopGameError(this.config.type)

        this._cardBehavior = behavior
    }

    public get cardBehavior(): BehaviorCardItemLoopGameModel {
        return this._cardBehavior
    }

    entryPoint(context: ContextGameModel): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} loop item entrypoint triggered`)

        let childContext: ContextGameModel = ContextGameModel.buildContext(context, context.result)

        if (!this.cardBehavior.validCondition(childContext)) return context.next()

        childContext.res.subscribeOne((result: ResultSetGameType) => {
            context.next(result)
        })

        this.cardBehavior.entryPoint(childContext)
    }

    getCardBehavior(): Array<BehaviorCardItemLoopGameModel> {
        return [this.cardBehavior]
    }

    setup(): void {
        this.cardBehavior.setup()
    }
}