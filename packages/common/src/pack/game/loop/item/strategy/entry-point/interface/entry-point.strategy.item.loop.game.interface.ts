import { ContextGameModel } from '../../../../../context/model/context.game.model'

export interface EntryPointStrategyItemLoopGameInterface {
    entryPoint(context: ContextGameModel): boolean | void
}