import { Codegen } from "./codegen";

interface Type {
    name:string
    type:string
    init(code?: Codegen):this
    spawn():Type
}

function isType(object: any): object is Type {
    if (object  instanceof Object) {
        return 'name' in object && 'type' in object
    }
    return false
}

function wrap(arg: Type | number | string) {
    if (isType(arg)) {
        return arg.name
    }
    return arg
}

function isTypeArray(object: any): object is Array<Type> {
    return Array.isArray(object)
}
 
interface FuncOptions<ArgType> {
    inline?:boolean
    name?:string // just of the beauty of generated code name of a funtions
    export?:[string, ArgType]
}

type StorageObject = Record<string, Type>
type FuncArguments = Array<Type>
type ReturnArguments = Array<Type> | Type | void

export {Type, StorageObject, FuncOptions, FuncArguments, ReturnArguments, isType, isTypeArray, wrap}