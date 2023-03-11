import { NamespaceSocketModel } from '../../../../namespace/model/namespace.socket.model'
import { LinkNamespaceSocketModel } from '../../../../namespace/link/model/link.namespace.socket.model'

export interface AlternativeBuildManagerSocketInterface {
    buildBaseLink<S, R, E = any>(event: string): LinkNamespaceSocketModel<S, R, E> | Promise<LinkNamespaceSocketModel<S, R, E>>
}