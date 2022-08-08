const nl = "\n";
class Writer {
    public body = ''
    public tab = 0



}
class Codegen {
    private stack:Array<Writer>
    private varNum = 0
    private funcNum = 0
    private tab = 0
    private body = ''
    constructor() {
        this.stack = []
    }

    indent():this {
        if (!this.stack.length) {
            throw new Error('Code stack is empty')
        }
        this.stack[0].tab++
        return this
    }
    unindent():this {
        if (!this.stack.length) {
            throw new Error('Code stack is empty')
        }
        this.stack[0].tab--
        return this
    }

    write(code:string):Codegen {
        if (!this.stack.length) {
            return this
        }
        let spaces =  `  `.repeat(this.stack[0].tab)
        this.stack[0].body += spaces+code+nl
        return this
    }
    prepend(code:string):Codegen {
        if (!this.stack.length) {
            throw new Error('Code stack is empty')
        }
        let spaces =  `  `.repeat(this.stack[0].tab)
        this.stack[0].body = spaces+code+nl+this.stack[0].body
        return this
    }

    start():this {
        this.stack.unshift(new Writer())
        return this
    }
    commit() {
        this.body += nl+this.stack.shift()?.body
    }

    genVarName():string {
        this.varNum += 1
        return `v${this.varNum}`
    }

    genFuncName():string {
        this.funcNum += 1
        return `f${this.funcNum}`
    }

    compile():string {
        return this.body
    }
}
export { Codegen }