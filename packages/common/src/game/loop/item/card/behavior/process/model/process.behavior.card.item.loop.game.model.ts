import { ContextGameModel } from '../../../../../../context/model/context.game.model'

import { ProcessBehaviorCardPItemLoopGameInterface } from '../interface/process.behavior.card.item.loop.game.interface'

import { ResultSetGameType } from '../../../../../../set/result/type/result.set.game.type'

export abstract class ProcessBehaviorCardPItemLoopGameModel implements ProcessBehaviorCardPItemLoopGameInterface {
    abstract execute(context: ContextGameModel): ResultSetGameType
}