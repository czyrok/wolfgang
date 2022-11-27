import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../../model/document.model'
import { PlayerGameModel } from '../../model/player.game.model'

import { VotePlayerGameInterface } from '../interface/vote.player.game.interface'

@Exclude()
@CollectionName()
export class VotePlayerGameModel extends DocumentModel implements VotePlayerGameInterface {
    @Expose()
    @prop({ required: true, ref: () => PlayerGameModel })
    playerSender!: Ref<PlayerGameModel>

    @Expose()
    @prop({ required: true, ref: () => PlayerGameModel })
    playerReceiver!: Ref<PlayerGameModel>

    @Expose()
    @prop({ required: true })
    message!: string
}

export const VotePlayerGameModelDocument = getModelForClass(VotePlayerGameModel)