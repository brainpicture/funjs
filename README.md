# Typescript FunC code builder

FunC is a completely new language for smart contracts in TON. FunC is already documented and supported by plug-ins for many IDEs – 
it's still hard to learn and time consuming for developers.

FunJS is a prototype to check if TypeScript is capable to provide replacement for FunC in the task of writing smart contracts.

Being just a framework which generates code, FunJS brings several benefits:
* higher abstractions such as for example **Storage** component can be developed to avoid writing loader and saver boilerplates for storage in cells.
* lower entry threshold, since typescript (thanks to generics) suggests what can be written and checks validity of the code. Developer doesn't need to learn new language concepts.
* re-usage of mature JS infrastructure, such as NPM and others
* all in one place code, deploy and use
* auto-generation of binary data to call methods in smart contracts

This is an early prototype just to check the concept, please feel free to leave your feedback and fork for own experiments.

Use this link to join discussion: https://t.me/+JjY1w_Fs8ScyMWZi

To be done:
* Right now its compiles code into FunC, but shoul compile directly into fift of binary form.

How to use:
```bash
yarn build
yarn examples-counter
```

## Here is an example of samrt contract written with FuncJS
```javascript
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
```