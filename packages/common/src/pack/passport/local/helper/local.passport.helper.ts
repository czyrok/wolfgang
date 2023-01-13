import { DocumentType } from '@typegoose/typegoose'
import { IVerifyOptions, Strategy } from 'passport-local'
import passport from 'passport'

import { NotFoundUserError } from '../../../user/error/not-found.user.error'
import { PasswordInvalidLocalPassportError } from '../error/password-invalid.local.passport.error'

import { UserModel, UserModelDocument } from '../../../user/model/user.model'

import { TypePassportEnum } from '../../type/enum/type.passport.enum'

export class LocalPassportHelper {
    public static setStrategy(): void {
        passport.use(TypePassportEnum.LOCAL, new Strategy(async (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
            let user: DocumentType<UserModel> = await UserModelDocument.findOne({ username: username }).exec() as DocumentType<UserModel>
            if (!user) done(new NotFoundUserError, false)

            let res: boolean = await user.verifyPassword(password)
            if (!res) return done(new PasswordInvalidLocalPassportError, false)

            return done(null, user)
        }))
    }
}