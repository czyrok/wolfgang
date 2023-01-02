import passportJWT from 'passport-jwt'

export class ScopeJWTPassportStrategy extends passportJWT.Strategy {
    constructor(options?: any, callback?: any) {
        super(options, callback)
    }

    authenticate(req: any, options?: any) {
        req.scope = options.scope

        return super.authenticate(req, options)
    }
}