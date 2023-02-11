import { SocketController, EmitOnSuccess, EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage } from 'ts-socket.io-controller'
import { BasicUserReportModel, BasicUserReportModelDocument, NotFoundUserError, ReportModel, ReportModelDocument, TypeReportEnum, TypeUserReportEnum, UserModel, UserModelDocument } from 'common'
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
            TypeReportEnum.BASIC_USER
        ))

        await basicReport.save()
    }
}