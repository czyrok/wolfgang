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
}
