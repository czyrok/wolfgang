import { IteratorLoopGameModel } from '../../../../../iterator/model/iterator.loop.game.model'
import { BehaviorItemLoopGameModel } from '../../../model/behavior.item.loop.game.model'

import { IteratorChainedListInterface } from '../../../../../../../chained-list/iterator/interface/iterator.chained-list.interface'

export class IteratorHierarchyBehaviorItemLoopGameModel implements IteratorChainedListInterface<BehaviorItemLoopGameModel> {
    private _current!: BehaviorItemLoopGameModel
    private _currentIndex: number = 0

    public constructor() {
        let ite = new IteratorLoopGameModel

        loop : for (let item of ite) {
            for (let behavior of item.getBehavior()) {
                if (behavior.config.campHierarchy == this._currentIndex) {
                    this._current = behavior

                    break loop
                }
            }
        }
    }

    private set current(value: BehaviorItemLoopGameModel) {
        this._current = value
    }

    private set currentIndex(value: number) {
        this._currentIndex = value
    }

    private get currentIndex(): number {
        return this._currentIndex
    }

    *[Symbol.iterator](): IterableIterator<BehaviorItemLoopGameModel> {
        while (true) {
            let lastIndex: number = this.currentIndex

            if (this.currentIndex <= lastIndex) break

            yield this.current

            this.next()
        }
    }

    get current(): BehaviorItemLoopGameModel {
        return this._current
    }

    next(): BehaviorItemLoopGameModel {
        let iterator: IteratorLoopGameModel = new IteratorLoopGameModel

        loop: for (let item of iterator) {
            for (let behavior of item.getBehavior()) {
                if (behavior.config.campHierarchy == this.currentIndex + 1) {
                    this.currentIndex++

                    this.current = behavior
                    break loop
                }
            }
        }

        return this._current
    }
}