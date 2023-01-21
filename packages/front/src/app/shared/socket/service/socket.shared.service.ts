import { Injectable } from '@angular/core'
import { HandlerSocketLinkModel, SenderLinkSocketModel, ReceiverLinkSocketModel } from 'common'

import { SessionSharedService } from '../../session/service/session.shared.service'

@Injectable({
  providedIn: 'root'
})
export class SocketSharedService {
  private _handler: HandlerSocketLinkModel = new HandlerSocketLinkModel('http://localhost', 5500)

  public constructor(
    private sessionSharedService: SessionSharedService
  ) {
    this.sessionSharedService.refreshSession().then(() => {
      this.handler.socketManager.connect()
    })
  }

  private get handler(): HandlerSocketLinkModel {
    return this._handler
  }

  public async registerSender<T>(namespace: string, event: string): Promise<SenderLinkSocketModel<T>> {
    await this.sessionSharedService.refreshSession()

    return this.handler.registerSender<T>(namespace, event)
  }

  public async registerReceiver<T>(namespace: string, event: string): Promise<ReceiverLinkSocketModel<T>> {
    await this.sessionSharedService.refreshSession()

    return this.handler.registerReceiver<T>(namespace, event)
  }

  public async check<T>(namespace: string, eventType: string, object: T): Promise<boolean> {
    const checkSenderLink: SenderLinkSocketModel<T> = await this.registerSender(namespace, eventType),
      checkReceiverLink: ReceiverLinkSocketModel<boolean> = await this.registerReceiver(namespace, eventType),
      checkErrorLink: ReceiverLinkSocketModel<any> = await this.registerReceiver(namespace, `${eventType}-failed`)

    return new Promise((resolve: (value: boolean) => void) => {
      checkReceiverLink.subscribe((test: boolean) => {
        resolve(test)

        checkReceiverLink.unsubscribe()
        checkErrorLink.unsubscribe()
      })

      checkErrorLink.subscribe(() => {
        resolve(false)

        checkReceiverLink.unsubscribe()
        checkErrorLink.unsubscribe()
      })

      checkSenderLink.emit(object)
    })
  }
}
