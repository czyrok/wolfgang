import { IteratorChainedListInterface } from 'common'

import { IteratorItemLoopGameModel } from '../../../../../iterator/model/iterator.item.loop.game.model'
import { BehaviorCardItemLoopGameModel } from '../../../model/behavior.card.item.loop.game.model'

export class IteratorHierarchyBehaviorCardItemLoopGameModel implements IteratorChainedListInterface<BehaviorCardItemLoopGameModel> {
    private _current: BehaviorCardItemLoopGameModel
    private _currentIndex: number = 0

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

            yield this.next()
        }
    }

    get current(): BehaviorCardItemLoopGameModel {
        return this._current
    }

    next(): BehaviorCardItemLoopGameModel {
        let iterator: IteratorItemLoopGameModel = new IteratorItemLoopGameModel

        loop: for (let item of iterator) {
            for (let cardBehavior of item.getCardBehavior()) {
                if (cardBehavior.campHierarchy == this.currentIndex + 1) {
                    this.currentIndex++

                    this.current = cardBehavior
                    break loop
                }
            }
        }

        return this._current
    }
}