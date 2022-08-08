import { Codegen } from "../codegen";
import { Int } from "./int";

class Slice {
    public name:string = '';
    public type:string = 'slice'
    private code?:Codegen;
    constructor() {
    }
    init(code?:Codegen, name?:string):this {
        if (code) {
            this.code = code
            this.name = name || this.code.genVarName()
            //this.code.write(`var ${this.name} = begin_cell();`)
        }
        return this
    }
    spawn():Slice {
        return new Slice().init(this.code)
    }
    loadUint(dimension:number):Int {
        let uint = new Int(dimension, true).init(this.code)
        this.code?.write(`var ${uint.name} = ${this.name}.loadUint(${dimension});`)
        return uint
    }
}

export {Slice}