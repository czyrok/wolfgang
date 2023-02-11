import { Observable, Subscriber } from 'rxjs'
import { share } from 'rxjs/operators'

import { Socket, Manager } from 'socket.io-client'

import { ReceiverLinkSocketModel } from '../../receiver/model/receiver.link.socket.model'
import { SenderLinkSocketModel } from '../../sender/model/sender.link.socket.model'

import { MetadataHandlerLinkSocketInterface } from '../metadata/interface/metadata.handler.link.socket.interface'
import { HandlerLinkSocketInterface } from '../interface/handler.link.socket.interface'

export class HandlerSocketLinkModel implements HandlerLinkSocketInterface {
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

  public registerSender<T>(namespace: string, eventType: string): SenderLinkSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: this.getNamespace(namespace).connect(),
      events: {}
    }

    const socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[eventType]) {
      this.metadata[namespace].events[eventType] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, eventType, socket)
      }
    }

    this.metadata[namespace].events[eventType].usingCount++;

    return new SenderLinkSocketModel(eventType, socket)
  }

  public registerReceiver<T>(namespace: string, eventType: string): ReceiverLinkSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: this.getNamespace(namespace).connect(),
      events: {}
    }

    const socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[eventType]) {
      this.metadata[namespace].events[eventType] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, eventType, socket)
      }
    }

    this.metadata[namespace].events[eventType].usingCount++;

    return new ReceiverLinkSocketModel(eventType, this.metadata[namespace].events[eventType].eventObservable)
  }

  private buildObservable<T>(namespace: string, eventType: string, socket: Socket): Observable<T> {
    return new Observable((sub: Subscriber<T>) => {
      const listener = (data: T) => {
        sub.next(data)
      }

      socket.on(eventType, listener)

      return () => {
        this.metadata[namespace].events[eventType].usingCount--;

        if (this.metadata[namespace].events[eventType].usingCount == 0) {
          socket.removeListener(eventType, listener)

          delete this.metadata[namespace].events[eventType]

          if (Object.keys(this.metadata[namespace].events).length == 0) {
            socket.close()

            this.metadata[namespace]
          }
        }
      }
    }).pipe(share())
  }

  public getNamespace(namespace: string): Socket {
    if (!this.metadata[namespace]) return this.socketManager.socket(namespace)

    return this.metadata[namespace].socket
  }
}
