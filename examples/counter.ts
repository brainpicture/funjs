import { Contract, Cell, Slice, Int } from "../src";

class Counter extends Contract {
    loadData():Int {
        var ds = this.getData().beginParse()
        return ds.loadUint(64)
    }

    saveData(counter:Int) {
        let cell = this.beginCell().storeUint(counter, 64).endCell()
        this.setData(cell)
    }

    recvInternal(msgValue:Int, inMsgCell: Cell, inMsgBody: Slice) {
        let op = inMsgBody.loadUint(32)
        var counter = this.loadData()
        op.equal(32).then(() => {
            this.saveData(counter.plus(1))
        }).else(() => {
            this.throw(6)
        })
    }

    counter() {
        var counter = this.loadData()
        return counter
    }

    $export() {
        this.counter()
    }
}

let counter = new Counter()
console.log(counter.compile())