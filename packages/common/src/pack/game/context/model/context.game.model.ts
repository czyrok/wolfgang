import { KeyNotFoundMapParamError } from '../../../param/map/key-not-found/error/key-not-found.map.param.error'

import { ResContextGameModel } from '../res/model/res.context.game.model'
import { StorageVotePlayerGameModel } from '../../player/vote/storage/model/storage.vote.player.game.model'
import { ManagerChatGameModel } from '../../chat/manager/model/manager.chat.game.model'

import { ProcessContextGameInterface } from '../process/interface/process.context.game.interface'
import { StorageMapParamInterface } from '../../../param/map/storage/interface/storage.map.param.interface'

import { ProcessContextGameEnum } from '../process/enum/process.context.game.enum'

import { NextContextGameType } from '../next/type/next.context.game.type'
import { ResultSetGameType } from '../../set/result/type/result.set.game.type'

export class ContextGameModel implements ProcessContextGameInterface, StorageMapParamInterface<ContextGameModel, ProcessContextGameEnum> {
    [ProcessContextGameEnum.VOTE_STORAGE]?: StorageVotePlayerGameModel
    [ProcessContextGameEnum.CHAT_MANAGER]?: ManagerChatGameModel

    private _next: NextContextGameType
    private _res: ResContextGameModel = new ResContextGameModel

    private constructor(
        parentContext?: ContextGameModel,
        private _previousResult?: ResultSetGameType
    ) {
        this._next = (result?: ResultSetGameType) => {
            this.res.next(result)
        }

        if (parentContext !== undefined) this.setHeritage(parentContext)

        if (parentContext && parentContext.previousResult && !this._previousResult)
            this._previousResult = parentContext.previousResult
    }

    public get next(): (result?: ResultSetGameType) => void {
        return this._next
    }

    public get res(): ResContextGameModel {
        return this._res
    }

    public get previousResult(): ResultSetGameType {
        return this._previousResult
    }

    has(...keys: Array<ProcessContextGameEnum>): void {
        const currentKeys: Array<ProcessContextGameEnum> = Object.keys(this) as Array<ProcessContextGameEnum>

        for (const key of keys) {
            if (currentKeys.indexOf(key) == -1 || !this[key]) {
                throw new KeyNotFoundMapParamError(key)
            }
        }
    }

    setHeritage(parent: ContextGameModel): void {
        const currentKeys: Array<ProcessContextGameEnum> = Object.keys(this) as Array<ProcessContextGameEnum>,
            parentKeys: Array<ProcessContextGameEnum> = Object.keys(parent) as Array<ProcessContextGameEnum>

        for (const key of parentKeys) {
            if (currentKeys.indexOf(key) == -1) this[key] = parent[key] as any
        }
    }

    public static buildContext(
        parentContext?: ContextGameModel,
        preivousResult?: ResultSetGameType
    ): ContextGameModel {
        return new ContextGameModel(
            parentContext,
            preivousResult
        )
    }
}