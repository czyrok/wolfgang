import { ReceiverLinkSocketModel } from '../../receiver/model/receiver.link.socket.model'
import { SenderLinkSocketModel } from '../../sender/model/sender.link.socket.model'

export interface HandlerLinkSocketInterface {
  registerSender<T>(namespace: string, eventType: string): SenderLinkSocketModel<T> | Promise<SenderLinkSocketModel<T> | null>
  registerReceiver<T>(namespace: string, eventType: string): ReceiverLinkSocketModel<T> | Promise<ReceiverLinkSocketModel<T> | null>
}