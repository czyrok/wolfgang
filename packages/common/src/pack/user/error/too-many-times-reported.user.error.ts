export class TooManyTimesReportedUserError extends Error {
    public constructor() {
        super('Vous avez été trop de fois signalé')
    }
}