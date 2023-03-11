import { SocketController, EmitOnSuccess, EmitOnFail, OnMessage, MessageBody, ConnectedSocket } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { Socket } from 'socket.io'
import { Request } from 'express'
import { NoSelectedUserReportError, BasicUserReportModel, BasicUserReportModelDocument, BugReportModel, BugReportModelDocument, NotFoundUserError, OtherUserReportModel, OtherUserReportModelDocument, TypeReportEnum, UserModel, UserModelDocument } from 'common'

@SocketController({
    namespace: '/report',
    init: () => { }
})
export class ReportController {
    @OnMessage()
    @EmitOnSuccess()
    @EmitOnFail()
    async add(@ConnectedSocket() socket: Socket, @MessageBody() report: BasicUserReportModel | OtherUserReportModel | BugReportModel) {
        const req: Request = socket.request as Request,
            user: DocumentType<UserModel> | undefined = req.session.user

        if (!user) throw new NotFoundUserError

        const concernedUsersId: Array<string> = new Array

        switch (report.type) {
            case TypeReportEnum.BUG:
                report = report as BugReportModel

                const bug: DocumentType<BugReportModel> = new BugReportModelDocument(report)

                bug.user = user

                await bug.save()

                break
            case TypeReportEnum.BASIC_USER:
                report = report as BasicUserReportModel

                const basic: DocumentType<BasicUserReportModel> = new BasicUserReportModelDocument(report)

                basic.user = user
                basic.thumbsDownCount = 0
                basic.thumbsUpCount = 0

                if (report.concernedUsers.length == 0) throw new NoSelectedUserReportError

                for (const username of report.concernedUsers) {
                    const concernedUser: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: username }).exec()

                    if (!concernedUser) continue

                    concernedUsersId.push(concernedUser._id)
                }

                basic.concernedUsers = concernedUsersId

                await basic.save()

                break
            case TypeReportEnum.OTHER_USER:
                report = report as OtherUserReportModel

                const other: DocumentType<OtherUserReportModel> = new OtherUserReportModelDocument(report)

                other.user = user
                other.thumbsDownCount = 0
                other.thumbsUpCount = 0

                if (report.concernedUsers.length == 0) throw new NoSelectedUserReportError

                for (const username of report.concernedUsers) {
                    const concernedUser: DocumentType<UserModel> | null = await UserModelDocument.findOne({ username: username }).exec()

                    if (!concernedUser) continue

                    concernedUsersId.push(concernedUser._id)
                }

                other.concernedUsers = concernedUsersId

                await other.save()

                break
        }
    }
}