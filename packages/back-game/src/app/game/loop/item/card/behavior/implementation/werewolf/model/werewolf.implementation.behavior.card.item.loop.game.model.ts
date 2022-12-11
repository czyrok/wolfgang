import { FactoryCardPlayerGameUtil } from '../../../../../../../player/card/factory/util/factory.card.player.game.util'

import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'
import { ContextParamItemLoopGameModel } from '../../../../../param/context/model/context.param.item.loop.game.model';

import { TypeCardPlayerGameEnum } from '../../../../../../../player/card/type/enum/type.card.player.game.util'

export class WerewolfImplementationBehaviorCardItemLoop extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super(
            '#adef',
            1,
            90,
            [
                FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.GREY_WEREWOLF)
            ],
            // #achan
            {
                setCampToCard(listCard) {

                },
            }
        )
    }

    public validCondition(context: ContextParamItemLoopGameModel): boolean {
        if (this.getPlayer().length > 0) {
            return true
        } else {
            return false
        }
    }

    public doAtBeginning(context: ContextParamItemLoopGameModel): void {
        // #achan
        throw new Error('Method not implemented.');
    }

    public doAtEnd(context: ContextParamItemLoopGameModel): void {
        // #achan
        throw new Error('Method not implemented.');
    }
}