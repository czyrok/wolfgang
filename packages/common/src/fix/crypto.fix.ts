import { requ } from './fix'

type getRandomValuesFnType = (element: unknown) => any

type cryptoType = {
    getRandomValues: getRandomValuesFnType
    [key: string]: unknown
}

let crypto: cryptoType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFn = () => { }

    crypto = {
        getRandomValues: dummyFn,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    crypto = requ('crypto')
}

export const getRandomValues = crypto.getRandomValues