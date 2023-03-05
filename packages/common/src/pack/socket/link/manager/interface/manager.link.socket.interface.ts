import { LinkSocketModel } from '../../model/link.socket.model'

export interface ManagerLinkSocketInterface {
  register<S, R, E = any>(namespace: string, eventType: string): LinkSocketModel<S, R, E>
}