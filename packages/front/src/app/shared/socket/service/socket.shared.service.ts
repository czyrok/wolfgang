import { Injectable } from '@angular/core';
import {
  LinkNamespaceSocketModel,
  ManagerSocketModel,
  BuildManagerSocketInterface,
  AlternativeBuildManagerSocketInterface,
  NamespaceSocketModel,
} from 'common';

import { environment } from 'src/environments/environment';

import { SessionSharedService } from '../../session/service/session.shared.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service qui gère les sockets
 */
export class SocketSharedService
  implements
    BuildManagerSocketInterface,
    AlternativeBuildManagerSocketInterface
{
  private _socketManager: ManagerSocketModel = new ManagerSocketModel(
    environment.MAIN_URL
  );

  /**
   * @param sessionSharedService Service qui gère la session de l'utilisateur
   */
  public constructor(private sessionSharedService: SessionSharedService) {
    this.socketManager.socketIoManager.opts.path =
      environment.MAIN_PATH_SOCKET_IO;

    this.socketManager.socketIoManager.reconnection(true);

    this.sessionSharedService.refreshSession().then(() => {
      this.socketManager.connect();
    });
  }

  /**
   * Renvoie le gestionnaire de socket
   */
  public get socketManager(): ManagerSocketModel {
    return this._socketManager;
  }

  /**
   * Permet de vérifier qu'un espace de nom possède une action de vérification et si oui qu'il procède à celle-ci
   * @param namespace L'espace de nom
   * @param event L'évènement
   * @param object L'objet envoyé à la socket
   * @returns Vrai si la vérification est bonne, faux sinon
   */
  public async check<T>(
    namespace: string,
    event: string,
    object: T
  ): Promise<boolean> {
    const checkLink: LinkNamespaceSocketModel<T, boolean> =
      await this.buildLink(namespace, event);

    return new Promise((resolve: (value: boolean) => void) => {
      checkLink.on((test: boolean) => {
        checkLink.destroy();

        resolve(test);
      });

      checkLink.onFail(() => {
        checkLink.destroy();

        resolve(false);
      });

      checkLink.emit(object);
    });
  }

  /**
   * Permet récupérer le modèle contenant la socket associée à un espace de nom
   * @param namespaceName Espace de nom
   * @returns Le modèle contenant la socket avec l'espace de nom
   */
  async buildNamespace(namespaceName: string): Promise<NamespaceSocketModel> {
    await this.sessionSharedService.refreshSession();

    return this.socketManager.buildNamespace(namespaceName);
  }

  /**
   * Permet de récupérer le modèle contenant la socket associé à un évènement et un espace de nom
   * @param namespaceName Espace de nom
   * @param event Nom de l'évènement
   * @returns Le modèle contenant la socket associée à l'évènement de l'espace de nom
   */
  async buildLink<S, R, E = any>(
    namespaceName: string,
    event: string
  ): Promise<LinkNamespaceSocketModel<S, R, E>> {
    await this.sessionSharedService.refreshSession();

    return this.socketManager.buildLink<S, R, E>(namespaceName, event);
  }

  /**
   * Permet de récupérer le modèle contenant la socket associé à l'évènement à partir du modèle contenant la socket associé à l'espace nom de la partie
   * @param event Nom de l'évènement
   * @returns Le modèle contenant la socket associée à l'évènement
   */
  async buildBaseLink<S, R, E = any>(
    event: string
  ): Promise<LinkNamespaceSocketModel<S, R, E>> {
    await this.sessionSharedService.refreshSession();

    return this.socketManager.buildBaseLink(event);
  }
}
