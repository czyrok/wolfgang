import session from 'express-session'
import { EnvUtil } from '../../../../env/util/env.util'
import { VarEnvEnum } from '../../../../env/var/enum/var.env.enum'

export class SessionConfigAppUtil {
    private static _sessionMiddleware: any = undefined

    public static get sessionMiddleware(): any {
        if (this._sessionMiddleware === undefined) this._sessionMiddleware = session({
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

        return this._sessionMiddleware
    }
}