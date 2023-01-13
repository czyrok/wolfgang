import { StrategyOptions, VerifyCallbackWithRequest, Strategy } from 'passport-jwt'

import { OptionsStrategyScopePassportInterface } from '../options/interface/options.strategy.scope.passport.interface'

export class StrategyScopeJWTPassportModel extends Strategy {
    constructor(options: StrategyOptions, callback: VerifyCallbackWithRequest) {
        super(options, callback)
    }

    authenticate(req: any, options?: OptionsStrategyScopePassportInterface): void {
        if (options && options.scope) req.scope = options.scope

        super.authenticate(req, options)
    }
}