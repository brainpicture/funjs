"use strict";
exports.__esModule = true;
exports.Int = void 0;
var interfaces_1 = require("../interfaces");
var bool_1 = require("./bool");
var Int = /** @class */ (function () {
    function Int(dimension, unsigned) {
        this.name = '';
        this.type = 'int';
        this.unsigned = false;
        this.dimension = dimension;
        if (unsigned !== undefined) {
            this.unsigned = unsigned;
        }
    }
    Int.prototype.init = function (code, name) {
        if (code) {
            this.code = code;
            this.name = name || this.code.genVarName();
        }
        return this;
    };
    Int.prototype.spawn = function () {
        return new Int(this.dimension).init(this.code);
    };
    Int.prototype.operator = function (value, op) {
        var _a;
        var n = this.spawn();
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("var ".concat(n.name, " = (").concat(this.name, " ").concat(op, " ").concat((0, interfaces_1.isType)(value) ? value.name : value, ");"));
        return n;
    };
    Int.prototype.plus = function (value) {
        return this.operator(value, '+');
    };
    Int.prototype.minus = function (value) {
        return this.operator(value, '-');
    };
    Int.prototype.mul = function (value) {
        return this.operator(value, '*');
    };
    Int.prototype.div = function (value) {
        return this.operator(value, '/');
    };
    Int.prototype.equal = function (value) {
        var _a;
        var b = new bool_1.Bool().init(this.code);
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("var ".concat(b.name, " = (").concat(this.name, " == ").concat((0, interfaces_1.isType)(value) ? value.name : value, ");"));
        return b;
    };
    Int.prototype.toString = function () {
        return this.dimension + '';
    };
    Int.prototype[Symbol.toPrimitive] = function () {
        return 0;
    };
    return Int;
}());
exports.Int = Int;
