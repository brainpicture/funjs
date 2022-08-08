import { Codegen } from "../codegen";
import { If } from "../operators/if";

class Bool {
    public name:string = '';
    public type:string = 'bool'
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
    then (cb: () => void):If {
        this.code?.write(`if (${this.name}) {`).indent()
        cb()
        this.code?.unindent().write(`}`)
        return new If()
    }

}

export {Bool}