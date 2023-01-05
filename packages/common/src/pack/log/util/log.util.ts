import { Configuration, Logger } from 'log4js'

import { configure, getLogger } from '../../fix/log4js.fix'

import { AlreadyConfiguredLogError } from '../error/already-configured.log.error'
import { NotConfiguredLogError } from '../error/not-configured.log.error'

export class LogUtil {
    private static _isConfigured: boolean = false

    private static get isConfigured(): boolean {
        let temp: boolean = this._isConfigured

        this._isConfigured = true

        return temp
    }

    public static set config(config: Configuration) {
        if (this.isConfigured === false) {
            configure(config)
        } else {
            throw new AlreadyConfiguredLogError
        }
    }

    public static get logger(): (category?: string) => Logger {
        if (this.isConfigured === true) {
            return getLogger
        } else {
            throw new NotConfiguredLogError
        }
    }
}