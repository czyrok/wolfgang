import { IteratorHierarchyBehaviorItemLoopGameModel } from '../../../loop/item/behavior/hierarchy/iterator/model/iterator.hierarchy.behavior.item.loop.game.model'
import { StateGameModel } from '../../../state/model/state.game.model'

import { CampPlayerGameEnum } from '../enum/camp.player.game.enum'

/**
 * Classe qui permet de manipuler les camps des joueurs
 */
export class CampPlayerGameHelper {
    /**
     * Fonction qui remet tous les camps des joueurs à "UNDEFINED"
     * @param state Statue de la partie
     */
    public static resetPlayerCamp(state: StateGameModel): void {
        for (const player of state.players) {
            player.camp = CampPlayerGameEnum.UNDEFINED
        }
    }

    public static setCampToPlayer(): void {
        /**
         * Fonction qui met un camp aux joeurs
         */
        const ite: IteratorHierarchyBehaviorItemLoopGameModel = new IteratorHierarchyBehaviorItemLoopGameModel

        for (const behavior of ite) {
            if (!behavior.config.campStrategy) continue

            behavior.config.campStrategy.setCampToPlayer(behavior.players)
        }
    }

    /**
     * Fonction qui renvoie le nombre de camps de la partie
     * @param state Statue de la partie
     * @returns Renvoie le nombre de camps dans la partie
     */
    public static getAlivePlayerCampCount(state: StateGameModel): number {
        const campList: Array<CampPlayerGameEnum> = new Array

        for (const player of state.players) {
            if (player.isDead || player.camp === CampPlayerGameEnum.UNDEFINED) continue

            const camp: CampPlayerGameEnum | undefined = campList.find((camp: CampPlayerGameEnum) => camp === player.camp)

            if (!camp) campList.push(player.camp)
        }

        return campList.length
    }
}