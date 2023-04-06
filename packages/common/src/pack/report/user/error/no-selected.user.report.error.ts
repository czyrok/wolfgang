export class NoSelectedUserReportError extends Error {
    public constructor() {
        super('Vous n\'avez pas sélectionné d\'utilisateurs')
    }
}