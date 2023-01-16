import http from 'http'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { Server } from 'socket.io'

import { LogUtil } from '../../../log/util/log.util'
import { EnvUtil } from '../../../env/util/env.util'

import { ConfigAppInterface } from '../interface/config.app.interface'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { VarEnvEnum } from '../../../env/var/enum/var.env.enum'

export class ConfigAppHelper {
    public static setup(options: ConfigAppInterface): Server {
        const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next),
            corsConfig: cors.CorsOptions = {
                // #achan
                origin: 'http://localhost:4200',
                credentials: true
            }

        const app: express.Application = express(),
            server: http.Server = http.createServer(app),
            io = new Server(server, {
                transports: ['websocket'],
                cors: corsConfig
            })

        app.use(cors(corsConfig))

        if (options.session) {
            const sessionMiddleware = session({
                name: EnvUtil.get(VarEnvEnum.SESSION_COOKIE_NAME),
                cookie: {
                    maxAge: parseInt(EnvUtil.get(VarEnvEnum.SESSION_COOKIE_DURATION)),
                    httpOnly: true,
                    path: '/',
                    // #achan set to true
                    secure: false,
                    sameSite: 'lax'
                },
                secret: EnvUtil.get(VarEnvEnum.SESSION_SECRET),
                resave: true,
                saveUninitialized: true
            })

            app.use(sessionMiddleware)
            io.use(wrap(sessionMiddleware))
        }

        app.get('/', (req: express.Request, res: express.Response) => {
            req.session.save()
            res.status(200).json({})
        })

        server.listen(options.port)

        LogUtil.logger(TypeLogEnum.APP).info(`HTTP server listen on port ${options.port}`)

        return io
    }
}