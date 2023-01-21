import { plainToInstance } from 'class-transformer'
import { DocumentType } from '@typegoose/typegoose'
import { LeanDocument } from 'mongoose'
import { SocketController, EmitOnSuccess, EmitOnFail, OnConnect, OnDisconnect, SkipEmitOnEmptyResult, OnMessage, MessageBody } from 'ts-socket.io-controller'
import { ReportModel, ReportModelDocument, NotFoundReportError } from 'common'

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
        const report: DocumentType<ReportModel> | null = await ReportModelDocument.findById(reportId).exec()

        if (!report) throw new NotFoundReportError

        return true
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @OnMessage()
    async list() {
        const reportListObj: Array<LeanDocument<ReportModel>> = await ReportModelDocument.find().populate('user', 'skin').lean().exec()

        return plainToInstance(ReportModel, reportListObj)
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() reportId: string) {
        const reportObj: LeanDocument<ReportModel> | null = await ReportModelDocument.findById(reportId).populate('user', 'skin').lean().exec()

        if (!reportObj) throw new NotFoundReportError

        return plainToInstance(ReportModel, reportObj)
    }
}