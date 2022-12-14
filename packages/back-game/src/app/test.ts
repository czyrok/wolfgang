import { TypeBehaviorCardItemLoopGameEnum } from 'common'

import { FactoryCardBehaviorItemLoopGameUtil } from './game/loop/item/card/behavior/factory/util/factory.behavior.card.item.loop.game.util'
import { FactoryCardPlayerGameUtil } from './game/player/card/factory/util/factory.card.player.game.util'

import { BehaviorCardItemLoopGameModel } from './game/loop/item/card/behavior/model/behavior.card.item.loop.game.model'
import { OneItemLoopGameModel } from './game/loop/item/one/model/one.item.loop.game.model'
import { ContextParamItemLoopGameModel } from './game/loop/item/param/context/model/context.param.item.loop.game.model'
import { CardPlayerGameModel } from './game/player/card/model/card.player.game.model'

import { TypeCardPlayerGameEnum } from './game/player/card/type/enum/type.card.player.game.enum'

export class TestItemLoop extends OneItemLoopGameModel {
    public constructor() {
        super(true, FactoryCardBehaviorItemLoopGameUtil.get(TypeBehaviorCardItemLoopGameEnum.VILLAGER))
    }

    public objectBuildingEnd(): void {
        throw new Error('Method not implemented.');
    }
}

export class TestBehaviorCardItemLoop extends BehaviorCardItemLoopGameModel {
    public constructor() {
        super(
            'test',
            5,
            5,
            [
                FactoryCardPlayerGameUtil.get(TypeCardPlayerGameEnum.VILLAGER)
            ]
        )
    }

    public validCondition(context: ContextParamItemLoopGameModel): boolean {
        throw new Error('Method not implemented.');
    }
    public doAtBeginning(context: ContextParamItemLoopGameModel): void {
        throw new Error('Method not implemented.');
    }
    public doAtEnd(context: ContextParamItemLoopGameModel): void {
        throw new Error('Method not implemented.');
    }
}

export class TestCardPlayer extends CardPlayerGameModel {
    public constructor() {
        super('test')
    }
}