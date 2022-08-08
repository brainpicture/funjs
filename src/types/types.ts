import { Codegen } from "../codegen";
import { Bool } from "./bool";
import { Cell } from "./cell";
import { Int } from "./int";
import { Slice } from "./slice";

let emptyCodegen = new Codegen()

let types = {
    Int: (dimension?:number, unsigned?:boolean) => { // return enclosed function wich can accept codegen
        return new Int(dimension || 32, unsigned)
    },
    Slice: () => {
        return new Slice()
    },
    Cell: () => {
        return new Cell()
    }
}

export {types}