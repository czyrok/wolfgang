import { CardGameModel } from '../../../model/card.game.model'

import { TypeCardGameEnum } from '../../../type/enum/type.card.game.enum'

export class VillagerImplementationCardPlayerGameModel extends CardGameModel {
    public constructor() {
        super(TypeCardGameEnum.VILLAGER)
    }
}