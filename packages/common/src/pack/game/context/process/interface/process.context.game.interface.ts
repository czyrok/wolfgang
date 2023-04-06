import { StorageVotePlayerGameModel } from '../../../player/vote/storage/model/storage.vote.player.game.model'

import { ProcessContextGameEnum } from '../enum/process.context.game.enum'

import { ProcessContextGameType } from '../type/process.context.game.type'

export interface ProcessContextGameInterface extends ProcessContextGameType {
    [ProcessContextGameEnum.VOTE_STORAGE]?: StorageVotePlayerGameModel
}