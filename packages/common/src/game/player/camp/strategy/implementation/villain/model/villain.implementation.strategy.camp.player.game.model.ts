import { PlayerGameModel } from '../../../../../model/player.game.model'

import { StrategyCampPlayerGameInterface } from '../../../interface/strategy.camp.player.game.interface'

import { CampPlayerGameEnum } from '../../../../enum/camp.player.game.enum'

export class VillainImplementationStrategyCampPlayerGameModel implements StrategyCampPlayerGameInterface {
    setCampToPlayer(list: Array<PlayerGameModel>): void {
        for (let player of list) {
            if (player.camp != CampPlayerGameEnum.UNDEFINED)
                player.camp = CampPlayerGameEnum.VILLAIN
        }
    }
}