import { requ } from './fix'

type useFnType = (element: unknown, options?: unknown) => any
type initializeFnType = () => any
type authenticateFnType = (element: unknown, options?: unknown) => any

type passportType = {
    use: useFnType
    initialize: initializeFnType
    authenticate: authenticateFnType
    [key: string]: unknown
}

let passport: passportType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFn = () => { }

    passport = {
        initialize: dummyFn,
        authenticate: dummyFn,
        use: dummyFn,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    passport = requ('passport')
}

export const use = passport.use
export const initialize = passport.initialize
export const authenticate = passport.authenticate