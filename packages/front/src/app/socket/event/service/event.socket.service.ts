import { Injectable } from '@angular/core'

import { Observable, Subscriber } from 'rxjs'
import { share } from 'rxjs/operators'

import { io, Socket } from 'socket.io-client'

import { MetadataSocketModel } from '../../metadata/model/metadata.socket.model'
import { ReceiverEventSocketModel } from '../receiver/model/receiver.event.socket.model'
import { SenderEventSocketModel } from '../sender/model/sender.event.socket.model'

@Injectable({
  providedIn: 'root'
})
export class EventSocketService {
  private metadata: MetadataSocketModel = {}

  constructor() {
    io('http://localhost:5501', { autoConnect: true, transports: ['websocket'] })
  }

  public registerSender<T>(namespace: string, event: string): SenderEventSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: io('http://localhost:5501' + namespace),
      events: {}
    }

    let socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[event]) {
      this.metadata[namespace].events[event] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, event, socket)
      }
    }

    this.metadata[namespace].events[event].usingCount++;

    return new SenderEventSocketModel(event, socket)
  }

  public registerReceiver<T>(namespace: string, event: string): ReceiverEventSocketModel<T> {
    if (!this.metadata[namespace]) this.metadata[namespace] = {
      socket: io('http://localhost:5501' + namespace),
      events: {}
    }

    let socket: Socket = this.metadata[namespace].socket

    if (!this.metadata[namespace].events[event]) {
      this.metadata[namespace].events[event] = {
        usingCount: 0,
        eventObservable: this.buildObservable(namespace, event, socket)
      }
    }

    this.metadata[namespace].events[event].usingCount++;

    return new ReceiverEventSocketModel(event, this.metadata[namespace].events[event].eventObservable)
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
}
