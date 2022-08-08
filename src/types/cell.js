"use strict";
exports.__esModule = true;
exports.Cell = void 0;
var interfaces_1 = require("../interfaces");
var Cell = /** @class */ (function () {
    function Cell() {
        this.name = '';
        this.type = 'cell';
    }
    Cell.prototype.init = function (code, name) {
        if (code) {
            this.code = code;
            this.name = name || this.code.genVarName();
        }
        return this;
    };
    Cell.prototype.spawn = function () {
        return new Cell().init(this.code);
    };
    Cell.prototype.write = function () {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("var ".concat(this.name, " = begin_cell();"));
        return this;
    };
    Cell.prototype.storeUint = function (uint, dimention) {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("".concat(this.name, ".store_uint(").concat((0, interfaces_1.isType)(uint) ? uint.name : uint, ", ").concat(dimention, ");"));
        return this;
    };
    Cell.prototype.storeGrams = function (uint) {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("".concat(this.name, ".store_grams(").concat((0, interfaces_1.isType)(uint) ? uint.name : uint, ");"));
        return this;
    };
    Cell.prototype.storeSlice = function (slice) {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("".concat(this.name, ".store_slice(").concat(slice.name, ");"));
        return this;
    };
    Cell.prototype.endCell = function () {
        var _a;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("".concat(this.name, ".end_cell();"));
        return this;
    };
    return Cell;
}());
exports.Cell = Cell;
