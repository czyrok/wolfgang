import { DocumentType } from '@typegoose/typegoose'
import { VerifiedCallback } from 'passport-jwt'

import { use } from '../../../fix/passport.fix'

import { UserNotFoundPassportError } from '../../error/user-not-found.passport.error'
import { AccessDeniedScopePassportError } from '../error/access-denied.scope.passport.error'

import { EnvUtil } from '../../../env/util/env.util'

import { ExtractorScopePassportHelper } from '../extractor/helper/extractor.scope.passport.helper'

import { StrategyScopeJWTPassportModel } from '../strategy/model/strategy.scope.jwt.passport.model'
import { UserModel, UserModelDocument } from '../../../user/model/user.model'

import { TypePassportEnum } from '../../type/enum/type.passport.enum'
import { VarEnvEnum } from '../../../env/var/enum/var.env.enum'

export class ScopeJWTPassportUtil {
    public static setStrategy(): void {
        use(TypePassportEnum.SCOPE, new StrategyScopeJWTPassportModel({
            jwtFromRequest: ExtractorScopePassportHelper.get,
            issuer: EnvUtil.get(VarEnvEnum.JWT_ISSUER),
            audience: EnvUtil.get(VarEnvEnum.JWT_AUDIENCE),
            secretOrKey: EnvUtil.get(VarEnvEnum.JWT_SECRET),
            jsonWebTokenOptions: {
                ignoreExpiration: false,
            },
            algorithms: ['HS256']
        }, async (req: any, payload: any, done: VerifiedCallback) => {
            if (req.scope && !this.verifyScope(payload.scopes, req.scope))
                return done(new AccessDeniedScopePassportError, false)

            let user: DocumentType<UserModel> = await UserModelDocument.getUserByToken(payload.sub)
            if (!user) done(new UserNotFoundPassportError, false)

            return done(null, user)
        }))
    }

    public static verifyScope(userScopes: Array<string>, scope: string): boolean {
        let confirmed = false

        for (let userScope of userScopes) {
            if (scope == userScope) {
                confirmed = true
            }
        }

        return confirmed
    }
}