import { requ } from './fix'

type signFnType = (element1: unknown, element2: unknown, options?: unknown) => any

type jsonwebtokenType = {
    sign: signFnType
    [key: string]: unknown
}

let jsonwebtoken: jsonwebtokenType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFn = () => { }

    jsonwebtoken = {
        sign: dummyFn,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jsonwebtoken = requ('jsonwebtoken')
}

export const sign = jsonwebtoken.sign