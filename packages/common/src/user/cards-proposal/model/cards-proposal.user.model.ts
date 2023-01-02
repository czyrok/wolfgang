import { Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { CardsProposalUserInterface } from '../interface/cards-proposal.user.interface'

@Exclude()
export class CardsProposalUserModel extends DocumentModel implements CardsProposalUserInterface {
    @Expose()
    @Prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @Prop({ required: true, default: 0 })
    thumbsUpCount!: number

    @Expose()
    @Prop({ required: true, default: 0 })
    thumbsDownCount!: number

    @Expose()
    @Prop({ required: true })
    desc!: string

    @Expose()
    @Prop({ required: true, default: new Date() })
    releaseDate!: Date
}

export const CardsProposalUserModelDocument = getModelForClass(CardsProposalUserModel, { schemaOptions: { collection: 'cards_proposal_user' } })