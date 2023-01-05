import { InitFactoryRegistering } from '../../../../factory/decorator/factory.game.decorator'

import { CardGameModel } from '../../../model/card.game.model'

import { TypeCardGameEnum } from '../../../type/enum/type.card.game.enum'

@InitFactoryRegistering()
export class VillagerImplementationCardPlayerGameModel extends CardGameModel {
    public constructor() {
        super({
            type: TypeCardGameEnum.VILLAGER
        })
    }
}