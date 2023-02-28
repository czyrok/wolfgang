import { SocketController, EmitOnSuccess, EmitOnFail, OnConnect, OnDisconnect, SkipEmitOnEmptyResult, OnMessage, MessageBody } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { BasicUserReportModel, BasicUserReportModelDocument, NotFoundReportError, BugReportModel, BugReportModelDocument, NotFoundUserError, OtherUserReportModel, OtherUserReportModelDocument, ReportModel, TypeReportEnum, UserModel, UserModelDocument, ReportModelDocument } from 'common'

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

        const basicUserReportDocList: Array<DocumentType<BasicUserReportModel>> = await BasicUserReportModelDocument.find().exec(),
            otherUserReportDocList: Array<DocumentType<OtherUserReportModel>> = await OtherUserReportModelDocument.find().exec()

        reportDocList.push(...basicUserReportDocList)
        reportDocList.push(...otherUserReportDocList)

        const reportList: Array<ReportModel> = new Array()

        for (const reportDoc of reportDocList) {
            const id: string = reportDoc._id.toString()
            const report: ReportModel = reportDoc.toObject()
            report._id =id
            reportList.push(report)
        }

        return reportList
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() id: string) {
        console.log('id', id)
        let reportDoc: DocumentType<BugReportModel> | DocumentType<BasicUserReportModel> | DocumentType<OtherUserReportModel> | null = await BugReportModelDocument.findById(id).exec()

        if (!reportDoc) reportDoc = await BasicUserReportModelDocument.findById(id).exec()
        if (!reportDoc) reportDoc = await OtherUserReportModelDocument.findById(id).exec()
        
        if (!reportDoc) throw new NotFoundReportError
        console.log('report trouvé')
        const user: DocumentType<UserModel> | null = await UserModelDocument.findById(reportDoc.user).exec()
        
        if (user === null) throw new NotFoundUserError
        console.log('user trouvé')
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
        console.log('report', reportDoc.toObject())
        return reportDoc.toObject()
    }
}