import { InitFactoryRegistering } from '../../../../../factory/decorator/factory.game.decorator'

import { CardGameModel } from '../../../../model/card.game.model'

import { TypeCardGameEnum } from '../../../../type/enum/type.card.game.enum'

@InitFactoryRegistering()
export class GreyWerewolfImplementationCardPlayerGameModel extends CardGameModel {
    public constructor() {
        super({
            type: TypeCardGameEnum.GREY_WEREWOLF
        })
    }
}