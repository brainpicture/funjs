import { Codegen } from "../codegen";
import { isType, Type } from "../interfaces";
import { Bool } from "./bool";

class Int implements Type  {
    public name:string = '';
    public type:string = 'int'
    public unsigned:boolean = false
    private dimension:number;
    private code?:Codegen;
    constructor(dimension: number, unsigned?:boolean) {
        this.dimension = dimension
        if (unsigned !== undefined) {
            this.unsigned = unsigned
        }
    }
    init(code?: Codegen, name?:string):this {
        if (code) {
            this.code = code
            this.name = name || this.code.genVarName()
        }
        return this
    }
    spawn():Int {
        return new Int(this.dimension).init(this.code)
    }
    private operator(value: Int | number, op: string):Int {
        let n = this.spawn()
        this.code?.write(`var ${n.name} = (${this.name} ${op} ${isType(value) ? value.name : value});`)
        return n
    }
    plus(value: Int | number):Int {
        return this.operator(value, '+')
    }
    minus(value: Int | number):Int {
        return this.operator(value, '-')
    }
    mul(value: Int | number):Int {
        return this.operator(value, '*')
    }
    div(value: Int | number):Int {
        return this.operator(value, '/')
    }
    equal(value: Int | number):Bool {
        let b = new Bool().init(this.code)
        this.code?.write(`var ${b.name} = (${this.name} == ${isType(value) ? value.name : value});`)
        return b
    }
    toString():string {
        return this.dimension+''
    }
    [Symbol.toPrimitive]():number {
        return 0;
    }
}

export {Int}