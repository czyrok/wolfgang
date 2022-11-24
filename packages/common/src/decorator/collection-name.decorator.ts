import { modelOptions } from '@typegoose/typegoose'

export function CollectionName() {
    return function (target: Function) {
        modelOptions({ schemaOptions: { collection: target.name.toLowerCase() } })(target)
    }
}