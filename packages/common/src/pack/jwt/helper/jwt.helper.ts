import { DocumentType } from '@typegoose/typegoose'
import { sign } from 'jsonwebtoken'

import { EnvUtil } from '../../env/util/env.util'

import { UserModel } from '../../user/model/user.model'
import { TokenUserModel, TokenUserModelDocument } from '../../user/token/model/token.user.model'

import { VarEnvEnum } from '../../env/var/enum/var.env.enum'

export class JWTHelper {
    public static async generate(user: DocumentType<UserModel>, ip: string): Promise<string> {
        const token: DocumentType<TokenUserModel> = new TokenUserModelDocument(new TokenUserModel(user, EnvUtil.get(VarEnvEnum.JWT_EXPIRES), ip))
        
        await token.save()

        const jwt: string = sign({
            sub: token._id,
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