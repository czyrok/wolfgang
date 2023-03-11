import { SocketController, EmitOnSuccess, EmitOnFail, OnMessage } from 'ts-socket.io-controller'
import { DocumentType } from '@typegoose/typegoose'
import { BasicUserReportModel, BasicUserReportModelDocument, BugReportModelDocument, OtherUserReportModel, OtherUserReportModelDocument, ReportModel } from 'common'

@SocketController({
    namespace: '/managing/report',
    init: () => { }
})
export class ReportManagingController {
    @EmitOnSuccess()
    @EmitOnFail()
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
}