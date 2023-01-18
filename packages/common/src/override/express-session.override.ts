import { DocumentType } from '@typegoose/typegoose'
import { UserModel } from '../pack/user/model/user.model'

declare module 'express-session' {
    interface SessionData {
        user?: DocumentType<UserModel>
    }
}