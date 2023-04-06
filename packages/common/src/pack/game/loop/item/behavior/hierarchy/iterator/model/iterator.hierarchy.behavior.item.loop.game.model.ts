import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'

import { IteratorChainedListInterface } from '../../../../../../../chained-list/iterator/interface/iterator.chained-list.interface'
import { FactoryBehaviorItemLoopGameModel } from '../../../factory/model/factory.behavior.item.loop.game.model'

export class IteratorHierarchyBehaviorItemLoopGameModel implements IteratorChainedListInterface<BehaviorItemLoopGameModel> {
    private _behaviorList: Array<BehaviorItemLoopGameModel>

    private _current!: BehaviorItemLoopGameModel
    private _currentHierarchy: number = 0

    public constructor() {
        const factory: FactoryBehaviorItemLoopGameModel = FactoryBehaviorItemLoopGameModel.instance

        this._behaviorList = factory.getAll()

        for (const behavior of this.behaviorList) {
            if (behavior.config.hierarchy === this.currentHierarchy) {
                this.current = behavior

                break
            }
        }
    }

    private get behaviorList(): Array<BehaviorItemLoopGameModel> {
        return this._behaviorList
    }

    private set current(value: BehaviorItemLoopGameModel) {
        this._current = value
    }

    private set currentHierarchy(value: number) {
        this._currentHierarchy = value
    }

    private get currentHierarchy(): number {
        return this._currentHierarchy
    }

    *[Symbol.iterator](): IterableIterator<BehaviorItemLoopGameModel> {
        while (true) {
            const lastHierarchy: number = this.currentHierarchy

            yield this.current
            
            this.next()

            if (this.currentHierarchy <= lastHierarchy) break
        }
    }

    get current(): BehaviorItemLoopGameModel {
        return this._current
    }

    next(): BehaviorItemLoopGameModel {
        for (const behavior of this.behaviorList) {
            if (behavior.config.hierarchy === this.currentHierarchy + 1) {
                this.currentHierarchy++

                this.current = behavior

                break
            }
        }

        return this.current
    }
}