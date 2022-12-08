import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { CollectionName } from '../../../decorator/collection-name.decorator'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { CardsProposalUserInterface } from '../interface/cards-proposal.user.interface'

@Exclude()
@CollectionName()
export class CardsProposalUserModel extends DocumentModel implements CardsProposalUserInterface {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, default: 0 })
    thumbsUpCount!: number

    @Expose()
    @prop({ required: true, default: 0 })
    thumbsDownCount!: number

    @Expose()
    @prop({ required: true })
    desc!: string

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const CardsProposalUserModelDocument = getModelForClass(CardsProposalUserModel)