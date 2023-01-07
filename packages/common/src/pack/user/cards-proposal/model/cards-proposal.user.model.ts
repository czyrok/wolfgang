import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { CardsProposalUserInterface } from '../interface/cards-proposal.user.interface'

@Exclude()
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

export const CardsProposalUserModelDocument = getModelForClass(CardsProposalUserModel, { schemaOptions: { collection: 'cards_proposal_user' } })