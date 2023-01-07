export class BehaviorNotDefinedOneItemLoopGameError extends Error {
    public constructor(type: string) {
        super(`${type} n'a pas de comportement`)
    }
}