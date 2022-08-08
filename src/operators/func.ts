import { Codegen } from "../codegen"
import { FuncArguments, FuncOptions, isType, isTypeArray, ReturnArguments, Type } from "../interfaces"

class Func<ArgType extends FuncArguments, RetType extends ReturnArguments> {
    private callback: (...args:ArgType) => RetType
    private opts?:FuncOptions<ArgType>
    private code:Codegen
    private ret?:RetType // if persist already compiled
    private name:string;
    constructor(code: Codegen, cb: (...args:ArgType) => RetType, opts?:FuncOptions<ArgType>) {
        
        this.code = code
        this.callback = cb
        this.opts = opts
        if (this.opts?.export) {
            this.name = this.opts.export[0]
        } else {
            this.name = this.opts?.name || code.genFuncName()
        }
    }
    callable(): (...args:ArgType) => RetType {
        return (...args:ArgType):RetType => {
            if (!this.ret) { // not compiled
                this.code.start().indent()
                this.ret = this.callback(...args)

                let optsLine = ''
                if (this.opts?.inline) {
                    optsLine += 'inline '
                }
                if (this.opts?.export) {
                    optsLine += 'method_id '
                }
                this.compileReturn()
                this.code.unindent()
                let argsStr:string[] = []
                args.forEach((a) => {
                    argsStr.push(a.type+' '+a.name)
                })
                this.code.prepend(`(${this.compileReturnTypes()}) ${this.name}(${argsStr.join(', ')}) ${optsLine}{`)

                this.code.write(`}`) 
                this.code.commit()
            } else {
                if (isType(this.ret)) {
                    this.ret = this.ret.spawn() as RetType // reassign new variable every time
                } else if (isTypeArray(this.ret)) {
                    let retParams:Array<Type> = []
                    this.ret.forEach((a) => {
                        retParams.push(a.spawn())
                    })
                    this.ret = retParams as RetType
                }
            }
            let argsStr:string[] = []
            args.forEach((a) => {
                argsStr.push(a.name)
            })
            let retStr = ''
            if (this.ret) {
                if (isType(this.ret)) {
                    retStr =  'var '+this.ret.name+' = '
                } else if (Array.isArray(this.ret)) {
                    let varsStr:string[] = []
                    this.ret.forEach((a) => {
                        varsStr.push(a.name)
                    })
                    retStr =  'var ('+varsStr.join(', ')+') = '
                }
            }

            this.code.write(`${retStr}${this.name}(${argsStr.join(', ')});`)

            return this.ret
        }
    }

    compileReturnTypes():string {
        if (!this.ret) {
            return ''
        }
        let args:string[] = []
        if (Array.isArray(this.ret)) {
            this.ret.forEach((el) => {
                args.push(el.type)
            })
        } else if (isType(this.ret)) {
            return this.ret.type
        }
        return args.join(', ')
    }

    compileReturn() {
        if (!this.ret) {
            return
        }
        if (Array.isArray(this.ret)) {
            let retNames:Array<string> = []
            this.ret.forEach((el) => {
                retNames.push(el.name)
            })
            this.code.write(`return (${retNames.join(', ')});`)
        } else if (isType(this.ret)) {
            this.code.write(`return ${this.ret.name};`)
        }
    }
}

export {Func}