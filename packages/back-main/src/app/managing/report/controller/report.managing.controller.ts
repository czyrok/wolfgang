import { plainToInstance } from 'class-transformer'
import { SocketController, EmitOnSuccess, EmitOnFail, OnConnect, OnDisconnect, SkipEmitOnEmptyResult, OnMessage, MessageBody } from 'ts-socket.io-controller'
import { ReportModel, ReportModelDocument } from 'common'

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

    @EmitOnSuccess()
    @EmitOnFail()
    @SkipEmitOnEmptyResult()
    @OnMessage()
    async list() {
        let list = await ReportModelDocument.find().populate('user', 'skin').lean().exec()
        let reportList: Array<ReportModel> = plainToInstance(ReportModel, list)
        return reportList
    }

    @EmitOnSuccess()
    @EmitOnFail()
    @OnMessage()
    async view(@MessageBody() id: string){
        let obj = await ReportModelDocument.findById(id).populate('user', 'skin').lean().exec()
        let report: ReportModel = plainToInstance(ReportModel, obj)
        return report
    }
}