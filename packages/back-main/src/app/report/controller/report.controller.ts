import { SocketController, EmitOnSuccess, EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage, MessageBody } from 'ts-socket.io-controller'
import { BasicUserReportModel, BasicUserReportModelDocument, BugReportModel, BugReportModelDocument, OtherUserReportModel, OtherUserReportModelDocument, ReportModel, ReportModelDocument, TypeReportEnum, TypeUserReportEnum } from 'common'
import { DocumentType } from '@typegoose/typegoose';

@SocketController({
    namespace: '/report',
    init: () => { }
})
export class ReportController {
    @OnConnect()
    connection() {
        console.log('client connected');
    }

    @OnDisconnect()
    disconnect() {
        console.log('client disconnected');
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async insertReport(@SocketRequest() req: any, report: ReportModel) {
        report.user = req.session.user

        await new ReportModelDocument(report).save()
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async tmp() {
        const basicReport: DocumentType<BasicUserReportModel> = new BasicUserReportModelDocument(new BasicUserReportModel(
            TypeUserReportEnum.ADVERTISING,
            TypeReportEnum.BASIC_USER,
            '63e3c86ae28067d59adabaaf'
        ))

        await basicReport.save()
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async add(@MessageBody() report: BasicUserReportModel | OtherUserReportModel | BugReportModel) {
        switch (report.type) {
            case TypeReportEnum.BASIC_USER:
                report = report as BasicUserReportModel

                const basic: DocumentType<BasicUserReportModel> = new BasicUserReportModelDocument()

                basic._id = report._id
                basic.releaseDate = report.releaseDate
                basic.type = report.type
                basic.user = report.user
                basic.thumbsDownCount = report.thumbsDownCount
                basic.thumbsUpCount = report.thumbsUpCount
                basic.concernedUsers = report.concernedUsers
                basic.reportType = report.reportType
                basic.gameId = report.gameId

                await basic.save()
                break

            case TypeReportEnum.BUG:
                report = report as BugReportModel

                const bug: DocumentType<BugReportModel> = new BugReportModelDocument()

                bug._id = report._id
                bug.releaseDate = report.releaseDate
                bug.type = report.type
                bug.user = report.user
                bug.desc = report.desc

                await bug.save()
                break

            case TypeReportEnum.OTHER_USER:
                report = report as OtherUserReportModel

                const other: DocumentType<OtherUserReportModel> = new OtherUserReportModelDocument()

                other._id = report._id
                other.releaseDate = report.releaseDate
                other.type = report.type
                other.user = report.user
                other.thumbsDownCount = report.thumbsDownCount
                other.thumbsUpCount = report.thumbsUpCount
                other.concernedUsers = report.concernedUsers
                other.reason = report.reason
                other.gameId = report.gameId

                await other.save()
                break
        }
    }
}