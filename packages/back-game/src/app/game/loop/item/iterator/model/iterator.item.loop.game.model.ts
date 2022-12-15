import { IteratorChainedListInterface } from 'common'

import { FactoryItemLoopGameUtil } from '../../factory/util/factory.item.loop.game.util'

import { ItemLoopGameModel } from '../../model/item.loop.game.model'

import { TypeItemLoopGameEnum } from '../../type/enum/type.item.loop.game.enum'

export class IteratorItemLoopGameModel implements IteratorChainedListInterface<ItemLoopGameModel> {
    private _default: ItemLoopGameModel = FactoryItemLoopGameUtil.get(TypeItemLoopGameEnum.DEFAULT)
    private _current: ItemLoopGameModel = this.default

    private set current(value: ItemLoopGameModel) {
        this._current = value
    }

    private get default(): ItemLoopGameModel {
        return this._default
    }

    *[Symbol.iterator](): IterableIterator<ItemLoopGameModel> {
        let first: boolean = true

        while (true) {
            if (!first && this.default == this.current) break
            first = false

            //console.log('------')
            //console.log(this.current)

            yield this.current

            //console.log(this.next())
            this.next()
        }
    }

    get current(): ItemLoopGameModel {
        return this._current
    }

    next(): ItemLoopGameModel {
        this.current = this.current.nextItem

        return this.current
    }
}