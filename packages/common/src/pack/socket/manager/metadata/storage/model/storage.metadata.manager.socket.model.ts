import { Subject } from 'rxjs'
import { Socket } from 'socket.io-client'

import { MetadataManagerSocketModel } from '../../model/metadata.manager.socket.model'

import { ManagerSocketModel } from '../../../model/manager.socket.model'

export class StorageMetadataManagerSocketModel {
    private _storage: Array<MetadataManagerSocketModel> = new Array

    private _allUseEndingEvent: Subject<MetadataManagerSocketModel> = new Subject

    public constructor(
        private _manager: ManagerSocketModel,
    ) {
        this.allUseEndingEvent.subscribe((metadata: MetadataManagerSocketModel) => {
            const index: number = this.getMetadataIndex(metadata)

            if (index >= 0) this.storage.splice(index, 1)

            metadata.destroy()
        })
    }

    private get storage(): Array<MetadataManagerSocketModel> {
        return this._storage
    }

    private get allUseEndingEvent(): Subject<MetadataManagerSocketModel> {
        return this._allUseEndingEvent
    }

    private get manager(): ManagerSocketModel {
        return this._manager
    }

    private getMetadataIndex(metadata: MetadataManagerSocketModel): number {
        const index: number = this.searchMetadata(metadata.namespace)?.[0] ?? -1

        return index
    }

    private searchMetadata(namespace: string): [number, MetadataManagerSocketModel] | null {
        for (let i = 0; i < this.storage.length; i++) {
            const metadata: MetadataManagerSocketModel = this.storage[i]

            if (metadata.namespace === namespace) return [i, metadata]
        }

        return null
    }

    private createMetadata(namespace: string): MetadataManagerSocketModel {
        const socket: Socket = this.manager.getSocketNamespace(namespace)

        const metadata: MetadataManagerSocketModel
            = new MetadataManagerSocketModel(this.allUseEndingEvent, socket, namespace)

        this.storage.push(metadata)

        metadata.start()

        return metadata
    }

    public getMetadata(namespace: string): MetadataManagerSocketModel {
        const metadata: MetadataManagerSocketModel = this.searchMetadata(namespace)?.[1] ?? this.createMetadata(namespace)

        return metadata
    }
}