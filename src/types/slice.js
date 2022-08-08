"use strict";
exports.__esModule = true;
exports.Slice = void 0;
var int_1 = require("./int");
var Slice = /** @class */ (function () {
    function Slice() {
        this.name = '';
        this.type = 'slice';
    }
    Slice.prototype.init = function (code, name) {
        if (code) {
            this.code = code;
            this.name = name || this.code.genVarName();
            //this.code.write(`var ${this.name} = begin_cell();`)
        }
        return this;
    };
    Slice.prototype.spawn = function () {
        return new Slice().init(this.code);
    };
    Slice.prototype.loadUint = function (dimension) {
        var _a;
        var uint = new int_1.Int(dimension, true).init(this.code);
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("var ".concat(uint.name, " = ").concat(this.name, ".loadUint(").concat(dimension, ");"));
        return uint;
    };
    return Slice;
}());
exports.Slice = Slice;
