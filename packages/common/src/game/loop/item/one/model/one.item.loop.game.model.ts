import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'

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
        console.log('ITEM_ENTRYPOINT32')

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