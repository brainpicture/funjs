import { Codegen } from "./codegen";
import { Int } from "./types/int";

class InMsgBody {
    private code:Codegen;
    constructor(c: Codegen) {
        this.code = c
    }
    loadUint(dimension: number):Int {
        let uint = new Int(dimension, true).init(this.code)
        return uint
    }
}

export {InMsgBody}