import http from 'http'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'

import { LogUtil } from '../../../log/util/log.util'
import { SessionConfigAppUtil } from '../session/util/session.config.app.util'

import { ConfigAppInterface } from '../interface/config.app.interface'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'

export class ConfigAppHelper {
    public static setup(options: ConfigAppInterface): Server {
        const app: express.Application = express(),
            server: http.Server = http.createServer(app),
            io = new Server(server, {
                transports: ['websocket'],
                cors: options.cors
            })

        app.use(cors(options.cors))

        if (options.session) {
            app.use(SessionConfigAppUtil.sessionMiddleware)

            app.get('/', (req: express.Request, res: express.Response) => {
                req.session.save()
                res.status(200).json({})
            })
        }

        server.listen(options.port)

        LogUtil.logger(TypeLogEnum.APP).info(`HTTP server listen on port ${options.port}`)

        return io
    }
}