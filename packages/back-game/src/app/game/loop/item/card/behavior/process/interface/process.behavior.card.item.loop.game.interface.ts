import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'

export interface ProcessBehaviorCardPItemLoopGameInterface {
    execute(context: ContextGameModel): ResultSetGameType
}