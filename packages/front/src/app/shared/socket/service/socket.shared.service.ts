import { Injectable } from '@angular/core'
import { LinkNamespaceSocketModel, ManagerSocketModel, BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface, NamespaceSocketModel } from 'common'

import { environment } from 'src/environments/environment'

import { SessionSharedService } from '../../session/service/session.shared.service'

@Injectable({
  providedIn: 'root'
})
export class SocketSharedService implements BuildManagerSocketInterface, AlternativeBuildManagerSocketInterface {
  private _socketManager: ManagerSocketModel = new ManagerSocketModel(environment.MAIN_URL, environment.MAIN_PORT)

  public constructor(
    private sessionSharedService: SessionSharedService
  ) {
    this.socketManager.socketIoManager.reconnection(true)

    this.sessionSharedService.refreshSession().then(() => {
      this.socketManager.connect()
    })
  }

  public get socketManager(): ManagerSocketModel {
    return this._socketManager
  }

  public async check<T>(namespace: string, event: string, object: T): Promise<boolean> {
    const checkLink: LinkNamespaceSocketModel<T, boolean> = await this.buildLink(namespace, event)

    return new Promise((resolve: (value: boolean) => void) => {
      checkLink.on((test: boolean) => {
        checkLink.destroy()

        resolve(test)
      })

      checkLink.onFail(() => {
        checkLink.destroy()

        resolve(false)
      })

      checkLink.emit(object)
    })
  }

  async buildNamespace(namespaceName: string): Promise<NamespaceSocketModel> {
    await this.sessionSharedService.refreshSession()

    return this.socketManager.buildNamespace(namespaceName)
  }

  async buildLink<S, R, E = any>(namespaceName: string, event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
    await this.sessionSharedService.refreshSession()

    return this.socketManager.buildLink<S, R, E>(namespaceName, event)
  }

  async buildBaseLink<S, R, E = any>(event: string): Promise<LinkNamespaceSocketModel<S, R, E>> {
    await this.sessionSharedService.refreshSession()

    return this.socketManager.buildBaseLink(event)
  }
}
