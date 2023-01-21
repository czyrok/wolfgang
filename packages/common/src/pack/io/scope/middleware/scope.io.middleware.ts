import { Socket } from 'socket.io'
import { DocumentType } from '@typegoose/typegoose'
import { MiddlewareInterface, SocketMiddleware } from 'ts-socket.io-controller'
import { verify, JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { parse } from 'cookie'

import { UndefinedJwtError } from '../../../jwt/error/undefined.jwt.error'
import { NotFoundUserError } from '../../../user/error/not-found.user.error'
import { NotFoundTokenUserError } from '../../../user/token/error/not-found.token.user.error'
import { UndefinedCookieJwtError } from '../../../jwt/error/undefined-cookie.jwt.error'
import { InactiveTokenUserError } from '../../../user/token/error/inactive.token.user.error'

import { EnvUtil } from '../../../env/util/env.util'
import { LogUtil } from '../../../log/util/log.util'

import { UserModel } from '../../../user/model/user.model'
import { TokenUserModel, TokenUserModelDocument } from '../../../user/token/model/token.user.model'

import { VarEnvEnum } from '../../../env/var/enum/var.env.enum'
import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'

@SocketMiddleware('/game')
export class ScopeIoMiddleware implements MiddlewareInterface {
    type: 'MiddlewareInterface' = 'MiddlewareInterface'

    async use(socket: Socket, next: (err?: any) => any): Promise<void> {
        const cookies: any = parse(socket.request.headers.cookie || ''),
            jwt: string = cookies[EnvUtil.get(VarEnvEnum.JWT_COOKIE_NAME)]

        let payload: JwtPayload | undefined = undefined

        try {
            payload = verify(jwt, EnvUtil.get(VarEnvEnum.JWT_SECRET), {
                issuer: EnvUtil.get(VarEnvEnum.JWT_ISSUER),
                audience: EnvUtil.get(VarEnvEnum.JWT_AUDIENCE),
                ignoreExpiration: false
            }) as JwtPayload
        } catch (error: any) {
            return next(new UndefinedCookieJwtError)
        }

        if (!payload.sub) return next(new UndefinedJwtError)

        const token: DocumentType<TokenUserModel> = await TokenUserModelDocument.findById(payload.sub).populate('user').exec() as DocumentType<TokenUserModel>

        if (!token) return next(new NotFoundTokenUserError)
        if (!token.active) return next(new InactiveTokenUserError)
        if (!token.user) return next(new NotFoundUserError)

        const user: DocumentType<UserModel> = token.user as DocumentType<UserModel>

        const req: Request = socket.request as Request

        req.session.user = user
        req.session.token = token
        req.session.save()

        // #achan
        LogUtil.logger(TypeLogEnum.ACCESS).info(`${user.username} is accessing`)

        next()
    }
}