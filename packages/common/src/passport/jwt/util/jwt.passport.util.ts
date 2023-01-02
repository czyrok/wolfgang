import passport from 'passport'
import { ScopeJWTPassportUtil } from '../scope/util/scope.jwt.passport.util'
import { ScopeJWTPassportStrategy } from '../scope/strategy/scope.jwt.passport.strategy'
import { JWTPassportExtractor } from '../extractor/jwt.passport.extractor'

export class JWTPassportUtil {
    public static setStrategy(): void {
        passport.use(new ScopeJWTPassportStrategy({
            jwtFromRequest: JWTPassportExtractor.get,
            // afaire
            issuer: 'accounts.examplesoft.com',
            audience: 'yoursite.net',
            /* jsonWebTokenOptions: {
                ignoreExpiration: false,
            }, */
            secretOrKey: 'secret',
            algorithms: ['HS256']
        }, (req: any, payload: any, done: any) => {
            if (ScopeJWTPassportUtil.verifyScope(payload.scopes, req.scope)) return done('Scope not allowed', false)

            // afaire

            if (payload.id == 2) {
                return done(null, {});
            } else {
                return done(null, false);
            }
        }))
    }
}