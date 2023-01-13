import passport from 'passport'
import { Server } from 'socket.io'

import { AlreadyConfiguredPassportError } from '../error/already-configured.passport.error'

export class PassportHelper {
    private static _isConfigured: boolean = false

    private static get isConfigured(): boolean {
        let temp: boolean = this._isConfigured

        this._isConfigured = true

        return temp
    }

    public static setPassport(io: Server): void {
        if (this.isConfigured === false) {
            const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next)

            io.use(wrap(passport.initialize()))
            io.use(wrap(passport.session()))
        } else {
            throw new AlreadyConfiguredPassportError
        }
    }
}