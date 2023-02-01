import { EmitOnFail, SocketRequest, EmitOnSuccess, OnConnect, OnDisconnect, OnMessage, SocketController, MessageBody, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { LeanDocument } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { VoteCardsProposalUserModelDocument, VoteCardsProposalUserModel, CardsProposalFormControllerModel, CardsProposalUserModelDocument, CardsProposalUserModel, NotFoundCardsProposalUserError, UserModel, TypeVoteEnum, UserModelDocument, NotFoundUserError } from 'common'

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
    @EmitOnSuccess()
    async add(@SocketRequest() req: any, @MessageBody() cardProposalForm: CardsProposalFormControllerModel) {
        // #achan vérifier si pas undefined
        const proposal: DocumentType<CardsProposalUserModel> = new CardsProposalUserModelDocument(new CardsProposalUserModel(cardProposalForm.title, cardProposalForm.desc))

        proposal.user = req.session.user

        await proposal.save()
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

        if (userVote === null || userVote.type === undefined) {
            cardProposal.thumbsDownCount++

            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal, TypeVoteEnum.THUMBSDOWNCOUNT)
            vote.user = req.session.user

            const userVote: DocumentType<VoteCardsProposalUserModel> | null = new VoteCardsProposalUserModelDocument(vote)
            
            await userVote.save()
            await cardProposal.save()

            const obj: VoteCardsProposalUserModel = userVote.toObject()

            return obj
        }
        else if (userVote.type === TypeVoteEnum.THUMBSDOWNCOUNT) {

            cardProposal.thumbsDownCount--
            userVote.type = TypeVoteEnum.UNVOTED
        }
        else if (userVote.type === TypeVoteEnum.THUMBSUPCOUNT) {

            cardProposal.thumbsDownCount++
            cardProposal.thumbsUpCount--
            userVote.type = TypeVoteEnum.THUMBSDOWNCOUNT

        } else if (userVote.type === TypeVoteEnum.UNVOTED) {

            cardProposal.thumbsDownCount++
            userVote.type = TypeVoteEnum.THUMBSDOWNCOUNT
        }

        await cardProposal.save()
        await userVote.save()

        const obj: VoteCardsProposalUserModel = userVote.toObject()

        return obj
    }

    @OnMessage()
    @EmitOnSuccess()
    async upThumbsUpCount(@SocketRequest() req: any, @MessageBody() id: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
            .findById(id)
            .exec() as DocumentType<CardsProposalUserModel>

        const userVote: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
            .findOne({ user: req.session.user.id, cardProposal: cardProposal._id }).exec()

        if (userVote === null || userVote.type === undefined) {
            cardProposal.thumbsUpCount++

            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal, TypeVoteEnum.THUMBSUPCOUNT)
            vote.user = req.session.user

            const userVote: DocumentType<VoteCardsProposalUserModel> | null = new VoteCardsProposalUserModelDocument(vote)
            
            await userVote.save()
            await cardProposal.save()

            const obj: VoteCardsProposalUserModel = userVote.toObject()

            return obj
        }
        else if (userVote.type === TypeVoteEnum.THUMBSUPCOUNT) {

            cardProposal.thumbsUpCount--
            userVote.type = TypeVoteEnum.UNVOTED
            console.log('Unvoted')
        }
        else if (userVote.type === TypeVoteEnum.THUMBSDOWNCOUNT) {

            cardProposal.thumbsUpCount++
            cardProposal.thumbsDownCount--
            userVote.type = TypeVoteEnum.THUMBSUPCOUNT

        } else if (userVote.type === TypeVoteEnum.UNVOTED) {

            cardProposal.thumbsUpCount++
            userVote.type = TypeVoteEnum.THUMBSUPCOUNT
        }

        await cardProposal.save()
        await userVote.save()

        const obj: VoteCardsProposalUserModel = userVote.toObject()

        return obj
    }

}