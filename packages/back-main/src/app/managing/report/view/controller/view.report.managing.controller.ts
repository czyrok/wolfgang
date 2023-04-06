import { NamespaceParam, SocketController, EmitOnSuccess, EmitOnFail, OnMessage } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { BasicUserReportModel, BasicUserReportModelDocument, NotFoundReportError, BugReportModel, BugReportModelDocument, NotFoundUserError, OtherUserReportModel, OtherUserReportModelDocument, TypeReportEnum, UserModel, UserModelDocument, TypeChatGameEnum, MessageChatGameModel, ChatGameModel, ChatGameModelDocument, UserMessageChatGameModelDocument, EventMessageChatGameModelDocument, TypeMessageChatGameEnum, UserMessageChatGameModel } from 'common'

@SocketController({
    namespace: '/managing/report/view/:report_id',
    init: () => { }
})
export class ViewReportManagingController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async check(@NamespaceParam('report_id') reportId: string) {
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
    @OnMessage()
    async view(@NamespaceParam('report_id') reportId: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null
            = await BugReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(reportId).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) throw new NotFoundReportError

        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(reportDoc.user).exec()

        if (!user) throw new NotFoundUserError

        reportDoc.user = user

        if (reportDoc.type === TypeReportEnum.BUG) return reportDoc.toObject()

        const usersList: Array<DocumentType<UserModel>> = new Array

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
    async getChat(@NamespaceParam('report_id') reportId: string) {
        let reportDoc: DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null
            = await BasicUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) throw new NotFoundReportError

        let messages: Array<MessageChatGameModel> = new Array

        const chatTypeList: Array<TypeChatGameEnum> = new Array

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
    async delete(@NamespaceParam('report_id') reportId: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null
            = await BugReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) throw new NotFoundReportError

        await reportDoc.deleteOne({ id: reportId })
    }

    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async punish(@NamespaceParam('report_id') reportId: string) {
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null
            = await BugReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(reportId).exec()

        if (!reportDoc) throw new NotFoundReportError

        await reportDoc.updateOne({ punished: true })
    }
}