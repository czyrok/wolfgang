import { HandlerLinkSocketInterface } from '../../../handler/interface/handler.link.socket.interface'
import { ReceiverLinkSocketModel } from '../../../receiver/model/receiver.link.socket.model'
import { SenderLinkSocketModel } from '../../../sender/model/sender.link.socket.model'
import { MetadataHandlerEventLinkSocketModel } from '../metadata/model/metadata.handler.event.link.socket.model'
import { ItemMetadataHandlerEventLinkSocketInterface } from '../metadata/item/item.metadata.handler.event.link.socket.interface'

export class HandlerEventLinkSocketModel {
    private _metadata: MetadataHandlerEventLinkSocketModel = new MetadataHandlerEventLinkSocketModel

    public constructor(
        private _namespace: string,
        private _handler: HandlerLinkSocketInterface
    ) { }

    private get metadata(): MetadataHandlerEventLinkSocketModel {
        return this._metadata
    }

    private get handler(): HandlerLinkSocketInterface {
        return this._handler
    }

    public get namespace(): string {
        return this._namespace
    }

    public async getReceiver<T>(eventType: string): Promise<ReceiverLinkSocketModel<T> | undefined> {
        const item: ItemMetadataHandlerEventLinkSocketInterface<T> | undefined
            = await this.getItemMetadata<T>(eventType)

        return item?.receiver
    }

    public async getSender<T>(eventType: string): Promise<SenderLinkSocketModel<T> | undefined> {
        const item: ItemMetadataHandlerEventLinkSocketInterface<T> | undefined
            = await this.getItemMetadata<T>(eventType)

        return item?.sender
    }

    private async getItemMetadata<T>(eventType: string): Promise<ItemMetadataHandlerEventLinkSocketInterface<T> | undefined> {
        const sender: SenderLinkSocketModel<T> | null = await this.handler.registerSender(this.namespace, eventType),
            receiver: ReceiverLinkSocketModel<T> | null = await this.handler.registerReceiver(this.namespace, eventType)

        if (!this.metadata[eventType] && sender && receiver) this.metadata[eventType] = {
            sender: sender,
            receiver: receiver
        }

        return this.metadata[eventType]
    }

    public unsubscribe(): void {
        for (const item of this.metadata) item.receiver.unsubscribe()
    }
}