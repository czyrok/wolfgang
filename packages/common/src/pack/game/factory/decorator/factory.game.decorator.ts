export function InitFactoryRegistering() {
    return function (target: new () => any) {
        new target()
    }
}