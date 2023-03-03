import { SocketController, EmitOnSuccess, EmitOnFail, OnConnect, OnDisconnect, SkipEmitOnEmptyResult, OnMessage, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { BasicUserReportModel, BasicUserReportModelDocument, NotFoundReportError, BugReportModel, BugReportModelDocument, NotFoundUserError, OtherUserReportModel, OtherUserReportModelDocument, ReportModel, TypeReportEnum, UserModel, UserModelDocument, ReportModelDocument, GameModel, GameModelDocument, PlayerGameModel, NotFoundInGamePlayerGameError, TypeChatGameEnum, MessageChatGameModel, ChatGameModel, ChatGameModelDocument, NotFoundChatGameError, UserMessageChatGameModelDocument, EventMessageChatGameModelDocument, TypeMessageChatGameEnum, UserMessageChatGameModel } from 'common'
import { Socket } from 'socket.io';
import { Request } from 'express';

@SocketController({
    namespace: '/managing/report',
    init: () => { }
})
export class ReportManagingController {
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
    async check(@MessageBody() reportId: string) {
        const bugReport: DocumentType<BugReportModel> | null = await BugReportModelDocument.findById(reportId).exec()

        if (bugReport) return true

        const basicReport: DocumentType<BasicUserReportModel> | null = await BasicUserReportModelDocument.findById(reportId).exec()

        if (basicReport) return true

        const otherReport: DocumentType<OtherUserReportModel> | null = await OtherUserReportModelDocument.findById(reportId).exec()

        if (otherReport) return true

        throw new NotFoundReportError
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @OnMessage()
    async list() {
        const reportDocList: Array<DocumentType<ReportModel>> = await BugReportModelDocument.find().exec()

        const basicUserReportDocList: Array<DocumentType<BasicUserReportModel>> = await BasicUserReportModelDocument.find({ punished: false }).exec(),
            otherUserReportDocList: Array<DocumentType<OtherUserReportModel>> = await OtherUserReportModelDocument.find({ punished: false }).exec()

        reportDocList.push(...basicUserReportDocList)
        reportDocList.push(...otherUserReportDocList)

        let reportList: Array<ReportModel> = new Array()

        for (const reportDoc of reportDocList) {
            const id: string = reportDoc._id.toString()
            const report: ReportModel = reportDoc.toObject()
            report._id = id
            reportList.push(report)
        }

        reportList = reportList.sort((report1: ReportModel, report2: ReportModel) =>
            report1.releaseDate.getTime() - report2.releaseDate.getTime())

        return reportList
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() id: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null = await BugReportModelDocument.findById(id).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(id).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(id).exec()

        if (!reportDoc) throw new NotFoundReportError

        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(reportDoc.user).exec()

        if (user === null) throw new NotFoundUserError

        reportDoc.user = user

        if (reportDoc.type === TypeReportEnum.BUG) return reportDoc.toObject()

        const usersList: Array<DocumentType<UserModel>> = new Array()

        reportDoc = reportDoc as DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel>

        for (const oneUser of reportDoc.concernedUsers) {
            const user: DocumentType<UserModel> | null = await UserModelDocument.findById(oneUser).exec()

            if (user === null) throw new NotFoundUserError
            usersList.push(user)
        }

        reportDoc.concernedUsers = usersList

        return reportDoc.toObject()
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async getChat(@ConnectedSocket() socket: Socket, @MessageBody() id: string) {
        let reportDoc: DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null = await BasicUserReportModelDocument.findById(id).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(id).exec()
        if (!reportDoc) throw new NotFoundReportError


        let messages: Array<MessageChatGameModel> = new Array

        const chatTypeList: Array<TypeChatGameEnum> = new Array()
        chatTypeList.push(TypeChatGameEnum.ALIVE)
        chatTypeList.push(TypeChatGameEnum.COUPLE)
        chatTypeList.push(TypeChatGameEnum.DEATH)
        chatTypeList.push(TypeChatGameEnum.WEREWOLF)

        for (const chatType of chatTypeList) {
            const chatDoc: DocumentType<ChatGameModel> | null = await ChatGameModelDocument.getChat(reportDoc.gameId, chatType)

            if (!chatDoc) continue

            for (const messageDocId of chatDoc.messages) {
                let messageDoc: DocumentType<MessageChatGameModel> | null = await UserMessageChatGameModelDocument.findById(messageDocId).exec()

                if (!messageDoc) messageDoc = await EventMessageChatGameModelDocument.findById(messageDocId).exec()
                if (!messageDoc) continue

                if (messageDoc.type == TypeMessageChatGameEnum.USER) {
                    const userDoc: DocumentType<UserModel> | null = await UserModelDocument.findById((messageDoc as DocumentType<UserMessageChatGameModel>).user)

                    if (userDoc) (messageDoc as DocumentType<UserMessageChatGameModel>).user = userDoc
                }

                messages.push(messageDoc.toObject())
            }
        }

        messages = messages.sort((message1: MessageChatGameModel, message2: MessageChatGameModel) =>
            message1.releaseDate.getTime() - message2.releaseDate.getTime())

        return messages
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async delete(@MessageBody() id: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null = await BugReportModelDocument.findById(id).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(id).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(id).exec()
        if (!reportDoc) throw new NotFoundReportError

        await reportDoc.deleteOne({ id: id })
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async update(@MessageBody() id: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null = await BugReportModelDocument.findById(id).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(id).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(id).exec()

        if (!reportDoc) throw new NotFoundReportError

        await reportDoc.updateOne({ punished: true })
    }
}