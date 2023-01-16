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
}