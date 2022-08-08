"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var int_1 = require("./int");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.init = function (code) {
        if (code) {
            this.code = code;
            this.name = this.code.genVarName();
        }
        return this;
    };
    Parser.prototype.loadUint = function (dimension) {
        var _a;
        var uint = new int_1.Int(dimension).init(this.code);
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("var ".concat(uint.name, " = ").concat(this.name, ".loadUint(").concat(dimension, ");"));
        return uint;
    };
    return Parser;
}());
exports.Parser = Parser;
