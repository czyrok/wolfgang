import { FactoryItemLoopGameModel } from '../../item/factory/model/factory.item.loop.game.model'

import { ItemLoopGameModel } from '../../item/model/item.loop.game.model'

import { IteratorChainedListInterface } from '../../../../chained-list/iterator/interface/iterator.chained-list.interface'

import { TypeItemLoopGameEnum } from '../../item/type/enum/type.item.loop.game.enum'

export class IteratorLoopGameModel implements IteratorChainedListInterface<ItemLoopGameModel> {
    private _defaultType: TypeItemLoopGameEnum = TypeItemLoopGameEnum.DEFAULT
    
    private _nextIndexCurrent: number = 1
    private _current: ItemLoopGameModel = FactoryItemLoopGameModel.instance.get(this.defaultType)

    private set current(value: ItemLoopGameModel) {
        this._current = value
    }

    private get defaultType(): TypeItemLoopGameEnum {
        return this._defaultType
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
            if (!first && this.nextIndexCurrent == 1 && this.current.config.type == this.defaultType) break
            first = false

            yield this.current

            this.next()
        }
    }

    get current(): ItemLoopGameModel {
        return this._current
    }

    next(): ItemLoopGameModel {
        if (!this.current.isInitialized) this.current.objectBuildEnding()

        this.nextIndexCurrent = this.current.nextIndex
        this.current = this.current.nextItem

        return this.current
    }
}