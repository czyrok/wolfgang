export class KeyNotFoundMapParamError extends Error {
    public constructor(key: string) {
        super(`La clé ${key} n'est pas présente dans la map`)
    }
}