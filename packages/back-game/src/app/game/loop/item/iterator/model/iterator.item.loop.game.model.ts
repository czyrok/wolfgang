import { IteratorChainedListInterface } from 'common'

import { FactoryItemLoopGameUtil } from '../../factory/util/factory.item.loop.game.util'

import { ItemLoopGameModel } from '../../model/item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

export class IteratorItemLoopGameModel implements IteratorChainedListInterface<ItemLoopGameModel> {
    private _default: ItemLoopGameModel = FactoryItemLoopGameUtil.get(TypeItemLoopGameEnum.DEFAULT)
    
    private _current: ItemLoopGameModel = this.default
    private _nextIndexCurrent: number = 0

    private set current(value: ItemLoopGameModel) {
        this._current = value
    }

    private get default(): ItemLoopGameModel {
        return this._default
    }

    private set nextIndexCurrent(value: number) {
        this._nextIndexCurrent = value
    }

    private get nextIndexCurrent(): number {
        return this._nextIndexCurrent
    }

    *[Symbol.iterator](): IterableIterator<ItemLoopGameModel> {
        let first: boolean = true

        while (true) {
            if (!first && this.default == this.current && this.nextIndexCurrent == 0) break
            first = false

            yield this.current

            this.next()
        }
    }

    get current(): ItemLoopGameModel {
        return this._current
    }

    next(): ItemLoopGameModel {
        this.nextIndexCurrent = this.current.nextIndex
        this.current = this.current.nextItem

        return this.current
    }
}