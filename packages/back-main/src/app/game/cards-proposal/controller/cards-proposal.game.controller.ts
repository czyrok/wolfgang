import { EmitOnFail, SocketRequest, EmitOnSuccess, OnConnect, OnDisconnect, OnMessage, SocketController, MessageBody, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { LeanDocument } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { VoteCardsProposalUserModelDocument, VoteCardsProposalUserModel,CardsProposalUserModelDocument, CardsProposalUserModel, NotFoundCardsProposalUserError, UserModel, TypeVoteEnum, UserModelDocument, NotFoundUserError } from 'common'

@SocketController({
    namespace: '/game/cards-proposal',
    init: () => { }
})
export class CardsProposalGameController {
    @OnConnect()
    connection() {
        console.log('client connectede');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@MessageBody() cardProposalId: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).exec()

        if (!cardProposal) throw new NotFoundCardsProposalUserError

        return true
    }

    @OnMessage()
    @EmitNamespaceBroadcastOnSuccess('list')
    @EmitOnFail()
    async add( @SocketRequest() req: any/*, @MessageBody() cardProposal: CardsProposalUserModel */) {
        // #achan vérifier si pas undefined
        console.log('addd')
        
        const proposal: CardsProposalUserModel = new CardsProposalUserModel('titre','description')
        proposal.user = req.session.user
        console.log(proposal)
        await new CardsProposalUserModelDocument(proposal).save()
        
         /* proposal.save() */

        /* return [proposal] */
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async list() {
        const cardsProposalListObj: Array<LeanDocument<CardsProposalUserModel>> = await CardsProposalUserModelDocument.find().populate('user', 'skin').lean().exec()

        return plainToInstance(CardsProposalUserModel, cardsProposalListObj)
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async view(@MessageBody() cardProposalId: string) {
        const cardProposalObj: LeanDocument<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).populate('user', 'skin').lean().exec()

        if (!cardProposalObj) throw new NotFoundCardsProposalUserError
        
        return plainToInstance(CardsProposalUserModel, cardProposalObj)
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async user(@MessageBody() cardProposalId: string) {
 
        const cardProposalObj: DocumentType<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).populate('user', 'skin').exec()

        if (!cardProposalObj) throw new NotFoundCardsProposalUserError

        const userObj: DocumentType<UserModel> | null = await UserModelDocument.findById(cardProposalObj.user).exec()

        if (!userObj) throw new NotFoundUserError
        const obj: UserModel = userObj?.toObject()
        return obj
    }


    @OnMessage()
    @EmitOnSuccess()
    async upThumbsDownCount(@SocketRequest() req: any, @MessageBody() id: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
        .findById(id)
        .exec() as DocumentType<CardsProposalUserModel>
        
        const userVote: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
        .findOne({ user: req.session.user.id, cardProposal: cardProposal._id }).exec()

        if(userVote===null || userVote.type === undefined){
            cardProposal.thumbsDownCount++
 
            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal,TypeVoteEnum.THUMBSDOWNCOUNT)
            vote.user = req.session.user

            await new VoteCardsProposalUserModelDocument(vote).save()
            await cardProposal.save()
            console.log('slt1111')

            return vote
        }
        else if(userVote.type === TypeVoteEnum.THUMBSDOWNCOUNT){

            cardProposal.thumbsDownCount--
            userVote.type=TypeVoteEnum.UNVOTED
        }
        else if(userVote.type === TypeVoteEnum.THUMBSUPCOUNT){

            cardProposal.thumbsDownCount++
            cardProposal.thumbsUpCount--
            userVote.type = TypeVoteEnum.THUMBSDOWNCOUNT 
  
        }else if(userVote.type === TypeVoteEnum.UNVOTED){

            cardProposal.thumbsDownCount++
            userVote.type=TypeVoteEnum.THUMBSDOWNCOUNT
        }

        /* cardProposal.update({thumbsDownCount: cardProposal.thumbsDownCount } )
        cardProposal.update({thumbsUpCount: cardProposal.thumbsUpCount-- } )
        cardProposal.update({type: userVote.type } ) */

        await cardProposal.save()
        await userVote.save()

        const obj: VoteCardsProposalUserModel = userVote.toObject()

        console.log('slt12')

        return obj
    }

    @OnMessage()
    @EmitOnSuccess()
    async upThumbsUpCount(@SocketRequest() req: any,@MessageBody() id: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
            .findById(id)
            .exec() as DocumentType<CardsProposalUserModel>

        const userVote: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
            .findOne({ user: req.session.user.id, cardProposal: cardProposal._id }).exec()
            
        if(userVote===null || userVote.type === undefined){
            cardProposal.thumbsUpCount++

            cardProposal.updateOne({thumbsDownCount: cardProposal.thumbsDownCount})
            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal,TypeVoteEnum.THUMBSUPCOUNT)

            vote.user = req.session.user

            await new VoteCardsProposalUserModelDocument(vote).save()

            console.log('slt121122333')

            return vote
        }
        else if(userVote.type === TypeVoteEnum.THUMBSUPCOUNT){

            cardProposal.thumbsUpCount--
            userVote.type=TypeVoteEnum.UNVOTED
        }
        else if(userVote.type === TypeVoteEnum.THUMBSDOWNCOUNT){

            cardProposal.thumbsUpCount++
            cardProposal.thumbsDownCount--
            userVote.type = TypeVoteEnum.THUMBSUPCOUNT 

        }else if(userVote.type === TypeVoteEnum.UNVOTED){

            cardProposal.thumbsUpCount++
            userVote.type=TypeVoteEnum.THUMBSUPCOUNT
        }

        /* cardProposal.update({thumbsDownCount: cardProposal.thumbsDownCount } )
        cardProposal.update({thumbsUpCount: cardProposal.thumbsUpCount } )
        cardProposal.update({type: userVote.type }) */

        await cardProposal.save()
        await userVote.save()

        console.log('slt1233')

        const obj: VoteCardsProposalUserModel = userVote.toObject()

        return obj
    }

}