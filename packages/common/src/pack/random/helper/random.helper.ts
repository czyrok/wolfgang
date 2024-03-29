const crypto = require('crypto')

export class RandomHelper {
    public static getRandomNumber(range?: number): number {
        if (range !== undefined)
            return crypto.getRandomValues(new Uint32Array(1))[0] % range

        return crypto.getRandomValues(new Uint32Array(1))[0]
    }

    public static shuffle<T>(array: Array<T>): void {
        for (let i = array.length - 1; i > 0; i--) {
            let j: number = this.getRandomNumber(i + 1),
                temp: T = array[i]

            array[i] = array[j]
            array[j] = temp
        }
    }
}