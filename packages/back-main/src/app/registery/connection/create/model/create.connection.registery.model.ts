import {
  EnvUtil,
  VarEnvEnum,
  ManagerSocketModel,
  LinkNamespaceSocketModel,
} from "common";

export class CreateConnectionRegisteryModel {
  private _connection: ManagerSocketModel = new ManagerSocketModel(
    EnvUtil.get(VarEnvEnum.REGISTERY_URL)
  );

  private _createLink: LinkNamespaceSocketModel<void, string> =
    this.connection.buildLink<void, string>("/registery", "create");

  private get connection(): ManagerSocketModel {
    return this._connection;
  }

  private get createLink(): LinkNamespaceSocketModel<void, string> {
    return this._createLink;
  }

  public createGame(): Promise<string> {
    return new Promise(
      (resolve: (value: string) => void, reject: (error: any) => void) => {
        this.createLink.on((id: string) => {
          resolve(id);
        });

        this.createLink.onFail((error: any) => {
          reject(error);
        });

        this.createLink.emit();
      }
    );
  }

  public destroy(): void {
    this.createLink.destroy();
  }
}
