import { requ } from './fix'

type passportjwtType = {
    Strategy: any
    [key: string]: unknown
}

let passportjwt: passportjwtType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyObject = Object

    passportjwt = {
        Strategy: dummyObject,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    passportjwt = requ('passport-jwt')
}

export const Strategy = passportjwt.Strategy