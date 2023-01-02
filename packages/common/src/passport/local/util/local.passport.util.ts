import passport from 'passport'
import passportLocal from 'passport-local'

export class LocalPassportUtil {
    public static setStrategy(): void {
        passport.use(new passportLocal.LocalStrategy(
            (username, password, done) => {
                // afaire
                /* User.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { return done(null, false); }
                    return done(null, user);
                }); */

                // faire token avec sign etc
            }
        ))
    }
}