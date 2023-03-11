import { LogUtil } from '../../../../log/util/log.util'

import { IteratorHierarchyBehaviorItemLoopGameModel } from '../../../loop/item/behavior/hierarchy/iterator/model/iterator.hierarchy.behavior.item.loop.game.model'
import { StateGameModel } from '../../../state/model/state.game.model'

import { TypeLogEnum } from '../../../../log/type/enum/type.log.enum'
import { CampPlayerGameEnum } from '../enum/camp.player.game.enum'

export class CampPlayerGameHelper {
    public static resetPlayerCamp(state: StateGameModel): void {
        for (const player of state.players) {
            player.camp = CampPlayerGameEnum.UNDEFINED
        }
    }

    public static setCampToPlayer(): void {
        const ite: IteratorHierarchyBehaviorItemLoopGameModel = new IteratorHierarchyBehaviorItemLoopGameModel

        for (const behavior of ite) {
            if (!behavior.config.campStrategy) continue

            behavior.config.campStrategy.setCampToPlayer(behavior.players)
        }
    }

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