import { Codegen } from "../codegen";
import { If } from "../operators/if";
import { Parser } from "./parser";
import { Int } from "./int";
import { isType } from "../interfaces";
import { Slice } from "./slice";

class Cell {
    public name:string = '';
    public type:string = 'cell'
    private code?:Codegen;
    constructor() {
    }
    init(code?:Codegen, name?:string):this {
        if (code) {
            this.code = code
            this.name = name || this.code.genVarName()
        }
        return this
    }
    spawn():Cell {
        return new Cell().init(this.code)
    }
    write():this {
        this.code?.write(`var ${this.name} = begin_cell();`)
        return this
    }
    storeUint(uint:Int | number, dimention:number):this {
        this.code?.write(`${this.name}.store_uint(${isType(uint) ? uint.name : uint}, ${dimention});`)
        return this
    }
    storeGrams(uint:Int | number):this {
        this.code?.write(`${this.name}.store_grams(${isType(uint) ? uint.name : uint});`)
        return this
    }
    storeSlice(slice:Slice):this {
        this.code?.write(`${this.name}.store_slice(${slice.name});`)
        return this
    }
    endCell():this {
        this.code?.write(`${this.name}.end_cell();`)
        return this
    }
}

export {Cell}