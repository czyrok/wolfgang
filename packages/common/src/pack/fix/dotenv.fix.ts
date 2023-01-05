import { requ } from './fix'

type configFnType = (options?: unknown) => any

type dotenvType = {
    config: configFnType
    [key: string]: unknown
}

let dotenv: dotenvType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFn = () => { }

    dotenv = {
        config: dummyFn,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    dotenv = requ('dotenv')
}

export const config = dotenv.config