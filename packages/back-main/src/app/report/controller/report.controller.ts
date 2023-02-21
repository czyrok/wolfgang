import { SocketController, EmitOnSuccess, EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { BasicUserReportModel, BasicUserReportModelDocument, BugReportModel, BugReportModelDocument, NotFoundUserError, OtherUserReportModel, OtherUserReportModelDocument, ReportModel, ReportModelDocument, TypeReportEnum, TypeUserReportEnum, UserModel } from 'common'
import { DocumentType } from '@typegoose/typegoose';
import { Socket } from 'socket.io';
import { Request } from 'express';

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
    async add(@ConnectedSocket() socket: Socket, @MessageBody() report: BasicUserReportModel | OtherUserReportModel | BugReportModel) {
        console.log('debut')
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user
        console.log(user)
        if (!user) throw new NotFoundUserError

        switch (report.type) {
            case TypeReportEnum.BASIC_USER:
                report = report as BasicUserReportModel

                const basic: DocumentType<BasicUserReportModel> = new BasicUserReportModelDocument(report)

                basic.user = user
                basic.thumbsDownCount = 0
                basic.thumbsUpCount = 0

                await basic.save()

                break

            case TypeReportEnum.BUG:
                report = report as BugReportModel

                const bug: DocumentType<BugReportModel> = new BugReportModelDocument(report)

                bug.user = user
                
                await bug.save()

                break

            case TypeReportEnum.OTHER_USER:
                report = report as OtherUserReportModel

                const other: DocumentType<OtherUserReportModel> = new OtherUserReportModelDocument(report)

                other.user = user
                other.thumbsDownCount = 0
                other.thumbsUpCount = 0

                await other.save()
                break
        }
    }
}