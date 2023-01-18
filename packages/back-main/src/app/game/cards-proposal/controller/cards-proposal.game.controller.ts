import { EmitOnFail, SocketRequest, EmitOnSuccess, OnConnect, OnDisconnect, OnMessage, SkipEmitOnEmptyResult, SocketController, MessageBody, EmitNamespaceBroadcastOnSuccess } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { CardsProposalUserModelDocument, CardsProposalUserModel } from 'common'

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
    @EmitNamespaceBroadcastOnSuccess('list')
    @EmitOnFail()
    async add(@SocketRequest() req: any, @MessageBody() cardProposal: CardsProposalUserModel) {
        cardProposal.user = req.session.user

        const proposal = new CardsProposalUserModelDocument(cardProposal)

        await proposal.save()

        return [proposal]
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    async list() {
        let list = await CardsProposalUserModelDocument.find().populate('user', 'skin').lean().exec()
        let cardsProposaltList: Array<CardsProposalUserModel> = plainToInstance(CardsProposalUserModel, list)
        return cardsProposaltList
    }
    
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async view(@MessageBody() id: string){
        let obj = await CardsProposalUserModelDocument.findById(id).populate('user', 'skin').lean().exec()
        let card: CardsProposalUserModel = plainToInstance(CardsProposalUserModel, obj)
        return card
    }
}

