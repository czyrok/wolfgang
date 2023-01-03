type DecoratorFnType = (element1?: unknown, element2?: unknown) => Function

type TssocketiocontrollerType = {
    SocketMiddleware: DecoratorFnType
    [key: string]: unknown
}

let tssocketiocontroller: TssocketiocontrollerType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyDecorator = () => (): void => { }

    tssocketiocontroller = {
        SocketMiddleware: dummyDecorator,
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    tssocketiocontroller = require('ts-socket.io-controller')
}

export const SocketMiddleware = tssocketiocontroller.SocketMiddleware