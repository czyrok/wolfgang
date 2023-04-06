import { FactoryItemLoopGameModel } from '../../item/factory/model/factory.item.loop.game.model'

import { ItemLoopGameModel } from '../../item/model/item.loop.game.model'

import { IteratorChainedListInterface } from '../../../../chained-list/iterator/interface/iterator.chained-list.interface'

import { TypeItemLoopGameEnum } from '../../item/type/enum/type.item.loop.game.enum'

export class IteratorLoopGameModel implements IteratorChainedListInterface<ItemLoopGameModel> {
    private _defaultType: TypeItemLoopGameEnum = TypeItemLoopGameEnum.DEFAULT

    private _nextIndexCurrent: number = 1
    private _current: ItemLoopGameModel = FactoryItemLoopGameModel.instance.get(this.defaultType)

    private _turnCount: number = 0
    private _hasStarted: boolean = false

    public constructor(
        private _maxTurnCount: number = 1
    ) { }

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

    private set turnCount(value: number) {
        this._turnCount = value
    }

    public get turnCount(): number {
        return this._turnCount
    }

    private set hasStarted(value: boolean) {
        this._hasStarted = value
    }

    private get hasStarted(): boolean {
        return this._hasStarted
    }

    private get maxTurnCount(): number {
        return this._maxTurnCount
    }

    *[Symbol.iterator](): IterableIterator<ItemLoopGameModel> {
        this.turnCount = 0
        this.hasStarted = false

        while (true) {
            if (this.turnCount >= this.maxTurnCount) break

            this.checkTurn()

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

    private checkTurn(): void {
        if (this.hasStarted && this.nextIndexCurrent == 1 && this.current.config.type == this.defaultType)
            this.turnCount++

        this.hasStarted = true
    }
}