import { LogUtil } from '../../../../../log/util/log.util'

import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'
import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'
import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

export abstract class OneItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        type: TypeItemLoopGameEnum,
        atNight: boolean,
        private _cardBehavior: BehaviorCardItemLoopGameModel
    ) {
        super(type, atNight)

        this.cardBehavior.setupPlayers()
    }

    public get cardBehavior(): BehaviorCardItemLoopGameModel {
        return this._cardBehavior
    }

    entryPoint(context: ContextGameModel): void {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.type} loop item entrypoint triggered`)

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
}