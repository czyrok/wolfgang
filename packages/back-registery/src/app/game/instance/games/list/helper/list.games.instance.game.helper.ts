import { GameModel } from 'common'

import { RegisteryModel } from '../../../../../registery/model/registery.model'

export class ListGamesInstanceGameHelper {
    public static getAll(): Array<GameModel> {
        const list: Array<GameModel> = new Array

        for (const [, instance] of RegisteryModel.instance) {
            list.push(...instance.games.filter((game: GameModel) => game.isStarted === false))
        }

        return list
    }
}