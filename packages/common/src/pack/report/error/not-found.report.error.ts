export class NotFoundReportError extends Error {
    public constructor() {
        super('Signalement non trouvé')
    }
}