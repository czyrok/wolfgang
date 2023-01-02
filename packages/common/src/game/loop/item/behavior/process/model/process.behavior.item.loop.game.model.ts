import { ContextGameModel } from '../../../../../context/model/context.game.model'

import { ProcessBehaviorPItemLoopGameInterface } from '../interface/process.behavior.item.loop.game.interface'

import { ResultSetGameType } from '../../../../../set/result/type/result.set.game.type'

export abstract class ProcessBehaviorPItemLoopGameModel implements ProcessBehaviorPItemLoopGameInterface {
    abstract execute(context: ContextGameModel): ResultSetGameType
}