import { requ } from './fix'

type configureFnType = (element: unknown) => void
type getLoggerFnType = (element?: unknown) => any

type Log4jsType = {
    configure: configureFnType
    getLogger: getLoggerFnType
    [key: string]: unknown
}

let log4js: Log4jsType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyFn = () => { }

    log4js = {
        configure: dummyFn,
        getLogger: dummyFn
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    log4js = requ('log4js')
}

export const configure = log4js.configure
export const getLogger = log4js.getLogger