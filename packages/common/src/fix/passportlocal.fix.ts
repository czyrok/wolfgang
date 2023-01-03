import { requ } from './fix'

type passportlocalType = {
    Strategy: any
    [key: string]: unknown
}

let passportlocal: passportlocalType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyObject = Object

    passportlocal = {
        Strategy: dummyObject,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    passportlocal = requ('passport-local')
}

export const Strategy = passportlocal.Strategy