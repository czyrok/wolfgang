import { EnvUtil, LinkNamespaceSocketModel, ManagerSocketModel, VarEnvEnum } from 'common'

export class CheckConnectionRegisteryHelper {
    public static async checkGame(gameId: string): Promise<boolean> {
        const handler: ManagerSocketModel = new ManagerSocketModel(EnvUtil.get(VarEnvEnum.REGISTERY_URL), parseInt(EnvUtil.get(VarEnvEnum.REGISTERY_PORT)))

        const checkLink: LinkNamespaceSocketModel<string, boolean> = handler.buildLink('/registery', 'check')

        return new Promise((resolve: (value: boolean) => void) => {
            checkLink.on((test: boolean) => {
                checkLink.destroy()

                resolve(test)
            })

            checkLink.emit(gameId)
        })
    }
}