import { SocketController, EmitOnSuccess, EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage } from 'ts-socket.io-controller'
import { ReportModel, ReportModelDocument } from 'common'

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
        report.user = req.user
        await new ReportModelDocument(report).save()
    }
}