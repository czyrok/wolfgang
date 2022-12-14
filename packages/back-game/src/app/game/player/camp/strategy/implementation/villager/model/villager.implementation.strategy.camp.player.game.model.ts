import { PlayerGameModel, CampPlayerGameEnum } from 'common'

import { StrategyCampPlayerGameInteface } from '../../../interface/strategy.camp.player.game.interface'

export class VillagerImplementationStrategyCampPlayerGameModel implements StrategyCampPlayerGameInteface {
    setCampToPlayer(list: Array<PlayerGameModel>): void {
        for (let player of list) {
            if (player.camp != CampPlayerGameEnum.UNDEFINED)
                player.camp = CampPlayerGameEnum.VILLAGER
        }
    }
}