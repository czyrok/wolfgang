import { PlayerGameModel } from '../../../../../model/player.game.model'

import { StrategyCampPlayerGameInterface } from '../../../interface/strategy.camp.player.game.interface'

import { CampPlayerGameEnum } from '../../../../enum/camp.player.game.enum'

/**
 * Classe qui met le camp d'un joueur de camp "UNDEFINED" à "VILLAIN"
 */
export class VillainImplementationStrategyCampPlayerGameModel implements StrategyCampPlayerGameInterface {
    /**
     * Fonction qui met le camp d'un joueur de camp "UNDEFINED" à "VILLAIN"
     * @param playerList Liste des joueurs de la partie
     */
    setCampToPlayer(playerList: Array<PlayerGameModel>): void {
        for (const player of playerList) {
            if (player.camp === CampPlayerGameEnum.UNDEFINED)
                player.camp = CampPlayerGameEnum.VILLAIN
        }
    }
}