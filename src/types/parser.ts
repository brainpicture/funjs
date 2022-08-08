import { Codegen } from "../codegen";
import { If } from "../operators/if";
import { Int } from "./int";

class Parser {
    public name?:string;
    private code?:Codegen;
    constructor() {
    }
    init(code?:Codegen):this {
        if (code) {
            this.code = code
            this.name = this.code.genVarName()
        }
        return this
    }

    loadUint(dimension: number):Int {
        let uint = new Int(dimension).init(this.code)
        this.code?.write(`var ${uint.name} = ${this.name}.loadUint(${dimension});`)
        return uint
    }
    

}

export {Parser}