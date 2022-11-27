import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../../user/model/user.model'

import { PlayerGameInterface } from '../interface/player.game.interface'

@Exclude()
@CollectionName()
export class PlayerGameModel extends DocumentModel implements PlayerGameInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    activityDate!: Date

    @Expose()
    @prop({ required: true, default: 0 })
    inactivityLevel!: number

    @Expose()
    @prop({ required: true, default: false })
    isMayor!: boolean

    @Expose()
    @prop({ required: true, default: 0 })
    gamePointsAccumulated!: number
}

export const PlayerGameModelDocument = getModelForClass(PlayerGameModel)