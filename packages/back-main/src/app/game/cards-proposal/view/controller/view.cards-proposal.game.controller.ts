import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, ConnectedSocket, NamespaceParam } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { LeanDocument } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { Request } from 'express'
import { Socket } from 'socket.io'
import { VoteCardsProposalUserModelDocument, VoteCardsProposalUserModel, CardsProposalUserModelDocument, CardsProposalUserModel, NotFoundCardsProposalUserError, UserModel, TypeVoteEnum, UserModelDocument, NotFoundUserError } from 'common'

@SocketController({
    namespace: '/game/cards-proposal/view/:card_proposal_id',
    init: () => { }
})
export class ViewCardsProposalGameController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@NamespaceParam('card_proposal_id') cardProposalId: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).exec()

        if (!cardProposal) throw new NotFoundCardsProposalUserError

        return true
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async view(@NamespaceParam('card_proposal_id') cardProposalId: string) {
        const cardProposalObj: LeanDocument<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).populate('user', 'skin').lean().exec()

        if (!cardProposalObj) throw new NotFoundCardsProposalUserError

        return plainToInstance(CardsProposalUserModel, cardProposalObj)
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async user(@NamespaceParam('card_proposal_id') cardProposalId: string) {
        const cardProposal: DocumentType<CardsProposalUserModel> | null = await CardsProposalUserModelDocument.findById(cardProposalId).populate('user', 'skin').exec()

        if (!cardProposal) throw new NotFoundCardsProposalUserError

        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(cardProposal.user).exec()

        if (!user) throw new NotFoundUserError

        const userObj: UserModel = user.toObject()

        return userObj
    }

    @OnMessage()
    @EmitOnSuccess()
    async upThumbsDownCount(@ConnectedSocket() socket: Socket, @NamespaceParam('card_proposal_id') cardProposalId: string) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
            .findById(cardProposalId)
            .exec() as DocumentType<CardsProposalUserModel>

        const userVoteCardsProposal: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
            .findOne({ user: user.id, cardProposal: cardProposal._id }).exec()

        if (userVoteCardsProposal === null || userVoteCardsProposal.type === undefined) {
            cardProposal.thumbsDownCount++

            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal, TypeVoteEnum.THUMBSDOWNCOUNT)
            vote.user = user

            const userVoteCardsProposal: DocumentType<VoteCardsProposalUserModel> | null = new VoteCardsProposalUserModelDocument(vote)

            await userVoteCardsProposal.save()
            await cardProposal.save()

            const obj: VoteCardsProposalUserModel = userVoteCardsProposal.toObject()

            return obj
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.THUMBSDOWNCOUNT) {
            cardProposal.thumbsDownCount--

            userVoteCardsProposal.delete()

            await cardProposal.save()

            return
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.THUMBSUPCOUNT) {
            cardProposal.thumbsDownCount++
            cardProposal.thumbsUpCount--

            userVoteCardsProposal.type = TypeVoteEnum.THUMBSDOWNCOUNT
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.UNVOTED) {
            cardProposal.thumbsDownCount++

            userVoteCardsProposal.type = TypeVoteEnum.THUMBSDOWNCOUNT
        }

        await cardProposal.save()
        await userVoteCardsProposal.save()

        const obj: VoteCardsProposalUserModel = userVoteCardsProposal.toObject()

        return obj
    }

    @OnMessage()
    @EmitOnSuccess()
    async upThumbsUpCount(@ConnectedSocket() socket: Socket, @NamespaceParam('card_proposal_id') cardProposalId: string) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
            .findById(cardProposalId)
            .exec() as DocumentType<CardsProposalUserModel>

        const userVoteCardsProposal: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
            .findOne({ user: user.id, cardProposal: cardProposal._id }).exec()

        if (userVoteCardsProposal === null || userVoteCardsProposal.type === undefined) {
            cardProposal.thumbsUpCount++

            const vote: VoteCardsProposalUserModel = new VoteCardsProposalUserModel(cardProposal, TypeVoteEnum.THUMBSUPCOUNT)
            vote.user = user

            const userVoteCardsProposal: DocumentType<VoteCardsProposalUserModel> | null = new VoteCardsProposalUserModelDocument(vote)

            await userVoteCardsProposal.save()
            await cardProposal.save()

            const obj: VoteCardsProposalUserModel = userVoteCardsProposal.toObject()

            return obj
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.THUMBSUPCOUNT) {
            cardProposal.thumbsUpCount--

            userVoteCardsProposal.delete()

            await cardProposal.save()

            return
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.THUMBSDOWNCOUNT) {
            cardProposal.thumbsUpCount++
            cardProposal.thumbsDownCount--

            userVoteCardsProposal.type = TypeVoteEnum.THUMBSUPCOUNT
        }
        else if (userVoteCardsProposal.type === TypeVoteEnum.UNVOTED) {
            cardProposal.thumbsUpCount++

            userVoteCardsProposal.type = TypeVoteEnum.THUMBSUPCOUNT
        }

        await cardProposal.save()
        await userVoteCardsProposal.save()

        const obj: VoteCardsProposalUserModel = userVoteCardsProposal.toObject()

        return obj
    }

    @OnMessage()
    @EmitOnSuccess()
    async initTypeUserVoteCardProposal(@ConnectedSocket() socket: Socket, @NamespaceParam('card_proposal_id') cardProposalId: string) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const cardProposal: DocumentType<CardsProposalUserModel> = await CardsProposalUserModelDocument
            .findById(cardProposalId)
            .exec() as DocumentType<CardsProposalUserModel>

        const userVoteCardsProposal: DocumentType<VoteCardsProposalUserModel> | null = await VoteCardsProposalUserModelDocument
            .findOne({ user: user.id, cardProposal: cardProposal._id }).exec()

        if (!userVoteCardsProposal) throw new NotFoundCardsProposalUserError

        const obj: VoteCardsProposalUserModel = userVoteCardsProposal.toObject()

        return obj
    }
}