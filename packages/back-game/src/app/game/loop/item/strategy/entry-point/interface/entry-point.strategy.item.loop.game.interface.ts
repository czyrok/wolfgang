import { ContextParamItemLoopGameModel } from '../../../param/context/model/context.param.item.loop.game.model'

export interface EntryPointStrategyItemLoopGameInterface<
    T extends ContextParamItemLoopGameModel,
> {
    entryPoint(context: T): void
}