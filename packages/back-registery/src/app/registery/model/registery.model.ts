import { InstanceGameInterface } from '../../game/instance/interface/instance.game.interface'

export class RegisteryModel {
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