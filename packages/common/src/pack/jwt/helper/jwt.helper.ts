import { DocumentType } from '@typegoose/typegoose'
import { sign } from 'jsonwebtoken'

import { EnvUtil } from '../../env/util/env.util'

import { UserModel } from '../../user/model/user.model'
import { TokenUserModel, TokenUserModelDocument } from '../../user/token/model/token.user.model'

import { VarEnvEnum } from '../../env/var/enum/var.env.enum'

export class JWTHelper {
    public static generate(user: DocumentType<UserModel>, ip: string): string {
        let token: DocumentType<TokenUserModel> = new TokenUserModelDocument(new TokenUserModel(user, EnvUtil.get(VarEnvEnum.JWT_EXPIRES), ip))
        token.save()

        let jwt: string = sign({
            sub: token.id,
            scopes: [
                // #achan
                'admin'
            ]
        },
            EnvUtil.get(VarEnvEnum.JWT_SECRET),
            {
                issuer: EnvUtil.get(VarEnvEnum.JWT_ISSUER),
                audience: EnvUtil.get(VarEnvEnum.JWT_AUDIENCE),
                expiresIn: EnvUtil.get(VarEnvEnum.JWT_EXPIRES)
            }
        )

        return jwt
    }
}