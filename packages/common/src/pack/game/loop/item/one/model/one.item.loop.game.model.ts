import { BehaviorNotDefinedOneItemLoopGameError } from '../error/behavior-not-defined.one.item.loop.game.error'

import { LogUtil } from '../../../../../log/util/log.util'

import { FactoryBehaviorItemLoopGameModel } from '../../behavior/factory/model/factory.behavior.item.loop.game.model'
import { BehaviorItemLoopGameModel } from '../../behavior/model/behavior.item.loop.game.model'
import { ItemLoopGameModel } from '../../model/item.loop.game.model'
import { ContextGameModel } from '../../../../context/model/context.game.model'
import { PlayerGameModel } from '../../../../player/model/player.game.model'

import { ConfigItemLoopGameInterface } from '../../config/interface/config.item.loop.game.interface'

import { TypeLogEnum } from '../../../../../log/type/enum/type.log.enum'

import { ResultSetGameType } from '../../../../set/result/type/result.set.game.type'
import { TypeChatGameEnum } from '../../../../chat/type/enum/type.chat.game.enum'

export abstract class OneItemLoopGameModel extends ItemLoopGameModel {
    private _behavior: BehaviorItemLoopGameModel

    public constructor(config: ConfigItemLoopGameInterface) {
        super(config)

        const behavior = FactoryBehaviorItemLoopGameModel.instance.get(config.behaviorTypeList[0])

        if (behavior === undefined) throw new BehaviorNotDefinedOneItemLoopGameError(this.config.type)

        this._behavior = behavior
    }

    public get behavior(): BehaviorItemLoopGameModel {
        return this._behavior
    }

    async entryPoint(context: ContextGameModel): Promise<boolean> {
        LogUtil.logger(TypeLogEnum.GAME).info(`${this.config.type} loop item entrypoint triggered`)

        const childContext: ContextGameModel = ContextGameModel.buildContext(context, context.previousResult)

        if (!(await this.behavior.validCondition(childContext))) {
            context.next()

            return false
        }

        childContext.res.subscribeOne((result: ResultSetGameType) => {
            context.next(result)
        })

        await this.behavior.entryPoint(childContext)

        return true
    }

    getBehavior(): Array<BehaviorItemLoopGameModel> {
        return [this.behavior]
    }

    getPlayerBehavior(player: PlayerGameModel): Array<BehaviorItemLoopGameModel> {
        const test: Array<PlayerGameModel> = this.behavior.players.filter((behaviorPlayer: PlayerGameModel) => behaviorPlayer.user._id === player.user._id)
        
        if (test.length > 0) return [this.behavior]

        return []
    }

    getTimerBehavior(): number {
        return this.behavior.config.timer
    }

    setup(): void {
        this.behavior.setup()
    }

    getChatType(): Array<TypeChatGameEnum> {
        return this.behavior.getChatType()
    }

    async createChat(gameId: string): Promise<void> {
        await this.behavior.createChat(gameId)
    }
}