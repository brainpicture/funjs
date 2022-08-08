import { Codegen } from "../codegen";
import { If } from "../operators/if";
import { Parser } from "./parser";

class Data {
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
    beginParse():Parser {
        if (!this.code) throw new Error('data should be inited')
        let parser = new Parser().init(this.code)
        this.code.write(`var ${parser.name} = ${this.name}.begin_parse();`)
        return parser
    }

}

export {Data}