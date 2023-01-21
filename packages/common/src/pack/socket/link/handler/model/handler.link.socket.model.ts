import { Observable, Subscriber } from 'rxjs'
import { share } from 'rxjs/operators'

import { Socket, Manager } from 'socket.io-client'

import { MetadataHandlerLinkSocketInterface } from '../metadata/interface/metadata.handler.link.socket.interface'
import { ReceiverLinkSocketModel } from '../../receiver/model/receiver.link.socket.model'
import { SenderLinkSocketModel } from '../../sender/model/sender.link.socket.model'

export class HandlerSocketLinkModel {
  private _socketManager: Manager
  private _metadata: MetadataHandlerLinkSocketInterface = {}

  public constructor(
    url: string,
    port: number
  ) {
    this._socketManager = new Manager(`${url}:${port}`, {
      autoConnect: false,
      transports: ['websocket'],
      withCredentials: true,
    })
  }

  public get socketManager(): Manager {
    return this._socketManager
  }

  public get metadata(): MetadataHandlerLinkSocketInterface {
    return this._metadata
  }

  public registerSender<T>(namespace: string, event: string): SenderLinkSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: this.getNamespace(namespace).connect(),
      events: {}
    }

    const socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[event]) {
      this.metadata[namespace].events[event] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, event, socket)
      }
    }

    this.metadata[namespace].events[event].usingCount++;

    return new SenderLinkSocketModel(event, socket)
  }

  public registerReceiver<T>(namespace: string, event: string): ReceiverLinkSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: this.getNamespace(namespace).connect(),
      events: {}
    }

    const socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[event]) {
      this.metadata[namespace].events[event] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, event, socket)
      }
    }

    this.metadata[namespace].events[event].usingCount++;

    return new ReceiverLinkSocketModel(event, this.metadata[namespace].events[event].eventObservable)
  }

  private buildObservable<T>(namespace: string, event: string, socket: Socket): Observable<T> {
    return new Observable((sub: Subscriber<T>) => {
      const listener = (data: T) => {
        sub.next(data)
      }

      socket.on(event, listener)

      return () => {
        this.metadata[namespace].events[event].usingCount--;

        if (this.metadata[namespace].events[event].usingCount == 0) {
          socket.removeListener(event, listener)

          delete this.metadata[namespace].events[event]

          if (Object.keys(this.metadata[namespace].events).length == 0) {
            socket.close()

            this.metadata[namespace]
          }
        }
      }
    }).pipe(share())
  }

  private getNamespace(namespace: string): Socket {
    return this.socketManager.socket(namespace)
  }

  public getSocket(namespace: string): Socket | undefined {
    if (!this.metadata[namespace]) return undefined

    return this.metadata[namespace].socket
  }
}
