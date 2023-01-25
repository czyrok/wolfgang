import { ItemMetadataHandlerEventLinkSocketInterface } from '../item/item.metadata.handler.event.link.socket.interface'

export class MetadataHandlerEventLinkSocketModel {
    [key: string]: ItemMetadataHandlerEventLinkSocketInterface<any>

    *[Symbol.iterator](): IterableIterator<ItemMetadataHandlerEventLinkSocketInterface<any>> {
        const keys: Array<string> = Object.keys(this)

        if (keys.length > 0) for (const key of keys) yield this[key]
    }
}