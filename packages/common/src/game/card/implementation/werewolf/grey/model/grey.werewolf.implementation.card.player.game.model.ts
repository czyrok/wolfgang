import { CardGameModel } from '../../../../model/card.game.model'

import { TypeCardGameEnum } from '../../../../type/enum/type.card.game.enum'

export class GreyWerewolfImplementationCardPlayerGameModel extends CardGameModel {
    public constructor() {
        super(TypeCardGameEnum.GREY_WEREWOLF)
    }
}