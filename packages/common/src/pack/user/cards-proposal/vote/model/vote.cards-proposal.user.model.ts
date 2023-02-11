import { Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../../model/document.model'
import { CardsProposalUserModel } from '../../model/cards-proposal.user.model'
import { UserModel } from '../../../model/user.model'

import { TypeVoteEnum } from '../type/enum/type.vote.enum'

@Exclude()
export class VoteCardsProposalUserModel extends DocumentModel {
    @Expose()
    @prop({ required: true, ref: () => UserModel })
    user!: Ref<UserModel>

    @Expose()
    @prop({ required: true, ref: () => UserModel })
    cardProposal!: Ref<CardsProposalUserModel>

    @Expose()
    @prop({ required: true, default: new Date() })
    releaseDate!: Date

    @Expose()
    @prop({ required: true})
    type!: TypeVoteEnum

    public constructor(cardProposal: Ref<CardsProposalUserModel>, type: TypeVoteEnum){
        super()
      
        this.cardProposal=cardProposal
        this.type=type
    } 
}

export const VoteCardsProposalUserModelDocument = getModelForClass(VoteCardsProposalUserModel, { schemaOptions: { collection: 'vote_cards_proposal_user' } })