import { DocumentType } from '@typegoose/typegoose'
import { IVerifyOptions } from 'passport-local'

import { use } from '../../../fix/passport.fix'
import { Strategy } from '../../../fix/passportlocal.fix'

import { UserNotFoundPassportError } from '../../error/user-not-found.passport.error'
import { PasswordInvalidLocalPassportError } from '../error/password-invalid.local.passport.error'

import { UserModel, UserModelDocument } from '../../../user/model/user.model'

import { TypePassportEnum } from '../../type/enum/type.passport.enum'

export class LocalPassportHelper {
    public static setStrategy(): void {
        use(TypePassportEnum.LOCAL, new Strategy(async (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
            let user: DocumentType<UserModel> = await UserModelDocument.find({ username: username }).exec()
            if (!user) done(new UserNotFoundPassportError, false)

            let res: boolean = await user.verifyPassword(password)
            if (!res) return done(new PasswordInvalidLocalPassportError, false)

            return done(null, user)
        }))
    }
}