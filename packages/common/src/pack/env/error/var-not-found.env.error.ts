export class VarNotFoundEnvError extends Error {
    public constructor(variable: string) {
        super(`${variable} n'existe pas`)
    }
}