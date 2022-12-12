import { PlayerGameModel } from '../../../../../model/player.game.model'

import { StrategyCampPlayerGameInteface } from '../../../interface/strategy.camp.player.game.interface'

import { CampPlayerGameEnum } from '../../../../enum/camp.player.game.enum'

export class VillainImplementationStrategyCampPlayerGameModel implements StrategyCampPlayerGameInteface {
    setCampToPlayer(list: Array<PlayerGameModel>): void {
        for (let player of list) {
            if (player.camp != CampPlayerGameEnum.UNDEFINED)
                player.camp = CampPlayerGameEnum.VILLAIN
        }
    }
}