import index from '../../../../../index'

import { FactoryItemLoopGameModel } from '../../item/factory/model/factory.item.loop.game.model'
import { ItemLoopGameModel } from '../../item/model/item.loop.game.model'
import { IteratorLoopGameModel } from './iterator.loop.game.model'

describe('Testing game loop iterator', () => {
    if (!index) fail(new Error('Index not loaded'))

    const factory: FactoryItemLoopGameModel = FactoryItemLoopGameModel.instance

    it('Checking if the game loop iterator iterate on all loop item', () => {
        let itemCheckList: Array<ItemLoopGameModel> = factory.getAll()

        const ite: IteratorLoopGameModel = new IteratorLoopGameModel()

        for (const iteItem of ite) {
            itemCheckList = itemCheckList.filter((item: ItemLoopGameModel) => item !== iteItem)
        }

        expect(itemCheckList).toHaveSize(0)
    })

    it('Checking if the game loop iterator can iterate with the exact entered turn count', () => {
        const ite: IteratorLoopGameModel = new IteratorLoopGameModel(2)

        for (const iteItem of ite) {
            
        }

        expect(ite.turnCount).toBe(2)
    })
})
