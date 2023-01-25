import { SocketController, EmitOnSuccess, EmitOnFail, SocketRequest, OnConnect, OnDisconnect, OnMessage } from 'ts-socket.io-controller'
import { ReportModel, ReportModelDocument } from 'common'

@SocketController({
    namespace: '/main/report',
    init: () => { }
})
export class ReportMainController {
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
}