import { BehaviorCardItemLoopGameModel } from '../../card/behavior/model/behavior.card.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../param/context/model/context.param.item.loop.game.model'

import { ResultSetItemLoopGameType } from '../../set/result/type/result.set.item.loop.game.type'

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

    entryPoint(context: ContextParamItemLoopGameModel): void {
        console.log('ITEM_ENTRYPOINT32')

        let childContext: ContextParamItemLoopGameModel = this.buildContext(context, context.result)

        if (!this.cardBehavior.validCondition(childContext)) return context.next(undefined)
        
        childContext.res.subscribeOne((result: ResultSetItemLoopGameType) => {
            context.next(result)
        })

        this.cardBehavior.entryPoint(childContext)
    }

    getCardBehavior(): Array<BehaviorCardItemLoopGameModel> {
        return [this.cardBehavior]
    }
}