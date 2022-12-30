import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'

export abstract class OneItemLoopGameModel extends ItemLoopGameModel {
    public constructor(
        atNight: boolean,
        private _cardBehavior: BehaviorCardItemLoopGameModel
    ) {
        super(atNight)

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