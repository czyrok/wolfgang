import { IteratorLoopGameModel } from '../../../../../../iterator/model/iterator.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'

import { IteratorChainedListInterface } from '../../../../../../../../chained-list/iterator/interface/iterator.chained-list.interface'

export class IteratorHierarchyBehaviorCardItemLoopGameModel implements IteratorChainedListInterface<BehaviorCardItemLoopGameModel> {
    private _current!: BehaviorCardItemLoopGameModel
    private _currentIndex: number = 0

    public constructor() {
        let ite = new IteratorLoopGameModel

        loop : for (let item of ite) {
            for (let behavior of item.getCardBehavior()) {
                if (behavior.config.campHierarchy == this._currentIndex) {
                    this._current = behavior

                    break loop
                }
            }
        }
    }

    private set current(value: BehaviorCardItemLoopGameModel) {
        this._current = value
    }

    private set currentIndex(value: number) {
        this._currentIndex = value
    }

    private get currentIndex(): number {
        return this._currentIndex
    }

    *[Symbol.iterator](): IterableIterator<BehaviorCardItemLoopGameModel> {
        while (true) {
            let lastIndex: number = this.currentIndex

            if (this.currentIndex <= lastIndex) break

            yield this.current

            this.next()
        }
    }

    get current(): BehaviorCardItemLoopGameModel {
        return this._current
    }

    next(): BehaviorCardItemLoopGameModel {
        let iterator: IteratorLoopGameModel = new IteratorLoopGameModel

        loop: for (let item of iterator) {
            for (let cardBehavior of item.getCardBehavior()) {
                if (cardBehavior.config.campHierarchy == this.currentIndex + 1) {
                    this.currentIndex++

                    this.current = cardBehavior
                    break loop
                }
            }
        }

        return this._current
    }
}