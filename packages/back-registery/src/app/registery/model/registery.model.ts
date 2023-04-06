import { LogUtil, TypeLogEnum } from 'common'

import { InstanceGameInterface } from '../../game/instance/interface/instance.game.interface'

export class RegisteryModel {
    private static _instance?: RegisteryModel

    private constructor() {
        LogUtil.logger(TypeLogEnum.GAME).trace('Registery initialized')
    }

    public static get instance(): RegisteryModel {
        if (this._instance === undefined) this._instance = new RegisteryModel

        return this._instance
    }

    [key: string]: InstanceGameInterface

    *[Symbol.iterator](): IterableIterator<[string, InstanceGameInterface]> {
        const keys: Array<string> = Object.keys(this)

        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                yield [keys[i], this[keys[i]]]
            }
        }
    }
}