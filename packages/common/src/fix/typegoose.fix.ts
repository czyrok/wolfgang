type DecoratorFnType = (body?: unknown) => (target: unknown, key: string, descriptor?: PropertyDescriptor) => void
type GetModelForClassFnType = (element?: unknown, options?: unknown) => unknown

type TypegooseDecoratorType = {
    prop: DecoratorFnType
    mapProp: DecoratorFnType
    arrayProp: DecoratorFnType
    modelOptions: DecoratorFnType
    pre: DecoratorFnType
    post: DecoratorFnType
    index: DecoratorFnType
    plugin: DecoratorFnType
    getModelForClass: GetModelForClassFnType
    [key: string]: unknown
}

let typegoose: TypegooseDecoratorType

if (typeof process === 'undefined' || typeof window === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dummyDecorator = () => (): void => { }
    const dummyFn = () => { }

    typegoose = {
        prop: dummyDecorator,
        mapProp: dummyDecorator,
        arrayProp: dummyDecorator,
        modelOptions: dummyDecorator,
        pre: dummyDecorator,
        post: dummyDecorator,
        index: dummyDecorator,
        plugin: dummyDecorator,
        getModelForClass: dummyFn
    }
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    typegoose = require('@typegoose/typegoose')
}

export const Prop = typegoose.prop
export const MapProp = typegoose.mapProp
export const ArrayProp = typegoose.arrayProp
export const ModelOptions = typegoose.modelOptions
export const Pre = typegoose.pre
export const Post = typegoose.post
export const Index = typegoose.index
export const Plugin = typegoose.plugin

export const getModelForClass = typegoose.getModelForClass