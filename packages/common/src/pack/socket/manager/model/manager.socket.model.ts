import { Socket, Manager } from "socket.io-client";

import { NamespaceSocketModel } from "../../namespace/model/namespace.socket.model";
import { LinkNamespaceSocketModel } from "../../namespace/link/model/link.namespace.socket.model";

import { BuildManagerSocketInterface } from "../build/interface/build.manager.socket.interface";
import { AlternativeBuildManagerSocketInterface } from "../build/alternative/interface/alternative.build.manager.socket.interface";
import { StorageMetadataManagerSocketModel } from "../metadata/storage/model/storage.metadata.manager.socket.model";

export class ManagerSocketModel
  implements
    BuildManagerSocketInterface,
    AlternativeBuildManagerSocketInterface
{
  private _socketIoManager: Manager;

  private _storage: StorageMetadataManagerSocketModel =
    new StorageMetadataManagerSocketModel(this);

  public constructor(url: string) {
    this._socketIoManager = new Manager(`${url}`, {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    });
  }

  public get socketIoManager(): Manager {
    return this._socketIoManager;
  }

  public get storage(): StorageMetadataManagerSocketModel {
    return this._storage;
  }

  buildNamespace(namespaceName: string): NamespaceSocketModel {
    const namespace: NamespaceSocketModel = new NamespaceSocketModel(
      this,
      this.storage.getMetadata(namespaceName),
      namespaceName
    );

    return namespace;
  }

  buildLink<S, R, E = any>(
    namespaceName: string,
    event: string
  ): LinkNamespaceSocketModel<S, R, E> {
    const link: LinkNamespaceSocketModel<S, R, E> =
      new LinkNamespaceSocketModel(
        this.storage.getMetadata(namespaceName),
        event
      );

    return link;
  }

  buildBaseLink<S, R, E = any>(
    event: string
  ): LinkNamespaceSocketModel<S, R, E> {
    const link: LinkNamespaceSocketModel<S, R, E> =
      new LinkNamespaceSocketModel(this.storage.getMetadata(""), event);

    return link;
  }

  public connect(): void {
    this.socketIoManager.connect();
  }

  public close(): void {
    this.socketIoManager.engine.close();
  }

  public getSocketNamespace(namespace: string): Socket {
    const socket: Socket = this.socketIoManager.socket(namespace);

    return socket;
  }
}
