import { Contract, InMsgBody, InMsgFull, MsgValue, types } from "../src";
import { Cell } from "../src/types/cell";
import { Slice } from "../src/types/slice";
import { Int } from "../src/types/int";

let c = new Contract()

let loadData = c.func(():Int => {
    var ds = c.getData().beginParse()
    return ds.loadUint(64)
}, {inline:true})

let saveData = c.func((counter:Int) => {
    let cell = c.beginCell().storeUint(counter, 64).endCell()
    c.setData(cell)
})

c.recvInternal((msgValue:Int, inMsgCell: Cell, inMsgBody: Slice) => {
    let op = inMsgBody.loadUint(32)
    var counter = loadData()
    op.equal(32).then(() => {
        saveData(counter.plus(1))
    }).else(() => {
        c.throw(6)
    })
})

c.func(() => {
    var counter = loadData()
    return counter
}, {
    export: ['counter', []]
})

console.log(c.compile())