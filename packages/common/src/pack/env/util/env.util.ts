import { config } from 'dotenv'

import { VarNotFoundEnvError } from '../error/var-not-found.env.error'

import { LogUtil } from '../../log/util/log.util'

import { TypeLogEnum } from '../../log/type/enum/type.log.enum'
import { VarEnvEnum } from '../var/enum/var.env.enum'

export class EnvUtil {
    private static _isConfigured: boolean = false

    private static get isConfigured(): boolean {
        let temp: boolean = this._isConfigured

        this._isConfigured = true

        return temp
    }

    public static get(variable: VarEnvEnum): string {
        if (!this.isConfigured) {
            config({ path: process.cwd() + '/../../' + (process.env.NODE_ENV === 'PROD' ? '.prod.env' : '.dev.env') })

            LogUtil.logger(TypeLogEnum.APP).trace(`Env variables recovered`)
        }

        if (process.env[variable] === undefined) throw new VarNotFoundEnvError(variable)

        return process.env[variable] || ''
    }
}