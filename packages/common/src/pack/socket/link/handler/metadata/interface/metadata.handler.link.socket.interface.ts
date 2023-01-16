import { Observable } from 'rxjs'
import { Socket } from 'socket.io-client'

export interface MetadataHandlerLinkSocketInterface {
    [key: string]: {
        socket: Socket,
        events: {
            [key: string]: {
                usingCount: number,
                eventObservable: Observable<any>
            }
        }
    }
}