import { ManagerSocketModel } from '../../manager/model/manager.socket.model'
import { MetadataManagerSocketModel } from '../../manager/metadata/model/metadata.manager.socket.model'
import { LinkNamespaceSocketModel } from '../link/model/link.namespace.socket.model'

import { BuildManagerSocketInterface } from '../../manager/build/interface/build.manager.socket.interface'
import { AlternativeBuildManagerSocketInterface } from '../../manager/build/alternative/interface/alternative.build.manager.socket.interface'

export class NamespaceSocketModel implements BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface {
    public constructor(
        private _manager: ManagerSocketModel,
        private _metadata: MetadataManagerSocketModel,
        private _namespace: string
    ) {
        this.start()
    }

    public get manager(): ManagerSocketModel {
        return this._manager
    }

    public get metadata(): MetadataManagerSocketModel {
        return this._metadata
    }

    public get namespace(): string {
        return this._namespace
    }

    buildNamespace(namespaceName: string): NamespaceSocketModel {
        return this.manager.buildNamespace(this.namespace + namespaceName)
    }

    buildLink<S, R, E = any>(namespaceName: string, event: string): LinkNamespaceSocketModel<S, R, E> {
        return this.manager.buildLink(this.namespace + namespaceName, event)
    }

    buildBaseLink<S, R, E = any>(event: string): LinkNamespaceSocketModel<S, R, E> {
        return this.manager.buildLink(this.namespace, event)
    }

    private start(): this {
        this.metadata.newUse()

        return this
    }

    public destroy(): this {
        this.metadata.lessUse()

        return this
    }
}