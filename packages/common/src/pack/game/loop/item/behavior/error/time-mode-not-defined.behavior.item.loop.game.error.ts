export class TimerModeNotDefinedBehaviorItemLoopGameError extends Error {
    public constructor(type: string) {
        super(`${type} n'a pas de mode pour le minuteur`)
    }
}