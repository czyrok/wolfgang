import { ReceiverLinkSocketModel } from '../../../../receiver/model/receiver.link.socket.model'
import { SenderLinkSocketModel } from '../../../../sender/model/sender.link.socket.model'

export interface ItemMetadataHandlerEventLinkSocketInterface<T> {
    sender: SenderLinkSocketModel<T>
    receiver: ReceiverLinkSocketModel<T>
}