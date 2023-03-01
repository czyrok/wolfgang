import { DocumentType } from '@typegoose/typegoose'

import { UserModel } from '../pack/user/model/user.model'
import { TokenUserModel } from '../pack/user/token/model/token.user.model'

declare module 'express-session' {
    interface SessionData {
        user?: DocumentType<UserModel>
        token?: DocumentType<TokenUserModel>
        scopeAccess?: Array<string>
    }
}