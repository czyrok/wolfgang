import { NamespaceSocketModel } from '../../../namespace/model/namespace.socket.model'
import { LinkNamespaceSocketModel } from '../../../namespace/link/model/link.namespace.socket.model'

export interface BuildManagerSocketInterface {
    buildNamespace(namespaceName: string): NamespaceSocketModel | Promise<NamespaceSocketModel>
    buildLink<S, R, E = any>(namespaceName: string, event: string): LinkNamespaceSocketModel<S, R, E> | Promise<LinkNamespaceSocketModel<S, R, E>>
}