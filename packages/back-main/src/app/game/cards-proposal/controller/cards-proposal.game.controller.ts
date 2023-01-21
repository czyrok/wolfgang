import { EmitOnFail, SocketRequest, EmitOnSuccess, OnConnect, OnDisconnect, OnMessage, SocketController, MessageBody, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { LeanDocument } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { CardsProposalUserModelDocument, CardsProposalUserModel, NotFoundCardsProposalUserError } from 'common'

@SocketController({
    namespace: '/game/cards-proposal',
    init: () => { }
})
export class CardsProposalGameController {
    @OnConnect()
    connection() {
        console.log('client connected');
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
    async add(@SocketRequest() req: any, @MessageBody() cardProposal: CardsProposalUserModel) {
        // #achan vérifier si pas undefined
        cardProposal.user = req.user

        const proposal = new CardsProposalUserModelDocument(cardProposal)

        await proposal.save()

        return [proposal]
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
}