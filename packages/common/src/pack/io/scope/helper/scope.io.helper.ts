import { DocumentType } from '@typegoose/typegoose'

import { ScopeModel, ScopeModelDocument } from '../../../scope/model/scope.model'
import { UserModel } from '../../../user/model/user.model'

export class ScopeIoHelper {
    public static verifyScope(userScopes: Array<string>, scope: string): boolean {
        let confirmed = false

        for (let userScope of userScopes) {
            if (scope == userScope) {
                confirmed = true
            }
        }

        return confirmed
    }

    public static async getUserScopes(user: DocumentType<UserModel>): Promise<Array<string>> {
        const scopeAccess: Array<string> = new Array

        for (const scopeId of user.scopeAccess) {
            const scope: DocumentType<ScopeModel> | null = await ScopeModelDocument.findById(scopeId).exec()

            if (!scope) continue

            const fullScope: string = await ScopeIoHelper.buildScope(scope)
            
            scopeAccess.push(fullScope)
        }

        return scopeAccess
    }

    public static async buildScope(scope: DocumentType<ScopeModel>): Promise<string> {
        if (!scope.parent) return scope.name

        const parent: DocumentType<ScopeModel> | null = await ScopeModelDocument.findById(scope.parent).exec()

        if (!parent) return scope.name

        return `${await this.buildScope(parent)}/${scope.name}`
    }
}