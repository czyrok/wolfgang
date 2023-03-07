import { EmitOnFail, EmitOnSuccess, OnMessage, SocketController, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { plainToInstance } from 'class-transformer'
import { LeanDocument } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { Request } from 'express'
import { Socket } from 'socket.io'
import { CardsProposalFormControllerModel, CardsProposalUserModelDocument, CardsProposalUserModel, UserModel, NotFoundUserError } from 'common'

@SocketController({
    namespace: '/game/cards-proposal',
    init: () => { }
})
export class CardsProposalGameController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async add(@ConnectedSocket() socket: Socket, @MessageBody() cardProposalForm: CardsProposalFormControllerModel) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const cardProposal: DocumentType<CardsProposalUserModel> = new CardsProposalUserModelDocument(new CardsProposalUserModel(cardProposalForm.title, cardProposalForm.desc))

        cardProposal.user = user

        await cardProposal.save()
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async list() {
        const cardsProposalListObj: Array<LeanDocument<CardsProposalUserModel>> = await CardsProposalUserModelDocument.find().populate('user', 'skin').lean().exec()

        return plainToInstance(CardsProposalUserModel, cardsProposalListObj)
    }
}